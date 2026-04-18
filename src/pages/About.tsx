import React, { type CSSProperties } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import type { PageKey } from "../data/navigation";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import Button from "../components/Button";

export interface AboutProps {
  aboutVisible: boolean;
  setPage: (p: PageKey) => void;
  isMobile: boolean;
  navStyleDark: (label: string, isActive: boolean) => CSSProperties;
  setNavHover: (p: string | null) => void;
}

export default function About({ aboutVisible, setPage, isMobile, navStyleDark, setNavHover }: AboutProps) {
  const sectionLabel: CSSProperties = {
    fontFamily: FONTS.script,
    fontSize: isMobile ? "40px" : "52px",
    color: "var(--color-crimson)",
    marginBottom: "4px",
    lineHeight: 0.9,
  };
  const sectionHeading: CSSProperties = {
    fontFamily: FONTS.display,
    fontStyle: "italic",
    fontWeight: 800,
    fontSize: isMobile ? "36px" : "48px",
    color: "var(--color-ink)",
    margin: "0 0 32px",
    letterSpacing: "-0.5px",
    lineHeight: 1,
  };
  const narrowSectionPadding = isMobile ? "0 24px 80px" : "0 40px 120px";
  const bodyText: CSSProperties = {
    fontFamily: FONTS.body,
    fontSize: "19px",
    fontWeight: 400,
    lineHeight: 1.65,
    color: "var(--color-ink)",
    margin: "0 0 20px",
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
      <div style={{ height: isMobile ? "48px" : "80px" }} />

      {/* Opening: headshot + philosophy */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: narrowSectionPadding,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(240px, 1fr) 1.4fr",
          gap: isMobile ? "32px" : "80px",
          alignItems: "center",
          opacity: aboutVisible ? 1 : 0,
          transition: "opacity 1s ease 0.3s",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            maxWidth: isMobile ? "320px" : "none",
            margin: isMobile ? "0 auto" : 0,
            width: "100%",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          }}
        >
          <img
            src="/susana headshot.webp"
            alt="Susana Andrea, founder of Vestige Photography"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
        <div>
          <p style={sectionLabel}>The Philosophy</p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
              fontSize: isMobile ? "24px" : "30px",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.4,
              color: "var(--color-obsidian)",
              margin: "0 0 24px",
            }}
          >
            &ldquo;My job is pose coaching, not posing. The camera just records the moment a woman finally believes what the room already sees.&rdquo;
          </p>
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
          maxWidth: "820px",
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
          maxWidth: "820px",
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
          maxWidth: "820px",
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
            style={{ color: "var(--color-obsidian)", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            <em>Vestige: Twenty Years of Modern Pin-Up</em>
          </a>{" "}
          and{" "}
          <a
            href="https://schifferbooks.com/products/kittens-kulture"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-obsidian)", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            <em>Kittens and Kulture</em>
          </a>
          , and editor of{" "}
          <a
            href="https://www.instagram.com/thevelvetgazette/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-obsidian)", textDecoration: "underline", textUnderlineOffset: "3px" }}
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
          padding: "0 24px 120px",
          opacity: aboutVisible ? 1 : 0,
          transition: "opacity 1s ease 0.7s",
        }}
      >
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Button href="https://ig.me/m/susanavestige" target="_blank" rel="noopener noreferrer" isMobile={isMobile}>Book a Session</Button>
        </div>
      </section>

      <PageFooter visible={aboutVisible} navStyleDark={navStyleDark} isMobile={isMobile} />
    </main>
  );
}
