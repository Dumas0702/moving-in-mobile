# Robots and Sitemap

## Purpose

This document describes the role, implementation, maintenance, and validation of:

- `robots.txt`
- `sitemap.xml`

for the Moving in Mobile website.

It also explains how these files interact with:

- React Router
- Hostinger
- SPA fallback routing
- Google Search Console
- canonical URLs
- future neighborhood routes
- future IDX Broker integration

The goal is to ensure search engines can correctly discover the pages that should be public while avoiding accidental indexing of implementation-only resources.

---

# Current Files

The current SEO control files are stored under:

`public/`

Specifically:

`public/robots.txt`

and:

`public/sitemap.xml`

Because these files are under `public/`, Vite copies them directly into the production build.

They become available at:

`https://movinginmobile.com/robots.txt`

and:

`https://movinginmobile.com/sitemap.xml`

---

# Why These Files Live in `public/`

Vite serves files from:

`public/`

without bundling them through the React application.

This is appropriate for files such as:

- `robots.txt`
- `sitemap.xml`
- `.htaccess`
- static images
- future IDX wrapper HTML

These resources should remain accessible as direct physical files.

---

# `robots.txt`

The purpose of `robots.txt` is to provide crawler directives.

It may be used to tell search-engine crawlers:

- which paths may be crawled
- which paths should not be crawled
- where the XML sitemap is located

It is not a security mechanism.

A path blocked by `robots.txt` is not private.

---

# Production robots.txt URL

The production robots file is:

`https://movinginmobile.com/robots.txt`

This URL should always be tested directly after hosting, routing, or rewrite changes.

---

# robots.txt and React Router

The application uses React Router with `BrowserRouter`.

Nested React routes rely on Hostinger falling back to:

`index.html`

However, the `.htaccess` configuration specifically preserves real files before applying the SPA fallback.

This means:

`/robots.txt`

should be served as the actual text file.

It should not render the React application.

---

# SPA Fallback Interaction

The current `public/.htaccess` includes:

    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

This tells Hostinger to serve existing files and directories normally.

Only non-file application paths should fall through to:

`index.html`

This behavior is critical for:

- `robots.txt`
- `sitemap.xml`
- images
- JavaScript
- CSS
- other static assets

---

# robots.txt Validation

After any relevant deployment, verify:

`https://movinginmobile.com/robots.txt`

The response should be plain text.

It should not:

- return a React page
- redirect unexpectedly
- return 404
- reference staging
- reference localhost

---

# robots.txt Maintenance

Review `robots.txt` when:

- a new public route is added
- a utility route is introduced
- staging strategy changes
- IDX is integrated
- Search Console reports a robots issue
- a provider-generated path should not be crawled

Do not change robots rules simply to eliminate a Search Console warning without first identifying the exact affected URL.

---

# robots.txt Is Not an Index Removal Tool

Blocking a URL in `robots.txt` does not necessarily remove it from Google's index.

If Google already knows about the URL, it may still appear in search results based on external signals.

For unwanted public URLs, more appropriate tools may include:

- redirects
- canonical URLs
- `noindex`
- removing the page
- Search Console removal tools where appropriate

Use the correct mechanism for the actual problem.

---

# Alternate Hostname Warnings

Search Console previously reported robots-related warnings involving alternate URL forms.

Examples may include:

- HTTP
- `www`
- alternate hostnames

Before changing `robots.txt`, verify whether the reported URL is actually:

`https://movinginmobile.com`

or a non-preferred variant.

Do not modify the primary production robots file to solve a low-value alternate-hostname issue unless the change is clearly justified.

---

# Staging robots Strategy

Staging is:

`https://staging.movinginmobile.com`

It exists for QA, not search visibility.

Staging indexing protection should be reviewed explicitly as the application grows.

Possible mechanisms include:

- robots directives
- `noindex`
- authentication
- provider controls

The correct strategy should be deliberate and should not risk blocking production.

---

# `sitemap.xml`

The purpose of the XML sitemap is to provide search engines with a structured list of important public URLs.

The sitemap is stored at:

`public/sitemap.xml`

Production URL:

`https://movinginmobile.com/sitemap.xml`

---

# Sitemap Role

The sitemap helps search engines discover:

- primary public routes
- future neighborhood pages
- future content pages

A sitemap does not guarantee indexing.

Google decides whether an individual page should be indexed.

---

# Current React Router Routes

Primary current routes include:

- `/`
- `/about`
- `/buyers`
- `/sellers`
- `/neighborhoods`
- `/rowe-report`
- `/resources`
- `/contact`

These are now real browser URLs.

The sitemap should reflect the public routes that are intended for indexing.

---

# Historical One-Page Architecture

Before React Router, several internal application sections did not have real independent URLs.

That historical architecture made a very small sitemap reasonable.

That is no longer the case.

The route migration means the sitemap should now evolve to include the permanent public routes.

---

# Recommended Current Sitemap Entries

The main sitemap should eventually include:

    https://movinginmobile.com/
    https://movinginmobile.com/about
    https://movinginmobile.com/buyers
    https://movinginmobile.com/sellers
    https://movinginmobile.com/neighborhoods
    https://movinginmobile.com/rowe-report
    https://movinginmobile.com/resources
    https://movinginmobile.com/contact

The exact current file should be inspected before editing.

Do not assume every route has already been added.

---

# Sitemap Expansion Is Still Pending

As of the current baseline, the sitemap has not yet been fully updated to reflect all React Router routes.

This remains active SEO work.

Do not document the sitemap as complete until the repository file has actually been updated and validated.

---

# Sitemap Inclusion Rules

A route should generally be included if it is:

- public
- stable
- indexable
- useful to search engines
- intended to appear in search results

Examples:

- homepage
- About
- Buyers
- Sellers
- Neighborhoods
- Resources

---

# Sitemap Exclusion Rules

Do not include:

- staging URLs
- localhost URLs
- temporary test pages
- internal templates
- implementation-only files
- redirect-only URLs
- duplicate canonical URLs
- future IDX wrapper template

---

# IDX Wrapper Exclusion

The planned wrapper is:

`https://movinginmobile.com/idx-wrapper.html`

This file is an implementation template for IDX Broker.

It should not be included in the primary sitemap.

Its presence in the public filesystem does not make it a normal SEO landing page.

---

# Unknown Routes

The application does not yet have a dedicated 404 route.

Unknown paths may currently fall back to the homepage through compatibility logic.

Until dedicated 404 behavior is implemented, do not intentionally add unknown or placeholder routes to the sitemap.

---

# Future Neighborhood Pages

Future neighborhood routes may include:

    /neighborhoods/fairhope
    /neighborhoods/daphne
    /neighborhoods/spanish-fort
    /neighborhoods/foley
    /neighborhoods/gulf-shores
    /neighborhoods/orange-beach
    /neighborhoods/silverhill
    /neighborhoods/robertsdale

Once these pages are production-ready and contain meaningful original content, they should be evaluated for sitemap inclusion.

---

# Neighborhood Sitemap Rule

Do not add neighborhood URLs simply because the route exists.

Before inclusion, verify:

- page is complete
- content is substantial
- canonical is correct
- title is appropriate
- metadata is ready enough
- direct route works
- page is intended for search visibility

---

# Sitemap URL Format

Use absolute production URLs.

Good:

`https://movinginmobile.com/buyers`

Avoid:

`/buyers`

Avoid:

`http://movinginmobile.com/buyers`

Avoid:

`https://www.movinginmobile.com/buyers`

Avoid:

`https://staging.movinginmobile.com/buyers`

---

# Canonical and Sitemap Alignment

A sitemap URL should generally match the page's canonical URL.

Example:

    Sitemap:
    https://movinginmobile.com/buyers

    Canonical:
    https://movinginmobile.com/buyers

Misalignment can create unnecessary ambiguity.

---

# Internal Links and Sitemap Alignment

The site should also link internally using the same preferred URL structure.

Preferred:

`/buyers`

which resolves to:

`https://movinginmobile.com/buyers`

Avoid intentionally mixing:

- `www`
- non-`www`
- HTTP
- HTTPS
- trailing-slash variants

without reason.

---

# Trailing Slash Consistency

Current primary routes are generally represented without trailing slashes, except the root homepage.

Examples:

`/buyers`

not:

`/buyers/`

If trailing-slash behavior changes, review:

- route mapping
- canonical logic
- sitemap
- redirects
- Search Console

Consistency matters more than which convention is chosen.

---

# Sitemap XML Structure

A standard sitemap generally contains entries similar to:

    <url>
      <loc>https://movinginmobile.com/buyers</loc>
    </url>

Optional fields may include:

- `lastmod`

Fields such as:

- `changefreq`
- `priority`

are optional and should not be added merely because examples online include them.

Use only metadata that can be maintained accurately.

---

# `lastmod`

If `lastmod` is used, it should reflect a meaningful content modification date.

Do not automatically update every URL's date on every deployment if the underlying page content did not materially change.

Incorrect freshness signals reduce the value of the field.

---

# Manually Maintained Sitemap

The sitemap is currently maintained manually.

This is acceptable at the current route count.

However, as the site grows, manual maintenance creates drift risk.

Known future growth includes:

- neighborhood routes
- editorial content
- Rowe Report content
- possible market pages

A generated sitemap may eventually become appropriate.

---

# Future Generated Sitemap

A future sitemap generator could derive URLs from a central route/content configuration.

Possible future source:

`src/config/routes.js`

or similar.

Benefits include:

- fewer omissions
- easier route maintenance
- lower drift risk

Do not introduce sitemap-generation complexity before route architecture is stable enough to justify it.

---

# Build Validation

After changing:

`public/sitemap.xml`

run:

    npm run build

Then verify:

`dist/sitemap.xml`

exists.

Because the file is copied from `public/`, the build output should contain the updated version.

---

# Local Sitemap Validation

With the Vite dev server running, verify the sitemap locally if supported by the current environment.

The important final validation remains staging and production because Hostinger rewrite behavior matters.

---

# Staging Sitemap Validation

After deployment, open:

`https://staging.movinginmobile.com/sitemap.xml`

Verify:

- file loads
- XML is readable
- SPA fallback does not intercept it
- content matches the expected build

If staging uses production sitemap URLs, understand that those are URL declarations inside the file rather than proof that the staging site itself should be indexed.

---

# Production Sitemap Validation

After promotion, open:

`https://movinginmobile.com/sitemap.xml`

Verify:

- HTTP response is successful
- XML is valid
- all URLs use HTTPS
- all URLs use non-`www`
- no staging URLs appear
- no localhost URLs appear
- no wrapper URLs appear
- expected new routes appear

---

# Search Console Sitemap Submission

The main sitemap has already been submitted to Google Search Console.

When the existing sitemap URL remains unchanged, normal content changes do not necessarily require a new sitemap submission.

Google can refetch the same sitemap.

After substantial sitemap expansion, check Search Console to verify Google processes the updated contents.

---

# Search Console Sitemap Status

Review:

- fetch status
- discovered URLs
- errors
- processing state

Do not expect discovered URL counts to update immediately after deployment.

Search Console reporting may lag.

---

# Sitemap Parsing Errors

If Search Console reports a sitemap error:

1. open the sitemap directly
2. validate XML syntax
3. check malformed URLs
4. check unsupported characters
5. check response type
6. check redirects
7. verify Hostinger is serving the XML file

Do not edit robots rules to fix a malformed sitemap.

---

# Sitemap Response Must Not Be the React App

A common SPA hosting error is accidentally rewriting:

`/sitemap.xml`

to:

`index.html`

Symptoms include:

- browser displays the site instead of XML
- Search Console says sitemap cannot be read
- response content type is HTML

If this happens, inspect:

`public/.htaccess`

and verify real-file exemptions.

---

# robots.txt Sitemap Reference

Where appropriate, `robots.txt` should reference the production sitemap.

Conceptually:

`Sitemap: https://movinginmobile.com/sitemap.xml`

The exact current file should be inspected before changing it.

Do not duplicate conflicting sitemap references.

---

# IDX Broker Sitemap

IDX Broker is expected to provide its own sitemap capabilities.

This should remain separate from the React site's main sitemap unless a deliberate integration strategy is chosen.

The main site sitemap should represent the editorial/marketing site.

The IDX sitemap should represent provider-generated IDX URLs.

---

# Preferred IDX Hostname

The planned IDX hostname is:

`homes.movinginmobile.com`

Do not finalize IDX sitemap submission while relying on the vendor default hostname if the custom domain is still being configured.

---

# IDX Sitemap Questions

Once IDX is operational, determine:

1. exact IDX sitemap URL
2. whether it uses `homes.movinginmobile.com`
3. which page types it includes
4. whether listing details are included
5. whether saved searches are included
6. whether search-result pages are included
7. whether vendor URLs appear
8. whether canonical URLs match sitemap URLs

Document the verified behavior.

---

# Separate Search Console Handling for IDX

The IDX sitemap may need to be submitted separately.

Whether a separate Search Console property is necessary depends on the active property configuration.

Do not assume either way.

Verify the actual Search Console property type and hostname coverage after the IDX custom domain is live.

---

# IDX Duplicate Content

MLS listing content may exist on many real-estate websites.

This does not mean IDX pages should automatically be blocked.

However, sitemap inclusion should be understood in the context of:

- syndicated content
- canonical behavior
- listing expiration
- saved-search value
- original neighborhood content

The React site should continue to provide unique local editorial value.

---

# Expired Listings

IDX Broker should manage listing lifecycle behavior for provider-generated property pages.

Do not manually attempt to maintain MLS listing URLs in the React site's sitemap.

The IDX provider should remain responsible for MLS inventory lifecycle.

---

# Market Report Pages

If future market-report pages become permanent public content, evaluate whether they belong in the main sitemap or IDX sitemap based on which system owns the route.

Avoid duplicate representations of the same content across both systems.

---

# Rowe Report Expansion

If individual Rowe Report episodes or articles gain dedicated routes in the future, each route should be evaluated for sitemap inclusion.

Examples may include:

    /rowe-report/moving-to-mobile
    /rowe-report/fairhope-market-update

Only add them once they are real, public, useful pages.

---

# Robots and Noindex Are Different

`robots.txt` controls crawling.

`noindex` controls indexing.

They are not interchangeable.

Blocking crawling can sometimes prevent a crawler from seeing a `noindex` directive.

Choose the correct mechanism based on the desired behavior.

---

# Utility Page Indexing

Implementation-only pages may be better protected using:

- `noindex`
- no internal links
- sitemap exclusion

rather than robots blocking alone.

The IDX wrapper is an example where this distinction may matter.

Test against IDX Broker requirements before applying indexing directives.

---

# Future 404 Handling

When a dedicated 404 page is implemented:

- unknown URLs should not be added to the sitemap
- correct HTTP behavior should be reviewed
- 404 page itself should not be a search landing page

Update this document when the implementation changes.

---

# Change Control

Any material change to the following should trigger review of this document:

- route structure
- `robots.txt`
- sitemap
- Hostinger rewrite behavior
- canonical policy
- neighborhood routes
- IDX custom domain
- IDX sitemap
- indexing strategy

Major decisions should also be recorded in:

`docs/20-decision-log.md`

---

# Release Checklist

For robots or sitemap changes, verify:

1. build succeeds
2. `robots.txt` loads locally/staging
3. `sitemap.xml` loads locally/staging
4. direct React routes still work
5. production hostname is correct
6. no staging URLs appear
7. no localhost URLs appear
8. sitemap XML is valid
9. wrapper or utility files are excluded
10. Search Console can fetch the sitemap after production deployment

---

# Troubleshooting robots.txt

If `robots.txt` fails:

1. verify `public/robots.txt` exists
2. run build
3. verify `dist/robots.txt`
4. inspect `.htaccess`
5. inspect deployed file
6. compare staging and production
7. check redirects

---

# Troubleshooting sitemap.xml

If `sitemap.xml` fails:

1. verify `public/sitemap.xml`
2. validate XML
3. run build
4. verify `dist/sitemap.xml`
5. inspect `.htaccess`
6. inspect Hostinger deployment
7. open production URL directly
8. check Search Console only after direct behavior is correct

---

# Current Robots and Sitemap Baseline

As of August 12, 2026:

- `public/robots.txt` is active;
- `public/sitemap.xml` is active;
- both remain directly accessible through the Hostinger SPA fallback configuration;
- React Router now provides real browser routes;
- the sitemap still needs to be expanded to fully reflect the current route structure;
- alternate-hostname Search Console warnings should not trigger unverified robots changes;
- the planned `idx-wrapper.html` should not be included in the primary sitemap;
- IDX Broker sitemap behavior should be evaluated only after `homes.movinginmobile.com` is operational.

## Related Documentation

See also:

- `05-state-and-navigation.md`
- `07-hostinger-deployment.md`
- `09-seo-architecture.md`
- `11-search-console.md`
- `13-structured-data.md`
- `18-testing-qa.md`
- `20-decision-log.md`
- `21-future-roadmap.md`
- `23-deployment-checklist.md`
- `24-release-checklist.md`
- `25-troubleshooting.md`