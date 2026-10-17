# Pricing + Contact Us — GulfSufra

New live routes: `/pricing`, `/contact`.

- `src/pages/Pricing.jsx` and `src/pages/pricing.css`: three suggested starting packages (The First Course, The Main Course, The Full Sufra) with **custom quotes** because prices have not been approved, independent service cards, steps, FAQ, and CTA.
- `src/pages/Contact.jsx` and `src/pages/contact.css`: responsive inquiry page. Country, services, plan, restaurant name, name, and email/WhatsApp are collected. Either email or phone is required; relevant pricing plan is preselected from `/contact?plan=foundation|growth|partner|custom`.
- `src/App.jsx`: imports these two pages instead of placeholder exports.
- `api/inquiry.js`: accepts `General Inquiry` and `Package Consultation` in addition to existing services. Uses the existing endpoint and Resend integration.

**Email delivery** requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL` configured on Vercel. Without them, the API returns a clear error and the form offers a mailto fallback. Destination is `yalla@gulfsufri.com` as used elsewhere in this project.

No fixed prices, timelines, customer counts, or ratings were invented. Existing Header, Footer, About page, four service pages, assets, and navigation remain unchanged.
