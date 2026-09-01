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
  1: "50% 35%",
  5: "50% 50%",
  6: "50% 72%",
  9: "50% 58%",
  10: "50% 30%",
  12: "65% 40%",
  14: "58% 70%",
  18: "50% 32%",
  19: "50% 50%",
  21: "50% 35%",
  25: "50% 38%",
  26: "50% 50%",
  34: "50% 28%",
  36: "78% 72%",
  43: "50% 50%",
  50: "50% 65%",
};

const HERO_MOBILE_POSITIONS: Record<number, string> = {
  1: "50% 60%",
  9: "50% 65%",   // Tiki-Rockabilly: full chair and floor base
  18: "50% 50%",  // Outlaw2: centered full pose, tattoos & hat
  19: "50% 65%",  // Vintage-Glamour: full velvet couch and pose
  21: "50% 50%",  // Modern Pin-Up (R2C0A8596): centered full studio pose
  25: "50% 62%",  // Classic Cars: full vehicle tires and ground
  34: "50% 82%",  // Modern Burlesque: full green heels, feet, feather boa & floor
  36: "65% 65%",  // Modern Tiki
};

const SLIDE_DURATION = 7000;
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

  // Touch swipe navigation for mobile
  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    // Trigger horizontal swipe navigation if swipe is predominantly horizontal and >= 40px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const navLinkStyle = (link: string): React.CSSProperties => ({
    fontFamily: FONTS.script,
    fontSize: compactHero ? "28px" : "48px",
    color: "#FFFFFF",
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "4px 0",
    opacity: navHover === link ? 1 : 0.88,
    transform: navHover === link ? "translateY(-2px)" : "translateY(0)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
    textShadow: "0 2px 6px rgba(0, 0, 0, 0.85), 0 3px 14px rgba(200, 20, 44, 0.75), 0 0 24px rgba(200, 20, 44, 0.4)",
    lineHeight: 1,
  });

  const categoryTitle =
    CATEGORY_TITLES[activeHero.cat as keyof typeof CATEGORY_TITLES] ?? activeHero.cat;

  return (
    <main
      style={{
        background: "var(--color-parchment)",
        height: "100%",
        minHeight: "100dvh",
        maxHeight: "100dvh",
        width: "100%",
        overflow: "hidden",
        overscrollBehavior: "none",
        fontFamily: FONTS.body,
        color: "var(--color-ink)",
        position: "relative",
      }}
    >
      <h1 style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}>
        Vestige Photography
      </h1>

      {/* Full-bleed hero with floating nav + script wordmark */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "100dvh",
          maxHeight: "100dvh",
          overflow: "hidden",
          opacity: heroVisible ? 1 : 0,
          transition: "opacity 1.6s ease",
          touchAction: "pan-x",
        }}
      >
        {HERO_SLIDES.map((image, index) => {
          const isCurrent = index === activeSlide;
          const pos = (compactHero && HERO_MOBILE_POSITIONS[image.id])
            ? HERO_MOBILE_POSITIONS[image.id]!
            : (HERO_IMAGE_POSITIONS[image.id] ?? image.focus ?? "50% 50%");

          return (
            <img
              key={image.id}
              src={HIGH_RES_HERO_SOURCES[image.id] ?? image.src}
              alt={isCurrent ? `${CATEGORY_TITLES[image.cat as keyof typeof CATEGORY_TITLES] ?? image.cat} photography` : ""}
              aria-hidden={!isCurrent}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: pos,
                opacity: isCurrent ? 1 : 0,
                transition: "opacity 0.45s ease-in-out",
              }}
            />
          );
        })}

        {/* Top scrim for readability */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: compactHero ? "max(240px, calc(env(safe-area-inset-top, 0px) + 200px))" : "260px",
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(10,10,11,0.5) 0%, rgba(10,10,11,0.2) 60%, rgba(10,10,11,0) 100%)",
            zIndex: 4,
          }}
        />

        {/* Bottom scrim for controls and nav legibility */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: compactHero ? "max(140px, calc(env(safe-area-inset-bottom, 0px) + 120px))" : "180px",
            pointerEvents: "none",
            background:
              "linear-gradient(to top, rgba(10,10,11,0.4) 0%, rgba(10,10,11,0.08) 60%, rgba(10,10,11,0) 100%)",
            zIndex: 4,
          }}
        />

        {/* Top-Left: "Vestige" Signature & Category Lockup */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: compactHero ? "max(20px, env(safe-area-inset-top, 20px))" : "36px",
            left: compactHero ? "max(16px, env(safe-area-inset-left, 16px))" : "48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: compactHero ? "calc(100vw - 32px)" : "min(92vw, 960px)",
            pointerEvents: "none",
            zIndex: 6,
          }}
        >
          {/* Wordmark in #FDFEFD white with rich crimson depth shadow */}
          <div
            style={{
              fontFamily: FONTS.script,
              fontSize: compactHero ? "clamp(72px, 13vw, 96px)" : "clamp(120px, 13vw, 200px)",
              lineHeight: 1,
              color: "#FDFEFD",
              textShadow:
                "0 2px 4px rgba(0, 0, 0, 0.75), 0 4px 16px rgba(205, 38, 68, 0.85), 0 0 24px rgba(205, 38, 68, 0.6), 0 0 40px rgba(205, 38, 68, 0.35)",
              userSelect: "none",
            }}
          >
            Vestige
          </div>

          {/* Subtitle in #FDFEFD white: "Twenty years of" is 100% persistent and static */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              columnGap: compactHero ? "10px" : "16px",
              rowGap: "2px",
              marginTop: compactHero ? "14px" : "20px",
              color: "#FDFEFD",
              textShadow:
                "0 2px 4px rgba(0, 0, 0, 0.75), 0 3px 12px rgba(205, 38, 68, 0.85), 0 0 20px rgba(205, 38, 68, 0.5)",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                fontFamily: FONTS.script,
                fontSize: compactHero ? "clamp(30px, 6.5vw, 38px)" : "clamp(42px, 4.2vw, 64px)",
                lineHeight: 1,
                fontWeight: 400,
              }}
            >
              Twenty years of
            </span>
            <span
              key={`${activeHero.cat}-${slideCycle}`}
              style={{
                whiteSpace: "nowrap",
                fontFamily: FONTS.script,
                fontSize: compactHero ? "clamp(30px, 6.5vw, 38px)" : "clamp(42px, 4.2vw, 64px)",
                lineHeight: 1,
                fontWeight: 400,
                animation: "category-text-fade 0.35s ease forwards",
              }}
            >
              {categoryTitle.toLowerCase()}
            </span>
          </div>
        </div>

        {/* Navigation — Mobile Hamburger at Top-Right, Desktop Navigation at Top-Right */}
        {compactHero ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: "max(20px, env(safe-area-inset-top, 20px)) max(16px, env(safe-area-inset-right, 16px)) 0",
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
              top: "36px",
              right: "48px",
              display: "flex",
              alignItems: "center",
              gap: "44px",
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

        {/* Slide Indicators / Navigation Dots — Centered in Lower Middle */}
        <div
          aria-label="Featured photography slides"
          style={{
            position: "absolute",
            bottom: compactHero ? "max(24px, calc(env(safe-area-inset-bottom, 0px) + 20px))" : "36px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: compactHero ? "10px" : "12px",
            zIndex: 7,
          }}
        >
          {HERO_SLIDES.map((image, index) => {
            const isActive = index === activeSlide;
            const pillHeight = compactHero ? "12px" : "13px";
            const activeWidth = compactHero ? "44px" : "52px";
            const inactiveWidth = compactHero ? "12px" : "13px";

            return (
              <button
                key={image.id}
                type="button"
                aria-label={`Show ${CATEGORY_TITLES[image.cat as keyof typeof CATEGORY_TITLES] ?? image.cat}`}
                aria-current={isActive}
                onClick={() => goToSlide(index)}
                style={{
                  position: "relative",
                  width: isActive ? activeWidth : inactiveWidth,
                  height: pillHeight,
                  borderRadius: "999px",
                  border: isActive ? "2px solid #CD2644" : "1.5px solid rgba(205, 38, 68, 0.75)",
                  background: isActive ? "rgba(10, 10, 12, 0.6)" : "rgba(205, 38, 68, 0.25)",
                  boxShadow: isActive
                    ? "0 0 12px rgba(205, 38, 68, 0.5), 0 2px 6px rgba(0, 0, 0, 0.6)"
                    : "0 2px 5px rgba(0, 0, 0, 0.5)",
                  cursor: "pointer",
                  padding: 0,
                  overflow: "hidden",
                  transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {isActive && (
                  <span
                    key={`${image.id}-${slideCycle}`}
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "#FDFEFD",
                      transform: "scaleX(0)",
                      transformOrigin: "left center",
                      animation: `hero-progress ${SLIDE_DURATION}ms linear forwards`,
                      willChange: "transform",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
