# Google Search Console

## Purpose

This document describes how Google Search Console is used for the Moving in Mobile website.

It covers:

- property verification
- sitemap submission
- URL inspection
- indexing interpretation
- hostname variants
- robots-related warnings
- redirects
- canonical behavior
- React Router implications
- future IDX Search Console strategy
- troubleshooting expectations

The goal is to help developers and site owners distinguish between meaningful search-indexing problems and harmless or low-priority Search Console warnings.

---

# Search Console Role

Google Search Console helps monitor how Google interacts with the public website.

It is useful for understanding:

- whether pages are discovered
- whether pages are indexed
- which URLs Google selects as canonical
- which pages receive impressions
- which search queries produce visibility
- whether robots directives interfere with crawling
- whether redirects are working
- whether structured-data issues exist
- whether sitemap URLs are being processed

Search Console should be treated as a diagnostic and reporting system.

It should not be treated as a real-time deployment monitor.

---

# Production Site

The preferred production website is:

`https://movinginmobile.com`

This is the primary hostname that should be treated as authoritative for:

- canonical URLs
- sitemap URLs
- public navigation
- SEO analysis
- Search Console inspection

Alternate hostname or protocol variants may still appear in Search Console reports.

---

# Search Console Verification

The production website has been verified in Google Search Console.

Verification should remain intact unless:

- DNS changes
- domain ownership changes
- verification method changes
- hosting configuration changes materially

Do not remove verification-related configuration without understanding how the current property was verified.

---

# XML Sitemap

The production sitemap is available at:

`https://movinginmobile.com/sitemap.xml`

The sitemap has been submitted to Google Search Console.

Search Console should be used to confirm:

- sitemap can be fetched
- sitemap is processed
- submitted URLs are discovered
- no unexpected parsing errors exist

A successfully processed sitemap does not guarantee every listed URL will be indexed.

---

# Sitemap and React Router

The application now uses real browser routes through React Router.

Primary routes include:

- `/`
- `/about`
- `/buyers`
- `/sellers`
- `/neighborhoods`
- `/rowe-report`
- `/resources`
- `/contact`

The sitemap should evolve to reflect these public routes.

The historical one-page/virtual-route architecture is obsolete.

---

# URL Inspection

Search Console URL Inspection should be used for specific production pages.

Examples:

`https://movinginmobile.com/`

`https://movinginmobile.com/buyers`

`https://movinginmobile.com/sellers`

`https://movinginmobile.com/resources`

URL Inspection can help determine:

- whether Google knows the URL
- whether it is indexed
- last crawl information
- discovered canonical
- user-declared canonical
- crawl restrictions
- mobile rendering status
- page retrieval status

---

# Request Indexing

Search Console may provide a Request Indexing action for eligible URLs.

This can be useful after:

- launching a meaningful new page
- correcting a major indexing issue
- changing canonical behavior
- publishing important new content

Request Indexing should not be repeatedly used for the same unchanged page.

Google ultimately decides when and whether a page is indexed.

---

# Missing Request Indexing Option

The Request Indexing control may not always be immediately visible.

Possible reasons include:

- inspection has not completed
- interface state
- temporary Search Console behavior
- URL or property context
- Google-side UI changes

Do not assume the absence of the button means the page cannot be indexed.

Always review the inspection result first.

---

# Indexing Is Not Immediate

A technically correct page may take time to be:

- crawled
- processed
- selected as canonical
- indexed
- reflected in Search Console reports

Search Console data is not instantaneous.

Avoid making repeated technical changes simply because a recent fix has not yet disappeared from reporting.

---

# Preferred Hostname

The preferred hostname is:

`https://movinginmobile.com`

Not:

`https://www.movinginmobile.com`

and not an HTTP variant.

This preference should be reinforced through:

- canonical URLs
- sitemap URLs
- internal links
- public marketing links
- provider configuration where practical

---

# Alternate Hostname Variants

Google may discover variants such as:

`http://movinginmobile.com`

`http://www.movinginmobile.com`

`https://www.movinginmobile.com`

These may appear in Search Console even though the preferred site is:

`https://movinginmobile.com`

This is not automatically evidence of a problem with the primary production website.

---

# Historical Search Console Warnings

Search Console previously reported reasons including:

- Indexed though blocked by robots.txt
- Blocked by robots.txt
- Page with redirect

These warnings were investigated.

The evidence indicated that they were primarily associated with alternate hostname or protocol variants rather than the preferred production pages.

---

# "Page with redirect"

This status generally means Google encountered a URL that redirects elsewhere.

A redirect is not inherently an error.

For example:

    http://movinginmobile.com
        |
        v
    https://movinginmobile.com

or:

    https://www.movinginmobile.com
        |
        v
    https://movinginmobile.com

may appropriately result in Google reporting the original URL as:

`Page with redirect`

The destination page is the URL that matters for indexing.

---

# "Blocked by robots.txt"

A Search Console report that a URL is blocked by `robots.txt` must be interpreted using the exact URL involved.

Before changing robots rules:

1. identify the reported URL
2. identify its hostname
3. identify its protocol
4. determine whether it is a desired public page
5. check whether it redirects
6. inspect the actual production `robots.txt`

Do not change production robots directives merely to eliminate a warning involving an unwanted alternate URL.

---

# "Indexed though blocked by robots.txt"

This status can occur when Google knows enough about a URL to index it while being restricted from normal crawling.

This can happen for several reasons.

The important question is:

**Which exact URL is Google reporting?**

If it is an alternate hostname that is not intended to be the canonical site, the warning may be low priority.

Do not assume it refers to:

`https://movinginmobile.com`

without checking.

---

# Why Search Console Warnings May Remain After a Fix

Search Console reporting can lag behind current site behavior.

After a change:

- Google may not have recrawled the URL
- historical data may still appear
- validation may take time
- alternate hostname URLs may continue to be discovered externally

A warning remaining visible does not necessarily mean the current production configuration is still wrong.

---

# Communicating Search Console Warnings

When explaining Search Console warnings to a nontechnical stakeholder, distinguish between:

- the site being broken
- Google reporting alternate or historical URLs
- Google still needing time to recrawl

Avoid presenting every Search Console warning as a production emergency.

The correct explanation should focus on whether the preferred website:

`https://movinginmobile.com`

is functioning and indexable.

---

# Cloudflare Decision

Cloudflare was evaluated as a possible way to enforce more explicit:

`www` → non-`www`

redirect behavior.

It was not introduced.

The reason was that the observed alternate-hostname Search Console warnings did not justify adding another infrastructure layer solely for that purpose.

Cloudflare would introduce:

- another DNS layer
- another configuration surface
- additional operational complexity

The decision is documented in:

`docs/20-decision-log.md`

---

# When to Reconsider Cloudflare

The decision may be revisited if future evidence shows:

- duplicate hostname indexing
- meaningful canonical confusion
- ranking impact
- persistent redirect inconsistency
- another Cloudflare capability provides independent value

Do not add Cloudflare solely because Search Console continues to display historical warnings.

---

# Canonical URLs

The site now supports route-aware canonical URLs.

Examples:

    https://movinginmobile.com/
    https://movinginmobile.com/buyers
    https://movinginmobile.com/sellers
    https://movinginmobile.com/resources

Search Console URL Inspection can compare:

- user-declared canonical
- Google-selected canonical

These should normally align.

---

# Canonical Mismatch

If Google selects a different canonical:

1. inspect the exact URL
2. check route metadata
3. check redirects
4. inspect internal linking
5. inspect sitemap entry
6. verify duplicate or alternate content
7. allow time for recrawl if the configuration recently changed

Do not force changes based on one temporary mismatch without understanding why Google chose differently.

---

# React Router and Search Console

React Router now provides real URLs.

However, the application is still a client-side React SPA.

Hostinger therefore must serve:

`index.html`

for nested application routes.

This is handled by:

`public/.htaccess`

Without the SPA fallback, Google or users requesting:

`/buyers`

directly could receive a 404.

Routing reliability is therefore part of SEO reliability.

---

# Direct Route Validation

For public routes, verify:

`https://movinginmobile.com/buyers`

loads directly.

Then refresh it.

Repeat with representative routes such as:

- `/sellers`
- `/resources`
- `/rowe-report`

A route that works only after client-side navigation is not deployment-complete.

---

# HTTP Status Expectations

Normal public pages should return successful content.

Redirecting alternate URLs may return redirect statuses.

Unknown routes should eventually have dedicated 404 handling.

The current unknown-route fallback behavior remains known technical debt.

---

# robots.txt

Production robots file:

`https://movinginmobile.com/robots.txt`

Source:

`public/robots.txt`

Search Console warnings should always be compared against the actual current file.

Do not reason about robots behavior from memory.

---

# Sitemap Location

Production sitemap:

`https://movinginmobile.com/sitemap.xml`

Source:

`public/sitemap.xml`

The sitemap should use only the preferred production hostname.

Do not include:

- localhost
- staging
- `www` variants
- HTTP variants
- implementation-only pages

---

# Sitemap Status Interpretation

Search Console may report counts such as:

- discovered pages
- indexed pages
- submitted URLs

These numbers may differ.

A page appearing in the sitemap does not require Google to index it.

Google may decline to index a page because of:

- duplication
- low content value
- canonical selection
- crawl timing
- other indexing criteria

The goal is to make pages technically correct and useful, not force a specific index count.

---

# Staging Site

Staging is:

`https://staging.movinginmobile.com`

It exists for validation, not organic search traffic.

Search Console work should focus primarily on production.

As SEO architecture becomes more sophisticated, staging indexing protection should be explicitly reviewed.

---

# Staging Canonical Considerations

The application currently derives route-aware canonical behavior from runtime logic.

When testing staging, distinguish between:

- verifying the route changes correctly
- verifying the final intended production hostname

The long-term metadata architecture should make production canonical policy explicit.

---

# Structured Data in Search Console

Search Console may report structured-data enhancements where Google recognizes supported schema.

Structured data is maintained in:

`src/components/StructuredData.jsx`

If an enhancement warning appears:

1. inspect the affected schema
2. validate the page
3. confirm visible content supports the schema
4. correct genuine errors
5. do not fabricate data merely to satisfy an enhancement report

---

# Rich Results

The site's structured data has previously passed Rich Results validation.

Passing a Rich Results test does not guarantee Google will display a rich result.

It confirms that the tested markup is eligible or technically understandable where supported.

---

# Performance Reporting

Search Console may provide Core Web Vitals or related experience reporting.

These reports should be monitored as the site grows.

IDX widgets and third-party scripts may affect:

- load performance
- layout shift
- mobile experience

Performance should be reviewed after significant IDX integration.

---

# Search Performance

Search Console Performance reports can help answer:

- what queries show the site
- which pages receive impressions
- click-through rate
- average position
- geographic search behavior

This information should inform future:

- neighborhood content
- relocation content
- buyer/seller content
- Rowe Report topics
- GEO strategy

---

# Query Data Limitations

Search Console query data is useful but incomplete.

Not every search query is reported.

Do not interpret the absence of a specific query as proof that no one searched it.

Look for patterns rather than isolated values.

---

# Page Performance

Once real routes accumulate search visibility, analyze individual pages such as:

- Buyers
- Sellers
- neighborhood pages
- Rowe Report content
- Resources

This was much less useful under the historical state-only page architecture.

React Router significantly improves page-level search analysis.

---

# Neighborhood Search Console Strategy

Future neighborhood pages should be monitored independently.

Examples:

    /neighborhoods/fairhope
    /neighborhoods/daphne
    /neighborhoods/spanish-fort

Questions to evaluate include:

- what queries trigger each page?
- does Google understand the geographic focus?
- does the page earn impressions beyond branded searches?
- which pages produce clicks into IDX?

---

# IDX Broker Search Console Strategy

Elm Street / IDX Broker will introduce a second public hostname:

`homes.movinginmobile.com`

This will require a deliberate Search Console strategy.

Do not assume the main site's existing configuration automatically covers every IDX reporting need.

---

# IDX Custom Domain First

Do not finalize Search Console configuration for IDX while relying on:

`movinginmobile.idxbroker.com`

The preferred architecture is:

`homes.movinginmobile.com`

Configure and validate the custom domain first.

Then evaluate Search Console.

---

# IDX Search Console Questions

After the custom IDX hostname is active, determine:

1. whether `homes.movinginmobile.com` should be separately verified
2. whether it is already covered through an appropriate domain property
3. what sitemap IDX Broker provides
4. whether the sitemap uses the custom hostname
5. how listing-detail pages canonicalize
6. whether saved-search pages are indexable
7. whether map/search result pages should be indexed
8. whether wrapper-related URLs appear unexpectedly
9. whether Google encounters vendor hostname duplicates

Document verified behavior after implementation.

---

# IDX Sitemap

IDX Broker provides XML sitemap functionality.

Before submitting an IDX sitemap:

- custom domain must be active
- canonical behavior must be understood
- sitemap URLs must be inspected
- search and detail pages must be validated

Do not submit a sitemap simply because one exists.

---

# Listing Detail Pages

IDX listing-detail URLs may be eligible for indexing.

However, MLS listing content is syndicated across many real-estate websites.

Therefore:

- listing pages may still provide useful search coverage
- original editorial content remains essential
- IDX listing pages should not become the entire SEO strategy

Search Console should be used to observe how Google treats these pages after launch.

---

# Saved Search Pages

IDX Broker Saved Links may generate useful location or criteria-based landing pages.

Examples may include:

- Fairhope homes
- Daphne homes
- waterfront homes
- new construction

Before treating these as SEO landing pages, review:

- content depth
- canonical behavior
- indexability
- duplication
- user value

Original neighborhood pages should remain the primary content strategy.

---

# Wrapper URL

The planned IDX wrapper is:

`https://movinginmobile.com/idx-wrapper.html`

This is an implementation template.

It should not be treated as a normal search landing page.

It should not be included in the main sitemap.

If Google discovers it, review whether explicit indexing protection is appropriate without interfering with IDX Broker's ability to fetch it.

---

# Search Console and GEO

Search Console can inform Generative Engine Optimization work indirectly.

Pages gaining impressions for natural-language local questions may indicate useful content opportunities.

Examples:

- moving to Fairhope
- Fairhope versus Daphne
- living on the Eastern Shore
- buying waterfront property in Baldwin County

Content should still be written for real users rather than mechanically mirroring query reports.

---

# Search Console and Content Decisions

Good uses of Search Console data include:

- identify pages gaining impressions but low clicks
- improve titles and descriptions
- find unexpected query themes
- identify neighborhood demand
- detect content gaps
- monitor new route discovery

Poor uses include:

- stuffing exact phrases unnaturally
- creating dozens of thin pages
- reacting to day-to-day ranking changes
- rewriting content after every small fluctuation

---

# Validation Workflow After a Major SEO Change

For material SEO releases:

1. validate locally
2. deploy to staging
3. validate staging behavior
4. promote to production
5. verify production URL
6. verify canonical
7. verify robots
8. verify sitemap
9. inspect structured data where affected
10. use Search Console URL Inspection
11. request indexing if appropriate
12. allow time for recrawl
13. monitor reports over time

---

# Search Console Troubleshooting Workflow

If Search Console reports a new issue:

1. copy the exact affected URL
2. identify hostname and protocol
3. open the URL manually
4. inspect redirect behavior
5. check robots
6. check canonical
7. check sitemap
8. check HTTP behavior
9. determine whether it is the preferred production URL
10. only then decide whether code or infrastructure should change

This prevents unnecessary fixes to harmless alternate URLs.

---

# Do Not Diagnose From the Warning Title Alone

Search Console issue titles can sound more serious than the actual situation.

For example:

`New reasons preventing your pages from being indexed`

does not necessarily mean important production pages suddenly disappeared from Google.

Always inspect:

- affected URLs
- validation state
- hostname
- current production behavior

before drawing conclusions.

---

# Search Console Validation

Google may offer a:

`Validate Fix`

workflow for some issue categories.

Use this after confirming that:

- the reported issue is real
- the relevant fix has been deployed
- the affected URLs are appropriate to validate

Do not repeatedly restart validation without making a meaningful change.

---

# Historical URLs

Search Console may retain URLs from earlier configurations.

Examples could include:

- old GitHub Pages paths
- HTTP variants
- `www` variants
- redirected URLs

Historical visibility does not necessarily require removal.

Focus on current production behavior and whether Google understands the preferred URL.

---

# Deployment Changes That Require Search Console Review

Review Search Console implications after changes to:

- route structure
- canonical URLs
- sitemap
- robots
- hostname
- redirects
- structured data
- IDX custom domain
- IDX sitemap
- major neighborhood content

---

# Security

Search Console access is administrative.

Do not expose:

- Google account credentials
- verification secrets
- private ownership tokens beyond what a public verification mechanism intentionally requires

Only appropriate account users should retain administrative access.

---

# Documentation Rule

When Search Console behavior reveals a meaningful architecture issue:

1. correct the implementation if necessary
2. update this document
3. update `09-seo-architecture.md`
4. update `20-decision-log.md` if an architecture decision changes
5. update `25-troubleshooting.md` if the issue is likely to recur

---

# Current Search Console Baseline

As of August 12, 2026:

- the production site is verified in Google Search Console;
- the primary XML sitemap has been submitted;
- the homepage has been requested for indexing;
- React Router now provides real public page URLs;
- route-specific URLs can now be inspected individually;
- canonical URLs are route-aware;
- Search Console warnings involving blocked, indexed-but-blocked, and redirected URLs were investigated;
- those warnings appear primarily associated with alternate HTTP or `www` URL variants rather than the preferred production hostname;
- Cloudflare was intentionally deferred;
- Search Console reporting may continue to show historical warnings while Google recrawls;
- IDX Search Console configuration should be finalized only after `homes.movinginmobile.com` and the IDX wrapper are operational.

## Related Documentation

See also:

- `07-hostinger-deployment.md`
- `09-seo-architecture.md`
- `10-google-analytics.md`
- `12-robots-and-sitemap.md`
- `13-structured-data.md`
- `18-testing-qa.md`
- `20-decision-log.md`
- `21-future-roadmap.md`
- `23-deployment-checklist.md`
- `24-release-checklist.md`
- `25-troubleshooting.md`