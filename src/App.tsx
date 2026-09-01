import React, { useState, useEffect, useCallback, Suspense, type CSSProperties } from "react";
import { COLORS } from "./theme/colors";
import { FONTS } from "./theme/fonts";
import { useIsMobile } from "./hooks/useIsMobile";
import { type PageKey } from "./data/navigation";
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
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (activePage === "home") {
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.height = "100%";
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
        document.body.style.overscrollBehavior = "none";
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
  }, [activePage]);

  const handleSetPage = useCallback((newPage: PageKey) => {
    setActivePage(newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
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

  const isHomePage = activePage === "home";

  return (
    <div
      style={{
        background: "var(--color-parchment)",
        height: isHomePage ? "100dvh" : undefined,
        maxHeight: isHomePage ? "100dvh" : undefined,
        minHeight: isHomePage ? undefined : "100dvh",
        overflow: isHomePage ? "hidden" : undefined,
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      <Suspense fallback={<div style={{ minHeight: "100dvh", background: "var(--color-parchment)" }} />}>
        {/* HOME PAGE */}
        {activePage === "home" && (
          <Home
            heroVisible={true}
            isMobile={isMobile}
            setPage={handleSetPage}
            navHover={navHover}
            setNavHover={setNavHover}
            onBookSession={handleOpenBooking}
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

        {/* PORTFOLIO PAGE */}
        {activePage === "portfolio" && (
          <Portfolio
            setPage={handleSetPage}
            isMobile={isMobile}
            navStyleDark={navStyleDark}
            setNavHover={setNavHover}
            onBookSession={handleOpenBooking}
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
