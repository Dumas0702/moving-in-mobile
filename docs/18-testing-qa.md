# Testing and QA

## Purpose

This document defines the testing and quality-assurance practices for the Moving in Mobile website.

The goal is to ensure that application changes are validated consistently before they are promoted from development to staging and then to production.

Testing should focus on user-facing behavior, deployment correctness, integrations, SEO, analytics, lead capture, and regression prevention.

## Testing Philosophy

The project follows a staging-first validation model.

Changes should normally move through:

```text
Local development
      |
      v
Local build and browser testing
      |
      v
staging branch
      |
      v
Hostinger staging
      |
      v
Staging validation
      |
      v
main branch
      |
      v
Production
      |
      v
Production verification
```

Production should not be used as the primary testing environment.

## Local Validation

Before committing a material change, run:

```bash
npm run build
```

The build must complete successfully.

A successful build verifies that:

* JSX parses correctly;
* dependencies resolve;
* Vite can produce the production bundle;
* source syntax is valid enough to compile.

A successful build does not prove that the website behaves correctly in the browser.

Browser testing is still required.

## Local Development Server

For interactive testing, run:

```bash
npm run dev
```

Vite typically serves the site at:

`http://localhost:5173/`

Use the local environment to verify:

* page rendering;
* navigation;
* forms;
* modals;
* responsive behavior;
* console errors;
* browser history;
* route behavior.

## React Router QA

As of August 12, 2026, the site uses React Router with real browser URLs.

Primary routes include:

* `/`
* `/about`
* `/buyers`
* `/sellers`
* `/neighborhoods`
* `/rowe-report`
* `/resources`
* `/contact`

Routing changes require dedicated testing.

## Route Navigation Test

Navigate through the site using the visible navigation.

Confirm:

1. the expected page renders;
2. the browser URL changes correctly;
3. active navigation styling is correct;
4. the page scroll behavior remains appropriate;
5. no console errors appear.

## Direct Route Test

Type a route directly into the browser address bar.

Example:

`http://localhost:5173/buyers`

The correct page should render.

Repeat this in staging and production using the appropriate hostname.

## Refresh Test

While viewing a nested route such as:

`/buyers`

refresh the browser.

The same page should continue to load.

A 404 after refresh usually indicates a hosting fallback problem rather than a React component problem.

## Browser History Test

Navigate through multiple pages.

Example:

```text
/
→ /buyers
→ /sellers
→ /resources
```

Then use browser Back and Forward controls.

The site should follow the navigation history correctly.

## Hostinger SPA Fallback Test

Hostinger requires SPA fallback behavior for React Router.

The source-controlled configuration lives at:

`public/.htaccess`

After changes to routing or `.htaccess`, test:

```text
https://staging.movinginmobile.com/buyers
https://staging.movinginmobile.com/sellers
https://staging.movinginmobile.com/rowe-report
```

For each route:

1. open the URL directly;
2. confirm the page loads;
3. refresh;
4. confirm no 404 occurs.

Also confirm that physical files still load normally.

## Static SEO Resource Test

Verify:

```text
https://staging.movinginmobile.com/robots.txt
https://staging.movinginmobile.com/sitemap.xml
```

and, after production promotion:

```text
https://movinginmobile.com/robots.txt
https://movinginmobile.com/sitemap.xml
```

These should not be intercepted incorrectly by the SPA fallback.

## Header Navigation QA

Test the primary header on desktop.

Verify:

* logo links to `/`;
* Home works;
* About works;
* Buyers works;
* Sellers works;
* Neighborhoods works;
* Resources works;
* Contact works;
* Rowe Report CTA works;
* active state styling is correct.

## Mobile Navigation QA

Test the mobile menu at representative small-screen widths.

Verify:

* menu button opens the navigation;
* menu button closes or navigation closes after selection;
* all links navigate correctly;
* active page styling works;
* Rowe Report CTA works;
* navigation does not overflow horizontally;
* content remains usable after navigation.

## Responsive Testing

At minimum, test representative viewport sizes for:

* mobile phone;
* tablet;
* standard laptop;
* wide desktop.

Pay attention to:

* header;
* hero;
* forms;
* cards;
* images;
* testimonials;
* floating contact widget;
* footer;
* navigation;
* IDX integration when implemented.

## Form QA

Lead forms use Formspree.

For each form, verify:

* required fields;
* valid submission;
* invalid input handling;
* submission loading state;
* success state;
* error state;
* hidden metadata fields;
* request type;
* source context.

Use synthetic test data whenever possible.

Do not use real prospect information merely for technical validation.

## Lead Delivery QA

A successful browser response from Formspree does not guarantee final lead delivery.

When testing a new or modified lead flow, verify:

1. browser submission succeeds;
2. Formspree receives the submission;
3. expected notification or downstream delivery occurs;
4. source and request-type fields are correct.

## Modal QA

The site contains modal lead-generation behavior.

Test:

* opening;
* closing;
* backdrop behavior;
* form rendering;
* mobile layout;
* submission;
* success state;
* repeated use;
* keyboard behavior where applicable.

Changes to routing should not accidentally reopen or preserve stale modal state unless intentionally designed.

## Analytics QA

Google Analytics 4 uses route-level page views.

After navigation changes, verify:

* route changes create `page_view` events;
* page paths match browser paths;
* page titles are correct;
* production page locations use the production hostname;
* duplicate page views are not introduced.

Use GA4 Realtime or DebugView where appropriate.

## Canonical URL QA

Each real route should expose the appropriate canonical URL.

Examples:

```text
/buyers
→ https://movinginmobile.com/buyers

/sellers
→ https://movinginmobile.com/sellers
```

Verify canonicals after changes to:

* routing;
* metadata;
* hostname logic;
* SEO architecture.

Do not allow every route to revert to the homepage canonical.

## Structured Data QA

Structured data is implemented through:

`src/components/StructuredData.jsx`

After changes that affect business information or structured data:

* inspect the rendered JSON-LD;
* verify values match visible site content;
* validate using an appropriate structured-data or Rich Results validator.

Do not use fabricated values simply to make a validator pass.

## Search Console QA

After major SEO or routing releases, inspect representative production URLs in Google Search Console.

Examples:

* homepage;
* Buyers;
* Sellers;
* Resources;
* future neighborhood pages.

Search Console changes may take time to appear.

Do not treat temporary reporting delay as a deployment failure.

## Sitemap QA

After adding or removing public routes:

1. update `public/sitemap.xml` when appropriate;
2. confirm the sitemap loads;
3. confirm URLs use the production hostname;
4. confirm no staging URLs are included;
5. confirm implementation-only pages are excluded.

The planned IDX wrapper page should not appear in the public sitemap.

## robots.txt QA

After changes to `robots.txt`:

* open it directly;
* verify intended directives;
* verify sitemap reference if present;
* confirm no production pages are accidentally blocked.

Do not change robots directives solely to eliminate Search Console warnings without understanding the affected URL.

## Browser Console QA

During local and staging testing, inspect the browser Console.

Investigate:

* runtime exceptions;
* React warnings;
* failed network requests;
* asset failures;
* analytics errors;
* integration errors.

Do not ignore repeatable console errors simply because the page appears visually correct.

## Network QA

Use browser Network tools when troubleshooting:

* forms;
* analytics;
* images;
* JavaScript;
* CSS;
* IDX scripts;
* API calls.

Check:

* HTTP status;
* request URL;
* response;
* redirects;
* blocked requests;
* duplicate requests.

## Asset QA

Asset filenames are case-sensitive in production environments.

Verify:

* images load;
* no 404s appear;
* exact filename case matches source;
* old or duplicate assets are not accidentally referenced;
* large assets do not create avoidable performance problems.

## Staging Indicators

Staging-specific indicators are implemented through:

`src/components/StagingIndicators.jsx`

Verify that staging clearly identifies itself when expected.

Production should not unintentionally display staging-only indicators.

## Production Smoke Test

After a successful production deployment, perform a focused smoke test.

At minimum:

1. homepage loads;
2. Buyers loads directly;
3. Sellers loads directly;
4. nested route refresh works;
5. desktop navigation works;
6. mobile navigation works;
7. one lead form can be verified if the release affects forms;
8. `robots.txt` loads;
9. `sitemap.xml` loads;
10. no obvious visual regression appears.

## Regression Testing

When modifying an existing area, test adjacent behavior.

Examples:

### Routing change

Also test:

* analytics;
* canonicals;
* header;
* mobile navigation;
* direct refresh;
* sitemap.

### Form change

Also test:

* success state;
* error state;
* source metadata;
* modal behavior;
* mobile layout.

### Header change

Also test:

* active states;
* desktop widths;
* mobile widths;
* logo;
* CTA;
* browser history.

### SEO change

Also test:

* route rendering;
* canonical;
* sitemap;
* robots;
* structured data;
* Search Console where appropriate.

## IDX QA

Elm Street / IDX Broker integration is the next major feature area.

IDX testing should include:

* custom subdomain;
* SSL;
* wrapper rendering;
* Advanced Search;
* search results;
* listing detail;
* map search;
* saved links;
* mobile rendering;
* lead registration;
* navigation back to Moving in Mobile;
* branding consistency;
* analytics;
* canonical URLs;
* sitemap behavior.

## IDX Wrapper QA

The planned wrapper is expected at:

`public/idx-wrapper.html`

When implemented, verify:

* file loads directly;
* required IDX wrapper markers exist in server-returned HTML;
* header and footer render correctly;
* links use production routes;
* mobile layout works;
* no unnecessary homepage-only scripts are included;
* wrapper is not accidentally added to the main sitemap.

## IDX Custom Domain QA

The preferred IDX hostname is:

`homes.movinginmobile.com`

Before considering it complete, verify:

1. DNS resolves;
2. SSL is valid;
3. IDX Broker recognizes the custom domain;
4. search pages use the custom hostname;
5. listing-detail pages use the custom hostname;
6. wrapper styling is applied;
7. links back to the main site work.

## SEO QA for IDX

After IDX is implemented, verify:

* IDX canonical behavior;
* IDX sitemap;
* whether Search Console should receive the IDX sitemap;
* listing-detail indexability;
* saved-search indexability;
* custom-domain hostname consistency;
* wrapper indexing behavior.

Do not assume IDX defaults are automatically optimal for the Moving in Mobile SEO strategy.

## Test Data

Use synthetic data where possible.

Avoid using:

* real prospect contact information;
* private client information;
* unnecessary personal data.

Test forms with clearly identifiable synthetic values where possible.

## Release Blocking Issues

The following should generally block promotion to production:

* build failure;
* broken navigation;
* direct-route 404;
* major mobile regression;
* missing required branding or compliance identity;
* broken lead capture;
* material JavaScript runtime errors;
* critical asset failures;
* broken sitemap or robots behavior caused by the release;
* broken IDX search once IDX becomes production-critical.

Minor cosmetic issues should be assessed based on impact.

## Emergency Fixes

If production has a material regression:

1. determine the affected scope;
2. identify the deployed commit;
3. capture evidence;
4. roll back if necessary;
5. reproduce on staging;
6. implement the smallest safe fix;
7. retest;
8. redeploy;
9. document the incident.

Avoid debugging complex issues by making uncontrolled edits directly in production.

## Documentation QA

Documentation is part of feature completion.

When a material architecture change occurs, verify that relevant files in:

`docs/`

are updated.

Examples include:

* architecture;
* routing;
* deployment;
* SEO;
* lead systems;
* IDX;
* decision log;
* troubleshooting;
* release checklists.

## Current QA Baseline

As of August 12, 2026:

* React Router is live;
* direct route loading is validated;
* route refresh is validated;
* Back and Forward are validated;
* Hostinger SPA fallback is validated;
* `.htaccess` is source-controlled;
* staging and production have both passed routing smoke tests;
* `robots.txt` remains accessible;
* `sitemap.xml` remains accessible;
* IDX Broker integration is the next major QA expansion.

## Related Documentation

See also:

* `02-system-architecture.md`
* `05-state-and-navigation.md`
* `07-hostinger-deployment.md`
* `09-seo-architecture.md`
* `20-decision-log.md`
* `23-deployment-checklist.md`
* `24-release-checklist.md`
* `25-troubleshooting.md`
