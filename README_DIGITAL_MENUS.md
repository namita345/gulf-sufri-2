# GulfSufra — Digital Menus page

**URL:** `/services/digital-menus`

This release adds a responsive, real React Digital Menus service page inspired by the approved GulfSufra reference. The header and footer remain universal; the new page is linked from the header Services dropdown, Services > Digital Menus > Learn More, and the footer Digital Menu link.

## Page sections

- Full-width cinematic hero with boxed content alignment and Tabikh + enchanted digital menu book
- Four features: QR Access, Instant Updates, Multi-Language, Upsell Smarter
- Four mobile-menu style showcases: Classic Gulf, Modern Elegant, Modern Dark, Light & Fresh
- Three-step process and benefits, in spaced boxed sections
- Boxed final CTA and modal inquiry form

Menu cards offer click-to-preview and choose-style actions; the chosen style prepopulates the Digital Menus inquiry. On touch screens the first tap activates the template card; the preview button can also be used directly. Scroll animations respect reduced motion. All new asset images are under `public/assets/gdm-*`.

## Deployment (Vercel)

Root: ZIP root. Framework: Vite. Build command: `npm run build`. Output directory: `dist`. Install dependencies using `npm install` when internet access is available. `vercel.json` already supplies React Router rewrites.

## Inquiry endpoint configuration

The new Digital Menus form uses the existing `/api/inquiry` Vercel function and submits `service: "Digital Menus"`. It preserves the existing Restaurant Websites inquiry behavior, and adds the four Digital Menus choices to the template allowlist. For live delivery, the Vercel environment requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL` with a verified sender. Email recipient remains `yalla@gulfsufri.com`. Without these environment variables, the API correctly responds with a setup error; the form then presents a mailto fallback.

## Notes

Generated artwork is illustrative, including the menu previews and sample food pricing; the QR artwork is decorative rather than a functional menu QR code. The process illustration in Step 1 is the supplied transparent image; the following two steps reuse QR and updates visuals. The intended design is close to the approved reference, but final cross-browser/mobile visual QA must be done on your Vercel preview. Dependencies were unavailable in this sandbox, so a production build could not be executed here; JSX/CSS syntax and asset integrity were verified.
