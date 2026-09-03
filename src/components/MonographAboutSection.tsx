import React from "react";
import { FONTS } from "../theme/fonts";
import { VESTIGE_TEXT_SHADOW } from "../theme/effects";
import Button from "./Button";
import { useResponsiveViewport } from "../hooks/useIsMobile";

interface MonographAboutSectionProps {
  onBookSession?: () => void;
}

export default function MonographAboutSection({ onBookSession }: MonographAboutSectionProps) {
  const { isMobile, isMobilePortrait, isLandscapeMobile } = useResponsiveViewport();

  const sectionLabel: React.CSSProperties = {
    fontFamily: FONTS.script,
    fontSize: isLandscapeMobile ? "28px" : isMobile ? "32px" : "44px",
    color: "var(--color-crimson, #CD2644)",
    marginBottom: "2px",
    lineHeight: 1,
    textShadow: VESTIGE_TEXT_SHADOW,
  };

  const sectionHeading: React.CSSProperties = {
    fontFamily: FONTS.script,
    fontSize: isLandscapeMobile ? "24px" : isMobile ? "28px" : "36px",
    fontWeight: 400,
    fontStyle: "normal",
    color: "var(--color-ink, #1A1A1B)",
    margin: isLandscapeMobile ? "2px 0 12px" : "4px 0 20px",
    lineHeight: 1.15,
  };

  const bodyText: React.CSSProperties = {
    fontFamily: FONTS.body,
    fontSize: isLandscapeMobile ? "15px" : isMobile ? "17px" : "19px",
    fontWeight: 400,
    lineHeight: isLandscapeMobile ? 1.6 : 1.75,
    color: "var(--color-ink, #1A1A1B)",
    margin: isLandscapeMobile ? "0 0 12px" : "0 0 18px",
  };

  const linkStyle: React.CSSProperties = {
    color: "var(--color-crimson, #CD2644)",
    fontWeight: 600,
    textDecoration: "none",
    borderBottom: "1px solid rgba(200, 20, 44, 0.4)",
    paddingBottom: "1px",
  };

  return (
    <section
      id="about-susana"
      style={{
        background: "var(--color-parchment, #EFE9D9)",
        color: "var(--color-ink, #1A1A1B)",
        position: "relative",
        zIndex: 10,
        boxShadow: "0 -24px 60px rgba(0, 0, 0, 0.45)",
      }}
    >
      {/* 1. Viewport 100vh Opening Spread: Susana's Portrait + The Philosophy */}
      <div
        style={{
          minHeight: "100vh",
          height: "100dvh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          boxSizing: "border-box",
          padding: isLandscapeMobile
            ? "16px 20px 32px"
            : isMobile
            ? "24px 20px 40px"
            : "48px 48px 56px",
          scrollSnapAlign: "start",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            width: "100%",
            display: "grid",
            gridTemplateColumns: isMobilePortrait ? "1fr" : "minmax(220px, 320px) 1.4fr",
            gap: isLandscapeMobile ? "20px" : isMobile ? "20px" : "56px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Left Column: Portrait */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: isMobile ? "220px" : "320px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                borderRadius: "3px",
                boxShadow: "0 20px 48px rgba(0, 0, 0, 0.22)",
                border: "1px solid rgba(158, 140, 121, 0.4)",
                maxHeight: isLandscapeMobile ? "44vh" : isMobilePortrait ? "30vh" : "50vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="/susana headshot.webp"
                alt="Susana Andrea, founder of Vestige Photography"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  maxHeight: isLandscapeMobile ? "44vh" : isMobilePortrait ? "30vh" : "50vh",
                  objectFit: "cover",
                  objectPosition: "50% 25%",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: FONTS.script,
                fontSize: isLandscapeMobile ? "22px" : isMobile ? "26px" : "36px",
                color: "var(--color-crimson, #CD2644)",
                textAlign: "center",
                marginTop: isMobile ? "8px" : "12px",
                marginBottom: 0,
                lineHeight: 1,
                textShadow: VESTIGE_TEXT_SHADOW,
              }}
            >
              Susana Andrea, founder
            </p>
          </div>

          {/* Right Column: The Philosophy */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={sectionLabel}>The Philosophy</p>
            <div
              style={{
                borderLeft: "3px solid var(--color-crimson, #CD2644)",
                paddingLeft: isMobile ? "14px" : "22px",
                margin: isMobile ? "8px 0 16px" : "12px 0 20px",
              }}
            >
              <blockquote
                style={{
                  fontFamily: FONTS.cormorant,
                  fontSize: isLandscapeMobile
                    ? "clamp(18px, 3.8vh, 22px)"
                    : isMobilePortrait
                    ? "clamp(18px, 4.4vw, 22px)"
                    : "clamp(24px, 2.3vw, 30px)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.4,
                  color: "var(--color-obsidian, #1A1A1A)",
                  margin: 0,
                }}
              >
                &ldquo;My job is pose coaching, not posing. The camera just records the moment a woman finally believes what the room already sees.&rdquo;
              </blockquote>
            </div>
            <p
              style={{
                ...bodyText,
                fontSize: isLandscapeMobile
                  ? "14px"
                  : isMobilePortrait
                  ? "15px"
                  : "18px",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Susana Andrea is the photographer and founder behind Vestige. For twenty years
              she has built a practice around one idea: that a great portrait is an act of
              confidence, coaxed out rather than performed.
            </p>
          </div>
        </div>

        {/* Scroll Indicator for Remainder */}
        <div
          style={{
            position: "absolute",
            bottom: isLandscapeMobile ? "8px" : isMobile ? "12px" : "24px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            color: "var(--color-ink, #1A1A1B)",
            opacity: 0.75,
            pointerEvents: "none",
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
            Scroll for More
          </span>
          <span
            style={{
              fontSize: "15px",
              lineHeight: 1,
              color: "var(--color-crimson, #CD2644)",
              animation: "vestige-fade 1.6s ease-in-out infinite alternate",
            }}
          >
            ↓
          </span>
        </div>
      </div>

      {/* 2. The Remainder of the Story (Roots, Heritage, In Print, CTA) */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          borderTop: "1px solid rgba(158, 140, 121, 0.3)",
          padding: isLandscapeMobile
            ? "36px 20px 48px"
            : isMobile
            ? "48px 20px 64px"
            : "72px 32px 96px",
        }}
      >
        <div style={{ marginBottom: isMobile ? "36px" : "48px" }}>
          <p style={sectionLabel}>The Roots</p>
          <h3 style={sectionHeading}>From the Pit to the Portrait</h3>
          <p style={bodyText}>
            Susana came up shooting the San Diego and Phoenix punk and metal scenes &mdash;
            sweating photographers' pits, smoke-filled clubs, and the unvarnished honesty of
            the stage. That edge never left her work. It is what keeps a pin-up image from
            tipping into pastiche: the grit beneath the gloss.
          </p>
        </div>

        <div style={{ marginBottom: isMobile ? "36px" : "48px" }}>
          <p style={sectionLabel}>The Heritage</p>
          <h3 style={sectionHeading}>San Diego, by Way of Everywhere</h3>
          <p style={bodyText}>
            Of Mexican and Colombian descent and raised in San Diego, Susana grew up
            between languages, border towns, and the overlapping subcultures of Southern
            California. Her portraits carry that layered sense of place &mdash; classic cars,
            Tiki lounges, and mid-century glamour read less as costume and more as inheritance.
          </p>
        </div>

        <div style={{ marginBottom: isMobile ? "44px" : "60px" }}>
          <p style={sectionLabel}>The Accomplishments</p>
          <h3 style={sectionHeading}>In Print</h3>
          <p style={bodyText}>
            Susana is the author of{" "}
            <a
              href="https://www.wonkpress.com/products/vestige-twenty-years-of-modern-pin-up"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              <em>Vestige: Twenty Years of Modern Pin-Up</em>
            </a>{" "}
            (Wonk Press, 2025), a 200-page monograph documenting two decades of work with
            book design by Carrie A. Smith.
          </p>
        </div>

        {/* Single Call to Action */}
        <div
          style={{
            textAlign: "center",
            paddingTop: isMobile ? "20px" : "32px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button isMobile={isMobile} onClick={onBookSession}>
            Book a Session
          </Button>
        </div>
      </div>
    </section>
  );
}
