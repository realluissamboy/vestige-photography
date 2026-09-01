import React from "react";
import type { CSSProperties } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { VESTIGE_TEXT_SHADOW } from "../theme/effects";
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

  return (
    <main style={{ background: "var(--color-parchment)", minHeight: "100vh", fontFamily: FONTS.body, color: "var(--color-ink)" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

      <PageHeader
        page="portfolio"
        visible={galleryVisible}
        setPage={setPage}
        onResetPortfolio={handleBackToPortfolio}
        navStyleDark={navStyleDark}
        setNavHover={setNavHover}
        isMobile={isMobile}
      />

      <div style={{ height: isMobile ? "24px" : "40px" }} />

      <h1 style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}>
        Portfolio
      </h1>

      <div style={{ minHeight: "60vh" }}>
      {displayedCategory === null ? (
        /* Book-style colored section tiles */
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isLandscapeMobile ? "12px 20px 48px" : isMobile ? "16px 20px 60px" : "32px 40px 80px" }}>
          {isMobile ? (
            <div
              style={{
                display: isLandscapeMobile ? "grid" : "flex",
                flexDirection: "column",
                gridTemplateColumns: isLandscapeMobile ? "repeat(2, 1fr)" : undefined,
                gap: isLandscapeMobile ? "16px" : "16px",
              }}
            >
              {PORTFOLIO_CATEGORIES.map((cat) => {
                const catPhotos = GALLERY_IMAGES.filter((img) => img.cat === cat);
                const color = CATEGORY_COLORS[cat] ?? "";
                const title = CATEGORY_TITLES[cat] ?? "";
                const coverPhoto = catPhotos[0];

                return (
                  <div
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${title} gallery`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelectCategory(cat);
                      }
                    }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.15fr 1fr",
                      borderRadius: "3px",
                      overflow: "hidden",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
                      cursor: "pointer",
                      marginBottom: isLandscapeMobile ? 0 : "16px",
                      minHeight: isLandscapeMobile ? "130px" : "154px",
                      background: color,
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                  >
                    {/* Left: Featured Cover Photo */}
                    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: isLandscapeMobile ? "130px" : "154px", overflow: "hidden" }}>
                      {coverPhoto && (
                        <img
                          src={coverPhoto.src}
                          alt={coverPhoto.label}
                          loading="lazy"
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: coverPhoto.focus || "50% 20%",
                          }}
                        />
                      )}
                    </div>

                    {/* Right: Colored Typography Plate */}
                    <div
                      style={{
                        background: color,
                        color: "var(--color-cream)",
                        padding: isLandscapeMobile ? "14px 10px" : "20px 14px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontFamily: FONTS.script, fontSize: isLandscapeMobile ? "32px" : "40px", lineHeight: 0.85, opacity: 0.92 }}>
                        {title.startsWith("Modern ") ? "modern" : "a modern"}
                      </div>
                      <div
                        style={{
                          fontFamily: FONTS.display,
                          fontStyle: "italic",
                          fontWeight: 800,
                          fontSize: isLandscapeMobile ? "20px" : "24px",
                          letterSpacing: "-0.5px",
                          lineHeight: 1.05,
                          marginTop: "4px",
                        }}
                      >
                        {title.replace(/^Modern\s/, "")}
                      </div>
                      <div
                        style={{
                          marginTop: isLandscapeMobile ? "6px" : "10px",
                          fontSize: isLandscapeMobile ? "10px" : "11px",
                          letterSpacing: "2.5px",
                          textTransform: "uppercase",
                          fontFamily: FONTS.display,
                          fontStyle: "italic",
                          opacity: 0.85,
                          borderBottom: "1px solid rgba(245,240,232,0.4)",
                          paddingBottom: "1px",
                        }}
                      >
                        View {catPhotos.length} Photos →
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            PORTFOLIO_CATEGORIES.map((cat, rowIdx) => {
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
            })
          )}
        </div>
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

      <Lightbox
        image={lightboxImage}
        onClose={closeLightbox}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </main>
  );
}

