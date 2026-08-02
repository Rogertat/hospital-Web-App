window.__XDM_ACCEL_FLOW__ = {
  "contentHash": "a8e9b6442a13b4a606e9158f67a1c531ebab35a94084d9851c5e4fa693d62dda",
  "edgeDomain": "aeppsemea.data.adobedc.net",
  "flow": {
    "config": {
      "consent": {
        "analytics": true
      },
      "globalsStatic": {
        "modelVersion": "1.0.0"
      },
      "sources": {
        "src_web": {
          "package": "@elbwalker/walker.js"
        }
      },
      "destinations": {
        "aep-edge": {
          "package": "destination-aep-edge",
          "settings": {
            "datastreamId": "00000000-0000-4000-8000-000000008900",
            "samplingRate": 1,
            "webSdk": {
              "defaultConsent": "in"
            }
          }
        }
      }
    },
    "sourceMapping": {
      "src_web": {
        "package": "@elbwalker/walker.js",
        "data": [
          "page_url",
          "page_name",
          "site_section",
          "form_name",
          "appointment_type",
          "department_requested",
          "preferred_date",
          "email",
          "phone",
          "form_stage",
          "validation_error",
          "requested_service_id",
          "search_term",
          "campaign_name",
          "campaign_category",
          "campaign_label",
          "campaign_placement",
          "campaign_component",
          "campaign_region_path",
          "service_id",
          "service_name",
          "service_department",
          "service_category"
        ]
      }
    },
    "mapping": {
      "page": {
        "view": {
          "data": {
            "map": {
              "web": {
                "map": {
                  "webPageDetails": {
                    "map": {
                      "name": {
                        "key": "data.page_name"
                      },
                      "URL": {
                        "key": "data.page_url"
                      },
                      "siteSection": {
                        "key": "data.site_section"
                      }
                    }
                  }
                }
              },
              "eventType": {
                "value": "web.webpagedetails.pageViews"
              }
            }
          },
          "consent": {
            "analytics": true
          }
        }
      },
      "appointment": {
        "load": {
          "data": {
            "map": {
              "web": {
                "map": {
                  "webPageDetails": {
                    "map": {
                      "name": {
                        "key": "data.page_name"
                      },
                      "URL": {
                        "key": "data.page_url"
                      },
                      "siteSection": {
                        "key": "data.site_section"
                      }
                    }
                  }
                }
              },
              "_aeppsemea": {
                "map": {
                  "appointment": {
                    "map": {
                      "formName": {
                        "key": "data.form_name"
                      },
                      "stage": {
                        "key": "data.form_stage"
                      },
                      "appointmentType": {
                        "key": "data.appointment_type"
                      },
                      "department": {
                        "key": "data.department_requested"
                      },
                      "preferredDate": {
                        "key": "data.preferred_date"
                      },
                      "email": {
                        "key": "data.email",
                        "fn": "hash.sha256"
                      },
                      "phone": {
                        "key": "data.phone",
                        "fn": "hash.sha256"
                      },
                      "validationError": {
                        "key": "data.validation_error"
                      },
                      "serviceId": {
                        "key": "data.requested_service_id"
                      }
                    }
                  }
                }
              },
              "eventType": {
                "value": "xeracare.appointment"
              }
            }
          },
          "consent": {
            "analytics": true
          },
          "condition": {
            "op": "matches",
            "left": {
              "path": "data.form_name"
            },
            "right": {
              "value": "^.+$"
            }
          },
          "identity": {
            "Email_LC_SHA256": [
              {
                "id": {
                  "key": "data.email",
                  "fn": "hash.sha256"
                },
                "authenticatedState": "ambiguous"
              }
            ]
          }
        },
        "start": {
          "data": {
            "map": {
              "web": {
                "map": {
                  "webPageDetails": {
                    "map": {
                      "name": {
                        "key": "data.page_name"
                      },
                      "URL": {
                        "key": "data.page_url"
                      },
                      "siteSection": {
                        "key": "data.site_section"
                      }
                    }
                  }
                }
              },
              "_aeppsemea": {
                "map": {
                  "appointment": {
                    "map": {
                      "formName": {
                        "key": "data.form_name"
                      },
                      "stage": {
                        "key": "data.form_stage"
                      },
                      "appointmentType": {
                        "key": "data.appointment_type"
                      },
                      "department": {
                        "key": "data.department_requested"
                      },
                      "preferredDate": {
                        "key": "data.preferred_date"
                      },
                      "email": {
                        "key": "data.email",
                        "fn": "hash.sha256"
                      },
                      "phone": {
                        "key": "data.phone",
                        "fn": "hash.sha256"
                      },
                      "validationError": {
                        "key": "data.validation_error"
                      },
                      "serviceId": {
                        "key": "data.requested_service_id"
                      }
                    }
                  }
                }
              },
              "eventType": {
                "value": "xeracare.appointment"
              }
            }
          },
          "consent": {
            "analytics": true
          },
          "condition": {
            "op": "matches",
            "left": {
              "path": "data.form_name"
            },
            "right": {
              "value": "^.+$"
            }
          },
          "identity": {
            "Email_LC_SHA256": [
              {
                "id": {
                  "key": "data.email",
                  "fn": "hash.sha256"
                },
                "authenticatedState": "ambiguous"
              }
            ]
          }
        },
        "complete": {
          "data": {
            "map": {
              "web": {
                "map": {
                  "webPageDetails": {
                    "map": {
                      "name": {
                        "key": "data.page_name"
                      },
                      "URL": {
                        "key": "data.page_url"
                      },
                      "siteSection": {
                        "key": "data.site_section"
                      }
                    }
                  }
                }
              },
              "_aeppsemea": {
                "map": {
                  "appointment": {
                    "map": {
                      "formName": {
                        "key": "data.form_name"
                      },
                      "stage": {
                        "key": "data.form_stage"
                      },
                      "appointmentType": {
                        "key": "data.appointment_type"
                      },
                      "department": {
                        "key": "data.department_requested"
                      },
                      "preferredDate": {
                        "key": "data.preferred_date"
                      },
                      "email": {
                        "key": "data.email",
                        "fn": "hash.sha256"
                      },
                      "phone": {
                        "key": "data.phone",
                        "fn": "hash.sha256"
                      },
                      "validationError": {
                        "key": "data.validation_error"
                      },
                      "serviceId": {
                        "key": "data.requested_service_id"
                      }
                    }
                  }
                }
              },
              "eventType": {
                "value": "xeracare.appointment"
              }
            }
          },
          "consent": {
            "analytics": true
          },
          "condition": {
            "op": "matches",
            "left": {
              "path": "data.form_name"
            },
            "right": {
              "value": "^.+$"
            }
          },
          "identity": {
            "Email_LC_SHA256": [
              {
                "id": {
                  "key": "data.email",
                  "fn": "hash.sha256"
                },
                "authenticatedState": "ambiguous"
              }
            ]
          }
        },
        "error": {
          "data": {
            "map": {
              "web": {
                "map": {
                  "webPageDetails": {
                    "map": {
                      "name": {
                        "key": "data.page_name"
                      },
                      "URL": {
                        "key": "data.page_url"
                      },
                      "siteSection": {
                        "key": "data.site_section"
                      }
                    }
                  }
                }
              },
              "_aeppsemea": {
                "map": {
                  "appointment": {
                    "map": {
                      "formName": {
                        "key": "data.form_name"
                      },
                      "stage": {
                        "key": "data.form_stage"
                      },
                      "appointmentType": {
                        "key": "data.appointment_type"
                      },
                      "department": {
                        "key": "data.department_requested"
                      },
                      "preferredDate": {
                        "key": "data.preferred_date"
                      },
                      "email": {
                        "key": "data.email",
                        "fn": "hash.sha256"
                      },
                      "phone": {
                        "key": "data.phone",
                        "fn": "hash.sha256"
                      },
                      "validationError": {
                        "key": "data.validation_error"
                      },
                      "serviceId": {
                        "key": "data.requested_service_id"
                      }
                    }
                  }
                }
              },
              "eventType": {
                "value": "xeracare.appointment"
              }
            }
          },
          "consent": {
            "analytics": true
          },
          "condition": {
            "op": "matches",
            "left": {
              "path": "data.form_name"
            },
            "right": {
              "value": "^.+$"
            }
          },
          "identity": {
            "Email_LC_SHA256": [
              {
                "id": {
                  "key": "data.email",
                  "fn": "hash.sha256"
                },
                "authenticatedState": "ambiguous"
              }
            ]
          }
        }
      },
      "search": {
        "view": {
          "data": {
            "map": {
              "search": {
                "map": {
                  "keywords": {
                    "key": "data.search_term"
                  }
                }
              },
              "web": {
                "map": {
                  "webPageDetails": {
                    "map": {
                      "name": {
                        "key": "data.page_name"
                      },
                      "URL": {
                        "key": "data.page_url"
                      },
                      "siteSection": {
                        "key": "data.site_section"
                      }
                    }
                  }
                }
              },
              "eventType": {
                "value": "xeracare.search"
              }
            }
          },
          "consent": {
            "analytics": true
          }
        }
      },
      "campaign": {
        "click": {
          "data": {
            "map": {
              "_aeppsemea": {
                "map": {
                  "campaign": {
                    "map": {
                      "name": {
                        "key": "data.campaign_name"
                      },
                      "category": {
                        "key": "data.campaign_category"
                      },
                      "label": {
                        "key": "data.campaign_label"
                      },
                      "placement": {
                        "key": "data.campaign_placement"
                      },
                      "component": {
                        "key": "data.campaign_component"
                      },
                      "regionPath": {
                        "key": "data.campaign_region_path"
                      }
                    }
                  }
                }
              },
              "web": {
                "map": {
                  "webPageDetails": {
                    "map": {
                      "name": {
                        "key": "data.page_name"
                      },
                      "URL": {
                        "key": "data.page_url"
                      },
                      "siteSection": {
                        "key": "data.site_section"
                      }
                    }
                  }
                }
              },
              "eventType": {
                "value": "web.webinteraction.linkClicks"
              }
            }
          },
          "consent": {
            "analytics": true
          }
        }
      },
      "service": {
        "view": {
          "data": {
            "map": {
              "_aeppsemea": {
                "map": {
                  "healthcareservice": {
                    "map": {
                      "serviceId": {
                        "key": "data.service_id"
                      },
                      "name": {
                        "key": "data.service_name"
                      },
                      "department": {
                        "key": "data.service_department"
                      },
                      "category": {
                        "key": "data.service_category"
                      }
                    }
                  }
                }
              },
              "web": {
                "map": {
                  "webPageDetails": {
                    "map": {
                      "name": {
                        "key": "data.page_name"
                      },
                      "URL": {
                        "key": "data.page_url"
                      },
                      "siteSection": {
                        "key": "data.site_section"
                      }
                    }
                  }
                }
              },
              "eventType": {
                "value": "xeracare.service"
              }
            }
          },
          "consent": {
            "analytics": true
          }
        }
      }
    }
  },
  "ajvBundle": {
    "schemas": {
      "tgt_page_view": {
        "title": "XDM ExperienceEvent",
        "description": "Generated from crosswalks/healthcare.appointment.crosswalk.yaml@1.0.1 — do not hand-edit (catalog:gen-fieldgroups).",
        "type": "object",
        "properties": {
          "_id": {
            "title": "Identifier",
            "type": "string",
            "format": "uri-reference"
          },
          "timestamp": {
            "title": "Timestamp",
            "type": "string",
            "format": "date-time"
          },
          "eventType": {
            "title": "Event Type",
            "type": "string"
          },
          "web": {
            "title": "Web",
            "type": "object",
            "properties": {
              "webPageDetails": {
                "title": "Web Page Details",
                "type": "object",
                "properties": {
                  "name": {
                    "title": "Name",
                    "description": "The normative name of the web page.",
                    "type": "string"
                  },
                  "URL": {
                    "title": "URL",
                    "description": "The URL of the web page.",
                    "type": "string",
                    "format": "uri"
                  },
                  "siteSection": {
                    "title": "Site Section",
                    "description": "The normative name of the site section where this web page resides.",
                    "type": "string"
                  }
                }
              }
            }
          },
          "_aeppsemea": {
            "type": "object",
            "properties": {
              "appointment": {
                "type": "object",
                "properties": {
                  "formName": {
                    "title": "formName",
                    "description": "The name of the item.",
                    "type": "string"
                  },
                  "appointmentType": {
                    "title": "appointmentType",
                    "description": "The type of service being offered, e.g. veterans' benefits, emergency relief, etc.",
                    "type": "string"
                  },
                  "department": {
                    "title": "department",
                    "description": "A relationship between an organization and a department of that organization, also described as an organization (allowing different urls, logos, opening hours). For example: a store with a pharmacy, or a bakery with a cafe.",
                    "type": "string"
                  },
                  "preferredDate": {
                    "title": "preferredDate",
                    "description": "The time the object is scheduled to.",
                    "type": "string",
                    "format": "date-time"
                  },
                  "email": {
                    "title": "email",
                    "description": "Email address.",
                    "type": "string"
                  },
                  "phone": {
                    "title": "phone",
                    "description": "The telephone number.",
                    "type": "string"
                  },
                  "stage": {
                    "title": "stage",
                    "description": "A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy.",
                    "type": "string"
                  },
                  "validationError": {
                    "title": "validationError",
                    "description": "For failed actions, more information on the cause of the failure.",
                    "type": "string"
                  },
                  "serviceId": {
                    "title": "serviceId",
                    "description": "The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.\n        ",
                    "type": "string"
                  }
                }
              },
              "campaign": {
                "type": "object",
                "properties": {
                  "name": {
                    "title": "name",
                    "description": "The name of the item.",
                    "type": "string"
                  },
                  "category": {
                    "title": "category",
                    "description": "A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy.",
                    "type": "string"
                  },
                  "label": {
                    "title": "label",
                    "description": "An alias for the item.",
                    "type": "string"
                  },
                  "placement": {
                    "title": "placement",
                    "type": "string"
                  },
                  "component": {
                    "title": "component",
                    "type": "string"
                  },
                  "regionPath": {
                    "title": "regionPath",
                    "type": "string"
                  }
                }
              }
            }
          },
          "search": {
            "title": "Search",
            "description": "The information related to web or mobile search.",
            "type": "object",
            "properties": {
              "searchEngine": {
                "title": "Search engine",
                "description": "The search engine used by the search.",
                "type": "string"
              },
              "searchEngineID": {
                "title": "Search engine ID",
                "description": "The application specified identifier used to identify the search engine used by the search.",
                "type": "string",
                "format": "uri"
              },
              "keywords": {
                "title": "Keywords",
                "description": "Keywords for the search.",
                "type": "string"
              },
              "isPaid": {
                "title": "Is paid",
                "description": "Indicate if the search is paid or not.",
                "type": "boolean"
              },
              "pageDepth": {
                "title": "Page depth",
                "description": "Page depth in the search results.",
                "type": "integer"
              },
              "slot": {
                "title": "Page slot",
                "description": "Named section of the page where the search result appeared, for example, top or side.",
                "type": "string"
              },
              "position": {
                "title": "Listing position",
                "description": "Position or rank of the listing in the search result page.",
                "type": "integer"
              }
            }
          }
        },
        "additionalProperties": true
      },
      "tgt_appointment_event": {
        "title": "XDM ExperienceEvent",
        "description": "Generated from crosswalks/healthcare.appointment.crosswalk.yaml@1.0.1 — do not hand-edit (catalog:gen-fieldgroups).",
        "type": "object",
        "properties": {
          "_id": {
            "title": "Identifier",
            "type": "string",
            "format": "uri-reference"
          },
          "timestamp": {
            "title": "Timestamp",
            "type": "string",
            "format": "date-time"
          },
          "eventType": {
            "title": "Event Type",
            "type": "string"
          },
          "web": {
            "title": "Web",
            "type": "object",
            "properties": {
              "webPageDetails": {
                "title": "Web Page Details",
                "type": "object",
                "properties": {
                  "name": {
                    "title": "Name",
                    "description": "The normative name of the web page.",
                    "type": "string"
                  },
                  "URL": {
                    "title": "URL",
                    "description": "The URL of the web page.",
                    "type": "string",
                    "format": "uri"
                  },
                  "siteSection": {
                    "title": "Site Section",
                    "description": "The normative name of the site section where this web page resides.",
                    "type": "string"
                  }
                }
              }
            }
          },
          "_aeppsemea": {
            "type": "object",
            "properties": {
              "appointment": {
                "type": "object",
                "properties": {
                  "formName": {
                    "title": "formName",
                    "description": "The name of the item.",
                    "type": "string"
                  },
                  "appointmentType": {
                    "title": "appointmentType",
                    "description": "The type of service being offered, e.g. veterans' benefits, emergency relief, etc.",
                    "type": "string"
                  },
                  "department": {
                    "title": "department",
                    "description": "A relationship between an organization and a department of that organization, also described as an organization (allowing different urls, logos, opening hours). For example: a store with a pharmacy, or a bakery with a cafe.",
                    "type": "string"
                  },
                  "preferredDate": {
                    "title": "preferredDate",
                    "description": "The time the object is scheduled to.",
                    "type": "string",
                    "format": "date-time"
                  },
                  "email": {
                    "title": "email",
                    "description": "Email address.",
                    "type": "string"
                  },
                  "phone": {
                    "title": "phone",
                    "description": "The telephone number.",
                    "type": "string"
                  },
                  "stage": {
                    "title": "stage",
                    "description": "A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy.",
                    "type": "string"
                  },
                  "validationError": {
                    "title": "validationError",
                    "description": "For failed actions, more information on the cause of the failure.",
                    "type": "string"
                  },
                  "serviceId": {
                    "title": "serviceId",
                    "description": "The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.\n        ",
                    "type": "string"
                  }
                }
              },
              "campaign": {
                "type": "object",
                "properties": {
                  "name": {
                    "title": "name",
                    "description": "The name of the item.",
                    "type": "string"
                  },
                  "category": {
                    "title": "category",
                    "description": "A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy.",
                    "type": "string"
                  },
                  "label": {
                    "title": "label",
                    "description": "An alias for the item.",
                    "type": "string"
                  },
                  "placement": {
                    "title": "placement",
                    "type": "string"
                  },
                  "component": {
                    "title": "component",
                    "type": "string"
                  },
                  "regionPath": {
                    "title": "regionPath",
                    "type": "string"
                  }
                }
              }
            }
          },
          "search": {
            "title": "Search",
            "description": "The information related to web or mobile search.",
            "type": "object",
            "properties": {
              "searchEngine": {
                "title": "Search engine",
                "description": "The search engine used by the search.",
                "type": "string"
              },
              "searchEngineID": {
                "title": "Search engine ID",
                "description": "The application specified identifier used to identify the search engine used by the search.",
                "type": "string",
                "format": "uri"
              },
              "keywords": {
                "title": "Keywords",
                "description": "Keywords for the search.",
                "type": "string"
              },
              "isPaid": {
                "title": "Is paid",
                "description": "Indicate if the search is paid or not.",
                "type": "boolean"
              },
              "pageDepth": {
                "title": "Page depth",
                "description": "Page depth in the search results.",
                "type": "integer"
              },
              "slot": {
                "title": "Page slot",
                "description": "Named section of the page where the search result appeared, for example, top or side.",
                "type": "string"
              },
              "position": {
                "title": "Listing position",
                "description": "Position or rank of the listing in the search result page.",
                "type": "integer"
              }
            }
          }
        },
        "additionalProperties": true
      },
      "tgt_search_event": {
        "title": "XDM ExperienceEvent",
        "description": "Generated from crosswalks/healthcare.appointment.crosswalk.yaml@1.0.1 — do not hand-edit (catalog:gen-fieldgroups).",
        "type": "object",
        "properties": {
          "_id": {
            "title": "Identifier",
            "type": "string",
            "format": "uri-reference"
          },
          "timestamp": {
            "title": "Timestamp",
            "type": "string",
            "format": "date-time"
          },
          "eventType": {
            "title": "Event Type",
            "type": "string"
          },
          "web": {
            "title": "Web",
            "type": "object",
            "properties": {
              "webPageDetails": {
                "title": "Web Page Details",
                "type": "object",
                "properties": {
                  "name": {
                    "title": "Name",
                    "description": "The normative name of the web page.",
                    "type": "string"
                  },
                  "URL": {
                    "title": "URL",
                    "description": "The URL of the web page.",
                    "type": "string",
                    "format": "uri"
                  },
                  "siteSection": {
                    "title": "Site Section",
                    "description": "The normative name of the site section where this web page resides.",
                    "type": "string"
                  }
                }
              }
            }
          },
          "_aeppsemea": {
            "type": "object",
            "properties": {
              "appointment": {
                "type": "object",
                "properties": {
                  "formName": {
                    "title": "formName",
                    "description": "The name of the item.",
                    "type": "string"
                  },
                  "appointmentType": {
                    "title": "appointmentType",
                    "description": "The type of service being offered, e.g. veterans' benefits, emergency relief, etc.",
                    "type": "string"
                  },
                  "department": {
                    "title": "department",
                    "description": "A relationship between an organization and a department of that organization, also described as an organization (allowing different urls, logos, opening hours). For example: a store with a pharmacy, or a bakery with a cafe.",
                    "type": "string"
                  },
                  "preferredDate": {
                    "title": "preferredDate",
                    "description": "The time the object is scheduled to.",
                    "type": "string",
                    "format": "date-time"
                  },
                  "email": {
                    "title": "email",
                    "description": "Email address.",
                    "type": "string"
                  },
                  "phone": {
                    "title": "phone",
                    "description": "The telephone number.",
                    "type": "string"
                  },
                  "stage": {
                    "title": "stage",
                    "description": "A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy.",
                    "type": "string"
                  },
                  "validationError": {
                    "title": "validationError",
                    "description": "For failed actions, more information on the cause of the failure.",
                    "type": "string"
                  },
                  "serviceId": {
                    "title": "serviceId",
                    "description": "The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.\n        ",
                    "type": "string"
                  }
                }
              },
              "campaign": {
                "type": "object",
                "properties": {
                  "name": {
                    "title": "name",
                    "description": "The name of the item.",
                    "type": "string"
                  },
                  "category": {
                    "title": "category",
                    "description": "A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy.",
                    "type": "string"
                  },
                  "label": {
                    "title": "label",
                    "description": "An alias for the item.",
                    "type": "string"
                  },
                  "placement": {
                    "title": "placement",
                    "type": "string"
                  },
                  "component": {
                    "title": "component",
                    "type": "string"
                  },
                  "regionPath": {
                    "title": "regionPath",
                    "type": "string"
                  }
                }
              }
            }
          },
          "search": {
            "title": "Search",
            "description": "The information related to web or mobile search.",
            "type": "object",
            "properties": {
              "searchEngine": {
                "title": "Search engine",
                "description": "The search engine used by the search.",
                "type": "string"
              },
              "searchEngineID": {
                "title": "Search engine ID",
                "description": "The application specified identifier used to identify the search engine used by the search.",
                "type": "string",
                "format": "uri"
              },
              "keywords": {
                "title": "Keywords",
                "description": "Keywords for the search.",
                "type": "string"
              },
              "isPaid": {
                "title": "Is paid",
                "description": "Indicate if the search is paid or not.",
                "type": "boolean"
              },
              "pageDepth": {
                "title": "Page depth",
                "description": "Page depth in the search results.",
                "type": "integer"
              },
              "slot": {
                "title": "Page slot",
                "description": "Named section of the page where the search result appeared, for example, top or side.",
                "type": "string"
              },
              "position": {
                "title": "Listing position",
                "description": "Position or rank of the listing in the search result page.",
                "type": "integer"
              }
            }
          }
        },
        "additionalProperties": true
      },
      "tgt_campaign_event": {
        "title": "XDM ExperienceEvent",
        "description": "Generated from crosswalks/healthcare.appointment.crosswalk.yaml@1.0.1 — do not hand-edit (catalog:gen-fieldgroups).",
        "type": "object",
        "properties": {
          "_id": {
            "title": "Identifier",
            "type": "string",
            "format": "uri-reference"
          },
          "timestamp": {
            "title": "Timestamp",
            "type": "string",
            "format": "date-time"
          },
          "eventType": {
            "title": "Event Type",
            "type": "string"
          },
          "web": {
            "title": "Web",
            "type": "object",
            "properties": {
              "webPageDetails": {
                "title": "Web Page Details",
                "type": "object",
                "properties": {
                  "name": {
                    "title": "Name",
                    "description": "The normative name of the web page.",
                    "type": "string"
                  },
                  "URL": {
                    "title": "URL",
                    "description": "The URL of the web page.",
                    "type": "string",
                    "format": "uri"
                  },
                  "siteSection": {
                    "title": "Site Section",
                    "description": "The normative name of the site section where this web page resides.",
                    "type": "string"
                  }
                }
              }
            }
          },
          "_aeppsemea": {
            "type": "object",
            "properties": {
              "appointment": {
                "type": "object",
                "properties": {
                  "formName": {
                    "title": "formName",
                    "description": "The name of the item.",
                    "type": "string"
                  },
                  "appointmentType": {
                    "title": "appointmentType",
                    "description": "The type of service being offered, e.g. veterans' benefits, emergency relief, etc.",
                    "type": "string"
                  },
                  "department": {
                    "title": "department",
                    "description": "A relationship between an organization and a department of that organization, also described as an organization (allowing different urls, logos, opening hours). For example: a store with a pharmacy, or a bakery with a cafe.",
                    "type": "string"
                  },
                  "preferredDate": {
                    "title": "preferredDate",
                    "description": "The time the object is scheduled to.",
                    "type": "string",
                    "format": "date-time"
                  },
                  "email": {
                    "title": "email",
                    "description": "Email address.",
                    "type": "string"
                  },
                  "phone": {
                    "title": "phone",
                    "description": "The telephone number.",
                    "type": "string"
                  },
                  "stage": {
                    "title": "stage",
                    "description": "A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy.",
                    "type": "string"
                  },
                  "validationError": {
                    "title": "validationError",
                    "description": "For failed actions, more information on the cause of the failure.",
                    "type": "string"
                  },
                  "serviceId": {
                    "title": "serviceId",
                    "description": "The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.\n        ",
                    "type": "string"
                  }
                }
              },
              "campaign": {
                "type": "object",
                "properties": {
                  "name": {
                    "title": "name",
                    "description": "The name of the item.",
                    "type": "string"
                  },
                  "category": {
                    "title": "category",
                    "description": "A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy.",
                    "type": "string"
                  },
                  "label": {
                    "title": "label",
                    "description": "An alias for the item.",
                    "type": "string"
                  },
                  "placement": {
                    "title": "placement",
                    "type": "string"
                  },
                  "component": {
                    "title": "component",
                    "type": "string"
                  },
                  "regionPath": {
                    "title": "regionPath",
                    "type": "string"
                  }
                }
              }
            }
          },
          "search": {
            "title": "Search",
            "description": "The information related to web or mobile search.",
            "type": "object",
            "properties": {
              "searchEngine": {
                "title": "Search engine",
                "description": "The search engine used by the search.",
                "type": "string"
              },
              "searchEngineID": {
                "title": "Search engine ID",
                "description": "The application specified identifier used to identify the search engine used by the search.",
                "type": "string",
                "format": "uri"
              },
              "keywords": {
                "title": "Keywords",
                "description": "Keywords for the search.",
                "type": "string"
              },
              "isPaid": {
                "title": "Is paid",
                "description": "Indicate if the search is paid or not.",
                "type": "boolean"
              },
              "pageDepth": {
                "title": "Page depth",
                "description": "Page depth in the search results.",
                "type": "integer"
              },
              "slot": {
                "title": "Page slot",
                "description": "Named section of the page where the search result appeared, for example, top or side.",
                "type": "string"
              },
              "position": {
                "title": "Listing position",
                "description": "Position or rank of the listing in the search result page.",
                "type": "integer"
              }
            }
          }
        },
        "additionalProperties": true
      },
      "tgt_care_service_lookup": {
        "title": "Record Schema",
        "description": "Generated from crosswalks/healthcare.service.crosswalk.yaml@1.0.0 — do not hand-edit (catalog:gen-fieldgroups).",
        "type": "object",
        "properties": {
          "_id": {
            "title": "Identifier",
            "type": "string",
            "format": "uri-reference"
          },
          "_aeppsemea": {
            "type": "object",
            "properties": {
              "healthcareservice": {
                "type": "object",
                "properties": {
                  "serviceId": {
                    "title": "serviceId",
                    "description": "The identifier property represents any kind of identifier for any kind of [[Thing]], such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See [background notes](/docs/datamodel.html#identifierBg) for more details.\n        ",
                    "type": "string"
                  },
                  "name": {
                    "title": "name",
                    "description": "The name of the item.",
                    "type": "string"
                  },
                  "department": {
                    "title": "department",
                    "description": "A relationship between an organization and a department of that organization, also described as an organization (allowing different urls, logos, opening hours). For example: a store with a pharmacy, or a bakery with a cafe.",
                    "type": "string"
                  },
                  "category": {
                    "title": "category",
                    "description": "A category for the item. Greater signs or slashes can be used to informally indicate a category hierarchy.",
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "additionalProperties": true
      }
    }
  }
};
