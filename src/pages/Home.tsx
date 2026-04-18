import React from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { PAGE_LINKS, type PageKey } from "../data/navigation";
import MobileMenu from "../components/MobileMenu";

export interface HomeProps {
  heroVisible: boolean;
  isMobile: boolean;
  setPage: (p: PageKey) => void;
  navHover: string | null;
  setNavHover: (link: string | null) => void;
}

export default function Home({ heroVisible, isMobile, setPage, navHover, setNavHover }: HomeProps) {
  const navLinkStyle = (link: string): React.CSSProperties => ({
    fontFamily: FONTS.display,
    fontStyle: "italic",
    fontWeight: 600,
    fontSize: "13px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: COLORS.cream,
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "8px 0",
    opacity: navHover === link ? 1 : 0.85,
    transition: "opacity 0.3s ease",
    textShadow: "0 2px 12px rgba(0,0,0,0.4)",
  });

  return (
    <main style={{ background: COLORS.parchment, minHeight: "100vh", fontFamily: FONTS.body, color: COLORS.ink }}>
      <h1 style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}>
        Vestige Photography
      </h1>
      {/* Full-bleed hero with floating nav + script wordmark */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          opacity: heroVisible ? 1 : 0,
          transition: "opacity 1.6s ease",
        }}
      >
        <img
          src="/hero.webp"
          alt="Vestige hero portrait"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: isMobile ? "65% 35%" : "50% 50%",
          }}
        />

        {/* Top scrim for nav legibility */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "200px",
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(10,10,11,0.45) 0%, rgba(10,10,11,0.15) 60%, rgba(10,10,11,0) 100%)",
            zIndex: 5,
          }}
        />

        {/* Nav — no wordmark here; the big script below is the identity */}
        {isMobile ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "20px 16px 0",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <MobileMenu variant="overlay" setPage={setPage} />
          </div>
        ) : (
          <nav
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              gap: "40px",
              padding: "32px 48px",
              zIndex: 10,
            }}
          >
            <button
              style={navLinkStyle(PAGE_LINKS[0].label)}
              onMouseEnter={() => setNavHover(PAGE_LINKS[0].label)}
              onMouseLeave={() => setNavHover(null)}
              onClick={() => setPage(PAGE_LINKS[0].page)}
            >
              {PAGE_LINKS[0].label}
            </button>
            <button
              style={navLinkStyle(PAGE_LINKS[1].label)}
              onMouseEnter={() => setNavHover(PAGE_LINKS[1].label)}
              onMouseLeave={() => setNavHover(null)}
              onClick={() => setPage(PAGE_LINKS[1].page)}
            >
              {PAGE_LINKS[1].label}
            </button>
          </nav>
        )}

        {/* Editorial tag top-left — aligned with hamburger on mobile */}
        <div
          style={{
            position: "absolute",
            top: isMobile ? "16px" : "110px",
            left: isMobile ? "16px" : "48px",
            color: COLORS.crimson,
            textShadow: "0 2px 18px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.4)",
            zIndex: 6,
          }}
        >
          <span style={{ display: "block", fontFamily: FONTS.script, fontSize: isMobile ? "30px" : "52px", lineHeight: 1 }}>
            twenty years of
          </span>
          <span
            style={{
              display: "block",
              fontFamily: FONTS.display,
              fontStyle: "italic",
              fontWeight: 800,
              fontSize: isMobile ? "14px" : "28px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            Modern Pin-Up
          </span>
        </div>

        {/* Signature wordmark — dimensional drop-shadow for pop */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: isMobile ? "6%" : "7%",
            right: isMobile ? "4%" : "4%",
            fontFamily: FONTS.script,
            color: COLORS.crimson,
            fontSize: isMobile ? "110px" : "320px",
            lineHeight: 0.8,
            pointerEvents: "none",
            textShadow: [
              "0 1px 0 rgba(255,255,255,0.18)",
              "0 -1px 0 rgba(0,0,0,0.4)",
              "0 2px 0 #8f0e1f",
              "0 4px 0 #7a0c1b",
              "0 6px 0 #650a16",
              "0 14px 30px rgba(0,0,0,0.55)",
              "0 24px 60px rgba(0,0,0,0.35)",
            ].join(", "),
            zIndex: 6,
          }}
        >
          Vestige
        </div>
      </div>
    </main>
  );
}
