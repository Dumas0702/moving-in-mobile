# Future Roadmap

## Purpose

This document defines the planned development roadmap for the Moving in Mobile website.

The roadmap is prioritized around:

* business value
* lead-generation impact
* architectural dependencies
* SEO and GEO opportunity
* maintainability
* operational risk

The order of work may change if an external dependency, provider requirement, business need, or production issue justifies reprioritization.

## Current Baseline

As of August 12, 2026, the following major milestones are complete:

* Version 1.0 production website
* Hostinger production deployment
* Hostinger staging environment
* GitHub branch workflow
* responsive layout
* buyer and seller pages
* resources page
* About Tina page
* neighborhood section
* testimonials
* floating contact widget
* Formspree lead capture
* Google Analytics 4
* Google Search Console
* XML sitemap
* `robots.txt`
* canonical URL foundation
* JSON-LD structured data
* Rich Results validation
* React Router migration
* real browser routes
* Hostinger SPA fallback
* route-aware canonical handling
* initial migration of engineering documentation into GitHub Markdown

The next major development priority is Elm Street / IDX Broker integration.

---

# Priority 1 — Elm Street / IDX Broker Integration

Status: In Progress

Priority: Critical

## Goal

Make MLS search and property discovery a native part of the Moving in Mobile customer experience.

Tina Rowe's IDX account has been approved and the Gulf Coast MLS feed is available.

## Planned Capabilities

The IDX integration should provide:

* property search
* advanced search
* map search
* search results
* listing-detail pages
* saved searches
* neighborhood-specific searches
* listing widgets
* property inquiry lead capture
* showing-request workflows where supported
* market-report functionality where appropriate

## Planned Architecture

The main React website remains responsible for:

* branding
* editorial content
* local expertise
* neighborhood guides
* buyer and seller education
* GEO-oriented content
* non-IDX lead generation

IDX Broker remains responsible for:

* MLS data
* search
* listing results
* property details
* saved searches
* MLS-specific lead workflows

## Phase 1A — IDX Wrapper

Create:

`public/idx-wrapper.html`

The wrapper should include:

* Moving in Mobile branding
* site navigation
* Tina Rowe identity
* Keller Williams identity
* REALTOR® / Equal Housing compliance where required
* responsive header
* responsive footer
* IDX insertion markers
* clean styling
* links back to the main website

The wrapper should not include unnecessary homepage-only functionality.

## Phase 1B — IDX Custom Domain

Preferred hostname:

`homes.movinginmobile.com`

Required work:

* configure DNS
* configure IDX Broker custom domain
* validate SSL
* verify search URLs
* verify listing-detail URLs
* confirm hostname consistency

Do not broadly link the main website to the vendor default hostname once the custom domain is available.

## Phase 1C — Dynamic Wrapper Configuration

Configure IDX Broker Dynamic Wrapper to use:

`https://movinginmobile.com/idx-wrapper.html`

Validate:

* Advanced Search
* Results
* Listing Detail
* Map Search
* mobile behavior
* navigation
* branding

## Phase 1D — Main-Site IDX Entry Points

After the IDX foundation is stable, add user-facing entry points from the React site.

Potential entry points include:

* Search Homes navigation item
* homepage property search
* Buyer page search CTA
* Neighborhood search CTAs
* Featured Listings
* listing-alert CTA
* saved-search links

## Phase 1E — Saved Searches

Create useful IDX saved searches such as:

* Fairhope homes
* Daphne homes
* Spanish Fort homes
* Foley homes
* Gulf Shores homes
* Orange Beach homes
* waterfront homes
* new construction
* condos
* selected price ranges

Saved searches should be created for real user value, not simply to create additional URLs.

## Phase 1F — Lead Capture

Configure IDX property lead workflows.

Potential capabilities include:

* save property
* save search
* email alerts
* request information
* schedule showing
* account registration

Registration requirements should balance lead generation with user experience.

Avoid creating unnecessary barriers to browsing.

## Phase 1G — IDX Analytics

Integrate or validate GA4 behavior across:

`movinginmobile.com`

and:

`homes.movinginmobile.com`

Track useful behavior such as:

* entry into IDX search
* search usage
* listing-detail views
* saved searches
* registration
* inquiry
* showing request

## Phase 1H — IDX SEO

Validate:

* custom hostname
* canonical URLs
* IDX sitemap
* listing-detail indexability
* saved-search indexability
* Search Console strategy
* wrapper behavior
* duplicate-content implications

IDX SEO should complement rather than replace original local content.

---

# Priority 2 — Page-Specific SEO

Status: Planned

Priority: High

## Goal

Build on the new React Router architecture by giving each meaningful route its own metadata and search positioning.

## Planned Work

Create route-specific:

* page titles
* meta descriptions
* canonical URLs
* Open Graph metadata
* social-sharing metadata
* structured-data context where appropriate

Priority pages:

* homepage
* About
* Buyers
* Sellers
* Neighborhoods
* Rowe Report
* Resources
* Contact

## Metadata Architecture

Create a centralized metadata system rather than scattering metadata logic across unrelated code.

The system should support future neighborhood pages and other routes without excessive duplication.

---

# Priority 3 — Sitemap Expansion

Status: Planned

Priority: High

## Goal

Make the XML sitemap accurately represent the new real browser routes.

## Planned Work

Update:

`public/sitemap.xml`

to include appropriate public routes.

Current likely additions:

* `/about`
* `/buyers`
* `/sellers`
* `/neighborhoods`
* `/rowe-report`
* `/resources`
* `/contact`

Future neighborhood routes should be added as they become production-ready.

Exclude:

* wrapper files
* test routes
* staging URLs
* non-indexable utility pages

---

# Priority 4 — Neighborhood Route Expansion

Status: Planned

Priority: High

## Goal

Create durable, useful local-content pages that can rank independently and connect naturally to IDX searches.

## Potential Routes

Examples:

* `/neighborhoods/fairhope`
* `/neighborhoods/daphne`
* `/neighborhoods/spanish-fort`
* `/neighborhoods/foley`
* `/neighborhoods/gulf-shores`
* `/neighborhoods/orange-beach`
* `/neighborhoods/silverhill`
* `/neighborhoods/robertsdale`

## Content Direction

Each page should contain original local content such as:

* community overview
* lifestyle
* housing character
* commute context
* amenities
* local observations
* Tina's perspective
* relocation guidance
* related videos
* relevant IDX search links

Avoid thin neighborhood pages that exist only to host listings.

---

# Priority 5 — Expanded Structured Data

Status: Planned

Priority: Medium to High

## Goal

Improve machine understanding of site content without adding unsupported or misleading schema.

## Potential Schema Types

Depending on visible content:

* WebSite
* WebPage
* RealEstateAgent
* BreadcrumbList
* Article
* VideoObject
* FAQPage where appropriate

Schema implementation must remain aligned with actual visible content.

---

# Priority 6 — GEO: Generative Engine Optimization

Status: Planned

Priority: Medium to High

## Goal

Make Moving in Mobile a useful, authoritative source for relocation and real-estate questions involving Mobile and Baldwin County.

## Content Principles

GEO content should emphasize:

* clear answers
* original local expertise
* factual accuracy
* strong geographic context
* direct comparisons
* structured organization
* citations or sources where appropriate
* current information
* first-hand market perspective where appropriate

## Potential Content

Examples:

* Moving to Fairhope
* Fairhope vs. Daphne
* Best areas for Eastern Shore commuters
* Waterfront living considerations
* Gulf Coast insurance considerations
* New construction in Baldwin County
* Buyer costs in Alabama
* Seller preparation guides
* neighborhood comparisons
* relocation checklists
* local market explanations

GEO should not become mass-generated keyword content.

---

# Priority 7 — Market Reports

Status: Planned

Priority: Medium

## Goal

Create recurring market content that combines MLS data with Tina's interpretation.

## Potential Structure

Market reports may include:

* active inventory
* median or average pricing
* days on market
* new listings
* pending activity
* closed sales
* month-over-month changes
* year-over-year changes
* Tina's commentary

## Delivery Options

Reports may appear as:

* site pages
* Rowe Report content
* email
* social content
* downloadable summaries

Automated IDX data should be paired with useful human interpretation where possible.

---

# Priority 8 — Lead Workflow Integration

Status: Planned

Priority: Medium

## Goal

Reduce fragmentation between existing lead systems and IDX-generated leads.

## Current Systems

Existing non-IDX forms use:

Formspree

IDX Broker will introduce property-specific lead capture.

## Future Questions

Evaluate:

* where leads are delivered
* whether CRM integration is needed
* how lead source is preserved
* how Tina follows up
* whether duplicate leads can be reconciled
* whether saved-search activity should trigger follow-up

Do not add new lead platforms without a clear workflow benefit.

---

# Priority 9 — Dedicated 404 Page

Status: Planned

Priority: Medium

## Goal

Replace the current unknown-route fallback behavior with a proper Not Found experience.

## Planned Behavior

An invalid route should:

* communicate that the page does not exist
* offer useful navigation
* preserve Tina's branding
* avoid pretending the homepage is the requested page
* use appropriate indexing behavior

---

# Priority 10 — Complete Legacy Navigation Cleanup

Status: Planned

Priority: Medium

## Goal

Remove the temporary `setPage()` compatibility layer after remaining legacy navigation is migrated.

## Planned Work

Replace remaining appropriate navigation calls with:

* `Link`
* `NavLink`
* direct route structures

Keep `useNavigate()` only where programmatic navigation is genuinely required.

After migration:

* remove unused page-key logic
* simplify route configuration
* update documentation
* retest analytics and browser behavior

---

# Priority 11 — Component Modularization

Status: Planned

Priority: Medium

## Goal

Reduce the size and responsibility concentration of:

`src/App.jsx`

## Potential Extraction Areas

Possible modules include:

* Header
* Footer
* forms
* modal lead capture
* Home page
* Buyers page
* Sellers page
* Resources page
* About page
* Rowe Report page
* Neighborhood page
* route metadata
* analytics helpers

## Timing

Do not perform broad modularization during the initial IDX integration unless the integration requires it.

Refactor after major user-facing functionality is stable.

---

# Priority 12 — Automated Regression Testing

Status: Planned

Priority: Medium

## Goal

Introduce focused automated tests for high-risk behavior.

## Candidate Tests

* route resolution
* navigation
* route metadata
* critical form behavior
* modal behavior
* utility functions
* 404 behavior

Testing should target meaningful regression risk rather than maximizing coverage percentage.

---

# Priority 13 — Staging Indexing Protection Review

Status: Planned

Priority: Medium

## Goal

Explicitly verify that the staging site is not unintentionally competing with production in search results.

Review:

* robots directives
* metadata
* canonical behavior
* Search Console exposure
* future IDX staging behavior

Do not make changes that accidentally block production.

---

# Priority 14 — Historical Configuration Cleanup

Status: Deferred

Priority: Low

## Scope

Review obsolete or historical project configuration such as:

* GitHub Pages deployment scripts
* `homepage` field
* `gh-pages` dependency
* unused assets
* duplicate files
* old image variants

## Rule

Perform cleanup as dedicated maintenance work.

Do not mix it into major feature releases.

---

# Priority 15 — Source Snapshot Hygiene

Status: Planned

Priority: Low

## Goal

Make future source snapshots smaller, safer, and easier to maintain.

Exclude:

* `.git`
* `node_modules`
* `dist`
* `.env`
* `.DS_Store`
* nested ZIP archives

Git history should remain the primary source of reproducibility.

---

# Priority 16 — Engineering Documentation Completion

Status: In Progress

Priority: Medium

## Goal

Complete the migration from separate Version 1.0 DOCX artifacts to source-controlled Markdown under:

`docs/`

## Documentation Rule

The repository Markdown becomes the living source of truth.

Historical DOCX/PDF manuals may be retained as release snapshots.

Major feature completion should include relevant documentation updates.

---

# Recommended Development Sequence

The current recommended order is:

```text id="j0bsq2"
1. Complete engineering documentation migration for current architecture
2. Build IDX wrapper
3. Configure IDX custom subdomain
4. Validate IDX search/results/details
5. Integrate IDX into main site navigation and content
6. Configure IDX lead capture
7. Configure IDX analytics
8. Validate IDX SEO
9. Implement page-specific SEO metadata
10. Expand sitemap
11. Add neighborhood routes and content
12. Expand structured data
13. Develop GEO content
14. Develop recurring market reports
15. Improve lead workflow integration
16. Add dedicated 404 handling
17. Remove legacy setPage compatibility
18. Modularize large components
19. Add focused automated tests
20. Perform historical configuration and asset cleanup
```

This sequence is intended to minimize architectural rework.

---

# Roadmap Prioritization Rules

When deciding whether to change the order of work, consider:

1. Does the work directly improve lead generation?
2. Is another feature blocked by it?
3. Does it reduce production risk?
4. Does it create a strong SEO or GEO advantage?
5. Is there an external deadline?
6. Is the provider configuration available now?
7. Will delaying it create rework?
8. Can the change be tested independently?

Do not reprioritize based solely on implementation convenience.

---

# Documentation Requirement

When a roadmap item is completed:

1. update its status here;
2. update affected architecture documentation;
3. record major decisions in `20-decision-log.md`;
4. update `19-known-technical-debt.md`;
5. update deployment or testing documents if operational behavior changed.

---

# Current Roadmap Status

As of August 12, 2026:

* React Router migration: Complete
* Hostinger SPA fallback: Complete
* Living engineering documentation migration: In Progress
* Elm Street / IDX Broker integration: Next active development milestone
* Page-specific SEO: Planned
* Neighborhood expansion: Planned
* GEO: Planned
* Market reports: Planned
* Lead workflow integration: Planned
* architectural cleanup: Deferred until after higher-value feature work
