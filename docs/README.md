# Moving in Mobile Engineering Documentation

## Documentation Status

This directory contains the authoritative living engineering documentation for the Moving in Mobile website.

The documentation should be updated whenever material changes are made to:

- application architecture
- routing
- hosting or deployment
- IDX integration
- lead-generation systems
- analytics
- SEO
- structured data
- external integrations
- security
- development workflow

The application source code and live provider configuration remain the ultimate sources of truth for runtime behavior.

## Current Application Baseline

- Application: Moving in Mobile
- Client: Tina Rowe, REALTOR®
- Framework: React + Vite
- Styling: Tailwind CSS
- Hosting: Hostinger
- Production branch: `main`
- Development branch: `staging`
- Hostinger staging deployment branch: `redesign-v2`
- Production URL: `https://movinginmobile.com`
- Staging URL: `https://staging.movinginmobile.com`

## Architecture Milestones

### Version 1.0 Baseline

Version 1.0 established the production marketing website, lead-generation forms, analytics, technical SEO foundation, structured data, staging workflow, and initial engineering documentation.

### React Router Migration — August 12, 2026

The application was migrated from React state-based page switching to URL-backed navigation using React Router.

Primary routes now include:

- `/`
- `/about`
- `/buyers`
- `/sellers`
- `/neighborhoods`
- `/rowe-report`
- `/resources`
- `/contact`

Hostinger requires SPA fallback routing so direct requests to React routes are served through `index.html`.

The fallback configuration is maintained in:

`public/.htaccess`

### IDX Broker Integration

Status: In progress

Elm Street / IDX Broker approval has been received for the Gulf Coast MLS feed.

Planned IDX architecture includes:

- custom IDX subdomain
- IDX property search
- search-results pages
- listing-detail pages
- saved searches
- neighborhood-to-IDX integration
- lead capture
- IDX analytics
- IDX SEO integration

## Documentation Maintenance

Documentation changes should normally be developed on the `staging` branch, reviewed with the related application changes, and promoted to `main` through the standard deployment workflow.

Major architectural decisions should also be recorded in:

`20-decision-log.md`

Known limitations and planned refactoring should be recorded in:

`19-known-technical-debt.md`

Future work should be maintained in:

`21-future-roadmap.md`