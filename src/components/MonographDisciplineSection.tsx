import React from "react";
import { responsiveSrcSet, coverSizes } from "../data/responsiveImages";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";
import type { Category } from "../data/gallery";
import { useResponsiveViewport } from "../hooks/useIsMobile";

export interface MonographDisciplineSectionProps {
  id: string;
  categoryKey?: Category;
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageFocus?: string;
  colorAccent?: string;
  isCover?: boolean; // If true, displays Vestige brand lockup & scroll cue, NO portfolio button
  showPortfolioLink?: boolean;
  onViewPortfolio?: (category: Category) => void;
}

export default function MonographDisciplineSection({
  id,
  categoryKey,
  title,
  imageSrc,
  imageAlt,
  imageFocus = "50% 35%",
  colorAccent = COLORS.crimson,
  isCover = false,
  showPortfolioLink = true,
  onViewPortfolio,
}: MonographDisciplineSectionProps) {
  const { isMobile, isMobilePortrait, isLandscapeMobile } = useResponsiveViewport();

  const shouldShowButton = !isCover && showPortfolioLink && onViewPortfolio && categoryKey;

  return (
    <div
      className="discipline-section-wrapper"
    >
      <section
        id={id}
        tabIndex={-1}
        className="discipline-section"
        aria-label={isCover ? "Vestige Photography Homepage" : `${title} Collection`}
        style={{
          padding: isLandscapeMobile
            ? "16px 20px"
            : isMobilePortrait
            ? "24px 18px"
            : "48px 56px",
        }}
      >
        {/* Static image scrolls with its section. */}
        <div className="discipline-bg-wrapper">
          <img
            src={imageSrc}
            srcSet={responsiveSrcSet(imageSrc)}
            sizes={coverSizes(imageSrc)}
            loading={isCover ? "eager" : "lazy"}
            fetchPriority={isCover ? "high" : "auto"}
            decoding="async"
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
            height: isMobile ? "240px" : "300px",
            background: "linear-gradient(to bottom, rgba(10,10,12,0.68) 0%, rgba(10,10,12,0.15) 65%, transparent 100%)",
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

        {/* Top Header: Brand Wordmark (on homepage cover) OR Category Title */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "min(92vw, 960px)",
          }}
        >
          {isCover ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {/* Primary "Vestige" Signature */}
              <h1
                style={{
                  fontFamily: FONTS.script,
                  fontSize: isLandscapeMobile
                    ? "clamp(44px, 11vh, 60px)"
                    : isMobilePortrait
                    ? "clamp(64px, 14vw, 92px)"
                    : "clamp(100px, 11vw, 160px)",
                  lineHeight: 0.95,
                  color: "#FDFEFD",
                  textShadow:
                    "0 2px 4px rgba(0, 0, 0, 0.75), 0 4px 16px rgba(205, 38, 68, 0.85), 0 0 24px rgba(205, 38, 68, 0.6), 0 0 40px rgba(205, 38, 68, 0.35)",
                  margin: 0,
                  userSelect: "none",
                }}
              >
                Vestige
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: FONTS.script,
                  fontSize: isLandscapeMobile
                    ? "clamp(18px, 4.2vh, 22px)"
                    : isMobilePortrait
                    ? "clamp(24px, 5.5vw, 32px)"
                    : "clamp(34px, 3.4vw, 48px)",
                  color: "#FDFEFD",
                  margin: isLandscapeMobile ? "4px 0 0" : isMobile ? "8px 0 0" : "14px 0 0",
                  lineHeight: 1.1,
                  fontWeight: 400,
                  textShadow:
                    "0 2px 4px rgba(0, 0, 0, 0.75), 0 3px 12px rgba(205, 38, 68, 0.85), 0 0 20px rgba(205, 38, 68, 0.5)",
                }}
              >
                Twenty years of modern pin-up
              </p>

              {/* Founder Tagline */}
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontSize: isMobile ? "9.5px" : "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.92)",
                  fontWeight: 700,
                  margin: isMobile ? "6px 0 0" : "10px 0 0",
                  textShadow: "0 2px 6px rgba(0,0,0,0.85)",
                }}
              >
                Photography by Susana Andrea
              </p>
            </div>
          ) : (
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
          )}
        </div>

        {/* Homepage Cover Scroll Cue */}
        {isCover && (
          <div
            style={{
              position: "absolute",
              bottom: "max(20px, env(safe-area-inset-bottom))",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              color: "#FFFFFF",
              opacity: 0.85,
              pointerEvents: "none",
              textShadow: "0 2px 6px rgba(0,0,0,0.85)",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: "9px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Scroll to Explore
            </span>
            <span
              style={{
                fontSize: "16px",
                lineHeight: 1,
                color: "var(--color-crimson, #CD2644)",
              }}
            >
              ↓
            </span>
          </div>
        )}

        {/* Lower-Right: Anchored "View [CATEGORY_TITLE] Portfolio" CTA (Only shown for categories) */}
        {shouldShowButton && (
          <div
            style={{
              position: "relative",
              zIndex: 5,
              alignSelf: "flex-end",
              marginBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            <button
              type="button"
              className="discipline-portfolio-btn"
              onClick={(event) => {
                // Safari does not focus buttons on pointer activation by default.
                event.currentTarget.focus({ preventScroll: true });
                onViewPortfolio(categoryKey);
              }}
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
        )}
      </section>
    </div>
  );
}
