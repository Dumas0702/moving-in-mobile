# Component Catalog

## Purpose

This document catalogs the major React components and UI responsibilities in the Moving in Mobile website.

It is intended to help developers understand:

- which components already exist
- which responsibilities are still embedded in `src/App.jsx`
- where shared UI should live
- how navigation and page rendering currently work
- which components are especially sensitive to routing, SEO, lead generation, or future IDX integration

This is a structural reference, not a substitute for reading the current source code.

---

# Current Component Architecture

The application is currently functional but only partially modularized.

Some reusable components are extracted under:

`src/components/`

while many major page and layout components remain defined inside:

`src/App.jsx`

This is known technical debt.

The current strategy is to avoid a large refactor until the higher-priority IDX integration is stable.

---

# `App`

Location:

`src/App.jsx`

## Role

`App` is the primary application orchestration component.

It currently coordinates:

- React Router state
- route-to-page mapping
- navigation compatibility
- page rendering
- analytics page tracking
- document titles
- canonical URLs
- global modal state
- lead-generation behavior
- global layout relationships

Because of these responsibilities, changes to `App` should be considered high impact.

## Routing Responsibilities

`App` uses:

- `useLocation()`
- `useNavigate()`

from React Router.

The current page is derived from:

`location.pathname`

rather than from a React page-state variable.

## Compatibility Navigation

A transitional function still exposes behavior similar to:

    setPage("buyers");

Internally, this resolves the page key to a real route and uses React Router navigation.

This compatibility mechanism exists to avoid rewriting every legacy CTA during the routing migration.

It should eventually be retired.

---

# `Header`

Current location:

`src/App.jsx`

## Role

The Header is the primary sitewide navigation component.

It includes:

- The Rowe Report logo
- desktop navigation
- mobile navigation
- active-route highlighting
- Rowe Report CTA
- mobile menu behavior

## Navigation Technology

The Header uses React Router:

`NavLink`

for primary navigation.

Current route destinations include:

- `/`
- `/about`
- `/sellers`
- `/buyers`
- `/neighborhoods`
- `/resources`
- `/contact`
- `/rowe-report`

## Important Behavior

The logo links to:

`/`

Primary navigation should remain semantic links rather than buttons that merely change internal state.

## Future Direction

The Header is a strong candidate for extraction into:

`src/components/layout/Header.jsx`

after the IDX milestone or when another major layout change makes extraction worthwhile.

---

# Mobile Navigation

Current location:

primarily within the Header implementation in `src/App.jsx`

## Role

Provides navigation at smaller viewport sizes.

## Responsibilities

- menu open/close state
- mobile route links
- Rowe Report CTA
- active-route styling
- responsive layout

## Testing Requirements

Any Header change should validate:

- desktop navigation
- mobile navigation
- open/close behavior
- route navigation
- browser Back/Forward
- no horizontal overflow

---

# `Footer`

Current location:

`src/App.jsx`

## Role

Provides sitewide footer content.

It may include:

- Tina Rowe identity
- brokerage information
- contact information
- social links
- REALTOR® identity
- Equal Housing identity
- legal or compliance text

## Risk

Footer changes may affect:

- sitewide branding
- compliance
- IDX wrapper consistency
- contact information

## Future Direction

The Footer should eventually be extracted into:

`src/components/layout/Footer.jsx`

particularly because the IDX wrapper will need to visually reproduce the same sitewide footer.

---

# `StructuredData`

Location:

`src/components/StructuredData.jsx`

## Role

Renders JSON-LD structured data for search-engine consumption.

## Responsibilities

May include structured representation of:

- Tina Rowe
- real-estate business identity
- website entity
- business contact information
- related URLs

## Rules

Structured data must reflect real, visible, supportable information.

Do not add:

- fabricated ratings
- fake review counts
- unsupported awards
- claims that contradict visible content

## Testing

Changes should be validated using an appropriate structured-data validator or Google Rich Results tool where applicable.

---

# `StagingIndicators`

Location:

`src/components/StagingIndicators.jsx`

## Role

Provides a visible indicator that the site is running in the staging environment.

## Purpose

Helps prevent accidental confusion between:

`https://staging.movinginmobile.com`

and:

`https://movinginmobile.com`

## Testing

Verify:

- staging indicator appears where expected
- production does not display staging-only indicators

---

# Home Page

Current location:

`src/App.jsx`

## Role

The homepage is the primary brand and lead-generation entry point.

## Major Content Areas

The homepage currently includes or has included elements such as:

- Tina Rowe hero
- Mobile skyline background
- primary brand messaging
- CTA buttons
- Featured Listings
- testimonials
- neighborhoods
- buyer and seller pathways
- social links
- contact call to action
- brokerage/compliance branding

## IDX Impact

The homepage is expected to receive selected IDX functionality later.

Potential additions include:

- property search entry point
- Featured Listings widget
- neighborhood search links
- listing-alert CTA

IDX should enhance the homepage without turning it into a full IDX search application.

---

# Hero Section

Current location:

Home page implementation in `src/App.jsx`

## Role

Provides the primary visual identity and first-screen message.

## Current Design Direction

Important established design choices include:

- Mobile, Alabama skyline background
- Tina Rowe image on the right
- primary headline on the left
- clean Keller Williams-aligned styling
- strong responsive behavior

The hero has undergone substantial refinement.

Avoid casually reverting to older configurations such as:

- oversized empty space
- duplicated hero logo
- obscured Tina imagery
- heavy dark overlays

---

# About Page

Route:

`/about`

Current location:

`src/App.jsx`

## Role

Introduces Tina Rowe and communicates:

- local connection
- professional background
- trusted-advisor positioning
- client-oriented approach

## Future Opportunities

Potential future enhancements include:

- expanded schema context
- additional credibility elements
- links to reviews
- Rowe Report references
- local expertise content

---

# Buyers Page

Route:

`/buyers`

Current location:

`src/App.jsx`

## Role

Supports buyer education and lead generation.

## Potential Content and Actions

May include:

- buyer process explanation
- buyer guide
- new listing alerts
- relocation resources
- property search CTA
- contact CTA

## IDX Impact

This page will become an important entry point into IDX search.

Likely future connections include:

- Advanced Search
- saved searches
- listing alerts
- neighborhood search links

---

# Sellers Page

Route:

`/sellers`

Current location:

`src/App.jsx`

## Role

Supports seller education and lead generation.

## Potential Content and Actions

May include:

- seller process
- home preparation
- valuation CTA
- contact CTA
- seller guide
- local market positioning

## IDX Relationship

IDX is less central here than on Buyers, but market reports and sold/pending data may eventually support seller content.

---

# Neighborhoods Page

Route:

`/neighborhoods`

Current location:

`src/App.jsx`

## Role

Introduces communities served by Tina Rowe.

Potential locations include:

- Fairhope
- Daphne
- Spanish Fort
- Foley
- Gulf Shores
- Orange Beach
- Silverhill
- Robertsdale

## Future Architecture

This page is expected to evolve into dedicated neighborhood routes.

Examples:

    /neighborhoods/fairhope
    /neighborhoods/daphne
    /neighborhoods/spanish-fort

Each neighborhood page should eventually combine:

- original editorial content
- local expertise
- lifestyle information
- relevant IDX saved searches
- property discovery links

---

# Rowe Report Page

Route:

`/rowe-report`

Current location:

`src/App.jsx`

## Role

Supports Tina's video and media content under The Rowe Report brand.

## Current Content

The page includes Rowe Report content and embedded or linked YouTube videos.

## Future Opportunities

Potential enhancements include:

- additional episodes
- article summaries
- video structured data
- topic-specific landing pages
- internal links to neighborhood and IDX content

---

# Resources Page

Route:

`/resources`

Current location:

`src/App.jsx`

## Role

Provides local service-provider information and useful homeowner resources.

## Current Content

Categories have included:

- appliance repair
- appraisers
- electricians
- estate sales
- fencing
- handyman
- HVAC
- home inspection
- home warranty
- insurance
- lenders
- painters
- pest control
- plumbers
- roofers
- surveyors
- title/closing
- trash/junk removal
- tree service
- window cleaning

Phone numbers are intended to be clickable.

## Content Rule

Avoid wording that unintentionally implies an endorsement or legal guarantee.

Historical "preferred" language was removed for this reason.

---

# Contact Page

Route:

`/contact`

Current location:

`src/App.jsx`

## Role

Provides direct lead capture and contact options.

May include:

- contact form
- phone
- email
- social links
- brokerage information

## Lead Provider

Existing non-IDX lead forms use Formspree.

---

# Lead Forms

Current location:

primarily within `src/App.jsx`

## Role

Capture prospect information for:

- contact requests
- buyer inquiries
- seller inquiries
- home valuation
- listing alerts
- other lead-generation actions

## Current Provider

Formspree

## Important Behavior

Forms should preserve useful source information so Tina can understand where a lead originated.

## Testing

When a form changes, verify:

- validation
- request payload
- source metadata
- success state
- error state
- provider receipt
- downstream delivery

---

# Home Valuation Lead Flow

Current location:

Seller-related UI in `src/App.jsx`

## Role

Captures seller prospects interested in estimating property value.

## Future Considerations

Potential future integration may involve:

- IDX Broker Home Valuation
- CRM routing
- market-report follow-up

Do not replace the current working lead flow until the new workflow has been tested end to end.

---

# New Listing Alert

Current location:

lead modal/form behavior in `src/App.jsx`

## Role

Captures users interested in receiving new-property notifications.

## Historical Behavior

The modal was intentionally designed to be more prominent and centered.

At one stage, interaction required addressing the modal before proceeding.

## IDX Future State

IDX Broker can provide native:

- saved searches
- account registration
- property alerts

When IDX is integrated, determine whether the existing Formspree listing-alert flow should:

- remain
- redirect into IDX
- supplement IDX
- be retired

Do not maintain duplicate lead workflows without a clear reason.

---

# Lead Modal

Current location:

`src/App.jsx`

## Role

Provides prominent lead-capture behavior.

## Responsibilities

- open state
- close state
- form rendering
- success/error handling
- responsive presentation

## Risks

Modal changes may affect:

- conversion
- usability
- mobile behavior
- route transitions

Test carefully after routing or form modifications.

---

# Custom Navigation Events

Current location:

`src/App.jsx`

## Role

Legacy application behavior may use custom events such as a `navigatePage` event to initiate page changes.

These remain transitional mechanisms.

## Future Direction

As navigation is standardized around React Router, custom navigation events should be reviewed and removed where no longer necessary.

Do not remove them until all callers have been identified.

---

# Testimonials Component / Section

Current location:

Home page implementation in `src/App.jsx`

## Role

Displays Tina's customer testimonials.

## Established Behavior

The site includes multiple Google reviews displayed in a continuously scrolling presentation.

Historical requirements included:

- seven reviews
- five-star reviews
- continuous right-to-left movement
- hover pause

## Risks

Changes may affect:

- animation
- mobile layout
- accessibility
- perceived credibility

If testimonial data is later connected dynamically, structured-data rules must still be observed.

---

# Featured Listings Section

Current location:

Home page implementation in `src/App.jsx`

## Role

Provides property-oriented credibility and encourages property exploration.

## Current State

The section currently uses site-controlled presentation rather than a complete live IDX implementation.

## Future State

This is a strong candidate for an IDX Broker widget.

Potential options include:

- Featured Showcase
- Featured Slide Show
- custom curated search output

The widget should be selected based on design compatibility and lead-generation value.

---

# Neighborhood Cards / Section

Current location:

Home page and/or Neighborhoods page implementation in `src/App.jsx`

## Role

Provides entry points into community-specific content.

## Future IDX Integration

Each neighborhood CTA may eventually connect to:

- editorial neighborhood page
- IDX saved search
- both

Preferred model:

    Neighborhood editorial page
            |
            +--> Homes for sale
            +--> New construction
            +--> Relevant buyer resources
            +--> Contact Tina

This preserves original content while giving users direct access to MLS inventory.

---

# Floating Contact Widget

Current location:

`src/App.jsx`

## Role

Keeps a contact pathway visible as users browse the site.

## Testing Requirements

Verify:

- desktop placement
- mobile placement
- no content obstruction
- contact behavior
- z-index interaction with modals

---

# Social Links

Current location:

multiple page/layout components

## Role

Connect users to Tina's social channels.

Supported/expected networks have included:

- Facebook
- YouTube
- Instagram
- LinkedIn

Verify links before changing icons or URLs.

---

# Compliance Components and Assets

Current location:

various layout and page components

## Content

May include:

- Keller Williams Mobile branding
- REALTOR® marks
- Equal Housing marks
- brokerage text

## Importance

These elements should not be treated as decorative-only assets.

Changes should consider brokerage and advertising compliance requirements.

---

# Images and Media

Most public-facing images are loaded from:

`public/`

Important examples include:

- Tina headshots
- Tina half-body hero image
- The Rowe Report logos
- Keller Williams logos
- neighborhood images
- van image
- REALTOR® / Equal Housing assets
- skyline imagery

## Rule

Before replacing an image:

1. identify all references;
2. verify exact filename;
3. check responsive use;
4. validate staging.

---

# Route Metadata Logic

Current location:

`src/App.jsx`

## Role

Maps page identity to values used for:

- document title
- canonical URL
- GA4 page tracking

## Technical Debt

Metadata and analytics configuration are currently too closely coupled.

Future direction should move this into a centralized configuration.

Potential future file:

`src/config/metadata.js`

---

# Analytics Page View Logic

Current location:

`src/App.jsx`

## Role

Sends GA4 `page_view` events when the route changes.

## Dependencies

Relies on:

- current route
- page metadata
- `window.gtag`

## Risk

Changes to routing may introduce:

- missing page views
- duplicate page views
- incorrect path values

Test analytics whenever navigation architecture changes.

---

# Canonical Link Logic

Current location:

`src/App.jsx`

## Role

Updates or creates:

`<link rel="canonical">`

based on the current page.

## Expected Behavior

Examples:

    /buyers
    → https://movinginmobile.com/buyers

    /sellers
    → https://movinginmobile.com/sellers

The old behavior where all content effectively pointed to the homepage canonical is obsolete.

---

# IDX Components — Planned

IDX is the next major component expansion.

The initial implementation should favor provider functionality rather than creating a custom MLS application.

---

# Planned IDX Wrapper

Planned location:

`public/idx-wrapper.html`

## Role

Provides the visual shell around IDX Broker pages.

Expected contents include:

- Moving in Mobile header
- navigation
- branding
- footer
- IDX insertion markers
- compliance information

This is static HTML, not a React component.

---

# Planned IDX Search Entry Component

Potential location:

`src/components/`

or within the relevant page until architecture stabilizes.

## Role

Provides an obvious property-search entry point from the main site.

Possible locations:

- homepage
- Buyers page
- header/navigation
- neighborhood pages

## Design Rule

The search entry should direct users into IDX Broker rather than trying to duplicate MLS search logic in React.

---

# Planned IDX Featured Listings Widget

Potential location:

homepage

## Role

Display live MLS inventory using IDX Broker widget functionality.

Possible IDX widget types include:

- Featured Showcase
- Featured Slide Show

Selection should consider:

- responsive behavior
- visual consistency
- click destination
- lead-generation value

---

# Planned Neighborhood IDX Links

Potential location:

Neighborhood pages/cards

## Role

Connect editorial local content with live property searches.

Use IDX Broker Saved Links where appropriate.

Examples may include:

- Fairhope homes for sale
- Daphne homes for sale
- Spanish Fort homes for sale
- Gulf Shores condos

---

# Planned IDX Lead Components

IDX Broker will provide lead workflows related to:

- property inquiry
- saved search
- account registration
- listing alerts
- showing requests

These are provider-managed interfaces rather than normal React components.

They still need to be treated as part of the overall component experience because users will move between them and the main React site.

---

# Planned 404 Component

Status:

Not yet implemented

## Future Role

A dedicated Not Found component should eventually handle unknown routes.

Potential future file:

`src/pages/NotFoundPage.jsx`

or:

`src/components/NotFound.jsx`

It should:

- explain that the page was not found
- provide useful navigation
- preserve site branding
- avoid falling back silently to Home

---

# Future Layout Extraction

A likely future structure is:

    src/
    ├── components/
    │   ├── layout/
    │   │   ├── Header.jsx
    │   │   └── Footer.jsx
    │   ├── forms/
    │   ├── seo/
    │   └── shared/
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── AboutPage.jsx
    │   ├── BuyersPage.jsx
    │   ├── SellersPage.jsx
    │   ├── NeighborhoodsPage.jsx
    │   ├── RoweReportPage.jsx
    │   ├── ResourcesPage.jsx
    │   └── ContactPage.jsx
    ├── config/
    ├── App.jsx
    └── main.jsx

This is an architectural direction, not a requirement before IDX.

---

# Component Extraction Rules

A component is a good extraction candidate when:

- it is reused
- it has a clear responsibility
- it has meaningful independent state
- it is difficult to understand inside `App.jsx`
- it needs independent testing
- it will be reused by multiple pages

Avoid extracting components solely to make file counts larger.

---

# Component Naming

Use descriptive names.

Good:

    BuyerLeadForm
    NeighborhoodCard
    Header
    Footer
    ContactModal
    FeaturedListings

Avoid vague names such as:

    Box
    Thing
    Section2
    Misc

Component names should communicate responsibility.

---

# Shared Versus Page-Specific Components

## Shared

Examples:

- Header
- Footer
- buttons
- modal shell
- form controls
- contact widget
- neighborhood card

## Page-Specific

Examples:

- Buyers page hero
- Sellers valuation section
- Rowe Report video area

Do not force page-specific content into overly generic components.

---

# State Ownership

State should normally live at the lowest level that can correctly manage it.

However, truly global UI behavior may remain higher in the tree.

Examples that may justify high-level state include:

- global modal
- route-linked behavior
- shared lead form state

Avoid moving all state into `App` by default.

---

# Route Ownership

Normal navigation belongs to React Router.

Use:

- `Link`
- `NavLink`

for link-like navigation.

Use:

`useNavigate()`

when navigation must happen programmatically.

Avoid recreating state-only navigation for new components.

---

# Component Testing Priorities

High-priority components for regression testing include:

- Header
- mobile navigation
- lead forms
- lead modal
- route metadata logic
- canonical handling
- future IDX search entry
- future IDX wrappers/widgets

Lower-risk purely decorative components may rely primarily on visual QA.

---

# Accessibility Considerations

Reusable components should preserve expected browser semantics.

Examples:

- navigation should use links
- actions should use buttons
- images should use useful alt text where appropriate
- forms should use labels
- modals should remain operable
- focus behavior should not be obviously broken

Avoid replacing semantic HTML with clickable generic elements without reason.

---

# Performance Considerations

Be cautious when adding:

- large image components
- autoplay media
- third-party scripts
- multiple IDX widgets
- duplicated analytics tags

Each third-party widget can affect:

- page load
- JavaScript execution
- layout shift
- mobile performance

Use IDX widgets selectively rather than embedding them everywhere.

---

# Security Considerations

Client components must not contain private credentials.

Never place:

- IDX private API key
- provider secret
- private token

inside React source or public HTML.

Anything delivered to the browser must be considered visible to site visitors.

---

# Component Documentation Rule

When a component becomes architecturally important, update this catalog.

Examples include:

- extracting Header/Footer
- adding a dedicated SEO component
- adding IDX entry components
- adding a 404 component
- changing modal architecture
- replacing Formspree
- introducing a shared lead system

---

# Current Component Baseline

As of August 12, 2026:

- `App.jsx` remains the primary orchestration file;
- Header navigation uses React Router `NavLink`;
- page identity is route-driven;
- legacy `setPage()` remains as a compatibility layer;
- `StructuredData.jsx` is extracted;
- `StagingIndicators.jsx` is extracted;
- major page components remain largely inside `App.jsx`;
- the Footer remains part of the current application structure rather than a standalone layout module;
- the next major component work will be IDX-related;
- broad component refactoring is intentionally deferred until higher-priority functionality is stable.

## Related Documentation

See also:

- `02-system-architecture.md`
- `03-codebase-structure.md`
- `05-state-and-navigation.md`
- `08-lead-generation.md`
- `09-seo-architecture.md`
- `18-testing-qa.md`
- `19-known-technical-debt.md`
- `21-future-roadmap.md`