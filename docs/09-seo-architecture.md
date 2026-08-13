# SEO Architecture

## Purpose

This document describes the technical SEO architecture for the Moving in Mobile website.

It covers:

* crawlability
* canonical URLs
* XML sitemap behavior
* robots directives
* structured data
* Google Search Console
* route-level SEO implications
* hostname normalization decisions
* IDX SEO integration
* future page-specific metadata work

The goal is to keep SEO implementation aligned with the actual application architecture and deployment model.

## Current SEO Foundation

The current technical SEO foundation includes:

* Google Search Console verification
* XML sitemap
* `robots.txt`
* canonical URLs
* JSON-LD structured data
* Google Analytics 4
* real browser routes through React Router
* production hostname strategy
* staging separation
* Rich Results validation

The core SEO implementation is considered technically stable, but page-specific optimization remains an active roadmap item.

## Production Hostname

The preferred production hostname is:

`https://movinginmobile.com`

This is the canonical root domain for the website.

Alternate variants may include:

* `http://movinginmobile.com`
* `http://www.movinginmobile.com`
* `https://www.movinginmobile.com`

Search Console has previously reported indexing conditions related to alternate hostname behavior.

The preferred strategy is to treat:

`https://movinginmobile.com`

as the authoritative hostname.

## Hostname Redirect Decision

Search Console previously reported conditions including:

* Indexed though blocked by robots.txt
* Blocked by robots.txt
* Page with redirect

Investigation determined that these warnings were primarily associated with alternate HTTP and `www` hostnames rather than defects in the primary production website.

Cloudflare was evaluated as a possible method of implementing a stronger `www` to non-`www` redirect strategy.

It was intentionally deferred.

Reason:

The expected SEO benefit did not justify adding another infrastructure layer solely to eliminate low-impact hostname warnings.

This decision should be reconsidered only if future Search Console data shows a meaningful indexing or ranking problem.

## React Router SEO Impact

Prior to August 12, 2026, the site used internal React state to simulate separate pages.

That meant pages such as Buyers and Sellers did not have independent browser URLs.

The React Router migration introduced real URLs.

Current primary routes include:

* `/`
* `/about`
* `/buyers`
* `/sellers`
* `/neighborhoods`
* `/rowe-report`
* `/resources`
* `/contact`

This materially improves the site's SEO architecture because individual sections can now have:

* direct URLs
* unique canonical URLs
* page-specific metadata
* sitemap entries
* independent Search Console inspection
* backlinks to specific pages
* future page-specific structured data
* future neighborhood-specific content

## Canonical URLs

Canonical URLs should represent the production version of the current page.

Examples:

```text id="i955us"
https://movinginmobile.com/
https://movinginmobile.com/about
https://movinginmobile.com/buyers
https://movinginmobile.com/sellers
https://movinginmobile.com/resources
```

The React application currently updates the canonical link based on the active route.

Do not return to the historical configuration where every page advertised:

`https://movinginmobile.com/`

as its canonical URL.

That would undermine the value of separate routes.

## Canonical Hostname Rule

Canonical URLs must use the production hostname.

Do not use:

* localhost
* staging hostname
* GitHub Pages hostname
* IDX Broker default hostname

as canonical values for the primary site.

The canonical origin should be:

`https://movinginmobile.com`

A future metadata abstraction should make this explicit rather than relying on browser-origin behavior when appropriate.

## Staging SEO Behavior

The staging site is:

`https://staging.movinginmobile.com`

Staging exists for validation, not search visibility.

Future SEO work should ensure staging is not intentionally promoted to search engines.

When testing canonical URLs on staging, distinguish between:

* testing that canonical logic changes with the route;
* testing what the final production canonical value should be.

The production domain remains authoritative.

## XML Sitemap

The sitemap is maintained at:

`public/sitemap.xml`

The public URL is:

`https://movinginmobile.com/sitemap.xml`

Before React Router, the sitemap primarily represented the homepage because other application pages were not real browser routes.

Now that real routes exist, the sitemap should be expanded to reflect public crawlable pages.

Expected primary entries include:

```text id="6xmjel"
https://movinginmobile.com/
https://movinginmobile.com/about
https://movinginmobile.com/buyers
https://movinginmobile.com/sellers
https://movinginmobile.com/neighborhoods
https://movinginmobile.com/rowe-report
https://movinginmobile.com/resources
https://movinginmobile.com/contact
```

The sitemap should not include implementation-only pages.

For example, the planned IDX wrapper:

`/idx-wrapper.html`

should not be included because it exists to support IDX Broker rendering rather than as a standalone search destination.

## Sitemap Maintenance Rule

When a new permanent public route is added, evaluate whether it belongs in the sitemap.

Examples likely to be added later include neighborhood pages such as:

```text id="sgruxn"
/neighborhoods/fairhope
/neighborhoods/daphne
/neighborhoods/spanish-fort
```

Only indexable public pages should be included.

Do not add:

* internal utility pages
* duplicate routes
* staging URLs
* temporary test pages
* wrapper templates

## robots.txt

The robots file is stored at:

`public/robots.txt`

The public production URL is:

`https://movinginmobile.com/robots.txt`

The file should remain accessible after routing or `.htaccess` changes.

The React Router SPA fallback is specifically configured so physical files such as `robots.txt` are served normally instead of being routed through `index.html`.

After deployment changes, verify:

`https://movinginmobile.com/robots.txt`

directly.

## SPA Routing and Crawlability

React Router uses client-side routing.

Hostinger must serve `index.html` for application routes such as:

`/buyers`

and:

`/sellers`

This behavior is provided by:

`public/.htaccess`

The fallback rule must not interfere with physical SEO resources such as:

* `robots.txt`
* `sitemap.xml`
* images
* JavaScript assets
* CSS assets

Direct-route refresh tests are therefore part of both routing QA and technical SEO QA.

## Page Titles

The application currently maintains route-specific page titles through its analytics/page metadata mapping.

Examples should reflect the actual page purpose.

Future page-specific SEO work should formalize titles into a centralized metadata architecture rather than letting SEO metadata remain tightly coupled to analytics configuration.

Page titles should:

* be unique
* accurately describe visible content
* include useful geographic context where appropriate
* avoid keyword stuffing
* avoid duplicating the same title across routes

## Meta Descriptions

Page-specific meta descriptions are part of the future SEO roadmap.

The current application has a technical metadata foundation, but each major route should eventually receive its own intentionally written description.

Priority pages include:

* homepage
* Buyers
* Sellers
* About Tina
* Neighborhoods
* Resources
* Rowe Report

Neighborhood-specific routes should eventually receive location-specific descriptions.

## Structured Data

Structured data is implemented through JSON-LD.

The primary implementation is maintained in:

`src/components/StructuredData.jsx`

Structured data should represent visible and verifiable facts.

Do not include:

* fabricated ratings
* fabricated reviews
* unsupported awards
* unverifiable claims
* business information inconsistent with the visible website

Rich Results validation has previously passed.

## Structured Data Roadmap

Future structured-data expansion may include appropriate schema for:

* WebSite
* WebPage
* RealEstateAgent
* BreadcrumbList
* FAQPage where content qualifies
* Article or VideoObject for editorial content where appropriate

Schema should be selected based on actual visible page content.

Do not add schema solely because it is technically possible.

## Google Search Console

Google Search Console is configured for the production website.

The XML sitemap has been submitted.

The homepage has been submitted for indexing.

Search Console should be used to monitor:

* indexing
* crawl behavior
* discovered URLs
* sitemap processing
* redirect behavior
* canonical selection
* structured-data issues
* Core Web Vitals where applicable

Search Console data should be interpreted over time rather than reacting to every warning as an urgent defect.

## URL Inspection

Now that real routes exist, individual pages can be inspected separately.

Examples:

```text id="3wsg98"
https://movinginmobile.com/buyers
https://movinginmobile.com/sellers
https://movinginmobile.com/resources
```

This is a major improvement over the pre-router architecture.

After major SEO or route changes, use URL Inspection on representative pages rather than relying only on homepage inspection.

## Google Analytics and SEO

GA4 is not a ranking system, but analytics helps evaluate how visitors interact with organic landing pages.

Route-level analytics can help answer:

* which pages attract traffic
* which pages lead to form submissions
* which neighborhood pages generate engagement
* how users move from editorial content to IDX search
* which IDX entry points generate leads

Analytics naming and URL structure should remain consistent with SEO route structure.

## Neighborhood SEO Strategy

Neighborhood content is expected to become a major SEO and GEO asset.

Future routes should likely use structures such as:

```text id="un4hxx"
/neighborhoods/fairhope
/neighborhoods/daphne
/neighborhoods/spanish-fort
```

These pages should contain original, useful local content rather than thin collections of listings.

Potential content includes:

* community overview
* lifestyle
* housing context
* local amenities
* commuting context
* market observations
* Tina's local perspective
* relevant video content
* links to IDX property searches

The editorial page should establish the local context.

IDX should supplement the content rather than replace it.

## IDX SEO Architecture

Elm Street / IDX Broker is the next major SEO integration.

The current default IDX hostname is:

`movinginmobile.idxbroker.com`

The preferred customer-facing IDX hostname is:

`homes.movinginmobile.com`

Using a custom subdomain is intended to keep the IDX experience associated with the Moving in Mobile domain rather than presenting users with the vendor's default hostname.

The custom subdomain is not yet active at the time of this documentation update.

## IDX Content Responsibilities

IDX Broker is expected to provide SEO-capable pages for:

* search results
* listing details
* selected saved searches
* property pages
* market reports where appropriate

The primary React website remains responsible for:

* original local content
* neighborhood expertise
* Tina's brand
* buyer education
* seller education
* editorial pages
* GEO-oriented content

The strategy is not to rely on IDX listings alone for search visibility.

## IDX Wrapper and SEO

The planned wrapper file is:

`public/idx-wrapper.html`

Expected production URL:

`https://movinginmobile.com/idx-wrapper.html`

This file exists as a template for IDX Broker.

It should not be treated as an independent SEO landing page.

It should not be added to the primary sitemap.

If appropriate, the wrapper should eventually include protection against accidental indexing.

That decision should be tested against IDX Broker's wrapper requirements before implementation.

## IDX Sitemap

IDX Broker may provide its own sitemap capabilities for IDX-generated pages.

Once the custom subdomain is configured, determine:

* IDX sitemap URL
* whether Google Search Console should receive a separate sitemap
* whether the IDX sitemap references the custom subdomain
* whether listing-detail URLs are indexable
* whether saved-search pages are indexable
* how canonical URLs are generated

Do not submit an IDX sitemap until the custom domain and wrapper behavior are validated.

## Duplicate Content Considerations

MLS listing information appears on many real-estate websites.

The Moving in Mobile SEO strategy should therefore not depend solely on syndicated listing descriptions.

Original value should come from:

* local editorial content
* neighborhood guides
* Tina's expertise
* market interpretation
* original videos
* buyer and seller resources
* local service content
* useful internal linking

IDX listings are important for user experience and search coverage, but they are not a substitute for differentiated content.

## Internal Linking Strategy

Internal links should connect related areas of the site.

Examples:

```text id="64j104"
Fairhope neighborhood page
        |
        +--> Fairhope homes for sale
        |
        +--> Buyer resources
        |
        +--> Contact Tina
```

Future IDX saved searches should be linked contextually from relevant editorial pages.

Avoid creating large numbers of low-value links solely for search engines.

## Generative Engine Optimization

GEO is part of the planned roadmap.

The goal is to make site content easy for search engines and generative systems to understand and cite.

Likely GEO principles include:

* clear factual writing
* strong page structure
* specific geographic context
* direct answers to common relocation questions
* original local expertise
* authoritative business identity
* useful entity relationships
* structured data
* internal linking
* current market content

GEO should build on strong SEO and content quality rather than becoming a separate collection of artificial optimization tactics.

## Content Quality

Search-oriented content should remain useful to actual visitors.

Avoid:

* keyword stuffing
* repetitive city-name blocks
* artificial FAQ generation
* thin pages
* copied neighborhood descriptions
* unverified statistics
* claims written solely for search engines

The site's preferred positioning is knowledgeable, local, helpful, and trusted-advisor oriented.

SEO content should reinforce that positioning.

## SEO Validation After Deployment

For material SEO or routing releases, validate:

1. production page loads;
2. direct route loads;
3. refresh does not return 404;
4. canonical URL matches the page;
5. title is appropriate;
6. `robots.txt` loads;
7. `sitemap.xml` loads;
8. structured data remains valid where affected;
9. no staging hostname appears in production metadata;
10. no localhost hostname appears in production metadata;
11. GA4 page views still use correct paths;
12. Search Console can inspect the route.

## Technical SEO Technical Debt

Current technical SEO work still includes:

* expanding the primary XML sitemap for real routes
* formalizing page-specific metadata
* neighborhood route expansion
* route-specific descriptions
* expanded structured data
* IDX SEO configuration
* IDX sitemap validation
* internal linking improvements
* GEO content development
* possible metadata component abstraction
* long-term review of alternate hostname behavior

These items should be coordinated with:

`19-known-technical-debt.md`

and:

`21-future-roadmap.md`

## SEO Change Control

Any material change to the following should trigger a documentation review:

* route structure
* canonical logic
* production hostname
* sitemap
* robots directives
* structured data
* IDX hostname
* IDX indexing behavior
* page titles
* metadata architecture
* Search Console property configuration

Major SEO architecture decisions should also be recorded in:

`20-decision-log.md`

## Current SEO Status

As of August 12, 2026:

* Google Analytics 4 is installed;
* Google Search Console is verified;
* XML sitemap is active;
* `robots.txt` is active;
* canonical URL support is implemented;
* JSON-LD structured data is active;
* Rich Results validation has passed;
* React Router provides real page URLs;
* route-aware canonicals are implemented;
* the sitemap still requires expansion to fully reflect the new routes;
* alternate-hostname Search Console warnings are being monitored rather than treated as a blocking issue;
* Elm Street / IDX Broker SEO integration is the next major SEO milestone.
