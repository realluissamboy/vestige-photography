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

export default function PageFooter({ visible, isMobile }: PageFooterProps) {
  return (
    <footer
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: isMobile ? "12px 8px 14px" : "14px 4px 10px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "center" : "flex-end",
        justifyContent: "space-between",
        gap: isMobile ? "12px" : "16px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.4s",
      }}
    >
      {/* Left: Susana's Social Media Links Above Copyright */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-start",
          gap: "6px",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "16px" : "18px",
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
                opacity: 0.9,
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {s.svg}
              <span>{s.label}</span>
            </a>
          ))}
        </nav>

        <span
          style={{
            fontFamily: FONTS.display,
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: isMobile ? "11px" : "12px",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: COLORS.plum,
          }}
        >
          © Vestige Photography 2026
        </span>
      </div>

      {/* Right: Built by Samboy with URL underneath */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-end",
          gap: "3px",
        }}
      >
        <span
          style={{
            fontSize: isMobile ? "11.5px" : "13px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontFamily: FONTS.display,
            fontStyle: "italic",
            color: COLORS.plum,
            opacity: 1,
            lineHeight: 1.2,
          }}
        >
          built by samboy
        </span>
        <a
          href="https://www.luissamboy.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: isMobile ? "11px" : "12px",
            fontWeight: 600,
            letterSpacing: "1px",
            textTransform: "lowercase",
            fontFamily: FONTS.display,
            fontStyle: "italic",
            color: "var(--color-crimson, #CD2644)",
            opacity: 0.95,
            textDecoration: "none",
            borderBottom: "1.5px solid currentColor",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            lineHeight: 1.2,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.95";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          www.luissamboy.com
        </a>
      </div>
    </footer>
  );
}
