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

export interface PortfolioProps {
  setPage: (p: PageKey) => void;
  isMobile: boolean;
  navStyleDark: (label: string, isActive: boolean) => CSSProperties;
  setNavHover: (p: string | null) => void;
}

export default function Portfolio({ setPage, isMobile, navStyleDark, setNavHover }: PortfolioProps) {
  const { portfolioCategory, setPortfolioCategory, galleryVisible } =
    usePortfolioState("portfolio");
  const { lightboxImage, openLightbox, closeLightbox } = useLightbox();

  const [displayedCategory, setDisplayedCategory] = React.useState<Category | null>(portfolioCategory);
  const [isCategoryTransitioning, setIsCategoryTransitioning] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  const handleSelectCategory = (cat: Category) => {
    if (cat === displayedCategory) return;
    setIsCategoryTransitioning(true);
    setTimeout(() => {
      setPortfolioCategory(cat);
      setDisplayedCategory(cat);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsCategoryTransitioning(false);
        }, 30);
      });
    }, 200);
  };

  const handleBackToPortfolio = () => {
    setIsCategoryTransitioning(true);
    setTimeout(() => {
      setPortfolioCategory(null);
      setDisplayedCategory(null);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsCategoryTransitioning(false);
        }, 30);
      });
    }, 200);
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

      <div
        style={{
          opacity: isCategoryTransitioning ? 0 : 1,
          transform: isCategoryTransitioning ? "translateY(6px) scale(0.996)" : "translateY(0) scale(1)",
          transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
      {displayedCategory === null ? (
        /* Book-style colored section tiles */
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "16px 20px 60px" : "32px 40px 80px" }}>
          {PORTFOLIO_CATEGORIES.map((cat, rowIdx) => {
            const catPhotos = GALLERY_IMAGES.filter((img) => img.cat === cat);
            const color = CATEGORY_COLORS[cat] ?? "";
            const title = CATEGORY_TITLES[cat] ?? "";
            const reverse = rowIdx % 2 === 1;

            if (isMobile) {
              /* Mobile Option A: Editorial Split Book-Spread Card */
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
                    marginBottom: "16px",
                    minHeight: "154px",
                    background: color,
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                >
                  {/* Left: Featured Cover Photo */}
                  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "154px", overflow: "hidden" }}>
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
                      padding: "20px 14px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontFamily: FONTS.script, fontSize: "40px", lineHeight: 0.85, opacity: 0.92 }}>
                      {title.startsWith("Modern ") ? "modern" : "a modern"}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.display,
                        fontStyle: "italic",
                        fontWeight: 800,
                        fontSize: "24px",
                        letterSpacing: "-0.5px",
                        lineHeight: 1.05,
                        marginTop: "4px",
                      }}
                    >
                      {title.replace(/^Modern\s/, "")}
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                        fontSize: "11px",
                        letterSpacing: "3px",
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
            }

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
        </div>
      ) : (
        /* Drilled-in Category View — band header */
        <>
          <section
            style={{
              background: CATEGORY_COLORS[displayedCategory] ?? "",
              color: COLORS.cream,
              padding: isMobile ? "48px 20px" : "72px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: FONTS.script, fontSize: isMobile ? "44px" : "62px", lineHeight: 0.9, opacity: 0.9 }}>
              a study in
            </div>
            <h2 style={{ fontFamily: FONTS.display, fontStyle: "italic", fontWeight: 800, fontSize: isMobile ? "56px" : "92px", letterSpacing: "-2px", lineHeight: 1, marginTop: "4px", margin: "4px 0 0 0" }}>
              {CATEGORY_TITLES[displayedCategory] ?? ""}
            </h2>
          </section>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: isMobile ? "32px 16px 60px" : "64px 40px 80px",
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: isMobile ? "14px" : "20px",
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

        {displayedCategory !== null && (
          <button
            onClick={handleBackToPortfolio}
            style={{
              marginTop: "4px",
              fontFamily: FONTS.script,
              fontSize: isMobile ? "26px" : "32px",
              color: "var(--color-crimson)",
              background: "transparent",
              border: "none",
              borderBottom: "1.5px solid var(--color-crimson)",
              paddingBottom: "2px",
              cursor: "pointer",
              minHeight: "44px",
              lineHeight: 1,
              textShadow: VESTIGE_TEXT_SHADOW,
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Back to Portfolio
          </button>
        )}
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

