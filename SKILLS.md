# Skills — MirrorWorking

## Tech Stack
- Runtime/Framework: Expo (SDK 54) + Expo Router (`~6.0.15`), React Native 0.81.5, React 18.3.1
- Language: JavaScript (no TypeScript — `App.js`, plain `.js` components)
- Key libraries: `expo-av` (audio/meditation playback), `expo-asset`, `expo-linear-gradient`, `expo-updates`, `@react-navigation/native` + `bottom-tabs`, `react-native-web`
- Database/ORM: none found
- Auth: none found
- Deployment target: dual — Vercel (static web export, `vercel.json` routes `web-build/**`) and native app stores via EAS (`eas.json` has `development`/`preview`/`production` build profiles for Android + iOS)

App is a meditation/journaling/wellness app: `src/components` has `Audio`, `HomeScreen`, `Journal`, `Journeys`, `Library`, `Meditation`, `SourceMaterial` — i.e. guided-meditation content with journaling.

## Common Workflows
- Install: `npm install`
- Dev server: `npm start` (or `npm run android` / `npm run ios` / `npm run web`)
- Build (web/static): `npm run vercel-build` → `npx expo export --platform web` (outputs to `web-build/`, matches `vercel.json`)
- Build (native): `eas build --profile preview` (or `production`) — see `eas.json`
- Test: none configured
- Deploy: Vercel auto-deploys `web-build/` per `vercel.json`; native store submission via `eas submit` (placeholders for `appleId`/`ascAppId`/`serviceAccountKeyPath` in `eas.json` are NOT filled in — submit config is incomplete)

## Relevant Claude Code Skills (already available)
- `expo-dev-run` — this workspace already has an Expo-specific skill covering exactly this project type (launch/build/debug Expo apps); use it instead of ad-hoc `expo start` invocations
- `find-canonical-app` — MirrorWorking is one of several parallel "Mirror" copies; use this skill first to confirm you're editing the right one before making changes
- `vercel-app-deploy` — project has `vercel.json` and a `vercel-build` script; use this skill for deploy/debug of the web build
- `run` — to launch and visually verify meditation/journal screens after a change
- `verify` — exercise audio playback / journal flows end-to-end before considering a change done

## Skills We'd Need to Create
- A cleanup/dedup workflow across the many stray root files noticed in this folder (`App-minimal.js`, `App-minimal2.js`, stray files named `(`, `0.5`, `{`) — no generic skill audits for junk/experiment files left in a repo root.
- EAS submit credential wiring: a skill to populate `eas.json`'s placeholder Apple/Google Play submit fields safely from secrets, since it's currently non-functional boilerplate.

## Notes
- **Duplicate/sibling warning**: MirrorWorking is one of several parallel "Mirror" app copies in this workspace (siblings: `MirrorApp`, `MirrorAppExpo`, `MirrorFinal`, `MirrorFinalFix`, `mirror-mediation-app`). This one has both a working `vercel-build` script and a filled-out `eas.json`, suggesting it may be the most "production-ready" iteration, but confirm with `find-canonical-app` before assuming it's the canonical copy.
- Root directory contains several odd zero-byte/junk files (`(`, `0.5`, `{`) alongside legitimate config — likely accidental artifacts from a prior shell command; left untouched per instructions.
