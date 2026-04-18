import React from "react";
import type { CSSProperties } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { SOCIALS } from "../data/navigation";

export interface PageFooterProps {
  visible: boolean;
  navStyleDark: (label: string, isActive: boolean) => CSSProperties;
  isMobile: boolean;
}

export default function PageFooter({ visible, navStyleDark, isMobile }: PageFooterProps) {
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
          gap: isMobile ? "20px" : "28px",
          marginBottom: "20px",
          flexWrap: "wrap",
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
              ...navStyleDark(s.label, false),
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
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
        Built by Samboy | www.luissamboy.com
      </p>
    </footer>
  );
}
