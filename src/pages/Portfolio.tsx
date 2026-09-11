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
    // Desktop & Tablet
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
      {/* Category Band Header */}
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

      {/* Mobile collections scroll within the gallery below its persistent controls. */}
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
  const { isLandscapeMobile, isMobilePortrait } = useResponsiveViewport();
  const galleryRef = React.useRef<HTMLElement>(null);
  useOverlay(Boolean(onReturnToMonograph), galleryRef, onReturnToMonograph ?? (() => setPage("home")), '[aria-label="Back to Homepage"]');
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

  // Slide transition state for switching between collections
  const [incomingCategory, setIncomingCategory] = React.useState<Category | null>(null);
  const [isSliding, setIsSliding] = React.useState<boolean>(false);
  const [slidePhase, setSlidePhase] = React.useState<"idle" | "enter" | "active">("idle");
  const slideTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (slideTimeoutRef.current) {
        clearTimeout(slideTimeoutRef.current);
      }
    };
  }, []);

  const handleSelectCategory = (cat: Category) => {
    if (isSliding || cat === displayedCategory) return;

    if (slideTimeoutRef.current) {
      clearTimeout(slideTimeoutRef.current);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPortfolioCategory(cat);
      setDisplayedCategory(cat);
      return;
    }
    setIncomingCategory(cat);
    setIsSliding(true);
    setSlidePhase("enter");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSlidePhase("active");
      });
    });

    slideTimeoutRef.current = setTimeout(() => {
      setPortfolioCategory(cat);
      setDisplayedCategory(cat);
      setIncomingCategory(null);
      setIsSliding(false);
      setSlidePhase("idle");
    }, 460);
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
    <main
      ref={galleryRef}
      className="portfolio-content"
      role={onReturnToMonograph ? "dialog" : undefined}
      aria-modal={onReturnToMonograph ? true : undefined}
      aria-label={onReturnToMonograph ? "Photography collections" : undefined}
      tabIndex={-1}
      style={{
        background: "var(--color-parchment)",
        height: displayedCategory ? "100dvh" : "auto",
        maxHeight: displayedCategory ? "100dvh" : "none",
        minHeight: displayedCategory ? "100dvh" : "100vh",
        overflow: displayedCategory ? "hidden" : "visible",
        display: displayedCategory ? "flex" : "block",
        flexDirection: "column",
        fontFamily: FONTS.body,
        color: "var(--color-ink)",
      }}
    >
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
              const shortLabel = catTitle;
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
      ) : onReturnToMonograph ? (
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            background: "rgba(239, 233, 217, 0.96)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(158, 140, 121, 0.35)",
            padding: isMobile ? "8px max(12px, env(safe-area-inset-right)) 8px max(12px, env(safe-area-inset-left))" : "14px 32px",
            gap: "8px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Navigation Button: Back to Homepage */}
          <button
            type="button"
            onClick={handleBackToPortfolio}
            aria-label="Back to Homepage"
            style={{
              background: "none",
              border: "none",
              padding: "6px 0",
              minHeight: "44px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--color-crimson, #CD2644)",
              transition: "transform 0.2s ease, opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            <span style={{ fontSize: isMobile ? "18px" : "20px", lineHeight: 1 }}>←</span>
            <span
              style={{
                fontFamily: FONTS.display,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: isMobile ? "12px" : "14px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "var(--color-ink, #1A1A1B)",
              }}
            >
              {isMobile ? "Back" : "Back to Homepage"}
            </span>
          </button>

          {/* Right: View Next Collection CTA OR About Page when reaching final category */}
          {(() => {
            const activeForBtn = incomingCategory ?? displayedCategory;
            const currentIndex = activeForBtn ? PORTFOLIO_CATEGORIES.indexOf(activeForBtn) : 0;
            const validIndex = currentIndex >= 0 ? currentIndex : 0;
            const isLastCategory = validIndex === PORTFOLIO_CATEGORIES.length - 1;
            const nextCat = PORTFOLIO_CATEGORIES[(validIndex + 1) % PORTFOLIO_CATEGORIES.length] as Category;
            const nextCatTitle = CATEGORY_TITLES[nextCat] ?? "";
            const btnColor = isLastCategory
              ? "var(--color-crimson, #CD2644)"
              : (CATEGORY_COLORS[nextCat] ?? "var(--color-crimson, #CD2644)");

            return (
              <button
                type="button"
                disabled={isSliding}
                onClick={() => {
                  if (isSliding) return;
                  if (isLastCategory) {
                    setPage("about");
                  } else {
                    handleSelectCategory(nextCat);
                  }
                }}
                aria-label={isLastCategory ? "About Susana Andrea" : `View next collection: ${nextCatTitle}`}
                style={{
                  background: btnColor,
                  border: "none",
                  color: "#FFFFFF",
                  fontFamily: FONTS.display,
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: isMobile ? "11px" : "12.5px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  padding: isMobile ? "7px 10px" : "8px 18px",
                  minHeight: "44px",
                  borderRadius: "999px",
                  cursor: isSliding ? "default" : "pointer",
                  boxShadow: `0 2px 10px ${btnColor}55`,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  opacity: isSliding ? 0.75 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isSliding) {
                    e.currentTarget.style.transform = "translateX(2px)";
                    e.currentTarget.style.opacity = "0.95";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSliding) {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.opacity = "1";
                  }
                }}
              >
                <span>{isLastCategory ? (isMobile ? "About Susana" : "About Susana Andrea") : (isMobile ? "Next collection" : "View next collection")}</span>
                <span style={{ fontSize: "14px" }}>→</span>
              </button>
            );
          })()}
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

      <div
        style={{
          flex: displayedCategory !== null ? 1 : undefined,
          minHeight: displayedCategory !== null ? 0 : isLandscapeMobile ? "calc(100dvh - 48px)" : "auto",
          height: "auto",
          display: displayedCategory !== null ? "flex" : "block",
          flexDirection: displayedCategory !== null ? "column" : undefined,
          overflow: displayedCategory !== null ? "hidden" : "visible",
          boxSizing: "border-box",
        }}
      >
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
                const shortLabel = catTitle;
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
                    <div style={{ fontFamily: FONTS.script, fontSize: "54px", lineHeight: 0.9 }}>
                      {title} Portfolio
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
        /* Drilled-in Category View with smooth slide transition */
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 1. Outgoing / Current Category Slide */}
          <div
            inert={isSliding}
            style={{
              position: isSliding ? "absolute" : "relative",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transform: isSliding && slidePhase === "active" ? "translateX(-30%)" : "translateX(0)",
              opacity: isSliding && slidePhase === "active" ? 0.6 : 1,
              transition: isSliding ? "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease" : "none",
              willChange: isSliding ? "transform, opacity" : "auto",
              pointerEvents: isSliding && slidePhase === "active" ? "none" : "auto",
            }}
          >
            <CategoryGalleryView
              category={displayedCategory}
              isMobile={isMobile}
              isMobilePortrait={isMobilePortrait}
              isLandscapeMobile={isLandscapeMobile}
              openLightbox={openLightbox}
            />
          </div>

          {/* 2. Incoming Category Slide (slides in from right taking over) */}
          {isSliding && incomingCategory && (
            <div
              inert={isSliding}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.5)",
                transform: slidePhase === "active" ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
                pointerEvents: slidePhase === "active" ? "auto" : "none",
              }}
            >
              <CategoryGalleryView
                category={incomingCategory}
                isMobile={isMobile}
                isMobilePortrait={isMobilePortrait}
                isLandscapeMobile={isLandscapeMobile}
                openLightbox={openLightbox}
              />
            </div>
          )}
        </div>
      )}

      </div>

      <Lightbox
        image={lightboxImage}
        onClose={closeLightbox}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </main>
  );
}
