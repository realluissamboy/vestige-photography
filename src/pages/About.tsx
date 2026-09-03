import React, { type CSSProperties } from "react";
import { FONTS } from "../theme/fonts";
import { VESTIGE_TEXT_SHADOW } from "../theme/effects";
import type { PageKey } from "../data/navigation";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import Button from "../components/Button";
import { useResponsiveViewport } from "../hooks/useIsMobile";

export interface AboutProps {
  aboutVisible: boolean;
  setPage: (p: PageKey) => void;
  isMobile: boolean;
  navStyleDark: (label: string, isActive: boolean) => CSSProperties;
  setNavHover: (p: string | null) => void;
  onBookSession?: () => void;
}

export default function About({
  aboutVisible,
  setPage,
  isMobile,
  navStyleDark,
  setNavHover,
  onBookSession,
}: AboutProps) {
  const { isLandscapeMobile, isMobilePortrait } = useResponsiveViewport();

  const sectionLabel: CSSProperties = {
    fontFamily: FONTS.script,
    fontSize: isLandscapeMobile ? "32px" : isMobile ? "38px" : "48px",
    color: "var(--color-crimson, #CD2644)",
    marginBottom: isMobile ? "4px" : "8px",
    lineHeight: 1.1,
    textShadow: VESTIGE_TEXT_SHADOW,
  };

  const bodyText: CSSProperties = {
    fontFamily: FONTS.body,
    fontSize: isLandscapeMobile ? "15px" : isMobile ? "17px" : "19px",
    fontWeight: 400,
    lineHeight: 1.65,
    color: "var(--color-obsidian, #1A1A1A)",
    margin: 0,
  };

  const linkStyle: CSSProperties = {
    color: "var(--color-crimson)",
    fontWeight: 600,
    textDecoration: "none",
    borderBottom: "1px solid rgba(200, 20, 44, 0.4)",
    paddingBottom: "1px",
    transition: "border-color 0.2s ease, opacity 0.2s ease",
  };

  return (
    <main
      style={{
        background: "var(--color-parchment)",
        minHeight: "100vh",
        fontFamily: FONTS.body,
        color: "var(--color-ink)",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
        rel="stylesheet"
      />

      <PageHeader
        page="about"
        visible={aboutVisible}
        setPage={setPage}
        navStyleDark={navStyleDark}
        setNavHover={setNavHover}
        isMobile={isMobile}
      />
      <div style={{ height: isLandscapeMobile ? "20px" : isMobile ? "36px" : "56px" }} />

      {/* United Single Story Container */}
      <article
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: isLandscapeMobile
            ? "0 20px 48px"
            : isMobile
            ? "0 20px 64px"
            : "0 32px 96px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: aboutVisible ? 1 : 0,
          transition: "opacity 0.8s ease 0.2s",
          boxSizing: "border-box",
        }}
      >
        {/* Top: Portrait and Founder Signature */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: isMobile ? "28px" : "40px",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              borderRadius: "4px",
              boxShadow: "0 16px 36px rgba(0, 0, 0, 0.18)",
              border: "1px solid rgba(158, 140, 121, 0.4)",
              maxHeight: isLandscapeMobile ? "200px" : isMobilePortrait ? "220px" : "280px",
            }}
          >
            <img
              src="/susana headshot.webp"
              alt="Susana Andrea, founder of Vestige Photography"
              style={{
                display: "block",
                width: "auto",
                height: "auto",
                maxHeight: isLandscapeMobile ? "200px" : isMobilePortrait ? "220px" : "280px",
                objectFit: "contain",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: FONTS.script,
              fontSize: isLandscapeMobile ? "24px" : isMobile ? "28px" : "36px",
              color: "var(--color-crimson, #CD2644)",
              textAlign: "center",
              margin: "10px 0 0",
              lineHeight: 1,
              textShadow: VESTIGE_TEXT_SHADOW,
            }}
          >
            Susana Andrea, founder
          </p>
        </div>

        {/* The Philosophy */}
        <div style={{ width: "100%", marginBottom: isMobile ? "36px" : "48px" }}>
          <p style={sectionLabel}>The Philosophy</p>
          <div
            style={{
              borderLeft: "3px solid var(--color-crimson, #CD2644)",
              paddingLeft: isMobile ? "16px" : "24px",
              margin: "12px 0 16px",
              textAlign: "left",
            }}
          >
            <blockquote
              style={{
                fontFamily: FONTS.cormorant,
                fontSize: isLandscapeMobile
                  ? "clamp(17px, 3.4vh, 22px)"
                  : isMobilePortrait
                  ? "clamp(18px, 4.5vw, 24px)"
                  : "clamp(22px, 2.2vw, 28px)",
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
          <p style={bodyText}>
            Susana Andrea is the photographer and founder behind Vestige. For twenty years
            she has built a practice around one idea: that a great portrait is an act of
            confidence, coaxed out rather than performed.
          </p>
        </div>

        {/* The Heritage (combined roots & heritage) */}
        <div style={{ width: "100%", marginBottom: isMobile ? "36px" : "48px" }}>
          <p style={sectionLabel}>The Heritage</p>
          <p style={bodyText}>
            Susana came up shooting the San Diego and Phoenix punk and metal scenes &mdash;
            sweating photographers' pits, smoke-filled clubs, and the unvarnished honesty of
            the stage. That edge never left her work. It is what keeps a pin-up image from
            tipping into pastiche: the grit beneath the gloss. Of Mexican and Colombian descent
            and raised in San Diego, Susana grew up between languages, border towns, and the
            overlapping subcultures of Southern California. Her portraits carry that layered
            sense of place &mdash; classic cars, Tiki lounges, and mid-century glamour read
            less as costume and more as inheritance.
          </p>
        </div>

        {/* The Accomplishments */}
        <div style={{ width: "100%", marginBottom: isMobile ? "40px" : "56px" }}>
          <p style={sectionLabel}>The Accomplishments</p>
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
            (Wonk Press) and{" "}
            <a
              href="https://schifferbooks.com/products/kittens-kulture"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              <em>Kittens and Kulture</em>
            </a>{" "}
            (Schiffer Publishing), and editor of{" "}
            <a
              href="https://www.instagram.com/thevelvetgazette/"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
            >
              <em>The Velvet Gazette</em>
            </a>
            , a quarterly publication on vintage style, burlesque, and the women who keep
            those traditions alive.
          </p>
        </div>

        {/* CTA at the bottom */}
        <div
          style={{
            textAlign: "center",
            paddingTop: isMobile ? "12px" : "20px",
            marginBottom: isMobile ? "32px" : "48px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button onClick={onBookSession} isMobile={isMobile}>
            Book a Session
          </Button>
        </div>

        {/* Integrated Compact Horizontal Footer */}
        <div
          style={{
            width: "100%",
            borderTop: "1px solid rgba(158, 140, 121, 0.25)",
            paddingTop: "6px",
          }}
        >
          <PageFooter visible={aboutVisible} isMobile={isMobile} showBrandVoice={true} />
        </div>
      </article>
    </main>
  );
}
