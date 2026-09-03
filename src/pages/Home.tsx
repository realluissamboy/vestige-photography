import React from "react";
import MonographHero from "../components/MonographHero";
import MonographDisciplineSection from "../components/MonographDisciplineSection";
import MonographAboutSection from "../components/MonographAboutSection";
import PageFooter from "../components/PageFooter";
import { CATEGORY_TITLES, CATEGORY_COLORS, type Category } from "../data/gallery";
import "../styles/monograph.css";

export interface HomeProps {
  onBookSession?: () => void;
  onViewPortfolio: (category: Category) => void;
  isMobile: boolean;
}

interface DisciplineItem {
  key: Category;
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageFocus: string;
  colorAccent: string;
}

const DISCIPLINES: DisciplineItem[] = [
  {
    key: "Vintage-Glamour",
    title: CATEGORY_TITLES["Vintage-Glamour"], // "Modern Glamour"
    imageSrc: "/vintage-glamour.webp",
    imageAlt: "Modern Glamour photography by Susana Andrea",
    imageFocus: "50% 30%",
    colorAccent: CATEGORY_COLORS["Vintage-Glamour"],
  },
  {
    key: "Pin-Up",
    title: CATEGORY_TITLES["Pin-Up"], // "Modern Pin-Up"
    imageSrc: "/modern-pinup.webp",
    imageAlt: "Modern Pin-Up photography by Susana Andrea",
    imageFocus: "50% 25%",
    colorAccent: CATEGORY_COLORS["Pin-Up"],
  },
  {
    key: "Classic Cars",
    title: CATEGORY_TITLES["Classic Cars"], // "Modern Kulture"
    imageSrc: "/classic-cars.webp",
    imageAlt: "Modern Kulture photography by Susana Andrea",
    imageFocus: "50% 25%",
    colorAccent: CATEGORY_COLORS["Classic Cars"],
  },
  {
    key: "Burlesque",
    title: CATEGORY_TITLES["Burlesque"], // "Modern Burlesque"
    imageSrc: "/hero-slides/modern-burlesque.webp",
    imageAlt: "Modern Burlesque photography by Susana Andrea",
    imageFocus: "50% 25%",
    colorAccent: CATEGORY_COLORS["Burlesque"],
  },
  {
    key: "Tiki-Rockabilly",
    title: CATEGORY_TITLES["Tiki-Rockabilly"], // "Modern Tiki"
    imageSrc: "/hero-slides/modern-tiki.webp",
    imageAlt: "Modern Tiki photography by Susana Andrea",
    imageFocus: "65% 35%",
    colorAccent: CATEGORY_COLORS["Tiki-Rockabilly"],
  },
];

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
      {/* 1. Topmost Hero with High-Contrast Placard */}
      <MonographHero />

      {/* 2. The Five Disciplines in Curated Monograph Sequence */}
      {DISCIPLINES.map((discipline, index) => (
        <MonographDisciplineSection
          key={discipline.key}
          id={`discipline-0${index + 1}`}
          disciplineNumber={index + 1}
          categoryKey={discipline.key}
          title={discipline.title}
          imageSrc={discipline.imageSrc}
          imageAlt={discipline.imageAlt}
          imageFocus={discipline.imageFocus}
          colorAccent={discipline.colorAccent}
          onViewPortfolio={onViewPortfolio}
        />
      ))}

      {/* 3. Integrated Susana Andrea Story Section */}
      <MonographAboutSection onBookSession={onBookSession} />

      {/* 4. Monograph Page Footer with Colophon */}
      <PageFooter visible={true} isMobile={isMobile} showBrandVoice={true} />
    </main>
  );
}
