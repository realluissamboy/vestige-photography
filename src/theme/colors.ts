// Book-True palette, drawn from Susana's monograph.
export const COLORS = {
  parchment: "#EFE9D9",
  cream: "#F5F0E8",
  ink: "#1A1A1B",
  obsidian: "#1A1A1A",
  warmWhite: "#FAF8F4",
  stone: "#C8BFA9",
  stoneDivider: "#9E8C79",
  crimson: "#CD2644",
  subtitleWhite: "#FDFEFD",
  rose: "#C47F7A",
  plum: "#8B6F7C",
  kulture: "#5D7F9A",
  tiki: "#317B73",
} as const;

export type ColorToken = keyof typeof COLORS;

