import React, { useState, useEffect, useRef, type FormEvent, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { COLORS } from "../theme/colors";
import { FONTS } from "../theme/fonts";
import { useIsMobile } from "../hooks/useIsMobile";
import Button from "./Button";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

const GENRE_OPTIONS = [
  "Modern Pin-Up",
  "Modern Glamour",
  "Modern Burlesque",
  "Modern Tiki",
  "Modern Kulture",
  "Editorial / Custom",
];

const TIMELINE_OPTIONS = [
  "Within 1–2 Months",
  "3–6 Months",
  "Specific Date in Mind",
  "Flexible / Planning Ahead",
];

const LOCATION_OPTIONS = [
  "On location",
  "Travel",
  "Other",
  "Not sure yet",
];

export default function BookingModal({
  isOpen,
  onClose,
  initialCategory,
}: BookingModalProps) {
  const isMobile = useIsMobile();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Normalize initialCategory if passed from short or full category key
  const resolveCategory = (cat?: string): string => {
    if (!cat) return "Modern Pin-Up";
    if (GENRE_OPTIONS.includes(cat)) return cat;
    const found = GENRE_OPTIONS.find(
      (g) => g.toLowerCase().includes(cat.toLowerCase()) || cat.toLowerCase().includes(g.toLowerCase())
    );
    return found || "Modern Pin-Up";
  };

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    initialCategory ? [resolveCategory(initialCategory)] : ["Modern Pin-Up"]
  );
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0]);
  const [locationPref, setLocationPref] = useState(LOCATION_OPTIONS[0]);
  const [visionNotes, setVisionNotes] = useState("");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initialCategory if passed
  useEffect(() => {
    if (initialCategory) {
      const resolved = resolveCategory(initialCategory);
      if (!selectedGenres.includes(resolved)) {
        setSelectedGenres([resolved]);
      }
    }
  }, [initialCategory]);

  // Handle Dialog Lifecycle, Focus Lock & ESC Key
  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setErrorMessage(null);
      return;
    }

    triggerRef.current = document.activeElement as HTMLElement;

    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      // Focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (firstElement && lastElement) {
          if (e.shiftKey) {
            if (activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
      document.removeEventListener("keydown", handleKeyDown);
      if (triggerRef.current && typeof triggerRef.current.focus === "function") {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.length > 1
          ? prev.filter((g) => g !== genre)
          : prev
        : [...prev, genre]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage("Please provide both your name and phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate asynchronous submission (can hook up to Formspree, Resend, Netlify, or custom API)
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsSuccess(true);
    } catch {
      setErrorMessage("Something went wrong submitting your request. Please try again or reach out directly on Instagram.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen || typeof document === "undefined") return null;

  const inputStyle: CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    background: COLORS.warmWhite,
    border: `1px solid ${COLORS.stone}`,
    borderRadius: "3px",
    padding: isMobile ? "10px 14px" : "12px 16px",
    fontFamily: FONTS.body,
    fontSize: isMobile ? "16px" : "17px",
    color: COLORS.ink,
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const labelStyle: CSSProperties = {
    display: "block",
    fontFamily: FONTS.display,
    fontStyle: "italic",
    fontWeight: 700,
    fontSize: isMobile ? "11px" : "12px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: COLORS.ink,
    marginBottom: "6px",
  };

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(20, 18, 16, 0.78)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "16px 12px" : "32px 24px",
        overflowY: "auto",
        boxSizing: "border-box",
        animation: "vestige-fade 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "640px",
          background: COLORS.cream,
          border: `1px solid ${COLORS.stoneDivider}`,
          borderRadius: "2px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45), 0 4px 16px rgba(0, 0, 0, 0.15)",
          padding: isMobile ? "28px 20px 24px" : "40px 44px 36px",
          boxSizing: "border-box",
          maxHeight: isMobile ? "92vh" : "90vh",
          overflowY: "auto",
        }}
      >
        {/* Monograph Inner Framing Line */}
        <div
          style={{
            position: "absolute",
            top: isMobile ? "8px" : "12px",
            left: isMobile ? "8px" : "12px",
            right: isMobile ? "8px" : "12px",
            bottom: isMobile ? "8px" : "12px",
            border: `1px solid rgba(158, 140, 121, 0.35)`,
            pointerEvents: "none",
            borderRadius: "1px",
          }}
        />

        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close booking modal"
          onClick={onClose}
          style={{
            position: "absolute",
            top: isMobile ? "14px" : "20px",
            right: isMobile ? "14px" : "20px",
            width: "36px",
            height: "36px",
            background: "transparent",
            border: "none",
            color: COLORS.ink,
            fontFamily: FONTS.cormorant,
            fontSize: "28px",
            lineHeight: 1,
            cursor: "pointer",
            opacity: 0.7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.7";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ×
        </button>

        {isSuccess ? (
          /* SUCCESS STATE */
          <div
            style={{
              textAlign: "center",
              padding: isMobile ? "24px 10px" : "36px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.display,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: COLORS.crimson,
              }}
            >
              Inquiry Received
            </span>

            <h2
              id="booking-modal-title"
              style={{
                fontFamily: FONTS.script,
                fontSize: isMobile ? "44px" : "56px",
                color: COLORS.ink,
                margin: "4px 0 0",
                lineHeight: 1.1,
              }}
            >
              Thank You, {fullName.trim().split(" ")[0] || "Friend"}!
            </h2>

            <div
              style={{
                width: "48px",
                height: "1px",
                background: COLORS.crimson,
                margin: "8px 0",
              }}
            />

            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: isMobile ? "16px" : "18px",
                lineHeight: 1.6,
                color: COLORS.ink,
                maxWidth: "480px",
                margin: "0 auto",
              }}
            >
              Your session inquiry is in Susana’s hands. She will review your vision and reach out to{" "}
              <strong>{phone.trim() || email.trim()}</strong> within <strong>24–48 hours</strong> to discuss concepts,
              dates, and styling.
            </p>

            <div style={{ marginTop: "16px" }}>
              <Button onClick={handleResetAndClose} isMobile={isMobile}>
                Return to Site
              </Button>
            </div>

            <p
              style={{
                marginTop: "12px",
                fontFamily: FONTS.display,
                fontStyle: "italic",
                fontSize: "13px",
                color: COLORS.stoneDivider,
              }}
            >
              Need immediate assistance? You can also message on Instagram{" "}
              <a
                href="https://ig.me/m/susanavestige"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: COLORS.crimson, textDecoration: "underline" }}
              >
                @susanavestige
              </a>
            </p>
          </div>
        ) : (
          /* FORM STATE */
          <form onSubmit={handleSubmit} style={{ position: "relative", zIndex: 1 }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: isMobile ? "20px" : "28px" }}>
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: isMobile ? "10px" : "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: COLORS.stoneDivider,
                  margin: "0 0 6px",
                }}
              >
                Vestige Photography · Private Inquiry
              </p>

              <h2
                id="booking-modal-title"
                style={{
                  fontFamily: FONTS.script,
                  fontSize: isMobile ? "40px" : "52px",
                  color: COLORS.crimson,
                  margin: "0 0 8px",
                  lineHeight: 1.1,
                  textShadow: "1px 1px 0px rgba(0,0,0,0.08)",
                }}
              >
                Book a Session
              </h2>

              <p
                style={{
                  fontFamily: FONTS.body,
                  fontSize: isMobile ? "14px" : "15px",
                  lineHeight: 1.45,
                  color: COLORS.ink,
                  opacity: 0.85,
                  margin: "0 auto",
                  maxWidth: "460px",
                }}
              >
                Fine-art modern portraiture, pin-up, and vintage automotive sessions with Susana Andrea.
              </p>
            </div>

            {errorMessage && (
              <div
                style={{
                  background: "rgba(205, 38, 68, 0.1)",
                  border: `1px solid ${COLORS.crimson}`,
                  color: COLORS.crimson,
                  padding: "10px 14px",
                  borderRadius: "3px",
                  fontSize: "14px",
                  fontFamily: FONTS.body,
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* Field 1: Name */}
            <div style={{ marginBottom: isMobile ? "14px" : "18px" }}>
              <label htmlFor="booking-name" style={labelStyle}>
                Full Name <span style={{ color: COLORS.crimson }}>*</span>
              </label>
              <input
                id="booking-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Winny Rose"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = COLORS.crimson)}
                onBlur={(e) => (e.target.style.borderColor = COLORS.stone)}
              />
            </div>

            {/* Field 2: Phone & Email (Phone required, Email optional - positions swapped) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "14px" : "16px",
                marginBottom: isMobile ? "14px" : "18px",
              }}
            >
              <div>
                <label htmlFor="booking-phone" style={labelStyle}>
                  Phone Number <span style={{ color: COLORS.crimson }}>*</span>
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(619) 555-0199"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = COLORS.crimson)}
                  onBlur={(e) => (e.target.style.borderColor = COLORS.stone)}
                />
              </div>

              <div>
                <label htmlFor="booking-email" style={labelStyle}>
                  Email Address <span style={{ opacity: 0.5, fontStyle: "normal" }}>(optional)</span>
                </label>
                <input
                  id="booking-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = COLORS.crimson)}
                  onBlur={(e) => (e.target.style.borderColor = COLORS.stone)}
                />
              </div>
            </div>

            {/* Field 3: Session Genre Chips */}
            <div style={{ marginBottom: isMobile ? "14px" : "18px" }}>
              <label style={labelStyle}>
                Session Category of Interest <span style={{ color: COLORS.crimson }}>*</span>
              </label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginTop: "6px",
                }}
              >
                {GENRE_OPTIONS.map((genre) => {
                  const isSelected = selectedGenres.includes(genre);
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      style={{
                        background: isSelected ? COLORS.crimson : COLORS.warmWhite,
                        color: isSelected ? COLORS.cream : COLORS.ink,
                        border: `1px solid ${isSelected ? COLORS.crimson : COLORS.stone}`,
                        borderRadius: "999px",
                        padding: isMobile ? "6px 12px" : "7px 16px",
                        fontFamily: FONTS.display,
                        fontStyle: "italic",
                        fontWeight: 700,
                        fontSize: isMobile ? "11px" : "12px",
                        letterSpacing: "0.8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: isSelected ? "0 2px 8px rgba(205, 38, 68, 0.35)" : "none",
                      }}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 4: Timeline & Location Selection */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "14px" : "16px",
                marginBottom: isMobile ? "14px" : "18px",
              }}
            >
              <div>
                <label htmlFor="booking-timeline" style={labelStyle}>
                  Desired Timeline
                </label>
                <select
                  id="booking-timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  style={{
                    ...inputStyle,
                    appearance: "auto",
                    cursor: "pointer",
                  }}
                >
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="booking-location" style={labelStyle}>
                  Shoot Location
                </label>
                <select
                  id="booking-location"
                  value={locationPref}
                  onChange={(e) => setLocationPref(e.target.value)}
                  style={{
                    ...inputStyle,
                    appearance: "auto",
                    cursor: "pointer",
                  }}
                >
                  {LOCATION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 5: Creative Vision & Concept Notes */}
            <div style={{ marginBottom: isMobile ? "18px" : "24px" }}>
              <label htmlFor="booking-vision" style={labelStyle}>
                Creative Vision & Details{" "}
                <span style={{ opacity: 0.5, fontStyle: "normal" }}>(styling, occasion, ideas)</span>
              </label>
              <textarea
                id="booking-vision"
                rows={3}
                value={visionNotes}
                onChange={(e) => setVisionNotes(e.target.value)}
                placeholder="Share any styling ideas, wardrobe thoughts, hair/makeup preferences, or special dates..."
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  lineHeight: 1.5,
                }}
                onFocus={(e) => (e.target.style.borderColor = COLORS.crimson)}
                onBlur={(e) => (e.target.style.borderColor = COLORS.stone)}
              />
            </div>

            {/* Submit Action */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                marginTop: "10px",
              }}
            >
              <Button
                type="submit"
                isMobile={isMobile}
                disabled={isSubmitting}
                style={{
                  width: isMobile ? "100%" : "auto",
                  padding: isMobile ? "12px 32px" : "14px 48px",
                }}
              >
                {isSubmitting ? "Sending Inquiry..." : "Send Booking Inquiry"}
              </Button>

              <p
                style={{
                  fontFamily: FONTS.display,
                  fontStyle: "italic",
                  fontSize: isMobile ? "12px" : "13px",
                  color: COLORS.stoneDivider,
                  margin: "4px 0 0",
                  textAlign: "center",
                }}
              >
                Prefer a direct conversation? DM{" "}
                <a
                  href="https://ig.me/m/susanavestige"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: COLORS.crimson,
                    textDecoration: "underline",
                  }}
                >
                  @susanavestige
                </a>{" "}
                on Instagram.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
