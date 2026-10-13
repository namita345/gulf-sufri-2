# GulfSufra — Jinni Interactive Template Showroom

Only the **Restaurant Websites > Beautiful Templates, Made for You** showroom was updated. All previously approved global header, home, hero, Four Wishes, three-step process, footer, and inquiry endpoint remain untouched.

## Four new assets
- `public/assets/jinni-template-spice.webp` — The Spice House (Dramatic Diva)
- `public/assets/jinni-template-olive.webp` — Olive & Thyme (Unimpressed Critic)
- `public/assets/jinni-template-yamama.webp` — Al Yamama (Royal Expert)
- `public/assets/jinni-template-ocean.webp` — Ocean Grill (Playful Tease)

## Interaction
- When the showroom enters the viewport, cards reveal sequentially, followed by a subtle one-time shimmer.
- Hover a card on desktop: it lifts and acquires a champagne-gold glow; the image zooms slightly, then its matching Jinni rises into view, followed by her unique speech bubble and two actions.
- `Preview Website` opens the **existing** enlarged-image modal.
- `I Want This Style` opens the **existing** inquiry form with that template preselected.
- Moving the cursor away closes the Jinni overlay smoothly.
- On touch devices, tap the screenshot once to reveal Jinni and the actions. Tap the screenshot again (or Preview Website) for the modal. Tap elsewhere on the card to toggle the overlay.
- Keyboard focus also activates the overlay; reduced-motion preferences are respected.

## Files changed
- `src/pages/RestaurantWebsites.jsx`: template data, active-state interaction, animation overlay, shared Reveal pass-through for its event handlers.
- `src/pages/restaurant-websites.css`: appended styles strictly scoped to `.jrw-templates` / `.jrw-template-*`.
- Four new WebP assets above.

## Deployment
Deploy as the same Vite/React project to Vercel. Please check the 4-card desktop view, 2-card tablet view, and 1-card phone view before production. Dependency installation was not possible in the authoring environment due to network DNS restrictions; no production build or end-to-end form delivery test was completed here.
