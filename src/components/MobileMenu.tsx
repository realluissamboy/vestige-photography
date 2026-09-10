import { useState, useEffect, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { PAGE_LINKS, SOCIALS } from "../data/navigation";
import type { PageKey } from "../data/navigation";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";

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
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
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
            gap: "8px",
            padding: "max(20px, env(safe-area-inset-top, 20px)) 24px max(20px, env(safe-area-inset-bottom, 20px))",
            overflowY: "auto",
            animation: "vestige-fade 0.25s ease",
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => handleOpenChange(false)}
            style={{
              position: "absolute",
              top: "max(14px, env(safe-area-inset-top, 14px))",
              right: "max(16px, env(safe-area-inset-right, 16px))",
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
                fontSize: link.isWordmark ? "clamp(44px, 8vh, 64px)" : "clamp(30px, 6vh, 48px)",
                color: "var(--color-crimson)",
                background: "transparent",
                border: "none",
                padding: "6px 24px",
                minHeight: "44px",
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              {link.label}
            </button>
          ))}

          <div
            style={{
              marginTop: "clamp(12px, 3vh, 32px)",
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
                  fontSize: "clamp(22px, 4.5vh, 32px)",
                  color: "var(--color-cream)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "6px 16px",
                  minHeight: "40px",
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
