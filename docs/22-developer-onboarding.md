# Developer Onboarding

## Purpose

This document provides the minimum information a new developer needs to begin working safely on the Moving in Mobile website.

It explains:

* project purpose
* repository structure
* local setup
* branch roles
* deployment workflow
* documentation expectations
* hosting behavior
* routing architecture
* major third-party integrations
* current priorities
* important cautions

A new developer should read this document before making production-impacting changes.

---

# Project Overview

Moving in Mobile is a real-estate marketing and lead-generation website for Tina Rowe, REALTOR® with Keller Williams Mobile.

The site is designed to support:

* buyer lead generation
* seller lead generation
* relocation content
* local neighborhood information
* The Rowe Report
* property search
* IDX integration
* SEO
* GEO
* long-term content growth

The production website is:

`https://movinginmobile.com`

The staging website is:

`https://staging.movinginmobile.com`

---

# Primary Technology Stack

The current application uses:

* React
* React DOM
* React Router
* Vite
* Tailwind CSS
* Hostinger
* GitHub
* Formspree
* Google Analytics 4
* Google Search Console
* JSON-LD structured data

Elm Street / IDX Broker is being integrated for MLS functionality.

---

# Repository Location

Typical local repository location:

```text id="d3elwg"
~/moving-in-mobile
```

The repository includes:

```text id="3bapt9"
moving-in-mobile/
├── src/
├── public/
├── docs/
├── package.json
├── package-lock.json
├── vite.config.js
├── index.html
└── ...
```

---

# Living Engineering Manual

The authoritative living Engineering Manual is stored in:

`docs/`

in the GitHub repository.

This Markdown documentation should be treated as part of the codebase.

Historical DOCX/PDF manuals may exist, but the GitHub Markdown files are the maintained source.

When implementation changes materially, update the relevant documentation.

---

# Initial Reading Order

A new developer should read these files first:

1. `docs/README.md`
2. `docs/02-system-architecture.md`
3. `docs/05-state-and-navigation.md`
4. `docs/06-git-branching-workflow.md`
5. `docs/07-hostinger-deployment.md`
6. `docs/18-testing-qa.md`
7. `docs/19-known-technical-debt.md`
8. `docs/20-decision-log.md`
9. `docs/21-future-roadmap.md`
10. `docs/23-deployment-checklist.md`
11. `docs/24-release-checklist.md`
12. `docs/25-troubleshooting.md`

These documents explain the current architecture and major decisions.

---

# Branch Roles

The repository uses three operationally important branches.

## `staging`

Primary development and integration branch.

Normal work should begin here.

## `redesign-v2`

Hostinger staging deployment branch.

It is normally fed from `staging`.

Do not develop directly on this branch.

## `main`

Production branch.

Only validated work should normally be promoted here.

---

# Standard Development Start

Begin with:

```bash id="pkynug"
cd ~/moving-in-mobile
git checkout staging
git pull origin staging
git status
```

You should normally begin with a clean working tree.

If unexpected changes exist, inspect them before continuing.

---

# Node and npm

Verify the environment:

```bash id="ytg18v"
node -v
npm -v
```

Install dependencies:

```bash id="l9v62z"
npm install
```

If the project is being restored from a clean checkout and the lock file is authoritative, `npm ci` may also be appropriate.

Do not replace the lock file merely because an install command fails.

Understand the cause first.

---

# Local Development

Start the local development server:

```bash id="o0rjz8"
npm run dev
```

Vite typically serves:

`http://localhost:5173/`

Use the local site to validate changes before staging deployment.

---

# Production Build

Before committing runtime changes:

```bash id="5x3j2j"
npm run build
```

The build must succeed before normal staging deployment.

Generated output is written to:

`dist/`

Do not edit `dist/` directly as the normal method of changing site behavior.

---

# Routing Architecture

The site uses React Router.

The application is wrapped in:

`BrowserRouter`

in:

`src/main.jsx`

Primary routes include:

* `/`
* `/about`
* `/buyers`
* `/sellers`
* `/neighborhoods`
* `/rowe-report`
* `/resources`
* `/contact`

These are real browser URLs.

Do not treat them as virtual analytics-only paths.

That was the historical Version 1.0 behavior and is now obsolete.

---

# Routing Compatibility Layer

Some existing code still uses:

```jsx id="o80gvm"
setPage("buyers");
```

This is a transitional compatibility layer.

It now maps legacy page keys to real React Router URLs.

Do not interpret `setPage()` as evidence that the site still uses React state-based routing.

Future cleanup will gradually remove this compatibility layer.

---

# Header Navigation

Primary header navigation uses React Router `NavLink`.

Normal visible navigation should use real links.

Programmatic navigation should be used only where appropriate.

---

# Hostinger SPA Fallback

Because the site uses `BrowserRouter`, direct browser requests to nested routes require server fallback to `index.html`.

The source-controlled configuration lives at:

`public/.htaccess`

Expected configuration:

```apache id="m1wmd0"
RewriteEngine On

# Preserve Hostinger's internal builds protection
RewriteRule ^\.builds - [F,L]

# Serve existing files and directories normally
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# React Router SPA fallback
RewriteRule ^ index.html [L]
```

Do not remove this file casually.

If nested routes work through navigation but fail after refresh, inspect `.htaccess` before changing React Router.

---

# Vite Configuration

Current Vite configuration uses:

```javascript id="exs47c"
base: "/"
```

This is correct for the current Hostinger root-domain deployment.

Historical GitHub Pages configuration used a subdirectory path.

Do not restore the old GitHub Pages base configuration unless the hosting architecture changes.

---

# Standard Staging Deployment

After local validation and commit:

```bash id="g86ihg"
git push origin staging
```

Then deploy to Hostinger staging:

```bash id="16x09w"
git push origin staging:redesign-v2
```

Wait for Hostinger deployment to complete.

Then validate:

`https://staging.movinginmobile.com`

---

# Staging Routing Validation

At minimum, directly open:

```text id="vmg7j2"
https://staging.movinginmobile.com/buyers
```

Refresh the page.

It must continue to load.

Also verify representative routes such as:

```text id="gqz5x7"
/sellers
/rowe-report
```

If direct refresh produces 404, review:

`public/.htaccess`

---

# Production Promotion

After staging validation:

```bash id="p7g97u"
git checkout main
git pull origin main
git merge staging
git push origin main
```

Wait for Hostinger production deployment.

Then validate:

`https://movinginmobile.com`

After production validation, return to:

```bash id="a21k78"
git checkout staging
```

---

# Documentation-Only Changes

If only files under:

`docs/`

change, they should still be committed and pushed to GitHub.

Example:

```bash id="71zyjp"
git add docs/
git commit -m "Update engineering documentation"
git push origin staging
```

A Hostinger staging deployment is not required solely for documentation changes.

---

# Static Public Files

Files under:

`public/`

are copied into the Vite build output.

Examples include:

* branding images
* neighborhood images
* `robots.txt`
* `sitemap.xml`
* `.htaccess`
* future `idx-wrapper.html`

Changes to these files can affect production behavior.

---

# SEO Foundation

The site currently includes:

* Google Search Console
* XML sitemap
* `robots.txt`
* canonical URLs
* GA4
* JSON-LD structured data
* real browser routes

Page-specific metadata remains an active roadmap item.

Do not assume every route already has fully optimized metadata.

---

# Canonical URLs

Primary public routes should use production canonicals.

Examples:

```text id="8td5up"
https://movinginmobile.com/buyers
https://movinginmobile.com/sellers
```

Do not restore a configuration where every route canonicalizes to the homepage.

---

# Sitemap

The sitemap is stored at:

`public/sitemap.xml`

Current routing has expanded beyond the historical one-page architecture.

The sitemap requires ongoing maintenance as new public routes are added.

Do not include internal utility pages such as the planned IDX wrapper.

---

# Search Console

Google Search Console is configured.

Historical warnings involving:

* blocked URLs
* redirects
* alternate hostnames

were investigated.

The preferred production hostname is:

`https://movinginmobile.com`

Cloudflare was intentionally not introduced solely to solve minor `www` redirect concerns.

Do not reverse that decision without reviewing:

`docs/20-decision-log.md`

---

# Lead Capture

Existing non-IDX lead forms use Formspree.

A browser success response does not guarantee final lead delivery.

When modifying forms, verify:

* browser submission
* provider receipt
* downstream delivery
* source metadata

Use synthetic test data where possible.

---

# Analytics

GA4 tracks route-level page views.

Changes to:

* routing
* page identity
* navigation
* metadata

should include analytics validation.

Use GA4 Realtime or DebugView when appropriate.

---

# Structured Data

Structured data is implemented in:

`src/components/StructuredData.jsx`

Do not add:

* fabricated reviews
* unsupported ratings
* unverifiable awards
* data that conflicts with visible content

Structured data should reflect real site information.

---

# Staging Indicators

Staging-specific behavior is implemented through:

`src/components/StagingIndicators.jsx`

Verify staging indicators do not appear unexpectedly in production.

---

# IDX Broker

Elm Street / IDX Broker is the current highest-priority integration.

Tina Rowe's Gulf Coast MLS feed has been approved.

The current default IDX Broker hostname is:

`movinginmobile.idxbroker.com`

The preferred future hostname is:

`homes.movinginmobile.com`

Do not assume the custom hostname is active until DNS and IDX Broker configuration have both been validated.

---

# Planned IDX Architecture

The integration will use a hybrid architecture.

## Main React Site

Responsible for:

* branding
* editorial content
* neighborhood content
* buyer/seller guidance
* Tina's local positioning
* GEO
* non-IDX lead forms

## IDX Broker

Responsible for:

* property search
* results
* listing details
* map search
* saved searches
* MLS data
* property-specific lead workflows

---

# IDX Wrapper

The planned wrapper is:

`public/idx-wrapper.html`

Expected production URL:

`https://movinginmobile.com/idx-wrapper.html`

It should be a real static HTML file rather than a client-rendered React route.

Reason:

IDX Broker Dynamic Wrappers retrieve server-returned HTML and expect wrapper markers to exist in that source.

Do not implement the wrapper as a React-only route unless the integration architecture is explicitly reconsidered.

---

# IDX API Credentials

Do not commit IDX Broker API credentials.

Do not expose a private IDX API key in client-delivered JavaScript.

Credentials should be stored only in an appropriate secure environment.

---

# External Provider Boundaries

Not all configuration is represented in Git.

Provider-side systems include:

* Hostinger
* DNS
* SSL
* Formspree
* GA4
* Search Console
* IDX Broker
* Gulf Coast MLS

Repository documentation describes expected configuration, but live provider configuration remains authoritative.

---

# `src/App.jsx`

The application currently has substantial logic concentrated in:

`src/App.jsx`

This is known technical debt.

Do not perform a broad refactor merely because the file is large.

Refactor incrementally after higher-value features such as IDX are stable.

---

# Existing Technical Debt

Important active items include:

* temporary `setPage()` compatibility layer
* large `App.jsx`
* no dedicated 404 page
* page-specific metadata architecture
* sitemap expansion
* neighborhood route expansion
* IDX integration
* IDX analytics
* IDX SEO
* limited automated testing
* historical GitHub Pages configuration
* old/duplicate assets

Review:

`docs/19-known-technical-debt.md`

before starting broad cleanup work.

---

# Development Priority

Current priority order begins with:

1. complete current documentation migration
2. IDX wrapper
3. IDX custom domain
4. IDX search/results/details validation
5. main-site IDX integration
6. IDX lead capture
7. IDX analytics
8. IDX SEO
9. page-specific SEO
10. neighborhood expansion
11. GEO
12. market reports
13. later architecture cleanup

Do not prioritize low-value cleanup ahead of IDX without a strong reason.

---

# Git Safety

Before any commit:

```bash id="qf2as0"
git status
```

Review:

```bash id="6c7hqg"
git diff
```

Avoid committing:

* `.env`
* private credentials
* `.DS_Store`
* source ZIPs
* `node_modules`
* generated `dist/`

unless repository policy explicitly changes.

---

# Source Snapshots

Git history is the primary source-history mechanism.

If an archival ZIP is created, record:

```bash id="f63w9g"
git rev-parse HEAD
git log -1 --oneline
```

Exclude:

* `.git`
* `node_modules`
* `dist`
* `.env`
* `.DS_Store`
* nested ZIP files

---

# Before Making a Significant Change

Ask:

1. Is this work already covered by a decision?
2. Does it affect routing?
3. Does it affect hosting?
4. Does it affect SEO?
5. Does it affect lead capture?
6. Does it affect IDX?
7. Does documentation need to change?
8. Can the change be isolated and tested independently?
9. What is the rollback path?

---

# Before Production

Use:

`docs/24-release-checklist.md`

Do not rely on memory for high-impact releases.

---

# If Something Breaks

Start with:

`docs/25-troubleshooting.md`

Then verify:

```bash id="t5mqvo"
git status
git log -1 --oneline
npm run build
```

Determine whether the failure is:

* source
* routing
* hosting
* deployment
* provider
* DNS
* SSL
* analytics
* lead system
* IDX

before changing unrelated code.

---

# Current Onboarding Baseline

As of August 12, 2026:

* production and staging are active;
* React Router is live;
* real browser routes are supported;
* Hostinger SPA fallback is source-controlled;
* GitHub Markdown is the living Engineering Manual;
* the technical SEO foundation is active;
* Formspree and GA4 are active;
* Elm Street / IDX Broker is the next major implementation milestone.

## Related Documentation

See also:

* `docs/README.md`
* `docs/02-system-architecture.md`
* `docs/05-state-and-navigation.md`
* `docs/06-git-branching-workflow.md`
* `docs/07-hostinger-deployment.md`
* `docs/18-testing-qa.md`
* `docs/19-known-technical-debt.md`
* `docs/20-decision-log.md`
* `docs/21-future-roadmap.md`
* `docs/23-deployment-checklist.md`
* `docs/24-release-checklist.md`
* `docs/25-troubleshooting.md`
