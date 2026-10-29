# Gulf Sufra — Cloudflare Pages SEO Round 1

This project is prepared for **Cloudflare Pages** using a Vite production build and static pre-rendered HTML routes.

## Deployment settings

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: project root
- The prerender script generates `index.html`, `about.html`, `pricing.html`, `services/*.html` and the other public routes.
- `public/robots.txt` and `public/sitemap.xml` are copied into `dist` by Vite.
- `dist/404.html` provides an actual not-found response on Cloudflare Pages.

Cloudflare Pages' static route matching makes `/about` serve `about.html`, preserving the canonical URL without a trailing slash. The previous Vercel routing configuration is intentionally not included.

## Verify after the Cloudflare deployment

1. Check `/robots.txt` and `/sitemap.xml` return 200.
2. Check `/about`, `/services/digital-menus`, `/pricing`, and all other sitemap URLs return 200 with their own title, description, canonical URL and visible HTML.
3. Check a nonexistent route returns 404.
4. Check `www.gulfsufra.com` forwards to `https://gulfsufra.com/`; configure this at the Cloudflare zone/domain level if required. Do not add a wildcard rewrite over the generated HTML pages.
5. Check inquiries submit successfully. The supplied `api/inquiry.js` is Vercel-style serverless code and is not automatically a Cloudflare Pages Function. It may require a Cloudflare-specific backend migration, depending on how inquiries are currently handled in production.
6. Submit `https://gulfsufra.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

If hosting is **Cloudflare Workers with static assets**, rather than Cloudflare Pages, verify the Worker asset-routing configuration separately. This ZIP is configured for Pages.
