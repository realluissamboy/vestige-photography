import { useEffect, useRef, type RefObject } from "react";

const overlays: { token: symbol; element: HTMLElement; wasInert: boolean }[] = [];
let restoreScroll: (() => void) | undefined;

function lockScroll(token: symbol, element: HTMLElement) {
  if (overlays.length === 0) {
    const body = document.body;
    const html = document.documentElement;
    const { scrollX: x, scrollY: y } = window;
    const previous = {
      position: body.style.position, top: body.style.top, left: body.style.left,
      width: body.style.width, overflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
    };
    Object.assign(body.style, { position: "fixed", top: `${-y}px`, left: `${-x}px`, width: "100%", overflow: "hidden" });
    html.style.overflow = "hidden";
    restoreScroll = () => {
      Object.assign(body.style, { position: previous.position, top: previous.top, left: previous.left, width: previous.width, overflow: previous.overflow });
      html.style.overflow = previous.htmlOverflow;
      window.scrollTo({ left: x, top: y, behavior: "instant" });
    };
  }
  const entry = { token, element, wasInert: element.inert };
  const previous = overlays.at(-1);
  if (previous) previous.element.inert = true;
  overlays.push(entry);
  return () => {
    const index = overlays.findIndex(item => item.token === token);
    if (index !== -1) overlays.splice(index, 1);
    entry.element.inert = entry.wasInert;
    const top = overlays.at(-1);
    if (top) top.element.inert = top.wasInert;
    if (overlays.length === 0) {
      restoreScroll?.();
      restoreScroll = undefined;
    }
  };
}

/** Focus and scrolling belong to the topmost overlay, including nested lightboxes. */
export function useOverlay(
  open: boolean,
  container: RefObject<HTMLElement | null>,
  onClose: () => void,
  initialFocus: string,
) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open || !container.current) return;
    const token = Symbol("overlay");
    const trigger = document.activeElement as HTMLElement | null;
    const unlock = lockScroll(token, container.current);
    const frame = requestAnimationFrame(() => {
      (container.current?.querySelector<HTMLElement>(initialFocus) ?? container.current)?.focus({ preventScroll: true });
    });
    const keydown = (event: KeyboardEvent) => {
      if (overlays.at(-1)?.token !== token || !container.current) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeRef.current();
      }
      if (event.key !== "Tab") return;
      const elements = Array.from(container.current.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      )).filter(el => !el.closest("[inert]") && el.getClientRects().length > 0);
      const first = elements[0];
      const last = elements.at(-1);
      if (!first || !last) {
        event.preventDefault();
        container.current.focus({ preventScroll: true });
      } else if (!container.current.contains(document.activeElement) || document.activeElement === container.current) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", keydown);
      unlock();
      // The background's inert attribute is removed in the same React commit.
      if (trigger?.isConnected && !trigger.closest("[inert]")) trigger.focus({ preventScroll: true });
    };
  }, [open, container, initialFocus]);
}
