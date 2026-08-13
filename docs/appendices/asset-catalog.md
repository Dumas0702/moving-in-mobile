# Asset Catalog

## Purpose

This appendix documents the important visual, branding, content, social, compliance, and technical assets used by the Moving in Mobile website.

It is intended to help future developers:

- identify active assets
- understand asset purpose
- avoid accidentally selecting obsolete variants
- replace imagery safely
- distinguish runtime assets from historical files
- plan future cleanup
- maintain brand consistency

The current application source remains authoritative.

A file existing in the repository does not automatically mean it is actively used.

---

# Source of Truth

The primary runtime source of truth for application assets is the asset mapping used by the current source code.

Historically, most active image references have been centralized through an:

`ASSETS`

object near the top of:

`src/App.jsx`

Before replacing, renaming, or deleting an asset:

1. inspect the current `ASSETS` mapping
2. search the repository for direct references
3. verify the rendered site
4. test desktop and mobile
5. confirm the file is not required by the future IDX wrapper

---

# Catalog Verification Status

This catalog was originally reconstructed from the Version 1.0 repository review performed for the Engineering Manual.

The Version 1.0 review identified both:

- active application assets
- retained historical or alternate files

Future maintainers should periodically compare this document against the actual current repository.

A fresh repository inventory should take precedence if filenames or usage have changed.

---

# Primary Asset Location

Most publicly delivered assets are stored under:

`public/`

Vite copies files in this directory directly into the production build.

Typical browser reference:

    /filename.png

rather than importing the image through the JavaScript module system.

---

# Primary Branding Assets

## The Rowe Report Logo

Active primary file:

`TheRoweReportTransparentLogo.png`

Purpose:

- primary Tina / Rowe Report brand identity
- Header
- Footer
- Rowe Report content
- future IDX wrapper

This is the preferred transparent logo variant.

Do not replace it with a similarly named historical variant without deliberate visual review.

---

# Alternate Rowe Report Logos

Historical or alternate files may include:

`TheRoweReportLogo.png`

`TheRoweReportTransparentLogo2.png`

`TheRoweReportWithKWLogo.png`

`TheRoweReportWithKWLogoTransparent.png`

These are not assumed to be current defaults.

Possible purposes include:

- earlier design iterations
- combined co-branding
- visual rollback
- historical reference

Do not select one simply because its filename appears newer or more complete.

---

# Keller Williams Mobile Logo

Active brokerage asset:

`KW-MOBILE.png`

Purpose:

- Keller Williams Mobile identity
- brokerage branding
- Header and/or Footer depending on current design
- future IDX wrapper
- compliance presentation

The current version was selected for use with the site's visual background treatment.

---

# Older Keller Williams Assets

Historical files may include:

`KW-MOBILEold.png`

`keller-williams-logoold.png`

Potential earlier variants may also exist.

These should not replace:

`KW-MOBILE.png`

without verifying:

- current branding
- background compatibility
- brokerage standards
- rendered dimensions

---

# REALTOR® and Equal Housing Assets

Known compliance assets include:

`REALTOREOL.PNG`

and:

`REALTOREOL-white.png`

Purpose:

- REALTOR® identity
- Equal Housing Opportunity identity
- brokerage/compliance presentation

The appropriate variant depends on background contrast.

Conceptually:

    REALTOREOL.PNG
    → lighter background

    REALTOREOL-white.png
    → darker background

Verify actual rendered contrast before choosing.

---

# Compliance Asset Rule

Do not remove or substantially alter compliance marks solely for aesthetic reasons.

Before changing:

- REALTOR® marks
- Equal Housing marks
- brokerage marks

confirm current:

- brokerage requirements
- MLS requirements
- legal requirements
- branding standards

---

# Tina Rowe Imagery

## Primary Hero Portrait

Active primary file:

`TinaRoweHalf.png`

Purpose:

- homepage hero
- page imagery where appropriate
- Tina identity

Important layout requirements:

- preserve face visibility
- preserve natural crop
- avoid excess space above Tina
- align appropriately with hero bottom
- test mobile and desktop

---

# Alternate Tina Portrait

Historical alternate:

`TinaRoweHalf2.png`

This should not be treated as the active default.

Compare visually before any intentional replacement.

---

# Tina Signature Image

Known active/supporting file:

`TinaRoweSignature.png`

Purpose may include:

- personal-brand sections
- signature presentation
- editorial content
- About-related imagery

Verify current source usage before modifying.

---

# Tina Low-Resolution Contact Image

Known file:

`TinaRoweSignatureLowRez.png`

Historical Version 1.0 usage:

- floating contact presentation

This asset may be intentionally optimized for smaller display.

Do not replace it with a very large source image without considering performance.

---

# Mobile Skyline Hero

Active primary background image:

`mobile-hero.png`

Purpose:

- Mobile skyline
- homepage hero
- atmospheric site background
- local geographic identity

The hero/background treatment is one of the site's signature visual elements.

---

# Historical Hero Files

Older or alternate files may include:

`mobile-hero.jpg`

`mobile-hero-old.jpg`

These are not assumed to be active.

Do not restore them accidentally during cleanup or redesign.

---

# Hero Image Requirements

When replacing:

`mobile-hero.png`

verify:

- desktop crop
- mobile crop
- text readability
- Tina portrait contrast
- file size
- loading performance
- local authenticity

Avoid generic skyline imagery unrelated to Mobile.

---

# Open Graph / Social Image

Known active file:

`og-image.png`

Purpose:

- social sharing
- Open Graph
- Twitter/social card presentation
- guide-related imagery in the historical ASSETS map

Future route-specific social sharing may require additional images.

---

# Historical Social Preview

Older file:

`og-image-old.png`

Treat as historical unless intentionally restoring an earlier design.

---

# Branded Van Image

Active known file:

`van-wrap.png`

Purpose:

- Tina / Rowe Report branding
- brand storytelling
- site promotional content

---

# Alternate Van Image

Historical alternate:

`van-wrap2.png`

Do not assume this is current.

Compare visually before replacement.

---

# Buyer Marketing Image

Known active content image:

`buyers-love-mobile.jpg`

Purpose:

- buyer-oriented content
- Mobile lifestyle messaging
- supporting page imagery

---

# Historical Buyer Image

Older file:

`buyers-love-mobileold.jpg`

Treat as historical unless deliberately restored.

---

# Supporting Benefit Images

Known files include:

`benefit1.JPG`

`benefit2.JPG`

`benefit3.JPG`

Purpose:

- supporting marketing sections
- benefit/value presentation

Because these use uppercase:

`.JPG`

preserve filename case when referencing them.

Linux production environments may treat filename case differently from macOS.

---

# Community Photography

Version 1.0 documented community photography for the following areas.

Known files include:

`downtown-mobile.jpg`

`midtown-mobile.jpg`

`spring-hill.jpg`

`west-mobile.jpg`

`saraland.jpg`

`semmes.jpg`

`spanish-fort.jpg`

`daphne.jpg`

`fairhope.jpg`

`dauphin-island.jpg`

`gulf-shores.jpg`

`orange-beach.jpg`

Purpose:

- neighborhood/community cards
- area content
- local geographic identity

---

# Community Image Usage

Community images should represent the named location accurately.

Do not use:

`fairhope.jpg`

for Daphne content merely because the visual looks attractive.

Local authenticity is part of the brand and GEO strategy.

---

# Future Community Images

As neighborhood content expands, likely future asset needs include:

- Foley
- Silverhill
- Robertsdale
- additional Fairhope views
- additional Daphne views
- Spanish Fort
- Mobile neighborhoods
- waterfront imagery
- Eastern Shore lifestyle imagery

Prefer authentic local photography over generic stock photography.

---

# Community Image Naming

Preferred naming style:

    fairhope-downtown.jpg
    fairhope-pier.jpg
    daphne-bayfront.jpg

rather than:

    IMG_4821.jpg
    image-final2.jpg

Descriptive filenames improve maintenance.

---

# Process Icons

Known seller/process assets include:

`process-analyze.png`

`process-strategize.png`

`process-market.png`

`process-negotiate.png`

`process-sold.png`

Purpose:

- seller process
- workflow explanation
- visual sequencing

---

# Alternate Process Icons

Historical black variants may include:

`process-analyzeblk.png`

`process-strategizeBlk.png`

`process-marketBlk.png`

`process-negotiateBlk.png`

`process-soldBlk.png`

The Version 1.0 active source used the non-black variants.

Do not mix both icon families within one process section without intentional design review.

---

# Value and Benefit Icons

Known icon families include concepts such as:

- handshake
- marketing
- communication
- market knowledge
- local expertise
- honesty
- integrity
- commitment
- care

Known filenames include examples such as:

`handshake-icon.png`

`marketing-icon.png`

Additional matching files may exist.

Purpose:

- value proposition
- trust sections
- service benefits

---

# Buyer and Local-Service Icons

The Version 1.0 repository review documented icon concepts such as:

- pen-paper
- location
- investor
- big-house
- full-service

These support:

- buyer content
- relocation content
- service explanations

Before documenting exact filenames for additional members of this family, inspect the current repository.

---

# Icon Family Rule

Within a single visual section, keep icons stylistically consistent.

Avoid mixing:

- photographic icons
- outline icons
- filled icons
- cartoon graphics

without intentional design direction.

---

# Social Media Icons

Known active social assets:

`facebook.png`

`instagram.png`

`youtube.png`

`linkedin.png`

Purpose:

- Header
- Footer
- Contact
- social navigation
- external profile links

---

# Social Icon Maintenance

When changing a social icon:

- preserve consistent dimensions
- preserve style consistency
- verify accessible labels
- verify link destination
- test mobile

Do not use different icon styles for each network unless intentionally designed.

---

# Favicon

Known favicon:

`rowe-favicon.svg`

Purpose:

- browser tab
- bookmark/site identity

Future favicon replacements should also be checked in:

`index.html`

or wherever current favicon metadata is defined.

---

# Technical SEO Assets

Important non-image assets under `public/` include:

`robots.txt`

`sitemap.xml`

These are technically public assets even though they are documented primarily in the SEO chapters.

---

# Hostinger Routing Asset

Important public server configuration:

`.htaccess`

Source-controlled location:

`public/.htaccess`

Purpose:

- preserve Hostinger internal builds protection
- serve real files normally
- support React Router SPA fallback

This file is operationally critical.

Do not treat it as disposable clutter in the public directory.

---

# Future IDX Wrapper Asset

Planned:

`public/idx-wrapper.html`

Expected production URL:

`https://movinginmobile.com/idx-wrapper.html`

Purpose:

- provide the visual shell for IDX Broker Dynamic Wrapper
- provide Header
- provide navigation
- provide Footer
- provide brand identity
- expose IDX insertion markers in static HTML

This file does not yet belong in the active asset catalog until implemented.

Once created, it should be documented here as a critical integration asset.

---

# IDX Wrapper Images

The future IDX wrapper will likely reference a subset of core assets such as:

- `TheRoweReportTransparentLogo.png`
- `KW-MOBILE.png`
- REALTOR® / Equal Housing artwork
- social icons if included

Avoid duplicating these into a separate IDX-only asset folder unless required.

The wrapper should reuse the same canonical assets where practical.

---

# Open Graph Asset Strategy

Currently:

`og-image.png`

provides a general site sharing image.

Future expansion may benefit from route-specific images for:

- Fairhope
- Daphne
- Spanish Fort
- relocation content
- Rowe Report episodes

Do not create dozens of nearly identical social images without a publishing process to maintain them.

---

# Image Format Selection

Use the format that best matches the asset.

## PNG

Good for:

- logos
- transparency
- icons
- graphics

## JPG / JPEG

Good for:

- photography
- large photographic backgrounds

## SVG

Good for:

- simple vector icons
- logos where source artwork supports it
- favicon/vector graphics

Future optimization may consider WebP or AVIF where browser and workflow compatibility justify it.

---

# Transparency

Transparent logos should remain transparent.

Avoid exporting transparent branding onto:

- white rectangles
- black rectangles

unless a deliberately framed version is required.

This was an important issue during earlier design work.

---

# Logo Distortion

Do not stretch logos by independently forcing width and height.

Preferred pattern:

    width: controlled
    height: auto

or:

    height: controlled
    width: auto

Preserve aspect ratio.

---

# Image Alt Text

Alt text should describe the visible image and its function.

Good:

`Downtown Fairhope along Section Street`

Good:

`Tina Rowe`

Poor:

`fairhope.jpg`

Poor:

`best Fairhope realtor homes for sale`

Alt text is primarily an accessibility feature.

---

# Decorative Images

If an image is purely decorative, it may use empty alt text where appropriate.

Do not force keyword-heavy descriptions onto decorative backgrounds.

---

# Asset Paths

For files in:

`public/`

runtime references typically begin at the root.

Example:

    /TinaRoweHalf.png

The current source may also use a helper around asset paths.

Inspect current implementation rather than introducing inconsistent path patterns.

---

# Historical `BASE` Helper

Earlier application code retained a compatibility helper related to the historical GitHub Pages path:

`/moving-in-mobile/`

The current Vite production configuration uses:

`base: '/'`

Do not reintroduce historical subpath assumptions into new assets.

---

# Filename Case

Filename case matters in production.

Example:

`REALTOREOL.PNG`

is not guaranteed to behave the same as:

`realtoREol.png`

on a case-sensitive server.

Always copy the exact repository filename.

---

# Spaces in Filenames

Prefer avoiding spaces in new asset names.

Good:

`fairhope-bayfront.jpg`

Less desirable:

`Fairhope Bayfront Final.jpg`

Consistent naming improves:

- URLs
- code
- shell commands
- portability

---

# Asset Naming Convention

For future assets, prefer:

    lowercase-descriptive-name.ext

Examples:

    fairhope-pier.jpg
    daphne-bayfront.jpg
    rowe-report-market-update.jpg

Existing branded assets do not need to be renamed solely for style consistency.

Renaming active assets creates unnecessary breakage risk.

---

# Renaming Assets

If an active asset must be renamed:

1. search all repository references
2. rename file
3. update source references
4. run build
5. test locally
6. test staging
7. verify social/SEO references if affected

Do not rename files simply for cosmetic repository cleanup during feature work.

---

# Deleting Assets

Before deleting an asset:

1. run repository search
2. inspect `ASSETS`
3. inspect `index.html`
4. inspect structured data
5. inspect CSS
6. inspect future IDX wrapper
7. build
8. test staging

Historical files may intentionally remain for rollback or provenance.

---

# Finding Asset References

Useful commands include:

    git grep "TinaRoweHalf.png"

or:

    git grep "mobile-hero.png"

To search the filesystem:

    find public -type f | sort

---

# Current Asset Inventory Command

For a fresh current inventory:

    find public -maxdepth 1 -type f | sort

If assets are stored in subdirectories:

    find public -type f | sort

This should be used periodically to reconcile this appendix with the actual repository.

---

# Identify Tracked Public Assets

Use:

    git ls-files public

This shows only Git-tracked files.

This is usually more useful than a raw filesystem listing when identifying repository assets.

---

# Find Image Assets

Example:

    git ls-files public | grep -Ei '\.(png|jpg|jpeg|svg|webp|avif)$'

This provides a useful current inventory.

---

# Find Potential Historical Assets

Example:

    git ls-files public | grep -Ei '(old|copy|backup|2\.|blk)'

Review results manually.

Do not delete automatically.

---

# Vite Starter Assets

The Version 1.0 repository review identified unused starter assets such as:

`src/assets/react.svg`

`src/assets/vite.svg`

`src/assets/hero.png`

These were not imported by the active Version 1.0 application.

They may be cleanup candidates if still present.

Verify before deletion.

---

# Historical CSS Files

The Version 1.0 review also identified:

`src/App.css`

and:

`src/index.css-save`

as unused historical files.

These are not image assets but belong to repository-hygiene considerations.

Current:

`src/index.css`

is the relevant Tailwind/CSS entry point.

Verify current imports before removing historical files.

---

# Legacy Asset Cleanup

Known historical/alternate asset patterns include:

- `*old*`
- numbered alternates such as `*2.png`
- black process variants
- earlier combined logos
- Vite starter graphics

Cleanup should be a dedicated repository-maintenance task.

Do not combine large asset cleanup with:

- IDX implementation
- routing changes
- SEO changes
- major visual redesign

This reduces regression risk.

---

# Asset Cleanup Procedure

Recommended sequence:

1. inventory all assets
2. identify active source references
3. identify provider/static references
4. identify unused candidates
5. inspect visually
6. create a dedicated cleanup branch or focused commit
7. remove only confirmed unused files
8. run build
9. test staging
10. commit with a clear message

---

# Duplicate Asset Risk

The biggest risk from historical assets is not repository size.

It is developer confusion.

Examples:

- choosing `TinaRoweHalf2.png` instead of the intended portrait
- choosing an old KW logo
- restoring an outdated hero
- using a combined logo when the layout expects separate marks

The current rendered site and source references should determine which asset is correct.

---

# Brand Asset Change Control

## Changing The Rowe Report Logo

Check:

- Header
- Footer
- Rowe Report page
- mobile sizing
- transparency
- IDX wrapper
- structured data image references where applicable

## Changing Keller Williams Logo

Check:

- Header/Footer
- compliance presentation
- background contrast
- current brokerage standards
- IDX wrapper

## Changing Tina Portrait

Check:

- homepage hero
- mobile crop
- floating contact control
- About content
- structured-data image reference if present

## Changing Mobile Hero

Check:

- headline readability
- Tina portrait contrast
- desktop crop
- mobile crop
- page load performance

---

# Social Asset Change Control

Changing:

`og-image.png`

requires review of:

- `index.html`
- Open Graph metadata
- Twitter/social metadata
- any route-level SEO component introduced later

Changing a social network icon requires review of:

- Header
- Footer
- Contact
- mobile views
- external destination URL

---

# Community Asset Change Control

When replacing neighborhood photography:

1. verify image truly represents the named community
2. preserve useful crop
3. verify mobile layout
4. update alt text if needed
5. optimize file size
6. verify no license restrictions

---

# Asset Licensing

Before adding third-party imagery, confirm the site has appropriate rights to use it.

Potential sources include:

- client-provided images
- licensed stock photography
- properly licensed local photography
- approved brokerage assets
- original photography

Do not copy images from other real-estate websites.

---

# Stock Photography

Stock photography should be used selectively.

Prefer authentic local imagery when possible.

Generic stock imagery can weaken:

- local credibility
- GEO differentiation
- brand authenticity

---

# Client-Provided Assets

Client-provided assets should still be reviewed for:

- resolution
- transparency
- crop
- filename
- performance
- intended context

Keep original source files separately if needed rather than repeatedly resaving the only master copy.

---

# Image Optimization

Large photographic files can materially affect performance.

Before adding a major image:

- resize appropriately
- compress reasonably
- preserve sufficient quality
- test actual rendered dimensions

Do not serve extremely large original files when the page displays only a small image.

---

# Hero Performance

The hero image is especially important because it loads near the top of the page.

Optimize:

`mobile-hero.png`

carefully.

Future improvements may include:

- more efficient formats
- responsive image delivery
- preloading where justified

Any performance optimization must preserve visual quality.

---

# Lazy Loading

Below-the-fold images may benefit from lazy loading.

Do not lazy-load critical above-the-fold imagery without understanding the user-experience and performance effects.

---

# Broken Asset Symptoms

Common symptoms include:

- blank image
- browser broken-image icon
- missing logo
- layout shift
- Console 404
- Network 404

Likely causes include:

- wrong filename
- capitalization mismatch
- deleted asset
- wrong path
- deployment mismatch

---

# Asset Troubleshooting

If an image works locally but not in production:

1. verify filename case
2. verify Git tracks the file
3. inspect generated build
4. inspect browser Network
5. verify production URL
6. compare staging
7. hard refresh

macOS development can hide case-sensitivity problems that appear on Linux hosting.

---

# Asset Not Appearing in Git

Check:

    git status

If untracked:

    git add public/<filename>

Then verify:

    git diff --cached --stat

Do not assume a locally visible file was committed.

---

# Build Verification

After changing public assets:

    npm run build

Confirm the expected asset exists under:

`dist/`

when appropriate.

---

# Future Asset Organization

As the content library expands, a subdirectory structure may eventually be useful.

Possible future layout:

    public/
      brand/
      tina/
      neighborhoods/
      icons/
      social/
      rowe-report/

Do not reorganize the entire current asset library solely for aesthetics.

Such a move would require updating many references and should be treated as a dedicated refactor.

---

# Future Neighborhood Asset Organization

If neighborhood content expands substantially, an approach such as:

    public/neighborhoods/fairhope/
    public/neighborhoods/daphne/
    public/neighborhoods/spanish-fort/

may eventually be useful.

Only introduce this once the number of assets justifies the additional structure.

---

# Future Rowe Report Assets

Dedicated Rowe Report content may eventually require:

- thumbnails
- episode images
- social cards
- transcript attachments

Use a predictable naming convention.

Example:

    rowe-report-fairhope-market-update.jpg

---

# Future IDX Assets

The IDX integration should reuse existing branding where possible.

Potential future new assets may include:

- IDX-specific search graphic
- search placeholder image
- custom loader
- fallback property image

Avoid creating duplicate logos solely for IDX.

---

# Future Search Result Placeholder

If IDX Broker supports custom missing-image treatment, any fallback property image should:

- look professional
- make clear that no listing image is available
- avoid implying a property appearance that is not real

Do not use a generic house photo as though it represented the listing.

---

# Asset Inventory Maintenance

Review this appendix when:

- primary logo changes
- Tina imagery changes
- community images are added
- old assets are removed
- asset directory structure changes
- IDX wrapper is added
- social metadata imagery changes

---

# Recommended Periodic Audit

A periodic audit can use:

    git ls-files public | sort

Then compare the output with:

- `ASSETS`
- `index.html`
- structured data
- CSS
- this appendix

This helps prevent documentation drift.

---

# Current Verified Asset Baseline

The Version 1.0 repository review identified the following as active or important assets:

## Primary Brand

- `TheRoweReportTransparentLogo.png`
- `KW-MOBILE.png`
- `REALTOREOL.PNG`
- `REALTOREOL-white.png`

## Tina

- `TinaRoweHalf.png`
- `TinaRoweSignature.png`
- `TinaRoweSignatureLowRez.png`

## Site / Marketing

- `mobile-hero.png`
- `og-image.png`
- `van-wrap.png`
- `buyers-love-mobile.jpg`
- `benefit1.JPG`
- `benefit2.JPG`
- `benefit3.JPG`

## Communities

- `downtown-mobile.jpg`
- `midtown-mobile.jpg`
- `spring-hill.jpg`
- `west-mobile.jpg`
- `saraland.jpg`
- `semmes.jpg`
- `spanish-fort.jpg`
- `daphne.jpg`
- `fairhope.jpg`
- `dauphin-island.jpg`
- `gulf-shores.jpg`
- `orange-beach.jpg`

## Process / UI

- `process-analyze.png`
- `process-strategize.png`
- `process-market.png`
- `process-negotiate.png`
- `process-sold.png`
- `handshake-icon.png`
- `marketing-icon.png`
- additional related trust/value icons

## Social

- `facebook.png`
- `instagram.png`
- `youtube.png`
- `linkedin.png`

## Technical

- `rowe-favicon.svg`
- `robots.txt`
- `sitemap.xml`
- `.htaccess`

The exact current repository should be checked before assuming this list is exhaustive.

---

# Known Historical or Alternate Assets

Version 1.0 identified historical or alternate files including:

- `KW-MOBILEold.png`
- `keller-williams-logoold.png`
- `TheRoweReportLogo.png`
- `TheRoweReportTransparentLogo2.png`
- `TheRoweReportWithKWLogo.png`
- `TheRoweReportWithKWLogoTransparent.png`
- `TinaRoweHalf2.png`
- `mobile-hero-old.jpg`
- `mobile-hero.jpg`
- `buyers-love-mobileold.jpg`
- `og-image-old.png`
- `van-wrap2.png`
- black `process-*` variants

These should be treated as cleanup candidates or historical references, not active defaults.

---

# Current Asset Catalog Baseline

As of the current Engineering Manual update:

- public assets remain an important part of the site's branding and content system;
- the active source mapping and rendered site are more authoritative than filename similarity;
- the transparent Rowe Report logo, KW Mobile logo, Tina portrait, Mobile skyline, compliance marks, social icons, and community imagery form the main visual asset system;
- historical duplicate assets remain a known repository-hygiene concern;
- asset cleanup should be handled separately from the IDX milestone;
- the future `idx-wrapper.html` should reuse the existing core branding assets wherever practical;
- a fresh `git ls-files public` inventory should be used to reconcile this catalog whenever the asset library changes materially.

## Related Documentation

See also:

- `../01-project-overview.md`
- `../03-codebase-structure.md`
- `../04-component-catalog.md`
- `../09-seo-architecture.md`
- `../13-structured-data.md`
- `../14-geo-strategy.md`
- `../15-content-strategy.md`
- `../16-branding-design-system.md`
- `../17-security-maintenance.md`
- `../18-testing-qa.md`
- `environment-setup.md`