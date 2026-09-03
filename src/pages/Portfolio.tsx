import React from "react";
import type { CSSProperties } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { VESTIGE_TEXT_SHADOW, VESTIGE_WORDMARK_SHADOW } from "../theme/effects";
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
  const { isLandscapeMobile } = useResponsiveViewport();
  const { portfolioCategory, setPortfolioCategory, galleryVisible } =
    usePortfolioState("portfolio");
  const { lightboxImage, openLightbox, closeLightbox } = useLightbox();

  const [displayedCategory, setDisplayedCategory] = React.useState<Category | null>(
    initialCategory ?? portfolioCategory
  );
  const [previewCategory, setPreviewCategory] = React.useState<Category>("Burlesque");
  const [spotlightImageId, setSpotlightImageId] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (initialCategory !== undefined) {
      setPortfolioCategory(initialCategory);
      setDisplayedCategory(initialCategory);
    }
  }, [initialCategory, setPortfolioCategory]);

  const handleSelectCategory = (cat: Category) => {
    setPortfolioCategory(cat);
    setDisplayedCategory(cat);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleBackToPortfolio = () => {
    if (onReturnToMonograph) {
      onReturnToMonograph();
      return;
    }
    setPortfolioCategory(null);
    setDisplayedCategory(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const currentCategoryImages = displayedCategory
    ? GALLERY_IMAGES.filter((img) => img.cat === displayedCategory)
    : [];

  const currentLightboxIndex = lightboxImage
    ? currentCategoryImages.findIndex((img) => img.id === lightboxImage.id)
    : -1;

  const handlePrevImage =
    currentLightboxIndex > 0
      ? () => {
          const prevImg = currentCategoryImages[currentLightboxIndex - 1];
          if (prevImg) openLightbox(prevImg);
        }
      : undefined;

  const handleNextImage =
    currentLightboxIndex >= 0 && currentLightboxIndex < currentCategoryImages.length - 1
      ? () => {
          const nextImg = currentCategoryImages[currentLightboxIndex + 1];
          if (nextImg) openLightbox(nextImg);
        }
      : undefined;

  const activePreviewPhotos = GALLERY_IMAGES.filter((img) => img.cat === previewCategory);
  const activeSpotlightImage =
    activePreviewPhotos.find((img) => img.id === spotlightImageId) || activePreviewPhotos[0];
  const activeSpotlightIndex = activePreviewPhotos.findIndex((img) => img.id === activeSpotlightImage?.id);
  const activePreviewCover = activePreviewPhotos[0];
  const activePreviewTitle = CATEGORY_TITLES[previewCategory] ?? "";
  const activePreviewColor = CATEGORY_COLORS[previewCategory] ?? "#CD2644";

  return (
    <main style={{ background: "var(--color-parchment)", minHeight: "100vh", fontFamily: FONTS.body, color: "var(--color-ink)" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

      {/* Unified 44px Top Bar on Landscape Mobile vs Standard PageHeader */}
      {isLandscapeMobile && displayedCategory === null ? (
        <header
          style={{
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 max(16px, env(safe-area-inset-right, 16px)) 0 max(16px, env(safe-area-inset-left, 16px))",
            background: "var(--color-parchment)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          {/* Left: Vestige Wordmark */}
          <button
            type="button"
            onClick={() => setPage("home")}
            style={{
              background: "none",
              border: "none",
              fontFamily: FONTS.script,
              fontSize: "30px",
              color: "var(--color-crimson)",
              cursor: "pointer",
              lineHeight: 1,
              padding: 0,
              textShadow: VESTIGE_WORDMARK_SHADOW,
            }}
          >
            Vestige
          </button>

          {/* Center: Square Category Cards (No Outlines, Substantial Touch Area) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {PORTFOLIO_CATEGORIES.map((cat, index) => {
              const isSelected = cat === previewCategory;
              const catTitle = CATEGORY_TITLES[cat] ?? "";
              const shortLabel = catTitle.replace(/^Modern\s/, "");
              const catColor = CATEGORY_COLORS[cat] ?? "var(--color-crimson)";

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setPreviewCategory(cat);
                    const firstPhoto = GALLERY_IMAGES.find((img) => img.cat === cat);
                    if (firstPhoto) setSpotlightImageId(firstPhoto.id);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isSelected ? catColor : "rgba(0, 0, 0, 0.06)",
                    color: isSelected ? "#FFFFFF" : "var(--color-ink)",
                    border: "none",
                    borderRadius: "6px",
                    padding: "4px 14px",
                    minHeight: "34px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: isSelected ? `0 2px 8px ${catColor}55` : "none",
                    transform: isSelected ? "scale(1.03)" : "scale(1)",
                    transition: "all 0.2s ease",
                    overflow: "visible",
                  }}
                >
                  <span style={{ fontFamily: FONTS.script, fontSize: "17px", lineHeight: 1.35, display: "inline-block", padding: "1px 0" }}>
                    {shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Book CTA + Hamburger Menu */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              onClick={() => onBookSession?.(portfolioCategory ? CATEGORY_TITLES[portfolioCategory] : undefined)}
              style={{
                background: "#CD2644",
                border: "none",
                color: "#FFFFFF",
                fontFamily: FONTS.display,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                padding: "6px 14px",
                minHeight: "32px",
                boxSizing: "border-box",
                borderRadius: "6px",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(205, 38, 68, 0.4)",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              Book a Session
            </button>
            <MobileMenu variant="solid" setPage={setPage} onResetPortfolio={handleBackToPortfolio} />
          </div>
        </header>
      ) : (
        <>
          <PageHeader
            page="portfolio"
            visible={galleryVisible}
            setPage={setPage}
            onResetPortfolio={handleBackToPortfolio}
            navStyleDark={navStyleDark}
            setNavHover={setNavHover}
            isMobile={isMobile}
          />
          <div style={{ height: isMobile ? "12px" : "40px" }} />
        </>
      )}

      <h1 style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}>
        Portfolio
      </h1>

      <div style={{ minHeight: isLandscapeMobile && displayedCategory === null ? "calc(100dvh - 48px)" : "auto" }}>
      {displayedCategory === null ? (
        isLandscapeMobile ? (
          /* Landscape Mobile: Hero Spotlight (Left 58%) + Curated Filmstrip Reel (Right 42%) */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "12px",
              height: "calc(100dvh - 54px)",
              maxHeight: "420px",
              padding: "6px max(14px, env(safe-area-inset-right, 14px)) max(8px, env(safe-area-inset-bottom, 8px)) max(14px, env(safe-area-inset-left, 14px))",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            {/* Left Side: Large Hero Spotlight Frame */}
            <div
              onClick={() => activeSpotlightImage && openLightbox(activeSpotlightImage)}
              role="button"
              tabIndex={0}
              aria-label={`View ${activeSpotlightImage?.label || activePreviewTitle} full size in Lightbox`}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && activeSpotlightImage) {
                  e.preventDefault();
                  openLightbox(activeSpotlightImage);
                }
              }}
              style={{
                position: "relative",
                height: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.14)",
                cursor: "pointer",
                background: "var(--color-cream)",
                border: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              {activeSpotlightImage && (
                <img
                  key={activeSpotlightImage.id}
                  src={activeSpotlightImage.src}
                  alt={activeSpotlightImage.label}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: activeSpotlightImage.focus || "50% 25%",
                    transition: "opacity 0.25s ease",
                  }}
                />
              )}

              {/* Spotlight Ambient Overlay Bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(10, 10, 12, 0.85) 0%, transparent 100%)",
                  padding: "16px 14px 10px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontFamily: FONTS.script, fontSize: "22px", color: "#FAF8F4", lineHeight: 1 }}>
                    {activePreviewTitle}
                  </div>
                  <div style={{ fontFamily: FONTS.display, fontStyle: "italic", fontSize: "11px", color: "rgba(255, 255, 255, 0.75)", letterSpacing: "1px", marginTop: "2px" }}>
                    {activeSpotlightIndex + 1} of {activePreviewPhotos.length} Photographs
                  </div>
                </div>

                <span
                  style={{
                    background: "rgba(255, 255, 255, 0.25)",
                    backdropFilter: "blur(6px)",
                    color: "#FFFFFF",
                    fontSize: "10px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontFamily: FONTS.display,
                    fontStyle: "italic",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  Tap to Enlarge ⛶
                </span>
              </div>
            </div>

            {/* Right Side: Curated 6-Tile Grid (5 Photos + 6th "View More" Card) — Zero Scrolling */}
            <div
              aria-label={`${activePreviewTitle} thumbnails`}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "8px",
                height: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              {/* First 5 Photos in Collection */}
              {activePreviewPhotos.slice(0, 5).map((img: GalleryImage, idx: number) => {
                const isSpotlight = img.id === activeSpotlightImage?.id;

                return (
                  <div
                    key={img.id}
                    onClick={() => setSpotlightImageId(img.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Spotlight photo ${idx + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSpotlightImageId(img.id);
                      }
                    }}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "6px",
                      overflow: "hidden",
                      cursor: "pointer",
                      boxSizing: "border-box",
                      border: isSpotlight ? `2.5px solid ${activePreviewColor}` : "1px solid rgba(0, 0, 0, 0.12)",
                      boxShadow: isSpotlight ? `0 0 10px ${activePreviewColor}77` : "0 2px 6px rgba(0, 0, 0, 0.08)",
                      transform: isSpotlight ? "scale(0.97)" : "scale(1)",
                      transition: "all 0.2s ease",
                      background: "var(--color-cream)",
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                        objectPosition: img.focus || "50% 25%",
                        filter: isSpotlight ? "brightness(1)" : "brightness(0.85)",
                        transition: "filter 0.2s ease",
                      }}
                    />
                  </div>
                );
              })}

              {/* 6th Tile: "View More" Card leading to full gallery */}
              <div
                onClick={() => handleSelectCategory(previewCategory)}
                role="button"
                tabIndex={0}
                aria-label={`View full ${activePreviewTitle} gallery`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectCategory(previewCategory);
                  }
                }}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "6px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  background: activePreviewColor,
                  color: "var(--color-cream)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "6px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.opacity = "0.95";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <div style={{ fontFamily: FONTS.script, fontSize: "18px", lineHeight: 1, opacity: 0.9 }}>
                  explore
                </div>
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontStyle: "italic",
                    fontWeight: 800,
                    fontSize: "13px",
                    letterSpacing: "0.5px",
                    lineHeight: 1.1,
                    marginTop: "2px",
                    color: "#FFFFFF",
                  }}
                >
                  View More
                </div>
                <div
                  style={{
                    fontSize: "8.5px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontFamily: FONTS.display,
                    fontStyle: "italic",
                    opacity: 0.85,
                    marginTop: "2px",
                  }}
                >
                  +{Math.max(0, activePreviewPhotos.length - 5)} Photos
                </div>
              </div>
            </div>
          </div>
        ) : isMobile ? (
          /* Portrait Mobile: Studio Spotlight + 6-Tile Collection Grid (Matching Landscape Experience) */
          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 16px 20px" }}>
            {/* Top Category Switcher Tabs — 5 Equal Columns, 100% Visible with Zero Scrolling */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: "4px",
                width: "100%",
                padding: "2px 0 12px",
                boxSizing: "border-box",
              }}
            >
              {PORTFOLIO_CATEGORIES.map((cat, index) => {
                const isSelected = cat === previewCategory;
                const catTitle = CATEGORY_TITLES[cat] ?? "";
                const shortLabel = catTitle.replace(/^Modern\s/, "").replace(/^Classic\s/, "");
                const catColor = CATEGORY_COLORS[cat] ?? "var(--color-crimson)";

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setPreviewCategory(cat);
                      const firstPhoto = GALLERY_IMAGES.find((img) => img.cat === cat);
                      if (firstPhoto) setSpotlightImageId(firstPhoto.id);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isSelected ? catColor : "rgba(0, 0, 0, 0.06)",
                      color: isSelected ? "#FFFFFF" : "var(--color-ink)",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 2px",
                      minHeight: "38px",
                      cursor: "pointer",
                      boxSizing: "border-box",
                      boxShadow: isSelected ? `0 2px 8px ${catColor}55` : "none",
                      transform: isSelected ? "scale(1.02)" : "scale(1)",
                      transition: "all 0.2s ease",
                      overflow: "visible",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONTS.script,
                        fontSize: "15px",
                        lineHeight: 1.35,
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        padding: "2px 0",
                        overflow: "visible",
                      }}
                    >
                      {shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Hero Spotlight Frame */}
            <div
              onClick={() => activeSpotlightImage && openLightbox(activeSpotlightImage)}
              role="button"
              tabIndex={0}
              aria-label={`View ${activeSpotlightImage?.label || activePreviewTitle} full size in Lightbox`}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && activeSpotlightImage) {
                  e.preventDefault();
                  openLightbox(activeSpotlightImage);
                }
              }}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/5",
                maxHeight: "360px",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.14)",
                cursor: "pointer",
                background: "var(--color-cream)",
                border: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              {activeSpotlightImage && (
                <img
                  key={activeSpotlightImage.id}
                  src={activeSpotlightImage.src}
                  alt={activeSpotlightImage.label}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: activeSpotlightImage.focus || "50% 25%",
                    transition: "opacity 0.25s ease",
                  }}
                />
              )}

              {/* Spotlight Ambient Overlay Bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(10, 10, 12, 0.85) 0%, transparent 100%)",
                  padding: "20px 16px 12px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontFamily: FONTS.script, fontSize: "26px", color: "#FAF8F4", lineHeight: 1 }}>
                    {activePreviewTitle}
                  </div>
                  <div style={{ fontFamily: FONTS.display, fontStyle: "italic", fontSize: "11px", color: "rgba(255, 255, 255, 0.75)", letterSpacing: "1px", marginTop: "2px" }}>
                    {activeSpotlightIndex + 1} of {activePreviewPhotos.length} Photographs
                  </div>
                </div>

                <span
                  style={{
                    background: "rgba(255, 255, 255, 0.25)",
                    backdropFilter: "blur(6px)",
                    color: "#FFFFFF",
                    fontSize: "10px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontFamily: FONTS.display,
                    fontStyle: "italic",
                    fontWeight: 700,
                    padding: "4px 9px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  Tap to Enlarge ⛶
                </span>
              </div>
            </div>

            {/* Curated 6-Tile Grid (5 Photos + 6th "View More" Card) — Taller 3:4 Proportions */}
            <div
              aria-label={`${activePreviewTitle} thumbnails`}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "10px",
                marginTop: "14px",
              }}
            >
              {/* First 5 Photos in Collection */}
              {activePreviewPhotos.slice(0, 5).map((img: GalleryImage, idx: number) => {
                const isSpotlight = img.id === activeSpotlightImage?.id;

                return (
                  <div
                    key={img.id}
                    onClick={() => setSpotlightImageId(img.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Spotlight photo ${idx + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSpotlightImageId(img.id);
                      }
                    }}
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "3/4",
                      borderRadius: "6px",
                      overflow: "hidden",
                      cursor: "pointer",
                      boxSizing: "border-box",
                      border: isSpotlight ? `2.5px solid ${activePreviewColor}` : "1px solid rgba(0, 0, 0, 0.12)",
                      boxShadow: isSpotlight ? `0 0 12px ${activePreviewColor}77` : "0 2px 8px rgba(0, 0, 0, 0.08)",
                      transform: isSpotlight ? "scale(0.97)" : "scale(1)",
                      transition: "all 0.2s ease",
                      background: "var(--color-cream)",
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                        objectPosition: img.focus || "50% 25%",
                        filter: isSpotlight ? "brightness(1)" : "brightness(0.85)",
                        transition: "filter 0.2s ease",
                      }}
                    />
                  </div>
                );
              })}

              {/* 6th Tile: "View More" Card leading to full gallery */}
              <div
                onClick={() => handleSelectCategory(previewCategory)}
                role="button"
                tabIndex={0}
                aria-label={`View full ${activePreviewTitle} gallery`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectCategory(previewCategory);
                  }
                }}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3/4",
                  borderRadius: "6px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  background: activePreviewColor,
                  color: "var(--color-cream)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "10px 6px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                }}
              >
                <div style={{ fontFamily: FONTS.script, fontSize: "22px", lineHeight: 1, opacity: 0.9 }}>
                  explore
                </div>
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontStyle: "italic",
                    fontWeight: 800,
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                    lineHeight: 1.1,
                    marginTop: "3px",
                    color: "#FFFFFF",
                  }}
                >
                  View More
                </div>
                <div
                  style={{
                    fontSize: "9.5px",
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    fontFamily: FONTS.display,
                    fontStyle: "italic",
                    opacity: 0.85,
                    marginTop: "4px",
                  }}
                >
                  +{Math.max(0, activePreviewPhotos.length - 5)} Photos
                </div>
                <div style={{ marginTop: "6px", fontSize: "13px", opacity: 0.9 }}>
                  →
                </div>
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <PageFooter visible={galleryVisible} navStyleDark={navStyleDark} isMobile={isMobile} />
            </div>
          </div>
        ) : (
          /* Desktop Monograph Catalog Grid */
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 40px 40px" }}>
            {PORTFOLIO_CATEGORIES.map((cat, rowIdx) => {
              const catPhotos = GALLERY_IMAGES.filter((img) => img.cat === cat);
              const color = CATEGORY_COLORS[cat] ?? "";
              const title = CATEGORY_TITLES[cat] ?? "";
              const reverse = rowIdx % 2 === 1;

              const tileBlock = (
                <div
                  key="tile"
                  onClick={() => handleSelectCategory(cat)}
                  style={{
                    background: color,
                    color: "var(--color-cream)",
                    textAlign: "center",
                    padding: "40px 24px",
                    aspectRatio: "4/3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.92";
                    e.currentTarget.style.transform = "scale(1.01)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div>
                    <div style={{ fontFamily: FONTS.script, fontSize: "54px", lineHeight: 0.85, opacity: 0.9 }}>
                      {title.startsWith("Modern ") ? "modern" : "a modern"}
                    </div>
                    <div style={{ fontFamily: FONTS.display, fontStyle: "italic", fontWeight: 800, fontSize: "40px", letterSpacing: "-1px", lineHeight: 1 }}>
                      {title.replace(/^Modern\s/, "")}
                    </div>
                    <div
                      style={{
                        marginTop: "12px",
                        fontSize: "11px",
                        letterSpacing: "3px",
                        textTransform: "uppercase",
                        fontFamily: FONTS.display,
                        fontStyle: "italic",
                        opacity: 0.8,
                      }}
                    >
                      {catPhotos.length} photographs
                    </div>
                  </div>
                </div>
              );

              const photos = catPhotos.slice(0, 3).map((img) => (
                <div
                  key={img.id}
                  onClick={() => handleSelectCategory(cat)}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    aspectRatio: "4/3",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: img.focus || "50% 10%",
                    }}
                  />
                </div>
              ));
              const cells: React.ReactNode[] = reverse ? [...photos, tileBlock] : [tileBlock, ...photos];
              while (cells.length < 4) cells.push(<div key={`pad-${cells.length}`} style={{ background: "transparent", aspectRatio: "4/3" }} />);
              return (
                <div
                  key={cat}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  {cells}
                </div>
              );
            })}

            <div style={{ marginTop: "40px" }}>
              <PageFooter visible={galleryVisible} navStyleDark={navStyleDark} isMobile={isMobile} />
            </div>
          </div>
        )
      ) : (
        /* Drilled-in Category View — band header */
        <>
          <section
            style={{
              background: CATEGORY_COLORS[displayedCategory] ?? "",
              color: COLORS.cream,
              padding: isLandscapeMobile
                ? "8px 16px"
                : isMobile
                ? "10px 16px 12px"
                : "16px 32px 18px",
              textAlign: "center",
              position: "relative",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
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
              <span
                style={{
                  fontFamily: FONTS.script,
                  fontSize: isLandscapeMobile ? "20px" : isMobile ? "22px" : "32px",
                  lineHeight: 1,
                  opacity: 0.9,
                }}
              >
                a study in
              </span>
              <h2
                style={{
                  fontFamily: FONTS.display,
                  fontStyle: "italic",
                  fontWeight: 800,
                  fontSize: isLandscapeMobile ? "22px" : isMobile ? "26px" : "38px",
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {CATEGORY_TITLES[displayedCategory] ?? ""}
              </h2>
              <span
                style={{
                  fontFamily: FONTS.display,
                  fontStyle: "italic",
                  fontSize: isMobile ? "10px" : "11px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  opacity: 0.75,
                  marginLeft: "4px",
                }}
              >
                • {currentCategoryImages.length} Photographs
              </span>
            </div>
          </section>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: isLandscapeMobile ? "14px 12px 36px" : isMobile ? "16px 12px 40px" : "36px 32px 60px",
              display: "grid",
              gridTemplateColumns: isLandscapeMobile ? "repeat(3, 1fr)" : isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: isLandscapeMobile ? "10px" : isMobile ? "12px" : "20px",
              alignItems: "start",
            }}
          >
            {currentCategoryImages.map((img: GalleryImage, i) => (
              <GalleryImageView
                key={img.id}
                img={img}
                index={i}
                visible={true}
                isMobile={isMobile}
                showLabel={false}
                srcSet={generateSrcSet(img.src, img.ratio)}
                sizes={generateSizes()}
                onClick={() => openLightbox(img)}
              />
            ))}
          </div>
        </>
      )}

      </div>

      {displayedCategory !== null && (
        <>
          {(() => {
            const currentIndex = PORTFOLIO_CATEGORIES.indexOf(displayedCategory);
            const validIndex = currentIndex >= 0 ? currentIndex : 0;
            const nextCategory = (PORTFOLIO_CATEGORIES[(validIndex + 1) % PORTFOLIO_CATEGORIES.length] ?? "Burlesque") as Category;
            const nextCategoryTitle = CATEGORY_TITLES[nextCategory] ?? "";
            const nextCategoryColor = CATEGORY_COLORS[nextCategory] ?? "var(--color-crimson)";

            return (
              <section
                style={{
                  maxWidth: "960px",
                  margin: "8px auto 32px",
                  padding: "0 16px",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile && !isLandscapeMobile ? "1fr" : "1fr 1.2fr",
                    gap: "12px",
                    alignItems: "stretch",
                  }}
                >
                  {/* Left Card: Return to All Collections */}
                  <button
                    type="button"
                    onClick={handleBackToPortfolio}
                    aria-label="Return to all collections"
                    style={{
                      background: "rgba(0, 0, 0, 0.04)",
                      border: `1px solid ${COLORS.stone}66`,
                      borderRadius: "8px",
                      padding: isMobile ? "16px 18px" : "20px 24px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "4px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(0, 0, 0, 0.07)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(0, 0, 0, 0.04)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONTS.display,
                        fontStyle: "italic",
                        fontSize: "10px",
                        letterSpacing: "2.5px",
                        textTransform: "uppercase",
                        color: "var(--color-ink)",
                        opacity: 0.6,
                      }}
                    >
                      Portfolio Overview
                    </span>
                    <span
                      style={{
                        fontFamily: FONTS.script,
                        fontSize: isMobile ? "22px" : "26px",
                        color: "var(--color-crimson)",
                        lineHeight: 1.1,
                      }}
                    >
                      {onReturnToMonograph ? "← Return to Monograph" : "← All Collections"}
                    </span>
                  </button>

                  {/* Right Card: Explore Next Study */}
                  <button
                    type="button"
                    onClick={() => handleSelectCategory(nextCategory)}
                    aria-label={`Explore next collection: ${nextCategoryTitle}`}
                    style={{
                      background: nextCategoryColor,
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "8px",
                      padding: isMobile ? "16px 18px" : "20px 24px",
                      textAlign: isMobile && !isLandscapeMobile ? "left" : "right",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: isMobile && !isLandscapeMobile ? "flex-start" : "flex-end",
                      gap: "4px",
                      boxShadow: `0 4px 16px ${nextCategoryColor}33`,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.94";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONTS.display,
                        fontStyle: "italic",
                        fontSize: "10px",
                        letterSpacing: "2.5px",
                        textTransform: "uppercase",
                        opacity: 0.85,
                      }}
                    >
                      Next Collection
                    </span>
                    <span
                      style={{
                        fontFamily: FONTS.script,
                        fontSize: isMobile ? "22px" : "26px",
                        lineHeight: 1.1,
                      }}
                    >
                      {nextCategoryTitle.startsWith("Modern ") ? nextCategoryTitle : `Modern ${nextCategoryTitle}`} →
                    </span>
                  </button>
                </div>
              </section>
            );
          })()}

          <section
            style={{
              textAlign: "center",
              padding: isMobile ? "0 20px 32px" : "0 24px 44px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Button onClick={() => onBookSession?.(portfolioCategory ? CATEGORY_TITLES[portfolioCategory] : undefined)} isMobile={isMobile}>
                Book a Session
              </Button>
            </div>
          </section>

          <PageFooter visible={galleryVisible} navStyleDark={navStyleDark} isMobile={isMobile} />
        </>
      )}

      <Lightbox
        image={lightboxImage}
        onClose={closeLightbox}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </main>
  );
}

