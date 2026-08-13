# Glossary

## Purpose

This glossary defines the terms, technologies, providers, environments, and project-specific language used throughout the Moving in Mobile Engineering Manual.

The goal is to reduce ambiguity and make the documentation easier for future developers and maintainers to follow.

---

# API

Application Programming Interface.

An API allows one system to request data or functionality from another system.

For Moving in Mobile, the most important planned API consideration is the IDX Broker API.

Private API credentials must not be exposed in client-side code.

---

# API Key

A credential used to authenticate access to an API.

The IDX Broker account has API access available.

The private IDX API key must remain server-side if it is ever used.

It must not be placed in:

- React source
- browser-delivered JavaScript
- `public/`
- `idx-wrapper.html`
- committed documentation

---

# BrowserRouter

A React Router component used by the application to support normal browser URLs.

Current use:

`src/main.jsx`

Conceptually:

    <BrowserRouter>
      <App />
    </BrowserRouter>

It allows routes such as:

- `/buyers`
- `/sellers`
- `/resources`

to behave as real browser paths.

---

# Canonical URL

A canonical URL tells search engines which URL should be treated as the preferred version of a page.

Example:

`https://movinginmobile.com/buyers`

The site uses route-aware canonicals.

The preferred hostname is:

`https://movinginmobile.com`

---

# CTA

Call to Action.

A CTA encourages the visitor to take a useful next step.

Examples include:

- Search Homes
- Contact Tina
- Request a Home Valuation
- Get Listing Alerts
- View Fairhope Homes

---

# DNS

Domain Name System.

DNS connects domain names such as:

`movinginmobile.com`

to the appropriate hosting or service infrastructure.

DNS will be used to configure the planned IDX hostname:

`homes.movinginmobile.com`

---

# DOCX

Microsoft Word document format.

The original Version 1.0 Engineering Manual was created as DOCX artifacts.

Those documents are now historical release artifacts.

The authoritative living manual is maintained in:

`docs/*.md`

inside the repository.

---

# Dynamic Wrapper

An IDX Broker feature that allows IDX pages to be placed inside a custom website shell.

IDX Broker retrieves HTML from a configured wrapper URL and inserts IDX content between specific wrapper markers.

The planned Moving in Mobile Dynamic Wrapper source is:

`https://movinginmobile.com/idx-wrapper.html`

---

# Eastern Shore

A geographic area along the eastern side of Mobile Bay in Baldwin County, Alabama.

For Moving in Mobile, important Eastern Shore markets include:

- Fairhope
- Daphne
- Spanish Fort

The Eastern Shore is a major content, lead-generation, SEO, and GEO focus.

---

# Elm Street

The provider associated with Tina Rowe's IDX Broker account.

In this manual, Elm Street / IDX Broker generally refers to the MLS search and property-data platform being integrated into Moving in Mobile.

---

# Environment Variable

A configuration value provided to an application through the runtime or build environment.

Environment variables may contain:

- public configuration
- secrets

A Vite environment variable exposed to browser code must be considered public.

Do not use browser-exposed environment variables for private IDX API credentials.

---

# `.env`

A conventional file used for environment variables.

Treat `.env` as potentially sensitive.

Real `.env` files should normally not be committed.

Use:

`.env.example`

for placeholder configuration documentation where appropriate.

---

# Formspree

The service currently used for non-IDX lead forms.

Existing Formspree-based flows include:

- Contact
- Buyer inquiry
- Seller inquiry
- Home valuation
- New Listing Alert

IDX Broker will later introduce separate property-specific lead flows.

---

# GA4

Google Analytics 4.

GA4 is the analytics platform used by Moving in Mobile.

It tracks route-level page views and can later support:

- lead events
- IDX engagement
- neighborhood engagement
- conversion analysis

Personally identifiable information must not be sent to GA4.

---

# GEO

Generative Engine Optimization.

GEO is the strategy of making site content understandable and useful to:

- AI assistants
- generative search systems
- answer engines
- search engines that generate summaries

The Moving in Mobile GEO strategy emphasizes:

- factual local content
- clear answers
- strong geographic context
- original expertise
- internal linking
- structured data

---

# Git

The distributed version-control system used for the codebase.

Git tracks source changes and supports:

- branches
- commits
- merges
- rollback
- history

---

# GitHub

The remote source-control platform used for the Moving in Mobile repository.

GitHub is the authoritative source for the living codebase and Markdown Engineering Manual.

---

# `main`

The production branch.

Code merged into:

`main`

is intended to represent production-ready work.

Hostinger production deploys from this branch.

---

# `staging`

The primary development and integration branch.

Normal development should begin here.

Runtime changes are validated before being promoted to:

`main`

---

# `redesign-v2`

The Git branch watched by Hostinger for the staging deployment.

It is fed from:

`staging`

using:

    git push origin staging:redesign-v2

Do not normally develop directly on `redesign-v2`.

---

# Hostinger

The web-hosting provider for Moving in Mobile.

Hostinger currently provides:

- production hosting
- staging hosting
- SSL
- Git-based deployment
- domain-related hosting configuration
- server-side rewrite behavior

---

# Hostinger SPA Fallback

The server behavior required to support React Router direct URLs.

When a browser requests:

`/buyers`

Hostinger must serve:

`index.html`

rather than returning a 404.

This is implemented through:

`public/.htaccess`

---

# `.htaccess`

An Apache-style configuration file used by Hostinger for rewrite behavior.

Current project location:

`public/.htaccess`

It:

- protects Hostinger's `.builds` path
- serves real files normally
- serves real directories normally
- falls application routes back to `index.html`

---

# HTTP

Hypertext Transfer Protocol.

The non-encrypted version of web traffic.

The preferred public site uses HTTPS.

HTTP URL variants may still appear in Search Console as redirected URLs.

---

# HTTPS

Hypertext Transfer Protocol Secure.

The encrypted version of HTTP.

The preferred production site is:

`https://movinginmobile.com`

The future IDX hostname should also use HTTPS:

`https://homes.movinginmobile.com`

---

# IDX

Internet Data Exchange.

IDX allows approved real-estate professionals to display MLS listing data on their websites.

For this project, IDX Broker will provide live MLS property functionality.

---

# IDX Broker

The MLS search and property-data platform being integrated into Moving in Mobile.

Planned responsibilities include:

- property search
- search results
- listing details
- map search
- saved searches
- listing alerts
- property inquiries
- showing requests
- market reports
- listing widgets

---

# IDX Broker API

An API provided by IDX Broker.

The API may provide access to IDX data or configuration.

If the project uses the private API directly in the future, it will require secure server-side handling.

---

# IDX Broker Default Hostname

The provider-generated hostname currently associated with the account:

`movinginmobile.idxbroker.com`

This is not the preferred long-term customer-facing hostname.

---

# IDX Custom Domain

A custom hostname used to present IDX pages under the Moving in Mobile domain family.

Preferred hostname:

`homes.movinginmobile.com`

This is planned but must be considered incomplete until DNS, SSL, and IDX configuration are all validated.

---

# IDX Wrapper

The custom site shell used to make IDX Broker pages visually match Moving in Mobile.

Planned file:

`public/idx-wrapper.html`

Expected production URL:

`https://movinginmobile.com/idx-wrapper.html`

---

# IDX Wrapper Markers

Special markers in the static wrapper HTML that tell IDX Broker where to insert its generated page content.

The exact marker syntax should follow current IDX Broker requirements.

These markers must exist in server-returned HTML.

---

# Advanced Search

An IDX Broker search page that provides detailed property-search criteria.

Current known URL under the provider hostname:

`https://movinginmobile.idxbroker.com/idx/search/advanced`

After custom-domain configuration, the user-facing version should use the preferred IDX hostname where supported.

---

# AI Smart Search

An IDX Broker search capability that allows a more natural-language-style search experience.

It is available in Tina's IDX Broker account.

Its usefulness should be evaluated based on user experience rather than enabled automatically.

---

# Map Search

An IDX Broker search interface centered on a map.

It allows users to browse inventory geographically.

Map Search should be tested carefully on mobile.

---

# Listing Detail

An IDX Broker page representing one MLS property.

Listing-detail pages are likely to be especially important for:

- property engagement
- inquiries
- showing requests
- IDX SEO
- analytics

---

# Search Results

IDX-generated pages showing properties matching selected criteria.

Search Results are provider-managed and should not be recreated unnecessarily inside React.

---

# Saved Link

An IDX Broker feature that stores a predefined search or criteria-based URL.

Saved Links can be used for searches such as:

- Fairhope homes
- Daphne homes
- waterfront properties
- new construction
- Gulf Shores condos

They are expected to be useful for connecting editorial neighborhood content to live MLS inventory.

---

# Saved Search

A property search saved by a user for future use.

Saved searches may support automated listing alerts and user registration.

Do not confuse provider-created Saved Links with user-created Saved Searches.

---

# Featured Showcase

An IDX Broker widget used to display selected or featured property inventory.

This is a potential future replacement for the current Featured Listings presentation.

---

# Featured Slide Show

An IDX Broker widget that displays featured listings in slideshow form.

It is one of the available widget options.

Use only if it fits the site's design and performance goals.

---

# Sold/Pending Showcase

An IDX Broker widget or page capability that may display sold or pending listing information.

This may eventually support seller-oriented content or market context.

---

# Home Valuation

A lead-generation capability focused on property owners interested in the value of their home.

The current React site already has a Formspree-based valuation flow.

IDX Broker also offers Home Valuation functionality.

The two should be compared before replacing the current workflow.

---

# Schedule Showing

An IDX Broker feature allowing a user to request a property showing.

A showing request should not be presented as automatically confirmed unless the system genuinely confirms appointment availability.

---

# User Signup / Login

IDX Broker account functionality for property-search users.

It may support:

- saved searches
- saved properties
- alerts

User credentials should remain managed by IDX Broker.

---

# XML Sitemap

A machine-readable file listing important public URLs.

The main site sitemap is:

`public/sitemap.xml`

Production URL:

`https://movinginmobile.com/sitemap.xml`

IDX Broker may later provide a separate IDX sitemap.

---

# `robots.txt`

A crawler directive file.

Source:

`public/robots.txt`

Production URL:

`https://movinginmobile.com/robots.txt`

It is not a security mechanism.

---

# Search Console

Google Search Console.

It is used to monitor:

- indexing
- crawl behavior
- search queries
- sitemap processing
- canonical behavior
- structured-data issues

---

# URL Inspection

A Search Console tool used to inspect how Google sees a specific production URL.

Examples:

- homepage
- Buyers
- Sellers
- future neighborhood pages

---

# Request Indexing

A Search Console action that asks Google to recrawl or reconsider a page.

It does not guarantee indexing.

It should not be repeatedly used on unchanged pages.

---

# Rich Results

Enhanced Google search-result treatments that may be supported by certain structured-data types.

The site's current structured data has previously passed Rich Results validation.

Passing validation does not guarantee a Rich Result will appear.

---

# JSON-LD

JavaScript Object Notation for Linked Data.

The structured-data format used by Moving in Mobile.

Primary implementation:

`src/components/StructuredData.jsx`

---

# Structured Data

Machine-readable information used to describe entities, pages, and relationships.

Potential entities include:

- Tina Rowe
- RealEstateAgent
- WebSite
- WebPage
- BreadcrumbList
- VideoObject

Structured data must match real visible content.

---

# Schema.org

The vocabulary used by many structured-data systems.

Schema.org defines types and properties such as:

- Person
- WebPage
- RealEstateAgent
- VideoObject
- BreadcrumbList

---

# RealEstateAgent

A Schema.org type that may be used to describe a real-estate professional or business entity where appropriate.

It should accurately reflect Tina Rowe's relationship to Keller Williams Mobile.

---

# BreadcrumbList

A structured-data type representing a page's hierarchical location.

Example:

    Home
    >
    Neighborhoods
    >
    Fairhope

This may become useful when individual neighborhood routes are introduced.

---

# VideoObject

A structured-data type for video content.

It may become useful for individual Rowe Report video pages.

---

# SPA

Single-Page Application.

The Moving in Mobile React site is a SPA.

The browser loads a main application shell and React updates content as users navigate.

React Router provides real browser URLs within this architecture.

---

# SPA Routing

Client-side routing within a Single-Page Application.

The Moving in Mobile site uses React Router for this purpose.

---

# React

The JavaScript UI library used to build the application.

---

# React DOM

The React package used to render the React application into the browser DOM.

---

# React Router

The routing library used by Moving in Mobile.

It provides:

- route-aware navigation
- browser history
- `NavLink`
- `useNavigate`
- `useLocation`

---

# `NavLink`

A React Router link component that can recognize whether its destination is currently active.

Moving in Mobile uses `NavLink` for primary Header navigation.

---

# `Link`

A React Router component used for standard internal links.

Future component cleanup should prefer `Link` or `NavLink` over legacy page-key navigation where appropriate.

---

# `useNavigate()`

A React Router hook used for programmatic navigation.

It should be used where navigation must occur through application logic rather than through a normal link.

---

# `useLocation()`

A React Router hook that exposes the current browser location.

Moving in Mobile uses it to determine the current route.

---

# `setPage()`

A legacy-compatible navigation function retained temporarily after the React Router migration.

Example:

    setPage("buyers");

It now converts a page key into a real React Router path.

It is transitional technical debt and should eventually be removed.

---

# `PAGE_ROUTES`

The current route-key mapping used in `src/App.jsx`.

Conceptually:

    home          → /
    about         → /about
    buyers        → /buyers
    sellers       → /sellers
    neighborhoods → /neighborhoods
    rowereport    → /rowe-report
    resources     → /resources
    contact       → /contact

---

# 404

HTTP status meaning:

Not Found.

The site does not yet have a dedicated 404 page.

Unknown routes currently remain known technical debt.

---

# Vite

The build tool used by Moving in Mobile.

Vite provides:

- local development server
- development hot reload
- production build
- asset processing

---

# `npm run dev`

The command used to start the local Vite development server.

Typical local URL:

`http://localhost:5173`

---

# `npm run build`

The command used to create a production build.

Output is written to:

`dist/`

---

# `dist/`

The generated production-build directory.

It is not the source of truth.

Do not edit `dist/` directly as the normal way to modify the site.

---

# `public/`

The Vite directory used for files copied directly into the production build.

Important files include:

- `.htaccess`
- `robots.txt`
- `sitemap.xml`
- public images
- future `idx-wrapper.html`

---

# `src/`

The primary React source directory.

Most application behavior belongs here.

---

# `src/App.jsx`

The main application orchestration file.

It currently contains substantial responsibility for:

- page rendering
- routing compatibility
- forms
- modal behavior
- analytics metadata
- canonical handling
- major UI components

Its size is known technical debt.

---

# `src/main.jsx`

The React application entry point.

It wraps the application in `BrowserRouter`.

---

# `index.html`

The Vite HTML application shell.

It contains the root mount point and may contain sitewide scripts such as GA4 initialization.

Hostinger's SPA fallback ultimately serves this file for nested React routes.

---

# Tailwind CSS

The utility-first CSS framework used by the site.

It supports responsive styling and component-level visual design.

---

# Responsive Design

A design approach that adapts layouts to different screen sizes.

Moving in Mobile should work well on:

- mobile
- tablet
- laptop
- wide desktop

---

# Mobile Optimization

The process of ensuring the site is usable and visually appropriate on phones.

This is especially important for:

- Header
- forms
- modals
- hero
- IDX search
- IDX map
- listing details

---

# The Rowe Report

Tina Rowe's video and editorial content brand.

The Rowe Report supports:

- local expertise
- video content
- SEO
- GEO
- social distribution
- future content expansion

---

# Moving in Mobile

The primary public-facing site and brand for Tina Rowe's real-estate marketing platform.

---

# Tina Rowe

The real-estate professional and client represented by the Moving in Mobile website.

---

# Keller Williams Mobile

Tina Rowe's brokerage.

Brokerage identity should remain visible and accurate where required.

---

# REALTOR®

A professional membership mark.

Use must follow applicable REALTOR® branding rules.

It should not be treated as a generic synonym for all real-estate agents.

---

# Equal Housing

Branding or compliance identity related to fair housing.

Equal Housing marks should remain visible and legible where required.

---

# Fair Housing

Federal and related legal requirements prohibiting discriminatory housing practices.

Moving in Mobile neighborhood and real-estate content must avoid steering and discriminatory language.

---

# Steering

Improperly directing buyers toward or away from neighborhoods based on protected characteristics.

Website content should describe objective property and location characteristics instead.

---

# PII

Personally Identifiable Information.

Examples include:

- name
- email
- phone number
- personal property address
- private lead information

PII must not be sent to GA4.

---

# Lead

A person who provides contact information or otherwise expresses meaningful interest in Tina's real-estate services.

Examples include:

- property inquiry
- home valuation request
- contact submission
- saved search registration
- showing request

---

# Lead Source

The page, CTA, campaign, or system that generated a lead.

Examples:

- Buyers page
- Home Valuation
- Fairhope neighborhood page
- IDX listing detail
- Facebook campaign

Lead source should be preserved where practical.

---

# Lead Attribution

The process of identifying where a lead came from.

Useful attribution helps evaluate which:

- pages
- campaigns
- CTAs
- content
- IDX flows

generate business value.

---

# Conversion

A meaningful business action completed by a visitor.

Potential conversions include:

- form submission
- property inquiry
- valuation request
- saved search
- showing request

---

# GA4 Key Event

A GA4 event designated as especially important to the business.

Historically known as a conversion.

Potential examples include:

- contact form submission
- IDX inquiry
- home valuation request

---

# UTM Parameters

Tracking parameters added to campaign URLs.

Common examples:

- `utm_source`
- `utm_medium`
- `utm_campaign`

They help GA4 identify traffic sources.

---

# Open Graph

Metadata used by social platforms to control how a page appears when shared.

Future page-specific SEO work may include:

- title
- description
- image

Open Graph metadata is not yet the primary focus of the current IDX milestone.

---

# Meta Description

A page-level HTML description that summarizes the page.

Page-specific meta descriptions remain part of future SEO work.

---

# Page Title

The document title shown in the browser tab and often used by search engines.

The application currently updates page titles based on route.

---

# Internal Link

A link from one page of Moving in Mobile to another.

Examples:

- Fairhope guide → Buyers page
- Buyers page → Search Homes
- Rowe Report → Neighborhood page

Strong internal linking supports users, SEO, and GEO.

---

# External Link

A link from Moving in Mobile to another website or provider.

Examples include:

- social networks
- YouTube
- local resources
- IDX vendor endpoints during setup

---

# Neighborhood Page

A future editorial page focused on a particular community.

Examples:

- Fairhope
- Daphne
- Spanish Fort

Neighborhood pages should contain original local content, not merely IDX results.

---

# Editorial Content

Original content created to explain, educate, compare, or guide.

Examples include:

- neighborhood guides
- relocation guides
- buyer articles
- seller articles
- Rowe Report summaries
- market commentary

---

# IDX Content

Property-related content generated from MLS data through IDX Broker.

Examples include:

- listings
- search results
- listing details
- map search

IDX content should complement editorial content.

---

# Market Report

A recurring page, article, or report summarizing real-estate market conditions.

Potential metrics include:

- inventory
- pricing
- sales
- days on market

Tina's interpretation should add value beyond the raw statistics.

---

# Relocation Content

Content designed to help people moving to:

- Mobile
- Baldwin County
- Fairhope
- Eastern Shore communities

This is a major long-term content and lead-generation category.

---

# Content Hub

A central page that organizes related content.

Example:

    Moving to Baldwin County
        |
        +--> Fairhope
        +--> Daphne
        +--> Spanish Fort
        +--> Buyers
        +--> Search Homes

---

# Content Cannibalization

When multiple pages compete for the same search intent because they contain very similar content.

The content strategy should avoid creating multiple nearly identical pages for the same topic.

---

# Evergreen Content

Content that remains useful for a long time.

Examples:

- neighborhood geography
- buyer process
- general relocation information

---

# Time-Sensitive Content

Content that can become stale quickly.

Examples:

- market statistics
- insurance rules
- interest rates
- inventory
- active development projects

---

# Search Intent

The purpose behind a user's search.

Examples include:

- informational
- comparison
- transactional
- navigational

Moving in Mobile content should match actual user intent.

---

# Keyword Stuffing

Unnaturally repeating search phrases in content in an attempt to manipulate rankings.

This is not part of the Moving in Mobile SEO or GEO strategy.

---

# Backlink

A link from another website to Moving in Mobile.

Relevant, legitimate backlinks may strengthen authority.

Low-quality paid backlink schemes should be avoided.

---

# Google Business Profile

Google's business-profile system for local businesses.

The website, structured data, and Google Business Profile should maintain consistent business identity.

---

# Rich Results Test

A Google tool used to test structured data for supported rich-result eligibility.

Moving in Mobile structured data has previously passed validation.

---

# Search Console Property

A website or domain configuration monitored through Google Search Console.

The exact property configuration matters when determining future coverage for:

`homes.movinginmobile.com`

---

# Sitemap Submission

The act of providing a sitemap URL to Search Console.

The main sitemap has already been submitted.

The future IDX sitemap should be evaluated separately after the custom domain is active.

---

# Indexing

The process by which a search engine includes a page in its searchable index.

A technically correct page is not guaranteed to be indexed.

---

# Crawling

The process by which a search-engine crawler requests and reads URLs.

Crawling and indexing are related but distinct.

---

# `noindex`

A directive telling search engines not to index a page.

It is different from blocking crawling through `robots.txt`.

---

# Redirect

An HTTP response that sends users or crawlers from one URL to another.

Search Console may correctly report an alternate URL as:

`Page with redirect`

when it redirects to the preferred production URL.

---

# `www`

A common hostname prefix.

The preferred Moving in Mobile hostname does not use `www`.

Preferred:

`https://movinginmobile.com`

---

# Cloudflare

A DNS/CDN/security platform that was considered for stronger `www` redirect control.

It was intentionally deferred because the observed Search Console hostname warnings did not justify adding infrastructure complexity solely for that purpose.

---

# Staging Environment

The non-production environment used to validate changes.

URL:

`https://staging.movinginmobile.com`

It should not be treated as the public canonical website.

---

# Production Environment

The live customer-facing environment.

URL:

`https://movinginmobile.com`

---

# Local Environment

The developer's local machine.

Typical development URL:

`http://localhost:5173`

Local URLs must not appear in production metadata.

---

# Smoke Test

A focused test intended to verify that the most important functionality works after deployment.

Examples include:

- homepage
- navigation
- nested route refresh
- form
- `robots.txt`
- sitemap
- IDX search

---

# Regression

A feature or behavior that previously worked but breaks because of a new change.

Regression testing checks adjacent functionality after modifications.

---

# QA

Quality Assurance.

The process of validating application behavior before and after release.

---

# Release

A set of validated changes promoted to production.

---

# Deployment

The technical process of placing a build or commit into a runtime environment.

Deployment and release readiness are related but not identical.

---

# Rollback

Returning production to a known-good state after a problematic release.

Rollback should be controlled through Git and deployment workflow where practical.

---

# Technical Debt

Known architectural or maintenance work intentionally left for later.

Current examples include:

- large `App.jsx`
- temporary `setPage()` compatibility
- no dedicated 404
- sitemap expansion
- metadata centralization
- historical GitHub Pages configuration

---

# Living Documentation

Documentation that is maintained alongside the codebase and updated as the system changes.

For Moving in Mobile:

`docs/*.md`

is the authoritative living Engineering Manual.

---

# Historical Release Artifact

A fixed document or archive representing the system at a particular point in time.

Examples include:

- Version 1.0 DOCX manual
- PDF manual
- source ZIP snapshot

These are not the living source of truth.

---

# Source of Truth

The authoritative representation of a type of information.

For Moving in Mobile:

## Application Behavior

Current repository source.

## External Provider Configuration

Current live provider configuration.

## Engineering Documentation

Current repository Markdown under:

`docs/`

---

# Current Glossary Baseline

As of August 12, 2026:

- React Router terminology reflects the current real-route architecture;
- `/buyers`, `/sellers`, and other primary paths are real browser routes;
- `redesign-v2` means the Hostinger staging deployment branch;
- `setPage()` means the temporary React Router compatibility layer, not page-state routing;
- IDX refers to Elm Street / IDX Broker MLS functionality;
- `homes.movinginmobile.com` is the preferred future IDX hostname;
- `idx-wrapper.html` means the planned static IDX Dynamic Wrapper source;
- Saved Link and Saved Search are distinct IDX concepts;
- GEO means Generative Engine Optimization;
- GitHub Markdown under `docs/` is the living Engineering Manual.

## Related Documentation

See also:

- `01-project-overview.md`
- `02-system-architecture.md`
- `03-codebase-structure.md`
- `05-state-and-navigation.md`
- `06-git-branching-workflow.md`
- `07-hostinger-deployment.md`
- `09-seo-architecture.md`
- `14-geo-strategy.md`
- `17-security-maintenance.md`
- `20-decision-log.md`
- `21-future-roadmap.md`
- `22-developer-onboarding.md`
- `25-troubleshooting.md`