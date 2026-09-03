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
  const [portfolioCategory, setPortfolioCategory] = useState<Category | null>(null);
  const [monographScrollY, setMonographScrollY] = useState<number>(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure free natural scrolling across the monograph and subpages
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowY = "auto";
      document.documentElement.style.height = "auto";
      document.body.style.overflow = "";
      document.body.style.overflowY = "auto";
      document.body.style.height = "auto";
      document.body.style.overscrollBehavior = "auto";
    }
  }, []);

  const handleSetPage = useCallback((newPage: PageKey) => {
    setActivePage(newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  const handleViewPortfolio = useCallback((category: Category) => {
    if (typeof window !== "undefined") {
      setMonographScrollY(window.scrollY);
    }
    setPortfolioCategory(category);
    setActivePage("portfolio");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  const handleReturnToMonograph = useCallback(() => {
    setActivePage("home");
    setPortfolioCategory(null);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.scrollTo({ top: monographScrollY, behavior: "smooth" });
      }, 60);
    }
  }, [monographScrollY]);

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
        {/* HOME / MONOGRAPH PAGE */}
        {activePage === "home" && (
          <Home
            onBookSession={handleOpenBooking}
            onViewPortfolio={handleViewPortfolio}
            isMobile={isMobile}
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
            onBookSession={handleOpenBooking}
          />
        )}

        {/* PORTFOLIO DRILL-IN PAGE */}
        {activePage === "portfolio" && (
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
