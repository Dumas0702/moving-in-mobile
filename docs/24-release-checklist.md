# Release Checklist

## Purpose

This checklist defines the final release-readiness gate for the Moving in Mobile website.

Use this document after development and staging validation are substantially complete, but before promoting a release to production.

The purpose is to answer one question:

**Is this change safe, complete, documented, and ready for production?**

This checklist complements:

`23-deployment-checklist.md`

The deployment checklist explains how to deploy.

This release checklist determines whether the release should be deployed.

---

# Release Identification

* [ ] Release scope is clearly understood.
* [ ] Intended changes are documented.
* [ ] Unrelated changes are not bundled into the release without justification.
* [ ] The current `staging` commit is known.
* [ ] The production impact is understood.
* [ ] A rollback path exists for high-impact changes.

Record the current staging commit with:

```bash
git log -1 --oneline
```

---

# Source Control Readiness

Run:

```bash
git status
```

Confirm:

* [ ] Working tree is clean.
* [ ] All intended changes are committed.
* [ ] No unintended files are present.
* [ ] No secrets are staged or committed.
* [ ] No `.env` file containing credentials is included.
* [ ] No `node_modules/` content is tracked.
* [ ] No generated `dist/` content is being used as the source of a fix.
* [ ] No accidental ZIP archives or `.DS_Store` files are included.

---

# Build Gate

Run:

```bash
npm run build
```

Release is blocked if the build fails.

Confirm:

* [ ] Vite build succeeds.
* [ ] No syntax errors.
* [ ] No unresolved imports.
* [ ] No unexpected dependency errors.
* [ ] Build output is generated normally.

---

# Local Functional Gate

Before relying on staging, verify the affected behavior locally.

For sitewide changes:

* [ ] Homepage renders.
* [ ] Header renders.
* [ ] Footer renders.
* [ ] Main content renders.
* [ ] No obvious console errors.
* [ ] No critical asset failures.

For routing-related changes:

* [ ] `/` works.
* [ ] `/about` works.
* [ ] `/buyers` works.
* [ ] `/sellers` works.
* [ ] `/neighborhoods` works.
* [ ] `/rowe-report` works.
* [ ] `/resources` works.
* [ ] `/contact` works.
* [ ] Browser Back works.
* [ ] Browser Forward works.
* [ ] Direct route entry works.
* [ ] Route refresh works locally.

---

# Staging Deployment Gate

The intended release must exist on:

`https://staging.movinginmobile.com`

Confirm:

* [ ] `staging` contains the intended commit.
* [ ] `origin/staging` is current.
* [ ] `redesign-v2` has received the intended staging commit.
* [ ] Hostinger deployment completed successfully.
* [ ] The staging site reflects the expected release.

For application releases, the normal staging deployment command is:

```bash
git push origin staging:redesign-v2
```

Documentation-only changes do not require Hostinger deployment unless runtime behavior also changed.

---

# Staging Navigation Gate

Confirm on staging:

* [ ] Homepage loads.
* [ ] Logo links to `/`.
* [ ] Desktop navigation works.
* [ ] Mobile navigation works.
* [ ] Active navigation styling is correct.
* [ ] Rowe Report CTA works.
* [ ] Browser Back works.
* [ ] Browser Forward works.

---

# Staging Direct-Route Gate

Open directly:

`https://staging.movinginmobile.com/buyers`

* [ ] Buyers page loads.
* [ ] Refresh works.
* [ ] No Hostinger 404.

Open directly:

`https://staging.movinginmobile.com/sellers`

* [ ] Sellers page loads.
* [ ] Refresh works.

Open directly:

`https://staging.movinginmobile.com/rowe-report`

* [ ] Rowe Report loads.
* [ ] Refresh works.

A nested-route 404 blocks release.

---

# Hostinger SPA Fallback Gate

Confirm:

`public/.htaccess`

is present in source control.

Expected behavior:

* [ ] Hostinger `.builds` path remains protected.
* [ ] Existing files are served normally.
* [ ] Existing directories are served normally.
* [ ] React application routes fall back to `index.html`.

Verify:

`https://staging.movinginmobile.com/robots.txt`

* [ ] Loads as `robots.txt`.

Verify:

`https://staging.movinginmobile.com/sitemap.xml`

* [ ] Loads as XML sitemap.

If either returns the React application instead of the physical file, release is blocked.

---

# Responsive Design Gate

Test representative screen widths.

## Mobile

* [ ] Header fits.
* [ ] Menu opens.
* [ ] Menu links work.
* [ ] Content does not overflow horizontally.
* [ ] Forms are usable.
* [ ] Images render appropriately.
* [ ] Floating contact widget is usable.
* [ ] Footer is readable.

## Tablet

* [ ] Layout transitions correctly.
* [ ] Navigation behavior is appropriate.
* [ ] Cards and grids remain usable.

## Desktop

* [ ] Header spacing is correct.
* [ ] Content width is appropriate.
* [ ] Hero layout is correct.
* [ ] No unexpected whitespace or overlap.
* [ ] Footer is correct.

---

# Branding and Compliance Gate

Verify required identity remains intact.

* [ ] Tina Rowe branding is correct.
* [ ] The Rowe Report branding is correct.
* [ ] Keller Williams Mobile identity is present where intended.
* [ ] REALTOR® identity is present where required.
* [ ] Equal Housing identity is present where required.
* [ ] Contact information is current.
* [ ] No obsolete logo variant has accidentally replaced the current one.
* [ ] No placeholder content is visible.

Any change that removes required brokerage or compliance identity should block release until corrected.

---

# Lead Capture Gate

If the release touches forms, CTAs, modal logic, or lead flow:

* [ ] Contact form works.
* [ ] Buyer lead form works if affected.
* [ ] Seller lead form works if affected.
* [ ] Home valuation flow works if affected.
* [ ] Listing-alert flow works if affected.
* [ ] Modal lead capture works.
* [ ] Required fields behave correctly.
* [ ] Error state behaves correctly.
* [ ] Success state behaves correctly.
* [ ] Source/request metadata is correct.
* [ ] Synthetic test data is used.

Provider verification:

* [ ] Formspree receives the test submission.
* [ ] Expected downstream delivery occurs where relevant.

Do not promote a lead-generation release solely because the browser shows a success message.

---

# Analytics Gate

If the release affects routes, navigation, page identity, or tracking:

* [ ] GA4 loads.
* [ ] Route changes generate expected `page_view` events.
* [ ] Page path is correct.
* [ ] Page title is correct.
* [ ] Page location is correct.
* [ ] No obvious duplicate page views appear.

Use GA4 Realtime or DebugView where practical.

---

# SEO Gate

For releases affecting routing, metadata, content structure, or hosting:

* [ ] Canonical URL is correct.
* [ ] Canonical uses production hostname logic.
* [ ] Page title is appropriate.
* [ ] Meta description is correct where implemented.
* [ ] `robots.txt` remains valid.
* [ ] `sitemap.xml` remains valid.
* [ ] No staging URL is present in production-intended metadata.
* [ ] No localhost URL is present in production-intended metadata.
* [ ] Public routes are evaluated for sitemap inclusion.
* [ ] Utility/template routes remain excluded.

---

# Structured Data Gate

If structured data or business identity changed:

* [ ] JSON-LD renders.
* [ ] JSON is syntactically valid.
* [ ] Business facts match visible site content.
* [ ] URLs use intended production values.
* [ ] No fabricated ratings or unsupported claims are present.
* [ ] Rich Results validation is performed where appropriate.

---

# Search Console Gate

For material SEO releases:

* [ ] Representative route is inspectable.
* [ ] Canonical behavior is understood.
* [ ] Sitemap remains submitted or available.
* [ ] No obvious new robots issue is introduced.
* [ ] Alternate-hostname warnings are not mistaken for failures of the preferred production hostname.

Search Console reporting delay alone does not block a technically correct release.

---

# IDX Release Gate

Once IDX work begins, any release involving IDX must pass the following additional checks.

## IDX Domain

Preferred production hostname:

`homes.movinginmobile.com`

Confirm:

* [ ] DNS resolves.
* [ ] SSL is valid.
* [ ] IDX Broker recognizes the custom domain.
* [ ] Vendor default hostname is not being unnecessarily exposed in user-facing navigation.

## IDX Wrapper

Planned wrapper:

`public/idx-wrapper.html`

Confirm:

* [ ] Wrapper file loads directly.
* [ ] Required IDX markers exist in returned HTML.
* [ ] Header matches Moving in Mobile.
* [ ] Footer matches Moving in Mobile.
* [ ] Navigation works.
* [ ] Mobile layout works.
* [ ] Required brokerage/compliance identity appears.
* [ ] Wrapper is not accidentally included in the public sitemap.

## IDX Page Types

Validate individually:

* [ ] Advanced Search
* [ ] Search Results
* [ ] Listing Detail
* [ ] Map Search where enabled
* [ ] Saved Link pages where used
* [ ] Lead registration
* [ ] Schedule Showing where enabled

Do not assume one working IDX page proves the entire integration is ready.

## IDX Branding

* [ ] IDX pages feel like part of Moving in Mobile.
* [ ] Vendor-default styling is not distracting.
* [ ] Header and footer remain consistent.
* [ ] Fonts and general visual hierarchy are acceptable.
* [ ] Mobile experience is acceptable.

## IDX Lead Capture

* [ ] Property inquiry works.
* [ ] Registration works where enabled.
* [ ] Saved search works where enabled.
* [ ] Notification destination is correct.
* [ ] Tina can identify the lead source.

## IDX Analytics

* [ ] GA4 strategy is understood.
* [ ] Navigation between main site and IDX does not create obviously broken tracking.
* [ ] Relevant IDX events are measurable where possible.

## IDX SEO

* [ ] Custom hostname is used.
* [ ] Canonical behavior is reviewed.
* [ ] IDX sitemap behavior is reviewed.
* [ ] Listing-detail indexability is understood.
* [ ] Saved-search indexability is understood.
* [ ] Wrapper indexing behavior is understood.

---

# Documentation Gate

Material changes are not considered complete until the documentation reflects them.

Check whether the release requires updates to:

* [ ] `docs/README.md`
* [ ] `02-system-architecture.md`
* [ ] `05-state-and-navigation.md`
* [ ] `07-hostinger-deployment.md`
* [ ] `09-seo-architecture.md`
* [ ] `18-testing-qa.md`
* [ ] `19-known-technical-debt.md`
* [ ] `20-decision-log.md`
* [ ] `21-future-roadmap.md`
* [ ] `23-deployment-checklist.md`
* [ ] `24-release-checklist.md`
* [ ] `25-troubleshooting.md`

Not every release requires all files to change.

Update only those materially affected.

---

# Security Gate

* [ ] No credentials in source.
* [ ] No private IDX API keys in client-side code.
* [ ] No personal client/prospect data used unnecessarily in test artifacts.
* [ ] `.env` is not unintentionally tracked.
* [ ] Source archives do not expose secrets.
* [ ] New third-party integrations have understood credential handling.

A known exposed secret blocks release until the credential is secured and rotated where necessary.

---

# Performance Sanity Gate

For releases involving large assets, widgets, scripts, or IDX:

* [ ] Page still loads at an acceptable speed.
* [ ] No obviously oversized new asset is introduced without need.
* [ ] No uncontrolled third-party script duplication occurs.
* [ ] No severe layout shift is introduced.
* [ ] Mobile usability remains acceptable.

Formal performance optimization may be a later task, but obvious regressions should not be knowingly promoted.

---

# Accessibility Sanity Gate

At minimum:

* [ ] Interactive elements are usable.
* [ ] Links behave as links.
* [ ] Buttons behave as buttons.
* [ ] Images have appropriate alt text where meaningful.
* [ ] Mobile navigation is operable.
* [ ] Focus behavior is not obviously broken.
* [ ] Text remains readable.

Major accessibility regressions should block release.

---

# Browser Compatibility Gate

At minimum, test the release in the primary development browser and one additional modern browser when the change is high-impact.

For major visual or routing changes, consider:

* Chrome
* Safari
* Edge
* mobile Safari or mobile Chrome

The goal is not exhaustive browser certification, but avoidance of obvious platform-specific failures.

---

# External Dependency Gate

If the release depends on an external provider, confirm that provider-side configuration is complete.

Possible providers include:

* Hostinger
* Formspree
* Google Analytics
* Google Search Console
* IDX Broker
* DNS provider

Do not release application code that assumes a provider configuration has been completed when it has not.

---

# Release Risk Assessment

Before production promotion, classify the release informally.

## Low Risk

Examples:

* documentation-only
* minor text correction
* isolated visual adjustment

## Medium Risk

Examples:

* new content section
* form change
* navigation adjustment
* SEO metadata change

## High Risk

Examples:

* routing architecture
* hosting configuration
* IDX integration
* lead-provider changes
* domain/DNS changes
* analytics architecture
* major component refactor

High-risk releases require especially careful staging validation and a clear rollback path.

---

# Production Promotion Approval

Before merging to `main`, all applicable release gates should be complete.

Confirm:

* [ ] Build passes.
* [ ] Staging passes.
* [ ] Direct-route tests pass.
* [ ] Critical forms pass if affected.
* [ ] SEO checks pass if affected.
* [ ] Analytics checks pass if affected.
* [ ] Documentation is current.
* [ ] No known release-blocking issue remains.
* [ ] Rollback strategy is understood.

Only then proceed with:

```bash
git checkout main
git pull origin main
git merge staging
git push origin main
```

---

# Production Verification Gate

After Hostinger production deployment:

* [ ] Production homepage loads.
* [ ] A representative nested route loads directly.
* [ ] Nested-route refresh works.
* [ ] Header navigation works.
* [ ] Mobile navigation works.
* [ ] `robots.txt` loads.
* [ ] `sitemap.xml` loads.
* [ ] Affected feature works.
* [ ] No critical regression is visible.

For IDX releases:

* [ ] IDX production hostname resolves.
* [ ] Search works.
* [ ] Results work.
* [ ] Listing details work.
* [ ] Property lead capture works.

---

# Post-Release Gate

After successful production verification:

* [ ] Return local development to `staging`.
* [ ] Confirm working tree is clean.
* [ ] Confirm documentation reflects production.
* [ ] Record any follow-up work in technical debt or roadmap.
* [ ] Record any significant architectural decision in the decision log.
* [ ] Record any incident or unusual deployment behavior in troubleshooting documentation.

---

# Release Blockers

The following normally block production promotion:

* build failure
* known direct-route 404
* broken core navigation
* major mobile regression
* broken critical lead capture
* missing required brokerage/compliance identity
* exposed credential
* severe runtime error
* broken critical static SEO files
* broken production hostname behavior caused by the release
* broken core IDX functionality after IDX becomes production-critical

---

# Current Release Baseline

As of August 12, 2026:

* React Router is live in production;
* nested browser routes are production-supported;
* `public/.htaccess` provides source-controlled SPA fallback;
* staging and production routing tests have passed;
* the living Engineering Manual is being migrated into GitHub Markdown;
* Elm Street / IDX Broker integration is the next high-risk release area.

## Related Documentation

See also:

* `07-hostinger-deployment.md`
* `18-testing-qa.md`
* `20-decision-log.md`
* `21-future-roadmap.md`
* `23-deployment-checklist.md`
* `25-troubleshooting.md`
