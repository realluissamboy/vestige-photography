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
| `FONTS.script` | `'Great Vibes', cursive` | `28px` – `64px` | • **Wordmark**: "Vestige"<br>• **Navigation**: "Portfolio", "About"<br>• **Subtitle**: "Twenty years of [category]"<br>• **Founder Tag**: "Susana Andrea · Founder"<br>• **About Section Headings**: "The Philosophy", "The Roots", "The Heritage", "The Accomplishments" (in crimson with 3D shadow)<br>• **About Subtitles**: "From the Pit to the Portrait", "San Diego, by Way of Everywhere", "In Print" (in ink black)<br>• **CTA Button**: "Book a Session"<br>• **Action Links**: "View Portfolio", "Back to Portfolio"<br>• **Social Links**: "Instagram", "Facebook" |
| `FONTS.display` | `'Playfair Display', serif` | `32px` – `92px` | • Editorial headings and category titles<br>• Large numerals and date markers |
| `FONTS.cormorant` | `'Cormorant Garamond', serif` | `24px` – `32px` | • Philosophy pull-quote on About page<br>• Lightbox controls and metadata |
| `FONTS.body` | `'Crimson Text', serif` | `18px` – `20px` | • Editorial body narrative, bio paragraphs, and book colophon credits |

### Key Typographic Rules:
1. **Script Subtitle Case**: The hero subtitle is formatted as `"Twenty years of "` followed by the lowercase category title (`"modern pin-up"`, `"boudoir noir"`), preserving fluid cursive flow.
2. **Descender Clearance**: The cursive lowercase "g" in the "Vestige" wordmark requires minimum **`68px` top margin** on desktop and **`32px`** on mobile to ensure the descender loop never collides with subtitles below.
3. **Universal Navigation**: "Portfolio" and "About" use `FONTS.script` on all pages (Home hero, subpage headers, and mobile menu overlay) to ensure instant visual consistency.
4. **About Page Hierarchy**: Section titles ("The Philosophy", "The Roots", "The Heritage", "The Accomplishments") are rendered in prominent crimson script (`54px` desktop / `40px` mobile with 3D shadow), while descriptive section subtitles ("From the Pit to the Portrait", "San Diego, by Way of Everywhere", "In Print") sit beneath in a smaller, delicate ink black script (`38px` desktop / `30px` mobile).
5. **CTA Companion Links**: "Back to Portfolio" (on Portfolio drill-in) and "View Portfolio" (on About) sit directly below "Book a Session" in `32px` script with crimson underline and 3D shadow.

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

### Category Signature Palette & Sequence Covers
| Category | Token | Hex Code | Category Cover Image (`id`) |
| :--- | :--- | :--- | :--- |
| Modern Pin-Up | `crimson` | `#C8142C` | *Jade Wall* (`id: 1`) |
| Modern Kulture | `kulture` | `#5D7F9A` | `R2C0A2950` (`id: 25`) |
| Modern Burlesque | `plum` | `#8B6F7C` | `r2C0A4286` (`id: 34`) |
| Modern Tiki | `tiki` | `#317B73` | *Avalon Monet* (`id: 9`) |
| Modern Glamour | `rose` | `#C47F7A` | `R2C0A1609` (`id: 19`) |

---

## 4. 3D Elevation & Text Lighting Effects

Defined in `src/theme/effects.ts`.

Multi-layered 3D bevel and specular lighting ensures crimson and cream typography pops off photographic textures without feeling like flat labels or harsh glows:

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
- **Duration**: `7000ms` (7.0s) auto-advance cycle with synchronized CSS progress bar.
- **Keyboard Navigation**: Left and Right arrow keys cycle through slides.
- **Focal Cropping System**:
  - `HERO_IMAGE_POSITIONS` specifies tailored `objectPosition` values for desktop.
  - `HERO_MOBILE_POSITIONS` provides responsive override crops for mobile screens.
- **Layout Architecture (Desktop)**:
  - **Top-Left**: "Vestige" cursive signature and unbolded "Twenty years of [category]" subtitle in pure luminous white (`#FFFFFF`) with multi-layer crimson depth shadows.
  - **Bottom-Right**: "Portfolio" and "About" unboxed cursive navigation links in pure white with hover lift.
  - **Bottom-Left**: Floating frosted glass slide indicators (`bottom: 36px, left: 48px`).
- **Slide Indicators (Progress Pills)**:
  - **Desktop / Laptop Placement**: Anchored to **bottom-left** (`bottom: 36px, left: 48px`).
  - **Mobile Placement**: Centered horizontally at `bottom: 24px`.
  - **Frosted Glass Container**: `backdropFilter: "blur(10px)"`, `background: "rgba(10, 10, 12, 0.45)"`, `borderRadius: "999px"`, `border: "1px solid rgba(255, 255, 255, 0.18)"`.
  - **Active Capsule**: `52px × 13px` (desktop) / `44px × 12px` (mobile) with animated pure `#FFFFFF` progress fill and `2px solid var(--color-crimson)` border.
  - **Inactive Dots**: `13px × 13px` (desktop) / `12px × 12px` (mobile) with `1.5px solid rgba(200, 20, 44, 0.75)`.

### 5.2 Mobile Hamburger Menu (`MobileMenu.tsx`)
- **Structure**: Pixel-perfect vector SVG (`viewBox="0 0 26 20"` with `strokeWidth="2.5"`).
- **Overlay Variant**: Pure white (`#FFFFFF`) vector strokes with dual contrast drop shadows on hero view.
- **Overlay Modal**: Full-screen modal backdrop (`rgba(26,26,26,0.98)`), Escape key dismiss.
- **Scroll Management**: Clean lock on open, automatic release on close.

### 5.3 Portfolio Page (`Portfolio.tsx`)
- **Category Overview**: 4-column balanced grid on desktop, editorial 2-column split cards on mobile.
- **Drill-In Gallery**:
  - Category banner with display typography and instant auto-scroll to top.
  - **Top Navigation Link**: `← Back to Portfolio` rendered at the top of the header banner in pure white (`#FFFFFF`) with subtle underline and hover lift.
- **Universal Reset**: Clicking "Portfolio" from header or menu resets drilled-in category view back to overview.
- **Lightbox (`Lightbox.tsx`)**:
  - Rendered directly into `document.body` via `createPortal` for 100% true viewport centering and isolation from ancestor CSS transforms.
  - Left / Right keyboard arrow navigation and touch swipe support.

### 5.4 Call-to-Action Buttons (`Button.tsx`)
- **Font**: `FONTS.script` (*Great Vibes*, `40px` desktop, `32px` mobile).
- **Color**: `cream` text on `crimson` background.
- **Hover Micro-Interaction**: `translateY(-2px)` with shadow lift (`boxShadow: 0 10px 28px rgba(200, 20, 44, 0.38)`).

---

## 6. Motion & Navigation Architecture

### 6.1 Route Page Transitions (`App.tsx`)
- **Immediate Navigation**: Zero artificial blank-out delay or opacity flickering.
- **Behavior**: Direct, instantaneous rendering on click with instant scroll reset to top, ensuring rock-solid stability across desktop and mobile.

### 6.2 Category Drill-In Navigation (`Portfolio.tsx`)
- **Immediate Switching**: Zero delay when entering a category or returning to the portfolio overview.
- **Behavior**: Overview tiles dissolve into category header and masonry gallery with instant scroll to top.
