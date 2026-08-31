import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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

  if (!image || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${image.label}`}
      onClick={() => onClose()}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(10, 10, 11, 0.95)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "20px" : "48px",
        cursor: "zoom-out",
        animation: "vestige-fade 0.2s ease",
      }}
    >
      <img
        src={image.src}
        alt={image.label}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: isMobile ? "calc(100vw - 32px)" : "calc(100vw - 120px)",
          maxHeight: isMobile ? "calc(100vh - 48px)" : "calc(100vh - 96px)",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          display: "block",
          boxShadow: "0 24px 70px rgba(0,0,0,0.75)",
          cursor: "default",
          borderRadius: "2px",
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
            left: isMobile ? "8px" : "28px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            background: "rgba(26,26,26,0.7)",
            border: "1px solid rgba(245,240,232,0.3)",
            borderRadius: "50%",
            color: "var(--color-cream)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "22px",
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
            right: isMobile ? "8px" : "28px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            background: "rgba(26,26,26,0.7)",
            border: "1px solid rgba(245,240,232,0.3)",
            borderRadius: "50%",
            color: "var(--color-cream)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "22px",
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
          top: isMobile ? "16px" : "28px",
          right: isMobile ? "16px" : "28px",
          width: "48px",
          height: "48px",
          background: "rgba(26,26,26,0.5)",
          borderRadius: "50%",
          border: "1px solid rgba(245,240,232,0.2)",
          color: "var(--color-cream)",
          fontFamily: FONTS.cormorant,
          fontSize: "30px",
          lineHeight: 1,
          cursor: "pointer",
          opacity: 0.9,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ×
      </button>
    </div>,
    document.body
  );
}

