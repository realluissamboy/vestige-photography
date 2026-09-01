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
    fontSize: isLandscapeMobile ? "34px" : isMobile ? "40px" : "54px",
    color: "var(--color-crimson)",
    marginBottom: "2px",
    lineHeight: 1,
    textShadow: VESTIGE_TEXT_SHADOW,
  };
  const sectionHeading: CSSProperties = {
    fontFamily: FONTS.script,
    fontSize: isLandscapeMobile ? "26px" : isMobile ? "30px" : "38px",
    fontWeight: 400,
    fontStyle: "normal",
    color: "var(--color-ink)",
    margin: isLandscapeMobile ? "2px 0 14px" : "4px 0 24px",
    lineHeight: 1.15,
  };
  const narrowSectionPadding = isLandscapeMobile ? "0 24px 40px" : isMobile ? "0 20px 64px" : "0 40px 96px";
  const bodyText: CSSProperties = {
    fontFamily: FONTS.body,
    fontSize: isLandscapeMobile ? "16px" : isMobile ? "18px" : "20px",
    fontWeight: 400,
    lineHeight: isLandscapeMobile ? 1.6 : 1.75,
    color: "var(--color-ink)",
    margin: isLandscapeMobile ? "0 0 14px" : "0 0 20px",
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
    <main style={{ background: "var(--color-parchment)", minHeight: "100vh", fontFamily: FONTS.body, color: "var(--color-ink)" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

      <PageHeader
        page="about"
        visible={aboutVisible}
        setPage={setPage}
        navStyleDark={navStyleDark}
        setNavHover={setNavHover}
        isMobile={isMobile}
      />
      <div style={{ height: isLandscapeMobile ? "20px" : isMobile ? "40px" : "64px" }} />

      {/* Opening: headshot + philosophy */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: narrowSectionPadding,
          display: "grid",
          gridTemplateColumns: isMobilePortrait ? "1fr" : "minmax(220px, 1fr) 1.5fr",
          gap: isLandscapeMobile ? "28px" : isMobile ? "36px" : "72px",
          alignItems: "center",
          opacity: aboutVisible ? 1 : 0,
          transition: "opacity 1s ease 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: isMobile ? "320px" : "none",
            margin: isMobile ? "0 auto" : 0,
            width: "100%",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              borderRadius: "2px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
              border: "1px solid rgba(158, 140, 121, 0.3)",
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
              fontSize: isMobile ? "32px" : "42px",
              color: "var(--color-crimson)",
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
              borderLeft: "3px solid var(--color-crimson)",
              paddingLeft: isMobile ? "16px" : "24px",
              margin: "12px 0 28px",
            }}
          >
            <p
              style={{
                fontFamily: FONTS.cormorant,
                fontSize: isMobile ? "24px" : "30px",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.45,
                color: "var(--color-obsidian)",
                margin: 0,
              }}
            >
              &ldquo;My job is pose coaching, not posing. The camera just records the moment a woman finally believes what the room already sees.&rdquo;
            </p>
          </div>
          <p style={bodyText}>
            Susana Andrea is the photographer and founder behind Vestige. For twenty years
            she has built a practice around one idea: that a great portrait is an act of
            confidence, coaxed out rather than performed.
          </p>
        </div>
      </section>

      {/* The Roots */}
      <section
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: narrowSectionPadding,
          opacity: aboutVisible ? 1 : 0,
          transition: "opacity 1s ease 0.4s",
        }}
      >
        <p style={sectionLabel}>The Roots</p>
        <h1 style={sectionHeading}>From the Pit to the Portrait</h1>
        <p style={bodyText}>
          Susana came up shooting the San Diego and Phoenix punk and metal scenes &mdash;
          sweating photographers' pits, smoke-filled clubs, and the unvarnished honesty of
          the stage. That edge never left her work. It is what keeps a pin-up image from
          tipping into pastiche: the grit beneath the gloss.
        </p>
      </section>

      {/* The Heritage */}
      <section
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: narrowSectionPadding,
          opacity: aboutVisible ? 1 : 0,
          transition: "opacity 1s ease 0.5s",
        }}
      >
        <p style={sectionLabel}>The Heritage</p>
        <h2 style={sectionHeading}>San Diego, by Way of Everywhere</h2>
        <p style={bodyText}>
          Of Mexican and Colombian descent and raised in San Diego, Susana grew up
          between languages, border towns, and the overlapping subcultures of Southern
          California. Her portraits carry that layered sense of place &mdash; classic cars,
          Tiki lounges, and mid-century glamour read less as costume and more as inheritance.
        </p>
      </section>

      {/* The Accomplishments */}
      <section
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: narrowSectionPadding,
          opacity: aboutVisible ? 1 : 0,
          transition: "opacity 1s ease 0.6s",
        }}
      >
        <p style={sectionLabel}>The Accomplishments</p>
        <h2 style={sectionHeading}>In Print</h2>
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
      </section>

      {/* CTA */}
      <section
        style={{
          textAlign: "center",
          padding: isMobile ? "0 20px 36px" : "0 24px 50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          opacity: aboutVisible ? 1 : 0,
          transition: "opacity 1s ease 0.7s",
        }}
      >
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Button onClick={onBookSession} isMobile={isMobile}>
            Book a Session
          </Button>
        </div>
      </section>

      <PageFooter visible={aboutVisible} navStyleDark={navStyleDark} isMobile={isMobile} showBrandVoice={true} />
    </main>
  );
}

