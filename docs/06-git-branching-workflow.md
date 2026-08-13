# Git Branching Workflow

## Purpose

This document defines the Git branching and promotion workflow for the Moving in Mobile website.

The goal is to keep development, staging validation, production releases, and documentation changes predictable and recoverable.

The current workflow is intentionally simple.

## Branch Roles

The repository uses three operationally important branches:

* `staging`
* `redesign-v2`
* `main`

Each branch has a distinct purpose.

## `staging`

`staging` is the primary development and integration branch.

Normal application development should begin here.

Examples include:

* new features
* bug fixes
* routing changes
* IDX integration
* SEO changes
* lead-generation changes
* documentation updates
* maintenance work

Before beginning work:

```bash
git checkout staging
git pull origin staging
git status
```

A clean starting state is preferred.

## `redesign-v2`

`redesign-v2` is the branch used by Hostinger for the staging website.

The staging site is:

`https://staging.movinginmobile.com`

The branch is normally not edited directly.

Instead, the current `staging` branch is pushed to it using:

```bash
git push origin staging:redesign-v2
```

This keeps `staging` as the human-facing development branch while preserving Hostinger's configured staging deployment branch.

## `main`

`main` represents production-ready code.

The production website is:

`https://movinginmobile.com`

Only work that has passed staging validation should normally be merged into `main`.

## Standard Development Flow

The expected flow is:

```text
Local development
      |
      v
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
Validation
      |
      v
merge staging into main
      |
      v
origin/main
      |
      v
Hostinger production
```

## Starting New Work

Use:

```bash
cd ~/moving-in-mobile
git checkout staging
git pull origin staging
git status
```

Confirm:

* active branch is `staging`;
* local branch is current;
* working tree is clean unless intentional work is already in progress.

Do not begin unrelated development on top of unexplained local changes.

## During Development

Make changes in source-controlled files.

Check progress frequently with:

```bash
git status
```

Review source changes with:

```bash
git diff
```

For documentation:

```bash
git diff -- docs/
```

For a specific file:

```bash
git diff -- src/App.jsx
```

## Build Before Commit

For application changes, run:

```bash
npm run build
```

The build should pass before the change is committed.

Documentation-only changes do not require a Vite build unless they are bundled with runtime changes.

## Staging Changes for Commit

Stage only intended files.

Example:

```bash
git add src/App.jsx src/main.jsx package.json package-lock.json
```

For documentation work:

```bash
git add docs/
```

For a mixed feature:

```bash
git add src/ public/ docs/
```

Avoid using:

```bash
git add .
```

without first reviewing `git status`.

Using targeted staging reduces the risk of accidentally committing:

* `.env`
* source archives
* `.DS_Store`
* temporary files
* unintended generated output

## Reviewing Staged Changes

Before committing:

```bash
git status
```

Then:

```bash
git diff --cached
```

For a summary:

```bash
git diff --cached --stat
```

Confirm the staged files match the intended release scope.

## Commit Messages

Commit messages should describe the change clearly.

Good examples:

```text
Migrate site navigation to React Router
```

```text
Add SPA fallback routing for Hostinger
```

```text
Update engineering manual for React Router migration
```

```text
Add IDX wrapper foundation
```

Avoid vague messages such as:

```text
update
```

or:

```text
fix stuff
```

## Push to GitHub

After committing:

```bash
git push origin staging
```

This stores the work in GitHub.

At this point:

`origin/staging`

should contain the intended commit.

## Deploy to Hostinger Staging

For runtime application changes:

```bash
git push origin staging:redesign-v2
```

This updates the branch monitored by Hostinger for:

`https://staging.movinginmobile.com`

Wait for Hostinger deployment to complete before validating.

## Documentation-Only Exception

Documentation under:

`docs/`

is not customer-facing runtime code.

Therefore a documentation-only commit generally requires:

```bash
git push origin staging
```

but does not require:

```bash
git push origin staging:redesign-v2
```

unless website code also changed.

This avoids unnecessary Hostinger deployments when only the Engineering Manual changes.

## Staging Validation

After a runtime deployment, validate the relevant behavior.

At minimum for material sitewide changes:

* homepage
* navigation
* mobile navigation
* direct routes
* route refresh
* browser history
* affected forms
* affected SEO behavior
* affected analytics
* `robots.txt`
* `sitemap.xml`

For IDX work, also validate the IDX-specific checklist.

## Promoting to Production

After successful staging validation:

```bash
git checkout main
git pull origin main
git merge staging
```

Review:

```bash
git status
git log -1 --oneline
```

Then:

```bash
git push origin main
```

Hostinger production should deploy from `main`.

## Production Validation

After production deployment, perform a smoke test.

For routing-related releases:

* open `/buyers` directly;
* refresh;
* verify no 404;
* verify `/sellers`;
* verify navigation;
* verify `robots.txt`;
* verify `sitemap.xml`.

For feature-specific work, validate the changed functionality.

Do not assume a successful merge and push proves the live site is correct.

## Return to `staging`

After production validation:

```bash
git checkout staging
git status
```

The normal local development branch should return to:

`staging`

This reduces the risk of accidentally beginning new work on `main`.

## Branch Synchronization

After a normal merge from `staging` to `main`, the branches may point to the same release state.

Future work continues on:

`staging`

Do not routinely merge `main` back into `staging` when `staging` was the source of the production merge and no production-only change occurred.

If an emergency production fix is made directly on `main`, reconcile it back into `staging` explicitly afterward.

## Avoid Direct Work on `redesign-v2`

`redesign-v2` exists as a deployment target.

Do not normally:

```bash
git checkout redesign-v2
```

and develop there.

Use:

`staging`

as the development source.

This keeps the staging deployment branch reproducible from the normal development branch.

## Avoid Direct Work on `main`

Do not normally make new feature changes directly on `main`.

Exceptions may include an urgent production recovery where:

* impact is material;
* staging promotion would take too long;
* the fix is small and understood.

If this occurs:

1. document the emergency;
2. fix production;
3. validate;
4. merge or cherry-pick the fix back into `staging`;
5. update the decision or troubleshooting documentation if relevant.

## Handling Uncommitted Changes

If `git status` shows unexpected local changes, do not blindly discard them.

First determine what they are.

Use:

```bash
git diff
```

Possible actions include:

* commit them if intentional;
* restore them if definitely unwanted;
* stash them if they must be preserved temporarily.

Example:

```bash
git stash
```

Restore with:

```bash
git stash pop
```

Use stashing deliberately and remember that stashed work can be forgotten.

## Restoring an Unwanted File Change

If a file was modified accidentally and the change should be discarded:

```bash
git restore path/to/file
```

Do not restore a file until you are certain its local changes are not needed.

## Untracked Files

`git status` may show untracked files.

Examples previously encountered include:

* source ZIP archives;
* `.htaccess` before it was added;
* documentation files.

Before adding an untracked file, verify whether it belongs in source control.

## Files That Should Generally Not Be Tracked

Examples include:

* `node_modules/`
* `dist/`
* `.DS_Store`
* real `.env` files containing secrets
* temporary source ZIPs
* editor-specific temporary files

The repository `.gitignore` should reflect this policy.

## Environment Files

Treat `.env` as potentially sensitive.

Do not commit secrets.

Where environment documentation is needed, prefer:

`.env.example`

with placeholder values.

If a real secret is accidentally committed:

1. remove it;
2. rotate the credential;
3. assess history exposure;
4. document the incident if material.

## Source Snapshots

Git history is the primary version-history mechanism.

Periodic source ZIPs may still be useful for handoff or archival purposes.

Snapshots should exclude:

* `.git`
* `node_modules`
* `dist`
* `.env`
* `.DS_Store`
* nested ZIP files

A snapshot should also record the Git commit it represents.

Example:

```bash
git rev-parse HEAD
git log -1 --oneline
```

## Current Baseline Commit Practice

The pre-React-Router / pre-IDX baseline created on August 12, 2026 was associated with commit:

`e6da65b`

Future major architectural snapshots should similarly record the exact commit.

## Merge Conflicts

When merging `staging` into `main`, conflicts should be uncommon if `main` has not received independent changes.

If conflicts occur:

1. inspect each conflict;
2. determine intended production behavior;
3. preserve both relevant changes where required;
4. rebuild;
5. retest staging-equivalent behavior before pushing production.

Do not automatically choose all changes from one side.

## Commit Scope

Prefer commits that represent coherent units of work.

Examples:

* routing migration
* Hostinger rewrite configuration
* engineering documentation update
* IDX wrapper
* IDX domain configuration documentation
* page-specific SEO metadata

Avoid combining:

* major dependency upgrades
* visual redesign
* IDX integration
* unrelated bug fixes

into one commit unless necessary.

Smaller commits improve:

* rollback;
* root-cause analysis;
* code review;
* historical understanding.

## Documentation and Code Together

When a feature materially changes architecture, its documentation should normally be updated in the same development cycle.

Examples:

```text
IDX wrapper code
+
IDX architecture documentation
+
decision log
```

or:

```text
routing change
+
navigation documentation
+
deployment documentation
+
troubleshooting documentation
```

A feature should not be considered fully complete if the living manual describes obsolete behavior.

## GitHub as Documentation Store

The authoritative living Engineering Manual is stored in:

`docs/`

and committed to GitHub.

Historical DOCX/PDF manuals may be retained as release artifacts, but GitHub Markdown is the maintained source.

This allows:

* line-by-line diffs;
* branch-aware documentation;
* pull/merge history;
* easier developer handoff.

## Branch Protection Considerations

If the repository later enables branch protection, recommended goals include:

* prevent accidental force pushes to `main`;
* require successful checks before merge;
* optionally require pull requests for production promotion.

Do not add process complexity unless it provides meaningful risk reduction for the project.

## Force Push Policy

Avoid force-pushing:

`main`

or:

`staging`

in normal development.

Commands such as:

```bash
git push --force
```

can destroy shared history.

If rewriting history becomes necessary, understand the impact before proceeding.

## Tags and Releases

Formal Git tags are not currently required for every deployment.

They may become useful for major milestones such as:

* Version 1.0
* IDX launch
* major redesigns
* major architecture upgrades

If release tagging is introduced, document the naming convention here.

## Rollback Using Git

If a production release must be reverted, prefer a controlled Git-based rollback rather than manual production file edits.

Options may include:

* reverting the offending commit;
* restoring a last known-good commit through a new commit;
* redeploying the corrected `main`.

Avoid rewriting shared production history unless absolutely necessary.

## Documentation-Only Promotion to `main`

Once documentation accurately describes the production system:

```bash
git checkout main
git pull origin main
git merge staging
git push origin main
```

A Hostinger runtime deployment may occur automatically because `main` changed, even if only docs changed.

That is acceptable, but no application behavior should change because `docs/` is not runtime content.

If the hosting platform later supports ignoring docs-only deployment changes, that may be considered as an optimization.

## Current Git Workflow Status

As of August 12, 2026:

* `staging` is the development branch;
* `main` is the production branch;
* `redesign-v2` is the Hostinger staging deployment branch;
* runtime staging deploys use `git push origin staging:redesign-v2`;
* production promotion uses `staging` merged into `main`;
* documentation-only work does not require a staging website deployment;
* GitHub Markdown under `docs/` is the living Engineering Manual;
* the workflow has been validated through the React Router migration and production promotion.

## Related Documentation

See also:

* `07-hostinger-deployment.md`
* `18-testing-qa.md`
* `20-decision-log.md`
* `23-deployment-checklist.md`
* `24-release-checklist.md`
* `25-troubleshooting.md`
