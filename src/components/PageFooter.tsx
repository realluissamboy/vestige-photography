import React from "react";
import type { CSSProperties } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { SOCIALS } from "../data/navigation";

export interface PageFooterProps {
  visible: boolean;
  isMobile: boolean;
  navStyleDark?: (label: string, isActive: boolean) => CSSProperties;
}

export default function PageFooter({ visible, isMobile }: PageFooterProps) {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: isMobile ? "40px 20px 32px" : "48px 24px 40px",
        borderTop: `1px solid ${COLORS.stone}44`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.6s",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: isMobile ? "24px" : "36px",
          marginBottom: "20px",
          flexWrap: "wrap",
          alignItems: "center",
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
              fontFamily: FONTS.script,
              fontSize: isMobile ? "28px" : "36px",
              color: "var(--color-crimson)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              lineHeight: 1,
              opacity: 0.9,
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
          >
            {s.svg}
            {s.label}
          </a>
        ))}
      </nav>
      <p
        style={{
          fontFamily: FONTS.display,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: COLORS.plum,
          margin: 0,
        }}
      >
        © Vestige Photography 2026
      </p>
      <p
        style={{
          fontFamily: FONTS.body,
          fontStyle: "italic",
          fontSize: "13px",
          color: COLORS.plum,
          margin: "12px auto 0",
          opacity: 0.8,
          maxWidth: "640px",
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        Brand voice informed by <em>Vestige: Twenty Years of Modern Pin-Up</em> (Wonk Press, 2025).
        <br />
        Book design by Carrie A. Smith.
      </p>
      <p
        style={{
          fontSize: "9px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: COLORS.plum,
          margin: "12px 0 0 0",
          opacity: 0.7,
        }}
      >
        Built by Samboy |{" "}
        <a
          href="https://www.luissamboy.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "none", borderBottom: "1px solid currentColor" }}
        >
          www.luissamboy.com
        </a>
      </p>
    </footer>
  );
}
