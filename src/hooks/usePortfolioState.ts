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
    const srcs: string[] =
      portfolioCategory === null
        ? PORTFOLIO_CATEGORIES.map((c) => categoryCover(c)?.src).filter(
            (s): s is string => s !== undefined
          )
        : GALLERY_IMAGES.filter((i) => i.cat === portfolioCategory).map((i) => i.src);
    let cancelled = false;
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
    return () => {
      cancelled = true;
    };
  }, [page, portfolioCategory]);

  return { portfolioCategory, setPortfolioCategory, galleryVisible };
}
