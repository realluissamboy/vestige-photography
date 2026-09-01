import type { ReactNode, CSSProperties } from "react";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

export interface ButtonProps {
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  isMobile?: boolean;
  children: ReactNode;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  href,
  onClick,
  target,
  rel,
  isMobile = false,
  children,
  style,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyle: CSSProperties = {
    fontFamily: FONTS.script,
    fontSize: isMobile ? "32px" : "40px",
    color: COLORS.cream,
    background: disabled ? COLORS.stoneDivider : COLORS.crimson,
    border: "none",
    padding: isMobile ? "12px 36px" : "14px 48px",
    minHeight: "44px",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    boxShadow: disabled ? "none" : "0 6px 20px rgba(200, 20, 44, 0.25)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, opacity 0.25s ease",
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 10px 28px rgba(200, 20, 44, 0.38)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 6px 20px rgba(200, 20, 44, 0.25)";
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}

