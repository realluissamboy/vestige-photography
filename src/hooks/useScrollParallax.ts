import { useState, useEffect, useRef } from "react";

/**
 * Detects if user requested reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for section-level scroll progress with requestAnimationFrame throttling.
 * Returns a ref to attach to the container and the current normalized parallax offset (pixels).
 */
export function useSectionParallax(speed: number = 0.25) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offsetY, setOffsetY] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") {
      setOffsetY(0);
      return;
    }

    let rafId: number | null = null;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
        if (isVisible) {
          updatePosition();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "20% 0px 20% 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const updatePosition = () => {
      if (!ref.current || !isVisible) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Center of element relative to center of viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;

      const calcOffset = Math.round(distanceFromCenter * speed);
      setOffsetY(calcOffset);
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updatePosition();
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updatePosition();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed, reducedMotion]);

  return { ref, offsetY, reducedMotion };
}
