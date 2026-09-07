import React, { useState, useEffect, useCallback, useRef, Suspense, type CSSProperties } from "react";
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

  const galleryTrigger = useRef<HTMLElement | null>(null);
  const wasPortfolioActive = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingPage = useRef<PageKey | null>(null);
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const scrollToPage = (page: PageKey) => {
    const target = document.getElementById(page === "about" ? "about-susana" : page === "portfolio" ? "category-01" : "homepage-cover");
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    target?.scrollIntoView({ behavior });
    target?.focus({ preventScroll: true });
  };

  const handleReturnToMonograph = useCallback(() => {
    setPortfolioSlideOpen(false);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setIsPortfolioActive(false);
      setPortfolioCategory(null);
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 460);
  }, []);

  useEffect(() => {
    if (wasPortfolioActive.current && !isPortfolioActive) {
      galleryTrigger.current?.focus({ preventScroll: true });
    }
    wasPortfolioActive.current = isPortfolioActive;
    if (!isPortfolioActive && pendingPage.current) {
      const page = pendingPage.current;
      pendingPage.current = null;
      const frame = requestAnimationFrame(() => scrollToPage(page));
      return () => cancelAnimationFrame(frame);
    }
  }, [isPortfolioActive]);

  const handleSetPage = useCallback((page: PageKey) => {
    if (isPortfolioActive) {
      pendingPage.current = page;
      handleReturnToMonograph();
    } else scrollToPage(page);
  }, [isPortfolioActive, handleReturnToMonograph]);

  // Smooth slide-in from right taking over the viewport
  const handleViewPortfolio = useCallback((category: Category) => {
    galleryTrigger.current = document.activeElement as HTMLElement;
    setPortfolioCategory(category);
    setIsPortfolioActive(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPortfolioSlideOpen(true);
      });
    });
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
        <div inert={isPortfolioActive || isBookingOpen}>
        <Home
          onBookSession={handleOpenBooking}
          onViewPortfolio={handleViewPortfolio}
          isMobile={isMobile}
        />
        </div>
      </Suspense>

        {/* Keep the homepage mounted while the gallery chunk loads. */}
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
          <Suspense fallback={<p role="status" style={{ padding: "24px" }}>Loading collection…</p>}>
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
          </Suspense>
        </div>

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialCategory={bookingInitialCategory}
      />
    </div>
  );
}
