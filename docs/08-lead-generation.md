# Lead Generation

## Purpose

This document describes the lead-generation architecture for the Moving in Mobile website.

It covers:

- current non-IDX lead forms
- Formspree usage
- lead-source tracking
- modal behavior
- buyer and seller lead flows
- new listing alerts
- home valuation
- contact requests
- future IDX Broker lead capture
- lead-system integration considerations
- testing and maintenance expectations

The goal is to preserve a clear distinction between the site's existing marketing forms and the property-specific lead workflows that will be introduced through IDX Broker.

---

# Lead Generation Strategy

The Moving in Mobile website is intended to function as a lead-generation platform, not simply an online brochure.

Lead opportunities should be integrated naturally into useful content.

Primary lead categories include:

- buyers
- sellers
- relocation prospects
- home valuation prospects
- property-search users
- listing-alert users
- showing requests
- general contact inquiries

The site should make it easy to contact Tina without making normal browsing unnecessarily difficult.

---

# Current Lead Architecture

The current site primarily uses:

`Formspree`

for non-IDX lead forms.

Formspree is used because it provides reliable form processing without requiring a custom backend.

Current or established lead flows include:

- Contact
- Buyer inquiry
- Seller inquiry
- Home valuation
- New listing alert
- related CTA-driven contact forms

These flows exist independently of IDX Broker.

---

# Formspree Responsibilities

Formspree currently handles:

- form submission transport
- request receipt
- basic provider-side processing
- notification or downstream delivery

The React application is responsible for:

- visible form presentation
- input collection
- validation
- request construction
- hidden metadata
- success state
- error state
- source context

---

# Lead Source Attribution

Every lead flow should preserve enough context to identify where the prospect came from.

Useful source values may include:

- Contact page
- Buyers page
- Sellers page
- Home valuation
- New listing alert
- homepage CTA
- floating contact widget
- neighborhood page
- future IDX search
- future listing-detail page

Lead attribution is important because it helps answer:

- which pages produce leads
- which CTAs work
- which content attracts buyers
- which content attracts sellers
- whether IDX is producing meaningful engagement

---

# Hidden Metadata

Where practical, forms should include hidden metadata such as:

- request type
- source page
- CTA source
- page URL
- campaign context where applicable

This allows Tina to understand the user's intent without requiring the visitor to manually explain how they reached the form.

---

# Contact Lead Flow

Route:

`/contact`

## Purpose

Provide a straightforward way for a visitor to contact Tina.

Potential information includes:

- name
- email
- phone
- message

## Expectations

The form should:

- be easy to understand
- avoid unnecessary fields
- clearly identify Tina
- work on mobile
- provide visible success or error feedback

---

# Buyer Lead Flow

Route:

`/buyers`

## Purpose

Capture prospects who are:

- planning to buy
- relocating
- beginning property research
- interested in specific neighborhoods
- interested in listing alerts

## Current Role

The Buyers page serves as both:

- an educational resource
- a lead-generation entry point

## Future IDX Relationship

The Buyers page will become one of the primary bridges into IDX Broker.

Likely future actions include:

- Search Homes
- Advanced Search
- save a search
- receive listing alerts
- view neighborhood inventory
- request information

The current buyer lead workflow should not be removed until equivalent IDX functionality is fully validated.

---

# Seller Lead Flow

Route:

`/sellers`

## Purpose

Capture homeowners who may be considering selling.

Potential actions include:

- request home valuation
- ask a selling question
- contact Tina
- receive market information

## Future Expansion

Seller lead generation may eventually incorporate:

- IDX Broker Home Valuation
- market reports
- sold/pending market data
- automated follow-up
- CRM integration

Any replacement of current seller forms should be tested end to end before existing lead capture is retired.

---

# Home Valuation

The site includes a seller-oriented home valuation lead flow.

## Purpose

Capture a homeowner's interest before they are necessarily ready to formally list.

Typical information may include:

- property address
- name
- contact information
- optional notes

## Strategy

The user should understand that the purpose is to request information or a professional valuation rather than receive an unsupported instant automated price unless such functionality is intentionally added.

Avoid making valuation claims the system cannot support.

---

# New Listing Alert

The site includes a New Listing Alert lead flow.

## Purpose

Capture buyers who want to know when properties matching their interests become available.

## Existing Architecture

The existing site uses a Formspree-based lead capture mechanism.

Historically, the modal was designed to be prominent and centered.

## Future IDX Architecture

IDX Broker provides functionality that may make native IDX alerts preferable.

Potential future workflow:

    User searches properties
            |
            v
    User saves search
            |
            v
    IDX account/registration
            |
            v
    Automated listing alerts

After IDX is implemented, determine whether the existing Formspree New Listing Alert should:

- remain as a general lead form
- redirect into IDX saved-search functionality
- supplement IDX
- be retired

Do not maintain duplicate systems unless they serve distinct purposes.

---

# Lead Modal

The site uses modal behavior for selected lead-generation interactions.

## Purpose

Present a lead opportunity without requiring the user to navigate to a separate page.

## Responsibilities

The modal may manage:

- open state
- close state
- form content
- form submission
- success state
- error state
- responsive layout

## User Experience

Lead capture should be prominent without becoming unnecessarily hostile to normal browsing.

Future adjustments should be based on:

- lead-generation value
- usability
- mobile experience
- actual visitor behavior

---

# Floating Contact Widget

The site includes a floating contact mechanism.

## Purpose

Keep a low-friction contact path available while visitors browse.

## Advantages

It can capture users who are ready to ask a question without forcing them to locate the Contact page.

## Testing

Verify:

- desktop placement
- mobile placement
- no obstruction of critical content
- no conflict with modal layers
- correct contact behavior

---

# CTA Strategy

Calls to action should be context-specific.

Examples:

## Homepage

- Search Homes
- Find Your Next Home
- What's My Home Worth?
- Contact Tina

## Buyers

- Search Homes
- Get New Listing Alerts
- Ask Tina a Question

## Sellers

- Request a Home Valuation
- Talk About Selling
- Ask About the Market

## Neighborhoods

- View Homes for Sale
- Explore This Area
- Contact Tina About This Community

## Rowe Report

- Explore Homes
- Ask Tina About This Topic
- Contact Tina

Avoid using the exact same CTA everywhere without regard to user intent.

---

# CTA Routing

Normal navigation should use real React Router paths.

Examples:

`/buyers`

`/sellers`

`/contact`

IDX-specific CTAs will eventually point to:

`homes.movinginmobile.com`

or specific IDX saved-search URLs.

Do not build new CTA behavior around legacy state-only navigation.

---

# Form UX Principles

Lead forms should generally:

- ask only for useful information
- explain why the information is being requested
- be mobile-friendly
- clearly indicate required fields
- show success
- show errors
- avoid confusing duplicate actions

Do not add fields merely because they may be useful someday.

Each additional field increases friction.

---

# Privacy and Data Minimization

Collect only information needed for the intended lead interaction.

Typical information may include:

- name
- email
- phone
- property address
- message
- search preferences

Avoid collecting sensitive personal information unless there is a clear business need and appropriate handling.

Do not use real prospect information for routine technical testing.

---

# Testing Current Formspree Leads

When a Formspree lead flow changes, test:

1. form renders
2. required fields behave correctly
3. invalid input is handled
4. valid submission is sent
5. Formspree receives the request
6. success state appears
7. failure state works
8. hidden source metadata is correct
9. expected notification or downstream delivery occurs

A successful browser response alone does not prove the lead reached its final destination.

---

# Synthetic Test Data

Use clearly synthetic data for technical validation.

Example:

    Name: Website Test
    Email: appropriate test address
    Message: TEST SUBMISSION - staging validation

This makes it easier to distinguish technical tests from real leads.

---

# Production Form Testing

Production lead testing should be limited to what is necessary.

For high-impact lead changes, one controlled synthetic submission may be appropriate.

Avoid creating unnecessary test records in production systems.

---

# Lead Failure Troubleshooting

If a lead does not arrive:

1. inspect browser Console
2. inspect Network request
3. confirm endpoint
4. inspect request payload
5. check Formspree dashboard
6. check recipient configuration
7. check spam filtering
8. check downstream email delivery

Determine where the failure occurred before changing code.

---

# Lead Success State

Success messaging should tell the user clearly that the request was received.

Avoid technical language such as:

"HTTP request successful."

Use user-facing messaging that confirms the intended action.

---

# Error State

If submission fails:

- explain that the request could not be sent
- preserve entered information where practical
- provide another contact method if appropriate
- avoid exposing technical stack traces

---

# Duplicate Submission Protection

Where practical, prevent accidental rapid duplicate submissions by:

- disabling submit button while processing
- displaying submission state
- preventing repeated clicks

Do not make the user uncertain whether their request was submitted.

---

# Existing Lead Provider Boundary

Formspree is an external service.

Provider-side configuration is not fully represented in Git.

This may include:

- recipient email
- provider account
- form endpoint configuration
- spam controls
- notification configuration

The repository documents expected behavior, while the live Formspree configuration remains authoritative for provider-side settings.

---

# IDX Broker Lead Generation

Elm Street / IDX Broker will introduce a second lead-generation system.

IDX lead capture is specifically useful for property-search behavior.

Expected IDX lead opportunities include:

- property inquiry
- saved property
- saved search
- account registration
- email alerts
- schedule showing
- home valuation
- market reports

These features should be evaluated individually rather than enabled simply because they exist.

---

# IDX Registration Strategy

IDX Broker may allow or encourage user registration.

Registration can improve lead capture, but excessive forced registration can reduce property-search engagement.

The preferred approach should balance:

- lead-generation value
- user trust
- browsing experience
- search usefulness

Do not automatically block all property browsing behind registration.

---

# IDX Saved Searches

Saved searches are likely to become a major buyer lead mechanism.

Example flow:

    Visitor searches Fairhope
            |
            v
    Visitor refines criteria
            |
            v
    Visitor saves search
            |
            v
    Visitor provides contact information
            |
            v
    IDX sends matching-property alerts

This creates a high-intent lead because the user has already defined meaningful property criteria.

---

# IDX Property Inquiry

Listing-detail pages should provide clear ways to:

- request more information
- ask a question
- schedule a showing where supported

Lead context should ideally include:

- listing identifier
- property address
- source URL
- user contact information

Tina should not need to guess which property generated the inquiry.

---

# Schedule Showing

IDX Broker includes Schedule Showing functionality.

Before enabling it broadly, verify:

- what information the user submits
- where the request is delivered
- whether Tina receives enough property context
- whether the workflow creates any expectations of confirmed appointment availability

The wording should not imply a showing is automatically confirmed if it is only a request.

---

# IDX Home Valuation

IDX Broker includes Home Valuation functionality.

Before replacing the current seller valuation form, compare:

- user experience
- lead data captured
- notification workflow
- branding
- conversion friction
- follow-up usefulness

Do not replace a functioning seller lead flow merely because IDX offers another tool.

---

# IDX Lead Routing

After IDX is enabled, document exactly where IDX leads go.

Possible destinations may include:

- IDX Broker dashboard
- Tina's email
- CRM
- notification system

The workflow should answer:

1. Where does Tina see the lead?
2. How quickly does she receive it?
3. What property or search created it?
4. Is the lead also stored elsewhere?
5. What follow-up action is expected?

---

# Lead System Fragmentation

The introduction of IDX creates a risk of fragmented lead data.

Potential systems include:

- Formspree
- IDX Broker
- email
- future CRM
- Keller Williams systems

This may make it difficult to answer:

- whether a person is already known
- which lead source converted
- what follow-up has occurred

Lead architecture should be reviewed after IDX is stable.

---

# Future CRM Integration

A future CRM integration may be appropriate.

Potential goals include:

- centralize contact records
- automate follow-up
- preserve lead source
- track IDX behavior
- manage buyer/seller pipelines

Any CRM integration should be selected based on Tina's actual operational workflow.

Do not introduce a CRM integration solely for technical completeness.

---

# Keller Williams Lead Systems

Future integration with Keller Williams systems may be evaluated where useful.

Questions to answer before integration include:

- does Tina actively use the system?
- can leads be imported reliably?
- can source attribution be preserved?
- does automation improve follow-up?
- does it duplicate IDX functionality?

Operational usefulness should drive the integration decision.

---

# Lead Analytics

GA4 should help measure lead-related behavior.

Potential events include:

- contact form opened
- contact form submitted
- home valuation requested
- listing alert requested
- IDX search started
- listing viewed
- saved search created
- property inquiry submitted
- showing requested

Do not track sensitive form contents in analytics.

---

# Personally Identifiable Information and Analytics

Do not send personally identifiable information to GA4.

Avoid analytics parameters containing:

- full names
- email addresses
- phone numbers
- property addresses tied to identified users
- form message contents

Analytics should record behavior, not private lead data.

---

# Lead Conversion Measurement

A useful future analytics model may include:

    Traffic source
        |
        v
    Landing page
        |
        v
    CTA
        |
        v
    Form or IDX interaction
        |
        v
    Lead
        |
        v
    Follow-up

This helps determine which parts of the website actually produce business value.

---

# Neighborhood Lead Strategy

Neighborhood pages should eventually combine useful local content with context-specific lead paths.

Example:

    Fairhope guide
        |
        +--> View Fairhope homes
        |
        +--> Save Fairhope search
        |
        +--> Ask Tina about Fairhope
        |
        +--> Get relocation help

This is preferable to a generic "Contact Me" button as the only action.

---

# Relocation Lead Strategy

Relocation is an important lead-generation opportunity.

Useful lead magnets or actions may include:

- local relocation guide
- neighborhood comparison
- new listing alerts
- buyer consultation
- questions about schools, commute, or lifestyle
- property search

Lead capture should follow useful content rather than requiring contact information before the visitor receives basic information.

---

# Rowe Report Lead Strategy

The Rowe Report can support lead generation through educational credibility.

Potential CTA flow:

    Video or article
        |
        v
    Topic-specific next action
        |
        +--> Search relevant homes
        +--> Read neighborhood guide
        +--> Ask Tina a question

This creates a natural path from content to real-estate action.

---

# Seller Content Lead Strategy

Seller content should provide useful information before requesting contact.

Potential sequence:

    Seller question
        |
        v
    Helpful explanation
        |
        v
    Relevant market context
        |
        v
    Home valuation or consultation CTA

This reinforces the trusted-advisor positioning.

---

# Avoiding Overaggressive Lead Capture

Lead generation is important, but excessive interruption can damage trust.

Avoid:

- repeated overlapping popups
- forced registration before basic browsing
- unnecessary fields
- misleading urgency
- artificial scarcity
- hiding basic information behind forms

The goal is high-quality lead capture, not maximum form impressions.

---

# Lead Quality Versus Lead Quantity

Not every form submission has equal value.

Higher-intent signals may include:

- specific property inquiry
- saved search
- showing request
- valuation request
- detailed buyer message

Lower-intent signals may include:

- generic newsletter signup
- vague form with no property context

Future reporting should distinguish meaningful lead intent where possible.

---

# Lead Follow-Up Expectations

Technology should support timely human follow-up.

For each lead source, Tina should understand:

- where the lead appears
- what the prospect requested
- what response is appropriate
- how quickly follow-up should occur

A technically successful lead system is not valuable if leads are difficult to find or interpret.

---

# Lead Workflow Documentation

When a new lead source is added, document:

- user entry point
- fields collected
- provider
- destination
- source attribution
- success behavior
- notification method
- follow-up expectation
- analytics event where appropriate

This is especially important for IDX.

---

# Security Considerations

Do not expose:

- Formspree account credentials
- IDX private API keys
- CRM tokens
- email credentials

Anything embedded in browser-delivered JavaScript must be treated as public.

Provider secrets should remain server-side or inside the provider's secure configuration.

---

# Accessibility Considerations

Lead forms should use:

- labels
- meaningful button text
- keyboard-accessible controls
- readable validation messages
- clear focus behavior where practical

Modal lead capture should remain operable without relying solely on pointer input.

---

# Mobile Lead Capture

Many real-estate visitors will browse on phones.

Every lead flow should be tested for:

- field sizing
- keyboard behavior
- scrolling
- submit button visibility
- modal fit
- error messages
- success state

Do not accept a form as complete based only on desktop behavior.

---

# Release Blocking Lead Issues

The following normally block a production release when the affected lead flow is part of the release:

- form cannot submit
- lead is not delivered
- required fields are broken
- modal prevents normal use unintentionally
- wrong destination receives the lead
- property context is lost
- credentials are exposed
- major mobile usability failure

---

# IDX Migration Rule

Do not remove an existing working Formspree lead flow merely because an IDX replacement has been configured.

The correct migration sequence is:

    Configure IDX lead feature
            |
            v
    Test on staging
            |
            v
    Verify actual lead receipt
            |
            v
    Compare user experience
            |
            v
    Decide whether old flow remains
            |
            v
    Remove duplicate flow only if justified

---

# Current Lead Generation Baseline

As of August 12, 2026:

- Formspree handles the primary non-IDX lead forms;
- existing lead flows include buyer, seller, contact, valuation, and listing-alert use cases;
- lead forms should preserve useful source context;
- the site includes modal and floating-contact lead opportunities;
- GA4 can support behavioral conversion measurement but must not receive personally identifiable lead information;
- Elm Street / IDX Broker will introduce property-specific lead capture;
- IDX registration, saved searches, listing alerts, inquiries, and showing requests must be tested before becoming production-critical;
- lead-system consolidation should be evaluated after IDX is stable.

## Related Documentation

See also:

- `04-component-catalog.md`
- `10-google-analytics.md`
- `17-security-maintenance.md`
- `18-testing-qa.md`
- `19-known-technical-debt.md`
- `21-future-roadmap.md`
- `23-deployment-checklist.md`
- `24-release-checklist.md`
- `25-troubleshooting.md`