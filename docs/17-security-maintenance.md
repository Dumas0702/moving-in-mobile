# Security and Maintenance

## Purpose

This document defines the security and maintenance practices for the Moving in Mobile website.

It covers:

- client-side security boundaries
- secrets and environment variables
- IDX Broker credentials
- Formspree configuration
- analytics identifiers
- source snapshot hygiene
- dependency maintenance
- access control
- third-party provider configuration
- incident response
- routine maintenance expectations

The goal is to reduce avoidable security risk while keeping the application practical to maintain.

---

# Security Model

Moving in Mobile is primarily a client-side React application.

This means that code delivered to the browser must be treated as public.

Anything placed in:

- React source
- bundled JavaScript
- public HTML
- `public/`
- browser-accessible environment variables

can potentially be inspected by a site visitor.

Do not store private credentials in client-delivered code.

---

# Public Versus Private Configuration

It is important to distinguish between identifiers that are safe to expose and actual secrets.

## Generally Public

Examples include:

- Google Analytics Measurement ID
- public website URLs
- social profile URLs
- Formspree public form endpoint where designed for browser use
- IDX public search URLs

## Private

Examples include:

- IDX Broker API key
- private API tokens
- service-account credentials
- CRM tokens
- email passwords
- administrative account credentials
- private provider secrets

Private credentials must never be embedded in client-delivered source.

---

# IDX Broker API Key

Elm Street / IDX Broker provides API access.

The account has an available API key.

That key must be treated as private.

Do not place the API key in:

- `src/App.jsx`
- any React component
- `index.html`
- `public/idx-wrapper.html`
- `public/`
- client-side Vite variables
- committed documentation
- screenshots intended for public sharing

If the API is used later, the key should be kept server-side.

---

# Client-Side Vite Environment Variables

Vite can expose environment variables to browser code.

Variables intentionally exposed through Vite are not private.

Do not assume that putting a secret into an environment variable automatically makes it secure.

If the variable is bundled into client JavaScript, a visitor can inspect it.

---

# `.env`

Treat `.env` as potentially sensitive.

Even if a historical `.env` file was empty, future versions may contain credentials.

The project should generally avoid tracking real `.env` files.

Where configuration documentation is needed, prefer:

`.env.example`

with placeholder values.

---

# `.env.example`

A future `.env.example` may document variable names without exposing secrets.

Example:

    IDX_API_KEY=
    SOME_SERVER_ONLY_SECRET=

Do not place actual credentials in the example file.

The example should communicate configuration shape only.

---

# `.gitignore`

The repository `.gitignore` should protect sensitive or generated content.

Important exclusions should include items such as:

- `.env`
- `node_modules/`
- `dist/`
- `.DS_Store`
- source archives where appropriate
- temporary editor files

Review `.gitignore` when new tools or providers are introduced.

---

# Historical Source Snapshot Concern

A historical source snapshot included:

`.env`

The file was empty at that time, but its presence highlights the need for careful archive creation.

Future snapshots should exclude environment files by default.

---

# Source Snapshot Hygiene

Future source archives should exclude:

- `.git`
- `node_modules`
- `dist`
- `.env`
- `.DS_Store`
- nested ZIP files
- temporary files
- credentials
- provider exports containing secrets

Git commits should remain the primary source-history mechanism.

---

# Source Snapshot Verification

Before sharing or archiving a source snapshot:

1. inspect included files
2. confirm `.env` is excluded
3. confirm no credentials are present
4. confirm no nested source archives are included
5. record the Git commit represented by the snapshot

Useful commands include:

    git rev-parse HEAD
    git log -1 --oneline

---

# Secret Exposure Response

If a credential is accidentally committed or shared:

1. assume the credential may be compromised
2. remove it from active source
3. rotate or revoke the credential
4. update the application/provider configuration
5. assess whether Git history still contains it
6. document the incident if material
7. verify no other credential was exposed

Simply deleting the secret from the latest commit is not enough if it was already published.

---

# Git History and Secrets

A secret committed to Git may remain in repository history even after the file is changed.

If sensitive exposure occurs, evaluate whether history cleanup is necessary.

More importantly, rotate the credential.

A rotated secret is safer than relying solely on history rewriting.

---

# Formspree Security Boundary

Existing non-IDX forms use Formspree.

Formspree browser endpoints may be visible in client code by design.

Do not confuse the public submission endpoint with private provider account access.

Protect:

- Formspree login credentials
- provider administration access
- private tokens
- downstream email credentials

---

# Form Abuse

Public forms may attract:

- spam
- automated submissions
- repeated submissions
- malicious input

Use provider-supported protections where practical.

Potential protections include:

- spam filtering
- validation
- rate limiting
- CAPTCHA where justified
- provider abuse controls

Do not make forms unnecessarily difficult for legitimate users.

---

# Form Input Handling

Treat all form input as untrusted.

Do not assume user-submitted content is safe.

If future server-side processing is introduced:

- validate inputs
- sanitize where appropriate
- avoid executing submitted content
- avoid constructing unsafe database queries
- escape output where required

The current Formspree architecture reduces custom backend exposure, but future integrations may change this.

---

# Personally Identifiable Information

Lead forms may collect:

- name
- email
- phone
- property address
- message
- property preferences

This information should be used only for legitimate lead handling.

Do not expose lead submissions in:

- public source
- analytics
- console logs
- screenshots
- documentation

---

# GA4 Privacy Boundary

Do not send personally identifiable information to Google Analytics.

Avoid sending:

- names
- email addresses
- phone numbers
- form messages
- identified property addresses
- private customer information

Analytics should track behavior rather than private lead data.

---

# Analytics Identifier

The GA4 Measurement ID is not treated as a private secret.

It is expected to be visible in browser-delivered analytics code.

Do not waste effort trying to hide it.

Focus security attention on actual credentials.

---

# Search Console Access

Google Search Console access should be restricted to appropriate account users.

Protect:

- Google account credentials
- ownership access
- administrative permissions

Verification data intentionally published by Google-supported methods may be public by design.

---

# Google Account Security

Administrative Google accounts should use strong security practices.

Recommended controls include:

- strong unique password
- multi-factor authentication
- recovery methods
- least-privilege access

Avoid sharing one administrative Google login among multiple people when individual access can be granted.

---

# Hostinger Access

Hostinger controls:

- deployment
- domains
- SSL
- hosting configuration
- file access
- provider-side settings

Hostinger account access is high impact.

Protect it accordingly.

---

# Hostinger Security Practices

Recommended practices include:

- unique strong password
- multi-factor authentication where available
- limited administrative access
- reviewing authorized users
- avoiding shared credentials

Do not store Hostinger passwords in repository documentation.

---

# GitHub Access

GitHub controls the source code and deployment branches.

Protect access to:

- `main`
- `staging`
- repository settings
- credentials
- deployment connections

Use individual accounts rather than shared credentials.

---

# GitHub Branch Risk

Direct changes to:

`main`

can affect production.

Direct changes to:

`redesign-v2`

can affect staging.

Normal development should occur on:

`staging`

This reduces accidental production changes.

---

# Force Push Risk

Avoid force-pushing shared branches.

Commands such as:

    git push --force

can destroy important history.

Do not force-push:

- `main`
- `staging`

during normal development.

---

# Repository Visibility

If repository visibility changes, review whether it contains:

- provider identifiers
- historical configuration
- source snapshots
- business data
- unintended secrets

Code should be safe enough that visibility alone does not expose credentials.

---

# Dependency Security

The project depends on npm packages.

Dependencies should be maintained deliberately.

Relevant package files include:

- `package.json`
- `package-lock.json`

---

# Dependency Updates

Do not update every dependency simply because a newer version exists.

Before a major upgrade, consider:

- security relevance
- compatibility
- breaking changes
- React version
- Vite version
- Tailwind integration
- React Router behavior
- deployment impact

Large dependency upgrades should be isolated from unrelated feature work.

---

# Security Advisories

Periodically review npm dependency advisories.

Useful command:

    npm audit

Treat results as inputs to engineering judgment.

Not every advisory requires immediate production changes.

Evaluate:

- whether the vulnerable package is used in production
- whether the vulnerable code path is reachable
- severity
- available upgrade path
- regression risk

---

# `npm audit fix`

Do not run:

    npm audit fix --force

casually.

Forced upgrades can introduce major breaking changes.

Prefer controlled dependency updates with:

- review
- build validation
- staging testing

---

# Lock File Integrity

`package-lock.json` should remain source-controlled.

It improves reproducibility.

Do not delete and recreate it unless there is a clear reason.

Unexpected lock-file churn should be reviewed before commit.

---

# Node Version

The project has been developed with a modern Node environment.

Major Node upgrades can affect:

- dependencies
- Vite
- build behavior
- Hostinger compatibility

Before changing Node version in production, validate locally and on staging.

---

# Third-Party Scripts

Third-party scripts may include:

- Google Analytics
- IDX widgets
- video embeds
- provider integrations

Every third-party script introduces potential:

- performance impact
- privacy impact
- security surface
- availability dependency

Add scripts only when they provide clear value.

---

# Third-Party Script Failure

The core site should remain usable if a nonessential third-party service fails.

Examples:

- GA4 unavailable
- YouTube embed unavailable
- noncritical widget unavailable

Critical IDX functionality is a different case once IDX becomes a core production feature.

---

# IDX Broker Security Boundary

IDX Broker will host or generate:

- MLS search
- property detail
- user registration
- saved searches
- property inquiries

IDX Broker should remain responsible for security of its hosted functionality.

Do not duplicate provider authentication or account logic inside React unless there is a compelling architectural requirement.

---

# IDX Authentication

If IDX users create accounts, their credentials should be managed by IDX Broker.

Do not attempt to capture or store IDX user passwords in the React site.

---

# IDX Registration Data

User registration may contain personal information.

Ensure any analytics integration does not transmit registration PII to GA4.

Provider lead data should remain inside appropriate lead-management systems.

---

# IDX Wrapper Security

The planned:

`public/idx-wrapper.html`

is public HTML.

Do not place secrets inside it.

It should contain only:

- public branding
- navigation
- public asset references
- IDX wrapper markers
- public scripts/styles where required

---

# IDX API Use

If the project later uses the IDX API directly, it will require a server-side architecture.

Possible future options include:

- secure backend endpoint
- serverless function
- provider-hosted integration
- server-side proxy

Do not call a private IDX API directly from browser JavaScript using the private key.

---

# Future Backend Security

If a backend is introduced, new security responsibilities will include:

- authentication
- authorization
- secret storage
- rate limiting
- input validation
- error handling
- logging
- dependency security
- deployment isolation

Document any backend architecture separately when it is introduced.

---

# DNS Security

DNS configuration will become important for:

`homes.movinginmobile.com`

Protect DNS provider access.

Unauthorized DNS changes could redirect traffic or disrupt SSL.

---

# SSL

Production websites should remain available through HTTPS.

Key domains include:

`https://movinginmobile.com`

`https://staging.movinginmobile.com`

and future:

`https://homes.movinginmobile.com`

SSL warnings should be treated as high-priority production issues.

---

# Mixed Content

Avoid loading HTTP resources on HTTPS pages.

Examples include:

- images
- scripts
- styles
- iframe content

Mixed content can create:

- security warnings
- blocked assets
- broken functionality

Use HTTPS resources.

---

# External Links

External links should point to trusted destinations.

Periodically review:

- social links
- YouTube links
- vendor links
- resource-page links

Compromised or abandoned external domains can create user risk.

---

# Resource Vendor Links

The Resources page includes third-party service providers.

Keep information current.

Do not imply that a listed provider is formally endorsed unless that is intentionally true and appropriately disclosed.

---

# Image Upload Security

If future functionality introduces user-uploaded files, that will require additional security review.

Current site architecture does not rely on public user file uploads.

Do not introduce uploads without considering:

- file type validation
- storage
- malware risk
- privacy
- access control

---

# Content Security Policy

A formal Content Security Policy is not currently documented as an active requirement.

It may become useful as third-party scripts grow.

Potential benefits include reducing risk from:

- unauthorized script injection
- unsafe resource origins

However, CSP must be designed carefully because the site uses external services such as:

- Google Analytics
- YouTube
- IDX Broker
- Formspree

Do not add a restrictive CSP without testing all integrations.

---

# Cross-Site Scripting

React automatically escapes most string-rendered content.

Risk increases when using:

- `dangerouslySetInnerHTML`
- raw third-party HTML
- unsanitized user content
- dynamic script injection

Avoid raw HTML injection unless necessary and reviewed.

---

# `dangerouslySetInnerHTML`

If this React API is used, verify that the content source is trusted or sanitized.

Do not use it merely for convenience.

---

# Console Logging

Do not log sensitive lead or credential data to the browser console.

Examples to avoid:

    console.log(formData)
    console.log(apiKey)
    console.log(userEmail)

Temporary debug logging should be removed before production when it exposes private information.

---

# Error Messages

User-facing errors should not expose:

- stack traces
- secret values
- provider credentials
- internal filesystem paths
- detailed infrastructure information

Provide useful but safe error messages.

---

# Browser Storage

If future features use:

- localStorage
- sessionStorage

do not store:

- passwords
- private API keys
- sensitive lead information

Browser storage is visible to client-side code.

---

# Cookies

If future integrations introduce cookies beyond normal provider behavior, review:

- privacy implications
- consent requirements
- cross-subdomain behavior
- SameSite settings
- secure attributes

This may become more relevant with advertising or advanced analytics.

---

# Backup and Recovery

GitHub provides source history.

Hostinger provides hosting infrastructure.

External provider configuration may still require manual recovery planning.

Important configuration to document includes:

- branch mappings
- domain settings
- Formspree endpoints
- GA4 property
- Search Console property
- IDX account
- IDX custom domain
- DNS records

Do not rely on one person's memory.

---

# Configuration Documentation

Provider secrets should not be documented.

But non-secret configuration should be documented clearly.

Examples:

- staging branch name
- production branch name
- custom IDX hostname
- public URLs
- form-purpose mapping
- analytics architecture

This supports recovery without exposing credentials.

---

# Routine Maintenance Categories

Routine maintenance includes:

- dependency review
- broken-link review
- form testing
- analytics validation
- SEO monitoring
- SSL/domain review
- content freshness
- asset cleanup
- provider access review
- documentation updates

---

# Monthly Maintenance

A practical monthly review may include:

- verify homepage
- verify key routes
- verify lead forms
- verify IDX once live
- review Search Console
- review GA4
- check major broken links
- review Hostinger deployment health
- review current content requiring updates

---

# Quarterly Maintenance

Quarterly review may include:

- dependency audit
- provider access review
- asset review
- outdated content review
- SEO technical review
- analytics event review
- IDX configuration review
- lead-delivery review

---

# Annual Maintenance

Annual review may include:

- major dependency upgrades
- Node version
- provider contracts
- domain renewal
- SSL behavior
- brokerage/contact information
- structured data
- legal/compliance disclosures
- documentation accuracy
- source archive strategy

---

# Domain Renewal

The production domain is business-critical.

Ensure domain registration does not lapse.

Administrative access and renewal ownership should be documented outside public source.

---

# Provider Account Ownership

Important provider accounts should ideally be owned or recoverable by the business rather than depending solely on a developer's personal account.

Relevant providers include:

- Hostinger
- GitHub
- Formspree
- Google
- IDX Broker
- DNS provider

---

# Offboarding

If a developer or administrator leaves the project:

1. remove unnecessary access
2. rotate shared credentials
3. verify provider ownership
4. transfer documentation
5. confirm deployment still works
6. review API tokens

Do not leave former users with unnecessary production access.

---

# Access Principle

Use least privilege where practical.

A person who only needs to review analytics should not necessarily have:

- DNS control
- GitHub admin
- Hostinger admin
- IDX API credentials

Reduce the impact of compromised accounts.

---

# Incident Response

For a suspected security incident:

1. identify affected system
2. preserve evidence
3. revoke or rotate affected credentials
4. restrict access if needed
5. restore known-good configuration
6. assess whether user data was exposed
7. validate production
8. document incident and remediation
9. update preventative controls

Do not make uncontrolled changes across multiple systems without understanding the incident scope.

---

# Production Defacement or Unauthorized Change

If production content changes unexpectedly:

1. inspect Hostinger deployment history
2. inspect GitHub commits
3. review provider logins
4. verify DNS
5. restore known-good version
6. rotate credentials if compromise is suspected
7. review account access

---

# DNS Hijack Symptoms

Possible signs include:

- site resolves to unexpected server
- SSL certificate suddenly changes
- custom IDX hostname points elsewhere
- users see unrelated content

Verify DNS provider records immediately.

---

# Unexpected Git Commit

If an unknown commit appears:

1. inspect author
2. inspect diff
3. verify GitHub account activity
4. revert unsafe changes
5. rotate credentials if account compromise is suspected
6. review collaborator access

---

# Broken Form After Provider Change

If Formspree behavior changes:

- inspect provider dashboard
- verify endpoint
- verify billing/account status
- test staging
- verify delivery

Do not immediately rewrite the entire lead system.

---

# IDX Provider Outage

Once IDX is production-critical, an IDX outage may affect:

- search
- listing details
- saved searches
- inquiries

The React editorial site should remain available independently.

This is one benefit of keeping the main site and IDX architecture separate.

---

# Provider Dependency Separation

The hybrid architecture intentionally limits provider blast radius.

Examples:

- GA4 failure should not break pages
- Formspree failure should not break reading content
- IDX outage should not take down the editorial React site
- YouTube failure should not break navigation

Maintain this separation where practical.

---

# Maintenance During IDX Integration

IDX is the next major integration milestone.

Security checks should include:

- no API key in client code
- wrapper contains no secrets
- custom domain uses HTTPS
- user registration stays provider-managed
- lead PII stays out of analytics
- provider admin access is protected
- DNS changes are documented

---

# Security Review Before IDX Launch

Before production IDX launch, verify:

1. `homes.movinginmobile.com` uses HTTPS
2. no private API key is present in browser source
3. wrapper contains only public configuration
4. registration works through IDX Broker
5. lead data reaches intended destination
6. GA4 does not receive PII
7. DNS configuration is correct
8. vendor default admin URLs are not exposed unnecessarily
9. provider credentials are stored securely

---

# Security Review Before Production Release

For high-impact releases:

- [ ] no secrets in source
- [ ] `.env` not tracked
- [ ] build passes
- [ ] provider credentials unaffected
- [ ] forms do not expose private data
- [ ] analytics does not include PII
- [ ] routing works
- [ ] SSL remains valid
- [ ] external scripts are understood
- [ ] documentation is current

---

# Maintenance and Documentation

Security and maintenance procedures are part of the Engineering Manual.

Update this document after:

- new provider integration
- new credential type
- backend introduction
- authentication changes
- DNS architecture changes
- major dependency change
- security incident
- privacy architecture change

---

# Security-Related Technical Debt

Known areas for future review include:

- `.env` handling
- source snapshot hygiene
- dependency maintenance cadence
- branch protection
- possible Content Security Policy
- staging indexing/security review
- provider-access governance
- future CRM credential handling
- future server-side IDX API use if required

These should be addressed based on actual risk and business need.

---

# Current Security Baseline

As of August 12, 2026:

- the production application is primarily client-side React;
- browser-delivered configuration must be treated as public;
- GA4 Measurement ID is public by design;
- Formspree browser endpoints are not treated as private credentials;
- the IDX Broker API key must remain private and must not be placed in React, public HTML, or client-side Vite configuration;
- a historical source snapshot included an empty `.env`, reinforcing the need to exclude environment files from future archives;
- source snapshots should exclude `.git`, `node_modules`, `dist`, `.env`, `.DS_Store`, and nested ZIP files;
- GitHub, Hostinger, Google, DNS, Formspree, and IDX Broker administrative access should be protected;
- the upcoming IDX implementation must preserve HTTPS, provider-managed user authentication, and separation of PII from analytics;
- no custom backend currently exists, so any future direct use of private IDX APIs will require a new secure server-side architecture.

## Related Documentation

See also:

- `03-codebase-structure.md`
- `06-git-branching-workflow.md`
- `07-hostinger-deployment.md`
- `08-lead-generation.md`
- `10-google-analytics.md`
- `18-testing-qa.md`
- `19-known-technical-debt.md`
- `20-decision-log.md`
- `21-future-roadmap.md`
- `22-developer-onboarding.md`
- `23-deployment-checklist.md`
- `24-release-checklist.md`
- `25-troubleshooting.md`