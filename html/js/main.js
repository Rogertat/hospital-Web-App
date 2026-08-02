/* XeraCare Hospital — data-layer instrumentation.
 *
 * The site is the canonical event producer (xerabank R3 pilot pattern, D-091):
 * pushEvent(event, data) -> window.dataLayer + window.adobeDataLayer. The headless
 * walkerOS runtime (js/xdm/*) forwards these to the AEP Edge datastream; this file
 * never talks to Adobe directly and contains NO walkerOS tagging.
 *
 * Privacy stance (D-115): zero clinical inputs anywhere — no symptom, diagnosis or
 * condition data is collected or emitted. Email/phone ride RAW in the data layer;
 * hashing (Email_LC_SHA256 etc.) happens downstream in the mapping cast chain.
 *
 * Every event this file emits is documented in SITE-CONTRACT.md at the repo root.
 */
(function () {
  'use strict';

  // Analytics helpers
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.dataLayer = window.dataLayer || [];

  function pushEvent(event, data) {
    var payload = Object.assign({ event: event }, data || {});
    window.adobeDataLayer.push(payload);
    window.dataLayer.push(payload);
  }

  /* ------------------------------------------------------------------ */
  /* Canonical service directory (single source of truth for the site)  */
  /* ------------------------------------------------------------------ */
  var services = [
    {
      id: 'CARD-CONSULT',
      name: 'Cardiology Consultation',
      department: 'Cardiology',
      category: 'Consultation',
      appointmentType: 'Consultation',
      page: 'service-card-consult.html',
      keywords: ['cardiology', 'heart', 'cardiac', 'ecg', 'blood pressure', 'consultation', 'cardiologist']
    },
    {
      id: 'NEURO-CONSULT',
      name: 'Neurology Consultation',
      department: 'Neurology',
      category: 'Consultation',
      appointmentType: 'Consultation',
      page: 'service-neuro-consult.html',
      keywords: ['neurology', 'neurologist', 'nerve', 'brain', 'consultation']
    },
    {
      id: 'PEDIA-CHECK',
      name: 'Pediatric Check-Up',
      department: 'Pediatrics',
      category: 'Preventive Care',
      appointmentType: 'Check-Up',
      page: 'service-pedia-check.html',
      keywords: ['pediatrics', 'pediatric', 'children', 'child', 'kids', 'check-up', 'checkup', 'wellness', 'preventive']
    },
    {
      id: 'EYE-EXAM',
      name: 'Comprehensive Eye Exam',
      department: 'Ophthalmology',
      category: 'Diagnostics',
      appointmentType: 'Diagnostic Exam',
      page: 'service-eye-exam.html',
      keywords: ['ophthalmology', 'eye', 'eyes', 'vision', 'exam', 'retinal', 'imaging', 'diagnostics', 'prescription']
    }
  ];

  /* ------------------------------------------------------------------ */
  /* Page load — fired at script parse on EVERY page                     */
  /* ------------------------------------------------------------------ */
  var page = location.pathname.split('/').pop() || 'index.html';

  var SITE_SECTIONS = {
    'index.html': 'home',
    'services.html': 'services',
    'service-card-consult.html': 'services',
    'service-neuro-consult.html': 'services',
    'service-pedia-check.html': 'services',
    'service-eye-exam.html': 'services',
    'search.html': 'search',
    'appointment.html': 'appointment',
    'doctors.html': 'doctors',
    'about.html': 'about'
  };

  pushEvent('pageLoad', {
    pageInfo: {
      name: document.title,
      url: location.href,
      siteSection: SITE_SECTIONS[page] || 'general'
    }
  });

  /* ------------------------------------------------------------------ */
  /* Service view — service detail pages (resolved from the directory,  */
  /* not from HTML tagging)                                             */
  /* ------------------------------------------------------------------ */
  var currentService = null;
  for (var i = 0; i < services.length; i++) {
    if (services[i].page === page) { currentService = services[i]; break; }
  }
  if (currentService) {
    pushEvent('serviceView', {
      service: {
        id: currentService.id,
        name: currentService.name,
        department: currentService.department,
        category: currentService.category
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Search results page (?q=) — client-side search over the directory  */
  /* ------------------------------------------------------------------ */
  if (page === 'search.html') {
    initSearchPage();
  }

  function serviceMatches(service, term) {
    if (service.name.toLowerCase().indexOf(term) !== -1) return true;
    if (service.department.toLowerCase().indexOf(term) !== -1) return true;
    if (service.category.toLowerCase().indexOf(term) !== -1) return true;
    if (service.id.toLowerCase().indexOf(term) !== -1) return true;
    return service.keywords.some(function (k) {
      return k.indexOf(term) !== -1 || term.indexOf(k) !== -1;
    });
  }

  function initSearchPage() {
    var params = new URLSearchParams(location.search);
    var rawTerm = (params.get('q') || '').trim();
    var input = document.getElementById('searchInput');
    var summary = document.getElementById('searchSummary');
    var results = document.getElementById('searchResults');
    if (input && rawTerm) input.value = rawTerm;
    if (!rawTerm || !summary || !results) return;

    var term = rawTerm.toLowerCase();
    var matches = services.filter(function (s) { return serviceMatches(s, term); });

    if (matches.length) {
      pushEvent('searcheswithResult', { search: { term: rawTerm } });
      summary.innerHTML = '<h3>' + matches.length + (matches.length === 1 ? ' result' : ' results') +
        ' for “' + escapeHtml(rawTerm) + '”</h3>';
      matches.forEach(function (s) {
        var col = document.createElement('div');
        col.className = 'col-lg-6';
        col.innerHTML =
          '<div class="service-item position-relative">' +
            '<a href="' + s.page + '" class="stretched-link"><h3>' + escapeHtml(s.name) + '</h3></a>' +
            '<p class="mb-0"><small><strong>' + escapeHtml(s.department) + '</strong> &middot; ' +
              escapeHtml(s.category) + '</small></p>' +
          '</div>';
        results.appendChild(col);
      });
    } else {
      pushEvent('searcheswithoutResult', { search: { term: rawTerm } });
      summary.innerHTML =
        '<h3>No services matched “' + escapeHtml(rawTerm) + '”</h3>' +
        '<p>Try a department name like “cardiology”, or browse the ' +
        '<a href="services.html">full service directory</a>.</p>';
    }
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  /* ------------------------------------------------------------------ */
  /* Campaign clicks                                                     */
  /*  - Hero CTA (home page):   placement "Hero",   component "hero-banner" */
  /*  - Header nav CTA (all pages): placement "Header", component "nav-link" */
  /* regionPath varies by page so campaign_region_path differs per page. */
  /* ------------------------------------------------------------------ */
  function campaignClick(name, label, component, placement) {
    pushEvent('internalcampaignClick', {
      eventInfo: {
        eventName: name,
        eventCategory: 'engagement',
        eventAction: 'click',
        eventLabel: label,
        component: component,
        placement: placement,
        regionPath: window.location.pathname
      }
    });
  }

  function initCampaignTracking() {
    var heroCta = document.getElementById('heroCtaBook');
    if (heroCta) {
      heroCta.addEventListener('click', function () {
        campaignClick('Book Appointment CTA', 'Book an Appointment — Hero', 'hero-banner', 'Hero');
      });
    }

    document.querySelectorAll('.cta-btn[href^="appointment.html"]').forEach(function (btn) {
      if (btn.closest('header')) {
        btn.addEventListener('click', function () {
          campaignClick('Book Appointment CTA', 'Book an Appointment — Header Nav', 'nav-link', 'Header');
        });
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Appointment form                                                    */
  /* ------------------------------------------------------------------ */
  var FORM_NAME = 'Book an Appointment Form';

  function findService(id) {
    for (var j = 0; j < services.length; j++) {
      if (services[j].id === id) return services[j];
    }
    return null;
  }

  function initAppointmentForm() {
    var form = document.getElementById('appointmentForm');
    if (!form) return;

    pushEvent('appointmentLoad', { form: { name: FORM_NAME, category: 'Load' } });

    var serviceSelect = document.getElementById('apptService');
    var departmentSelect = document.getElementById('apptDepartment');

    // Selecting a service sets BOTH the requested service id (the select's value)
    // AND the appointment type (resolved from the directory); the matching
    // department is pre-filled as a convenience but stays user-editable.
    function syncFromService() {
      var svc = findService(serviceSelect.value);
      if (svc && departmentSelect) departmentSelect.value = svc.department;
    }
    if (serviceSelect) serviceSelect.addEventListener('change', syncFromService);

    // Deep link from service detail pages: appointment.html?service=<id>
    var requested = new URLSearchParams(location.search).get('service');
    if (requested && serviceSelect && findService(requested)) {
      serviceSelect.value = requested;
      syncFromService();
    }

    // First interaction with any field -> appointmentStart (once)
    var started = false;
    form.querySelectorAll('input, select').forEach(function (field) {
      field.addEventListener('focus', function () {
        if (!started) {
          started = true;
          pushEvent('appointmentStart', { form: { name: FORM_NAME, category: 'Start' } });
        }
      });
    });

    var errorBox = form.querySelector('.error-message');

    function fail(message, field) {
      if (errorBox) {
        errorBox.textContent = message;
        errorBox.style.display = 'block';
      }
      if (field) field.classList.add('is-invalid');
      pushEvent('appointmentValidationError', {
        form: { name: FORM_NAME, category: 'Form Validation', validationError: message }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (errorBox) errorBox.style.display = 'none';
      form.querySelectorAll('.is-invalid').forEach(function (f) { f.classList.remove('is-invalid'); });

      var nameField = document.getElementById('apptName');
      var emailField = document.getElementById('apptEmail');
      var phoneField = document.getElementById('apptPhone');
      var dateField = document.getElementById('apptDate');

      var missing = [nameField, emailField, phoneField, dateField, serviceSelect, departmentSelect]
        .filter(function (f) { return f && !f.value.trim(); });
      if (missing.length) {
        missing.forEach(function (f) { f.classList.add('is-invalid'); });
        fail('Required fields missing');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        fail('Enter a valid email address', emailField);
        return;
      }

      if (!/^[0-9+()\-\s]{7,20}$/.test(phoneField.value.trim())) {
        fail('Enter a valid phone number', phoneField);
        return;
      }

      var when = new Date(dateField.value);
      if (isNaN(when.getTime())) {
        fail('Enter a valid appointment date and time', dateField);
        return;
      }

      var svc = findService(serviceSelect.value);
      if (!svc) {
        fail('Select a service from the list', serviceSelect);
        return;
      }

      // datetime-local -> ISO-8601 (UTC); unparseable values were rejected above.
      var preferredDate = when.toISOString();

      pushEvent('appointmentComplete', {
        form: {
          name: FORM_NAME,
          category: 'Completion',
          appointmentType: svc.appointmentType,
          department: departmentSelect.value,
          preferredDate: preferredDate,
          email: emailField.value.trim(),
          phone: phoneField.value.trim(),
          serviceId: svc.id
        }
      });

      // Inline confirmation state
      var confirmation = document.getElementById('appointmentConfirmation');
      if (confirmation) {
        var set = function (id, text) {
          var el = document.getElementById(id);
          if (el) el.textContent = text;
        };
        set('confService', svc.name);
        set('confDepartment', departmentSelect.value);
        set('confDate', when.toLocaleString());
        set('confEmail', emailField.value.trim());
        form.classList.add('d-none');
        confirmation.classList.remove('d-none');
        confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Boot listeners (script sits at end of body; DOM is already parsed, */
  /* mirrors the xerabank main.js structure)                            */
  /* ------------------------------------------------------------------ */
  initCampaignTracking();
  initAppointmentForm();
})();
