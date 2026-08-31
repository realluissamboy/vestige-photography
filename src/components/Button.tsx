import type { ReactNode } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

export interface ButtonProps {
  href: string;
  target?: string;
  rel?: string;
  isMobile: boolean;
  children: ReactNode;
}

export default function Button({ href, target, rel, isMobile, children }: ButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      style={{
        fontFamily: FONTS.display,
        fontStyle: "italic",
        fontWeight: 800,
        fontSize: "14px",
        letterSpacing: "4px",
        textTransform: "uppercase",
        color: COLORS.cream,
        background: COLORS.crimson,
        border: "none",
        padding: isMobile ? "16px 40px" : "18px 52px",
        minHeight: "44px",
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 20px rgba(200, 20, 44, 0.25)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 10px 28px rgba(200, 20, 44, 0.38)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(200, 20, 44, 0.25)";
      }}
    >
      {children}
    </a>
  );
}

