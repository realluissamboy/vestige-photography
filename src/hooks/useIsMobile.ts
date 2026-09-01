import { useState, useEffect } from "react";

export interface ResponsiveViewport {
  isMobile: boolean;           // True on phones (portrait or short landscape) or narrow screens
  isMobilePortrait: boolean;   // Phone in portrait (width < 768, height >= width)
  isLandscapeMobile: boolean;  // Phone in landscape (height <= 550, width > height)
  isTablet: boolean;           // Tablet view
  isDesktop: boolean;          // Desktop view
}

export function useResponsiveViewport(): ResponsiveViewport {
  const getViewport = (): ResponsiveViewport => {
    if (typeof window === "undefined") {
      return {
        isMobile: false,
        isMobilePortrait: false,
        isLandscapeMobile: false,
        isTablet: false,
        isDesktop: true,
      };
    }
    const isLandscapeMobile = window.matchMedia("(orientation: landscape) and (max-height: 550px)").matches;
    const isMobilePortrait = window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches;
    const isMobile = isMobilePortrait || isLandscapeMobile || window.matchMedia("(max-width: 900px)").matches;
    const isTablet = !isMobile && window.matchMedia("(max-width: 1100px)").matches;
    const isDesktop = !isMobile && !isTablet;

    return {
      isMobile,
      isMobilePortrait,
      isLandscapeMobile,
      isTablet,
      isDesktop,
    };
  };

  const [viewport, setViewport] = useState<ResponsiveViewport>(getViewport);

  useEffect(() => {
    const update = () => setViewport(getViewport());

    const mqLand = window.matchMedia("(orientation: landscape) and (max-height: 550px)");
    const mqPort = window.matchMedia("(max-width: 768px) and (orientation: portrait)");
    const mqMax = window.matchMedia("(max-width: 900px)");

    mqLand.addEventListener("change", update);
    mqPort.addEventListener("change", update);
    mqMax.addEventListener("change", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      mqLand.removeEventListener("change", update);
      mqPort.removeEventListener("change", update);
      mqMax.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return viewport;
}

export function useIsMobile(): boolean {
  const { isMobile } = useResponsiveViewport();
  return isMobile;
}
