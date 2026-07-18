# Fixes Needed — MirrorWorking

Documented and fixed 2026-07-18. Found during a workspace-wide sweep for junk files.

## Stray zero-byte junk files — fixed

Three 0-byte files at the folder root: `(`, `0.5`, `{`. Confirmed unreferenced anywhere in the codebase before deleting — almost certainly fragments left by a broken shell command (likely the same command that produced the identical set of junk files in the sibling copy `mirror-mediation-app`, consistent with that folder being an unrenamed copy of this one — see this folder's `SKILLS.md` Notes section).

## Broken Vercel deployment config — fixed (merged from mirror-mediation-app)

This folder and `mirror-mediation-app` share git history but diverged: `mirror-mediation-app` has ~24 additional local commits (a finished meditation-audio-player feature plus a long series of Vercel deployment fixes) that got orphaned from `origin/main` when this folder's simpler `"backup"` commit was force-pushed over the remote. Comparing the two folders directly (not via git, since neither has a usable identity to commit/diff cleanly against the other yet):

- `MirrorAudio.js` and the Audio-tab wiring in `App.js`/`app.json` were already present in both (byte-identical component, functionally identical navigation) — no work was lost or duplicated here.
- **The deployment config had NOT been carried over and was genuinely broken**: this folder's `vercel.json` pointed at `web-build/**` (an old, stale Expo webpack build output still sitting in this folder) while its own `vercel-build` script (`npx expo export --platform web`) actually outputs to `dist/` on current Expo. The correct, current build output was already sitting in this folder's own `dist/` (verified: matches `mirror-mediation-app/dist`'s structure exactly) — it just wasn't being served due to the `vercel.json` mismatch.

**Fixed by copying from `mirror-mediation-app`:**
- `vercel.json`: `web-build/**` → `dist/**` (both the `builds.src` and `routes.dest` entries)
- `.vercelignore`: added (`/*` then `!/dist*`) — was missing entirely
- `package.json`: added the `build`/`install` no-op override scripts (`"build": "echo 'Static files already built' && exit 0"`, `"install": "echo 'No dependencies to install' && exit 0"`) so Vercel serves the pre-built `dist/` directly instead of trying to reinstall/rebuild

**Not done:** the stale `web-build/` folder is now fully unused (nothing references it) but was left in place rather than deleted, since that wasn't asked for. `mirror-mediation-app`'s ~24 orphaned commits (the audio feature's build-up history, and the deployment-fix commits this merge pulled the *end state* of) still only exist in that folder's local git history — nothing was pushed or force-pushed anywhere as part of this fix; the actual git reconciliation (deciding whether to push this folder's fixed state to `origin/main`, or recover `mirror-mediation-app`'s commit history onto this branch) is still pending a git-identity setup and your decision on how to proceed.
