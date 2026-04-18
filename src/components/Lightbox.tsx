import React from "react";
import { COLORS } from "../theme/colors";
import { useIsMobile } from "../hooks/useIsMobile";
import type { GalleryImage as GalleryImageData } from "../data/gallery";

export interface LightboxProps {
  image: GalleryImageData | null;
  onClose: () => void;
}

export default function Lightbox({ image, onClose }: LightboxProps) {
  const isMobile = useIsMobile();

  if (!image) return null;

  return (
    <div
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
        aria-label="Close"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: "absolute",
          top: isMobile ? "16px" : "32px",
          right: isMobile ? "16px" : "32px",
          width: "44px",
          height: "44px",
          background: "transparent",
          border: "none",
          color: COLORS.cream,
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
