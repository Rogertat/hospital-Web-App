# XeraCare Hospital — Site Event Contract

Canonical reference for the translator author (`backend/scripts/hospital-pilot/translate.mjs`).
This document lists EVERY event `html/js/main.js` pushes, with the exact payload shape.
Target composition: **healthcare.web**.

## Transport pattern

- `pushEvent(event, data)` pushes `Object.assign({ event }, data)` onto BOTH
  `window.dataLayer` and `window.adobeDataLayer` (xerabank R3 pilot pattern).
- The site is the canonical event producer. There is **no** walkerOS tagging in HTML
  (no `data-elb*` attributes); the headless walkerOS runtime consumes the dataLayer.
- All values are emitted RAW. Hashing of PII (email → `Email_LC_SHA256`, phone) happens
  downstream in the mapping cast chain, never on-site.
- Script order on every page (strict, before `js/main.js`):
  `js/xdm/xdm-flow.js` → `js/xdm/walker-3.4.2.js` → `js/xdm/xdm-runtime.js` → `js/main.js`.
  The three `js/xdm/*` files 404 until the pilot deploy (expected).
- **Zero clinical inputs by design (D-115):** no symptom / diagnosis / condition fields exist
  anywhere on the site, so no clinical value can ever enter the data layer.

## Canonical service directory

Single source of truth in `html/js/main.js` (drives detail pages, search, and the
appointment select). These are the only valid `service.id` / `form.serviceId` values:

| id | name | department | category | appointmentType |
|---|---|---|---|---|
| `CARD-CONSULT` | Cardiology Consultation | Cardiology | Consultation | Consultation |
| `NEURO-CONSULT` | Neurology Consultation | Neurology | Consultation | Consultation |
| `PEDIA-CHECK` | Pediatric Check-Up | Pediatrics | Preventive Care | Check-Up |
| `EYE-EXAM` | Comprehensive Eye Exam | Ophthalmology | Diagnostics | Diagnostic Exam |

`service.id` is the PRODUCT_SKU lookup identity; `form.serviceId` is the FK to it
(deep link `service detail → appointment.html?service=<id>` guarantees the join).

## Events

### 1. `pageLoad` — every page, at script parse

```json
{
  "event": "pageLoad",
  "pageInfo": {
    "name": "<document.title>",
    "url": "<location.href>",
    "siteSection": "<see table below>"
  }
}
```

| page | siteSection |
|---|---|
| index.html | `home` |
| services.html | `services` |
| service-card-consult.html / service-neuro-consult.html / service-pedia-check.html / service-eye-exam.html | `services` |
| search.html | `search` |
| appointment.html | `appointment` |
| doctors.html | `doctors` |
| about.html | `about` |
| (any other page) | `general` |

### 2. `serviceView` — the four service detail pages, at script parse (after pageLoad)

```json
{
  "event": "serviceView",
  "service": {
    "id": "CARD-CONSULT",
    "name": "Cardiology Consultation",
    "department": "Cardiology",
    "category": "Consultation"
  }
}
```

Values always come verbatim from the directory table above. Resolved by pathname match
in main.js — no HTML tagging.

### 3. `searcheswithResult` / `searcheswithoutResult` — search.html?q=…, at script parse

Exactly one of the two fires per search-results render (never both):

```json
{ "event": "searcheswithResult",    "search": { "term": "<raw q param, trimmed>" } }
{ "event": "searcheswithoutResult", "search": { "term": "<raw q param, trimmed>" } }
```

- `searcheswithResult` when ≥1 directory entry matches (name/department/category/id/keywords,
  case-insensitive substring), e.g. `search.html?q=cardiology`.
- `searcheswithoutResult` on zero matches, e.g. `search.html?q=zzz`.
- No event when `q` is absent/empty.

### 4. `internalcampaignClick` — CTA clicks

```json
{
  "event": "internalcampaignClick",
  "eventInfo": {
    "eventName": "Book Appointment CTA",
    "eventCategory": "engagement",
    "eventAction": "click",
    "eventLabel": "<see matrix>",
    "component": "<see matrix>",
    "placement": "<see matrix>",
    "regionPath": "<location.pathname>"
  }
}
```

| trigger | pages | eventLabel | component | placement |
|---|---|---|---|---|
| Hero "Book an Appointment" (`#heroCtaBook`) | index.html only | `Book an Appointment — Hero` | `hero-banner` | `Hero` |
| Header-nav "Book an Appointment" (`header .cta-btn`) | ALL pages (incl. services.html) | `Book an Appointment — Header Nav` | `nav-link` | `Header` |

`regionPath` varies with the page, so `campaign_region_path` differs across pages.
The event pushes synchronously before navigation to appointment.html.

### 5. Appointment funnel — appointment.html, form id `appointmentForm`

Form name constant: `"Book an Appointment Form"`.

`appointmentLoad` — at script parse when the form renders:

```json
{ "event": "appointmentLoad", "form": { "name": "Book an Appointment Form", "category": "Load" } }
```

`appointmentStart` — first focus on ANY form field (once per page view):

```json
{ "event": "appointmentStart", "form": { "name": "Book an Appointment Form", "category": "Start" } }
```

`appointmentValidationError` — invalid submit (form stays visible, inline error shown):

```json
{
  "event": "appointmentValidationError",
  "form": {
    "name": "Book an Appointment Form",
    "category": "Form Validation",
    "validationError": "<message>"
  }
}
```

`validationError` messages (exhaustive): `Required fields missing` ·
`Enter a valid email address` · `Enter a valid phone number` ·
`Enter a valid appointment date and time` · `Select a service from the list`.

`appointmentComplete` — valid submit (form hides, inline confirmation shows):

```json
{
  "event": "appointmentComplete",
  "form": {
    "name": "Book an Appointment Form",
    "category": "Completion",
    "appointmentType": "Consultation",
    "department": "Cardiology",
    "preferredDate": "2026-08-12T14:30:00.000Z",
    "email": "pat.demo@example.com",
    "phone": "+1 555 010 2211",
    "serviceId": "CARD-CONSULT"
  }
}
```

- `appointmentType` comes from the service directory (service select sets BOTH
  `serviceId` and `appointmentType`; it also pre-fills the department select, which
  stays user-editable — `department` is the select's final value).
- `preferredDate` is the `datetime-local` input converted to **ISO-8601 UTC** via
  `Date.toISOString()`; unparseable input is rejected before this event can fire.
- `email` / `phone` ride RAW (PII — hashed downstream, D-052/D-122 stance).
- `department` values: `Cardiology` · `Neurology` · `Pediatrics` · `Ophthalmology` ·
  `General Medicine`.
- The patient `name` field exists on the form but is deliberately NOT emitted.

## Event → healthcare.web crosswalk hints (informative)

| site event | walkerOS event |
|---|---|
| `pageLoad` | `page view` |
| `serviceView` | `service view` |
| `searcheswithResult` / `searcheswithoutResult` | `search view` |
| `internalcampaignClick` | `campaign click` |
| `appointmentLoad` | `appointment load` |
| `appointmentStart` | `appointment start` |
| `appointmentValidationError` | `appointment error` |
| `appointmentComplete` | `appointment complete` |

Variable mapping (site → crosswalk): `pageInfo.name → page_name`, `pageInfo.url → page_url`,
`pageInfo.siteSection → site_section`, `form.name → form_name`, `form.category → form_stage`,
`form.appointmentType → appointment_type`, `form.department → department_requested`,
`form.preferredDate → preferred_date`, `form.email → email`, `form.phone → phone`,
`form.validationError → validation_error`, `form.serviceId → requested_service_id`,
`search.term → search_term`, `eventInfo.eventName → campaign_name`,
`eventInfo.eventCategory → campaign_category`, `eventInfo.eventLabel → campaign_label`,
`eventInfo.placement → campaign_placement`, `eventInfo.component → campaign_component`,
`eventInfo.regionPath → campaign_region_path`, `service.id → service_id`,
`service.name → service_name`, `service.department → service_department`,
`service.category → service_category`.

(`eventInfo.eventAction` has no crosswalk variable — translator may drop it.)

## Pages (10)

| page | events |
|---|---|
| index.html | pageLoad + hero campaign click + header campaign click |
| services.html | pageLoad + header campaign click |
| service-card-consult.html | pageLoad + serviceView + header campaign click |
| service-neuro-consult.html | pageLoad + serviceView + header campaign click |
| service-pedia-check.html | pageLoad + serviceView + header campaign click |
| service-eye-exam.html | pageLoad + serviceView + header campaign click |
| search.html | pageLoad + searcheswithResult/searcheswithoutResult |
| appointment.html | pageLoad + appointmentLoad + appointmentStart + appointmentValidationError/appointmentComplete |
| doctors.html | pageLoad only |
| about.html | pageLoad only |

Serving: `node serve.mjs` → http://localhost:8900/ (port 8900 fixed; 8899 is reserved
for the xerabank session).
