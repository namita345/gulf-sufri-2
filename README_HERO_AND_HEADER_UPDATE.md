# GulfSufra — Full-Width Jinni Hero and Emerald Header

This ZIP updates the existing working React/Vite project supplied in `GulfSufra_Restaurant_Websites_Navigation_Fixed(1).zip`.

## Changes made

1. **Jinni Restaurant Websites hero only** now spans the full browser width with square outer corners. The hero contents remain aligned to a centered, responsive content grid. All sections below it remain boxed.
2. **Global header** now uses a shiny, slightly translucent emerald gradient with a fine gold edge, subtle gloss, and blur. It becomes shorter and more solid on scroll, preserving the existing links/dropdown and mobile menu.
3. Hero title width and responsive proportions have been refined. Jinni, the laptop/phone, lamp, and speech bubble stay separate so their animations remain intact. Speech bubble is positioned to the right/top of Jinni instead of over her face.
4. Photorealistic **illustrative** hospitality portrait placeholders replace the cartoon avatar strip. The actual asset is `public/assets/jinni-portrait-placeholders.webp`. The design includes a five-star decorative motif, the wording "Trusted by clients", and the requested two-line explanatory copy.
5. Preserves template cards, page animations, inquiry popup, contact recipient, and navigation routing.

## Important trust-data note

The portraits were generated as **placeholders**, not sourced from real GulfSufra customers. Five stars are a **design motif**, not a verified rating. A small on-page note indicates that the avatars and rating must be replaced with genuine customer photographs, testimonials, and verified rating data **before this section can be used as customer proof in production**. Do not remove the note without supplying the real data.

## Running and deploying

- `npm install`
- `npm run dev` to preview, or `npm run build` to create `dist/`.
- Deploy to Vercel with the Vite preset, root directory `.`, output `dist/`.
- The inquiry endpoint in `api/inquiry.js` still requires the specified Resend environment variables/domain verification. A sent confirmation is not shown unless it actually succeeds.

## Test status

All original files remain, and the new imagery has been checked. The CSS was parsed and verified. **A full browser render and production build were not possible in this environment because npm registry access is blocked**. Please test on Vercel at desktop/tablet/mobile widths before publishing.
