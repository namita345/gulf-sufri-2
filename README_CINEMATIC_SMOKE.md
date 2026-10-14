# Jinni — Cinematic Smoke Upgrade

## Scope
Changes are isolated to the Restaurant Websites **A Simple 3-Step Process** section, plus the `gsap` dependency needed to sequence it. The shared header, homepage, hero, Four Wishes, restaurant template showroom, inquiry form, and other pages are otherwise unchanged.

## What changed
- Removed fixed SVG smoke paths that resembled a light beam.
- Added `src/pages/EnchantedSmoke.jsx`: an adaptive HTML Canvas smoke renderer with procedurally noise-textured translucent wisps, a separate cloud around Jinni's smoke tail, and low-lying fog that drifts outward across the section's lower edge.
- Used the lamp image's actual **left-hand spout** to locate the particle emitter relative to the rendered image.
- Added a GSAP timeline to start smoke first, reveal Jinni through it, show a separate speech bubble, illuminate the three process steps, and uncover the inquiry button.
- Preserved the large, gently shaking idle lamp; clicking it makes it settle and begins the sequence. Clicking again replays the experience.
- Smoke continues after Jinni appears, with subtle floating and floor fog. Rendering pauses when off-screen / when the page is hidden.
- Added mobile adjustments, DPR cap, particle cap, and reduced-motion fallback.

## Build / deploy
1. Run `npm install` from the project root. **New dependency: `gsap`**.
2. Run `npm run build`.
3. Deploy the complete project to Vercel. Do not upload only the changed CSS file.
4. On `/services/restaurant-websites`, scroll to **A Simple 3-Step Process**, tap the lamp, wait for the sequence, then test **Grant My Website Wish**.

## Changes to files
- `src/pages/RestaurantWebsites.jsx`: process-only state/sequence and canvas component integration.
- `src/pages/restaurant-websites.css`: appended process-only CSS for smoke layering and reduced-motion support.
- `src/pages/EnchantedSmoke.jsx`: new smoke renderer (only used inside process section).
- `package.json`: added GSAP dependency.

## Honest testing status
JSX source parsing / transpilation and archive integrity were checked. npm registry networking was unavailable here, so a full Vite production build and real live smoke playback could not be tested in this environment. The result is a procedural atmospheric effect rather than a photorealistic VFX fluid simulation; final motion and tuning need review in a browser after deployment.
