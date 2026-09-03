import React from "react";
import MonographDisciplineSection from "../components/MonographDisciplineSection";
import MonographAboutSection from "../components/MonographAboutSection";
import PageFooter from "../components/PageFooter";
import {
  CATEGORY_TITLES,
  CATEGORY_COLORS,
  GALLERY_IMAGES,
  type Category,
} from "../data/gallery";
import "../styles/monograph.css";

export interface HomeProps {
  onBookSession?: () => void;
  onViewPortfolio: (category: Category) => void;
  isMobile: boolean;
}

const HIGH_RES_HERO_SOURCES: Record<number, string> = {
  34: "/hero-slides/modern-burlesque.webp",
  36: "/hero-slides/modern-tiki.webp",
};

const CATEGORY_ORDER: Category[] = [
  "Vintage-Glamour", // Modern Glamour
  "Pin-Up",          // Modern Pin-Up
  "Classic Cars",    // Modern Kulture
  "Burlesque",       // Modern Burlesque
  "Tiki-Rockabilly", // Modern Tiki
];

// Dynamically resolve the exact first image of each category in the portfolio
const CATEGORIES = CATEGORY_ORDER.map((categoryKey) => {
  const firstPortfolioImage = GALLERY_IMAGES.find((img) => img.cat === categoryKey);
  const imageSrc = firstPortfolioImage
    ? (HIGH_RES_HERO_SOURCES[firstPortfolioImage.id] ?? firstPortfolioImage.src)
    : "";
  const title = CATEGORY_TITLES[categoryKey] ?? categoryKey;
  const imageFocus = firstPortfolioImage?.focus ?? "50% 30%";
  const colorAccent = CATEGORY_COLORS[categoryKey] ?? "var(--color-crimson, #CD2644)";

  return {
    key: categoryKey,
    title,
    imageSrc,
    imageAlt: `${title} photography by Susana Andrea`,
    imageFocus,
    colorAccent,
  };
});

export default function Home({
  onBookSession,
  onViewPortfolio,
  isMobile,
}: HomeProps) {
  return (
    <main
      style={{
        width: "100%",
        background: "var(--color-parchment, #EFE9D9)",
        color: "var(--color-ink, #1A1A1B)",
        overflowX: "hidden",
      }}
    >
      {/* Curated Categories — Directly rendering the first image of each portfolio category */}
      {CATEGORIES.map((category, index) => (
        <MonographDisciplineSection
          key={category.key}
          id={`category-0${index + 1}`}
          categoryKey={category.key}
          title={category.title}
          imageSrc={category.imageSrc}
          imageAlt={category.imageAlt}
          imageFocus={category.imageFocus}
          colorAccent={category.colorAccent}
          isFirst={index === 0}
          onViewPortfolio={onViewPortfolio}
          zIndex={index + 1}
        />
      ))}

      {/* Integrated Susana Andrea Story Section */}
      <MonographAboutSection onBookSession={onBookSession} />

      {/* Monograph Page Footer with Colophon */}
      <PageFooter visible={true} isMobile={isMobile} showBrandVoice={true} />
    </main>
  );
}
