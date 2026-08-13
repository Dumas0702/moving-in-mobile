# Environment Setup

## Purpose

This appendix describes how to set up a local development environment for the Moving in Mobile project.

It is intended for:

- new developers
- future maintainers
- recovery after workstation replacement
- troubleshooting local build issues

The goal is to provide a repeatable setup process without depending on undocumented local knowledge.

---

# Repository

The project is stored in GitHub.

The normal local working directory has historically been:

`~/moving-in-mobile`

A different directory is acceptable.

The repository itself is the important source of truth.

---

# Required Tools

A developer should have:

- Git
- Node.js
- npm
- a modern web browser
- a code editor

Recommended browser:

- Chrome
- another Chromium-based browser
- Firefox for secondary testing

---

# macOS Development

The project has primarily been developed on macOS.

Typical Terminal prompt has looked similar to:

    gregorydumas@Gregorys-MacBook-Air moving-in-mobile %

The commands in this appendix use standard macOS/Linux shell syntax.

---

# Git Installation

Verify Git:

    git --version

If Git is not available, install it through an appropriate macOS package-management or developer-tools method.

Do not install project dependencies until Git and repository access are working.

---

# Node.js

The project has been developed using a modern Node.js environment.

At the time of the React Router migration, the local environment reported:

    node v24.11.1

Node versions may change over time.

The current repository dependencies and Hostinger environment should determine compatibility.

---

# npm

At the time of the React Router migration, the local npm version reported:

    npm 11.6.2

Verify current npm:

    npm --version

Exact historical versions are useful for troubleshooting but should not automatically be treated as permanent requirements.

---

# Check Node and npm Together

Run:

    node --version
    npm --version

If the project suddenly stops building after a Node upgrade, compare against:

- known working local version
- current Hostinger build environment
- dependency compatibility

---

# Clone Repository

For a fresh workstation:

    git clone <repository-url>
    cd moving-in-mobile

Use the actual GitHub repository URL.

Do not store GitHub credentials directly in setup documentation.

---

# Existing Repository

If the repository already exists locally:

    cd ~/moving-in-mobile
    git status

Confirm you are in the expected project before running destructive Git commands.

---

# Remote Verification

Check configured remotes:

    git remote -v

Confirm:

- fetch remote points to the correct repository
- push remote points to the correct repository

Typical primary remote name:

`origin`

---

# Fetch Latest Repository State

Run:

    git fetch origin

This updates local knowledge of remote branches without changing the current working tree.

---

# Development Branch

Normal development should occur on:

`staging`

Switch to staging:

    git switch staging

Then update it:

    git pull origin staging

---

# Verify Current Branch

Run:

    git branch --show-current

Expected for normal development:

`staging`

Do not begin normal development on:

`main`

unless intentionally performing production-specific recovery work.

---

# Check Working Tree

Before starting work:

    git status

A clean starting state reduces the chance of mixing unrelated changes.

---

# Install Dependencies

From the repository root:

    npm install

Because the project has a committed lock file, npm should install versions consistent with:

`package-lock.json`

---

# `npm install` Versus `npm ci`

For normal local development:

    npm install

is acceptable.

For highly reproducible clean installation, particularly in CI-style environments:

    npm ci

may be useful.

`npm ci` expects the lock file and package manifest to be synchronized.

---

# Do Not Commit `node_modules`

The directory:

`node_modules/`

is generated locally.

It should not be committed.

If Git reports large numbers of files from `node_modules`, inspect `.gitignore` before proceeding.

---

# Start Development Server

Run:

    npm run dev

Vite will normally display a local URL similar to:

`http://localhost:5173`

The exact port may change if the default port is already in use.

---

# Local Development URL

Typical local URL:

`http://localhost:5173`

Representative routes include:

    http://localhost:5173/
    http://localhost:5173/about
    http://localhost:5173/buyers
    http://localhost:5173/sellers
    http://localhost:5173/neighborhoods
    http://localhost:5173/rowe-report
    http://localhost:5173/resources
    http://localhost:5173/contact

---

# React Router Local Testing

The site uses React Router with `BrowserRouter`.

Test:

1. click navigation links
2. confirm browser URL changes
3. use browser Back
4. use browser Forward
5. refresh a nested route
6. directly enter a nested route

Local Vite handling may differ from Hostinger.

Hostinger staging remains required for final direct-route validation.

---

# Build Application

Before committing runtime code, run:

    npm run build

A successful build is one of the minimum release-quality checks.

---

# Build Output

Vite writes production output to:

`dist/`

Do not edit this directory directly.

Generated output should come from source.

---

# Verify Important Public Files in Build

After building, confirm the expected files exist.

Examples:

    dist/index.html
    dist/robots.txt
    dist/sitemap.xml
    dist/.htaccess

Future IDX work should also produce:

    dist/idx-wrapper.html

once the wrapper has been added.

---

# Build File Check

A simple shell check may include:

    ls -la dist

or:

    find dist -maxdepth 1 -type f -print

Confirm important static files were copied successfully.

---

# Vite Configuration

Current Vite configuration is stored in:

`vite.config.js`

The project currently uses a root base path:

    base: '/'

This matches the production architecture at:

`https://movinginmobile.com`

---

# Historical GitHub Pages Base Path

Earlier versions of the project were deployed under a GitHub Pages subpath:

`/moving-in-mobile/`

That architecture is historical.

Do not reintroduce the old subpath base configuration unless intentionally restoring GitHub Pages behavior.

---

# Tailwind

Tailwind CSS is integrated through the current Vite configuration.

Do not assume a traditional older Tailwind configuration layout if the current repository uses a newer integration method.

The repository source remains authoritative.

---

# React Entry Point

Application entry point:

`src/main.jsx`

It wraps:

`<App />`

with:

`BrowserRouter`

Routing depends on this wrapper.

---

# Main Application

Primary orchestration currently lives in:

`src/App.jsx`

This file remains relatively large.

Do not begin environment setup by refactoring it.

First confirm the existing application builds and runs.

---

# Local Environment Variables

Before creating any local environment variable files, inspect:

- `.gitignore`
- `.env.example` if present
- relevant provider documentation

Do not invent credentials.

---

# `.env` Security

If a `.env` file is needed:

- keep it local
- do not commit it
- do not share it in source snapshots
- do not place client-exposed secrets in it expecting Vite to hide them

A secret bundled into browser JavaScript is not private.

---

# Current Backend Requirement

The main site currently does not require a custom backend for normal operation.

Existing functions primarily rely on:

- React
- Formspree
- Google Analytics
- public third-party integrations

Future direct IDX API use may require a backend.

---

# Formspree Setup

Formspree endpoints are part of the existing client-side lead architecture.

For local testing:

- forms may be capable of submitting real leads
- avoid unnecessary test submissions
- use clearly identifiable test data when required

Do not send sensitive customer information during development testing.

---

# Google Analytics During Local Development

GA4 may initialize during local development depending on the current source configuration.

This can introduce development traffic into analytics.

When debugging:

- distinguish localhost from production
- use browser tools
- review hostname in GA4

Do not change production analytics code solely to hide a small amount of local testing traffic without considering the wider impact.

---

# Browser Developer Tools

Chrome DevTools is useful for:

- Console errors
- network failures
- analytics requests
- route behavior
- responsive design
- CSS inspection
- asset loading

Important tabs include:

- Elements
- Console
- Network
- Application

---

# Console Testing

After starting the site, review the Console.

Unexpected JavaScript errors should be investigated.

Warnings may not always be release blocking, but they should be understood.

---

# Network Testing

Use Network inspection to validate:

- JavaScript loads
- images load
- fonts load
- GA4 requests
- Formspree requests
- future IDX requests

Unexpected 404s should be investigated.

---

# Responsive Testing

At minimum, test representative sizes for:

- phone
- tablet
- laptop
- desktop

Key areas include:

- Header
- mobile menu
- Tina hero
- forms
- modals
- testimonials
- Resources
- future IDX

---

# Browser Cache

If changes appear not to deploy or render correctly:

- hard refresh
- test incognito/private mode
- disable cache while DevTools is open
- compare network responses

Do not assume deployment failed solely because an old cached asset is visible.

---

# Local Image Assets

Public image assets may live under:

`public/`

and may be referenced directly.

When adding images:

- use descriptive names
- avoid unnecessary duplicates
- verify case sensitivity
- test production build

Linux hosting may expose filename-case problems that macOS may not reveal clearly.

---

# Case Sensitivity

Be careful with filename case.

For example:

`TinaRoweHalf.png`

is not the same as:

`tinarowehalf.png`

on case-sensitive systems.

Always match the exact filename.

---

# Local Route Test Checklist

Before deploying a routing change:

- [ ] `/` loads
- [ ] `/about` loads
- [ ] `/buyers` loads
- [ ] `/sellers` loads
- [ ] `/neighborhoods` loads
- [ ] `/rowe-report` loads
- [ ] `/resources` loads
- [ ] `/contact` loads
- [ ] Back works
- [ ] Forward works
- [ ] Header active state works
- [ ] mobile navigation works

---

# Staging Deployment

The Hostinger staging deployment branch is:

`redesign-v2`

After pushing development work to:

`origin/staging`

deploy the same staging state using:

    git push origin staging:redesign-v2

---

# Staging URL

Validate:

`https://staging.movinginmobile.com`

Do not assume a successful Git push means the deployed site is correct.

Perform runtime QA.

---

# Hostinger Direct Route Validation

Hostinger must correctly serve nested routes.

Test directly:

`https://staging.movinginmobile.com/buyers`

Then refresh.

Repeat for representative routes.

If this produces a 404, inspect:

`public/.htaccess`

and the deployed build.

---

# `.htaccess`

Current source-controlled fallback file:

`public/.htaccess`

It is copied into:

`dist/.htaccess`

by Vite.

Do not rely on editing Hostinger's File Manager manually as the permanent solution.

Source control should remain authoritative.

---

# Production Promotion

After staging validation:

    git switch main
    git pull origin main
    git merge staging
    git push origin main

Use the documented Git workflow and inspect the merge before pushing.

---

# Return to Staging

After production work:

    git switch staging

Normal development should continue there.

---

# Production URL

Production:

`https://movinginmobile.com`

After production deployment, perform smoke testing.

---

# Production Smoke Test

At minimum verify:

- homepage
- navigation
- representative direct nested route
- nested-route refresh
- Contact
- lead form behavior when affected
- `robots.txt`
- `sitemap.xml`
- mobile layout where affected

Future IDX releases should add IDX search and listing-detail checks.

---

# Search Engine Files

Verify directly:

`https://movinginmobile.com/robots.txt`

and:

`https://movinginmobile.com/sitemap.xml`

They should not render the React application.

---

# Development Editor

Any modern editor is acceptable.

Common options include:

- Visual Studio Code
- another editor with JavaScript/React support

Avoid editor-specific project dependencies unless they provide clear shared value.

---

# Formatting

Do not reformat the entire project while making a small feature change.

Large formatting-only diffs:

- hide functional changes
- create merge conflicts
- make review difficult

Keep changes focused.

---

# Dependency Changes

Before adding a dependency:

1. determine whether existing tools already solve the problem
2. check maintenance status
3. understand bundle impact
4. understand security impact
5. install deliberately
6. run build
7. document architectural dependencies where material

---

# Installing a Package

Typical command:

    npm install <package-name>

This modifies:

- `package.json`
- `package-lock.json`

Both changes should be reviewed.

---

# Removing a Package

Typical command:

    npm uninstall <package-name>

Then:

    npm run build

Confirm nothing still imports it.

---

# Clean Reinstall

If dependency installation becomes corrupted, a controlled clean reinstall may help.

Example:

    rm -rf node_modules
    npm install

Avoid deleting:

`package-lock.json`

unless there is a specific reason.

---

# Build Troubleshooting

If:

    npm run build

fails:

1. read the first meaningful error
2. inspect the referenced file and line
3. check recent changes
4. fix syntax or imports
5. rerun build

Do not make unrelated configuration changes until the actual error is understood.

---

# Import Errors

Common causes include:

- wrong filename
- wrong path
- incorrect capitalization
- deleted component
- incorrect package import

Verify exact paths.

---

# JSX Parse Errors

Common causes include:

- duplicate JSX blocks
- missing closing element
- extra brace
- unmatched parentheses
- content accidentally pasted outside a component

These occurred during the React Router migration and were resolved by carefully removing obsolete duplicate blocks.

---

# Git Status Before Work

Recommended:

    git status
    git branch --show-current

Confirm:

- correct branch
- expected files
- no unexpected uncommitted work

---

# Git Diff During Work

Useful command:

    git diff

For a summary:

    git diff --stat

Review changes before staging them.

---

# Stage Changes

Example:

    git add src/App.jsx

or:

    git add docs/

Avoid blindly using:

    git add .

when unrelated files may exist.

---

# Inspect Staged Changes

Run:

    git diff --cached

or:

    git diff --cached --stat

This is the final opportunity to catch unexpected files before commit.

---

# Commit

Use concise descriptive messages.

Examples:

    git commit -m "Migrate site navigation to React Router"

    git commit -m "Add SPA fallback routing for Hostinger"

    git commit -m "Update living engineering manual for current architecture"

---

# Push Development Branch

    git push origin staging

---

# Documentation-Only Work

Documentation-only changes do not require Hostinger deployment solely because Markdown changed.

They should still be:

- reviewed
- committed
- pushed to GitHub

Then merged to `main` when ready so the production branch contains current documentation.

---

# IDX Development Prerequisites

Before beginning IDX integration, ensure:

- repository is clean
- staging is current
- production baseline is known
- build passes
- current staging works
- API credentials are not in client source

---

# IDX Wrapper Local Development

The planned wrapper file is:

`public/idx-wrapper.html`

Because it is a static public file, it should be accessible during development and copied unchanged into the Vite build.

Expected production URL:

`https://movinginmobile.com/idx-wrapper.html`

---

# IDX Wrapper Validation

When implemented:

1. open wrapper directly
2. inspect raw page source
3. verify required IDX markers exist
4. verify public assets load
5. run build
6. verify `dist/idx-wrapper.html`
7. deploy to staging
8. verify staging URL
9. only then configure IDX Broker to consume it

---

# Do Not Put IDX API Key in Wrapper

The wrapper is public.

Never place the private IDX API key inside it.

The Dynamic Wrapper feature should not require exposing the private API key in browser HTML.

---

# IDX Custom Hostname

Planned:

`homes.movinginmobile.com`

Environment setup for IDX may later include DNS validation.

Do not change DNS until the intended IDX Broker custom-domain procedure is ready.

---

# Provider Access

Local development may require access to external dashboards such as:

- Hostinger
- GitHub
- Formspree
- Google Analytics
- Search Console
- IDX Broker

Credentials should not be stored in the repository.

---

# Recovery on New Computer

A basic recovery sequence is:

    git clone <repository-url>
    cd moving-in-mobile
    git switch staging
    npm install
    npm run build
    npm run dev

Then verify:

- routes
- images
- forms
- build
- provider access as needed

---

# Recovery From Broken Local State

If the repository has local experimental changes:

    git status

Do not immediately delete them.

Determine whether they need to be:

- committed
- stashed
- copied elsewhere
- discarded

Only discard work intentionally.

---

# `git restore`

To discard a known unwanted modification to one tracked file:

    git restore <file>

This is destructive to uncommitted changes in that file.

Use carefully.

---

# Stash

If unfinished work must temporarily be moved aside:

    git stash push -m "description"

Later:

    git stash list

and:

    git stash pop

Use stashing intentionally and document long-lived stashes.

---

# Clean Working Tree

A clean working tree means:

    git status

reports no unintended changes.

This is the preferred state before:

- branch switching
- pulling
- merging
- release work

---

# Environment Verification Checklist

For a new local environment:

- [ ] Git installed
- [ ] Node installed
- [ ] npm installed
- [ ] repository cloned
- [ ] `origin` correct
- [ ] `staging` checked out
- [ ] dependencies installed
- [ ] `npm run build` succeeds
- [ ] `npm run dev` succeeds
- [ ] homepage loads
- [ ] nested route loads
- [ ] Back/Forward works
- [ ] images load
- [ ] no severe Console errors
- [ ] no secrets were added locally to Git

---

# Current Environment Baseline

As of August 12, 2026:

- development has primarily occurred on macOS;
- the repository is commonly located at `~/moving-in-mobile`;
- Git is the source-control system;
- GitHub is the remote repository;
- Node `v24.11.1` and npm `11.6.2` were used during the React Router migration;
- React Router is installed and active;
- `npm run dev` starts Vite;
- `npm run build` creates `dist/`;
- `staging` is the development branch;
- `redesign-v2` is the Hostinger staging deployment branch;
- `main` is production;
- `public/.htaccess` provides the source-controlled SPA fallback;
- future IDX development should begin with `public/idx-wrapper.html`, not by exposing the IDX API key in React.

## Related Documentation

See also:

- `../01-project-overview.md`
- `../03-codebase-structure.md`
- `../05-state-and-navigation.md`
- `../06-git-branching-workflow.md`
- `../07-hostinger-deployment.md`
- `../17-security-maintenance.md`
- `../18-testing-qa.md`
- `../22-developer-onboarding.md`
- `../23-deployment-checklist.md`
- `../24-release-checklist.md`
- `../25-troubleshooting.md`
- `git-command-reference.md`