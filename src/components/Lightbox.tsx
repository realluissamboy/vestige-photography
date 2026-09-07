import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import type { GalleryImage as GalleryImageData } from "../data/gallery";
import { useOverlay } from "../hooks/useOverlay";
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
  const open = Boolean(image);
  const arrows = useRef({ onPrev, onNext });
  arrows.current = { onPrev, onNext };
  useOverlay(open, dialogRef, onClose, '[aria-label="Close lightbox"]');

  useEffect(() => {
    if (!open) return;
    const keydown = (event: KeyboardEvent) => {
      const action = event.key === "ArrowLeft" ? arrows.current.onPrev
        : event.key === "ArrowRight" ? arrows.current.onNext : undefined;
      if (action) { event.preventDefault(); action(); }
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [open]);

  if (!image || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      className="gallery-lightbox"
      tabIndex={-1}
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
        height: "100dvh",
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
          maxHeight: isMobile ? "calc(100dvh - 48px)" : "calc(100dvh - 96px)",
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

