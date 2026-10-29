# Gulf Sufra SEO Round 1 — Cloudflare Workers

The deployment target is the existing Cloudflare Worker **gulf-sufri**, connected to GitHub `main`.

## Cloudflare dashboard build settings

- Build command: **`npm run build`** (currently shown as `None` in the supplied screenshot; change it)
- Deploy command: **`npx wrangler deploy`** (keep existing)
- Root directory: repository root (confirm this matches the Cloudflare dashboard)

`wrangler.jsonc` uses the existing Worker name, pre-rendered assets in `dist`, clean URLs without trailing slashes, and a real 404 page. Only `/api/*` is handled by the Worker entrypoint; other public routes are served as static HTML. Do not add a wildcard SPA rewrite over these pre-rendered pages.

## Form delivery secrets

The original Vercel handler at `api/inquiry.js` is not used by Workers. Its behavior is mirrored at `worker/index.js` for `/api/inquiry`.

In Cloudflare Workers settings, configure:

- `RESEND_API_KEY` as a secret
- `RESEND_FROM_EMAIL` as a valid verified sender address

Do not commit these credentials to GitHub. If the account has no valid Resend configuration, the form returns a clear 503 response and users can contact the published email address instead.

## Verification before production rollout

1. Deploy through the existing GitHub-connected Worker preview/staging flow if available.
2. Test `/`, `/about`, `/services/digital-menus`, `/pricing` and the remaining sitemap URLs for HTTP 200, unique titles/canonicals and page-specific HTML.
3. Confirm `/robots.txt`, `/sitemap.xml` and `/404.html` are reachable; a nonexistent URL should return HTTP 404.
4. Test an actual inquiry using a safe test email. Verify receipt before accepting customer traffic.
5. In Cloudflare domain settings, verify `www.gulfsufra.com` redirects to `https://gulfsufra.com/`.
6. Submit the sitemap in Google Search Console and Bing Webmaster Tools.

This ZIP has been build-tested locally, but has not been deployed into the customer's Cloudflare account.
