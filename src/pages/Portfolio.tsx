import React from "react";
import type { CSSProperties } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import MobileMenu from "../components/MobileMenu";
import {
  GALLERY_IMAGES,
  CATEGORY_COLORS,
  CATEGORY_TITLES,
  PORTFOLIO_CATEGORIES,
  generateSrcSet,
  generateSizes,
} from "../data/gallery";
import type { Category, GalleryImage } from "../data/gallery";
import type { PageKey } from "../data/navigation";
import { usePortfolioState } from "../hooks/usePortfolioState";
import { useLightbox } from "../hooks/useLightbox";
import GalleryImageView from "../components/GalleryImage";
import Lightbox from "../components/Lightbox";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import { useOverlay } from "../hooks/useOverlay";
import { responsiveSrcSet } from "../data/responsiveImages";
import { useResponsiveViewport } from "../hooks/useIsMobile";

export interface PortfolioProps {
  portfolioVisible?: boolean;
  setPage: (p: PageKey) => void;
  isMobile: boolean;
  navStyleDark: (label: string, isActive: boolean) => CSSProperties;
  setNavHover: (p: string | null) => void;
  onBookSession?: (category?: string) => void;
  initialCategory?: Category | null;
  onReturnToMonograph?: () => void;
}

interface CategoryGalleryViewProps {
  category: Category;
  isMobile: boolean;
  isMobilePortrait: boolean;
  isLandscapeMobile: boolean;
  openLightbox: (img: GalleryImage) => void;
}

function CategoryGalleryView({
  category,
  isMobile,
  isMobilePortrait,
  isLandscapeMobile,
  openLightbox,
}: CategoryGalleryViewProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { scrollRef.current?.scrollTo({ top: 0, behavior: "instant" }); }, [category]);
  const images = GALLERY_IMAGES.filter((img) => img.cat === category);
  const count = images.length;
  let cols = 3;
  let rows = 2;

  if (isMobilePortrait) {
    if (count <= 6) { cols = 2; rows = 3; }
    else if (count <= 9) { cols = 3; rows = 3; }
    else if (count <= 12) { cols = 3; rows = 4; }
    else { cols = 3; rows = Math.ceil(count / 3); }
  } else if (isLandscapeMobile) {
    if (count <= 6) { cols = 3; rows = 2; }
    else if (count <= 8) { cols = 4; rows = 2; }
    else if (count <= 10) { cols = 5; rows = 2; }
    else if (count <= 12) { cols = 6; rows = 2; }
    else { cols = 6; rows = 3; }
  } else {
    if (count <= 6) { cols = 3; rows = 2; }
    else if (count <= 8) { cols = 4; rows = 2; }
    else if (count <= 9) { cols = 3; rows = 3; }
    else if (count <= 12) { cols = 4; rows = 3; }
    else { cols = 6; rows = 3; }
  }

  if (isMobile) cols = isLandscapeMobile ? 3 : 2;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
        background: "var(--color-parchment, #EFE9D9)",
      }}
    >
      <section
        style={{
          background: CATEGORY_COLORS[category] ?? "",
          color: COLORS.cream,
          padding: isLandscapeMobile ? "4px 16px" : isMobile ? "6px 16px" : "8px 32px",
          textAlign: "center",
          position: "relative",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontFamily: FONTS.display,
              fontStyle: "italic",
              fontWeight: 800,
              fontSize: isLandscapeMobile ? "20px" : isMobile ? "24px" : "32px",
              letterSpacing: "-0.5px",
              lineHeight: 1,
              margin: 0,
            }}
          >
            {CATEGORY_TITLES[category] ?? ""}
          </h2>
        </div>
      </section>

      <div
        ref={scrollRef}
        className="category-photo-grid"
        style={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          boxSizing: "border-box",
          padding: isMobile ? "6px 10px 8px" : "10px 20px 12px",
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: isMobile ? undefined : `repeat(${rows}, minmax(0, 1fr))`,
          gridAutoRows: isMobile ? "max-content" : undefined,
          alignContent: isMobile ? "start" : undefined,
          overflowY: isMobile ? "auto" : "hidden",
          overscrollBehavior: "contain",
          gap: isMobile ? "6px" : "10px",
          overflowX: "hidden",
        }}
      >
        {images.map((img: GalleryImage, i: number) => (
          <div
            key={img.id}
            onClick={() => openLightbox(img)}
            role="button"
            tabIndex={0}
            aria-label={`View photo ${img.label} in full size`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(img);
              }
            }}
            style={{
              position: "relative",
              width: "100%",
              height: isMobile ? "auto" : "100%",
              aspectRatio: isMobile ? "3 / 4" : undefined,
              minHeight: 0,
              minWidth: 0,
              cursor: "pointer",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.14)",
              border: "1px solid rgba(158, 140, 121, 0.25)",
              background: "var(--color-cream)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.025)";
              e.currentTarget.style.zIndex = "10";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.zIndex = "1";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.14)";
            }}
          >
            <img
              src={img.src}
              srcSet={responsiveSrcSet(img.src)}
              sizes={`calc((100vw - ${isMobile ? 20 + (cols - 1) * 6 : 40 + (cols - 1) * 10}px) / ${cols})`}
              alt={img.label}
              decoding="async"
              loading={i < (isMobile ? cols * 2 : 8) ? "eager" : "lazy"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
                objectPosition: img.focus || "50% 25%",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio({
  portfolioVisible,
  setPage,
  isMobile,
  navStyleDark,
  setNavHover,
  onBookSession,
  initialCategory,
  onReturnToMonograph,
}: PortfolioProps) {
  // TEMPORARY PARTIAL RESTORE - parent must replace with full Portfolio from agent-tools/Portfolio.tsx
  return (
    <main style={{ padding: 24, fontFamily: FONTS.body }}>
      <h1 style={{ fontFamily: FONTS.script, color: "var(--color-crimson)" }}>Portfolio</h1>
      <p>Collection gallery temporarily unavailable. Full Portfolio.tsx restore pending.</p>
      <button type="button" onClick={() => onReturnToMonograph?.() || setPage("home")}>
        Back to Homepage
      </button>
    </main>
  );
}
