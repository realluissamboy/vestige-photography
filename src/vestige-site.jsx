import React, { useState, useEffect } from "react";
import { COLORS } from "./theme/colors";
import { FONTS } from "./theme/fonts";
import { useIsMobile } from "./hooks/useIsMobile";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";

export default function VestigeSite() {
  const [page, setPage] = useState("home");
  const [heroVisible, setHeroVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [navHover, setNavHover] = useState(null);
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

  const navStyle = (link) => ({
    fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
    fontSize: "11px",
    letterSpacing: "3.5px",
    textTransform: "uppercase",
    color: COLORS.cream,
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "4px 0",
    opacity: navHover === link ? 1 : 0.85,
    transition: "opacity 0.3s ease",
  });

  const navStyleDark = (link, isActive) => ({
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

  // HOME PAGE
  if (page === "home") {
    return <Home heroVisible={heroVisible} isMobile={isMobile} setPage={setPage} navHover={navHover} setNavHover={setNavHover} />;
  }

  // ABOUT PAGE
  if (page === "about") {
    return (
      <About
        aboutVisible={aboutVisible}
        setPage={setPage}
        isMobile={isMobile}
        navStyleDark={navStyleDark}
        setNavHover={setNavHover}
      />
    );
  }

  // PORTFOLIO PAGE
  return (
    <Portfolio
      setPage={setPage}
      isMobile={isMobile}
      navStyleDark={navStyleDark}
      setNavHover={setNavHover}
    />
  );
}
