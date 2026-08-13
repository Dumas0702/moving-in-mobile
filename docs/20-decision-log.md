# Decision Log

## Purpose

This document records important architectural, deployment, SEO, integration, and maintenance decisions for the Moving in Mobile website.

The purpose is to preserve the reasoning behind significant choices so future developers do not accidentally reverse them without understanding the tradeoffs that led to the current implementation.

This is not intended to record every code change.

Use this file for decisions that materially affect:

* architecture
* routing
* deployment
* hosting
* SEO
* integrations
* security
* maintainability
* long-term development direction

## Decision Format

Each decision should include:

* date
* status
* context
* decision
* rationale
* consequences
* revisit conditions where appropriate

---

# Decision 001 — Use React + Vite + Tailwind CSS

Date: Version 1.0 baseline

Status: Accepted

## Context

The site required a modern, responsive, highly customized marketing experience with reusable components, strong visual control, interactive lead-generation elements, and room for future integrations.

## Decision

Use:

* React
* Vite
* Tailwind CSS

as the primary front-end stack.

## Rationale

This stack provides:

* fast local development
* component-based architecture
* straightforward production builds
* strong responsive styling
* flexibility for custom design
* compatibility with modern third-party integrations

## Consequences

The site is client-rendered and requires appropriate hosting support for browser routing.

SEO-related rendering and route behavior must be considered explicitly as the site grows.

---

# Decision 002 — Use Hostinger for Production and Staging

Date: Version 1.0 baseline

Status: Accepted

## Context

The site required managed deployment, custom-domain hosting, staging support, SSL, and GitHub-based deployment.

## Decision

Use Hostinger as the primary hosting platform.

Maintain:

* production at `movinginmobile.com`
* staging at `staging.movinginmobile.com`

## Consequences

Hostinger-specific behavior must be documented and tested.

The React Router SPA fallback is one example of hosting-specific configuration required by this architecture.

---

# Decision 003 — Use `main` for Production and `staging` for Development

Date: Version 1.0 baseline

Status: Accepted

## Context

Development needed a predictable promotion path that prevented unvalidated work from reaching production.

## Decision

Use:

`main`

as the production branch.

Use:

`staging`

as the development and integration branch.

Hostinger staging watches:

`redesign-v2`

which is fed from `staging`.

## Standard Flow

```text id="qwk7eg"
staging
   |
   v
origin/staging
   |
   v
origin/redesign-v2
   |
   v
Hostinger staging
   |
   v
validation
   |
   v
merge staging into main
   |
   v
Hostinger production
```

## Consequences

New development should not normally be performed directly on `main`.

Branch mappings must be treated as deployment-critical configuration.

---

# Decision 004 — Keep Formspree for Existing Non-IDX Lead Capture

Date: Version 1.0 baseline

Status: Accepted

## Context

The site required functioning lead forms without introducing a custom backend.

## Decision

Use Formspree for existing buyer, seller, contact, valuation, and related non-IDX forms.

## Rationale

Formspree provides:

* simple integration
* no custom server requirement
* fast implementation
* appropriate reliability for the current use case

## Consequences

IDX Broker will likely introduce a second lead system for property-specific inquiries.

Lead-source fragmentation must be monitored as IDX is implemented.

---

# Decision 005 — Implement Google Analytics 4 with SPA Page Tracking

Date: Version 1.0 baseline

Status: Accepted

## Context

The original application used internal page state rather than browser routes.

Normal browser page-load tracking therefore did not represent internal navigation accurately.

## Decision

Implement GA4 SPA page-view tracking.

## Consequences

After React Router migration, analytics remains route-aware but should be aligned with real browser paths rather than virtual page-state assumptions.

---

# Decision 006 — Implement Technical SEO Before Content Expansion

Date: Version 1.0 baseline

Status: Accepted

## Context

The website needed a solid technical foundation before significant SEO content investment.

## Decision

Implement the technical SEO foundation first, including:

* Search Console
* sitemap
* robots.txt
* canonical URLs
* structured data
* analytics
* production hostname strategy

before extensive neighborhood and GEO content expansion.

## Consequences

Future SEO work can now focus more heavily on:

* page-specific metadata
* local content
* internal linking
* IDX SEO
* GEO

rather than correcting foundational technical issues first.

---

# Decision 007 — Do Not Add Cloudflare Solely for `www` Redirect Handling

Date: August 2026

Status: Accepted

## Context

Google Search Console reported conditions involving alternate HTTP and `www` hostnames.

Hostinger did not provide a simple preferred redirect mechanism for the current deployment architecture.

Cloudflare was considered as a possible external solution.

## Decision

Do not introduce Cloudflare solely to force `www` to non-`www` redirects.

## Rationale

The observed Search Console warnings did not justify:

* another infrastructure dependency
* additional DNS complexity
* additional operational ownership

for the current level of impact.

## Consequences

Continue monitoring Search Console.

Revisit only if alternate-hostname behavior causes a measurable indexing or ranking problem.

---

# Decision 008 — Migrate to React Router Before Full IDX Integration

Date: August 12, 2026

Status: Accepted and Implemented

## Context

The Version 1.0 site used React state to simulate page changes.

Pages such as Buyers, Sellers, Resources, and Neighborhoods did not have real browser URLs.

Elm Street / IDX Broker integration requires stable URL architecture and will introduce:

* search entry points
* external subdomain navigation
* neighborhood search links
* analytics paths
* SEO relationships

## Decision

Complete the React Router migration before full IDX integration.

## Rationale

Implementing IDX first would likely require revisiting:

* navigation links
* browser history
* GA4 tracking
* canonicals
* internal links
* saved-search links
* neighborhood URLs

after the routing migration.

Doing routing first creates a stable foundation for IDX.

## Consequences

Primary pages now have real browser URLs.

IDX work can now be designed around stable route architecture.

---

# Decision 009 — Preserve a Temporary `setPage()` Compatibility Layer

Date: August 12, 2026

Status: Accepted — Transitional

## Context

The existing application contained many navigation calls based on:

```jsx id="nu3ga0"
setPage("buyers");
```

A complete rewrite of all navigation calls at the same time as the routing migration would have increased regression risk.

## Decision

Retain a temporary `setPage()` compatibility function that translates legacy page keys into React Router navigation.

## Rationale

This allowed:

* low-risk migration
* incremental refactoring
* preservation of existing CTA behavior
* easier validation

## Consequences

The application currently supports both:

* route-native navigation
* legacy page-key-based programmatic navigation

The compatibility layer should eventually be removed after remaining legacy calls are migrated.

---

# Decision 010 — Use `NavLink` for Primary Header Navigation

Date: August 12, 2026

Status: Accepted and Implemented

## Context

The original header used buttons and programmatic page-state changes.

## Decision

Use React Router `NavLink` for primary desktop and mobile navigation.

## Rationale

This provides:

* semantic links
* active-route awareness
* right-click/open-in-new-tab support
* copy-link support
* standard browser behavior
* improved accessibility

## Consequences

Normal navigation should prefer links.

`useNavigate()` should be reserved for genuine programmatic navigation.

---

# Decision 011 — Source-Control Hostinger SPA Fallback

Date: August 12, 2026

Status: Accepted and Implemented

## Context

After React Router was deployed to staging, direct requests such as:

`/buyers`

returned Hostinger 404 responses.

The problem was confirmed to be hosting fallback behavior rather than React Router logic.

A manual `.htaccess` change in Hostinger File Manager fixed the problem.

## Decision

Store the required rewrite configuration in:

`public/.htaccess`

instead of relying on an undocumented manual Hostinger change.

## Current Configuration

```apache id="oy742x"
RewriteEngine On

RewriteRule ^\.builds - [F,L]

RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

RewriteRule ^ index.html [L]
```

## Rationale

Deployment-critical behavior should be reproducible from source control when practical.

## Consequences

Future deployments automatically include the SPA fallback.

Nested-route refresh must remain part of deployment QA.

---

# Decision 012 — Preserve Hostinger `.builds` Protection Rule

Date: August 12, 2026

Status: Accepted

## Context

The existing Hostinger `.htaccess` contained:

```apache id="ej8j4a"
RewriteRule ^\.builds - [F,L]
```

before the React Router fallback was added.

## Decision

Preserve this rule.

## Rationale

It appears to protect Hostinger internal build infrastructure.

There was no reason to remove a provider-specific protection rule while solving an unrelated routing problem.

## Consequences

Future `.htaccess` changes should retain this protection unless Hostinger documentation or infrastructure changes indicate otherwise.

---

# Decision 013 — Use Real Route-Aware Canonical URLs

Date: August 12, 2026

Status: Accepted and Implemented

## Context

Before React Router, all virtual pages effectively shared the homepage browser URL.

The homepage canonical was therefore used globally.

After route migration, pages became independently addressable.

## Decision

Update canonical URLs based on the current route.

Examples:

```text id="0d5mvr"
https://movinginmobile.com/buyers
https://movinginmobile.com/sellers
https://movinginmobile.com/resources
```

## Rationale

Continuing to canonicalize every route to the homepage would undermine the new route architecture.

## Consequences

Canonical logic must remain synchronized with route structure.

Page-specific metadata remains future work.

---

# Decision 014 — Keep Main Website and IDX Responsibilities Separate

Date: August 2026

Status: Accepted

## Context

IDX Broker provides MLS-dependent functionality, while the existing React application provides Tina's branding, content, and marketing experience.

## Decision

Use a hybrid architecture.

### React Website Responsibilities

The main React website remains responsible for:

* branding
* buyer education
* seller education
* neighborhood editorial content
* local expertise
* resources
* Rowe Report content
* non-IDX lead capture
* SEO and GEO content

### IDX Broker Responsibilities

IDX Broker will handle:

* MLS property search
* search results
* map search
* listing details
* saved searches
* MLS property data
* property-specific lead workflows
* selected listing widgets
* market-report functionality where appropriate

## Rationale

Do not rebuild MLS functionality that IDX Broker already provides.

Do not allow IDX Broker to replace Tina's differentiated editorial and branding website.

## Consequences

Navigation, analytics, branding, and SEO must bridge the two systems cleanly.

---

# Decision 015 — Use `homes.movinginmobile.com` as the Preferred IDX Hostname

Date: August 2026

Status: Planned

## Context

IDX Broker currently provides:

`movinginmobile.idxbroker.com`

A customer-facing custom hostname is preferable.

## Decision

Use:

`homes.movinginmobile.com`

as the preferred IDX subdomain.

## Rationale

`homes` is:

* understandable to consumers
* aligned with search intent
* less technical than `idx`
* appropriate for property-search URLs

## Consequences

DNS and IDX Broker custom-domain configuration must both be completed and validated.

Until then, the default IDX Broker hostname remains active.

---

# Decision 016 — Use a Static HTML IDX Wrapper Instead of a React Route

Date: August 2026

Status: Planned

## Context

IDX Broker Dynamic Wrappers retrieve HTML from a supplied URL and expect wrapper markers in the returned HTML source.

A normal client-rendered React route initially returns the application shell rather than the final rendered markup.

## Decision

Create a real static wrapper file:

`public/idx-wrapper.html`

rather than relying on a React-only route.

## Rationale

This ensures IDX Broker can retrieve the required wrapper markers directly from the server response.

## Expected URL

`https://movinginmobile.com/idx-wrapper.html`

## Consequences

The wrapper must be maintained separately from React-rendered pages but should visually match the primary website.

The wrapper should not be treated as a public SEO landing page.

---

# Decision 017 — Do Not Add IDX to the Site Before Custom Domain and Wrapper Are Stable

Date: August 2026

Status: Accepted

## Context

It would be possible to begin linking users immediately to the default IDX Broker hostname.

## Decision

Do not broadly integrate IDX links into the production React website until:

* custom-domain configuration
* wrapper rendering
* search pages
* results
* listing-detail behavior

are validated.

## Rationale

Avoid building navigation and marketing flows around temporary vendor URLs.

## Consequences

IDX work should proceed as an infrastructure milestone before broad user-facing integration.

---

# Decision 018 — Make GitHub Markdown the Living Engineering Manual

Date: August 12, 2026

Status: Accepted and In Progress

## Context

The Version 1.0 Engineering Manual was completed as separate DOCX artifacts.

The repository already contained a structured:

`docs/`

directory, but many Markdown files were placeholders.

This created a split between:

* source code
* living documentation
* historical handoff documents

## Decision

Use:

`docs/*.md`

in the GitHub repository as the authoritative living Engineering Manual.

The Version 1.0 DOCX manual remains a historical release snapshot.

## Rationale

Markdown in Git provides:

* meaningful diffs
* version history
* easy code references
* branch-aligned documentation
* easier developer handoff
* simpler maintenance

## Consequences

Major application changes should update the relevant Markdown documentation before the feature is considered complete.

PDF or DOCX manuals may still be generated periodically as release artifacts.

---

# Decision 019 — Do Not Require Hostinger Deployment for Documentation-Only Changes

Date: August 12, 2026

Status: Accepted

## Context

The living Engineering Manual now resides under:

`docs/`

These files are not part of the customer-facing runtime application.

## Decision

Documentation-only changes need to be pushed to GitHub but do not require a Hostinger staging deployment solely for storage.

## Rationale

Deploying unchanged website code provides no runtime validation value for documentation-only commits.

## Consequences

Documentation can be committed to:

`staging`

and later merged to:

`main`

without pushing `staging:redesign-v2` unless application behavior also changed.

---

# Decision 020 — Separate Major Architectural Changes Into Testable Milestones

Date: August 2026

Status: Accepted

## Context

Several major changes are planned:

* React Router
* IDX
* page-specific SEO
* neighborhood expansion
* GEO
* component refactoring

Combining these into one release would create a large debugging surface.

## Decision

Implement major architecture work as independent milestones.

Example sequence:

```text id="w7ucmi"
React Router
      |
      v
IDX infrastructure
      |
      v
IDX user-facing integration
      |
      v
page-specific SEO
      |
      v
neighborhood expansion
      |
      v
GEO
```

## Rationale

Smaller changes provide:

* clearer testing
* safer rollback
* easier root-cause analysis
* more understandable Git history

## Consequences

Avoid combining broad refactors with major integration work unless a dependency makes it unavoidable.

---

# Decision 021 — Treat IDX as the Highest Development Priority After Routing

Date: August 2026

Status: Accepted

## Context

Tina's Elm Street / IDX Broker account has been approved and the Gulf Coast MLS feed is available.

Property search is a major missing capability of the current site.

## Decision

After routing and documentation stabilization, prioritize IDX implementation ahead of:

* broad component refactoring
* GEO expansion
* market-report content
* nonessential design revisions

## Rationale

IDX has direct value for:

* lead generation
* buyer experience
* neighborhood integration
* property search
* listing details
* saved searches
* future SEO

## Consequences

Technical cleanup that does not block IDX should generally wait until the IDX foundation is stable.

---

# Decision 022 — Use the Repository as the Source of Truth for Implemented Behavior

Date: August 12, 2026

Status: Accepted

## Context

Historical manuals, screenshots, provider dashboards, and prior conversations can become stale.

## Decision

For implemented application behavior:

1. current repository source is authoritative;
2. live provider configuration is authoritative for external services;
3. documentation should describe those realities;
4. when documentation conflicts with implementation, verify implementation and update the documentation.

## Consequences

Future documentation should be grounded in current code rather than memory alone.

---

# Decision Review Rules

Revisit a decision when:

* the underlying provider changes;
* the architecture materially changes;
* the original rationale no longer applies;
* operational experience shows the decision creates significant cost or risk;
* a higher-value alternative becomes available.

Do not reverse architectural decisions silently.

If a decision changes:

1. preserve the original entry;
2. mark its status as superseded;
3. create a new decision entry;
4. explain why the new decision replaced it.

## Current Decision Status Summary

As of August 12, 2026:

* React Router migration is complete;
* state-only navigation is retired;
* Hostinger SPA fallback is source-controlled;
* route-aware canonical handling is active;
* GitHub Markdown is becoming the living Engineering Manual;
* Cloudflare remains intentionally deferred;
* IDX Broker is the next major architecture milestone;
* `homes.movinginmobile.com` is the preferred IDX hostname;
* a static `public/idx-wrapper.html` is the planned wrapper architecture.
