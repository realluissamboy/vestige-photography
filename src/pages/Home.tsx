import React, { useEffect, useState } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { PAGE_LINKS, type PageKey } from "../data/navigation";
import MobileMenu from "../components/MobileMenu";
import { CATEGORY_TITLES, GALLERY_IMAGES, PORTFOLIO_CATEGORIES } from "../data/gallery";

const HERO_SLIDES = PORTFOLIO_CATEGORIES
  .map((category) => GALLERY_IMAGES.find((image) => image.cat === category))
  .filter((image): image is NonNullable<typeof image> => image !== undefined);

const HIGH_RES_HERO_SOURCES: Record<number, string> = {
  34: "/hero-slides/modern-burlesque.webp",
  36: "/hero-slides/modern-tiki.webp",
};

const HERO_IMAGE_POSITIONS: Record<number, string> = {
  18: "35% 5%",
};

const SLIDE_DURATION = 6500;

const HERO_LABEL_SHADOWS: Record<number, string> = {
  1: "0 2px 10px rgba(10,10,11,0.9), 0 1px 2px rgba(10,10,11,0.9)",
  5: "0 2px 10px rgba(10,10,11,0.9), 0 1px 2px rgba(10,10,11,0.9)",
  13: "0 1px 0 rgba(245,240,232,0.9), 0 0 10px rgba(245,240,232,0.7)",
  34: "0 1px 0 rgba(245,240,232,0.9), 0 0 10px rgba(245,240,232,0.7)",
  36: "0 1px 0 rgba(245,240,232,0.9), 0 0 10px rgba(245,240,232,0.7)",
};

export interface HomeProps {
  heroVisible: boolean;
  isMobile: boolean;
  setPage: (p: PageKey) => void;
  navHover: string | null;
  setNavHover: (link: string | null) => void;
}

export default function Home({ heroVisible, isMobile, setPage, navHover, setNavHover }: HomeProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideCycle, setSlideCycle] = useState(0);
  const activeHero = HERO_SLIDES[activeSlide] ?? HERO_SLIDES[0];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
      setSlideCycle((cycle) => cycle + 1);
    }, SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [activeSlide, slideCycle]);

  const navLinkStyle = (link: string): React.CSSProperties => ({
    fontFamily: FONTS.display,
    fontStyle: "italic",
    fontWeight: 600,
    fontSize: "13px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "var(--color-cream)",
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "8px 0",
    opacity: navHover === link ? 1 : 0.85,
    transition: "opacity 0.3s ease",
    textShadow: "0 2px 12px rgba(0,0,0,0.4)",
  });

  return (
    <main style={{ background: "var(--color-parchment)", minHeight: "100vh", fontFamily: FONTS.body, color: "var(--color-ink)" }}>
      <style>{`@keyframes hero-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
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
        {HERO_SLIDES.map((image, index) => (
          <img
            key={image.id}
            src={HIGH_RES_HERO_SOURCES[image.id] ?? image.src}
            alt={index === activeSlide ? `${CATEGORY_TITLES[image.cat as keyof typeof CATEGORY_TITLES]} photography` : ""}
            aria-hidden={index !== activeSlide}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: HERO_IMAGE_POSITIONS[image.id] ?? image.focus ?? "50% 50%",
              opacity: index === activeSlide ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          />
        ))}

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
            color: "var(--color-crimson)",
            textShadow: HERO_LABEL_SHADOWS[activeHero.id] ?? "0 2px 10px rgba(10,10,11,0.9)",
            zIndex: 6,
          }}
        >
          <span style={{ display: "block", fontFamily: FONTS.script, fontSize: isMobile ? "34px" : "62px", lineHeight: 1 }}>
            twenty years of
          </span>
          <span
            style={{
              display: "block",
              fontFamily: FONTS.display,
              fontStyle: "italic",
              fontWeight: 800,
              fontSize: isMobile ? "16px" : "32px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            {CATEGORY_TITLES[activeHero.cat as keyof typeof CATEGORY_TITLES]}
          </span>
        </div>

        <div
          aria-label="Featured photography slides"
          style={{
            position: "absolute",
            bottom: isMobile ? "28px" : "34px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 7,
          }}
        >
          {HERO_SLIDES.map((image, index) => (
            <button
              key={image.id}
              type="button"
              aria-label={`Show ${CATEGORY_TITLES[image.cat as keyof typeof CATEGORY_TITLES]}`}
              aria-current={index === activeSlide}
              onClick={() => {
                setActiveSlide(index);
                setSlideCycle((cycle) => cycle + 1);
              }}
              style={{
                position: "relative",
                width: index === activeSlide ? "24px" : "9px",
                height: "9px",
                borderRadius: "999px",
                border: "1px solid rgba(245,240,232,0.9)",
                background: "rgba(10,10,11,0.38)",
                cursor: "pointer",
                padding: 0,
                overflow: "hidden",
                transition: "width 0.25s ease, background 0.25s ease",
              }}
            >
              {index === activeSlide && (
                <span
                  key={`${image.id}-${slideCycle}`}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--color-cream)",
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                    animation: `hero-progress ${SLIDE_DURATION}ms linear forwards`,
                    willChange: "transform",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Signature wordmark — dimensional drop-shadow for pop */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: isMobile ? "6%" : "7%",
            right: isMobile ? "4%" : "4%",
            fontFamily: FONTS.script,
            color: "var(--color-crimson)",
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
