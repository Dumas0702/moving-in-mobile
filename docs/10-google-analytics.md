# Google Analytics

## Purpose

This document describes the Google Analytics 4 implementation for the Moving in Mobile website.

It covers:

- current GA4 architecture
- initialization
- SPA page-view tracking
- React Router integration
- route naming
- testing
- privacy considerations
- future IDX tracking
- subdomain analytics
- lead-event measurement
- troubleshooting expectations

The goal is to keep analytics aligned with the actual site architecture and business goals.

---

# Analytics Platform

The site uses:

`Google Analytics 4`

GA4 is used to understand:

- traffic sources
- landing pages
- route engagement
- user navigation
- lead-generation behavior
- future IDX engagement
- content performance

Analytics should help answer business questions rather than simply collect data.

---

# Current GA4 Architecture

GA4 initialization is included at the application level.

The current application also sends route-aware `page_view` events.

This is necessary because the site is a React application using client-side routing.

A browser route change does not automatically behave like a traditional full-page navigation.

---

# Measurement ID

The GA4 Measurement ID is configured in the application.

It should be treated as a public analytics identifier rather than a private secret.

Do not confuse a GA4 Measurement ID with:

- private API credentials
- service-account keys
- IDX API keys
- authentication tokens

The Measurement ID may safely appear in client-delivered analytics code.

---

# GA4 Initialization

GA4 initialization is currently associated with the application shell in:

`index.html`

The application expects:

`window.gtag`

to become available after Google Analytics loads.

Changes to analytics initialization should be tested carefully because they can affect every route.

---

# React Router and Analytics

The site uses React Router.

Primary browser routes include:

- `/`
- `/about`
- `/buyers`
- `/sellers`
- `/neighborhoods`
- `/rowe-report`
- `/resources`
- `/contact`

These are real URLs.

This differs from the historical Version 1.0 architecture, where internal page changes were represented primarily through application state.

---

# Historical Virtual Page Tracking

Before React Router, paths such as:

`/buyers`

and:

`/sellers`

were useful analytics representations of internal application pages even though those paths were not true browser routes.

That historical description is now obsolete.

As of August 12, 2026, those paths are actual browser routes.

Analytics documentation must therefore distinguish the current route-driven architecture from the historical state-only model.

---

# Current Page View Logic

The application tracks route changes using React state derived from:

`location.pathname`

The page-view effect is located in:

`src/App.jsx`

Conceptually, the application performs behavior similar to:

    window.gtag("event", "page_view", {
      send_to: GA_MEASUREMENT_ID,
      page_title: analyticsPage.title,
      page_location: canonicalUrl,
      page_path: analyticsPage.path,
    });

The exact current implementation in the repository remains authoritative.

---

# Route-Aware Page Views

A page-view event should reflect the actual browser route.

Examples:

    Homepage
    page_path: /

    Buyers
    page_path: /buyers

    Sellers
    page_path: /sellers

    Resources
    page_path: /resources

This alignment improves consistency between:

- browser navigation
- GA4 reports
- Search Console
- canonical URLs
- future SEO analysis

---

# Page Title

GA4 page views include the route-specific document title.

The title should accurately represent the current page.

Future route-metadata improvements should keep analytics titles synchronized with SEO titles where appropriate.

Avoid maintaining conflicting title systems without a clear reason.

---

# Page Location

`page_location`

should represent the full page URL.

For production, examples should ultimately correspond to:

    https://movinginmobile.com/
    https://movinginmobile.com/buyers
    https://movinginmobile.com/sellers

Staging activity may naturally use the staging hostname during testing.

Production reports should not unexpectedly show localhost or staging traffic as primary public traffic.

---

# Canonical URLs and Analytics

Canonical URLs and analytics page locations serve different purposes, but the route identities should normally align.

Example:

    Browser route:
    /buyers

    Analytics page path:
    /buyers

    Production canonical:
    https://movinginmobile.com/buyers

Major disagreement between these values should be investigated.

---

# Analytics Metadata Mapping

Route-related analytics configuration currently remains associated with metadata logic in:

`src/App.jsx`

This may include:

- title
- path
- page identity

This is known architectural debt.

A future centralized metadata structure should ideally serve:

- document title
- canonical URL
- meta description
- GA4 page identity
- social metadata

without creating unnecessary duplication.

---

# Avoid Duplicate Page Views

SPA analytics can easily generate duplicate page-view events.

Possible causes include:

- automatic GA4 page-view handling
- manual SPA page-view handling
- duplicate effects
- duplicate tag initialization
- React development behavior
- multiple analytics integrations

Do not remove tracking simply because duplicate-looking events appear during development.

First determine exactly which system is generating them.

---

# React Strict Mode Considerations

React development behavior can cause effects to run more than once under certain configurations.

If duplicate events appear only during local development, compare behavior with:

- staging
- production
- GA4 DebugView

before concluding that production analytics are broken.

---

# Analytics Testing

For routing or analytics changes, validate the following:

1. homepage creates expected page view
2. Buyers route creates expected page view
3. Sellers route creates expected page view
4. browser Back creates appropriate route tracking
5. browser Forward creates appropriate route tracking
6. direct route load is tracked
7. route refresh is tracked
8. page title is correct
9. page path is correct
10. page location is correct

---

# GA4 Realtime

GA4 Realtime can be used for basic deployment validation.

Useful questions include:

- is the current session visible?
- is the expected page being reported?
- does the route name look correct?
- does navigation appear?

Realtime is useful for quick verification but may not provide enough detail for debugging every event.

---

# GA4 DebugView

GA4 DebugView is more useful when inspecting specific event behavior.

It can help validate:

- `page_view`
- custom lead events
- route changes
- duplicate events
- parameter values

Use DebugView when introducing new analytics behavior.

---

# Browser Network Validation

The browser Network panel can help determine whether analytics requests are being sent.

When troubleshooting:

- inspect Google Analytics requests
- confirm requests are not blocked
- verify expected events occur after navigation
- distinguish browser-extension blocking from application failure

Ad blockers and privacy tools may intentionally block GA4.

Do not treat a blocked request in one browser profile as proof that site analytics are universally broken.

---

# Browser Console Validation

Check the Console for:

- `gtag` errors
- JavaScript runtime exceptions
- undefined analytics references
- duplicate initialization warnings

The application should not fail simply because analytics cannot load.

Core site functionality must remain usable if GA4 is blocked or unavailable.

---

# Analytics Should Not Block Rendering

GA4 is an observability tool, not a runtime dependency for the core website.

If Analytics fails:

- pages should still render
- routing should still work
- forms should still work
- IDX should still work

Do not create application logic that depends on GA4 successfully loading.

---

# Lead Analytics

GA4 can be used to measure lead-generation behavior.

Potential future custom events include:

- `contact_form_open`
- `contact_form_submit`
- `home_valuation_submit`
- `listing_alert_submit`
- `idx_search_start`
- `idx_listing_view`
- `idx_saved_search`
- `idx_registration`
- `idx_property_inquiry`
- `idx_showing_request`

Event names should be consistent and documented.

---

# Event Naming Strategy

Prefer event names that are:

- lowercase
- concise
- descriptive
- stable over time

Examples:

    contact_form_submit
    home_valuation_submit
    idx_property_inquiry

Avoid inconsistent variants such as:

    ContactFormSubmit
    contact-submit
    form1_complete

for the same conceptual behavior.

---

# Event Parameters

Useful non-sensitive event parameters may include:

- route
- CTA location
- request type
- content category
- neighborhood
- IDX interaction type
- property context in non-personally-identifying form where appropriate

Do not send personally identifiable information to GA4.

---

# Personally Identifiable Information

Do not send GA4:

- names
- email addresses
- phone numbers
- form-message content
- identified customer addresses
- private client information

Analytics should describe behavior, not store lead contact data.

Lead details belong in:

- Formspree
- IDX Broker
- CRM
- appropriate business systems

not Google Analytics.

---

# Form Analytics

For Formspree-based forms, analytics may track behavior such as:

    form displayed
        |
        v
    form started
        |
        v
    form submitted successfully

Tracking should not include the actual entered form data.

---

# Conversion Events

Important lead events may eventually be marked as GA4 key events/conversions.

Candidates include:

- contact submission
- home valuation request
- IDX property inquiry
- IDX showing request
- saved-search registration

Do not classify every minor click as a conversion.

Conversions should represent meaningful business outcomes.

---

# CTA Analytics

Major CTAs may be useful to track independently from completed forms.

Examples:

- Search Homes clicked
- Home Valuation clicked
- Contact Tina clicked
- View Fairhope Homes clicked
- New Listing Alerts clicked

This helps identify where users enter conversion flows.

---

# Neighborhood Analytics

Future neighborhood routes will create valuable analytics segmentation.

Examples:

    /neighborhoods/fairhope
    /neighborhoods/daphne
    /neighborhoods/spanish-fort

Useful questions may include:

- which neighborhood attracts the most traffic?
- which generates the most IDX searches?
- which generates the most inquiries?
- which attracts organic traffic?
- which generates longer engagement?

---

# Rowe Report Analytics

The Rowe Report can be evaluated through:

- route views
- video interaction
- CTA clicks
- subsequent IDX search
- subsequent contact actions

This helps determine whether editorial/video content contributes to business outcomes.

---

# Traffic Source Analysis

GA4 can help evaluate traffic from:

- organic search
- Facebook
- direct
- referral sites
- future advertising
- email
- other social platforms

UTM parameters should be used consistently when intentionally creating campaign links.

---

# UTM Parameters

Future campaigns may use parameters such as:

    utm_source
    utm_medium
    utm_campaign

Example conceptual structure:

    ?utm_source=facebook
    &utm_medium=social
    &utm_campaign=fairhope_relocation

UTM naming should be standardized before campaign volume grows.

Avoid creating inconsistent campaign naming that makes reporting difficult.

---

# Future IDX Analytics

Elm Street / IDX Broker introduces a major analytics architecture consideration.

The planned IDX hostname is:

`homes.movinginmobile.com`

Users will move between:

`movinginmobile.com`

and:

`homes.movinginmobile.com`

Analytics should represent this as one coherent customer journey where technically feasible.

---

# Same Root Domain Considerations

Because both planned hostnames share:

`movinginmobile.com`

GA4 may be able to maintain user/session continuity more naturally than if IDX remained solely on:

`idxbroker.com`

However, this behavior must be tested.

Do not assume subdomain tracking is correct merely because the hostnames share the same root domain.

---

# IDX Analytics Questions

During IDX implementation, determine:

1. Can the existing GA4 property be used on IDX pages?
2. Can the current Measurement ID be added through IDX Broker?
3. Does IDX inject its own analytics?
4. Are duplicate page views created?
5. Does navigation between subdomains preserve the session?
6. Does the IDX domain appear as a self-referral?
7. Can listing-detail views be measured?
8. Can search activity be measured?
9. Can lead submissions be measured?
10. Are personally identifiable values accidentally passed to GA4?

Document the verified answers after implementation.

---

# Self-Referral Risk

If analytics is configured incorrectly, traffic moving from:

`movinginmobile.com`

to:

`homes.movinginmobile.com`

could potentially appear as a new referral session.

This would distort:

- acquisition reports
- conversions
- user journey analysis

Test actual GA4 session behavior once the custom IDX domain is active.

---

# IDX Page Views

At minimum, useful IDX page categories may include:

- Advanced Search
- Results
- Listing Detail
- Map Search
- Saved Search
- Registration
- Home Valuation
- Schedule Showing

The exact event structure should be based on what IDX Broker exposes reliably.

Do not create brittle scraping-based analytics if provider-supported tracking is available.

---

# IDX Search Events

Search behavior can be valuable because it indicates buyer intent.

Potential analytics may include:

- search initiated
- location searched
- listing-detail opened
- saved search created

Avoid transmitting sensitive or excessively granular personal preference data without a clear business reason.

---

# IDX Listing Views

Listing-detail page views may be useful for understanding property engagement.

Possible non-sensitive context may include:

- listing ID
- city
- price range
- property type

Before adding custom parameters, verify:

- GA4 policy
- privacy implications
- whether IDX Broker already sends similar data
- whether the data is actually useful

---

# IDX Lead Events

High-value IDX events may include:

- property inquiry
- showing request
- registration
- saved search

These are strong candidates for future conversion tracking.

The event should represent successful completion, not merely opening a form.

---

# IDX Analytics Implementation Rule

Do not design the full IDX analytics implementation before the actual IDX environment is accessible through the custom domain.

First:

1. configure wrapper
2. configure custom domain
3. validate IDX pages
4. inspect available analytics settings
5. test actual GA4 behavior
6. then implement or refine event tracking

This avoids designing against assumptions about provider behavior.

---

# Staging Analytics

Staging traffic may enter GA4 during testing depending on current configuration.

That may be acceptable temporarily, but staging traffic should be distinguishable from production.

Possible future improvements include:

- hostname filtering in reports
- development/staging data filters
- separate testing strategy

Do not make rushed GA4 configuration changes that could permanently discard useful production data.

---

# Internal Traffic

Internal testing by developers or Tina may affect analytics.

A future internal-traffic strategy may be considered if testing volume materially distorts reporting.

This is not currently a high-priority architecture item.

---

# Search Console and GA4

GA4 and Google Search Console serve different purposes.

Search Console helps answer:

- how Google finds the site
- what queries produce impressions
- what pages rank
- indexing problems

GA4 helps answer:

- what visitors do after arriving
- which pages they view
- which CTAs they use
- whether they become leads

The two should be analyzed together where useful.

---

# Analytics and SEO Route Alignment

The site should generally maintain consistency between:

- browser path
- canonical path
- sitemap path
- analytics page path

Example:

    Browser:
    /buyers

    Sitemap:
    https://movinginmobile.com/buyers

    Canonical:
    https://movinginmobile.com/buyers

    GA4 page_path:
    /buyers

This makes reporting and troubleshooting easier.

---

# Analytics and GEO

Future GEO content should also be measurable.

Useful questions may include:

- which relocation questions attract organic visits?
- which answer pages lead to IDX searches?
- which local guides produce contact inquiries?
- which content gets repeat engagement?

Analytics should help identify useful content, not merely page popularity.

---

# Privacy Principles

Analytics implementation should follow data-minimization principles.

Collect behavior needed to improve:

- content
- user experience
- lead generation
- marketing effectiveness

Avoid unnecessary user-level tracking complexity.

---

# Consent and Legal Review

If future advertising, remarketing, expanded tracking, or regulatory requirements introduce consent obligations, the analytics implementation should be reviewed accordingly.

Do not assume the current lightweight GA4 implementation is sufficient for every future marketing technology.

---

# Analytics Change Control

Changes to any of the following should trigger review of this document:

- GA4 Measurement ID
- route architecture
- page-view logic
- metadata architecture
- form event tracking
- conversion definitions
- IDX integration
- IDX hostname
- cross-domain/subdomain tracking
- consent architecture

Major analytics decisions should also be recorded in:

`docs/20-decision-log.md`

---

# Troubleshooting Missing Page Views

If page views disappear:

1. confirm GA script loads
2. check `window.gtag`
3. inspect Console
4. inspect Network
5. verify route effect executes
6. check GA4 Realtime
7. check DebugView
8. compare staging and production
9. check browser extensions

Do not assume GA4 itself is down without checking client behavior.

---

# Troubleshooting Duplicate Page Views

If duplicate views appear:

1. inspect GA initialization
2. inspect route `page_view` effect
3. check automatic page-view behavior
4. test outside local Strict Mode behavior
5. inspect DebugView
6. compare event timestamps and parameters

Remove duplication only after identifying the actual source.

---

# Troubleshooting Wrong Page Path

Check:

- route mapping
- analytics metadata mapping
- current browser pathname
- `page_path` value
- fallback logic

Historical virtual-page assumptions should no longer be used.

---

# Troubleshooting Wrong Hostname

If production analytics contains unexpected:

`staging.movinginmobile.com`

or:

`localhost`

traffic, determine whether it came from legitimate testing.

Do not change canonical logic merely to correct analytics testing traffic.

These systems should be diagnosed independently.

---

# Release Blocking Analytics Issues

Analytics problems usually should not block a release if core functionality works.

However, release should be reconsidered if a change:

- completely breaks production analytics
- leaks personally identifiable information
- creates severe duplicate conversion reporting
- materially destroys source attribution
- breaks an explicitly required campaign measurement

IDX launch should include at least basic analytics validation before being considered fully complete.

---

# Future Analytics Roadmap

Expected future work includes:

1. verify route page-view behavior after ongoing SEO changes
2. define lead event naming
3. implement high-value Formspree conversion events
4. configure IDX custom hostname
5. inspect IDX analytics capabilities
6. validate subdomain session continuity
7. add IDX page/event tracking where useful
8. identify high-value conversions
9. develop neighborhood reporting
10. develop content-to-lead reporting

---

# Current Analytics Baseline

As of August 12, 2026:

- Google Analytics 4 is installed;
- GA4 supports SPA route tracking;
- React Router routes are real browser paths;
- route-aware `page_view` logic is active;
- analytics paths should align with current browser routes;
- historical virtual-route documentation is obsolete;
- analytics must not receive personally identifiable lead data;
- future IDX integration will introduce `homes.movinginmobile.com`;
- IDX subdomain/session behavior has not yet been validated;
- IDX analytics design should be finalized only after the actual custom-domain environment is operational.

## Related Documentation

See also:

- `05-state-and-navigation.md`
- `08-lead-generation.md`
- `09-seo-architecture.md`
- `11-search-console.md`
- `17-security-maintenance.md`
- `18-testing-qa.md`
- `19-known-technical-debt.md`
- `20-decision-log.md`
- `21-future-roadmap.md`
- `23-deployment-checklist.md`
- `24-release-checklist.md`
- `25-troubleshooting.md`