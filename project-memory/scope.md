# Scope

Contract of record. PM checks every new request against this file. Update only with Luis's explicit approval, logged in `decisions-log.md`.

## Status

Luis-confirmed operational scope as of 2026-04-17. Susana has not formally ratified a written scope; her agreement is implied from the IG DM thread (see `client-brief.md`) and her positive response to the in-progress site.

## Tech stack (verified from repo)

- React 19 + Vite 6
- Single-page app, entry at `src/vestige-site.jsx` via `src/main.jsx`
- No TypeScript, no router library, no styling framework
- Assets served from `public/`
- No CMS. All content hand-authored in JSX.
- Cormorant Garamond loaded via Google Fonts in `index.html` (fixed 2026-04-17).

## Domain

susanavestige.com — owned by Susana on GoDaddy. Deploy target will point here.

## Creative direction

**Hybrid leaning A.** Confirmed against current code on 2026-04-17.

- Typography: Cormorant Garamond throughout (Direction A).
- Layout: asymmetric staggered grid (Direction A).
- Image borders: 1px obsidian (Direction A).
- Palette: warmer than A's spec, cooler than B. Live tokens:
  - cream `#F5F0E8`
  - warmWhite `#FAF8F4`
  - obsidian `#1A1A1A`
  - stone `#C8BFA9`
  - muted `#8A8070`
- None of Direction B's signatures (Parchment, Thicket Green, Terracotta, League Spartan, Crimson Text) are present.
- Branding anchor: Susana's "Vestige: Twenty Years of Modern Pin-Up" coffee table book (per Susana, "that is my branding").

## Agreed deliverables

Shape: minimalist, one-page-style portfolio site, with Portfolio and About as the only secondary pages.

Pages in scope:
- Home (single-screen hero — currently uses AI image, must be replaced with a real Susana photo from her OneDrive archive)
- Portfolio (categories confirmed: Pin-Up, Editorial, Lifestyle & Tiki, Events & Music)
- About (Susana explicitly loves the current version — treat as largely locked)

Footer scope: brand wordmark and minimal social links to Susana's Instagram and Facebook. No newsletter, no legal pages, no separate social page.

Responsive behavior per `.claude/rules/responsive.md`:
- Hamburger menu on mobile
- Single-column image layout on mobile
- 44px minimum touch targets
- Display fonts scaled 20% down on mobile, body stays at 16px

Accessibility target: **WCAG 2.1 AA** — approved by Luis 2026-04-17.

## Explicitly out of scope

- **The Velvet Gazette page.** Not being built.
- **Books page.** Not being built. Any reference to Susana's book links out to https://www.wonkpress.com/products/vestige-twenty-years-of-modern-pin-up.
- **Contact page / booking route.** Not being built. The "Book a Session" CTA on the Portfolio page links to `https://ig.me/m/susanavestige` (Instagram DM deep link). A real on-site contact form is explicitly out of scope for this engagement; if Susana requests one later, Luis frames it as a paid Avenida add-on.
- **Newsletter signup.** Removed from footer scope.
- **Legal pages.** No privacy policy or terms page.
- **Dedicated social page.** No.
- **Any CMS.** All content hand-authored in JSX.
- **On-site e-commerce.** Books link out. No cart, no checkout.
- **Analytics.** No Plausible, Fathom, GA4, etc.
- **Booking calendar integrations, password-protected client galleries, print fulfillment.**
- **SEO targets beyond basic discoverability.** No keyword ranking goals, no local SEO campaign.

## Known open decisions affecting scope

- **Portfolio interaction model.** Susana expected clickable category folders that drill into more photos. Two live options: (a) build the drill-down, (b) drop category text labels and present a flat gallery with more photos. Not yet decided.
- **Intake form.** Luis committed to sending Susana an intake form to capture her voice and category detail. Not clear whether the form lives on the site, in a separate doc, or in DM.

## Timeline

- **Start date:** not set
- **Milestones:** none
- **Launch date:** none

No timeline is on record. Work proceeds without a deadline. PM will flag if a request implies one.

## Budget

- **Total:** not on record
- **Billing schedule:** not on record

This is a personal-relationship project (old friend). Luis has not framed it as billable. PM will flag when a request implies effort worth quoting Susana for.

## Change request terms

Default: additions outside this document require Luis's approval. Luis decides whether to bring them to Susana. Change orders are informal given the personal relationship unless Luis sets formal terms later.
