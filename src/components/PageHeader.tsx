import React, { type CSSProperties } from "react";
import type { PageKey } from "../data/navigation";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { VESTIGE_WORDMARK_SHADOW, VESTIGE_TEXT_SHADOW } from "../theme/effects";
import MobileMenu from "./MobileMenu";
import { useResponsiveViewport } from "../hooks/useIsMobile";

export interface PageHeaderProps {
  page: PageKey;
  subtitle?: string;
  visible: boolean;
  setPage: (p: PageKey) => void;
  isMobile: boolean;
  navStyleDark?: (label: string, isActive: boolean) => CSSProperties;
  setNavHover?: (p: string | null) => void;
  onResetPortfolio?: () => void;
}

export default function PageHeader({ page, subtitle, visible, setPage, isMobile, onResetPortfolio }: PageHeaderProps) {
  const { isLandscapeMobile } = useResponsiveViewport();

  const handleNavClick = (targetPage: PageKey) => {
    if (targetPage === "portfolio" && onResetPortfolio) {
      onResetPortfolio();
    }
    setPage(targetPage);
  };

  const navBtn = (label: string, targetPage: PageKey, isActive: boolean): React.ReactElement => (
    <button
      style={{
        fontFamily: FONTS.script,
        fontSize: isMobile ? (isLandscapeMobile ? "28px" : "32px") : "44px",
        color: "var(--color-crimson)",
        cursor: "pointer",
        border: "none",
        background: "none",
        padding: "0 4px 4px 4px",
        borderBottom: isActive ? "2.5px solid var(--color-crimson)" : "2.5px solid transparent",
        opacity: 1,
        transition: "transform 0.2s ease, border-color 0.2s ease",
        textShadow: VESTIGE_TEXT_SHADOW,
        lineHeight: 1,
      }}
      onClick={() => handleNavClick(targetPage)}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {label}
    </button>
  );

  return (
    <>
      {isMobile ? (
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "44px 1fr 44px",
            alignItems: "center",
            padding: isLandscapeMobile
              ? "max(12px, env(safe-area-inset-top, 12px)) max(16px, env(safe-area-inset-right, 16px)) 0"
              : "max(24px, env(safe-area-inset-top, 24px)) 16px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <span aria-hidden="true" />
          <span
            style={{
              fontFamily: FONTS.script,
              fontSize: isLandscapeMobile ? "36px" : "42px",
              color: "var(--color-crimson)",
              cursor: "pointer",
              lineHeight: 1,
              textAlign: "center",
              textShadow: VESTIGE_WORDMARK_SHADOW,
            }}
            onClick={() => setPage("home")}
          >
            Vestige
          </span>
          <MobileMenu variant="solid" setPage={setPage} onResetPortfolio={onResetPortfolio} />
        </div>
      ) : (
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "56px",
            padding: "36px 24px 0",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          {navBtn("Portfolio", "portfolio", page === "portfolio")}
          <span
            style={{
              fontFamily: FONTS.script,
              fontSize: "54px",
              color: "var(--color-crimson)",
              cursor: "pointer",
              lineHeight: 1,
              textShadow: VESTIGE_WORDMARK_SHADOW,
            }}
            onClick={() => setPage("home")}
          >
            Vestige
          </span>
          {navBtn("About", "about", page === "about")}
        </nav>
      )}
      {subtitle && (
        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginTop: "16px",
            marginBottom: 0,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.1s",
          }}
        >
          {subtitle}
        </p>
      )}
    </>
  );
}
