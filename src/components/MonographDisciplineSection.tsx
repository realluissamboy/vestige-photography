import React from "react";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";
import type { Category } from "../data/gallery";
import { useDirectParallax } from "../hooks/useScrollParallax";
import { useResponsiveViewport } from "../hooks/useIsMobile";

export interface MonographDisciplineSectionProps {
  id: string;
  disciplineNumber: number; // 1 to 5
  categoryKey: Category;
  title: string; // Exact title from CATEGORY_TITLES
  imageSrc: string;
  imageAlt: string;
  imageFocus?: string;
  colorAccent?: string;
  onViewPortfolio: (category: Category) => void;
}

export default function MonographDisciplineSection({
  id,
  disciplineNumber,
  categoryKey,
  title,
  imageSrc,
  imageAlt,
  imageFocus = "50% 35%",
  colorAccent = COLORS.crimson,
  onViewPortfolio,
}: MonographDisciplineSectionProps) {
  const { containerRef, targetRef } = useDirectParallax(0.16);
  const { isMobile, isMobilePortrait, isLandscapeMobile } = useResponsiveViewport();

  const formattedNumber = `0${disciplineNumber}`.slice(-2);

  return (
    <div
      className="discipline-section-wrapper"
      style={{ zIndex: disciplineNumber + 1 }}
    >
      <section
        id={id}
        ref={containerRef}
        className="discipline-section"
        aria-label={`${title} Collection`}
        style={{
          padding: isLandscapeMobile
            ? "16px 20px"
            : isMobilePortrait
            ? "24px 18px"
            : "48px 56px",
        }}
      >
        {/* Background Image with Direct-DOM Parallax Glide */}
        <div ref={targetRef} className="discipline-bg-wrapper">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="discipline-bg-image"
            style={{ objectPosition: imageFocus }}
          />
        </div>

        {/* Lighting Scrims for Readability */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: isMobile ? "220px" : "280px",
            background: "linear-gradient(to bottom, rgba(10,10,12,0.65) 0%, rgba(10,10,12,0.15) 60%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: isMobile ? "220px" : "280px",
            background: "linear-gradient(to top, rgba(10,10,12,0.7) 0%, rgba(10,10,12,0.15) 60%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Top Header: Discipline Badge & Script Title */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "90vw",
          }}
        >
          {/* Chapter Identifier Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(10, 10, 12, 0.75)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              borderRadius: "999px",
              padding: isMobile ? "4px 10px" : "6px 14px",
              marginBottom: isMobile ? "8px" : "14px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: colorAccent,
                boxShadow: `0 0 8px ${colorAccent}`,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: isMobile ? "9.5px" : "11px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              {formattedNumber} / 05
            </span>
          </div>

          {/* Category Title */}
          <h2
            style={{
              fontFamily: FONTS.script,
              fontSize: isLandscapeMobile
                ? "clamp(38px, 9.5vh, 52px)"
                : isMobilePortrait
                ? "clamp(52px, 13vw, 76px)"
                : "clamp(88px, 8.5vw, 130px)",
              lineHeight: 1,
              color: "#FDFEFD",
              margin: 0,
              textShadow:
                "0 2px 6px rgba(0,0,0,0.85), 0 4px 18px rgba(200,20,44,0.75), 0 0 28px rgba(200,20,44,0.45)",
              userSelect: "none",
            }}
          >
            {title}
          </h2>
        </div>

        {/* Lower-Right: Anchored "View [CATEGORY_TITLE] Portfolio" CTA */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            alignSelf: "flex-end",
            marginBottom: isLandscapeMobile ? "4px" : isMobile ? "8px" : "16px",
          }}
        >
          <button
            type="button"
            className="discipline-portfolio-btn"
            onClick={() => onViewPortfolio(categoryKey)}
            aria-label={`View ${title} Portfolio`}
            style={{
              borderColor: "rgba(255, 255, 255, 0.4)",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.display,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: isMobile ? "12px" : "14px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              View {title} Portfolio
            </span>
            <span className="arrow-icon" style={{ fontSize: isMobile ? "13px" : "16px" }}>
              →
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
