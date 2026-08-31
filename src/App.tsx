import React, { useState, useEffect, useCallback, Suspense, type CSSProperties } from "react";
import { COLORS } from "./theme/colors";
import { FONTS } from "./theme/fonts";
import { useIsMobile } from "./hooks/useIsMobile";
import { type PageKey } from "./data/navigation";

const Home = React.lazy(() => import("./pages/Home"));
const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const About = React.lazy(() => import("./pages/About"));

const TRANSITION_DURATION = 280; // ms

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>("home");
  const [displayedPage, setDisplayedPage] = useState<PageKey>("home");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [navHover, setNavHover] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const handleSetPage = useCallback((newPage: PageKey) => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    if (newPage === activePage) {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    setIsTransitioning(true);
    setActivePage(newPage);

    setTimeout(() => {
      setDisplayedPage(newPage);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsTransitioning(false);
        }, 30);
      });
    }, TRANSITION_DURATION);
  }, [activePage]);

  const navStyleDark = (link: string, isActive: boolean): CSSProperties => ({
    fontFamily: FONTS.display,
    fontStyle: "italic",
    fontWeight: 700,
    fontSize: "18px",
    letterSpacing: "4px",
    textTransform: "uppercase",
    color: isActive ? COLORS.crimson : COLORS.ink,
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "4px 0",
    opacity: isActive ? 1 : navHover === link ? 1 : 0.75,
    transition: "opacity 0.3s ease, color 0.3s ease",
  });

  return (
    <div
      style={{
        background: "var(--color-parchment)",
        minHeight: "100vh",
        opacity: mounted && !isTransitioning ? 1 : 0,
        transform: mounted && !isTransitioning ? "translateY(0) scale(1)" : "translateY(4px) scale(0.996)",
        transition: `opacity ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--color-parchment)" }} />}>
        {/* HOME PAGE */}
        {displayedPage === "home" && (
          <Home
            heroVisible={true}
            isMobile={isMobile}
            setPage={handleSetPage}
            navHover={navHover}
            setNavHover={setNavHover}
          />
        )}

        {/* ABOUT PAGE */}
        {displayedPage === "about" && (
          <About
            aboutVisible={true}
            setPage={handleSetPage}
            isMobile={isMobile}
            navStyleDark={navStyleDark}
            setNavHover={setNavHover}
          />
        )}

        {/* PORTFOLIO PAGE */}
        {displayedPage === "portfolio" && (
          <Portfolio
            setPage={handleSetPage}
            isMobile={isMobile}
            navStyleDark={navStyleDark}
            setNavHover={setNavHover}
          />
        )}
      </Suspense>
    </div>
  );
}
