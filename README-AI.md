# Vestige Photography — implementation reference

React 19 + TypeScript + Vite photography portfolio for Susana Andrea / Vestige Fine Art Photography. Current canonical production URL: **https://susana-vestige-photography.netlify.app/**.

## Architecture

- `src/main.tsx` loads React and design tokens; `src/App.tsx` coordinates the homepage, collection takeover, and existing booking modal.
- `src/pages/Home.tsx` assembles the cover, five collection sections, and About. The homepage scrolls in normal document flow with static images: no parallax, sticky sections, scroll snapping, or persistent homepage navigation. Sections use stable small-viewport heights to avoid mobile browser-toolbar resizing.
- `src/pages/Portfolio.tsx` renders collection galleries and transitions. Portrait phones use two scrolling columns; landscape phones use three. Desktop/tablet collections retain the fitted grid. Navigation stays outside the scrolling grid.
- `src/hooks/useOverlay.ts` owns stacked gallery/lightbox focus and scroll locks. The homepage stays mounted during gallery loading; returning restores its scroll position and initiating control. The top overlay alone handles Escape and traps Tab.
- `src/components/Lightbox.tsx` keeps original-resolution viewing and arrow-key navigation. Opening it makes the gallery inert; closing it preserves the gallery's scroll lock.
- Data is hand-authored in `src/data/gallery.ts` and `src/data/navigation.tsx`. There is no CMS, router library, analytics, or new backend. About and collections are sections, not separate URLs.
- `src/styles/monograph.css` controls the cover/section layout and reduced-motion overrides. Existing theme tokens remain in `src/theme/` and `src/styles/tokens.css`.

## Images

Keep original WebP assets under `public/`; never overwrite client originals for optimization. Run `npm run images` after adding imagery. It generates missing 480/768/1280px derivatives, plus 1920px derivatives for `hero-slides/`, without upscaling sources or replacing existing derivatives. It refreshes `src/data/image-variants.json` with actual files and source dimensions.

`src/data/responsiveImages.ts` uses that manifest for valid srcsets, preserving each source directory and URL-encoding filenames. Full-bleed image sizes account for stable viewport height without parallax overscan. The cover is eager/high-priority; subsequent sections and the About portrait are lazy. Gallery sizes follow their rendered columns. Lightboxes use originals.

The responsive cover preload in `index.html` must match the homepage cover's srcset and sizes. If the cover changes, update both. Current cover: `/hero-slides/modern-burlesque.webp`.

## Metadata

Canonical and sharing URLs, structured data, robots, and the sitemap use `susana-vestige-photography.netlify.app`. The sitemap lists only `/`, because the site has no separate page routes. Structured social links match the site's configured Instagram and Facebook accounts. Sharing images use absolute URLs.

## Booking boundary — deferred by Luis, 2026-09-07

`BookingModal.tsx` is unchanged by this review. Its current submission handler simulates success and does not deliver an inquiry; Luis explicitly deferred adjustments. The About section’s Book a Session button opens the existing modal. Do not interpret local open/close tests as successful delivery or change the form under the responsive-improvement scope.

## Validation

```sh
npm run typecheck
npm run build
git diff --check
npm run preview -- --host 127.0.0.1 --port 5180
```

With Playwright available, run `node scripts/test-responsive.mjs` in another terminal. The script uses installed Chrome by default. If Playwright is supplied by an external runtime, set `PLAYWRIGHT_MODULE` to its absolute `index.mjs` path. Optional settings: `TEST_URL`, `TEST_OUTPUT`, `TEST_BROWSER=webkit`, and `CHROME_CHANNEL`.

The browser checks cover desktop, tablet, narrow and standard portrait phones, landscape, all five collections, keyboard focus, nested locks, scroll restoration, image errors, reduced motion, rotation, and booking open/close. Screenshots default to `/tmp/vestige-responsive-review`. It blocks POST requests and never submits the form. WebKit requires its matching Playwright browser binary; physical iOS Safari still needs device QA.

Local verification does not establish a deployment. Keep this work on its local `codex/` branch until a push or deployment is requested. Preserve the pre-existing untracked ` 2` component/CSS copies.

Historical creative/scope decisions remain in `project-memory/`; older architecture notes there describe earlier versions, not the current implementation.
