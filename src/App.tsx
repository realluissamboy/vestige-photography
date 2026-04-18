import React, { useState, useEffect, Suspense, type CSSProperties } from "react";
import { COLORS } from "./theme/colors";
import { FONTS } from "./theme/fonts";
import { useIsMobile } from "./hooks/useIsMobile";
import { type PageKey } from "./data/navigation";

const Home = React.lazy(() => import("./pages/Home"));
const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const About = React.lazy(() => import("./pages/About"));

export default function App() {
  const [page, setPage] = useState<PageKey>("home");
  const [heroVisible, setHeroVisible] = useState<boolean>(false);
  const [aboutVisible, setAboutVisible] = useState<boolean>(false);
  const [navHover, setNavHover] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (page === "about") {
      const t = setTimeout(() => setAboutVisible(true), 200);
      return () => clearTimeout(t);
    }
    setAboutVisible(false);
  }, [page]);

  const navStyleDark = (link: string, isActive: boolean): CSSProperties => ({
    fontFamily: FONTS.display,
    fontStyle: "italic",
    fontWeight: 600,
    fontSize: "13px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: isActive ? COLORS.crimson : COLORS.ink,
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "4px 0",
    opacity: isActive ? 1 : navHover === link ? 1 : 0.7,
    transition: "opacity 0.3s ease, color 0.3s ease",
  });

  return (
    <Suspense fallback={null}>
      {/* HOME PAGE */}
      {page === "home" && (
        <Home
          heroVisible={heroVisible}
          isMobile={isMobile}
          setPage={setPage}
          navHover={navHover}
          setNavHover={setNavHover}
        />
      )}

      {/* ABOUT PAGE */}
      {page === "about" && (
        <About
          aboutVisible={aboutVisible}
          setPage={setPage}
          isMobile={isMobile}
          navStyleDark={navStyleDark}
          setNavHover={setNavHover}
        />
      )}

      {/* PORTFOLIO PAGE */}
      {page === "portfolio" && (
        <Portfolio
          setPage={setPage}
          isMobile={isMobile}
          navStyleDark={navStyleDark}
          setNavHover={setNavHover}
        />
      )}
    </Suspense>
  );
}
