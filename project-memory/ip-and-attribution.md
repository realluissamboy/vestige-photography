# IP and attribution — brand alignment with the Vestige book

## Situation
The website is adopting visual and verbal signals from Susana's coffee-table book *Vestige: Twenty Years of Modern Pin-Up* (Wonk Press, 2025). Luis flagged a concern about copyright/trademark infringement. This note records the reasoning and the mitigations in place.

## Why there's no infringement

1. **Susana owns the brand.** The book's copyright page names *Susana Andrea Victoria Clark* as the copyright holder of both the book and the photographs. "Vestige" is her business name. She is the client directing the agency to emulate her own monograph. A client cannot infringe on her own IP.
2. **Style isn't copyrightable.** Typographic pairings (script + italic serif), color palettes, and naming conventions ("Modern X") are not protected expressions. Trade dress protections exist but they apply to consumer-product packaging and storefront identity in a commercial-confusion context, not to a website built by the brand owner herself in alignment with her own book.
3. **We use openly-licensed fonts.** The site uses **Great Vibes** and **Playfair Display** from Google Fonts (SIL Open Font License). These are not the specific fonts licensed for the book's print edition. They are different fonts from the same visual family.
4. **No assets are lifted.** No scanned book graphics, no image-traced wordmarks, no cropped page layouts. Every element on the site is rebuilt from first principles using open fonts and plain CSS color values.

## Mitigations in place

- **No asset extraction.** Never copy graphics, title treatments, or page captures from the book directly into the site.
- **Open fonts only.** All typography comes from Google Fonts or the existing webpack/Vite stack.
- **Color palette is evocative, not claimed as reproduction.** Approximate values near the book's sections (e.g., crimson ≈ `#C8142C`) are used as web-friendly color tokens. They are not claimed to be exact Pantone matches or lifted swatches.

## Recommended attribution

**Book designer credit** — out of respect for Carrie A. Smith, who designed the book interior and cover, consider adding a small footer line:

> Brand voice informed by *Vestige: Twenty Years of Modern Pin-Up* (Wonk Press, 2025). Book design by Carrie A. Smith.

This is courtesy, not legal obligation. Luis's call whether to include it.

## What would actually be risky (and we are not doing)

- Copying Wonk Press's cover layout verbatim as a hero treatment.
- Using "Wonk Press" branding or the Wonk Press ampersand seal logo anywhere on the site.
- Reusing co-writer names (Angelique Noire, Heidi Van Horne, Baby Doe) in site copy without permission or context.
- Using scans or crops from the book as web images.
- Marketing the website as "the official companion to the book" without the publisher's involvement.

If any of those ever come up, stop and ask.
