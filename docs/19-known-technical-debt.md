# Known Technical Debt

## Purpose

This document tracks known technical debt in the Moving in Mobile website.

Technical debt includes architecture limitations, transitional code, incomplete infrastructure work, maintainability concerns, and known improvements that are intentionally deferred.

The purpose of this file is not to list every possible enhancement. It is to document items that are meaningful enough to affect future development decisions.

## Technical Debt Management Principles

Technical debt should be:

* documented explicitly;
* prioritized based on user impact and maintenance risk;
* addressed incrementally;
* separated from unrelated feature work where practical;
* reviewed after major architectural milestones.

Do not attempt to eliminate all technical debt in a single refactor.

Large simultaneous changes increase regression risk.

## Resolved Technical Debt

### State-Only Page Navigation

Status: Resolved

Before August 12, 2026, the application used React state to simulate multiple pages.

The browser URL did not change when users navigated between Buyers, Sellers, Resources, and other sections.

Consequences included:

* no direct page URLs;
* poor browser history behavior;
* no bookmarkable page routes;
* limited SEO architecture;
* inability to refresh nested pages;
* difficulty integrating external systems around stable routes.

The site was migrated to React Router on August 12, 2026.

Current routes include:

* `/`
* `/about`
* `/buyers`
* `/sellers`
* `/neighborhoods`
* `/rowe-report`
* `/resources`
* `/contact`

This debt item is considered resolved.

### Hostinger Direct-Route 404 Behavior

Status: Resolved

After React Router was introduced, direct requests to nested routes returned HTTP 404 from Hostinger.

Example:

`https://staging.movinginmobile.com/buyers`

The issue was caused by the hosting layer attempting to locate a physical `/buyers` file instead of serving the SPA entry point.

The solution was added to:

`public/.htaccess`

The source-controlled SPA fallback has been validated on staging and production.

This debt item is considered resolved.

## Active Technical Debt

## 1. `setPage()` Compatibility Layer

Priority: Medium

Status: Transitional

The routing migration intentionally retained a compatibility function named:

`setPage()`

Existing components can still call:

```jsx
setPage("buyers");
```

The compatibility layer converts the legacy page key into a React Router path and performs navigation.

This reduced migration risk, but it means some application code still thinks in terms of internal page keys rather than route URLs.

### Risks

* route definitions exist in more than one conceptual form;
* future route changes may require compatibility mapping updates;
* programmatic navigation may be used where normal links would be preferable;
* new developers may assume `setPage()` is still React state.

### Recommended Future State

Use:

* `NavLink` or `Link` for normal user navigation;
* `useNavigate()` only for genuine programmatic navigation;
* route URLs as the primary navigation model.

Remove the compatibility layer after remaining legacy calls are migrated.

## 2. Large `src/App.jsx`

Priority: Medium

Status: Active

A substantial portion of the application remains concentrated in:

`src/App.jsx`

The file contains:

* major page components;
* shared UI;
* routing compatibility logic;
* forms;
* analytics metadata;
* modal behavior;
* navigation;
* content structures.

### Risks

* harder code review;
* higher merge-conflict risk;
* difficult feature isolation;
* reduced discoverability;
* more complicated onboarding.

### Recommended Future State

Gradually extract:

* page components;
* shared layout components;
* form components;
* navigation utilities;
* metadata configuration;
* modal logic;
* reusable content sections.

Do not perform a broad extraction at the same time as IDX implementation unless necessary.

## 3. Route-Specific Metadata Architecture

Priority: High

Status: Active

The site now has real browser routes, but metadata handling remains partially coupled to analytics configuration.

Current behavior includes route-aware:

* page titles;
* canonical URLs;
* analytics page paths.

### Risks

As page count increases, metadata may become difficult to maintain consistently.

IDX and neighborhood expansion will increase the number of SEO-relevant destinations.

### Recommended Future State

Create a centralized route metadata structure that supports:

* title;
* meta description;
* canonical URL;
* Open Graph metadata;
* social metadata;
* structured-data context;
* indexability rules.

This should be implemented as part of the page-specific SEO milestone.

## 4. No Dedicated 404 Page

Priority: Medium

Status: Active

Unknown React paths currently fall back to the homepage through the route-to-page compatibility logic.

Example:

`/this-page-does-not-exist`

may render the homepage rather than an explicit Not Found page.

### Risks

* confusing user experience;
* ambiguous analytics;
* poor search-engine semantics;
* difficult broken-link detection.

### Recommended Future State

Implement a dedicated 404 route and user-friendly Not Found page.

The page should:

* clearly state that the requested page was not found;
* provide navigation back to useful content;
* avoid pretending that the homepage is the requested URL;
* use appropriate indexing behavior.

## 5. Neighborhood Routing Is Not Yet Granular

Priority: High

Status: Planned

The current application has:

`/neighborhoods`

but individual neighborhood destinations are not yet fully implemented as stable routes.

Future examples may include:

* `/neighborhoods/fairhope`
* `/neighborhoods/daphne`
* `/neighborhoods/spanish-fort`
* `/neighborhoods/gulf-shores`
* `/neighborhoods/orange-beach`

### Impact

This limits:

* neighborhood SEO;
* GEO strategy;
* direct linking;
* IDX saved-search integration;
* page-specific analytics.

### Recommended Future State

Create dedicated neighborhood routes with original editorial content and relevant IDX search links.

## 6. Sitemap Does Not Yet Fully Reflect React Router

Priority: High

Status: Active

The site now has multiple real routes.

The sitemap must be maintained so it reflects public crawlable pages.

### Risk

Search engines may discover pages through internal links, but the sitemap should accurately represent the public route structure.

### Recommended Future State

Update:

`public/sitemap.xml`

to include all appropriate permanent routes.

Future neighborhood routes should also be added when they become production-ready.

## 7. Page-Specific Meta Descriptions

Priority: High

Status: Active

The technical metadata foundation exists, but route-specific meta descriptions remain incomplete.

### Recommended Future State

Write unique descriptions for:

* homepage;
* About;
* Buyers;
* Sellers;
* Neighborhoods;
* Rowe Report;
* Resources;
* Contact;
* future neighborhood routes.

Descriptions should be written for users first and avoid keyword stuffing.

## 8. Structured Data Expansion

Priority: Medium

Status: Planned

The current JSON-LD foundation is implemented and has passed Rich Results validation.

Additional schema may become useful as content expands.

Possible future types include:

* WebSite;
* WebPage;
* BreadcrumbList;
* Article;
* VideoObject;
* FAQPage where appropriate.

### Risk

Schema can become inaccurate if added without matching visible content.

### Recommended Future State

Expand structured data only when supported by actual page content and business facts.

## 9. IDX Broker Integration

Priority: Critical

Status: In Progress

Elm Street / IDX Broker approval has been received for Tina Rowe's Gulf Coast MLS feed.

The integration is not yet complete.

Expected functionality includes:

* property search;
* search results;
* map search;
* listing details;
* saved searches;
* neighborhood searches;
* property lead capture;
* market reports;
* selected listing widgets.

### Planned Architecture

The preferred custom IDX hostname is:

`homes.movinginmobile.com`

The planned wrapper is:

`public/idx-wrapper.html`

### Risks Until Complete

* current site lacks native MLS search;
* property discovery relies on external alternatives;
* neighborhood pages cannot yet connect directly to curated IDX results;
* significant lead-generation capability remains unavailable.

This is the highest-priority active feature debt.

## 10. IDX Wrapper Not Yet Implemented

Priority: Critical

Status: Planned

IDX Broker supports Dynamic Wrappers.

The site does not yet contain the production wrapper required to visually integrate IDX pages.

### Recommended Future State

Create:

`public/idx-wrapper.html`

with:

* Moving in Mobile branding;
* navigation;
* footer;
* required IDX markers;
* responsive design;
* brokerage/compliance identity.

Validate the server-returned HTML before configuring IDX Broker.

## 11. IDX Custom Domain Not Yet Active

Priority: Critical

Status: Planned

IDX currently uses:

`movinginmobile.idxbroker.com`

The preferred customer-facing hostname is:

`homes.movinginmobile.com`

### Remaining Work

* configure DNS;
* configure IDX Broker custom domain;
* validate SSL;
* validate search URLs;
* validate property-detail URLs;
* verify sitemap and canonical behavior.

## 12. IDX Analytics Integration

Priority: High

Status: Planned

The main React site uses GA4.

The IDX environment must be integrated so users moving between:

`movinginmobile.com`

and:

`homes.movinginmobile.com`

can be analyzed coherently.

### Recommended Future State

Validate:

* GA4 configuration on IDX pages;
* subdomain session continuity;
* search events;
* listing-detail engagement;
* registration events;
* lead events.

Do not assume the default IDX analytics configuration matches the existing GA4 strategy.

## 13. IDX SEO Configuration

Priority: High

Status: Planned

The IDX environment will introduce:

* search pages;
* listing-detail pages;
* saved-search pages;
* IDX sitemap behavior;
* vendor-generated metadata.

### Required Review

After custom-domain implementation, evaluate:

* canonical URLs;
* sitemap;
* indexability;
* duplicate-content behavior;
* Search Console configuration;
* saved-search SEO value;
* listing-detail metadata.

## 14. GEO Content Expansion

Priority: Medium

Status: Planned

Generative Engine Optimization is part of the future roadmap.

The site needs additional structured, factual, locally useful content to support this goal.

### Recommended Future Work

Develop:

* neighborhood guides;
* relocation answers;
* local-area comparison content;
* market explanations;
* useful FAQs;
* original video and article content;
* clear entity relationships.

GEO should build on real expertise rather than synthetic keyword expansion.

## 15. Market Reports

Priority: Medium

Status: Planned

The site does not yet have a mature recurring local market-report strategy.

IDX Broker may provide market-report functionality, but Tina's editorial interpretation should remain distinct from automated MLS output.

### Recommended Future State

Combine:

* current MLS data;
* Tina's local interpretation;
* clear geographic scope;
* useful buyer and seller context.

## 16. Lead System Fragmentation

Priority: Medium

Status: Active

Non-IDX leads currently use Formspree.

IDX Broker will introduce separate property-related lead functionality.

### Risk

Lead data may become fragmented across:

* Formspree;
* IDX Broker;
* email;
* future CRM systems.

### Recommended Future State

Document and eventually streamline lead destinations, attribution, and follow-up workflow.

Avoid adding additional lead providers without a clear reason.

## 17. Limited Automated Testing

Priority: Medium

Status: Active

Current QA is primarily:

* manual browser testing;
* staging validation;
* production smoke testing;
* build validation.

There is limited automated test coverage.

### Recommended Future State

Consider automated tests for high-value behavior such as:

* routing;
* navigation;
* critical forms;
* metadata;
* modal behavior;
* utility functions.

Do not introduce a large test framework solely for coverage metrics.

Prioritize tests that reduce meaningful regression risk.

## 18. Build-Time SEO Artifacts Are Manually Maintained

Priority: Low to Medium

Status: Active

Files such as:

`public/sitemap.xml`

are manually maintained.

As route count expands, manual maintenance creates drift risk.

### Recommended Future State

Consider generating the sitemap from a central route/content configuration.

This should occur only after route structure becomes sufficiently stable.

## 19. Staging Search-Engine Protection Review

Priority: Medium

Status: Review Needed

Staging is intended for testing, not search-engine discovery.

The staging SEO protection strategy should be explicitly verified as route and IDX complexity increases.

### Recommended Future State

Confirm that staging is appropriately discouraged from indexing without interfering with production configuration.

## 20. Historical Assets and Duplicate Files

Priority: Low

Status: Active

The repository contains several historical or duplicate public assets with names such as:

* `old`;
* numbered variants;
* alternate-resolution versions.

### Risks

* confusion over authoritative assets;
* accidental references;
* repository bloat.

### Recommended Future State

Perform a controlled asset audit after major feature work.

Do not delete assets solely based on filename without verifying references.

## 21. Historical GitHub Pages Configuration

Priority: Low

Status: Active Historical Configuration

The project retains historical GitHub Pages-related configuration such as:

* `homepage` in `package.json`;
* `gh-pages` dependency;
* deployment scripts.

Current production and staging hosting use Hostinger.

### Recommended Future State

Determine whether GitHub Pages fallback deployment is still intentionally required.

If not, remove obsolete configuration in a dedicated cleanup change.

Do not mix this cleanup into IDX integration.

## 22. Environment File Handling

Priority: Medium

Status: Review Needed

Historical source snapshots included:

`.env`

The current file may be empty, but environment files should be treated as potentially sensitive.

### Recommended Future State

Ensure `.env` is ignored by Git unless explicitly required for a safe template.

Prefer:

`.env.example`

for documenting required variable names without storing secrets.

Source snapshots should exclude real environment files.

## 23. Source Snapshot Hygiene

Priority: Low

Status: Active

Historical source archives have included:

* `.env`;
* `.DS_Store`;
* nested ZIP archives;
* generated or unnecessary files.

### Recommended Future State

Use clean archival commands that exclude:

* `.git`;
* `node_modules`;
* `dist`;
* `.env`;
* `.DS_Store`;
* nested ZIP files.

Maintain Git commits as the primary reproducible source history.

## 24. Documentation Migration

Priority: Medium

Status: In Progress

The Version 1.0 Engineering Manual was originally completed as separate DOCX artifacts while the repository `docs/` Markdown files remained placeholders.

The project is now migrating to:

`docs/*.md`

as the authoritative living documentation.

### Recommended Future State

Complete the population of all relevant Markdown documents.

Use GitHub history to track documentation changes.

Periodic DOCX or PDF versions may be generated as release artifacts, but they should not replace repository documentation as the living source.

## Prioritization Summary

### Critical

* IDX Broker integration
* IDX wrapper
* IDX custom domain

### High

* route-specific metadata
* neighborhood routes
* sitemap expansion
* page-specific descriptions
* IDX analytics
* IDX SEO

### Medium

* `setPage()` compatibility cleanup
* component modularization
* dedicated 404
* structured-data expansion
* GEO content
* market reports
* lead-system integration
* automated testing
* staging indexing review
* environment handling
* documentation migration

### Low / Cleanup

* asset cleanup
* historical GitHub Pages configuration
* source snapshot hygiene

## Technical Debt Review Rule

Review this document after:

* major architecture changes;
* routing changes;
* IDX milestones;
* deployment changes;
* SEO migrations;
* lead-system changes;
* major refactors.

When an item is resolved:

1. mark it resolved;
2. record the date or milestone;
3. update related architecture documentation;
4. update the decision log if the resolution involved a meaningful architectural decision.

## Current Status

As of August 12, 2026:

* state-only navigation debt is resolved;
* Hostinger direct-route 404 debt is resolved;
* React Router is live;
* SPA fallback is source-controlled;
* living documentation migration is underway;
* IDX Broker integration is the highest-priority remaining architectural work.
