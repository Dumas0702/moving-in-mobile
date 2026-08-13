# Branding and Design System

## Purpose

This document defines the visual and brand system for the Moving in Mobile website.

It captures the design decisions that should remain consistent across:

- the main React site
- future neighborhood pages
- buyer and seller content
- The Rowe Report
- lead-generation interfaces
- future IDX Broker pages
- future marketing collateral derived from the site

The goal is to preserve a cohesive, professional, recognizable experience while allowing the site to continue evolving.

---

# Brand Positioning

Moving in Mobile should feel:

- professional
- polished
- local
- modern
- approachable
- trustworthy
- upscale without being pretentious
- aligned with Tina Rowe's personality and real-estate business

The site should not feel like:

- a generic real-estate template
- a franchise microsite
- a luxury-only brand
- a high-pressure lead funnel
- a technology demo

The visual system should reinforce Tina as a trusted local advisor.

---

# Core Brand Entities

The website brings together several related identities:

- Tina Rowe
- Moving in Mobile
- The Rowe Report
- Keller Williams Mobile
- REALTOR® identity
- Equal Housing identity

These should work together without competing visually.

---

# Primary Brand

The primary user-facing brand is:

`Moving in Mobile`

The site should feel owned and led by Tina Rowe rather than functioning as a generic Keller Williams page.

Keller Williams branding remains important for:

- brokerage identity
- compliance
- professional credibility

but it should not visually overpower Tina's brand.

---

# The Rowe Report

The Rowe Report is an important secondary brand.

It supports:

- video content
- local expertise
- editorial content
- recognition
- media personality
- future GEO content

The Rowe Report should feel integrated into Moving in Mobile rather than like a disconnected website.

---

# Header Logo

The current primary header logo is:

`TheRoweReportTransparentLogo.png`

The logo should:

- appear on the left side of the navigation
- use the transparent-background version
- remain visually prominent
- avoid a white rectangular background
- maintain clear space around it

Historical versions with visible white backgrounds should not replace the current transparent asset.

---

# Header Logo Size

The header logo was intentionally enlarged during the design refinement process.

The purpose was to improve:

- brand recognition
- balance with the navigation
- visual presence

Do not reduce it back to an undersized treatment without a clear design reason.

At the same time, it should not:

- dominate the entire header
- create excessive header height
- force navigation wrapping
- create mobile overflow

---

# Header

The sitewide Header is one of the most important visual components.

It should remain:

- clean
- professional
- easy to scan
- responsive
- visually consistent across all pages

Primary responsibilities include:

- brand identity
- page navigation
- Rowe Report access
- responsive mobile menu

---

# Header Navigation

Navigation should remain visually simple.

Current main destinations include:

- Home
- About
- Sellers
- Buyers
- Neighborhoods
- Resources
- Contact
- Rowe Report CTA

The navigation should not become overcrowded as content expands.

Future content should generally be organized under logical page hierarchies rather than adding every new page to the primary menu.

---

# Active Navigation State

Current React Router navigation supports an active state.

The active route should be visually distinct without becoming distracting.

The active state should remain consistent between:

- desktop
- mobile

---

# Rowe Report CTA in Header

The Rowe Report header action should remain visually distinct enough to be noticed.

It should not compete excessively with the main site navigation.

The purpose is to make Tina's video/media content easy to discover.

---

# Hero Section

The homepage hero has undergone substantial design refinement.

The current direction should be preserved unless intentionally redesigned.

Key decisions include:

- Mobile, Alabama skyline background
- Tina image on the right
- primary headline on the left
- no duplicate hero logo
- relatively compact hero height
- Tina's image aligned toward the bottom of the hero
- headline visible without unnecessary scrolling
- minimal visual obstruction of Tina's face
- reduced unnecessary empty space above Tina

---

# Hero Background

The hero/background imagery centers on Mobile, Alabama.

The skyline image has been used as a stationary visual background across major landing-page content.

The preferred feel is:

- atmospheric
- local
- recognizable
- understated

Avoid excessive filters that make the image feel artificial.

---

# Background Treatment

Earlier versions used stronger overlays and blur.

The direction evolved toward:

- cleaner imagery
- reduced dark overlay
- minimal blur
- lighter presentation

The background should support readability without becoming visually muddy.

---

# Transparent Sections

A major design direction has been allowing the Mobile skyline background to remain visible through multiple sections.

Alternating sections may use transparency rather than solid opaque blocks.

This gives the page visual continuity.

However, readability always takes priority.

If text becomes difficult to read, use:

- subtle translucent backgrounds
- spacing
- shadow
- contrast

rather than returning immediately to heavy dark overlays.

---

# Hero Tina Image

The primary Tina hero asset is:

`TinaRoweHalf.png`

The image should:

- sit visually on the right
- align near the bottom of the hero
- avoid covering important headline text
- preserve Tina's face and head unobstructed
- scale responsively

Historical layout issues included:

- too much empty space above Tina
- image not aligned to section bottom
- headline overlap
- excessively tall hero

These should not be reintroduced.

---

# Hero Logo Removal

The hero previously contained additional branding/logo treatments.

The final direction removed the hero logo.

The header already provides strong brand identity.

Do not reintroduce the large hero logo unless the design is intentionally reconsidered.

---

# Hero Headline

The hero headline should:

- be visible without requiring the user to scroll
- remain readable against the background
- have enough scale to establish hierarchy
- avoid excessively heavy weight
- remain responsive

The headline should feel premium rather than bulky.

---

# Historical Headline Direction

Several headline/tagline treatments were explored during development.

Some historical treatments included:

- Moving in Mobile
- Move Beautifully
- Tina Rowe · REALTOR®

These should not be assumed to reflect the current hero content merely because old assets or code comments reference them.

The current repository source remains authoritative.

---

# Typography

Typography was intentionally refined away from chunky or generic styling.

The preferred direction is:

- premium
- readable
- elegant
- modern
- not overly decorative

The site may use a complementary font pairing for:

- headings
- body text

Typography should reinforce a high-quality editorial feel.

---

# Heading Typography

Headings should:

- have strong hierarchy
- remain readable
- avoid excessive weight
- use consistent spacing
- avoid appearing oversized merely for visual impact

Page titles should be prominent but not overpower content.

---

# Body Typography

Body copy should prioritize readability.

Use:

- comfortable line height
- sufficient text size
- clear contrast
- reasonable line length

Do not make body text overly small to create a "luxury" appearance.

---

# Content Width

Earlier versions concentrated content too narrowly in the center.

The visual direction should make better use of wide desktop screens while preserving readable text widths.

Use wider layout containers for:

- cards
- imagery
- neighborhood grids
- property content
- visual sections

Long-form text should still maintain a comfortable reading width.

---

# Full-Width Versus Contained Sections

Use full-width or wide sections for:

- hero
- imagery
- listing grids
- neighborhood cards
- visual content

Use more constrained widths for:

- long-form paragraphs
- legal text
- detailed guides

Avoid placing every page element inside the same narrow central column.

---

# Spacing

Spacing should feel intentional and generous.

Use enough whitespace to create hierarchy without creating excessive empty areas.

Common problems to avoid:

- very large gaps above content
- inconsistent section padding
- cramped card grids
- oversized mobile margins
- unnecessary vertical height

---

# Color Direction

The site has been aligned more closely with Keller Williams branding while remaining Tina's own brand.

The visual direction became:

- lighter
- cleaner
- more refined

The interface should not rely heavily on dark backgrounds.

---

# Keller Williams Red

Keller Williams red may be used as an accent.

It should generally support:

- CTA emphasis
- selected branding
- small visual accents

Avoid using large amounts of saturated red across every section.

Too much red can make the site feel aggressive or franchise-dominated.

---

# Neutral Colors

Neutral backgrounds and typography should provide the majority of the visual system.

Preferred characteristics:

- clean
- light
- warm or neutral
- strong readability

Contrast should always remain sufficient.

---

# Buttons

Primary CTA buttons should be:

- obvious
- consistent
- easy to tap
- readable
- visually distinct

Examples include:

- Search Homes
- Request a Home Valuation
- Contact Tina
- Get Listing Alerts

---

# Button Hierarchy

Use visual hierarchy between:

## Primary CTA

Highest-value action on the page.

## Secondary CTA

Useful alternative action.

Avoid displaying numerous equally prominent buttons together.

The user should understand the preferred next step.

---

# Button Wording

Button labels should describe actions.

Good:

- Search Homes
- View Fairhope Homes
- Request a Home Valuation
- Contact Tina

Less useful:

- Learn More
- Click Here
- Submit

Use generic wording only where context makes the action obvious.

---

# Cards

Cards are appropriate for:

- neighborhoods
- resources
- services
- featured content
- listings
- buyer/seller pathways

Cards should have:

- consistent spacing
- clear hierarchy
- responsive layout
- restrained decorative styling

Avoid excessive shadows, borders, and rounded containers that make every section look like a dashboard.

---

# Neighborhood Cards

Neighborhood cards should visually emphasize:

- location
- imagery
- community identity

Future cards may link to:

- editorial neighborhood pages
- IDX searches
- both

The visual design should support this without looking like generic MLS result cards.

---

# Featured Listings

The Featured Listings section exists primarily for:

- credibility
- property discovery
- buyer engagement

The current placeholder-style approach is expected to evolve into live IDX content.

When IDX widgets are introduced, they should be visually integrated with the site rather than appearing as an obviously embedded third-party application.

---

# IDX Visual Strategy

IDX Broker pages should feel like part of Moving in Mobile.

The user should not feel that they suddenly left Tina's website.

The planned static IDX wrapper should reproduce the visual language of:

- header
- logo
- typography
- navigation
- footer
- compliance identity

---

# IDX Wrapper Consistency

The planned:

`public/idx-wrapper.html`

should visually match the main site as closely as practical.

It should use:

- the same logo
- equivalent navigation
- comparable spacing
- comparable typography
- the same footer identity
- consistent CTA language

Perfect pixel-level duplication is less important than a cohesive experience.

---

# IDX Broker Native Styling

IDX Broker may impose some provider-generated styling.

The integration should prioritize:

1. usability
2. mobile behavior
3. visual consistency
4. maintainability

Do not spend excessive effort overriding every vendor pixel if doing so creates a fragile implementation.

---

# IDX Search Interface

The property-search interface should feel clear and practical.

Avoid unnecessary visual complexity.

The search experience should emphasize:

- location
- price
- property type
- useful filters
- results
- maps

Search UX should take precedence over ornamental styling.

---

# IDX Listing Details

Listing-detail pages should retain Tina's brand shell while allowing the property content to remain the visual focus.

Avoid wrapping listings in excessive marketing content.

The main CTA should remain obvious.

---

# IDX Mobile Design

IDX must be tested carefully on mobile.

Watch for:

- filter overflow
- fixed-width content
- unreadable controls
- overlapping headers
- modal problems
- map sizing
- CTA placement

A desktop-only IDX design is not acceptable.

---

# Testimonials

Testimonials are an important trust signal.

Current established behavior includes:

- multiple Google reviews
- continuous right-to-left scrolling
- hover pause
- five-star review presentation

The visual design should remain polished rather than resembling an ad carousel.

---

# Review Presentation

Reviews should be:

- readable
- authentic
- appropriately attributed
- visually consistent

Avoid overemphasizing stars to the point that the section looks promotional rather than credible.

---

# Resources Page

The Resources page should remain utilitarian and easy to scan.

Vendor categories should have clear hierarchy.

Phone numbers should remain easy to tap on mobile.

Avoid overdesigning this page.

Its usefulness is more important than elaborate visuals.

---

# Rowe Report Page

The Rowe Report page can use slightly stronger editorial/media styling.

It should visually support:

- video
- thumbnails
- episode titles
- supporting descriptions

It should still clearly belong to Moving in Mobile.

---

# Video Embeds

Video embeds should:

- be responsive
- preserve aspect ratio
- avoid unnecessary autoplay
- not cause horizontal overflow

The surrounding page should remain useful even if the video is not played.

---

# Forms

Lead forms should feel simple and trustworthy.

Use:

- clear labels
- comfortable field sizes
- strong mobile usability
- visible submission state
- clear success/error messages

Avoid long forms unless the information is genuinely needed.

---

# Form Styling

Form controls should remain visually consistent across:

- Contact
- Buyers
- Sellers
- Home Valuation
- Listing Alerts

Future IDX lead forms may differ somewhat due to provider constraints, but they should be styled as cohesively as possible.

---

# Modal Design

Lead modals should:

- be centered
- remain usable on mobile
- clearly show how to close
- avoid being too small
- avoid occupying the entire screen unnecessarily

Historical work intentionally enlarged and centered the New Listing Alert modal.

Do not regress to a cramped layout.

---

# Modal Interaction

Modals must not create unintended dead ends.

The user should understand:

- what is being requested
- how to submit
- how to close where allowed

Lead capture should feel intentional rather than deceptive.

---

# Floating Contact Widget

The floating contact widget should remain:

- visible
- useful
- unobtrusive

It should not cover:

- form controls
- modal buttons
- mobile navigation
- critical page content

---

# Images

Whenever possible, use authentic local imagery.

Preferred visual subjects include:

- Mobile skyline
- Fairhope
- Eastern Shore
- Gulf Coast
- local neighborhoods
- Tina
- community scenes

Avoid excessive reliance on generic stock photography.

---

# Image Quality

Use images with sufficient resolution for their intended display size.

Avoid:

- blurry hero images
- stretched logos
- heavily compressed portraits
- inappropriate aspect ratios

Performance should still be considered.

---

# Image Cropping

Portraits, especially Tina's, require careful cropping.

Do not:

- cut off the top of the head unnecessarily
- crop important branding
- allow overlays to obscure the face

Responsive image behavior should be tested at several widths.

---

# Logo Files

Use transparent logo assets where intended.

Known branding files include variants for:

- The Rowe Report
- Keller Williams
- REALTOR®
- Equal Housing

Historical duplicate or alternate files may still exist.

Verify the current source references before deleting or replacing any logo.

---

# Keller Williams Logo

Keller Williams branding should remain legible.

The site has used a KW Mobile asset designed for lighter backgrounds.

Ensure the logo variant matches the background.

Do not place dark text on a dark background or white-background files inside transparent sections unless intentionally framed.

---

# REALTOR® and Equal Housing Marks

These should remain:

- clear
- legible
- appropriately sized
- visually integrated

They should not be so small that they become meaningless.

Historical revisions intentionally increased their visibility.

---

# Brokerage Information

Keller Williams Mobile identity should remain available where required.

Do not remove brokerage references purely for aesthetic minimalism.

Brand simplicity cannot override compliance obligations.

---

# Social Icons

Social links may include:

- Facebook
- YouTube
- Instagram
- LinkedIn

Icons should:

- use consistent size
- have accessible labels
- match surrounding design
- link correctly

Avoid mixing dramatically different icon styles.

---

# Responsive Design

The site must be designed mobile-first enough that mobile is not treated as an afterthought.

Critical mobile areas include:

- Header
- navigation
- hero
- Tina portrait
- CTA buttons
- forms
- testimonials
- neighborhood cards
- resources
- IDX

---

# Desktop Design

Desktop layouts should make good use of available width.

Do not simply enlarge mobile layouts and leave enormous blank margins.

Use wide-screen space for:

- imagery
- cards
- listings
- side-by-side content

while preserving readable text width.

---

# Tablet Design

Tablet widths should be explicitly considered.

Common problems include:

- navigation wrapping too early
- awkward two-column layouts
- oversized images
- modal width problems

Test at representative intermediate widths.

---

# Accessibility

Visual design should preserve accessibility.

Maintain:

- adequate contrast
- readable font size
- clear focus states
- meaningful link styling
- button semantics
- alt text
- keyboard usability where practical

Do not remove focus indicators solely because they are visually noticeable.

---

# Animation

Animation should support the experience.

Current examples include:

- testimonial scrolling
- hover behavior
- menu transitions

Avoid excessive animation.

Do not animate every section simply to make the site feel modern.

---

# Motion Sensitivity

Where possible, future animations should respect reduced-motion preferences.

This becomes more important as animation use expands.

---

# Hover Effects

Hover should provide subtle feedback.

Avoid:

- large jumps
- excessive scaling
- disorienting motion

Remember that mobile users do not have hover.

---

# Shadows and Borders

Use shadows and borders sparingly.

The preferred style is clean rather than heavily boxed.

Avoid giving every card:

- thick border
- deep shadow
- gradient
- strong radius

unless the overall visual system intentionally changes.

---

# Border Radius

Rounded corners may be used, but should remain consistent.

Avoid mixing:

- square cards
- extremely rounded pills
- random radii

without a hierarchy.

---

# Icons

Icons should clarify actions or categories.

Do not add icons solely as decoration.

Maintain a consistent icon style.

---

# Empty Space

Whitespace is important, but should not become wasted space.

Historical hero work specifically reduced unnecessary vertical whitespace.

Use spacing to improve hierarchy, not to force users to scroll.

---

# Visual Hierarchy

A page should clearly communicate:

1. where the user is
2. what the page is about
3. what information matters
4. what action can be taken next

Do not let decorative content compete with the primary message.

---

# Page Consistency

All primary pages should share:

- Header
- typography
- basic spacing rhythm
- footer
- CTA styling
- branding

Individual pages can have distinct content layouts without feeling like separate websites.

---

# Local Character

The site should visually feel connected to Mobile and Baldwin County.

This can be reinforced through:

- skyline
- bay
- local architecture
- community photography
- Rowe Report local content

Avoid generic tropical imagery that could represent any coastal market.

---

# Future Neighborhood Design

Future neighborhood pages should support strong imagery but remain content-first.

Suggested visual pattern:

    Local hero image
        |
        v
    concise introduction
        |
        v
    editorial sections
        |
        v
    local images
        |
        v
    IDX search/listings
        |
        v
    relevant CTA

Avoid turning neighborhood pages into full-screen photo galleries with little information.

---

# Future Market Report Design

Market reports should make data easy to understand.

Potential visual elements include:

- concise statistic cards
- small charts
- comparison tables
- written interpretation

Data visualization should remain simple.

Avoid dashboard-style complexity unless actual user demand justifies it.

---

# Future Content Pages

Long-form editorial pages should emphasize readability.

Use:

- strong title
- introductory summary
- clear section headings
- images
- internal links
- relevant CTA

Avoid excessive cardification of long-form text.

---

# Design and Performance

Every visual enhancement has a performance cost.

Be cautious with:

- large hero assets
- multiple web fonts
- video embeds
- third-party widgets
- animations
- large IDX scripts

Performance should be considered part of design quality.

---

# Design and SEO

Design should support:

- clear headings
- visible text
- useful internal links
- crawlable content
- readable page hierarchy

Do not hide important SEO content inside interaction patterns that make it difficult to access.

---

# Design and GEO

GEO content benefits from:

- clear section structure
- concise answers
- readable tables
- visible FAQs
- logical hierarchy

Good information design supports machine understanding.

---

# Design and Lead Generation

Lead-generation design should remain context-specific.

A strong CTA should be noticeable without making every page feel like an advertisement.

Preferred model:

    Useful content
        |
        v
    Relevant CTA

rather than:

    CTA
    CTA
    CTA
    content
    popup
    CTA

---

# Design and IDX

IDX integration is the next major test of the design system.

The goal is continuity, not perfect duplication.

The user should understand:

- they are still interacting with Tina
- the property search is part of Moving in Mobile
- navigation back to editorial content is easy
- lead actions remain clear

---

# Asset Maintenance

Before deleting or replacing a visual asset:

1. search for references
2. check desktop usage
3. check mobile usage
4. check IDX wrapper plans
5. verify staging

Do not remove historical-looking files solely by filename.

---

# Design Change Control

Material visual changes should be reviewed against:

- brand positioning
- mobile behavior
- performance
- lead generation
- compliance
- IDX consistency

Large visual redesigns should not be combined with unrelated infrastructure changes unless necessary.

---

# Documentation Rule

Update this document when:

- primary logo changes
- hero architecture changes
- typography changes
- color system changes
- Header/Footer are redesigned
- IDX wrapper design changes
- compliance branding changes
- major responsive behavior changes

Major design-system decisions may also belong in:

`docs/20-decision-log.md`

---

# Current Branding and Design Baseline

As of August 12, 2026:

- Moving in Mobile is the primary customer-facing brand;
- Tina Rowe is the central personal identity;
- The Rowe Report is an integrated secondary content brand;
- Keller Williams Mobile remains visible for brokerage identity and compliance;
- the header uses the transparent Rowe Report logo;
- the hero uses Mobile skyline imagery and `TinaRoweHalf.png`;
- the hero logo itself was intentionally removed;
- hero height and Tina image alignment were refined to reduce wasted space;
- the overall visual direction is lighter, cleaner, and more premium;
- typography was refined away from chunky styling;
- content should use more desktop width where appropriate;
- REALTOR® and Equal Housing marks should remain visible and legible;
- the future IDX wrapper must visually align with the main site;
- broad redesign work should remain secondary to the current IDX implementation milestone.

## Related Documentation

See also:

- `03-codebase-structure.md`
- `04-component-catalog.md`
- `08-lead-generation.md`
- `14-geo-strategy.md`
- `15-content-strategy.md`
- `17-security-maintenance.md`
- `18-testing-qa.md`
- `19-known-technical-debt.md`
- `20-decision-log.md`
- `21-future-roadmap.md`