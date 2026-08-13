# System Architecture

## Purpose

This document describes the high-level architecture of the Moving in Mobile website, the responsibilities of its major systems, and the boundaries between the application, hosting platform, third-party services, and planned IDX integration.

The goal is to provide a future developer with a working mental model of how the site operates before modifying individual components.

## Architecture Overview

Moving in Mobile is a React single-page application built with Vite and styled with Tailwind CSS.

The website is deployed through Hostinger from a GitHub repository and integrates with several external services for lead capture, analytics, search visibility, and real-estate functionality.

The current architecture can be summarized as:

```text
Visitor Browser
      |
      v
movinginmobile.com
      |
      v
Hostinger
      |
      v
Vite Production Build
      |
      v
React Application
      |
      +----------------------+
      |                      |
      v                      v
React Router           Static Public Assets
      |                      |
      v                      v
Site Pages             Images / robots.txt
                       sitemap.xml / .htaccess
      |
      +-----------------------------+
      |              |              |
      v              v              v
Formspree          GA4       Structured Data / SEO
Lead Capture     Analytics
```

Elm Street / IDX Broker is the next major external system being integrated.

## Primary Technology Stack

The application currently uses:

* React
* React DOM
* React Router
* Vite
* Tailwind CSS
* Hostinger hosting
* GitHub source control
* Formspree
* Google Analytics 4
* Google Search Console
* JSON-LD structured data

The authoritative dependency definitions are maintained in:

`package.json`

and:

`package-lock.json`

## Application Entry Point

The application entry point is:

`src/main.jsx`

This file initializes React and wraps the application in React Router's `BrowserRouter`.

Conceptually:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

The primary application implementation is currently concentrated in:

`src/App.jsx`

This file contains:

* application page components
* navigation logic
* routing compatibility logic
* forms
* calls to action
* modal behavior
* page-level content
* analytics page metadata
* shared layout elements

The application is functional and production-ready, but `App.jsx` remains relatively large and may eventually benefit from further component extraction.

## Routing Architecture

As of August 12, 2026, the application uses React Router for URL-backed navigation.

Primary browser routes include:

* `/`
* `/about`
* `/buyers`
* `/sellers`
* `/neighborhoods`
* `/rowe-report`
* `/resources`
* `/contact`

Prior to this migration, pages were selected through React component state and the browser URL remained unchanged.

The migration retained a compatibility `setPage()` interface so existing internal CTAs and event-driven navigation did not need to be rewritten simultaneously.

For detailed routing behavior, see:

`05-state-and-navigation.md`

## Hostinger Hosting Architecture

Production and staging are hosted by Hostinger.

The application is built as a Vite frontend application.

Vite generates production files into:

`dist/`

Hostinger serves the generated application to visitors.

Because React Router performs client-side routing, direct requests such as:

```text
https://movinginmobile.com/buyers
```

must still return the application's `index.html`.

This is handled with:

`public/.htaccess`

The file is copied into the Vite production build and configures Hostinger to:

1. protect Hostinger's internal `.builds` path;
2. serve real files normally;
3. serve real directories normally;
4. send unknown application paths to `index.html`.

This allows React Router to interpret the requested route.

## Git and Deployment Architecture

The repository uses three important branch roles.

### `main`

`main` represents production-ready code.

Hostinger production deployment is based on this branch.

### `staging`

`staging` is the active development and integration branch.

New application work should normally be developed and committed here first.

### `redesign-v2`

`redesign-v2` is the branch monitored by Hostinger for the staging website.

It is fed from `staging` using:

```bash
git push origin staging:redesign-v2
```

The staging site is:

```text
https://staging.movinginmobile.com
```

The standard release flow is:

```text
Local development
      |
      v
staging
      |
      v
GitHub origin/staging
      |
      v
redesign-v2
      |
      v
Hostinger staging
      |
      v
Validation
      |
      v
Merge staging -> main
      |
      v
GitHub origin/main
      |
      v
Hostinger production
```

Production changes should not bypass staging validation except for a justified emergency recovery.

## Environment Separation

Two publicly deployed environments are maintained.

### Production

```text
https://movinginmobile.com
```

Production should contain only validated releases.

### Staging

```text
https://staging.movinginmobile.com
```

Staging is used for:

* feature validation;
* browser testing;
* mobile testing;
* routing tests;
* analytics verification;
* SEO validation;
* integration work;
* future IDX validation.

Staging-specific visual indicators are implemented through:

`src/components/StagingIndicators.jsx`

## Static Assets

Public assets are stored under:

`public/`

Examples include:

* Tina Rowe branding
* Keller Williams branding
* REALTOR® / Equal Housing graphics
* neighborhood photography
* social-media graphics
* hero photography
* van-wrap imagery
* favicon
* `robots.txt`
* `sitemap.xml`
* `.htaccess`

Files placed in `public/` are copied into the Vite build output and are addressable from the site root.

Filename capitalization matters in production environments.

## Lead Capture Architecture

Lead forms are submitted through Formspree.

The React application handles:

* form rendering;
* user input;
* submission state;
* success behavior;
* error behavior;
* contextual lead-source information.

Form submissions are sent to the configured Formspree endpoint.

Lead-generation interfaces include or may include:

* contact forms;
* buyer inquiries;
* seller inquiries;
* home valuation requests;
* listing alerts;
* modal lead capture;
* property inquiries after IDX integration.

Formspree is an external dependency. A successful application-side request does not necessarily prove final downstream email or CRM delivery.

Provider-level delivery should be verified when troubleshooting lead issues.

## Analytics Architecture

Google Analytics 4 is installed.

The application sends SPA page views for browser routes.

Analytics behavior includes:

* page-view tracking;
* route-specific page paths;
* route-specific page titles;
* production page locations.

The React Router migration changed navigation from virtual internal page states to real browser paths.

Analytics should therefore always be verified after routing changes.

The primary analytics implementation is currently associated with:

* `index.html`
* `src/App.jsx`

## SEO Architecture

The technical SEO foundation includes:

* canonical URLs;
* XML sitemap;
* `robots.txt`;
* JSON-LD structured data;
* Google Search Console verification;
* Google Analytics;
* production hostname normalization strategy.

The React Router migration introduced real crawlable paths for primary website pages.

Canonical URLs are now route-aware.

The sitemap should be maintained so public crawlable routes accurately reflect the site architecture.

SEO behavior is documented in more detail in:

`09-seo-architecture.md`

## Structured Data

Structured data is implemented using JSON-LD.

The primary implementation is maintained in:

`src/components/StructuredData.jsx`

Structured data should reflect visible and verifiable business facts.

Do not add unsupported claims, fabricated reviews, fabricated ratings, or information that conflicts with the visible site.

Rich Results validation has previously passed for the implemented structured-data foundation.

## Search Console

Google Search Console is configured for the production website.

The current technical SEO foundation has already been submitted and validated.

Search Console has reported conditions including:

* Indexed though blocked by robots.txt
* Blocked by robots.txt
* Page with redirect

Previous investigation determined that these warnings are primarily associated with alternate HTTP and `www` hostname behavior rather than a fundamental problem with the primary production site.

Cloudflare was considered solely to improve hostname redirect handling but was intentionally deferred because the operational complexity did not justify the current benefit.

This decision should be revisited only if indexing data demonstrates a material problem.

## IDX Architecture

Elm Street / IDX Broker integration is the current major development priority.

Tina Rowe's IDX feed has been approved and is connected to Gulf Coast MLS.

The planned architecture intentionally separates responsibilities.

### Main React Website

The React application remains responsible for:

* branding;
* marketing content;
* neighborhood editorial content;
* buyer and seller education;
* navigation;
* Tina's personal positioning;
* non-IDX lead capture;
* SEO and GEO content.

### IDX Broker

IDX Broker will be responsible for MLS-dependent functionality such as:

* property search;
* search results;
* map search;
* listing-detail pages;
* saved searches;
* MLS listing data;
* property-related lead registration;
* selected listing widgets;
* market reports where appropriate.

### Planned Custom IDX Domain

The preferred customer-facing IDX hostname is:

```text
homes.movinginmobile.com
```

At the time of this document update, IDX Broker still uses its default hostname:

```text
movinginmobile.idxbroker.com
```

The custom hostname should not be considered active until DNS and IDX Broker configuration have both been completed and validated.

### IDX Wrapper

IDX Broker supports Dynamic Wrappers.

The planned implementation uses a dedicated static wrapper page rather than a client-rendered React route.

The wrapper is expected to live under:

`public/idx-wrapper.html`

The reason for using a static file is that IDX Broker retrieves wrapper HTML from the server and expects wrapper marker elements to exist in the returned source.

A purely client-rendered React route may not expose those markers to IDX Broker during retrieval.

The wrapper will include:

* Moving in Mobile branding;
* site navigation;
* IDX content insertion markers;
* footer content;
* required legal or brokerage identity;
* responsive styling.

The expected wrapper URL is:

```text
https://movinginmobile.com/idx-wrapper.html
```

This page is an integration template and should not be promoted as a public destination or included in the public sitemap.

The wrapper has not yet been implemented at the time of this documentation update.

## External Service Boundaries

The application depends on several systems that are not fully represented in the repository.

These include:

* Hostinger deployment configuration;
* Hostinger domain configuration;
* DNS;
* SSL certificates;
* Formspree account configuration;
* Google Analytics property configuration;
* Google Search Console;
* IDX Broker account configuration;
* Gulf Coast MLS feed permissions.

The repository may document expected settings, but live provider configuration remains authoritative for those external systems.

A developer should not assume that repository contents alone fully describe provider-side behavior.

## Security and Secrets

Secrets must not be committed to Git.

Examples include:

* API keys;
* private tokens;
* provider credentials;
* account passwords.

The repository currently contains an `.env` file in some historical snapshots, but environment files should be excluded from future source archives if they may contain sensitive information.

IDX Broker API credentials must never be exposed in browser-delivered source code unless the credential is specifically designed for public client-side use.

Server-side secrets should be stored in appropriate environment or provider configuration.

## Build Architecture

The standard production build command is:

```bash
npm run build
```

This invokes Vite and generates:

`dist/`

The production build should complete successfully before any staging deployment.

The `dist/` directory is generated output and should not be edited manually as the normal method of changing site behavior.

Source changes should be made in the repository and rebuilt.

## Architectural Principles

Development should follow these principles:

### Prefer source-controlled configuration

Where practical, deployment-critical behavior should live in the repository.

The addition of `public/.htaccess` during the React Router migration is an example.

Initially, the SPA rewrite rule was added manually in Hostinger for testing.

After validation, the rule was moved into the repository so future deployments reproduce the required behavior automatically.

### Validate infrastructure changes on staging

Hosting, routing, analytics, SEO, and IDX changes should be tested on staging before production.

### Separate responsibilities

The React website should not attempt to recreate MLS functionality that IDX Broker already provides reliably.

Likewise, IDX Broker should not replace Tina's primary editorial and branding website.

### Avoid unnecessary infrastructure

New infrastructure should solve a meaningful problem.

For example, Cloudflare was not introduced solely to eliminate minor Search Console hostname warnings.

### Preserve maintainability

Avoid large simultaneous changes when smaller independently testable changes are possible.

The React Router migration was intentionally separated from IDX implementation.

## Known Architectural Technical Debt

Current areas for future improvement include:

* continued concentration of application logic in `src/App.jsx`;
* temporary `setPage()` routing compatibility layer;
* limited component modularization;
* need for route-specific SEO metadata abstraction;
* lack of a dedicated 404 page;
* neighborhood routing expansion;
* IDX integration not yet complete;
* possible future route-level code splitting;
* continued manual maintenance of some SEO artifacts.

These items should be tracked in:

`19-known-technical-debt.md`

## Architecture Change Control

Material changes to any of the following require corresponding documentation updates:

* routing;
* hosting;
* branch mappings;
* deployment;
* IDX;
* CRM or lead providers;
* analytics;
* SEO;
* structured data;
* authentication;
* application framework;
* build tooling;
* domain architecture.

Relevant changes should also be recorded in:

`20-decision-log.md`

## Current Architecture Status

As of August 12, 2026:

* React Router migration is complete.
* Real browser routes are live in production.
* Hostinger SPA fallback is source-controlled and validated.
* Production and staging are operational.
* Formspree remains the active non-IDX lead-capture provider.
* GA4 and Search Console remain active.
* Technical SEO foundation is in place.
* Elm Street / IDX Broker approval has been received.
* IDX custom-domain and wrapper implementation are the next major development milestone.
