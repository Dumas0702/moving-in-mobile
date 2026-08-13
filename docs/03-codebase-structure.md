# Codebase Structure

## Purpose

This document describes the current structure of the Moving in Mobile codebase.

It explains:

- the major project directories
- the role of important source files
- where routing and metadata logic currently live
- which files are deployment-critical
- which files are generated
- where documentation belongs
- where the upcoming IDX integration will fit

The goal is to help a developer locate the correct file quickly and avoid making changes in the wrong part of the project.

---

# Repository Root

The project root is typically:

`~/moving-in-mobile`

At a high level, the repository is organized as:

    moving-in-mobile/
    ├── docs/
    ├── public/
    ├── src/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── .gitignore
    └── ...

Additional project or tooling files may exist, but these are the primary areas of the application.

---

# `src/`

The `src/` directory contains the React application source.

This is where most application behavior should be implemented.

Major areas include:

    src/
    ├── components/
    ├── App.jsx
    ├── main.jsx
    └── ...

The exact structure may expand as the application is modularized.

---

# `src/main.jsx`

`src/main.jsx` is the React application entry point.

Its primary responsibilities include:

- importing React
- importing ReactDOM
- loading application CSS
- wrapping the application in React Router
- rendering `<App />`

The application currently uses:

`BrowserRouter`

from React Router.

Conceptually:

    <BrowserRouter>
      <App />
    </BrowserRouter>

This is what enables real browser routes such as:

- `/buyers`
- `/sellers`
- `/resources`
- `/contact`

Do not remove `BrowserRouter` without intentionally redesigning the application's routing architecture.

---

# `src/App.jsx`

`src/App.jsx` remains the primary application orchestration file.

It currently contains or coordinates substantial portions of:

- route resolution
- primary page selection
- route metadata
- analytics
- canonical URL handling
- page components
- header navigation
- mobile navigation
- lead-generation behavior
- modal behavior
- content sections
- compatibility navigation

This concentration of responsibility is known technical debt.

It should be reduced incrementally rather than through a high-risk broad rewrite.

## Current Routing Logic

The file currently contains route mappings similar to:

    const PAGE_ROUTES = {
      home: "/",
      about: "/about",
      sellers: "/sellers",
      buyers: "/buyers",
      neighborhoods: "/neighborhoods",
      rowereport: "/rowe-report",
      resources: "/resources",
      contact: "/contact",
    };

It also derives page identity from:

`location.pathname`

through React Router.

## Transitional Navigation

Some code still calls:

    setPage("buyers");

This is no longer React state-based page navigation.

The compatibility function translates page keys into actual React Router navigation.

Future cleanup should remove this compatibility layer after legacy callers have been migrated.

---

# `src/components/`

Reusable or independently meaningful React components should live under:

`src/components/`

Current examples include:

- structured-data functionality
- staging indicators
- other extracted reusable components

Important known files include:

    src/components/StructuredData.jsx
    src/components/StagingIndicators.jsx

As the application is modularized, additional components should move here or into appropriate subdirectories.

---

# `src/components/StructuredData.jsx`

This file contains JSON-LD structured-data logic.

It should represent real, visible, verifiable business information.

Changes here may affect:

- SEO
- Rich Results validation
- entity understanding
- business identity

Do not add unsupported claims or fabricated review data.

---

# `src/components/StagingIndicators.jsx`

This component provides staging-specific visual behavior.

Its purpose is to help distinguish:

`staging.movinginmobile.com`

from production.

Changes to environment-detection behavior should be tested on both staging and production.

---

# Page Components

Many page-level components are currently still defined within:

`src/App.jsx`

Examples conceptually include:

- Home
- About
- Buyers
- Sellers
- Neighborhoods
- Rowe Report
- Resources
- Contact

This is functional but not the preferred long-term structure.

## Future Structure

A future refactor may move page components into a structure such as:

    src/
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── AboutPage.jsx
    │   ├── BuyersPage.jsx
    │   ├── SellersPage.jsx
    │   ├── NeighborhoodsPage.jsx
    │   ├── RoweReportPage.jsx
    │   ├── ResourcesPage.jsx
    │   └── ContactPage.jsx

This is a roadmap direction, not a requirement for the initial IDX milestone.

Do not reorganize the entire application merely to achieve this structure.

---

# Shared Layout Components

The Header and Footer are major shared layout elements.

The header currently includes:

- logo
- desktop navigation
- mobile navigation
- active route styling
- Rowe Report CTA

Primary navigation uses React Router `NavLink`.

A future component structure may place shared layout elements in:

    src/components/layout/

or a similar directory.

Again, this is a maintainability improvement rather than an immediate architectural requirement.

---

# `public/`

The `public/` directory contains files that Vite copies directly into the generated site.

These files are available without being imported through the React build pipeline.

Important examples include:

- images
- branding assets
- `robots.txt`
- `sitemap.xml`
- `.htaccess`
- future IDX wrapper HTML

Because files here are copied directly to production output, changes can be operationally significant.

---

# `public/.htaccess`

This file is deployment-critical.

It provides the Hostinger SPA fallback required by React Router.

Current configuration:

    RewriteEngine On

    # Preserve Hostinger's internal builds protection
    RewriteRule ^\.builds - [F,L]

    # Serve existing files and directories normally
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # React Router SPA fallback
    RewriteRule ^ index.html [L]

Vite copies this file into:

`dist/.htaccess`

during the build.

Without this file, direct browser requests to nested routes may return Hostinger 404 responses.

Do not remove or casually rewrite it.

---

# `public/robots.txt`

This file controls crawler directives.

Production URL:

`https://movinginmobile.com/robots.txt`

It should remain directly accessible even though the application uses SPA routing.

Any routing or `.htaccess` change should verify that this physical file is still served normally.

---

# `public/sitemap.xml`

This is the primary XML sitemap for the React site.

Production URL:

`https://movinginmobile.com/sitemap.xml`

The sitemap should contain public, indexable routes.

It should not contain:

- staging URLs
- temporary test routes
- internal utility files
- the planned IDX wrapper file

The sitemap still requires expansion to fully reflect the React Router route structure.

---

# Public Images and Branding Assets

Branding and site imagery are largely stored under:

`public/`

The repository may contain historical and alternate asset variants.

Examples include:

- Tina Rowe imagery
- The Rowe Report logos
- Keller Williams branding
- neighborhood imagery
- REALTOR® and Equal Housing assets

Before deleting or renaming an asset:

1. search the codebase for references;
2. verify filename capitalization;
3. validate staging after the change.

Production hosting may treat filename case more strictly than local development.

---

# Planned `public/idx-wrapper.html`

The IDX integration is expected to introduce:

`public/idx-wrapper.html`

This will be a static HTML wrapper used by Elm Street / IDX Broker.

Expected production URL:

`https://movinginmobile.com/idx-wrapper.html`

Its purpose is to provide:

- site header
- site footer
- Moving in Mobile branding
- Tina Rowe identity
- brokerage/compliance identity
- IDX Broker insertion markers

It should not function as a normal editorial website page.

It should not be added to the primary sitemap.

---

# `index.html`

The root:

`index.html`

is the Vite application shell.

It is served as the entry document for the React application.

It may contain:

- root mounting element
- GA4 initialization
- global document-level metadata
- script bootstrapping

Because Hostinger's SPA fallback ultimately serves this file for React routes, changes here are sitewide.

---

# React Router and `index.html`

A request to:

`/buyers`

does not correspond to a physical HTML file.

Hostinger falls back to:

`index.html`

and React Router determines that:

`/buyers`

should display the Buyers page.

This interaction depends on both:

- `BrowserRouter`
- `public/.htaccess`

The client and server pieces must remain aligned.

---

# `vite.config.js`

This file defines Vite build configuration.

Current important setting:

    base: "/"

This reflects the current Hostinger architecture, where the site is hosted at the root of its domain.

Historical GitHub Pages hosting used a subdirectory configuration.

Do not restore the historical subdirectory base unless deployment architecture changes.

---

# `package.json`

`package.json` defines:

- project scripts
- runtime dependencies
- development dependencies
- package metadata

Current major dependencies include:

- React
- React DOM
- React Router

Current major development tooling includes:

- Vite
- Tailwind CSS tooling
- React Vite plugin

Historical GitHub Pages tooling may also still exist.

That configuration is known cleanup debt and should not be removed during unrelated IDX work.

---

# React Router Dependency

The project currently uses:

`react-router`

for browser navigation.

When changing routing code, verify the installed version and API usage before relying on external examples written for a different major version.

The router migration was validated against the currently installed dependency.

---

# `package-lock.json`

This file records the resolved npm dependency tree.

It should remain source-controlled.

Do not regenerate or replace it unnecessarily.

When dependencies intentionally change:

    npm install <package>

will typically update both:

- `package.json`
- `package-lock.json`

Both should be reviewed and committed together when appropriate.

---

# `.gitignore`

`.gitignore` defines files that should not normally enter Git history.

It should protect against accidental commits of items such as:

- `node_modules/`
- `dist/`
- `.env`
- `.DS_Store`
- temporary files
- source archives where appropriate

Review `.gitignore` whenever a new generated or sensitive file type is introduced.

---

# `.env`

Environment files should be considered potentially sensitive.

A historical source snapshot contained an empty `.env` file, but future environment files may contain credentials.

Do not commit real secrets.

Where configuration documentation is needed, prefer:

`.env.example`

with placeholder values.

---

# `docs/`

The `docs/` directory is the authoritative living Engineering Manual.

It contains the project's architecture, deployment, SEO, testing, operations, and maintenance documentation.

Current structure includes:

    docs/
    ├── README.md
    ├── 01-project-overview.md
    ├── 02-system-architecture.md
    ├── 03-codebase-structure.md
    ├── 04-component-catalog.md
    ├── 05-state-and-navigation.md
    ├── 06-git-branching-workflow.md
    ├── 07-hostinger-deployment.md
    ├── 08-lead-generation.md
    ├── 09-seo-architecture.md
    ├── 10-google-analytics.md
    ├── 11-search-console.md
    ├── 12-robots-and-sitemap.md
    ├── 13-structured-data.md
    ├── 14-geo-strategy.md
    ├── 15-content-strategy.md
    ├── 16-branding-design-system.md
    ├── 17-security-maintenance.md
    ├── 18-testing-qa.md
    ├── 19-known-technical-debt.md
    ├── 20-decision-log.md
    ├── 21-future-roadmap.md
    ├── 22-developer-onboarding.md
    ├── 23-deployment-checklist.md
    ├── 24-release-checklist.md
    ├── 25-troubleshooting.md
    ├── 26-glossary.md
    └── appendices/

---

# `docs/appendices/`

Supporting documentation belongs under:

`docs/appendices/`

Current planned or known files include:

    docs/appendices/
    ├── asset-catalog.md
    ├── environment-setup.md
    └── git-command-reference.md

Appendices should contain detailed reference material that would make the primary chapters unnecessarily large.

---

# Generated `dist/`

Vite generates production output under:

`dist/`

using:

    npm run build

The contents may include:

- `index.html`
- compiled JavaScript
- compiled CSS
- public assets
- `.htaccess`
- `robots.txt`
- `sitemap.xml`

Do not treat `dist/` as the source of truth.

Source changes belong in:

- `src/`
- `public/`
- project configuration files

and should be regenerated through the build.

---

# Historical GitHub Pages Configuration

The repository has historical configuration associated with the earlier GitHub Pages deployment.

Possible examples include:

- `homepage`
- `gh-pages`
- deploy scripts

The current hosting architecture is Hostinger.

These historical pieces are known technical debt.

Do not assume they are still part of the normal production process.

Do not remove them as part of unrelated work without verifying whether any fallback workflow still depends on them.

---

# Source ZIP Archives

Source ZIP files should not normally live in the active repository.

Historical archives may exist outside normal Git-tracked source.

Future snapshots should exclude:

- `.git`
- `node_modules`
- `dist`
- `.env`
- `.DS_Store`
- nested ZIPs

Git history remains the primary reproducible source record.

---

# Third-Party Integration Boundaries

The codebase does not contain all system configuration.

Several important systems are external.

## Hostinger

Provider-side configuration includes:

- deployment branch mapping
- domains
- SSL
- some runtime settings

## Formspree

Handles existing non-IDX lead submissions.

## Google Analytics 4

Handles analytics data collection and reporting.

## Google Search Console

Handles search indexing and diagnostic reporting.

## IDX Broker

Will provide:

- MLS search
- listing results
- listing details
- saved searches
- property-specific lead functionality

## DNS

Will be required for the planned:

`homes.movinginmobile.com`

IDX hostname.

Provider dashboards must be documented, but they are not represented entirely by repository files.

---

# Where New Code Should Go

Use these general guidelines.

## New Page Content

Short-term:

May remain in `src/App.jsx` if consistent with current architecture and low risk.

Long-term:

Prefer dedicated page components.

## Reusable UI

Place in:

`src/components/`

or an appropriate subdirectory.

## Public Static File

Place in:

`public/`

Examples:

- favicon
- public images
- `robots.txt`
- sitemap
- `.htaccess`
- static wrapper HTML

## Documentation

Place in:

`docs/`

## Secrets

Do not place in normal client source or public files.

---

# Where IDX Work Should Go

The initial IDX implementation should avoid unnecessarily changing unrelated React architecture.

Expected work areas include:

`public/idx-wrapper.html`

and potentially:

`src/App.jsx`

for user-facing IDX entry points.

Additional supporting code may eventually be appropriate under:

`src/components/`

or:

`src/config/`

depending on complexity.

Avoid creating a large custom MLS data layer unless there is a clear requirement beyond standard IDX Broker capabilities.

---

# Future Recommended Structure

As the application grows, a structure like the following may become appropriate:

    src/
    ├── components/
    │   ├── layout/
    │   ├── forms/
    │   ├── seo/
    │   └── shared/
    ├── pages/
    ├── config/
    ├── hooks/
    ├── utils/
    ├── App.jsx
    └── main.jsx

Potential examples:

    src/config/routes.js
    src/config/metadata.js
    src/pages/BuyersPage.jsx
    src/pages/SellersPage.jsx
    src/components/layout/Header.jsx
    src/components/layout/Footer.jsx

This is an architectural direction, not an immediate migration requirement.

---

# File Change Risk Guide

## High-Risk Files

Changes here can affect the whole site:

- `src/main.jsx`
- `src/App.jsx`
- `index.html`
- `vite.config.js`
- `package.json`
- `public/.htaccess`

## SEO-Sensitive Files

- `public/robots.txt`
- `public/sitemap.xml`
- `src/components/StructuredData.jsx`
- route metadata in `src/App.jsx`

## Deployment-Sensitive Files

- `public/.htaccess`
- `vite.config.js`
- `package.json`
- `package-lock.json`

## Lead-Sensitive Files

- form components
- Formspree endpoint configuration
- modal logic
- CTA routing
- future IDX lead integration

---

# Before Moving or Renaming Files

Before renaming an application file or asset:

1. search the repository for references;
2. inspect import paths;
3. check filename capitalization;
4. run the build;
5. test locally;
6. validate staging.

Do not assume unused-looking files are actually unused.

---

# Before Adding a Dependency

Ask:

1. Is this capability already available in the current stack?
2. Does the dependency materially simplify the implementation?
3. Is the library actively maintained?
4. Does it increase client bundle size unnecessarily?
5. Does it introduce security or maintenance risk?
6. Is it compatible with the installed React and Vite versions?

Avoid adding dependencies for trivial functionality.

---

# Current Structural Technical Debt

The major code-organization debt includes:

- large `src/App.jsx`
- transitional `setPage()` compatibility layer
- page components not yet separated
- metadata not yet centralized
- no dedicated 404 route
- manually maintained sitemap
- historical GitHub Pages configuration
- duplicate/historical assets

These are documented in:

`docs/19-known-technical-debt.md`

---

# Current Codebase Baseline

As of August 12, 2026:

- React Router is integrated;
- `src/main.jsx` wraps the app in `BrowserRouter`;
- real browser routes are active;
- `src/App.jsx` remains the main orchestration file;
- primary navigation uses `NavLink`;
- the compatibility `setPage()` layer remains temporarily;
- `public/.htaccess` is deployment-critical;
- `public/sitemap.xml` and `public/robots.txt` remain static SEO files;
- `docs/` is the living Engineering Manual;
- `public/idx-wrapper.html` is the next planned major structural addition.

## Related Documentation

See also:

- `02-system-architecture.md`
- `04-component-catalog.md`
- `05-state-and-navigation.md`
- `06-git-branching-workflow.md`
- `07-hostinger-deployment.md`
- `17-security-maintenance.md`
- `19-known-technical-debt.md`
- `22-developer-onboarding.md`