# Structured Data

## Purpose

This document describes the structured-data architecture for the Moving in Mobile website.

It covers:

- the current JSON-LD implementation
- what structured data should represent
- validation expectations
- business identity
- page-level schema opportunities
- neighborhood-page schema
- Rowe Report schema
- IDX considerations
- maintenance rules
- troubleshooting

The goal is to improve machine understanding of the site without introducing unsupported, misleading, or fabricated information.

---

# Structured Data Technology

The site uses:

`JSON-LD`

for structured data.

JSON-LD is preferred because it can represent structured entities without requiring schema attributes throughout the visible HTML.

The current implementation is maintained in:

`src/components/StructuredData.jsx`

---

# Current Role

Structured data helps search engines understand:

- who Tina Rowe is
- what business the site represents
- the website entity
- geographic context
- relevant URLs
- business contact information

Structured data supports technical SEO, but it does not replace visible page content.

---

# Structured Data Is Not Hidden Marketing Copy

Schema should describe facts that are also supported by the website or other authoritative business information.

Do not use structured data to make claims that visitors cannot verify.

Examples of inappropriate schema additions include:

- fake review counts
- unsupported ratings
- awards Tina has not received
- service areas not actually served
- credentials not actually held
- invented business descriptions
- misleading pricing or availability claims

---

# Primary Implementation File

Current structured-data logic is located in:

`src/components/StructuredData.jsx`

This file should be treated as SEO-sensitive.

Changes should be reviewed carefully because invalid or misleading schema can affect search interpretation.

---

# JSON-LD Placement

Structured data is rendered into the page as a script element using:

`application/ld+json`

Conceptually:

    <script type="application/ld+json">
      { ... }
    </script>

The actual repository implementation remains authoritative.

---

# Current Entity Focus

The current structured-data foundation is centered on Tina Rowe and the Moving in Mobile real-estate business.

Relevant conceptual entities may include:

- RealEstateAgent
- Person
- WebSite
- WebPage
- Organization or brokerage relationship where appropriate

The exact schema types should be chosen based on what the page actually represents.

---

# Business Identity

Structured data should remain consistent with visible identity across the site.

Important fields may include:

- Tina Rowe
- Moving in Mobile
- Keller Williams Mobile
- contact information
- public website URL
- public social profiles
- service area
- business image or logo

Do not allow structured data to drift away from the visible header, footer, Contact page, or About page.

---

# Keller Williams Relationship

Tina's brokerage relationship should be represented accurately.

Do not structure the site in a way that falsely implies Tina is an independent brokerage if she is affiliated with Keller Williams Mobile.

Where brokerage relationships are represented in schema, they should match visible business disclosures.

---

# Contact Information

If structured data contains:

- phone number
- email
- address
- contact URL

those values should match the current public site.

Whenever contact information changes, review:

- Header
- Footer
- Contact page
- StructuredData.jsx
- provider profiles
- Google Business Profile where relevant

---

# Service Area

The site serves Mobile and Baldwin County markets.

Potential geographic focus includes areas such as:

- Mobile
- Fairhope
- Daphne
- Spanish Fort
- Foley
- Gulf Shores
- Orange Beach
- Silverhill
- Robertsdale

Service-area schema should reflect actual business coverage.

Do not add dozens of nearby cities solely for keyword purposes.

---

# URLs

Structured data should use stable production URLs.

Preferred domain:

`https://movinginmobile.com`

Do not use:

- localhost
- staging URLs
- historical GitHub Pages URLs
- temporary IDX vendor URLs

for the primary site identity.

---

# Route-Aware Structured Data

The site now uses real browser routes.

Future structured data may become route-specific.

Examples:

    /
    /about
    /buyers
    /sellers
    /neighborhoods
    /rowe-report
    /resources
    /contact

Not every page requires a unique schema type.

Structured data should be added only when it helps represent the actual page meaning.

---

# WebSite Schema

A sitewide `WebSite` entity may be appropriate.

Potential properties include:

- name
- URL
- publisher
- description

If search functionality eventually receives an appropriate site search architecture, additional schema may be considered.

Do not add unsupported `SearchAction` markup unless it accurately reflects a functional search endpoint.

---

# WebPage Schema

Major routes may eventually use `WebPage` or more specific page types.

Useful properties may include:

- name
- URL
- description
- `isPartOf`
- `about`
- breadcrumb relationships

This becomes more valuable as route-specific metadata is formalized.

---

# About Page Structured Data

Route:

`/about`

Potential schema relationships include:

- Person
- RealEstateAgent
- WebPage
- Organization affiliation

This page is one of the strongest places to reinforce Tina's entity identity.

Any biographical facts included should match visible content.

---

# Buyers Page Structured Data

Route:

`/buyers`

The Buyers page primarily provides educational and lead-generation content.

Possible future structured-data options include:

- WebPage
- BreadcrumbList
- FAQPage where appropriate and supported

Do not invent FAQs solely for schema.

If FAQ schema is ever used, the questions and answers must be visible on the page.

---

# Sellers Page Structured Data

Route:

`/sellers`

Possible future schema may include:

- WebPage
- BreadcrumbList
- FAQPage where genuine visible FAQs exist

Home valuation forms themselves do not require fabricated structured data.

---

# Neighborhoods Page

Route:

`/neighborhoods`

The main Neighborhoods page may use:

- CollectionPage
- WebPage
- BreadcrumbList

depending on the final content structure.

The schema should reflect an editorial collection of local-area information, not pretend to be an MLS database.

---

# Future Neighborhood Pages

Planned routes may include:

    /neighborhoods/fairhope
    /neighborhoods/daphne
    /neighborhoods/spanish-fort
    /neighborhoods/gulf-shores
    /neighborhoods/orange-beach

These pages may benefit from structured relationships such as:

- WebPage
- Place
- City
- BreadcrumbList

However, place information should remain factual.

Do not fabricate:

- population
- median home prices
- school ratings
- commute times

without verified sources.

---

# BreadcrumbList

Breadcrumb structured data may become useful once nested routes are introduced.

Example conceptual hierarchy:

    Home
    >
    Neighborhoods
    >
    Fairhope

A breadcrumb structure should match visible or logical navigation.

It should not describe a hierarchy that does not exist on the site.

---

# Rowe Report Page

Route:

`/rowe-report`

The Rowe Report includes video content.

Future schema opportunities may include:

- WebPage
- VideoObject
- Article
- BreadcrumbList

depending on how individual episodes are presented.

---

# VideoObject

If individual Rowe Report videos receive meaningful page content, `VideoObject` schema may be appropriate.

Potential properties include:

- name
- description
- thumbnail URL
- upload date
- embed URL
- content URL where appropriate

Do not create `VideoObject` markup with guessed metadata.

Use verified information from the actual video.

---

# Individual Rowe Report Routes

If future episodes receive dedicated routes such as:

    /rowe-report/fairhope-market-update

then each page may have its own:

- WebPage
- VideoObject
- Article-style metadata where applicable
- breadcrumb

Do not add individual episode schema before those routes exist.

---

# Resources Page

Route:

`/resources`

The Resources page lists local service providers and homeowner resources.

The primary page may use:

- WebPage
- CollectionPage

depending on final organization.

Do not automatically create LocalBusiness schema for every vendor listed.

The site does not own those businesses, and provider details may change.

---

# Contact Page

Route:

`/contact`

The Contact page may reinforce:

- RealEstateAgent
- Person
- contact URL

Do not duplicate inconsistent phone or email values across multiple JSON-LD blocks.

---

# Reviews and Ratings

The site displays Tina's Google reviews.

Structured review markup requires careful handling.

Do not assume that visible reviews automatically justify aggregate rating schema.

Search engines apply specific rules to self-serving review markup.

Before adding:

- `aggregateRating`
- `Review`

review Google's current structured-data policies.

Do not add rating schema merely because testimonials appear on the page.

---

# Historical Validation

The current structured-data implementation has previously passed Rich Results validation.

This confirms that the tested markup was technically valid at that time.

It does not guarantee:

- ranking improvement
- rich-result display
- ongoing validity after future changes

Revalidate after material schema changes.

---

# Rich Results Test

Use Google's Rich Results testing tool when appropriate.

Validate:

- production markup
- staging markup during development
- changes to supported schema types

If Google reports that a schema type is valid but not eligible for a special result, do not force additional markup simply to obtain a visual enhancement.

---

# Schema.org Validation

Schema.org validation tools may also be useful for general schema correctness.

This can help identify:

- syntax problems
- incorrect properties
- invalid nesting

Google and Schema.org validation serve related but different purposes.

---

# Browser Inspection

Structured data can also be inspected directly in the rendered page source or browser DOM.

Check for:

- valid JSON
- expected production URLs
- duplicate entities
- missing values
- stale content

---

# Avoid Duplicate Entity Blocks

As page-specific schema expands, avoid creating multiple conflicting representations of the same person or business.

For example, do not create one Tina Rowe entity with one phone number and another with a different number.

Use stable identifiers and consistent URLs where appropriate.

---

# Entity Identifiers

Structured data may use `@id` values to connect related entities.

Conceptually:

    https://movinginmobile.com/#tina-rowe

or:

    https://movinginmobile.com/#website

Stable identifiers can help connect:

- Person
- RealEstateAgent
- WebSite
- WebPage

Do not change entity identifiers casually once they become part of the architecture.

---

# SameAs Links

`sameAs` may be used for verified public profiles.

Potential sources include:

- Facebook
- YouTube
- Instagram
- LinkedIn
- Google Business Profile where appropriate

Only include URLs that actually represent Tina or the business.

Do not include unrelated directories solely for authority signaling.

---

# Google Business Profile Consistency

Structured data should remain consistent with Tina's Google Business Profile where appropriate.

Consistency is useful for:

- business name
- phone
- website
- location
- identity

Do not alter structured data solely to match an outdated external profile without first determining which source is correct.

---

# Structured Data and Canonicals

Schema URLs should generally align with canonical URLs.

Example:

    Page:
    https://movinginmobile.com/buyers

    Canonical:
    https://movinginmobile.com/buyers

    Structured-data URL:
    https://movinginmobile.com/buyers

Misalignment can create ambiguity.

---

# Structured Data and Sitemap

The sitemap and structured data are separate systems.

A page does not need special schema merely because it is in the sitemap.

Likewise, structured-data markup does not automatically make a page appropriate for sitemap inclusion.

---

# Structured Data and React Router

Because the site is client-rendered, structured data may be generated by React.

When route-specific schema is introduced, verify that:

- it updates on route changes
- stale schema does not remain from the previous route
- direct route loads receive the correct schema after rendering
- duplicate scripts are not accumulated

---

# Future Metadata Component

As page-specific SEO expands, it may be useful to create a dedicated SEO component.

Potential responsibilities could include:

- document title
- meta description
- canonical
- Open Graph
- structured data

Possible future structure:

`src/components/seo/PageSEO.jsx`

or similar.

This is a roadmap direction, not a current requirement.

---

# Structured Data and IDX Broker

IDX Broker will introduce provider-generated property pages.

Structured data on those pages should primarily be managed by IDX Broker unless a specific deficiency requires intervention.

Do not attempt to duplicate every listing into custom React-generated schema.

---

# IDX Listing Detail Pages

Listing detail pages may include property-related structured data generated by IDX Broker.

After IDX launch, inspect representative listing pages for:

- existing JSON-LD
- canonical URL
- listing details
- schema type
- duplicate entities
- custom-domain consistency

Do not add a second conflicting property schema layer without understanding the provider's existing markup.

---

# IDX Search Results

Search-results pages generally do not require custom property schema for every item merely because listings are displayed.

Use provider defaults unless there is a clear technical reason to change them.

---

# IDX Saved Searches

Saved-search pages may function as geographic or criteria-based listing pages.

Their structured-data value should be reviewed after launch.

Do not assume that more schema automatically improves SEO.

---

# IDX Wrapper

The planned static wrapper:

`public/idx-wrapper.html`

is not a normal SEO landing page.

It should not contain misleading standalone page schema.

Any structured data in the wrapper should be limited to globally appropriate site/business identity if needed.

Avoid duplicating page-specific listing schema in the wrapper shell.

---

# IDX Custom Domain

The preferred IDX hostname is:

`homes.movinginmobile.com`

Any provider-generated structured data should be reviewed for URL consistency after the custom domain becomes active.

Watch for references to:

`movinginmobile.idxbroker.com`

if the user-facing canonical hostname is supposed to be:

`homes.movinginmobile.com`

---

# IDX Schema Validation

After IDX is live, validate representative pages such as:

- Advanced Search
- Results
- Listing Detail
- Saved Search
- Home Valuation

Focus most closely on Listing Detail pages because they are the most likely to contain property-specific schema.

---

# Structured Data and GEO

Structured data can support Generative Engine Optimization by making entity relationships clearer.

Useful relationships may include:

- Tina Rowe
- Moving in Mobile
- Keller Williams Mobile
- Fairhope
- Daphne
- Mobile
- Baldwin County
- Rowe Report

However, structured data alone will not make the site authoritative.

GEO still depends heavily on:

- clear content
- factual accuracy
- original expertise
- strong internal linking
- useful local information

---

# FAQPage

FAQ structured data should only be used when the page contains genuine visible question-and-answer content.

Do not create hidden FAQ blocks solely for schema.

If future pages include relevant FAQs, examples might involve:

- moving to Fairhope
- buying along the Eastern Shore
- seller preparation
- relocation questions

Always verify current search-engine support before prioritizing FAQ schema.

---

# Article Schema

Article-style schema may become appropriate for:

- Rowe Report written content
- market reports
- long-form local guides

Potential types include:

- Article
- BlogPosting
- NewsArticle only when genuinely appropriate

Do not label ordinary marketing pages as articles merely to add schema.

---

# Market Report Schema

Future market reports may qualify as editorial content.

Possible structured-data treatment might include:

- Article
- WebPage
- BreadcrumbList

MLS statistics should still be factually sourced and current.

Schema does not validate the truth of market data.

---

# Local Business Data

If business-specific schema is expanded, verify:

- business name
- brokerage relationship
- contact information
- geographic scope
- URL
- logo
- image

Avoid using a schema type that implies services or operational structure not actually provided.

---

# Address Data

If an office address is included in structured data, it should be:

- accurate
- public
- consistent with visible business information
- appropriate for Tina's actual business presence

Do not include a private residential address simply to complete schema fields.

---

# Phone Numbers

Phone numbers should use a consistent public business number.

If the site later changes Tina's primary phone number, search:

- visible site content
- schema
- IDX
- Google Business Profile
- social profiles

for outdated values.

---

# Image URLs

Structured-data image and logo URLs should:

- use HTTPS
- be publicly accessible
- use production domain where appropriate
- point to stable files

Avoid referencing temporary staging assets.

---

# Schema Maintenance Rule

Review structured data whenever any of the following changes:

- Tina's contact information
- brokerage
- business name
- logo
- public URL
- social profiles
- route architecture
- neighborhood-page architecture
- Rowe Report structure
- IDX hostname
- IDX page behavior

---

# Validation After Change

After a material structured-data change:

1. run local build
2. inspect rendered JSON-LD
3. validate syntax
4. deploy to staging
5. inspect staging
6. validate using appropriate tools
7. promote to production
8. verify production markup

Do not rely only on local source code.

---

# Common Structured Data Errors

Common problems include:

- invalid JSON
- trailing commas
- wrong schema property
- stale phone number
- staging URL in production
- conflicting entity blocks
- unsupported rating markup
- schema that does not match visible content
- duplicate scripts after route changes

---

# Troubleshooting Invalid JSON-LD

If structured data fails validation:

1. inspect browser-rendered script
2. copy the JSON content
3. validate JSON syntax
4. inspect recent source changes
5. verify dynamic values
6. confirm URLs
7. rebuild

Do not debug the entire React application if the problem is only malformed JSON.

---

# Troubleshooting Missing Structured Data

If JSON-LD disappears:

1. confirm `StructuredData.jsx` is imported
2. confirm component renders
3. inspect browser DOM
4. check Console errors
5. verify route conditions
6. compare local/staging/production

---

# Troubleshooting Duplicate Structured Data

If duplicate blocks appear:

1. inspect component hierarchy
2. verify component is rendered once
3. inspect route change behavior
4. check static `index.html` for old schema
5. check provider-injected schema on IDX pages

Do not remove provider schema without understanding its purpose.

---

# Structured Data Release Blocking Issues

A structured-data issue should generally block an SEO-focused release if it:

- contains false business information
- exposes private information
- produces malformed JSON
- introduces conflicting canonical identity
- creates unsupported review claims
- causes major schema duplication

Minor enhancement warnings usually should not block unrelated releases.

---

# Documentation Rule

When structured-data architecture changes materially:

1. update this document
2. update `09-seo-architecture.md`
3. update `20-decision-log.md` if the change is architectural
4. update `18-testing-qa.md`
5. update `25-troubleshooting.md` where appropriate

---

# Future Structured Data Roadmap

Expected future work includes:

1. formalize route-level metadata architecture
2. review current entity identifiers
3. add page-level WebPage relationships
4. add BreadcrumbList for nested routes
5. evaluate neighborhood Place relationships
6. add VideoObject where Rowe Report content justifies it
7. evaluate Article schema for market/editorial content
8. inspect IDX listing-detail schema after launch
9. verify custom IDX hostname consistency
10. maintain schema alongside visible business information

---

# Current Structured Data Baseline

As of August 12, 2026:

- JSON-LD structured data is implemented;
- the primary implementation is in `src/components/StructuredData.jsx`;
- current schema has passed Rich Results validation;
- structured data must remain aligned with visible business facts;
- fabricated ratings, reviews, awards, or unsupported claims are prohibited;
- React Router creates new opportunities for route-specific schema;
- neighborhood, breadcrumb, video, and article schema are future opportunities;
- IDX Broker-generated schema should be inspected after the custom IDX environment is live before adding custom listing schema;
- structured data remains part of the site's technical SEO and GEO foundation.

## Related Documentation

See also:

- `03-codebase-structure.md`
- `04-component-catalog.md`
- `09-seo-architecture.md`
- `10-google-analytics.md`
- `11-search-console.md`
- `12-robots-and-sitemap.md`
- `14-geo-strategy.md`
- `17-security-maintenance.md`
- `18-testing-qa.md`
- `20-decision-log.md`
- `21-future-roadmap.md`
- `25-troubleshooting.md`