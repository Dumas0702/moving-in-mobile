# Deployment Checklist

## Purpose

This checklist defines the standard steps for deploying changes to the Moving in Mobile website.

Use it for routine feature releases, routing changes, SEO changes, integration changes, and production promotions.

The goal is to ensure that deployment is repeatable, validated, and consistent with the established Git and Hostinger workflow.

## Standard Branch Roles

* `staging` — active development and integration branch
* `redesign-v2` — Hostinger staging deployment branch fed from `staging`
* `main` — production branch

## Standard Environments

Staging:

`https://staging.movinginmobile.com`

Production:

`https://movinginmobile.com`

---

# Pre-Development Checks

* [ ] Confirm you are working from the correct repository.
* [ ] Confirm the active branch is `staging`.
* [ ] Pull the latest `staging` changes.
* [ ] Confirm the working tree is clean before starting unrelated work.
* [ ] Review any feature-specific documentation or decision log entries.

Recommended commands:

```bash
cd ~/moving-in-mobile
git checkout staging
git pull origin staging
git status
```

---

# Local Development Checks

* [ ] Implement the intended change in source-controlled files.
* [ ] Do not edit generated `dist/` files directly.
* [ ] Do not expose private credentials in client-side code.
* [ ] Update relevant documentation under `docs/` for material architecture changes.
* [ ] Keep the scope of the release focused where practical.

---

# Build Validation

Run:

```bash
npm run build
```

* [ ] Build completes successfully.
* [ ] No syntax errors.
* [ ] No Vite build errors.
* [ ] No unexpected dependency failures.
* [ ] Generated output appears normal.

If the build fails, fix the source code before continuing.

---

# Local Browser Validation

Run:

```bash
npm run dev
```

Validate the affected functionality locally.

For routing-related changes:

* [ ] Homepage loads.
* [ ] `/about` loads.
* [ ] `/buyers` loads.
* [ ] `/sellers` loads.
* [ ] `/neighborhoods` loads.
* [ ] `/rowe-report` loads.
* [ ] `/resources` loads.
* [ ] `/contact` loads.
* [ ] Browser URL changes correctly.
* [ ] Browser Back works.
* [ ] Browser Forward works.
* [ ] Direct entry to a nested route works.
* [ ] Refreshing a nested route works locally.

For UI changes:

* [ ] Desktop layout is correct.
* [ ] Mobile layout is correct.
* [ ] No obvious visual regression.
* [ ] Header and footer remain correct.
* [ ] Required REALTOR® / brokerage / compliance identity remains visible where expected.

---

# Lead Capture Validation

If forms or lead logic changed:

* [ ] Required fields behave correctly.
* [ ] Valid submission succeeds.
* [ ] Error handling works.
* [ ] Success state works.
* [ ] Hidden request metadata is correct.
* [ ] Synthetic test data is used where practical.
* [ ] Formspree receives the test submission.
* [ ] Downstream delivery is verified if the change affects delivery.

Do not assume that a successful HTTP response proves final lead delivery.

---

# Analytics Validation

If routing, navigation, or analytics changed:

* [ ] GA4 `page_view` events fire.
* [ ] Page path matches the browser route.
* [ ] Page title is correct.
* [ ] No obvious duplicate page views are introduced.
* [ ] Production hostname logic remains correct.

Use GA4 Realtime or DebugView where appropriate.

---

# SEO Validation

If routing, metadata, SEO, or hosting changed:

* [ ] Canonical URL matches the intended production route.
* [ ] `robots.txt` remains accessible.
* [ ] `sitemap.xml` remains accessible.
* [ ] Structured data remains valid where affected.
* [ ] No staging hostname appears in production metadata.
* [ ] No localhost hostname appears in production metadata.
* [ ] New public routes are evaluated for sitemap inclusion.
* [ ] Internal utility pages are not accidentally added to the sitemap.

---

# React Router / Hostinger Validation

The application uses React Router with `BrowserRouter`.

The repository must include:

`public/.htaccess`

with the SPA fallback configuration.

Current expected configuration:

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

Before deployment:

* [ ] `public/.htaccess` exists.
* [ ] Hostinger `.builds` protection remains present.
* [ ] Existing files and directories remain exempt from rewrite.
* [ ] Unknown application paths fall back to `index.html`.

---

# Git Review Before Commit

Run:

```bash
git status
```

* [ ] Only expected files are modified.
* [ ] No secrets are present.
* [ ] No accidental source ZIPs are being committed.
* [ ] No `node_modules/` files are included.
* [ ] No `dist/` files are included unless repository policy intentionally changes.
* [ ] No `.DS_Store` files are added.
* [ ] No unintended `.env` file changes are staged.

Review changes:

```bash
git diff
```

For documentation-heavy changes:

```bash
git diff -- docs/
```

---

# Commit

Stage only the intended files.

Example:

```bash
git add src/ public/ docs/ package.json package-lock.json
```

Use a clear commit message.

Examples:

```bash
git commit -m "Migrate site navigation to React Router"
```

```bash
git commit -m "Add SPA fallback routing for Hostinger"
```

```bash
git commit -m "Update engineering manual for React Router migration"
```

* [ ] Commit message clearly describes the change.
* [ ] Commit contains only related work.

---

# Push Development Branch

Push:

```bash
git push origin staging
```

* [ ] Push succeeds.
* [ ] `origin/staging` contains the intended commit.

---

# Deploy to Hostinger Staging

For application changes, deploy the current staging branch to the Hostinger staging branch:

```bash
git push origin staging:redesign-v2
```

* [ ] Push succeeds.
* [ ] Hostinger detects the deployment.
* [ ] Hostinger build completes successfully.
* [ ] Staging site becomes available.

Documentation-only changes do not require this step unless the staging website itself needs to reflect the change.

---

# Staging Smoke Test

Open:

`https://staging.movinginmobile.com`

Validate:

* [ ] Homepage loads.
* [ ] Header works.
* [ ] Footer works.
* [ ] Desktop navigation works.
* [ ] Mobile navigation works.
* [ ] Affected feature works.
* [ ] No obvious browser console errors.
* [ ] No broken critical assets.

---

# Staging Direct-Route Test

Open these routes directly:

* [ ] `https://staging.movinginmobile.com/buyers`
* [ ] `https://staging.movinginmobile.com/sellers`
* [ ] `https://staging.movinginmobile.com/rowe-report`

For each route:

* [ ] Correct page loads.
* [ ] Browser refresh still works.
* [ ] No Hostinger 404 occurs.

Also verify:

* [ ] `https://staging.movinginmobile.com/robots.txt`
* [ ] `https://staging.movinginmobile.com/sitemap.xml`

---

# Staging Feature Validation

Depending on the release, validate:

* [ ] forms
* [ ] modal behavior
* [ ] testimonials
* [ ] floating contact widget
* [ ] page-specific content
* [ ] analytics
* [ ] canonical URLs
* [ ] structured data
* [ ] external links
* [ ] responsive behavior
* [ ] compliance identity

---

# IDX-Specific Staging Checklist

When IDX integration is involved:

* [ ] IDX custom subdomain resolves.
* [ ] SSL is valid.
* [ ] IDX wrapper loads.
* [ ] Advanced Search loads.
* [ ] Results load.
* [ ] Listing Detail loads.
* [ ] Map Search loads where enabled.
* [ ] Branding matches Moving in Mobile.
* [ ] Header/footer links return to the main website correctly.
* [ ] Mobile rendering is acceptable.
* [ ] Saved links work.
* [ ] Property inquiry workflows work.
* [ ] IDX analytics behavior is reviewed.
* [ ] IDX canonical behavior is reviewed.
* [ ] IDX sitemap behavior is reviewed.

Do not promote an IDX integration solely because one search page loads.

---

# Production Promotion Approval

Before production:

* [ ] Staging validation is complete.
* [ ] No release-blocking issue remains.
* [ ] Documentation is current for material architecture changes.
* [ ] Production impact is understood.
* [ ] Rollback path is known for high-impact releases.

---

# Merge to Production

Run:

```bash
git checkout main
git pull origin main
git merge staging
```

Review:

```bash
git status
git log -1 --oneline
```

Then push:

```bash
git push origin main
```

* [ ] Merge succeeds.
* [ ] Push succeeds.
* [ ] Hostinger production deployment starts.
* [ ] Hostinger production deployment completes successfully.

---

# Production Smoke Test

Open:

`https://movinginmobile.com`

Validate:

* [ ] Homepage loads.
* [ ] Header works.
* [ ] Footer works.
* [ ] Desktop navigation works.
* [ ] Mobile navigation works.
* [ ] Affected feature works.
* [ ] No obvious major visual regression.

---

# Production Direct-Route Test

Open directly:

* [ ] `https://movinginmobile.com/buyers`
* [ ] `https://movinginmobile.com/sellers`

For at least one nested route:

* [ ] Open directly.
* [ ] Refresh.
* [ ] Confirm no 404.

Also verify:

* [ ] `https://movinginmobile.com/robots.txt`
* [ ] `https://movinginmobile.com/sitemap.xml`

For routing-related releases, also validate representative routes such as:

* [ ] `/about`
* [ ] `/neighborhoods`
* [ ] `/rowe-report`
* [ ] `/resources`
* [ ] `/contact`

---

# Production SEO Smoke Test

For SEO-related releases:

* [ ] Canonical URL is correct.
* [ ] Page title is correct.
* [ ] Meta description is correct where implemented.
* [ ] Structured data is still valid.
* [ ] No staging URLs appear.
* [ ] Sitemap reflects the intended public routes.

---

# Production Lead Smoke Test

For lead-related releases:

* [ ] At least one synthetic test lead is submitted where appropriate.
* [ ] Formspree receives it.
* [ ] Expected downstream delivery occurs.
* [ ] Request/source metadata is correct.

Avoid unnecessary real prospect data.

---

# Production IDX Smoke Test

After IDX goes live:

* [ ] `homes.movinginmobile.com` resolves.
* [ ] SSL is valid.
* [ ] Search works.
* [ ] Results work.
* [ ] Listing details work.
* [ ] Wrapper branding works.
* [ ] Main-site links to IDX work.
* [ ] IDX links back to Moving in Mobile work.
* [ ] Property inquiry workflow works.
* [ ] Mobile search experience is acceptable.

---

# Post-Deployment Git State

After production validation:

```bash
git checkout staging
git status
```

* [ ] Return to `staging`.
* [ ] Working tree is clean.
* [ ] `staging` and `main` contain the intended release state.
* [ ] Any post-release documentation updates are committed.

---

# Rollback Trigger Conditions

Consider rollback when production has a material failure involving:

* core navigation
* homepage rendering
* lead capture
* required brokerage/compliance identity
* critical IDX search
* severe mobile breakage
* major JavaScript runtime failure
* broken production routing

Do not continue making uncontrolled production edits when a clean rollback is safer.

---

# Rollback Procedure

If rollback is required:

1. identify the last known-good production commit;
2. capture evidence of the current failure;
3. determine whether the issue is application code, hosting, or an external service;
4. restore the known-good production version;
5. reproduce the problem on staging;
6. fix it on `staging`;
7. run this checklist again;
8. redeploy;
9. document the incident and prevention steps.

---

# Documentation-Only Deployment Path

For documentation-only changes:

```bash
git checkout staging
git pull origin staging
git add docs/
git commit -m "Update engineering documentation"
git push origin staging
```

A Hostinger staging deployment is not required solely for Markdown documentation.

When the documentation accurately describes production, merge it to `main` through the normal Git promotion process.

---

# Current Deployment Baseline

As of August 12, 2026:

* React Router is live in production;
* `public/.htaccess` provides source-controlled SPA fallback;
* nested-route refresh works in staging and production;
* `robots.txt` and `sitemap.xml` remain directly accessible;
* GitHub Markdown is becoming the living Engineering Manual;
* IDX Broker is the next major deployment milestone.

## Related Documentation

See also:

* `05-state-and-navigation.md`
* `06-git-branching-workflow.md`
* `07-hostinger-deployment.md`
* `18-testing-qa.md`
* `20-decision-log.md`
* `24-release-checklist.md`
* `25-troubleshooting.md`
