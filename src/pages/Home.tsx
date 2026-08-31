import React, { useEffect, useState, useCallback } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { VESTIGE_TEXT_SHADOW, VESTIGE_WORDMARK_SHADOW } from "../theme/effects";
import { PAGE_LINKS, type PageKey } from "../data/navigation";
import MobileMenu from "../components/MobileMenu";
import { CATEGORY_TITLES, GALLERY_IMAGES, PORTFOLIO_CATEGORIES, type GalleryImage } from "../data/gallery";

const HERO_SLIDES: GalleryImage[] = PORTFOLIO_CATEGORIES
  .map((category) => GALLERY_IMAGES.find((image) => image.cat === category))
  .filter((image): image is GalleryImage => image !== undefined);

const HIGH_RES_HERO_SOURCES: Record<number, string> = {
  34: "/hero-slides/modern-burlesque.webp",
  36: "/hero-slides/modern-tiki.webp",
};

const HERO_IMAGE_POSITIONS: Record<number, string> = {
  1: "50% 20%",
  6: "50% 72%",
  10: "50% 30%",
  12: "65% 40%",
  18: "35% 5%",
  25: "50% 38%",
  34: "50% 28%",
  36: "50% 72%",
  50: "50% 65%",
};

const SLIDE_DURATION = 8300;
const COMPACT_HERO_QUERY = "(max-width: 900px), (orientation: landscape) and (max-height: 500px)";

function useCompactHero(): boolean {
  const [compact, setCompact] = useState(
    typeof window !== "undefined" ? window.matchMedia(COMPACT_HERO_QUERY).matches : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(COMPACT_HERO_QUERY);
    const onChange = (event: MediaQueryListEvent) => setCompact(event.matches);
    setCompact(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return compact;
}

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
  const [isPaused, setIsPaused] = useState(false);
  const compactHero = useCompactHero() || isMobile;
  const activeHero: GalleryImage = HERO_SLIDES[activeSlide] ?? HERO_SLIDES[0] ?? GALLERY_IMAGES[0]!;

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(index);
    setSlideCycle((cycle) => cycle + 1);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((activeSlide + 1) % (HERO_SLIDES.length || 1));
  }, [activeSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    const len = HERO_SLIDES.length || 1;
    goToSlide((activeSlide - 1 + len) % len);
  }, [activeSlide, goToSlide]);

  // Auto-advance timer
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % (HERO_SLIDES.length || 1));
      setSlideCycle((cycle) => cycle + 1);
    }, SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [activeSlide, slideCycle]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const navLinkStyle = (link: string): React.CSSProperties => ({
    fontFamily: FONTS.script,
    fontSize: compactHero ? "28px" : "52px",
    color: "var(--color-crimson)",
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "4px 0",
    opacity: navHover === link ? 1 : 0.9,
    transition: "opacity 0.3s ease",
    textShadow: VESTIGE_TEXT_SHADOW,
    lineHeight: 1,
  });

  const categoryTitle =
    CATEGORY_TITLES[activeHero.cat as keyof typeof CATEGORY_TITLES] ?? activeHero.cat;

  return (
    <main
      style={{
        background: "var(--color-parchment)",
        minHeight: "100vh",
        fontFamily: FONTS.body,
        color: "var(--color-ink)",
      }}
    >
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
            alt={index === activeSlide ? `${CATEGORY_TITLES[image.cat as keyof typeof CATEGORY_TITLES] ?? image.cat} photography` : ""}
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
            height: compactHero ? "230px" : "200px",
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(10,10,11,0.45) 0%, rgba(10,10,11,0.15) 60%, rgba(10,10,11,0) 100%)",
            zIndex: 5,
          }}
        />

        {/* Nav — no wordmark here; the big script below is the identity */}
        {compactHero ? (
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

        {/* Slide Indicators / Navigation Dots */}
        <div
          aria-label="Featured photography slides"
          style={{
            position: "absolute",
            bottom: compactHero ? "28px" : "34px",
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
              aria-label={`Show ${CATEGORY_TITLES[image.cat as keyof typeof CATEGORY_TITLES] ?? image.cat}`}
              aria-current={index === activeSlide}
              onClick={() => goToSlide(index)}
              style={{
                position: "relative",
                width: index === activeSlide ? "28px" : "10px",
                height: "10px",
                borderRadius: "999px",
                border: "1.5px solid var(--color-crimson)",
                background: "rgba(10,10,11,0.6)",
                boxShadow: "0 1px 2px rgba(255, 255, 255, 0.35), 0 2px 4px rgba(0, 0, 0, 0.35)",
                cursor: "pointer",
                padding: 0,
                overflow: "hidden",
                transition: "width 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              {index === activeSlide && (
                <span
                  key={`${image.id}-${slideCycle}`}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "#FFFFFF",
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

        {/* Responsive signature and category lockup */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: compactHero ? "24px" : "auto",
            bottom: compactHero ? "auto" : "56px",
            left: compactHero ? "16px" : "auto",
            right: compactHero ? "auto" : "4%",
            display: "flex",
            flexDirection: "column",
            alignItems: compactHero ? "flex-start" : "flex-end",
            color: "var(--color-crimson)",
            maxWidth: compactHero ? "calc(100vw - 32px)" : "min(92vw, 960px)",
            pointerEvents: "none",
            zIndex: 6,
          }}
        >
          {/* Wordmark with full line-height to give the cursive descenders breathing room */}
          <div
            style={{
              fontFamily: FONTS.script,
              fontSize: compactHero ? "clamp(72px, 13vw, 96px)" : "clamp(160px, 17vw, 250px)",
              lineHeight: 1,
              textShadow: VESTIGE_WORDMARK_SHADOW,
              userSelect: "none",
            }}
          >
            Vestige
          </div>

          {/* Subtitle with ample clearance below the 'g' descender loop, in matching fluid lowercase script */}
          <div
            key={`${activeHero.cat}-${slideCycle}`}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: compactHero ? "flex-start" : "flex-end",
              alignItems: "baseline",
              columnGap: compactHero ? "8px" : "12px",
              rowGap: "2px",
              marginTop: compactHero ? "32px" : "68px",
              textAlign: compactHero ? "left" : "right",
              textShadow: VESTIGE_TEXT_SHADOW,
              animation: "category-text-fade 0.45s ease forwards",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                fontFamily: FONTS.script,
                fontSize: compactHero ? "28px" : "52px",
                lineHeight: 1,
              }}
            >
              Twenty years of
            </span>
            <span
              style={{
                whiteSpace: "nowrap",
                fontFamily: FONTS.script,
                fontSize: compactHero ? "28px" : "52px",
                lineHeight: 1,
              }}
            >
              {categoryTitle.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
