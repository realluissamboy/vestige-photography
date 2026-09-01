import { useState, useEffect, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { PAGE_LINKS, SOCIALS } from "../data/navigation";
import type { PageKey } from "../data/navigation";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { VESTIGE_ICON_SHADOW, VESTIGE_TEXT_SHADOW } from "../theme/effects";

export interface MobileMenuProps {
  variant: "overlay" | "solid";
  setPage: (p: PageKey) => void;
  menuId?: string;
  onOpenChange?: (open: boolean) => void;
  onResetPortfolio?: () => void;
}

export default function MobileMenu({ variant, setPage, menuId = "mobile-menu", onOpenChange, onResetPortfolio }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  useEffect(() => {
    if (!open) return;

    const prevBodyOverflow = typeof document !== "undefined" ? document.body.style.overflow : "";
    const prevDocOverflow = typeof document !== "undefined" ? document.documentElement.style.overflow : "";
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevDocOverflow;
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleNav = (targetPage: PageKey) => {
    handleOpenChange(false);
    if (targetPage === "portfolio" && onResetPortfolio) {
      onResetPortfolio();
    }
    setPage(targetPage);
  };

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => handleOpenChange(true)}
        style={{
          width: "44px",
          height: "44px",
          justifySelf: "end",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          zIndex: 11,
        }}
      >
        <svg
          width="26"
          height="20"
          viewBox="0 0 26 20"
          fill="none"
          stroke={variant === "overlay" ? "#FFFFFF" : "var(--color-crimson)"}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            display: "block",
            filter: variant === "overlay"
              ? "drop-shadow(0 2px 4px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(200,20,44,0.6))"
              : VESTIGE_ICON_SHADOW,
          }}
          aria-hidden="true"
        >
          <line x1="2" y1="3" x2="24" y2="3" />
          <line x1="2" y1="10" x2="24" y2="10" />
          <line x1="2" y1="17" x2="24" y2="17" />
        </svg>
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,26,26,0.98)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "24px",
            animation: "vestige-fade 0.25s ease",
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => handleOpenChange(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "16px",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              color: COLORS.cream,
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>

          {([{ label: "Vestige", page: "home" as PageKey, isWordmark: true }, ...PAGE_LINKS] as Array<{ label: string; page: PageKey; isWordmark?: boolean }>).map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => handleNav(link.page)}
              style={{
                fontFamily: FONTS.script,
                fontSize: link.isWordmark ? "64px" : "48px",
                color: "var(--color-crimson)",
                textShadow: VESTIGE_TEXT_SHADOW,
                background: "transparent",
                border: "none",
                padding: "8px 24px",
                minHeight: "48px",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              {link.label}
            </button>
          ))}

          <div
            style={{
              marginTop: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
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
                  fontSize: "32px",
                  color: "var(--color-cream)",
                  textShadow: VESTIGE_TEXT_SHADOW,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 16px",
                  minHeight: "44px",
                  lineHeight: 1,
                }}
              >
                {s.svg}
                {s.label}
              </a>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
