import React from "react";
import type { CSSProperties } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
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

  return (
    <main style={{ background: "var(--color-parchment)", minHeight: "100vh", fontFamily: FONTS.body, color: "var(--color-ink)" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

      <PageHeader
        page="portfolio"
        visible={galleryVisible}
        setPage={setPage}
        navStyleDark={navStyleDark}
        setNavHover={setNavHover}
        isMobile={isMobile}
      />

      <div style={{ height: isMobile ? "24px" : "40px" }} />

      <h1 style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}>
        Portfolio
      </h1>

      <div style={{ opacity: galleryVisible ? 1 : 0, transition: "opacity 0.8s ease" }}>

      {portfolioCategory === null ? (
        /* Book-style colored section tiles */
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "16px 20px 60px" : "32px 40px 80px" }}>
          {PORTFOLIO_CATEGORIES.map((cat, rowIdx) => {
            const catPhotos = GALLERY_IMAGES.filter((img) => img.cat === cat);
            const color = CATEGORY_COLORS[cat] ?? "";
            const title = CATEGORY_TITLES[cat] ?? "";
            const reverse = rowIdx % 2 === 1;
            const tileBlock = (
              <div
                key="tile"
                onClick={() => setPortfolioCategory(cat)}
                style={{
                  background: color,
                  color: "var(--color-cream)",
                  textAlign: "center",
                  padding: isMobile ? "40px 20px" : "40px 24px",
                  minHeight: isMobile ? "220px" : "220px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.92")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <div>
                  <div style={{ fontFamily: FONTS.script, fontSize: isMobile ? "52px" : "54px", lineHeight: 0.85, opacity: 0.9 }}>
                    {title.startsWith("Modern ") ? "modern" : "a modern"}
                  </div>
                  <div style={{ fontFamily: FONTS.display, fontStyle: "italic", fontWeight: 800, fontSize: isMobile ? "38px" : "40px", letterSpacing: "-1px", lineHeight: 1 }}>
                    {title.replace(/^Modern\s/, "")}
                  </div>
                </div>
              </div>
            );
            if (isMobile) {
              /* Mobile: just the colored tile, no photos (cleaner) */
              return <div key={cat} style={{ marginBottom: "12px" }}>{tileBlock}</div>;
            }
            const photos = catPhotos.slice(0, 2).map((img) => (
              <div
                key={img.id}
                onClick={() => setPortfolioCategory(cat)}
                style={{ position: "relative", overflow: "hidden", cursor: "pointer", minHeight: "220px" }}
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
            while (cells.length < 3) cells.push(<div key={`pad-${cells.length}`} style={{ background: "transparent", minHeight: "220px" }} />);
            return (
              <div
                key={cat}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
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
        /* Drilled-in Category View — crimson band header */
        <>
          <section
            style={{
              background: CATEGORY_COLORS[portfolioCategory] ?? "",
              color: COLORS.cream,
              padding: isMobile ? "48px 20px" : "72px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: FONTS.script, fontSize: isMobile ? "44px" : "62px", lineHeight: 0.9, opacity: 0.9 }}>
              a study in
            </div>
            <h2 style={{ fontFamily: FONTS.display, fontStyle: "italic", fontWeight: 800, fontSize: isMobile ? "56px" : "92px", letterSpacing: "-2px", lineHeight: 1, marginTop: "4px", margin: "4px 0 0 0" }}>
              {CATEGORY_TITLES[portfolioCategory] ?? ""}
            </h2>
            <button
              onClick={() => setPortfolioCategory(null)}
              style={{
                marginTop: "28px",
                fontFamily: FONTS.display,
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: COLORS.cream,
                background: "transparent",
                border: "none",
                borderBottom: `1px solid rgba(245,240,232,0.4)`,
                paddingBottom: "2px",
                cursor: "pointer",
                minHeight: "44px",
                opacity: 0.9,
              }}
            >
              ← back to portfolio
            </button>
          </section>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: isMobile ? "40px 20px 60px" : "64px 40px 80px",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
              gap: isMobile ? "24px" : "20px",
              alignItems: "start",
            }}
          >
            {GALLERY_IMAGES
              .filter((img) => img.cat === portfolioCategory)
              .map((img: GalleryImage, i) => (
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
          opacity: galleryVisible ? 1 : 0,
          transition: "opacity 1s ease 0.7s",
        }}
      >
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Button href="https://ig.me/m/susanavestige" target="_blank" rel="noopener noreferrer" isMobile={isMobile}>Book a Session</Button>
        </div>
      </section>

      <PageFooter visible={galleryVisible} navStyleDark={navStyleDark} isMobile={isMobile} />

      <Lightbox image={lightboxImage} onClose={closeLightbox} />
    </main>
  );
}
