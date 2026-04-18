export const SPACING = {
  4: "4px",
  8: "8px",
  12: "12px",
  16: "16px",
  20: "20px",
  24: "24px",
  32: "32px",
  40: "40px",
  48: "48px",
  52: "52px",
  60: "60px",
  80: "80px",
  120: "120px",
} as const;

export type SpacingToken = keyof typeof SPACING;
