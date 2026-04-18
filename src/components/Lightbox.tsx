import React, { useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import type { GalleryImage as GalleryImageData } from "../data/gallery";

export interface LightboxProps {
  image: GalleryImageData | null;
  onClose: () => void;
}

export default function Lightbox({ image, onClose }: LightboxProps) {
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
  }, [image, onClose]);

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
        background: "rgba(10, 10, 11, 0.92)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "16px" : "48px",
        cursor: "zoom-out",
        animation: "vestigeLightboxIn 0.3s ease",
      }}
    >
      <style>{`@keyframes vestigeLightboxIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
      <img
        src={image.src}
        alt={image.label}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          display: "block",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      />
      <button
        ref={closeButtonRef}
        aria-label="Close lightbox"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: "absolute",
          top: isMobile ? "16px" : "32px",
          right: isMobile ? "16px" : "32px",
          width: "44px",
          height: "44px",
          background: "transparent",
          border: "none",
          color: "var(--color-cream)",
          fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
          fontSize: "28px",
          lineHeight: 1,
          cursor: "pointer",
          opacity: 0.7,
        }}
      >
        ×
      </button>
    </div>
  );
}
