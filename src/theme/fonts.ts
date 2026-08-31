export const FONTS = {
  script: "'Great Vibes', cursive",
  display: "'Playfair Display', 'Times New Roman', serif",
  body: "'Crimson Text', Georgia, serif",
  cormorant: "'Cormorant Garamond', 'Times New Roman', serif",
} as const;

export type FontToken = keyof typeof FONTS;

