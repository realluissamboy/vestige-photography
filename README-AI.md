# Vestige Photography — AI Reference

One-line: React + Vite photography portfolio for Susana Andrea / Vestige Fine Art Photography.

## Architecture
- Single-page React app, client-side routing via component state (no router lib).
- Component model currently monolithic in `src/vestige-site.jsx` (1,271 LOC). TS migration to `pages/` + `components/` is planned on `refactor/componentize-ts`.

## Tech stack
- React 19 + react-dom
- Vite 6 (`@vitejs/plugin-react`)
- Plain JSX today; TypeScript migration in progress on a parallel branch
- `sharp` (devDep) used at build-time only for `npm run images`

## Key directories
- `src/` — application code (currently single file)
- `public/` — static assets and image originals
- `public/portfolio/` — gallery imagery
- `scripts/` — build-time tooling (`gen-image-variants.mjs`)
- `.claude/rules/` — creative direction specs (`direction-a.md`, `direction-b.md`, `pages.md`, `responsive.md`)
- `.claude/CLAUDE.md` — project brief + design principles

## Image convention
Source files: `<name>.webp` (e.g. `public/hero.webp`, `public/portfolio/pinup-coral.webp`).
Variant files generated alongside: `<name>-480w.webp`, `<name>-768w.webp`, `<name>-1280w.webp`.

After adding any new source image, regenerate variants:

```
npm run images
```

The generator is idempotent — existing variants are skipped, and sources smaller than a target width are skipped for that width.

## Naming conventions
- React components: PascalCase
- Hooks: `useCamelCase`
- Asset filenames: kebab-case
- Brand color tokens (Direction B / Vintage Warmth): Parchment `#EFE9D9`, Tiki `#317B73`, Terracotta `#BC6C25`
