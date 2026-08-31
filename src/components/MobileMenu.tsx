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
}

export default function MobileMenu({ variant, setPage, menuId = "mobile-menu", onOpenChange }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleNav = (targetPage: PageKey) => {
    handleOpenChange(false);
    setPage(targetPage);
  };

  const barStyle: CSSProperties = {
    display: "block",
    width: "26px",
    height: "2px",
    background: "var(--color-crimson)",
    borderRadius: "1px",
    filter: variant === "overlay" ? VESTIGE_ICON_SHADOW : undefined,
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          zIndex: 11,
        }}
      >
        <span style={barStyle} />
        <span style={barStyle} />
        <span style={barStyle} />
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
                textShadow: variant === "overlay" ? VESTIGE_TEXT_SHADOW : undefined,
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
                  fontFamily: FONTS.cormorant,
                  fontSize: "13px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--color-cream)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 16px",
                  minHeight: "44px",
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
