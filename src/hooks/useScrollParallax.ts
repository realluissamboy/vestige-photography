import { useEffect, useRef } from "react";

/**
 * High-performance parallax hook that mutates DOM styles directly in requestAnimationFrame,
 * bypassing React re-renders completely during scroll for 60-120fps buttery smoothness.
 */
export function useDirectParallax(speed: number = 0.16) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let rafId: number | null = null;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
        if (isVisible) scheduleUpdate();
      },
      { threshold: [0, 0.2, 0.5, 0.8, 1], rootMargin: "30% 0px 30% 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const updateTransform = () => {
      if (!containerRef.current || !targetRef.current || !isVisible) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const diff = elementCenter - viewportCenter;
      
      // Calculate smooth parallax offset
      const offset = Math.round(diff * speed);
      targetRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.05)`;
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateTransform();
        rafId = null;
      });
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return { containerRef, targetRef };
}
