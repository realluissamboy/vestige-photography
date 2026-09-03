import React from "react";
import { FONTS } from "../theme/fonts";
import { VESTIGE_WORDMARK_SHADOW } from "../theme/effects";
import { useDirectParallax } from "../hooks/useScrollParallax";
import { useResponsiveViewport } from "../hooks/useIsMobile";

export default function MonographHero() {
  const { containerRef, targetRef } = useDirectParallax(0.16);
  const { isMobile, isMobilePortrait, isLandscapeMobile } = useResponsiveViewport();

  const handleScrollDown = () => {
    const nextSection = document.getElementById("discipline-01");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="discipline-section-wrapper" style={{ zIndex: 1 }}>
      <section
        ref={containerRef}
        aria-label="Vestige Photography Monograph"
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          minHeight: isLandscapeMobile ? "480px" : "620px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background Hero Photo with Direct-DOM Parallax Glide */}
        <div ref={targetRef} className="discipline-bg-wrapper">
          <img
            src="/hero-slides/modern-burlesque.webp"
            alt="Vestige Monograph Cover"
            className="discipline-bg-image"
            style={{
              objectPosition: isLandscapeMobile ? "50% 20%" : "50% 28%",
            }}
          />
        </div>

        {/* Atmospheric Scrim Gradients for Depth */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "240px",
            background: "linear-gradient(to bottom, rgba(10,10,12,0.65) 0%, rgba(10,10,12,0.15) 70%, transparent 100%)",
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
            height: "260px",
            background: "linear-gradient(to top, rgba(10,10,12,0.7) 0%, rgba(10,10,12,0.15) 65%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* High-Contrast Standout Editorial Placard */}
        <div className="monograph-hero-placard">
          <h1
            style={{
              fontFamily: FONTS.script,
              fontSize: isLandscapeMobile
                ? "clamp(48px, 12vh, 64px)"
                : isMobilePortrait
                ? "clamp(68px, 16vw, 96px)"
                : "clamp(100px, 11vw, 160px)",
              lineHeight: 0.95,
              color: "var(--color-crimson, #CD2644)",
              textShadow: VESTIGE_WORDMARK_SHADOW,
              margin: "0 0 8px 0",
              userSelect: "none",
            }}
          >
            Vestige
          </h1>

          <div
            style={{
              width: "60px",
              height: "1.5px",
              background: "var(--color-stone-divider, #9E8C79)",
              margin: isMobile ? "8px auto 10px" : "12px auto 14px",
              opacity: 0.8,
            }}
          />

          <p
            style={{
              fontFamily: FONTS.script,
              fontSize: isLandscapeMobile
                ? "20px"
                : isMobilePortrait
                ? "clamp(24px, 5.8vw, 32px)"
                : "clamp(32px, 3vw, 44px)",
              color: "var(--color-ink, #1A1A1B)",
              margin: 0,
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: "0.5px",
            }}
          >
            Twenty Years of Modern Pin-Up
          </p>

          <p
            style={{
              fontFamily: FONTS.display,
              fontSize: isMobile ? "9px" : "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-muted, #6B5B4A)",
              fontWeight: 700,
              marginTop: isMobile ? "10px" : "14px",
              marginBottom: 0,
            }}
          >
            Photography by Susana Andrea
          </p>
        </div>

        {/* Bottom Scroll Cue */}
        <button
          type="button"
          onClick={handleScrollDown}
          aria-label="Scroll to explore"
          style={{
            position: "absolute",
            bottom: isLandscapeMobile ? "12px" : "28px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            color: "#FFFFFF",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            padding: "8px",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: "10px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              fontWeight: 700,
              opacity: 0.9,
            }}
          >
            Scroll to Explore
          </span>
          <span
            style={{
              fontSize: "18px",
              lineHeight: 1,
              color: "var(--color-crimson, #CD2644)",
              animation: "vestige-fade 1.6s ease-in-out infinite alternate",
            }}
          >
            ↓
          </span>
        </button>
      </section>
    </div>
  );
}
