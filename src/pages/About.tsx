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
    fontSize: isLandscapeMobile ? "30px" : isMobile ? "34px" : "44px",
    color: "var(--color-crimson, #CD2644)",
    marginBottom: isMobile ? "2px" : "6px",
    lineHeight: 1.1,
    textShadow: VESTIGE_TEXT_SHADOW,
  };

  const bodyText: CSSProperties = {
    fontFamily: FONTS.body,
    fontSize: isLandscapeMobile ? "14.5px" : isMobile ? "16.5px" : "18px",
    fontWeight: 400,
    lineHeight: 1.6,
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

      {/* Editorial Side-by-Side Container */}
      <article
        style={{
          maxWidth: "1060px",
          margin: "0 auto",
          padding: isLandscapeMobile
            ? "0 20px 36px"
            : isMobile
            ? "0 20px 48px"
            : "0 36px 64px",
          opacity: aboutVisible ? 1 : 0,
          transition: "opacity 0.8s ease 0.2s",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobilePortrait
              ? "1fr"
              : isLandscapeMobile
              ? "minmax(200px, 240px) 1.5fr"
              : "minmax(240px, 300px) 1.5fr",
            gap: isLandscapeMobile ? "24px" : isMobile ? "24px" : "52px",
            alignItems: "start",
          }}
        >
          {/* Left: Susana's Portrait & Founder Signature */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: isMobilePortrait ? "static" : "sticky",
              top: isLandscapeMobile ? "60px" : "80px",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                borderRadius: "4px",
                boxShadow: "0 20px 48px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(158, 140, 121, 0.4)",
                width: isMobilePortrait ? "190px" : "100%",
                maxWidth: "280px",
              }}
            >
              <img
                src="/susana headshot.webp"
                alt="Susana Andrea, founder of Vestige Photography"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: FONTS.script,
                fontSize: isLandscapeMobile ? "24px" : isMobilePortrait ? "26px" : "34px",
                color: "var(--color-crimson, #CD2644)",
                textAlign: "center",
                margin: "12px 0 0",
                lineHeight: 1,
                textShadow: VESTIGE_TEXT_SHADOW,
              }}
            >
              Susana Andrea, founder
            </p>
          </div>

          {/* Right: Narrative and CTA */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* The Philosophy */}
            <div
              style={{
                marginBottom: isLandscapeMobile ? "20px" : isMobile ? "24px" : "28px",
              }}
            >
              <p style={sectionLabel}>The Philosophy</p>
              <div
                style={{
                  borderLeft: "3px solid var(--color-crimson, #CD2644)",
                  paddingLeft: isMobile ? "14px" : "18px",
                  margin: "8px 0 12px",
                  textAlign: "left",
                }}
              >
                <blockquote
                  style={{
                    fontFamily: FONTS.cormorant,
                    fontSize: isLandscapeMobile
                      ? "clamp(15px, 2.8vh, 18px)"
                      : isMobilePortrait
                      ? "clamp(16px, 4vw, 20px)"
                      : "clamp(19px, 1.8vw, 23px)",
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
            <div
              style={{
                marginBottom: isLandscapeMobile ? "20px" : isMobile ? "24px" : "28px",
              }}
            >
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
            <div
              style={{
                marginBottom: isLandscapeMobile ? "24px" : isMobile ? "28px" : "32px",
              }}
            >
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

            {/* CTA at the bottom of the narrative */}
            <div
              style={{
                paddingTop: "4px",
                display: "flex",
                justifyContent: isMobilePortrait ? "center" : "flex-start",
              }}
            >
              <Button onClick={() => onBookSession?.()} isMobile={isMobile}>
                Book a Session
              </Button>
            </div>
          </div>
        </div>

        {/* Integrated Compact Horizontal Footer */}
        <div
          style={{
            width: "100%",
            borderTop: "1px solid rgba(158, 140, 121, 0.25)",
            marginTop: isLandscapeMobile ? "28px" : isMobile ? "32px" : "44px",
            paddingTop: "6px",
          }}
        >
          <PageFooter visible={aboutVisible} isMobile={isMobile} />
        </div>
      </article>
    </main>
  );
}
