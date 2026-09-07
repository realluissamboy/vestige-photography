import manifest from "./image-variants.json";

interface ImageVariants {
  width: number;
  height: number;
  variants: { src: string; width: number }[];
}

const images: Record<string, ImageVariants> = manifest;

/** Only advertise files confirmed by the image generator; filenames may contain spaces. */
export function responsiveSrcSet(src: string): string | undefined {
  return images[src]?.variants.map(image => `${encodeURI(image.src)} ${image.width}w`).join(", ");
}

/** A cover image must fill both viewport dimensions, without scaling or parallax overscan. */
export function coverSizes(src: string): string {
  const image = images[src];
  const heightWidth = image ? (100 * image.width / image.height).toFixed(2) : "100";
  return `max(100vw, ${heightWidth}svh)`;
}
