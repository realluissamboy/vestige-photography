import React, { useState, useEffect, useCallback, Suspense, type CSSProperties } from "react";
import { COLORS } from "./theme/colors";
import { FONTS } from "./theme/fonts";
import { useIsMobile } from "./hooks/useIsMobile";
import { type PageKey } from "./data/navigation";

const Home = React.lazy(() => import("./pages/Home"));
const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const About = React.lazy(() => import("./pages/About"));

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>("home");
  const [mounted, setMounted] = useState<boolean>(false);
  const [navHover, setNavHover] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    setMounted(true);
  }, []);

  const handleSetPage = useCallback((newPage: PageKey) => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    setActivePage(newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

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
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--color-parchment)" }} />}>
        {/* HOME PAGE */}
        {activePage === "home" && (
          <Home
            heroVisible={true}
            isMobile={isMobile}
            setPage={handleSetPage}
            navHover={navHover}
            setNavHover={setNavHover}
          />
        )}

        {/* ABOUT PAGE */}
        {activePage === "about" && (
          <About
            aboutVisible={true}
            setPage={handleSetPage}
            isMobile={isMobile}
            navStyleDark={navStyleDark}
            setNavHover={setNavHover}
          />
        )}

        {/* PORTFOLIO PAGE */}
        {activePage === "portfolio" && (
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
