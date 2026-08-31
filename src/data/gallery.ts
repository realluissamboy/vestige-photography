import { COLORS } from "../theme/colors";

export type Ratio = "portrait" | "landscape" | "square";

export type Category =
  | "Pin-Up"
  | "Classic Cars"
  | "Burlesque"
  | "Tiki-Rockabilly"
  | "Vintage-Glamour";

export interface GalleryImage {
  id: number;
  ratio: Ratio;
  cat: string;
  src: string;
  label: string;
  focus: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, ratio: "portrait", cat: "Pin-Up", src: "/portfolio/pinup-green-wall.webp", label: "Jade Wall", focus: "50% 20%" },
  { id: 18, ratio: "portrait", cat: "Pin-Up", src: "/portfolio/modern-pinup--Outlaw2.webp", label: "Outlaw2", focus: "60% 5%" },
  { id: 21, ratio: "portrait", cat: "Pin-Up", src: "/portfolio/modern-pinup--R2C0A8596.webp", label: "R2C0A8596", focus: "50% 50%" },
  { id: 25, ratio: "portrait", cat: "Classic Cars", src: "/portfolio/modern-kulture--R2C0A2950.webp", label: "R2C0A2950", focus: "50% 38%" },
  { id: 27, ratio: "landscape", cat: "Classic Cars", src: "/portfolio/modern-kulture--R2C0A7114.webp", label: "R2C0A7114", focus: "50% 50%" },
  { id: 3, ratio: "portrait", cat: "Classic Cars", src: "/portfolio/pinup-coral.webp", label: "Coral & Bloom", focus: "50% 80%" },
  { id: 4, ratio: "portrait", cat: "Classic Cars", src: "/portfolio/pinup-mosh.webp", label: "Miss Mosh", focus: "50% 10%" },
  { id: 34, ratio: "portrait", cat: "Burlesque", src: "/portfolio/modern-burlesque--r2C0A4286.webp", label: "r2C0A4286", focus: "50% 28%" },
  { id: 28, ratio: "landscape", cat: "Burlesque", src: "/portfolio/modern-burlesque--2C0A4365.webp", label: "2C0A4365", focus: "50% 50%" },
  { id: 10, ratio: "landscape", cat: "Tiki-Rockabilly", src: "/portfolio/tiki-patio.webp", label: "Tiki Patio", focus: "50% 30%" },
  { id: 36, ratio: "portrait", cat: "Tiki-Rockabilly", src: "/portfolio/modern-tiki--2C0A0890.webp", label: "2C0A0890", focus: "50% 72%" },
  { id: 9, ratio: "portrait", cat: "Tiki-Rockabilly", src: "/portfolio/tiki-avalon.webp", label: "Avalon Monet", focus: "50% 58%" },
  { id: 37, ratio: "portrait", cat: "Tiki-Rockabilly", src: "/portfolio/modern-tiki--2C0A9684.webp", label: "2C0A9684", focus: "50% 50%" },
  { id: 50, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--R2C0A9752.webp", label: "R2C0A9752", focus: "50% 65%" },
  { id: 51, ratio: "landscape", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--RE2C0A5644.webp", label: "RE2C0A5644", focus: "50% 50%" },
  { id: 43, ratio: "landscape", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--GlamGhoul-(1 of 1).webp", label: "GlamGhoul-(1 of 1)", focus: "50% 50%" },
  { id: 48, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--R2C0A5263.webp", label: "R2C0A5263", focus: "50% 75%" },
  { id: 14, ratio: "landscape", cat: "Vintage-Glamour", src: "/portfolio/glamour-seaside.webp", label: "Seaside Villa", focus: "50% 40%" },
  { id: 16, ratio: "portrait", cat: "Pin-Up", src: "/portfolio/modern-pinup--A0E876E6-FA74-4E22-A0D7-26DFB5261E58.webp", label: "A0E876E6-FA74-4E22-A0D7-26DFB5261E58", focus: "50% 45%" },
  { id: 15, ratio: "portrait", cat: "Pin-Up", src: "/portfolio/modern-pinup--2C0A8311.webp", label: "2C0A8311", focus: "50% 50%" },
  { id: 17, ratio: "portrait", cat: "Pin-Up", src: "/portfolio/modern-pinup--EDIT2C0A5244.webp", label: "EDIT2C0A5244", focus: "50% 50%" },
  { id: 23, ratio: "portrait", cat: "Classic Cars", src: "/portfolio/modern-kulture--2C0A9056.webp", label: "2C0A9056", focus: "50% 50%" },
  { id: 24, ratio: "landscape", cat: "Classic Cars", src: "/portfolio/modern-kulture--R2C0A2708.webp", label: "R2C0A2708", focus: "50% 50%" },
  { id: 26, ratio: "portrait", cat: "Classic Cars", src: "/portfolio/modern-kulture--R2C0A6956.webp", label: "R2C0A6956", focus: "50% 50%" },
  { id: 6, ratio: "portrait", cat: "Classic Cars", src: "/portfolio/cars-a5.webp", label: "Midnight Cruiser", focus: "50% 72%" },
  { id: 5, ratio: "landscape", cat: "Classic Cars", src: "/portfolio/cars-cervena.webp", label: "Cervena Fox", focus: "50% 50%" },
  { id: 33, ratio: "portrait", cat: "Burlesque", src: "/portfolio/modern-burlesque--r2C0A2917.webp", label: "r2C0A2917", focus: "50% 60%" },
  { id: 29, ratio: "landscape", cat: "Burlesque", src: "/portfolio/modern-burlesque--2C0A4806.webp", label: "2C0A4806", focus: "50% 50%" },
  { id: 30, ratio: "portrait", cat: "Burlesque", src: "/portfolio/modern-burlesque--R2C0A6917.webp", label: "R2C0A6917", focus: "50% 50%" },
  { id: 31, ratio: "portrait", cat: "Burlesque", src: "/portfolio/modern-burlesque--R2C0A9286.webp", label: "R2C0A9286", focus: "50% 50%" },
  { id: 32, ratio: "portrait", cat: "Burlesque", src: "/portfolio/modern-burlesque--r2C0A2691.webp", label: "r2C0A2691", focus: "50% 50%" },
  { id: 8, ratio: "portrait", cat: "Burlesque", src: "/portfolio/burlesque-sabrina.webp", label: "Sabrina Minx", focus: "50% 10%" },
  { id: 7, ratio: "portrait", cat: "Burlesque", src: "/portfolio/burlesque-winny.webp", label: "Winny Queen", focus: "50% 35%" },
  { id: 35, ratio: "portrait", cat: "Burlesque", src: "/portfolio/modern-burlesque--r2C0A4347.webp", label: "r2C0A4347", focus: "50% 50%" },
  { id: 2, ratio: "portrait", cat: "Burlesque", src: "/portfolio/pinup-marie.webp", label: "Marie Devilreaux", focus: "50% 52%" },
  { id: 38, ratio: "portrait", cat: "Tiki-Rockabilly", src: "/portfolio/modern-tiki--M2.webp", label: "M2", focus: "50% 50%" },
  { id: 39, ratio: "portrait", cat: "Tiki-Rockabilly", src: "/portfolio/modern-tiki--R2C0A3883.webp", label: "R2C0A3883", focus: "50% 50%" },
  { id: 40, ratio: "portrait", cat: "Tiki-Rockabilly", src: "/portfolio/modern-tiki--r2C0A9501.webp", label: "r2C0A9501", focus: "50% 50%" },
  { id: 13, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/glamour-architectural.webp", label: "Architectural", focus: "80% 35%" },
  { id: 42, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--Faggedy Randy and P No Noir.webp", label: "Faggedy Randy and P No Noir", focus: "50% 50%" },
  { id: 41, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--2C0A4660.webp", label: "2C0A4660", focus: "50% 50%" },
  { id: 45, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--R2C0A1135.webp", label: "R2C0A1135", focus: "50% 50%" },
  { id: 46, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--R2C0A2144.webp", label: "R2C0A2144", focus: "50% 50%" },
  { id: 47, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--R2C0A2431.webp", label: "R2C0A2431", focus: "50% 50%" },
  { id: 11, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/glamour-ashlyn.webp", label: "Ashlyn Coco", focus: "50% 45%" },
  { id: 49, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--R2C0A6177.webp", label: "R2C0A6177", focus: "50% 50%" },
  { id: 12, ratio: "landscape", cat: "Vintage-Glamour", src: "/portfolio/glamour-vanity.webp", label: "The Vanity", focus: "65% 40%" },
  { id: 44, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--R2C0A0407.webp", label: "R2C0A0407", focus: "50% 50%" },
  { id: 52, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-glamour--TJ6.webp", label: "TJ6", focus: "50% 50%" },
  { id: 19, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-pinup--R2C0A1609.webp", label: "R2C0A1609", focus: "50% 50%" },
  { id: 20, ratio: "portrait", cat: "Vintage-Glamour", src: "/portfolio/modern-pinup--R2C0A5650.webp", label: "R2C0A5650", focus: "50% 50%" },
];

export const CATEGORY_COLORS: Record<Category, string> = {
  "Pin-Up": COLORS.crimson,
  "Classic Cars": COLORS.kulture,
  "Burlesque": COLORS.plum,
  "Tiki-Rockabilly": COLORS.tiki,
  "Vintage-Glamour": COLORS.rose,
};

export const CATEGORY_TITLES: Record<Category, string> = {
  "Pin-Up": "Modern Pin-Up",
  "Classic Cars": "Modern Kulture",
  "Burlesque": "Modern Burlesque",
  "Tiki-Rockabilly": "Modern Tiki",
  "Vintage-Glamour": "Modern Glamour",
};

export const RATIOS: Record<Ratio, { paddingBottom: string }> = {
  portrait: { paddingBottom: "140%" },
  landscape: { paddingBottom: "66%" },
  square: { paddingBottom: "100%" },
};

// Stagger pattern for asymmetric layout
export const STAGGER_OFFSETS: number[] = [0, 40, 16, 56, 8, 48, 24, 60];

export const PORTFOLIO_CATEGORIES: Category[] = [
  "Burlesque",
  "Pin-Up",
  "Vintage-Glamour",
  "Tiki-Rockabilly",
  "Classic Cars",
];

export function categoryCover(category: string): GalleryImage | undefined {
  return GALLERY_IMAGES.find((i) => i.cat === category);
}

/**
 * Generate a responsive srcSet string for a gallery image.
 * 480w and 768w variants exist for all images.
 * 1280w variants exist only for landscape images (cars-cervena, glamour-seaside,
 * glamour-vanity, tiki-patio). Pass ratio="landscape" to include the 1280w entry.
 */
export function generateSrcSet(src: string, ratio?: Ratio): string {
  if (!src) return "";
  // Extract basename without .webp extension
  const match = src.match(/\/([^/]+)\.webp$/);
  if (!match) return "";
  const basename = match[1];
  const base480 = `/portfolio/${basename}-480w.webp 480w`;
  const base768 = `/portfolio/${basename}-768w.webp 768w`;
  if (ratio === "landscape") {
    return `${base480}, ${base768}, /portfolio/${basename}-1280w.webp 1280w`;
  }
  return `${base480}, ${base768}`;
}

/**
 * Generate a sizes attribute for responsive images.
 * Describes the layout width at different viewport sizes.
 */
export function generateSizes(): string {
  return "(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw";
}
