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

const HERO_DESKTOP_POSITIONS: Record<number, string> = {
  1: "50% 35%",
  5: "50% 50%",
  6: "50% 72%",
  9: "50% 58%",
  10: "50% 30%",
  12: "65% 40%",
  14: "58% 70%",
  18: "50% 32%",
  19: "50% 30%",
  21: "50% 32%",
  25: "50% 38%",
  26: "50% 50%",
  34: "50% 28%",
  36: "75% 55%",
  43: "50% 50%",
  50: "50% 65%",
};

const HERO_PORTRAIT_POSITIONS: Record<number, string> = {
  1: "50% 60%",
  9: "50% 65%",   // Tiki-Rockabilly: full chair and floor base
  18: "50% 50%",  // Outlaw2: centered full pose, tattoos & hat
  19: "50% 55%",  // Vintage-Glamour: model and chair
  21: "50% 50%",  // Modern Pin-Up: centered full studio pose
  25: "50% 60%",  // Classic Cars: vehicle and model
  34: "50% 70%",  // Modern Burlesque: full pose
  36: "65% 65%",  // Modern Tiki
};

const HERO_LANDSCAPE_POSITIONS: Record<number, string> = {
  1: "50% 20%",
  9: "50% 28%",
  18: "50% 22%",
  19: "50% 42%",  // Gold jumpsuit: generous headroom showing chandelier fronds and painting above head
  21: "50% 38%",  // Pink victory rolls: natural headroom showing ornate mirror crest and satin drapes
  25: "50% 20%",  // Classic cars / fedora: natural headroom showing vintage car roof and glass
  34: "50% 20%",  // Burlesque: natural headroom showing crystal chandelier and gilded mirror
  36: "65% 56%",  // Modern tiki: natural headroom showing patterned canopy and ambient rafter lighting
};

const SLIDE_DURATION = 7000;

interface ViewportLayout {
  isShortLandscape: boolean;
  isMobilePortrait: boolean;
  compactHero: boolean;
}

function useHeroLayout(): ViewportLayout {
  const [layout, setLayout] = useState<ViewportLayout>(() => {
    if (typeof window === "undefined") {
      return { isShortLandscape: false, isMobilePortrait: false, compactHero: false };
    }
    const isShortLandscape = window.matchMedia("(orientation: landscape) and (max-height: 550px)").matches;
    const isMobilePortrait = window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches;
    const compactHero = window.matchMedia("(max-width: 900px), (orientation: landscape) and (max-height: 550px)").matches;
    return { isShortLandscape, isMobilePortrait, compactHero };
  });

  useEffect(() => {
    const update = () => {
      const isShortLandscape = window.matchMedia("(orientation: landscape) and (max-height: 550px)").matches;
      const isMobilePortrait = window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches;
      const compactHero = window.matchMedia("(max-width: 900px), (orientation: landscape) and (max-height: 550px)").matches;
      setLayout({ isShortLandscape, isMobilePortrait, compactHero });
    };

    const mediaShort = window.matchMedia("(orientation: landscape) and (max-height: 550px)");
    const mediaPort = window.matchMedia("(max-width: 768px) and (orientation: portrait)");
    const mediaCompact = window.matchMedia("(max-width: 900px), (orientation: landscape) and (max-height: 550px)");

    mediaShort.addEventListener("change", update);
    mediaPort.addEventListener("change", update);
    mediaCompact.addEventListener("change", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      mediaShort.removeEventListener("change", update);
      mediaPort.removeEventListener("change", update);
      mediaCompact.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return layout;
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
  const { isShortLandscape, isMobilePortrait, compactHero } = useHeroLayout();
  const isCompact = compactHero || isMobile;
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
    fontSize: isCompact ? "28px" : "48px",
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
          const pos = isShortLandscape
            ? (HERO_LANDSCAPE_POSITIONS[image.id] ?? "50% 22%")
            : isMobilePortrait
            ? (HERO_PORTRAIT_POSITIONS[image.id] ?? HERO_DESKTOP_POSITIONS[image.id] ?? "50% 50%")
            : (HERO_DESKTOP_POSITIONS[image.id] ?? image.focus ?? "50% 50%");

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
            height: isShortLandscape
              ? "max(90px, calc(env(safe-area-inset-top, 0px) + 70px))"
              : isCompact
              ? "max(240px, calc(env(safe-area-inset-top, 0px) + 200px))"
              : "260px",
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
            height: isShortLandscape
              ? "max(50px, calc(env(safe-area-inset-bottom, 0px) + 40px))"
              : isCompact
              ? "max(140px, calc(env(safe-area-inset-bottom, 0px) + 120px))"
              : "180px",
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
            top: isShortLandscape
              ? "max(10px, env(safe-area-inset-top, 10px))"
              : isCompact
              ? "max(20px, env(safe-area-inset-top, 20px))"
              : "36px",
            left: isShortLandscape
              ? "max(16px, env(safe-area-inset-left, 16px))"
              : isCompact
              ? "max(16px, env(safe-area-inset-left, 16px))"
              : "48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: isShortLandscape ? "calc(100vw - 80px)" : isCompact ? "calc(100vw - 32px)" : "min(92vw, 960px)",
            pointerEvents: "none",
            zIndex: 6,
          }}
        >
          {/* Wordmark in #FDFEFD white with rich crimson depth shadow */}
          <div
            style={{
              fontFamily: FONTS.script,
              fontSize: isShortLandscape
                ? "clamp(36px, 9.5vh, 48px)"
                : isMobilePortrait
                ? "clamp(64px, 13vw, 88px)"
                : "clamp(120px, 13vw, 200px)",
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
              columnGap: isShortLandscape ? "6px" : isCompact ? "10px" : "16px",
              rowGap: "2px",
              marginTop: isShortLandscape ? "2px" : isCompact ? "12px" : "20px",
              color: "#FDFEFD",
              textShadow:
                "0 2px 4px rgba(0, 0, 0, 0.75), 0 3px 12px rgba(205, 38, 68, 0.85), 0 0 20px rgba(205, 38, 68, 0.5)",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                fontFamily: FONTS.script,
                fontSize: isShortLandscape
                  ? "clamp(16px, 4.2vh, 22px)"
                  : isMobilePortrait
                  ? "clamp(26px, 6.2vw, 34px)"
                  : "clamp(42px, 4.2vw, 64px)",
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
                fontSize: isShortLandscape
                  ? "clamp(16px, 4.2vh, 22px)"
                  : isMobilePortrait
                  ? "clamp(26px, 6.2vw, 34px)"
                  : "clamp(42px, 4.2vw, 64px)",
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
        {isCompact ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              padding: isShortLandscape
                ? "max(10px, env(safe-area-inset-top, 10px)) max(16px, env(safe-area-inset-right, 16px)) 0"
                : "max(20px, env(safe-area-inset-top, 20px)) max(16px, env(safe-area-inset-right, 16px)) 0",
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

        {/* Navigation & Indicators — Dynamic Morphing Category Bar on Desktop, Laptop & Landscape vs Progress Pills on Mobile Portrait */}
        {!isMobilePortrait ? (
          <div
            style={{
              position: "absolute",
              bottom: isShortLandscape
                ? "max(12px, calc(env(safe-area-inset-bottom, 0px) + 8px))"
                : "36px",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 7,
              pointerEvents: "none",
            }}
          >
            {/* Unified Floating Category Dock */}
            <div
              aria-label="Photography categories"
              style={{
                display: "flex",
                alignItems: "center",
                gap: isShortLandscape ? "8px" : "12px",
                background: "rgba(10, 10, 12, 0.65)",
                backdropFilter: "blur(14px)",
                padding: isShortLandscape ? "6px 10px" : "8px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
                pointerEvents: "auto",
                maxWidth: "min(96vw, 920px)",
              }}
            >
              {HERO_SLIDES.map((image, index) => {
                const isActive = index === activeSlide;
                const title = CATEGORY_TITLES[image.cat as keyof typeof CATEGORY_TITLES] ?? image.cat;
                const num = String(index + 1).padStart(2, "0");

                if (isActive) {
                  /* Active Expanded Pill */
                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setPage("portfolio")}
                      aria-label={`Current slide: ${title}. Click to view portfolio`}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        gap: isShortLandscape ? "6px" : "10px",
                        background: "rgba(205, 38, 68, 0.25)",
                        border: "1.5px solid #CD2644",
                        borderRadius: "999px",
                        padding: isShortLandscape ? "6px 14px" : "8px 18px",
                        cursor: "pointer",
                        boxShadow: "0 0 16px rgba(205, 38, 68, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      {/* Number badge */}
                      <span
                        style={{
                          fontFamily: FONTS.display,
                          fontStyle: "italic",
                          fontSize: isShortLandscape ? "11px" : "12px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                          color: "#FDFEFD",
                          opacity: 0.85,
                        }}
                      >
                        {num}
                      </span>

                      {/* Category Title */}
                      <span
                        style={{
                          fontFamily: FONTS.script,
                          fontSize: isShortLandscape ? "19px" : "23px",
                          lineHeight: 1,
                          color: "#FDFEFD",
                          textShadow: "0 0 12px rgba(205, 38, 68, 0.9)",
                        }}
                      >
                        {title}
                      </span>

                      {/* Active Progress Bar Along Bottom Edge */}
                      <span
                        key={`${image.id}-${slideCycle}`}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "2.5px",
                          background: "linear-gradient(to right, #CD2644, #FDFEFD)",
                          transform: "scaleX(0)",
                          transformOrigin: "left center",
                          animation: `hero-progress ${SLIDE_DURATION}ms linear forwards`,
                        }}
                      />
                    </button>
                  );
                }

                /* Inactive Compact Thumbnail Tile */
                const thumbSize = isShortLandscape ? "34px" : "40px";

                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Switch to ${title}`}
                    title={title}
                    style={{
                      position: "relative",
                      width: thumbSize,
                      height: thumbSize,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "1.5px solid rgba(255, 255, 255, 0.28)",
                      background: "rgba(10, 10, 12, 0.8)",
                      cursor: "pointer",
                      padding: 0,
                      flexShrink: 0,
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
                      transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.15)";
                      e.currentTarget.style.borderColor = "rgba(205, 38, 68, 0.8)";
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(205, 38, 68, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.28)";
                      e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.4)";
                    }}
                  >
                    <img
                      src={image.src}
                      alt={title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: HERO_LANDSCAPE_POSITIONS[image.id] ?? "50% 20%",
                        filter: "brightness(0.85)",
                        transition: "filter 0.2s ease",
                      }}
                    />
                  </button>
                );
              })}

              {/* Vertical Divider */}
              <div
                style={{
                  width: "1px",
                  height: isShortLandscape ? "20px" : "24px",
                  background: "rgba(255, 255, 255, 0.2)",
                  margin: "0 2px",
                  flexShrink: 0,
                }}
              />

              {/* Call-to-Action: Book a Session */}
              <a
                href="https://ig.me/m/susanavestige"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "linear-gradient(135deg, #CD2644 0%, #A01932 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  borderRadius: "999px",
                  padding: isShortLandscape ? "6px 14px" : "8px 18px",
                  color: "#FFFFFF",
                  fontFamily: FONTS.display,
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: isShortLandscape ? "11px" : "13px",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  cursor: "pointer",
                  boxShadow: "0 2px 10px rgba(205, 38, 68, 0.5)",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 0 16px rgba(205, 38, 68, 0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(205, 38, 68, 0.5)";
                }}
              >
                <span>Book a Session</span>
                <span style={{ fontSize: isShortLandscape ? "13px" : "15px", fontStyle: "normal" }}>→</span>
              </a>
            </div>
          </div>
        ) : (
          /* Slide Indicators / Navigation Dots — Centered in Lower Middle for Mobile Portrait */
          <div
            aria-label="Featured photography slides"
            style={{
              position: "absolute",
              bottom: "max(24px, calc(env(safe-area-inset-bottom, 0px) + 20px))",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              zIndex: 7,
            }}
          >
            {HERO_SLIDES.map((image, index) => {
              const isActive = index === activeSlide;

              return (
                <button
                  key={image.id}
                  type="button"
                  aria-label={`Show ${CATEGORY_TITLES[image.cat as keyof typeof CATEGORY_TITLES] ?? image.cat}`}
                  aria-current={isActive}
                  onClick={() => goToSlide(index)}
                  style={{
                    position: "relative",
                    width: isActive ? "44px" : "12px",
                    height: "12px",
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
        )}
      </div>
    </main>
  );
}
