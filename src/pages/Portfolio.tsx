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
}

export default function Portfolio({
  portfolioVisible,
  setPage,
  isMobile,
  navStyleDark,
  setNavHover,
}: PortfolioProps) {
  const { isLandscapeMobile } = useResponsiveViewport();
  const { portfolioCategory, setPortfolioCategory, galleryVisible } =
    usePortfolioState("portfolio");
  const { lightboxImage, openLightbox, closeLightbox } = useLightbox();

  const [displayedCategory, setDisplayedCategory] = React.useState<Category | null>(portfolioCategory);
  const [previewCategory, setPreviewCategory] = React.useState<Category>("Burlesque");
  const [spotlightImageId, setSpotlightImageId] = React.useState<number | null>(null);

  const handleSelectCategory = (cat: Category) => {
    setPortfolioCategory(cat);
    setDisplayedCategory(cat);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const handleBackToPortfolio = () => {
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
                    gap: "5px",
                    background: isSelected ? catColor : "rgba(0, 0, 0, 0.06)",
                    color: isSelected ? "#FFFFFF" : "var(--color-ink)",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    minHeight: "32px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: isSelected ? `0 2px 8px ${catColor}55` : "none",
                    transform: isSelected ? "scale(1.03)" : "scale(1)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{ fontFamily: FONTS.display, fontStyle: "italic", fontSize: "10px", fontWeight: 700, opacity: isSelected ? 0.9 : 0.6 }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: FONTS.script, fontSize: "15px", lineHeight: 1 }}>
                    {shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Book CTA + Hamburger Menu */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href="https://ig.me/m/susanavestige"
              target="_blank"
              rel="noopener noreferrer"
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
              }}
            >
              Book a Session
            </a>
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

      <div style={{ minHeight: isMobile && displayedCategory === null ? (isLandscapeMobile ? "calc(100dvh - 44px)" : "calc(100dvh - 80px)") : "60vh" }}>
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
          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 16px max(70px, calc(env(safe-area-inset-bottom, 0px) + 50px))" }}>
            {/* Top Category Switcher Tabs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                overflowX: "auto",
                scrollbarWidth: "none",
                padding: "2px 0 14px",
                WebkitOverflowScrolling: "touch",
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
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: isSelected ? catColor : "rgba(0, 0, 0, 0.06)",
                      color: isSelected ? "#FFFFFF" : "var(--color-ink)",
                      border: "none",
                      borderRadius: "6px",
                      padding: "7px 14px",
                      minHeight: "34px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      boxShadow: isSelected ? `0 2px 10px ${catColor}55` : "none",
                      transform: isSelected ? "scale(1.02)" : "scale(1)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span style={{ fontFamily: FONTS.display, fontStyle: "italic", fontSize: "10px", fontWeight: 700, opacity: isSelected ? 0.9 : 0.6 }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: FONTS.script, fontSize: "16px", lineHeight: 1 }}>
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

            {/* Bottom Session Booking CTA */}
            <div style={{ marginTop: "24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <a
                href="https://ig.me/m/susanavestige"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #CD2644 0%, #A01932 100%)",
                  color: "#FFFFFF",
                  fontFamily: FONTS.display,
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "1.4px",
                  textTransform: "uppercase",
                  padding: "10px 24px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(205, 38, 68, 0.4)",
                }}
              >
                <span>Book a Session</span>
                <span style={{ fontSize: "14px", fontStyle: "normal" }}>→</span>
              </a>
            </div>

            <div style={{ marginTop: "32px" }}>
              <PageFooter visible={galleryVisible} navStyleDark={navStyleDark} isMobile={isMobile} />
            </div>
          </div>
        ) : (
          /* Desktop Monograph Catalog Grid */
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 40px 80px" }}>
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
              padding: isLandscapeMobile ? "24px 20px 28px" : isMobile ? "36px 20px 44px" : "48px 40px 60px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div style={{ fontFamily: FONTS.script, fontSize: isLandscapeMobile ? "36px" : isMobile ? "44px" : "62px", lineHeight: 0.9, opacity: 0.9 }}>
              a study in
            </div>
            <h2 style={{ fontFamily: FONTS.display, fontStyle: "italic", fontWeight: 800, fontSize: isLandscapeMobile ? "44px" : isMobile ? "56px" : "92px", letterSpacing: "-2px", lineHeight: 1, marginTop: "4px", margin: "4px 0 0 0" }}>
              {CATEGORY_TITLES[displayedCategory] ?? ""}
            </h2>
            <div style={{ marginTop: isLandscapeMobile ? "12px" : isMobile ? "18px" : "24px" }}>
              <button
                onClick={handleBackToPortfolio}
                aria-label="Back to Portfolio overview"
                style={{
                  fontFamily: FONTS.script,
                  fontSize: isLandscapeMobile ? "24px" : isMobile ? "28px" : "34px",
                  color: "#FFFFFF",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1.5px solid rgba(255, 255, 255, 0.65)",
                  padding: "0 0 2px 0",
                  cursor: "pointer",
                  minHeight: "44px",
                  lineHeight: 1,
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
                  opacity: 0.95,
                  transition: "opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateX(-2px)";
                  e.currentTarget.style.borderBottomColor = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.95";
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.borderBottomColor = "rgba(255, 255, 255, 0.65)";
                }}
              >
                ← Back to Portfolio
              </button>
            </div>
          </section>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: isLandscapeMobile ? "20px 16px 48px" : isMobile ? "32px 16px 60px" : "64px 40px 80px",
              display: "grid",
              gridTemplateColumns: isLandscapeMobile ? "repeat(3, 1fr)" : isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: isLandscapeMobile ? "12px" : isMobile ? "14px" : "20px",
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

      {(!isMobile || displayedCategory !== null) && (
        <>
          <section
            style={{
              textAlign: "center",
              padding: "0 24px 120px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Button href="https://ig.me/m/susanavestige" target="_blank" rel="noopener noreferrer" isMobile={isMobile}>Book a Session</Button>
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

