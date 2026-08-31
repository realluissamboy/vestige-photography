import React, { useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import type { GalleryImage as GalleryImageData } from "../data/gallery";
import { FONTS } from "../theme/fonts";

export interface LightboxProps {
  image: GalleryImageData | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Lightbox({ image, onClose, onPrev, onNext }: LightboxProps) {
  const isMobile = useIsMobile();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!image) return;

    // Store the currently focused element so we can restore it on close
    triggerRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" && onPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        e.preventDefault();
        onNext();
      }

      // Focus trap: cycle focus within dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])"
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        const activeElement = document.activeElement;

        if (e.shiftKey) {
          // Shift+Tab
          if (activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Move focus to close button on open
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus on close
      if (triggerRef.current && typeof triggerRef.current.focus === "function") {
        triggerRef.current.focus();
      }
    };
  }, [image, onClose, onPrev, onNext]);

  if (!image) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${image.label}`}
      onClick={() => onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 10, 11, 0.94)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "16px" : "48px",
        cursor: "zoom-out",
        animation: "vestigeLightboxIn 0.3s ease",
      }}
    >
      <img
        src={image.src}
        alt={image.label}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          display: "block",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          cursor: "default",
        }}
      />

      {/* Previous Button */}
      {onPrev && (
        <button
          type="button"
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          style={{
            position: "absolute",
            left: isMobile ? "8px" : "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            background: "rgba(26,26,26,0.6)",
            border: "1px solid rgba(245,240,232,0.3)",
            borderRadius: "50%",
            color: "var(--color-cream)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "20px",
            transition: "background 0.2s ease, opacity 0.2s ease",
          }}
        >
          ‹
        </button>
      )}

      {/* Next Button */}
      {onNext && (
        <button
          type="button"
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          style={{
            position: "absolute",
            right: isMobile ? "8px" : "24px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "44px",
            height: "44px",
            background: "rgba(26,26,26,0.6)",
            border: "1px solid rgba(245,240,232,0.3)",
            borderRadius: "50%",
            color: "var(--color-cream)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "20px",
            transition: "background 0.2s ease, opacity 0.2s ease",
          }}
        >
          ›
        </button>
      )}

      {/* Close Button */}
      <button
        ref={closeButtonRef}
        aria-label="Close lightbox"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: "absolute",
          top: isMobile ? "16px" : "32px",
          right: isMobile ? "16px" : "32px",
          width: "44px",
          height: "44px",
          background: "transparent",
          border: "none",
          color: "var(--color-cream)",
          fontFamily: FONTS.cormorant,
          fontSize: "32px",
          lineHeight: 1,
          cursor: "pointer",
          opacity: 0.8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ×
      </button>
    </div>
  );
}

