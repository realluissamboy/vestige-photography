import React, { type CSSProperties } from "react";
import type { PageKey } from "../data/navigation";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import MobileMenu from "./MobileMenu";

export interface PageHeaderProps {
  page: PageKey;
  subtitle?: string;
  visible: boolean;
  setPage: (p: PageKey) => void;
  navStyleDark: (label: string, isActive: boolean) => CSSProperties;
  setNavHover: (p: string | null) => void;
  isMobile: boolean;
}

export default function PageHeader({ page, subtitle, visible, setPage, navStyleDark, setNavHover, isMobile }: PageHeaderProps) {
  const navBtn = (label: string, targetPage: PageKey, isActive: boolean): React.ReactElement => (
    <button
      style={navStyleDark(label, isActive)}
      onMouseEnter={() => setNavHover(label)}
      onMouseLeave={() => setNavHover(null)}
      onClick={() => setPage(targetPage)}
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
            padding: "24px 16px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <span aria-hidden="true" />
          <span
            style={{
              fontFamily: FONTS.script,
              fontSize: "36px",
              color: "var(--color-crimson)",
              cursor: "pointer",
              lineHeight: 1,
              textAlign: "center",
            }}
            onClick={() => setPage("home")}
          >
            Vestige
          </span>
          <MobileMenu variant="solid" setPage={setPage} />
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
