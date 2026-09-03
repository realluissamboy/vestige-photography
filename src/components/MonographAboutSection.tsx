import React from "react";
import { FONTS } from "../theme/fonts";
import { useResponsiveViewport } from "../hooks/useIsMobile";
import Button from "./Button";
import PageFooter from "./PageFooter";

export interface MonographAboutSectionProps {
  onBookSession?: () => void;
}

const VESTIGE_TEXT_SHADOW = "0 1px 2px rgba(0, 0, 0, 0.12)";

export default function MonographAboutSection({
  onBookSession,
}: MonographAboutSectionProps) {
  const { isMobile, isMobilePortrait, isLandscapeMobile } = useResponsiveViewport();

  const sectionLabel: React.CSSProperties = {
    fontFamily: FONTS.script,
    fontSize: isLandscapeMobile ? "30px" : isMobile ? "34px" : "44px",
    color: "var(--color-crimson, #CD2644)",
    marginBottom: isMobile ? "2px" : "6px",
    lineHeight: 1.1,
    textShadow: VESTIGE_TEXT_SHADOW,
  };

  const bodyText: React.CSSProperties = {
    fontFamily: FONTS.body,
    fontSize: isLandscapeMobile ? "14.5px" : isMobile ? "16.5px" : "18px",
    lineHeight: 1.6,
    color: "var(--color-obsidian, #1A1A1A)",
    margin: 0,
  };

  const linkStyle: React.CSSProperties = {
    color: "var(--color-crimson, #CD2644)",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
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
        padding: isLandscapeMobile
          ? "36px 20px 20px"
          : isMobile
          ? "48px 20px 24px"
          : "64px 36px 28px",
      }}
    >
      <div
        style={{
          maxWidth: "1060px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Editorial Side-by-Side Grid: Photo on Left, Text & CTA on Right */}
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
          {/* Left Column: Susana's Portrait & Founder Signature */}
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

          {/* Right Column: The Narrative and Call to Action */}
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

            {/* The Heritage (combined punk/metal roots and multicultural heritage) */}
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
                (Wonk Press, 2025), a 200-page monograph documenting two decades of work, and{" "}
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

            {/* Call to Action — brought up alongside the text */}
            <div
              style={{
                paddingTop: "4px",
                display: "flex",
                justifyContent: isMobilePortrait ? "center" : "flex-start",
              }}
            >
              <Button isMobile={isMobile} onClick={onBookSession}>
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
          <PageFooter visible={true} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}
