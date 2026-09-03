import React from "react";
import type { CSSProperties } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { SOCIALS } from "../data/navigation";

export interface PageFooterProps {
  visible: boolean;
  isMobile: boolean;
  showBrandVoice?: boolean;
  navStyleDark?: (label: string, isActive: boolean) => CSSProperties;
}

export default function PageFooter({ visible, isMobile, showBrandVoice = false }: PageFooterProps) {
  return (
    <footer
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: isMobile ? "12px 8px 14px" : "14px 16px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: isMobile ? "8px" : "16px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.4s",
      }}
    >
      {/* Left: Copyright & Built By */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: isMobile ? "center" : "flex-start",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: isMobile ? "10px" : "11px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: COLORS.plum,
          }}
        >
          © Vestige Photography 2026
        </span>
        <span style={{ color: `${COLORS.stone}77`, fontSize: "11px" }}>·</span>
        <span
          style={{
            fontSize: isMobile ? "9.5px" : "10px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontFamily: FONTS.display,
            fontStyle: "italic",
            color: COLORS.plum,
            opacity: 0.85,
          }}
        >
          Built by{" "}
          <a
            href="https://www.luissamboy.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid currentColor" }}
          >
            Samboy
          </a>
        </span>
      </div>

      {/* Center: Brand Voice Note (Compact inline) */}
      {showBrandVoice && (
        <span
          style={{
            fontFamily: FONTS.body,
            fontStyle: "italic",
            fontSize: isMobile ? "10.5px" : "11.5px",
            color: COLORS.plum,
            opacity: 0.75,
            textAlign: "center",
          }}
        >
          <em>Vestige</em> (Wonk Press, 2025) · Book design by Carrie A. Smith
        </span>
      )}

      {/* Right: Social Links Inline */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "16px" : "20px",
          justifyContent: isMobile ? "center" : "flex-end",
        }}
      >
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            style={{
              fontFamily: FONTS.display,
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: isMobile ? "10.5px" : "11.5px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--color-crimson, #CD2644)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              opacity: 0.85,
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {s.svg}
            <span>{s.label}</span>
          </a>
        ))}
      </nav>
    </footer>
  );
}
