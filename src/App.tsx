import React, { useState, useEffect, useCallback, Suspense, type CSSProperties } from "react";
import { COLORS } from "./theme/colors";
import { FONTS } from "./theme/fonts";
import { useIsMobile } from "./hooks/useIsMobile";
import { type PageKey } from "./data/navigation";
import type { Category } from "./data/gallery";
import BookingModal from "./components/BookingModal";

const Home = React.lazy(() => import("./pages/Home"));
const Portfolio = React.lazy(() => import("./pages/Portfolio"));

export default function App() {
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

  // Single-page navigation: scrolls directly to the section with no separate subpages
  const handleSetPage = useCallback((newPage: PageKey) => {
    if (portfolioSlideOpen) {
      setPortfolioSlideOpen(false);
      setTimeout(() => {
        setIsPortfolioActive(false);
        setPortfolioCategory(null);
      }, 460);
    }
    if (typeof window !== "undefined") {
      if (newPage === "about") {
        setTimeout(() => {
          const el = document.getElementById("about-susana");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 120);
      } else if (newPage === "portfolio") {
        setTimeout(() => {
          const el = document.getElementById("category-01");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [portfolioSlideOpen]);

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

  const handleOpenBooking = useCallback((category?: unknown) => {
    setBookingInitialCategory(typeof category === "string" ? category : undefined);
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
        {/* HOMEPAGE MONOGRAPH — The sole page for the entire site */}
        <Home
          onBookSession={handleOpenBooking}
          onViewPortfolio={handleViewPortfolio}
          isMobile={isMobile}
        />

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
