import React from "react";
import { FONTS } from "../theme/fonts";
import { COLORS } from "../theme/colors";
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
    fontSize: isLandscapeMobile ? "32px" : isMobile ? "38px" : "48px",
    color: "var(--color-crimson, #CD2644)",
    marginBottom: "4px",
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
    fontSize: isLandscapeMobile ? "16px" : isMobile ? "18px" : "20px",
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
        padding: isLandscapeMobile
          ? "48px 24px"
          : isMobile
          ? "64px 20px 80px"
          : "100px 48px 120px",
        position: "relative",
      }}
    >
      {/* Editorial Spread: Headshot + Philosophy */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobilePortrait ? "1fr" : "minmax(240px, 1fr) 1.5fr",
          gap: isLandscapeMobile ? "28px" : isMobile ? "36px" : "72px",
          alignItems: "center",
          marginBottom: isMobile ? "48px" : "72px",
        }}
      >
        <div
          style={{
            maxWidth: isMobile ? "300px" : "none",
            margin: isMobile ? "0 auto" : 0,
            width: "100%",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              borderRadius: "3px",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(158, 140, 121, 0.35)",
            }}
          >
            <img
              src="/susana headshot.webp"
              alt="Susana Andrea, founder of Vestige Photography"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
          <p
            style={{
              fontFamily: FONTS.script,
              fontSize: isMobile ? "30px" : "40px",
              color: "var(--color-crimson, #CD2644)",
              textAlign: "center",
              marginTop: "12px",
              marginBottom: 0,
              lineHeight: 1,
              textShadow: VESTIGE_TEXT_SHADOW,
            }}
          >
            Susana Andrea, founder
          </p>
        </div>

        <div>
          <p style={sectionLabel}>The Philosophy</p>
          <div
            style={{
              borderLeft: "3px solid var(--color-crimson, #CD2644)",
              paddingLeft: isMobile ? "16px" : "24px",
              margin: "12px 0 24px",
            }}
          >
            <blockquote
              style={{
                fontFamily: FONTS.cormorant,
                fontSize: isMobile ? "22px" : "28px",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.45,
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
      </div>

      {/* The Roots & Heritage */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          borderTop: "1px solid rgba(158, 140, 121, 0.3)",
          paddingTop: isMobile ? "40px" : "56px",
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

        {/* Commission CTA */}
        <div
          style={{
            textAlign: "center",
            padding: isMobile ? "32px 16px" : "48px 24px",
            background: "rgba(0, 0, 0, 0.02)",
            borderRadius: "4px",
            border: "1px solid rgba(158, 140, 121, 0.25)",
          }}
        >
          <h3
            style={{
              fontFamily: FONTS.script,
              fontSize: isMobile ? "36px" : "50px",
              color: "var(--color-crimson, #CD2644)",
              margin: "0 0 12px",
              lineHeight: 1.1,
              textShadow: VESTIGE_TEXT_SHADOW,
            }}
          >
            Commission a Session
          </h3>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: isMobile ? "16px" : "19px",
              color: "var(--color-ink, #1A1A1B)",
              maxWidth: "540px",
              margin: "0 auto 24px",
              lineHeight: 1.6,
            }}
          >
            Susana accepts select portrait commissions and editorial assignments.
          </p>
          <Button isMobile={isMobile} onClick={onBookSession}>
            Book a Session
          </Button>
        </div>
      </div>
    </section>
  );
}
