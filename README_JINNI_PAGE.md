# GulfSufra — Jinni Restaurant Websites page

This ZIP updates the existing React/Vite GulfSufra project without rebuilding the homepage or the main Services page.

## Page URL

`/services/restaurant-websites`

Features: compact cream-overlay hero, original cheeky Jinni character, Jingle desktop/mobile mockup, magic lamp, four key benefits including FREE SEO setup, four demo website cards with larger previews, three-step process with interactive golden lamp and compact CTA. The hero and content sections are boxed except for the original navigation. Each CTA opens a responsive inquiry modal. Template selection carries through automatically.

The four restaurant samples are **demo concepts**, not actual GulfSufra client projects. Neutral profile illustrations are not presented as verified customer reviews. Free SEO means initial essential on-page SEO setup, not guaranteed rankings or recurring SEO services.

## Connect the form (required before live submissions)

The recipient is configured in `api/inquiry.js` as `yalla@gulfsufri.com`. The handler sends mail via **Resend**. It is not operational until the steps below are complete:

1. Open an account with Resend, verify a domain you control, and create an API key.
2. In Vercel → Project → Settings → Environment Variables, set:
    - `RESEND_API_KEY`: your private Resend API key (server-side only)
    - `RESEND_FROM_EMAIL`: a sender address at your verified domain, e.g. `website@gulfsufri.com` (only if that domain is verified)
3. Redeploy the Vercel project.
4. Submit a genuine test inquiry and confirm mail arrives at `yalla@gulfsufri.com` before advertising the page.

Do **not** put your API key in `VITE_` variables or commit it to source control. When mail is not configured, the form returns a visible error and does not claim that the inquiry succeeded. The mail service and sender-domain verification are external steps, not done by this ZIP.

For production campaigns consider adding a CAPTCHA such as Cloudflare Turnstile and durable rate limiting to protect against spam.

## Deploy

This is a complete Vite project. Install dependencies with `npm install`, run `npm run build`, and deploy the project folder to Vercel with framework preset Vite and output directory `dist`. `/api/inquiry` is a Vercel serverless function, and the provided rewrite intentionally excludes `/api/` and `/assets/`.

## Design / responsiveness

- Original GulfSufra header and footer remain in place.
- Existing service-character work and homepage stay untouched.
- Jinni assets remain separate images, and all speech bubbles and CTAs are HTML/CSS.
- Desktop: four-card template showroom; mobile: stacked cards, simplified composition.
- Animations respect the user's reduced-motion preference.
- The template previews use original generated demo imagery.

## Interactive behavior

- Jinni uses a timed rise/floating motion. Her responsive HTML speech bubble is placed beside her, not over her face.
- Key benefit icons reveal on scroll; FREE SEO has a subtle gold shimmer.
- Four demo preview cards respond to hover/focus and click. A chosen template preselects itself in the inquiry form.
- The three-step process reveals progressively; visitors can click or tap the gold lamp for Jinni's playful response.
- Reduced-motion CSS disables decorative motion.

## Verification

Source files and image assets have been checked for presence and parseable syntax. The local environment could not install npm dependencies, so a full `npm run build` and browser-based responsive/interaction check must still be performed after installing dependencies.

## Navigation fix (October 2026)
- Header → Services dropdown → Restaurant Websites now has an explicit clickable/tappable entry. The Services text still opens the overview page; a separate chevron button expands the dropdown on desktop/touch. Mobile menu continues to list each service directly.
- Main Services page → Restaurant Websites → Learn More (and section heading) routes to `/services/restaurant-websites`.
- Homepage → Restaurant Websites service card and Sufri's “Build My Website” bubble also go to the same page.
- Footer → Our Services → Restaurant Websites is linked directly.
- The `/services/restaurant-websites` React Router route and the Vercel SPA rewrite are retained. Deploy the entire updated ZIP rather than only changed JSX files; an older deployment will continue to show the previous navigation.
