import React from "react";
import MonographDisciplineSection from "../components/MonographDisciplineSection";
import MonographAboutSection from "../components/MonographAboutSection";
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
  36: "/tiki-rockabilly.webp",
};

// Curated order: pin-up first, followed by glamour, burlesque, tiki, and kulture
const CATEGORY_ORDER: Category[] = [
  "Pin-Up",
  "Vintage-Glamour",
  "Burlesque",
  "Tiki-Rockabilly",
  "Classic Cars",
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
      {/* 1. Primary Homepage Cover */}
      <MonographDisciplineSection
        id="homepage-cover"
        title="Vestige"
        imageSrc="/hero.webp"
        imageAlt="Vestige Photography — Twenty years of modern pin-up"
        imageFocus="50% 25%"
        isCover={true}
        showPortfolioLink={false}
      />

      {/* 2. Curated Categories — Pin-Up, Glamour, Burlesque, Tiki, Kulture */}
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
          isCover={false}
          showPortfolioLink={true}
          onViewPortfolio={onViewPortfolio}
        />
      ))}

      {/* 3. Integrated Susana Andrea Story Section with CTA and Compact Footer */}
      <MonographAboutSection onBookSession={onBookSession} />
    </main>
  );
}
