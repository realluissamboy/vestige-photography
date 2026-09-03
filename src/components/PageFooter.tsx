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
        gap: isMobile ? "10px" : "16px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.4s",
      }}
    >
      {/* Left: Copyright */}
      <div style={{ textAlign: isMobile ? "center" : "left" }}>
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
      </div>

      {/* Right: Social Links with Built by Samboy underneath */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "center" : "flex-end",
          gap: "4px",
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
            fontSize: isMobile ? "9px" : "9.5px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontFamily: FONTS.display,
            fontStyle: "italic",
            color: COLORS.plum,
            opacity: 0.8,
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
    </footer>
  );
}
