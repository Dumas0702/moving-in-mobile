# Project Overview

## Purpose

This document provides a concise overview of the Moving in Mobile website project.

It explains:

- who the site is for
- what business goals it supports
- what the current architecture is
- what has already been implemented
- what the major integrations are
- what the current development priority is
- how future work should be approached

This chapter is intended to orient a developer, stakeholder, or future maintainer before they move into the more detailed engineering documentation.

---

# Project Name

The project is:

`Moving in Mobile`

Primary production site:

`https://movinginmobile.com`

Primary staging site:

`https://staging.movinginmobile.com`

---

# Client

The site is being built for:

Tina Rowe, REALTOR®

Brokerage:

Keller Williams Mobile

The site supports Tina's personal real-estate brand while maintaining appropriate brokerage identity.

---

# Primary Business Goal

The primary purpose of the website is lead generation.

The site is designed to help Tina generate:

- buyer leads
- seller leads
- relocation leads
- home valuation inquiries
- listing-alert leads
- property-search leads
- showing requests
- general real-estate inquiries

The website should also strengthen Tina's long-term local brand and authority.

---

# Secondary Business Goals

The site also supports:

- local credibility
- buyer education
- seller education
- relocation guidance
- neighborhood expertise
- The Rowe Report
- SEO
- Generative Engine Optimization
- content marketing
- social-media support
- future market reporting
- long-term organic traffic growth

---

# Brand Positioning

The preferred positioning is:

- knowledgeable
- approachable
- professional
- locally experienced
- polished
- trustworthy
- practical

The site should feel premium without presenting Tina as an exclusive luxury-only agent.

The brand should remain accessible to a broad range of buyers and sellers.

---

# Geographic Focus

The site focuses on Mobile and Baldwin County, Alabama.

Important markets include:

- Mobile
- Fairhope
- Daphne
- Spanish Fort
- Foley
- Gulf Shores
- Orange Beach
- Silverhill
- Robertsdale

The Eastern Shore and Baldwin County are especially important to the long-term neighborhood, relocation, SEO, and GEO strategy.

---

# Core Website Functions

The site currently provides or supports:

- Home page
- About page
- Buyers page
- Sellers page
- Neighborhoods page
- The Rowe Report page
- Resources page
- Contact page
- lead-generation forms
- home valuation lead capture
- new listing alert lead capture
- testimonials
- featured listings presentation
- social links
- Google Analytics 4
- Google Search Console
- XML sitemap
- `robots.txt`
- canonical URLs
- JSON-LD structured data
- responsive desktop and mobile layouts

---

# Current Primary Routes

The application uses real browser routes.

Current primary routes are:

- `/`
- `/about`
- `/buyers`
- `/sellers`
- `/neighborhoods`
- `/rowe-report`
- `/resources`
- `/contact`

These routes are managed through React Router.

---

# Technology Stack

The current front-end stack includes:

- React
- React DOM
- React Router
- Vite
- Tailwind CSS

The site is hosted on:

Hostinger

Source control and deployment are managed through:

GitHub

---

# Primary Application Architecture

The application is a client-side React site.

At a high level:

    Browser
        |
        v
    Hostinger
        |
        v
    Vite-built React application
        |
        +--> React Router
        |
        +--> Lead forms
        |
        +--> GA4
        |
        +--> Structured data
        |
        +--> SEO files
        |
        +--> Future IDX entry points

The main application is currently orchestrated largely through:

`src/App.jsx`

This remains known technical debt but is intentionally being left stable during higher-priority integration work.

---

# React Router Milestone

The site originally used React state to simulate separate pages.

That architecture was replaced on August 12, 2026 with React Router.

This migration introduced:

- real browser URLs
- direct route loading
- browser Back/Forward support
- route-aware canonicals
- route-aware GA4 paths
- better SEO architecture
- stable destinations for future IDX links

This work is complete and live in production.

---

# Hostinger SPA Fallback

Because the site uses React Router with `BrowserRouter`, direct browser requests to routes such as:

`/buyers`

must be handled correctly by Hostinger.

This is implemented through:

`public/.htaccess`

The configuration preserves real files and serves:

`index.html`

for React routes.

This prevents direct-route and refresh 404 errors.

---

# Git Workflow

The project uses:

`staging`

as the primary development branch.

`redesign-v2`

is used as the Hostinger staging deployment branch.

`main`

is the production branch.

The standard development flow is:

    staging
        |
        v
    origin/staging
        |
        v
    origin/redesign-v2
        |
        v
    Hostinger staging
        |
        v
    validation
        |
        v
    merge staging into main
        |
        v
    Hostinger production

---

# Production Environment

Production URL:

`https://movinginmobile.com`

Production branch:

`main`

Production should contain only validated work.

---

# Staging Environment

Staging URL:

`https://staging.movinginmobile.com`

Primary development branch:

`staging`

Hostinger staging deployment branch:

`redesign-v2`

Staging should be used to validate material runtime changes before production promotion.

---

# Lead Generation Architecture

Existing non-IDX lead generation uses:

Formspree

Current lead flows include:

- Contact
- buyer inquiry
- seller inquiry
- home valuation
- new listing alerts
- CTA-driven contact interactions

Lead forms should preserve useful source context.

---

# Lead Strategy

The site should provide useful information before asking for contact details.

Preferred flow:

    Useful content
        |
        v
    Relevant next step
        |
        v
    Lead opportunity

Lead generation should be prominent without making normal browsing unnecessarily difficult.

---

# Google Analytics

Google Analytics 4 is installed.

The site tracks route-level page views.

GA4 is used to evaluate:

- traffic
- route engagement
- traffic source
- lead-related behavior
- future IDX engagement

Personally identifiable lead information must not be sent to GA4.

---

# Google Search Console

Google Search Console is verified for the production site.

The sitemap has been submitted.

The homepage has been requested for indexing.

Search Console is used to monitor:

- indexing
- crawl behavior
- canonicals
- sitemap processing
- search visibility
- structured-data issues

Historical warnings involving alternate `www` and HTTP URLs have been investigated and are not currently considered a blocking production issue.

---

# SEO Foundation

The technical SEO foundation includes:

- real browser routes
- canonical URLs
- sitemap
- `robots.txt`
- Search Console
- structured data
- page-view analytics
- production hostname strategy

Remaining SEO work includes:

- page-specific metadata
- sitemap expansion
- neighborhood routes
- deeper local content
- IDX SEO
- GEO expansion

---

# Canonical Hostname

The preferred public hostname is:

`https://movinginmobile.com`

The site should not intentionally canonicalize to:

- `www`
- HTTP
- staging
- localhost
- historical GitHub Pages URLs

---

# Structured Data

JSON-LD structured data is implemented through:

`src/components/StructuredData.jsx`

The current implementation has passed Rich Results validation.

Structured data must remain aligned with:

- visible site content
- Tina's actual identity
- brokerage identity
- public contact information

Unsupported ratings, fabricated reviews, or invented claims should never be added.

---

# Branding

The site's design direction is:

- lighter
- cleaner
- polished
- local
- modern
- professional

Key visual elements include:

- Mobile skyline imagery
- Tina Rowe imagery
- The Rowe Report branding
- Keller Williams Mobile identity
- REALTOR® identity
- Equal Housing identity

---

# Header Brand

The current header uses:

`TheRoweReportTransparentLogo.png`

The logo should remain prominent but should not create excessive header height or overwhelm navigation.

---

# Hero Design

The homepage hero includes:

- Mobile skyline background
- Tina image on the right
- headline on the left
- no duplicate hero logo
- relatively compact height
- Tina image aligned toward the bottom

Historical issues such as excessive whitespace and oversized hero height should not be reintroduced.

---

# Content Strategy

The long-term site strategy is content-driven.

Important future content categories include:

- neighborhood guides
- relocation guides
- comparison pages
- buyer education
- seller education
- market reports
- Rowe Report content
- local homeowner resources

The site should become a durable local information resource.

---

# GEO Strategy

Generative Engine Optimization is part of the long-term strategy.

The goal is to make Moving in Mobile useful when users ask natural-language questions about:

- Fairhope
- Daphne
- Spanish Fort
- Mobile
- Baldwin County
- Eastern Shore living
- relocation
- buying
- selling
- Gulf Coast real estate

GEO should be built on factual, useful, original content.

---

# Fair Housing

All real-estate and neighborhood content must comply with Fair Housing requirements.

Avoid demographic steering or subjective descriptions related to protected classes.

Use objective characteristics such as:

- location
- commute
- housing type
- amenities
- lot size
- waterfront access

---

# The Rowe Report

The Rowe Report is an important content and brand asset.

It currently includes video content.

Future use may include:

- dedicated episode pages
- edited transcripts
- written summaries
- social reuse
- neighborhood links
- IDX search links
- SEO and GEO content

The Rowe Report should remain integrated with the main Moving in Mobile site.

---

# Resources Page

The Resources page provides practical local homeowner information.

Categories include areas such as:

- appliance repair
- HVAC
- inspections
- insurance
- lenders
- plumbers
- roofers
- title/closing
- tree service
- other homeowner services

The page should remain useful and maintainable rather than becoming an oversized directory.

---

# IDX Broker

Elm Street / IDX Broker is the next major development milestone.

Tina's IDX account has been approved.

The feed is:

Gulf Coast MLS / `GCMLS-WEBAPI`

IDX Broker will provide live MLS functionality.

---

# IDX Capabilities

Available IDX functionality includes:

- Advanced Search
- AI Smart Search
- Map Search
- Results
- Listing Details
- Featured Listings
- Sold/Pending
- Home Valuation
- Schedule Showing
- user signup/login
- saved searches
- Browse by City
- Market Reports
- XML Sitemap
- widgets
- API access

Not every feature should automatically be enabled.

Functionality should be selected based on:

- usability
- lead generation
- design
- SEO
- maintenance value

---

# IDX Hybrid Architecture

The project will use a hybrid architecture.

## Main React Site

Responsible for:

- Tina's brand
- editorial content
- neighborhood content
- buyer/seller guidance
- relocation content
- GEO
- non-IDX lead generation

## IDX Broker

Responsible for:

- MLS property search
- search results
- listing details
- map search
- saved searches
- MLS property data
- property-specific lead workflows

This separation is intentional.

---

# Planned IDX Custom Domain

Preferred IDX hostname:

`homes.movinginmobile.com`

Current provider hostname:

`movinginmobile.idxbroker.com`

The custom domain is not yet considered complete until:

- DNS is configured
- SSL works
- IDX Broker recognizes the domain
- search pages work
- listing-detail pages work

---

# Planned IDX Wrapper

The planned wrapper file is:

`public/idx-wrapper.html`

Expected production URL:

`https://movinginmobile.com/idx-wrapper.html`

This should be a static HTML file.

It should not be implemented as a React-only route because IDX Broker Dynamic Wrapper requires server-returned HTML with wrapper markers.

---

# IDX Wrapper Purpose

The wrapper should provide:

- Moving in Mobile branding
- navigation
- Tina Rowe identity
- Keller Williams Mobile identity
- REALTOR® / Equal Housing branding where appropriate
- footer
- IDX insertion markers

The wrapper should visually connect IDX Broker pages to the main site.

---

# IDX SEO

Once the custom IDX environment is operational, the project must evaluate:

- IDX canonical URLs
- IDX sitemap
- Search Console handling
- listing-detail indexability
- saved-search indexability
- provider hostname references
- duplicate-content behavior

Do not assume vendor defaults are automatically optimal.

---

# IDX Analytics

The future IDX hostname will be:

`homes.movinginmobile.com`

Analytics should be tested to determine whether users moving between:

`movinginmobile.com`

and:

`homes.movinginmobile.com`

remain part of one coherent GA4 journey.

This has not yet been validated.

---

# IDX Security

The IDX Broker account includes API access.

Any private API key must remain private.

Do not place the key in:

- React
- public HTML
- browser-delivered JavaScript
- documentation
- public screenshots

If direct API use becomes necessary, a secure server-side architecture will be required.

---

# Engineering Manual

The authoritative living Engineering Manual is stored under:

`docs/`

in the GitHub repository.

Markdown documentation should be updated alongside meaningful application changes.

Historical DOCX or PDF versions may exist as release artifacts, but they are not the maintained source of truth.

---

# Documentation Philosophy

Documentation should reflect:

1. current repository implementation
2. live provider configuration
3. verified operational behavior

When historical documentation conflicts with the current system:

- verify the current implementation
- update the documentation

Do not preserve obsolete descriptions merely because they were once correct.

---

# Known Technical Debt

Important known technical debt includes:

- large `src/App.jsx`
- temporary `setPage()` compatibility layer
- no dedicated 404 page
- route-specific metadata not fully centralized
- sitemap expansion pending
- neighborhood route expansion pending
- limited automated testing
- historical GitHub Pages configuration
- duplicate or historical assets
- lead-system fragmentation after IDX
- future IDX analytics and SEO configuration

Technical debt should be addressed according to business value and risk.

---

# Current Development Priority

The immediate priority is:

Elm Street / IDX Broker integration

The preferred sequence is:

    Complete current documentation migration
        |
        v
    Build IDX wrapper
        |
        v
    Configure IDX custom domain
        |
        v
    Validate search/results/details
        |
        v
    Integrate IDX into main React site
        |
        v
    Configure lead flows
        |
        v
    Configure analytics
        |
        v
    Validate IDX SEO

---

# Work Intentionally Deferred

The following should generally remain secondary until IDX is stable:

- broad `App.jsx` refactor
- full component extraction
- major dependency upgrades
- historical asset cleanup
- GitHub Pages cleanup
- large GEO content expansion
- full neighborhood expansion
- automated test framework expansion

Do not introduce unnecessary architectural churn during the IDX milestone.

---

# Development Principles

Future work should follow these principles:

- make incremental changes
- validate locally
- build before deployment
- use staging before production
- document meaningful architecture changes
- avoid exposing secrets
- preserve working functionality while introducing replacements
- prefer provider-supported capabilities over unnecessary custom reimplementation
- prioritize user value and lead generation

---

# Release Philosophy

Material runtime changes should follow:

    Local
        |
        v
    Build
        |
        v
    Commit to staging
        |
        v
    Hostinger staging
        |
        v
    QA
        |
        v
    Merge to main
        |
        v
    Production QA

Documentation-only changes do not require a Hostinger staging deployment solely for storage.

---

# Current Project Baseline

As of August 12, 2026:

- Version 1.0 is live on Hostinger;
- staging and production environments are operational;
- React Router migration is complete;
- real browser routes are live;
- Hostinger SPA fallback is source-controlled;
- Formspree lead capture is active;
- GA4 is active;
- Search Console is verified;
- `robots.txt` and `sitemap.xml` are active;
- JSON-LD structured data is active;
- living documentation is being migrated into GitHub Markdown;
- Elm Street / IDX Broker approval is complete;
- the next major development milestone is the IDX wrapper and custom-domain integration.

## Related Documentation

See also:

- `02-system-architecture.md`
- `03-codebase-structure.md`
- `04-component-catalog.md`
- `05-state-and-navigation.md`
- `06-git-branching-workflow.md`
- `07-hostinger-deployment.md`
- `08-lead-generation.md`
- `09-seo-architecture.md`
- `14-geo-strategy.md`
- `15-content-strategy.md`
- `16-branding-design-system.md`
- `17-security-maintenance.md`
- `19-known-technical-debt.md`
- `20-decision-log.md`
- `21-future-roadmap.md`
- `22-developer-onboarding.md`