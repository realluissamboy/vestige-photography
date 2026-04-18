import { useState } from "react";
import { STAGGER_OFFSETS, RATIOS } from "../data/gallery";
import type { GalleryImage as GalleryImageData } from "../data/gallery";
import { COLORS } from "../theme/colors";

export interface GalleryImageProps {
  img: GalleryImageData;
  index: number;
  visible: boolean;
  isMobile: boolean;
  showLabel?: boolean;
  srcSet?: string;
  sizes?: string;
  onClick: () => void;
}

export default function GalleryImage({
  img,
  index,
  visible,
  isMobile,
  showLabel = true,
  srcSet,
  sizes,
  onClick,
}: GalleryImageProps) {
  const offset = isMobile ? 0 : (STAGGER_OFFSETS[index % STAGGER_OFFSETS.length] ?? 0);
  const [hovered, setHovered] = useState(false);
  const revealed = isMobile || hovered;
  return (
    <div
      style={{
        marginTop: `${offset}px`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        style={{
          position: "relative",
          width: "100%",
          ...RATIOS[img.ratio],
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          cursor: "zoom-in",
          overflow: "hidden",
        }}
      >
        <img
          src={img.src}
          alt={img.label}
          loading="lazy"
          srcSet={srcSet}
          sizes={sizes}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {showLabel && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "40px 16px 20px",
              textAlign: "center",
              background:
                "linear-gradient(to top, rgba(26,26,26,0.55) 0%, rgba(26,26,26,0) 100%)",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                fontSize: "12px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: COLORS.cream,
                filter: revealed ? "blur(0)" : "blur(0.5px)",
                opacity: revealed ? 1 : 0.85,
                transition: "filter 0.4s ease, opacity 0.4s ease",
              }}
            >
              {img.cat}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
