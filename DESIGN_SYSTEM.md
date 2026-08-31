# Vestige Photography — Design System & Decisions Log

> **Single Source of Truth** for visual identity, typography rules, color tokens, elevation effects, component specifications, and motion guidelines across the Vestige Photography digital monograph.

---

## 1. Brand Identity & Creative Direction

- **Concept**: A digital monograph celebrating 20 years of fine-art and vintage-inspired photography by founder Susana Andrea.
- **Inspiration**: Drawn directly from the physical monograph *Vestige: Twenty Years of Modern Pin-Up* (Wonk Press, 2025, Book design by Carrie A. Smith).
- **Core Aesthetic**: Warm parchment book-spreads, rich vintage crimson accents, elegant cursive script wordmarks, and editorial serif body text.

---

## 2. Typography System

All typography in the codebase is defined in `src/theme/fonts.ts` and `src/styles/tokens.css`.

| Token | Font Family | Typical Size | Usage |
| :--- | :--- | :--- | :--- |
| `FONTS.script` | `'Great Vibes', cursive` | `28px` – `64px` | • **Wordmark**: "Vestige"<br>• **Navigation**: "Portfolio", "About"<br>• **Subtitle**: "Twenty years of [category]"<br>• **Founder Tag**: "Susana Andrea, founder"<br>• **About Section Headings**: "From the Pit to the Portrait", "San Diego, by Way of Everywhere", "In Print" (in ink black)<br>• **CTA Button**: "Book a Session"<br>• **Social Links**: "Instagram", "Facebook"<br>• **Section Kickers**: "The Philosophy", "The Roots", "The Heritage", "The Accomplishments" |
| `FONTS.display` | `'Playfair Display', serif` | `32px` – `92px` | • Editorial headings and category titles<br>• Large numerals and date markers |
| `FONTS.cormorant` | `'Cormorant Garamond', serif` | `24px` – `32px` | • Philosophy pull-quote on About page<br>• Lightbox controls |
| `FONTS.body` | `'Crimson Text', serif` | `18px` – `20px` | • Editorial body narrative, bio paragraphs, and book colophon credits |

### Key Typographic Rules:
1. **Script Subtitle Case**: The hero subtitle is formatted as `"Twenty years of "` followed by the lowercase category title (`"modern pin-up"`, `"boudoir noir"`), preserving fluid cursive flow.
2. **Descender Clearance**: The cursive lowercase "g" in the "Vestige" wordmark requires minimum **`68px` top margin** on desktop and **`32px`** on mobile to ensure the descender loop never collides with subtitles below.
3. **Universal Navigation**: "Portfolio" and "About" use `FONTS.script` on all pages (Home hero, subpage headers, and mobile menu overlay) to ensure instant visual consistency.

---

## 3. Color Palette & Contrast Tokens

Defined in `src/theme/colors.ts` and `src/styles/tokens.css`.

### Core Brand Colors
| Color Token | Hex Code | Purpose / Application |
| :--- | :--- | :--- |
| `parchment` | `#EFE9D9` | Warm archival paper background across all pages |
| `cream` | `#F5F0E8` | Light text on dark photo areas and slide progress fill |
| `ink` | `#1A1A1B` | Primary high-contrast text color on parchment |
| `obsidian` | `#1A1A1A` | Deep charcoal for quotes and lightbox backdrops |
| `crimson` | `#C8142C` | Signature brand crimson for wordmarks, nav links, CTA button, and borders |
| `muted` | `#6B5B4A` | Secondary text & subtitles (**WCAG AA compliant ≥4.5:1** on parchment) |
| `stoneDivider` | `#9E8C79` | Archival dividers and borders (**≥3:1 contrast** on parchment) |

### Category Signature Palette
| Category | Token | Hex Code |
| :--- | :--- | :--- |
| Modern Pin-Up | `crimson` | `#C8142C` |
| Boudoir Noir | `plum` | `#8B6F7C` |
| Classic Glamour | `rose` | `#C47F7A` |
| Kulture Kitsch | `kulture` | `#5D7F9A` |
| Tiki & Tropical | `tiki` | `#317B73` |

---

## 4. 3D Elevation & Text Lighting Effects

Defined in `src/theme/effects.ts`.

To ensure crimson and cream typography pops off photographic textures without feeling like a flat label or heavy glow, multi-layered 3D shadows are used:

```ts
// 3D Bevel Extrusion + Top Specular Highlight + Ambient Depth
export const VESTIGE_WORDMARK_SHADOW = [
  "0 -1px 1px rgba(255, 255, 255, 0.45)",  // Top specular highlight rim
  "0 0 2px rgba(255, 255, 255, 0.35)",    // Soft light catch
  "0 1px 0 #8f0e1f",                      // Extrusion step 1
  "0 2px 0 #7a0c1b",                      // Extrusion step 2
  "0 3px 0 #650a16",                      // Extrusion step 3
  "0 4px 10px rgba(0, 0, 0, 0.5)",        // Contact drop shadow
  "0 8px 24px rgba(0, 0, 0, 0.35)",       // Ambient soft shadow
].join(", ");

export const VESTIGE_TEXT_SHADOW = [
  "0 -1px 1px rgba(255, 255, 255, 0.4)",
  "0 0 2px rgba(255, 255, 255, 0.3)",
  "0 1px 0 #8f0e1f",
  "0 2px 0 #7a0c1b",
  "0 3px 6px rgba(0, 0, 0, 0.5)",
  "0 6px 16px rgba(0, 0, 0, 0.3)",
].join(", ");
```

---

## 5. Component Specifications

### 5.1 Homepage Hero Carousel (`Home.tsx`)
- **Duration**: `7000ms` (7s) auto-advance cycle.
- **Keyboard Navigation**: Left and Right arrow keys cycle through slides.
- **Top Scrim**: Smooth gradient (`rgba(10,10,11,0.45)` down to transparent) ensuring high visibility for nav links over light/dark photos.
- **Slide Indicators (Progress Pills)**:
  - Active capsule: `28px × 10px`, `1.5px solid var(--color-crimson)`, `background: rgba(10,10,11,0.6)`.
  - Progress fill: Pure `#FFFFFF` animating via `@keyframes hero-progress` over 7000ms.
  - Inactive dots: `10px × 10px`, `1.5px solid var(--color-crimson)`.
  - Shadows: `boxShadow: 0 1px 2px rgba(255,255,255,0.35), 0 2px 4px rgba(0,0,0,0.35)`.

### 5.2 Mobile Hamburger Menu (`MobileMenu.tsx`)
- **Structure**: Pixel-perfect vector SVG (`viewBox="0 0 26 20"`, 3 lines at `y = 3, 10, 17` with `strokeWidth="2.5"` and `strokeLinecap="round"`).
- **Shadow**: Uniform `VESTIGE_ICON_SHADOW` (`drop-shadow(0 -1px 1px rgba(255,255,255,0.4)) drop-shadow(0 1px 0 #7a0c1b) drop-shadow(0 3px 5px rgba(0,0,0,0.45))`).
- **Overlay**: Full-screen modal backdrop (`rgba(26,26,26,0.98)`), Escape key to dismiss, locked body scrolling.

### 5.3 Portfolio Page (`Portfolio.tsx`)
- **Desktop Grid**: 4-column balanced grid with category cover plate and adjacent preview photos.
- **Mobile Split Cards (Option A)**: 2-column editorial card with cover photo on the left (`1.15fr`) and category color plate on the right (`1fr`).
- **Drill-In Gallery**:
  - Category header banner in signature brand color with large display title.
  - "← back to portfolio" smooth return navigation.
  - Photography grid with responsive columns and subtle hover zoom.
- **Lightbox (`Lightbox.tsx`)**:
  - Fullscreen dark overlay with image fade-in.
  - Next / Prev buttons and Arrow key navigation cycling within current category.
  - Touch-friendly 44px hit targets.

### 5.4 Call-to-Action Buttons (`Button.tsx`)
- **Font**: `FONTS.script` (*Great Vibes*, `40px` desktop, `32px` mobile).
- **Color**: `cream` text on `crimson` background.
- **Hover Micro-Interaction**: `translateY(-2px)` with shadow lift (`boxShadow: 0 10px 28px rgba(200, 20, 44, 0.38)`).

---

## 6. Motion & Page Transitions

### 6.1 Route Page Transitions (`App.tsx`)
- **Transition Duration**: `280ms`.
- **Easing Curve**: `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Behavior**: Outgoing view dissolves (`opacity: 1 -> 0`) and gently descends (`translateY(0 -> 4px)`), scroll position instantly resets to `top: 0`, and incoming view smoothly glides into place.

### 6.2 Category Drill-In Transitions (`Portfolio.tsx`)
- **Transition Duration**: `200ms`.
- **Easing Curve**: `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Behavior**: Overview tiles dissolve into category header and masonry gallery, with instant scroll to top and smooth entrance.
