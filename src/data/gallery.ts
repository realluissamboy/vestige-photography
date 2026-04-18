import { COLORS } from "../vestige-site";

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
  { id: 1,  ratio: "portrait",  cat: "Pin-Up",           src: "/portfolio/pinup-green-wall.webp",       label: "Jade Wall",         focus: "50% 20%" },
  { id: 2,  ratio: "portrait",  cat: "Pin-Up",           src: "/portfolio/pinup-marie.webp",            label: "Marie Devilreaux",  focus: "50% 25%" },
  { id: 3,  ratio: "portrait",  cat: "Pin-Up",           src: "/portfolio/pinup-coral.webp",            label: "Coral & Bloom",     focus: "50% 15%" },
  { id: 4,  ratio: "portrait",  cat: "Pin-Up",           src: "/portfolio/pinup-mosh.webp",             label: "Miss Mosh",         focus: "50% 10%" },
  { id: 5,  ratio: "landscape", cat: "Classic Cars",     src: "/portfolio/cars-cervena.webp",           label: "Cervena Fox",       focus: "50% 50%" },
  { id: 6,  ratio: "portrait",  cat: "Classic Cars",     src: "/portfolio/cars-a5.webp",                label: "Midnight Cruiser",  focus: "50% 30%" },
  { id: 7,  ratio: "portrait",  cat: "Burlesque",        src: "/portfolio/burlesque-winny.webp",        label: "Winny Queen",       focus: "50% 10%" },
  { id: 8,  ratio: "portrait",  cat: "Burlesque",        src: "/portfolio/burlesque-sabrina.webp",      label: "Sabrina Minx",      focus: "50% 10%" },
  { id: 9,  ratio: "portrait",  cat: "Tiki-Rockabilly",  src: "/portfolio/tiki-avalon.webp",            label: "Avalon Monet",      focus: "55% 30%" },
  { id: 10, ratio: "landscape", cat: "Tiki-Rockabilly",  src: "/portfolio/tiki-patio.webp",             label: "Tiki Patio",        focus: "50% 20%" },
  { id: 11, ratio: "portrait",  cat: "Vintage-Glamour",  src: "/portfolio/glamour-ashlyn.webp",         label: "Ashlyn Coco",       focus: "55% 15%" },
  { id: 12, ratio: "landscape", cat: "Vintage-Glamour",  src: "/portfolio/glamour-vanity.webp",         label: "The Vanity",        focus: "65% 40%" },
  { id: 13, ratio: "portrait",  cat: "Vintage-Glamour",  src: "/portfolio/glamour-architectural.webp",  label: "Architectural",     focus: "50% 20%" },
  { id: 14, ratio: "landscape", cat: "Vintage-Glamour",  src: "/portfolio/glamour-seaside.webp",        label: "Seaside Villa",     focus: "50% 40%" },
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
  "Pin-Up",
  "Classic Cars",
  "Burlesque",
  "Tiki-Rockabilly",
  "Vintage-Glamour",
];

export function categoryCover(category: string): GalleryImage | undefined {
  return GALLERY_IMAGES.find((i) => i.cat === category);
}
