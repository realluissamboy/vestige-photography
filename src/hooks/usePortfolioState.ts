import { useState, useEffect } from "react";
import { GALLERY_IMAGES, PORTFOLIO_CATEGORIES, categoryCover } from "../data/gallery";
import type { Category } from "../data/gallery";
import type { PageKey } from "../data/navigation";

export interface UsePortfolioStateResult {
  portfolioCategory: Category | null;
  setPortfolioCategory: (c: Category | null) => void;
  galleryVisible: boolean;
}

export function usePortfolioState(page: PageKey): UsePortfolioStateResult {
  const [portfolioCategory, setPortfolioCategory] = useState<Category | null>(null);
  const [galleryVisible, setGalleryVisible] = useState<boolean>(false);

  useEffect(() => {
    setPortfolioCategory(null);
  }, [page]);

  useEffect(() => {
    if (page !== "portfolio") {
      setGalleryVisible(false);
      return;
    }
    setGalleryVisible(false);
    // Preload only the active category cover (or the first image if a category is selected).
    // This avoids eager preloading of all 14 portfolio images.
    const srcs: string[] = portfolioCategory === null
      ? [] // When showing category tiles, don't preload all covers; browser will lazy-load them as needed
      : [GALLERY_IMAGES.find((i) => i.cat === portfolioCategory)?.src].filter(
          (s): s is string => s !== undefined
        );
    let cancelled = false;
    if (srcs.length === 0) {
      // No preload needed; show gallery immediately for category tiles view
      setGalleryVisible(true);
    } else {
      const preload = Promise.all(
        srcs.map(
          (s) =>
            new Promise<void>((res) => {
              const img = new Image();
              img.onload = img.onerror = () => res();
              img.src = s;
            })
        )
      );
      const fallback = new Promise<void>((res) => setTimeout(res, 1500));
      Promise.race([preload, fallback]).then(() => {
        if (!cancelled) setGalleryVisible(true);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [page, portfolioCategory]);

  return { portfolioCategory, setPortfolioCategory, galleryVisible };
}
