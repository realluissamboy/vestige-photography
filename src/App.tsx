import React, { useState, useEffect, useCallback, Suspense, type CSSProperties } from "react";
import { COLORS } from "./theme/colors";
import { FONTS } from "./theme/fonts";
import { useIsMobile } from "./hooks/useIsMobile";
import { type PageKey } from "./data/navigation";
import type { Category } from "./data/gallery";
import BookingModal from "./components/BookingModal";

const Home = React.lazy(() => import("./pages/Home"));
const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const About = React.lazy(() => import("./pages/About"));

export default function App() {
  const [activePage, setActivePage] = useState<PageKey>("home");
  const [mounted, setMounted] = useState<boolean>(false);
  const [navHover, setNavHover] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingInitialCategory, setBookingInitialCategory] = useState<string | undefined>(undefined);
  
  // Smooth slide-over portfolio state
  const [isPortfolioActive, setIsPortfolioActive] = useState<boolean>(false);
  const [portfolioSlideOpen, setPortfolioSlideOpen] = useState<boolean>(false);
  const [portfolioCategory, setPortfolioCategory] = useState<Category | null>(null);
  
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Natural scroll handling
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (portfolioSlideOpen) {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "";
        document.documentElement.style.overflowY = "auto";
        document.documentElement.style.height = "auto";
        document.body.style.overflow = "";
        document.body.style.overflowY = "auto";
        document.body.style.height = "auto";
        document.body.style.overscrollBehavior = "auto";
      }
    }
  }, [portfolioSlideOpen]);

  const handleSetPage = useCallback((newPage: PageKey) => {
    setActivePage(newPage);
    if (newPage !== "portfolio") {
      setPortfolioSlideOpen(false);
      setIsPortfolioActive(false);
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  // Smooth slide-in from right taking over the viewport
  const handleViewPortfolio = useCallback((category: Category) => {
    setPortfolioCategory(category);
    setIsPortfolioActive(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPortfolioSlideOpen(true);
      });
    });
  }, []);

  // Smooth slide-out back to the homepage
  const handleReturnToMonograph = useCallback(() => {
    setPortfolioSlideOpen(false);
    setTimeout(() => {
      setIsPortfolioActive(false);
      setPortfolioCategory(null);
    }, 460);
  }, []);

  const handleOpenBooking = useCallback((category?: string) => {
    setBookingInitialCategory(category);
    setIsBookingOpen(true);
  }, []);

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false);
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
        background: "var(--color-parchment, #EFE9D9)",
        minHeight: "100dvh",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      <Suspense fallback={<div style={{ minHeight: "100dvh", background: "var(--color-parchment, #EFE9D9)" }} />}>
        {/* HOMEPAGE MONOGRAPH (Stays mounted during portfolio slide-over) */}
        {activePage === "home" && (
          <Home
            onBookSession={handleOpenBooking}
            onViewPortfolio={handleViewPortfolio}
            isMobile={isMobile}
          />
        )}

        {/* STANDALONE ABOUT PAGE */}
        {activePage === "about" && (
          <About
            aboutVisible={true}
            setPage={handleSetPage}
            isMobile={isMobile}
            navStyleDark={navStyleDark}
            setNavHover={setNavHover}
            onBookSession={handleOpenBooking}
          />
        )}

        {/* STANDALONE PORTFOLIO (Fallback when navigated directly) */}
        {activePage === "portfolio" && !isPortfolioActive && (
          <Portfolio
            setPage={handleSetPage}
            isMobile={isMobile}
            navStyleDark={navStyleDark}
            setNavHover={setNavHover}
            onBookSession={handleOpenBooking}
            initialCategory={portfolioCategory}
            onReturnToMonograph={() => handleSetPage("home")}
          />
        )}

        {/* SMOOTH SLIDE-IN PORTFOLIO VIEWPORT TAKEOVER */}
        <div
          className="portfolio-slide-over-takeover"
          aria-hidden={!isPortfolioActive}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100dvh",
            background: "var(--color-parchment, #EFE9D9)",
            zIndex: 1000,
            overflow: "hidden",
            transform: portfolioSlideOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: portfolioSlideOpen ? "-20px 0 60px rgba(0, 0, 0, 0.5)" : "none",
            pointerEvents: portfolioSlideOpen ? "auto" : "none",
            visibility: isPortfolioActive ? "visible" : "hidden",
            willChange: "transform",
          }}
        >
          {isPortfolioActive && (
            <Portfolio
              setPage={handleSetPage}
              isMobile={isMobile}
              navStyleDark={navStyleDark}
              setNavHover={setNavHover}
              onBookSession={handleOpenBooking}
              initialCategory={portfolioCategory}
              onReturnToMonograph={handleReturnToMonograph}
            />
          )}
        </div>
      </Suspense>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialCategory={bookingInitialCategory}
      />
    </div>
  );
}
