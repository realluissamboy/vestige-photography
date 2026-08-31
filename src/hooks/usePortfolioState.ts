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
  const [galleryVisible, setGalleryVisible] = useState<boolean>(true);

  useEffect(() => {
    setPortfolioCategory(null);
  }, [page]);

  return { portfolioCategory, setPortfolioCategory, galleryVisible };
}
