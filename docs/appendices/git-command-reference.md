# Git Command Reference

## Purpose

This appendix provides a concise Git command reference for the Moving in Mobile project.

It is intended to support:

- normal development
- staging deployment
- production promotion
- troubleshooting
- rollback preparation
- repository inspection
- documentation updates

This is not a complete Git tutorial.

The commands here reflect the project's current branch and deployment workflow.

---

# Branch Model

The project currently uses three important branches:

`staging`

Primary development branch.

`redesign-v2`

Hostinger staging deployment branch.

`main`

Production branch.

Normal work should begin on:

`staging`

---

# Standard Development Flow

Conceptually:

    local staging
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
    origin/main
        |
        v
    Hostinger production

---

# Check Repository Status

Run:

    git status

Use this frequently.

It shows:

- current branch
- modified files
- staged files
- untracked files
- merge state

---

# Check Current Branch

    git branch --show-current

Expected during normal development:

`staging`

---

# List Local Branches

    git branch

The active branch is marked with:

`*`

---

# List Local and Remote Branches

    git branch -a

Useful for confirming:

- `staging`
- `main`
- `origin/staging`
- `origin/main`
- `origin/redesign-v2`

---

# View Git Remotes

    git remote -v

Typical remote name:

`origin`

Confirm that it points to the correct GitHub repository.

---

# Fetch Remote Changes

    git fetch origin

This updates remote branch references without changing the working tree.

---

# Update `staging`

First:

    git switch staging

Then:

    git pull origin staging

Run:

    git status

after the pull.

---

# Switch to `staging`

    git switch staging

Use this as the normal starting branch.

---

# Switch to `main`

    git switch main

Only do this intentionally, usually for:

- production promotion
- production inspection
- controlled hotfix/recovery work

---

# Create a Temporary Feature Branch

The project does not currently require feature branches for every change.

If one is useful:

    git switch -c feature/short-description

Example:

    git switch -c feature/idx-wrapper

When complete, merge it back into:

`staging`

rather than directly into `main`.

---

# Check Commit History

Concise history:

    git log --oneline --decorate -10

More history:

    git log --oneline --decorate --graph --all

This is useful before:

- merges
- rollback
- release
- troubleshooting branch divergence

---

# Show Current Commit

Full commit hash:

    git rev-parse HEAD

Short commit hash:

    git rev-parse --short HEAD

---

# Show Latest Commit

    git log -1 --oneline

This is useful when recording a release baseline.

---

# Inspect a Commit

    git show <commit>

Example:

    git show e6da65b

Use this to inspect:

- files changed
- commit message
- diff
- author
- timestamp

---

# View Unstaged Changes

    git diff

This shows tracked changes that have not yet been staged.

---

# View a Summary of Unstaged Changes

    git diff --stat

Useful before deciding what to stage.

---

# View Changes to One File

    git diff -- src/App.jsx

or:

    git diff -- docs/10-google-analytics.md

---

# Stage One File

    git add <file>

Example:

    git add src/App.jsx

---

# Stage Several Specific Files

    git add src/App.jsx src/main.jsx public/.htaccess

This is preferable to staging unrelated files accidentally.

---

# Stage Documentation

    git add docs/

Use this when the documentation work is ready as one coherent change.

---

# Avoid Blind `git add .`

The command:

    git add .

is valid but can stage:

- temporary files
- unexpected assets
- source archives
- `.DS_Store`
- unrelated changes

Prefer deliberate staging when the working tree contains mixed work.

---

# View Staged Changes

    git diff --cached

This should be reviewed before commit.

---

# View Staged Change Summary

    git diff --cached --stat

This is especially useful for large documentation updates.

---

# Unstage a File

    git restore --staged <file>

Example:

    git restore --staged docs/README.md

This removes the file from the staging area without discarding the working copy changes.

---

# Discard Changes to a Tracked File

    git restore <file>

Example:

    git restore src/App.jsx

WARNING:

This discards uncommitted changes in that file.

Use only when the changes are definitely unwanted.

---

# Restore a File From Another Commit

Conceptually:

    git restore --source=<commit> -- <file>

Example:

    git restore --source=HEAD~1 -- src/App.jsx

Review the result before committing.

---

# Commit Changes

    git commit -m "Short descriptive message"

Good messages describe the actual change.

Examples:

    git commit -m "Migrate site navigation to React Router"

    git commit -m "Add SPA fallback routing for Hostinger"

    git commit -m "Add IDX wrapper shell"

    git commit -m "Update living engineering manual for current architecture"

---

# Commit Message Guidelines

Prefer:

- imperative or concise descriptive wording
- one logical change
- meaningful project terminology

Avoid:

- "updates"
- "stuff"
- "changes"
- "fix"
- "working"

unless the context truly makes the meaning clear.

---

# Push `staging`

    git push origin staging

This updates the GitHub development branch.

It does not by itself deploy Hostinger staging under the current branch mapping.

---

# Deploy to Hostinger Staging

The Hostinger staging site watches:

`redesign-v2`

Deploy the current `staging` state using:

    git push origin staging:redesign-v2

This means:

push local `staging` to remote `redesign-v2`.

---

# Staging Deployment Sequence

Typical sequence:

    git switch staging
    git status
    npm run build
    git add <files>
    git diff --cached
    git commit -m "Description"
    git push origin staging
    git push origin staging:redesign-v2

Then validate:

`https://staging.movinginmobile.com`

---

# Force Update of Staging Deployment Branch

A normal push should be preferred.

If:

    git push origin staging:redesign-v2

is rejected because the remote deployment branch has diverged, investigate why before using force.

Do not casually force-push.

---

# Avoid Force Push

Avoid:

    git push --force

especially on:

- `main`
- `staging`

Force pushes rewrite shared history.

Use them only when the reason is fully understood.

---

# Production Promotion

After staging validation:

    git switch main
    git pull origin main
    git merge staging
    git push origin main

Then validate production.

---

# Inspect Before Production Merge

Before merging:

    git switch main
    git pull origin main
    git log --oneline --decorate -10

Optionally compare:

    git diff main..staging --stat

and:

    git diff main..staging

This shows what production will receive.

---

# Merge `staging` Into `main`

    git merge staging

If Git reports:

`Already up to date.`

there is nothing new to promote.

If a merge commit or fast-forward occurs, inspect the result before pushing.

---

# Push Production

    git push origin main

Hostinger production is expected to deploy from:

`main`

---

# Return to `staging`

After production promotion:

    git switch staging

Continue normal development there.

---

# Compare `staging` and `main`

Commits on staging but not main:

    git log main..staging --oneline

Commits on main but not staging:

    git log staging..main --oneline

File-level differences:

    git diff main..staging --stat

---

# Compare `staging` and `redesign-v2`

After a staging deployment:

    git fetch origin

Then:

    git log origin/redesign-v2..origin/staging --oneline

If no commits are displayed, staging deployment branch is not behind `origin/staging`.

---

# Show Branch Commit Pointers

    git log --oneline --decorate --graph --all -15

Useful for visually confirming branch alignment.

---

# Check Remote Branch Hashes

    git rev-parse origin/staging
    git rev-parse origin/redesign-v2
    git rev-parse origin/main

This is useful when validating deployment branch alignment.

---

# Show Files Changed in Last Commit

    git show --stat --oneline HEAD

---

# Show Names of Changed Files

    git show --name-only --format=short HEAD

---

# Amend Last Commit

If the latest commit has not been shared and needs a small correction:

    git add <file>
    git commit --amend

Use caution after the commit has already been pushed.

Amending changes the commit hash.

---

# Do Not Amend Shared Commits Casually

Once a commit has been pushed to a shared branch, prefer a new corrective commit unless there is a strong reason to rewrite history.

---

# Stash Unfinished Work

    git stash push -m "description"

Example:

    git stash push -m "unfinished IDX wrapper"

---

# List Stashes

    git stash list

---

# Inspect a Stash

    git stash show -p stash@{0}

---

# Restore Latest Stash

    git stash pop

This applies and removes the stash if successful.

---

# Apply Without Removing Stash

    git stash apply stash@{0}

Useful when you want to retain the stash as a backup.

---

# Delete a Stash

    git stash drop stash@{0}

Only after confirming it is no longer needed.

---

# Untracked Files

`git status` may display:

`Untracked files`

These are files Git does not yet manage.

Examples may include:

- new documentation
- new images
- generated archives
- accidental `.DS_Store`

Inspect before adding them.

---

# List Untracked Files

    git status --short

Entries beginning with:

`??`

are untracked.

---

# Ignore Files

Add appropriate patterns to:

`.gitignore`

Examples may include:

    node_modules/
    dist/
    .env
    .DS_Store
    *.zip

Do not blindly ignore a file that should actually be source-controlled.

---

# `.gitignore` Changes

If `.gitignore` changes unexpectedly:

    git diff -- .gitignore

Understand why before committing it.

---

# Remove a Tracked File From Git While Keeping Local Copy

If a file was accidentally tracked and now belongs in `.gitignore`:

    git rm --cached <file>

Then commit the removal.

Use caution with sensitive files because previous Git history may still contain them.

---

# Sensitive File Accidentally Committed

If a secret was committed:

1. rotate or revoke the credential
2. remove it from source
3. inspect Git history
4. determine whether history cleanup is necessary
5. document material incidents

Do not assume deleting the latest copy makes the old secret safe.

---

# Revert a Published Commit

For a commit already shared, use:

    git revert <commit>

This creates a new commit that reverses the earlier commit.

This is usually safer than history rewriting on shared branches.

---

# Example Revert

    git revert abc1234

Then review and push through the normal branch workflow.

---

# Revert a Merge Commit

Reverting a merge requires identifying the correct parent.

Conceptually:

    git revert -m 1 <merge-commit>

Do not run this without understanding the branch history.

---

# Reset

`git reset` can move branch history and should be used carefully.

Avoid destructive resets on shared branches.

For normal project maintenance, prefer:

- `git restore`
- `git revert`

when practical.

---

# `git reset --hard`

The command:

    git reset --hard

can permanently discard local changes.

Do not use it as a routine troubleshooting step.

---

# View Reflog

    git reflog

This can help recover commits after:

- accidental reset
- branch movement
- mistaken checkout operations

Reflog is a valuable local recovery tool.

---

# Create a Recovery Branch

If you find a commit in reflog that needs to be preserved:

    git branch recovery/<name> <commit>

Example:

    git branch recovery/router-work abc1234

This preserves the commit before further cleanup.

---

# Tagging a Release

The project does not currently require tags for every release.

For meaningful future milestones, a tag may be useful.

Example:

    git tag -a v1.1.0 -m "Moving in Mobile v1.1.0"

Then:

    git push origin v1.1.0

Use a deliberate versioning strategy before introducing regular release tags.

---

# Inspect Tags

    git tag

Detailed:

    git show <tag>

---

# Documentation Work

Before committing a large documentation update:

    git status
    git diff --stat
    git diff -- docs/

Then stage:

    git add docs/

Review:

    git diff --cached --stat
    git diff --cached -- docs/

Then commit.

---

# Recommended Documentation Commit

For the current living-manual migration, an appropriate message is:

    git commit -m "Update living engineering manual for current architecture"

This is broader and more accurate than a message limited only to the React Router migration.

---

# Documentation Does Not Need Hostinger Deployment

Markdown files under:

`docs/`

are repository documentation.

A docs-only commit does not need:

    git push origin staging:redesign-v2

solely to update the website runtime.

It should still eventually be merged to:

`main`

so the production branch contains the authoritative documentation.

---

# Build Before Runtime Commit

Before committing application behavior changes:

    npm run build

If the build fails, fix it before deployment.

---

# Git Before Build

A useful workflow is:

    git status
    npm run build
    git diff
    git add <files>
    git diff --cached
    git commit ...

This keeps build-generated surprises visible before commit.

---

# Verify No Build Output Is Tracked

Run:

    git status

If:

`dist/`

appears unexpectedly, review `.gitignore`.

Generated build output should normally not be committed.

---

# Check a File's Git History

    git log --oneline -- <file>

Example:

    git log --oneline -- src/App.jsx

---

# Show Historical Version of a File

    git show <commit>:<path>

Example:

    git show abc1234:src/App.jsx

This prints the file without changing the working tree.

---

# Find When Text Was Introduced

A useful search:

    git log -S "search text" --oneline

Example:

    git log -S "PAGE_ROUTES" --oneline

This can help identify when architecture changed.

---

# Git Grep

Search tracked repository content:

    git grep "search text"

Example:

    git grep "setPage"

Useful during refactoring.

---

# Search for a Filename

Using the shell:

    find . -name "filename"

Example:

    find . -name "TinaRoweHalf.png"

Be cautious searching:

- `node_modules`
- `.git`
- `dist`

if those directories are large.

---

# Show Tracked Files

    git ls-files

Useful for:

- asset inventory
- security review
- confirming whether `.env` is tracked

---

# Check Whether `.env` Is Tracked

    git ls-files .env

If nothing is returned, `.env` is not tracked at that path.

Also inspect:

    git status

and:

`.gitignore`

---

# Check for Tracked ZIP Files

    git ls-files "*.zip"

Source ZIP archives generally should not remain inside the active repository without a specific reason.

---

# Check for `.DS_Store`

    git ls-files | grep '\.DS_Store$'

These macOS metadata files generally should not be tracked.

---

# Check Repository Size

Useful diagnostic:

    du -sh .git

Large repository growth may indicate:

- committed binaries
- archives
- large historical assets

Do not rewrite history merely because the repository is somewhat large without first understanding the cause.

---

# Conflict During Merge

If:

    git merge staging

produces conflicts:

1. stop
2. run `git status`
3. inspect each conflicted file
4. resolve intentionally
5. stage resolved files
6. complete merge
7. run build
8. test

Do not blindly choose one side for all conflicts.

---

# Conflict Markers

Conflicted files may contain:

    <<<<<<<
    =======
    >>>>>>>

These markers must not remain in committed source.

---

# Abort a Merge

If the merge should not proceed:

    git merge --abort

This attempts to return to the pre-merge state.

Use before making unrelated edits during the conflict.

---

# Pull Conflicts

If:

    git pull

produces unexpected conflicts, inspect branch state before continuing.

Do not use force push as the first response.

---

# Diverged Branches

If local and remote branches diverge:

    git status

and:

    git log --oneline --graph --decorate --all -20

Use these to understand what happened before choosing:

- merge
- rebase
- reset
- revert

---

# Rebase

Rebase can create cleaner history but rewrites commit ancestry.

The current project workflow does not require frequent rebasing.

Do not rebase shared commits on:

- `main`
- `staging`

without a clear reason.

---

# Fetch Versus Pull

`git fetch`

downloads remote branch information without changing local files.

`git pull`

normally fetches and then integrates changes into the current branch.

Use `fetch` when you want to inspect first.

---

# Local Branch Behind Remote

Typical safe update:

    git switch staging
    git pull origin staging

But first confirm:

    git status

is clean or that local changes are intentionally preserved.

---

# Production Baseline Check

To record the current production commit:

    git switch main
    git pull origin main
    git rev-parse HEAD
    git log -1 --oneline

This can be useful before a major release.

---

# Return to Development Baseline

After inspecting production:

    git switch staging
    git pull origin staging

---

# IDX Work Branching

IDX development should normally begin on:

`staging`

For a larger isolated experiment, a temporary feature branch may be reasonable.

Example:

    git switch staging
    git pull origin staging
    git switch -c feature/idx-wrapper

When validated:

    git switch staging
    git merge feature/idx-wrapper

Then continue through staging deployment.

---

# Do Not Commit IDX Credentials

Before committing IDX work:

    git diff --cached

Inspect carefully for:

- API keys
- access tokens
- passwords
- private account details

The IDX API key must never be committed.

---

# Search Staged Diff for Obvious Secrets

Manual review remains essential.

A quick local check may include:

    git diff --cached | grep -i "api_key"

or:

    git diff --cached | grep -i "token"

These checks are not comprehensive security scanners.

---

# Deployment Branch Verification

After:

    git push origin staging:redesign-v2

verify:

    git fetch origin
    git rev-parse origin/staging
    git rev-parse origin/redesign-v2

The hashes should match if deployment branch update succeeded exactly.

---

# Known React Router Migration Baseline

A historical pre-router checkpoint was:

`e6da65bbb49f734ea862b6685c4f131c7e2eb485`

Short form:

`e6da65b`

Message:

`Add Version 1.0 engineering manual framework`

This is useful as historical context, not as the current code baseline.

---

# Do Not Reset to Historical Baseline Casually

The application has received important production work since:

`e6da65b`

including:

- React Router
- `.htaccess`
- documentation updates

Do not reset active branches back to that commit.

Use it only as a reference point when needed.

---

# Emergency Production Recovery

If a recent production commit is clearly defective:

1. identify known-good commit
2. determine whether a revert is appropriate
3. restore through Git
4. push corrected `main`
5. verify Hostinger
6. reconcile `staging`

Do not fix production only in Hostinger File Manager and leave GitHub inconsistent.

---

# Hotfix Rule

If a production hotfix must be made directly from:

`main`

the fix must later be reconciled back into:

`staging`.

Otherwise future staging promotion may reintroduce the bug.

---

# Example Hotfix Flow

Conceptually:

    main
      |
      +--> production fix
      |
      v
    push main
      |
      v
    validate production
      |
      v
    merge main back into staging

Exact steps should be chosen carefully based on branch state.

---

# Avoid Manual Server-Only Changes

Hostinger File Manager can be useful for diagnosis.

But production fixes should generally be represented in Git.

The React Router `.htaccess` incident demonstrated why.

The permanent fix was:

`public/.htaccess`

not an undocumented server-only edit.

---

# Git Command Safety Levels

## Low Risk

Examples:

    git status
    git log
    git diff
    git fetch
    git branch
    git show

These primarily inspect state.

## Moderate Risk

Examples:

    git add
    git commit
    git merge
    git pull
    git push

These change repository state but are normal operations.

## High Risk

Examples:

    git reset --hard
    git push --force
    git clean -fd
    history rewriting

Use only after understanding the consequences.

---

# `git clean`

The command:

    git clean -fd

deletes untracked files and directories.

Do not use it casually.

Untracked files may contain:

- unfinished work
- new documentation
- new assets

Inspect first:

    git status

---

# Before Any Destructive Command

Ask:

1. What branch am I on?
2. Is my working tree clean?
3. Has the work been committed?
4. Is there a backup or recoverable commit?
5. Is this command rewriting shared history?

If uncertain, inspect before proceeding.

---

# Routine Command Set

The most frequently needed commands are:

    git status
    git branch --show-current
    git pull origin staging
    git diff
    git add <files>
    git diff --cached
    git commit -m "message"
    git push origin staging
    git push origin staging:redesign-v2
    git switch main
    git pull origin main
    git merge staging
    git push origin main
    git switch staging

---

# Documentation Update Command Set

For a docs-only update:

    git switch staging
    git status
    git diff --stat
    git diff -- docs/
    git add docs/
    git diff --cached --stat
    git diff --cached -- docs/
    git commit -m "Update living engineering manual for current architecture"
    git push origin staging

No Hostinger staging deployment is required solely for Markdown documentation.

When ready, merge the documentation commit into:

`main`

---

# Current Git Baseline

As of August 12, 2026:

- `staging` is the normal development branch;
- `main` is the production branch;
- `redesign-v2` is the Hostinger staging deployment branch;
- staging runtime is deployed with `git push origin staging:redesign-v2`;
- production is promoted by merging `staging` into `main`;
- force pushes should be avoided;
- Git should remain authoritative over manual Hostinger file edits;
- documentation under `docs/` should be committed to Git even though it does not require runtime deployment;
- the historical pre-React-Router checkpoint `e6da65b` is a reference point only, not the current baseline.

## Related Documentation

See also:

- `../06-git-branching-workflow.md`
- `../07-hostinger-deployment.md`
- `../17-security-maintenance.md`
- `../18-testing-qa.md`
- `../22-developer-onboarding.md`
- `../23-deployment-checklist.md`
- `../24-release-checklist.md`
- `../25-troubleshooting.md`
- `environment-setup.md`