import { useState, useEffect, useCallback } from "react";
import type { GalleryImage } from "../data/gallery";

export interface UseLightboxResult {
  lightboxImage: GalleryImage | null;
  openLightbox: (img: GalleryImage) => void;
  closeLightbox: () => void;
}

export function useLightbox(): UseLightboxResult {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxImage]);

  const openLightbox = useCallback((img: GalleryImage) => {
    setLightboxImage(img);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  return { lightboxImage, openLightbox, closeLightbox };
}
