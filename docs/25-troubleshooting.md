# Troubleshooting

## Purpose

This document provides a practical troubleshooting guide for the Moving in Mobile website.

It is intended to help a future developer quickly identify whether a problem is coming from:

* local source code
* React routing
* Hostinger deployment
* browser behavior
* Formspree
* Google Analytics
* SEO configuration
* structured data
* static assets
* IDX Broker
* DNS or SSL
* Git branch state

Troubleshooting should begin with the smallest reproducible scope.

---

# General Troubleshooting Principles

When diagnosing a problem:

1. capture the exact symptom;
2. identify the affected environment;
3. determine whether the issue is local, staging, production, or provider-side;
4. verify the deployed commit;
5. reproduce the issue where possible;
6. inspect browser Console and Network tools;
7. avoid changing multiple systems at once;
8. prefer the smallest verified fix;
9. document material incidents and architecture changes.

Do not make uncontrolled edits directly in production unless an emergency requires immediate restoration.

---

# Verify the Current Git State

Start with:

```bash
git status
```

Then:

```bash
git branch
```

and:

```bash
git log -1 --oneline
```

Confirm:

* active branch;
* expected commit;
* clean or intentionally modified working tree.

For staging development, the normal branch should be:

`staging`

Production source should be:

`main`

---

# Local Build Failure

Run:

```bash
npm run build
```

If the build fails:

1. read the first meaningful error;
2. note the filename and line number;
3. inspect the surrounding source;
4. fix the source rather than generated output;
5. rerun the build.

Common causes include:

* JSX syntax errors;
* duplicated blocks after manual replacement;
* missing closing tags;
* unmatched braces;
* invalid imports;
* missing dependencies.

Do not edit `dist/` to correct source problems.

---

# Vite Development Server

Run:

```bash
npm run dev
```

Typical local URL:

`http://localhost:5173/`

If the server does not start:

* verify Node is installed;
* verify dependencies are installed;
* run `npm install` if appropriate;
* review the first Vite error.

---

# React Route Displays the Wrong Page

The application derives page identity from the browser pathname.

Check:

`src/App.jsx`

Review:

* `PAGE_ROUTES`;
* reverse route mapping;
* `getPageFromPath()`;
* route-to-page compatibility logic.

Confirm the browser pathname matches the expected route.

Examples:

```text
/buyers
/sellers
/resources
/rowe-report
```

If an unknown route shows the homepage, remember that the current compatibility logic may still fall back to the home page until dedicated 404 handling is implemented.

---

# Header Link Does Not Navigate

Primary navigation uses React Router `NavLink`.

Check:

* `to` value;
* imported `NavLink`;
* route mapping;
* click handler;
* browser Console.

Normal visible navigation should use real links where possible.

---

# Legacy `setPage()` Navigation Does Not Work

Some internal CTA behavior still uses the transitional `setPage()` compatibility layer.

Check:

* whether the page key exists in `PAGE_ROUTES`;
* whether `useNavigate()` is available in the component scope;
* whether the event supplies the correct page key.

Examples of expected keys include:

```text
home
about
buyers
sellers
neighborhoods
rowereport
resources
contact
```

Do not confuse route paths such as:

`/rowe-report`

with compatibility page keys such as:

`rowereport`

---

# Browser Back or Forward Does Not Work

React Router should use browser history.

If Back or Forward fails:

1. verify navigation is using React Router;
2. inspect whether a component is manually changing content without changing the URL;
3. review remaining legacy state-based navigation;
4. check Console errors.

---

# Nested Route Works from Navigation but Refresh Returns 404

Example:

```text
https://movinginmobile.com/buyers
```

works when clicked from the homepage but returns 404 after refresh.

This usually indicates a Hostinger SPA fallback issue.

Check:

`public/.htaccess`

Expected configuration:

```apache
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

Also verify that the deployed `.htaccess` exists.

Do not immediately modify React Router if the route works during client-side navigation but fails only on direct request or refresh.

---

# Homepage Works but All Nested Routes Return 404

Likely causes:

* `.htaccess` missing from deployment;
* rewrite rules overwritten;
* deployment did not include `public/.htaccess`;
* Hostinger serving an older build.

Check:

```bash
git log -1 --oneline
```

and confirm the correct commit is deployed.

Verify:

`dist/.htaccess`

exists after:

```bash
npm run build
```

---

# robots.txt or sitemap.xml Stops Loading

The SPA fallback should not intercept real files.

Check:

```text
https://movinginmobile.com/robots.txt
https://movinginmobile.com/sitemap.xml
```

If either returns the React app instead of the file:

1. inspect `.htaccess`;
2. verify the `-f` and `-d` rewrite conditions;
3. confirm the files exist under `public/`;
4. rebuild and redeploy.

---

# Canonical URL Is Wrong

Inspect the rendered:

```html
<link rel="canonical">
```

Check the route-aware metadata logic in:

`src/App.jsx`

Expected examples:

```text
/buyers
→ https://movinginmobile.com/buyers

/sellers
→ https://movinginmobile.com/sellers
```

Do not allow every route to canonicalize to the homepage.

Also ensure staging or localhost hostnames do not leak into production canonical values.

---

# Page Title Is Wrong

Check the route/page metadata mapping in:

`src/App.jsx`

Confirm the active route resolves to the correct metadata entry.

Page-specific metadata is still an active roadmap item, so future refactoring may move this configuration into a dedicated metadata structure.

---

# Sitemap Missing New Routes

Check:

`public/sitemap.xml`

If a permanent public route has been added, decide whether it should be included.

Do not add:

* staging URLs;
* wrapper files;
* test pages;
* implementation-only pages.

---

# Staging or Production Appears to Run Old Code

Check local state:

```bash
git log -1 --oneline
```

Check remote state:

```bash
git status
```

For staging, confirm:

```bash
git push origin staging
git push origin staging:redesign-v2
```

has been performed when a runtime deployment is required.

Then verify Hostinger deployment status.

Do not assume that pushing only `staging` automatically updates the Hostinger staging site.

---

# Documentation Changes Are Not Visible on the Website

This is expected.

Files under:

`docs/`

are repository documentation and are not part of the customer-facing site.

A documentation-only commit does not require:

```bash
git push origin staging:redesign-v2
```

unless website code also changed.

---

# Hostinger Deployment Fails

Check:

* build logs;
* Node/npm version;
* dependency installation;
* Vite build output;
* repository branch;
* latest commit.

Run locally:

```bash
npm run build
```

If local build fails, fix that first.

If local build succeeds but Hostinger fails, inspect provider-specific logs.

---

# Production Works but Staging Does Not

Compare:

* branch;
* deployed commit;
* `.htaccess`;
* Hostinger settings;
* staging domain;
* SSL;
* staging indicator behavior.

Do not assume provider settings are identical across environments.

---

# Staging Works but Production Does Not

Compare:

* `main` versus `staging`;
* deployment status;
* domain configuration;
* `.htaccess`;
* browser Console;
* network requests.

Verify that the intended staging commit was actually merged into `main`.

---

# Form Submission Fails

Existing non-IDX forms use Formspree.

Check:

1. browser Console;
2. Network request;
3. Formspree response;
4. endpoint configuration;
5. required form fields;
6. hidden metadata;
7. success and error handlers.

A failed request may be caused by:

* invalid endpoint;
* network problem;
* form validation;
* provider issue.

---

# Form Returns Success but Lead Is Not Received

A successful HTTP response does not prove final delivery.

Check:

* Formspree dashboard;
* recipient configuration;
* spam filtering;
* downstream email delivery;
* request source metadata.

Use synthetic test submissions when possible.

---

# Modal Does Not Open

Check:

* state controlling visibility;
* CTA click handler;
* custom event behavior;
* browser Console.

If the modal is triggered through a custom event, confirm the event name and detail value match the current implementation.

---

# Modal Does Not Close

Check:

* close handler;
* backdrop handler;
* button event;
* stale state after route changes.

Verify behavior on both desktop and mobile.

---

# Google Analytics Page Views Missing

Check:

* GA initialization in `index.html`;
* `window.gtag`;
* route-change effect in `src/App.jsx`;
* measurement ID;
* browser Network requests;
* GA4 Realtime or DebugView.

Confirm:

* page path matches current route;
* page title is correct;
* page location is correct.

---

# Duplicate GA4 Page Views

Possible causes include:

* multiple page-view effects;
* provider auto-tracking plus manual SPA tracking;
* duplicate initialization;
* development behavior under React Strict Mode.

Inspect both source and GA4 DebugView before removing tracking.

---

# Structured Data Validation Fails

Check:

`src/components/StructuredData.jsx`

Validate:

* syntax;
* property names;
* URLs;
* visible business facts;
* structured-data type.

Do not add fabricated information merely to satisfy a validator.

---

# Search Console Reports Blocked or Redirected URLs

First determine which hostname or protocol the report refers to.

Possible variants include:

```text
http://movinginmobile.com
http://www.movinginmobile.com
https://www.movinginmobile.com
https://movinginmobile.com
```

Do not assume a warning about an alternate hostname means the primary production page is broken.

The current architecture intentionally uses:

`https://movinginmobile.com`

as the preferred production hostname.

Cloudflare remains deferred unless the alternate-hostname behavior becomes materially harmful.

---

# Search Console Says Page Is Not Indexed

Verify:

* production URL;
* canonical;
* robots directives;
* sitemap;
* actual page response;
* redirect behavior.

Use Search Console URL Inspection on the exact route.

Do not request repeated indexing without first verifying the technical state.

---

# Image Does Not Load in Production

Check:

* exact filename;
* capitalization;
* asset location;
* browser Network response;
* source reference.

Production environments may treat filenames as case-sensitive even when local development appears forgiving.

---

# Branding Looks Wrong After Deployment

Check:

* correct asset file;
* old/duplicate image variants;
* CSS class changes;
* cached assets;
* responsive breakpoint behavior.

The repository contains historical asset variants, so confirm the intended current filename before replacing anything.

---

# Mobile Layout Breaks

Check:

* viewport width;
* Tailwind breakpoint classes;
* fixed widths;
* overflow;
* image sizing;
* header behavior;
* modal behavior;
* floating contact widget.

Test representative phone and tablet widths.

---

# IDX Broker Search Does Not Load

Once IDX is implemented, first determine whether the failure is:

* DNS;
* SSL;
* IDX Broker;
* wrapper;
* search configuration;
* main-site link.

Check the custom IDX hostname:

`homes.movinginmobile.com`

If the custom domain is not active, compare against the default IDX Broker hostname.

---

# IDX Custom Domain Does Not Resolve

Check:

* DNS record;
* propagation;
* IDX Broker custom-domain configuration;
* SSL status.

Do not modify unrelated application routing to solve a DNS failure.

---

# IDX Wrapper Does Not Render Correctly

The planned wrapper file is:

`public/idx-wrapper.html`

Check:

* file is deployed;
* server returns actual wrapper HTML;
* required IDX markers exist in source;
* CSS loads;
* images load;
* navigation URLs are absolute or correct for the context;
* IDX Broker Dynamic Wrapper points to the correct URL.

Expected production wrapper URL:

`https://movinginmobile.com/idx-wrapper.html`

---

# IDX Pages Show Vendor Branding Instead of Moving in Mobile

Check:

* wrapper assignment;
* Dynamic Wrapper configuration;
* IDX page template settings;
* custom CSS;
* wrapper retrieval.

Do not assume the wrapper is active simply because it is configured.

Test Advanced Search, Results, and Listing Detail separately.

---

# IDX Search Works but Listing Details Fail

Check:

* listing-detail template;
* custom domain;
* wrapper;
* MLS feed status;
* browser Console/Network;
* IDX Broker account configuration.

Determine whether the failure occurs for:

* one listing;
* one property type;
* all listings.

---

# IDX Lead Capture Does Not Work

Check:

* IDX Broker lead settings;
* registration settings;
* form behavior;
* notification destination;
* account configuration.

Remember that IDX lead capture is separate from Formspree unless a future integration combines them.

---

# IDX Analytics Are Fragmented

If sessions split when moving between:

`movinginmobile.com`

and:

`homes.movinginmobile.com`

review:

* GA4 configuration;
* subdomain behavior;
* referral exclusions where appropriate;
* IDX analytics settings;
* tag deployment.

Do not assume same-domain-root behavior automatically produces the desired analytics model.

---

# IDX SEO Looks Wrong

Review:

* custom hostname;
* canonical URL;
* indexability;
* IDX sitemap;
* listing-detail metadata;
* saved-search metadata.

Do not broadly submit IDX URLs to Search Console until the custom-domain and wrapper architecture are stable.

---

# DNS or SSL Problem

Check the provider first.

Symptoms may include:

* browser certificate warning;
* DNS resolution failure;
* hostname not found;
* redirect loop.

Do not change application source code when the issue is clearly outside the application layer.

---

# `.env` or Secrets Concern

Do not commit private credentials.

Check:

```bash
git status
```

and:

```bash
git diff
```

Ensure `.env` and other sensitive files are not accidentally staged.

If a secret is committed:

1. remove it from source;
2. rotate the credential;
3. assess repository history exposure;
4. document the incident if material.

---

# Source Snapshot Contains Unwanted Files

Future archives should exclude:

* `.git`
* `node_modules`
* `dist`
* `.env`
* `.DS_Store`
* nested ZIP files

Use Git commits as the primary source-history mechanism.

---

# Git Merge Conflict

Do not blindly accept all changes from one side.

For each conflict:

1. identify intended production behavior;
2. compare both versions;
3. preserve relevant changes;
4. build;
5. test.

For complex conflicts involving architecture, refer to the decision log.

---

# Wrong Branch Was Modified

If changes are uncommitted:

1. inspect `git status`;
2. decide whether to stash, restore, or move the work;
3. do not commit to the wrong branch merely for convenience.

If changes were committed to the wrong branch, correct the Git history carefully rather than improvising.

---

# Production Regression

If a recent production release causes material impact:

1. capture the affected URL and symptoms;
2. identify the deployed commit;
3. determine scope;
4. check external-provider status;
5. roll back if impact is significant;
6. reproduce on staging;
7. implement the smallest verified fix;
8. run release validation;
9. redeploy;
10. document the cause and prevention work.

Core navigation, lead capture, compliance identity, and critical IDX functionality should receive rollback-first consideration when materially broken.

---

# Common Troubleshooting Mistakes to Avoid

Do not:

* edit `dist/` as the normal fix;
* regenerate lock files without understanding the problem;
* assume React route failures are always React problems;
* assume a successful Git push means Hostinger deployment succeeded;
* assume a successful Formspree response proves downstream delivery;
* assume Search Console warnings refer to the preferred production hostname;
* remove Hostinger rewrite rules without understanding them;
* test with unnecessary real prospect data;
* combine broad dependency upgrades with urgent fixes;
* make undocumented production-only changes;
* expose API keys in client-side source;
* treat historical documentation as more authoritative than current code.

---

# Troubleshooting Reference Matrix

| Problem Area          | Primary Source / Tool                                      | Secondary Check                         |
| --------------------- | ---------------------------------------------------------- | --------------------------------------- |
| Local install/build   | Terminal, `package.json`, `package-lock.json`, Vite output | Node/npm version, source diff           |
| Runtime/navigation    | `src/App.jsx`, browser Console                             | route mapping, compatibility navigation |
| Direct-route 404      | `public/.htaccess`, Hostinger                              | deployed file, branch/commit            |
| Assets/branding       | `public/`, browser Network                                 | filename case, CSS, old asset variants  |
| Lead capture          | Network, Formspree                                         | form metadata, downstream delivery      |
| Analytics             | GA4 Realtime/DebugView                                     | `index.html`, route page-view logic     |
| SEO/indexing          | `robots.txt`, sitemap, Search Console                      | canonicals, hostname, route behavior    |
| Structured data       | `StructuredData.jsx`, validator                            | visible business facts                  |
| Deployment            | Hostinger logs                                             | Git branch/commit, local build          |
| Staging               | staging URL, indicators                                    | `redesign-v2` branch                    |
| Production regression | Git/Hostinger history                                      | last known-good commit                  |
| IDX domain            | DNS, IDX Broker                                            | SSL, custom-domain settings             |
| IDX wrapper           | `idx-wrapper.html`, IDX Broker                             | marker HTML, CSS, page assignment       |
| IDX leads             | IDX Broker dashboard                                       | notification settings                   |
| Documentation         | `docs/` in GitHub                                          | decision log, current source            |

---

# Documentation Maintenance

Update this troubleshooting guide after material changes to:

* routing
* hosting
* IDX
* lead systems
* analytics
* SEO
* build tooling
* deployment workflow

When documentation conflicts with actual runtime behavior, verify the current source and provider configuration, then update the documentation.

---

# Current Troubleshooting Baseline

As of August 12, 2026:

* `/buyers`, `/sellers`, and other primary routes are real browser routes;
* nested-route refresh is supported through `public/.htaccess`;
* the historical warning that these paths are analytics-only virtual routes is obsolete;
* React Router is live in staging and production;
* GitHub Markdown is the living Engineering Manual;
* Elm Street / IDX Broker is the next major troubleshooting domain to be introduced.
