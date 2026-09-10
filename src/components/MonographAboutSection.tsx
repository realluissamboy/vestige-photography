import React from "react";
import { responsiveSrcSet } from "../data/responsiveImages";
import { FONTS } from "../theme/fonts";
import { useResponsiveViewport } from "../hooks/useIsMobile";
import Button from "./Button";
import PageFooter from "./PageFooter";
import { SOCIALS } from "../data/navigation";

export interface MonographAboutSectionProps {
  onBookSession?: () => void;
}

export default function MonographAboutSection({
  onBookSession,
}: MonographAboutSectionProps) {
  const { isMobile, isMobilePortrait, isLandscapeMobile } = useResponsiveViewport();

  const sectionLabel: React.CSSProperties = {
    fontFamily: FONTS.script,
    fontSize: isLandscapeMobile
      ? "36px"
      : isMobilePortrait
      ? "40px"
      : "clamp(46px, 3.8vw, 62px)",
    color: "var(--color-crimson, #CD2644)",
    marginBottom: isMobile ? "4px" : "8px",
    lineHeight: 1.05,
  };

  const bodyText: React.CSSProperties = {
    fontFamily: FONTS.body,
    fontSize: isLandscapeMobile ? "15px" : isMobile ? "16.5px" : "18px",
    lineHeight: 1.65,
    color: "var(--color-obsidian, #1A1A1A)",
    margin: 0,
  };

  const linkStyle: React.CSSProperties = {
    color: "var(--color-crimson, #CD2644)",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  };

  return (
    <section
      id="about-susana"
      tabIndex={-1}
      style={{
        background: "var(--color-parchment, #EFE9D9)",
        color: "var(--color-ink, #1A1A1B)",
        position: "relative",
        zIndex: 10,
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: isLandscapeMobile
          ? "28px 20px 16px"
          : isMobile
          ? "40px 20px 20px"
          : "48px 36px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1060px",
          width: "100%",
          margin: "0 auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobilePortrait
              ? "1fr"
              : isLandscapeMobile
              ? "minmax(200px, 250px) 1.5fr"
              : "minmax(260px, 320px) 1.4fr",
            gap: isLandscapeMobile ? "24px" : isMobile ? "24px" : "56px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "static",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                borderRadius: "4px",
                boxShadow: "0 20px 48px rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(158, 140, 121, 0.4)",
                width: isMobilePortrait ? "190px" : "100%",
                maxWidth: "320px",
              }}
            >
              <img
                src="/susana headshot.webp"
                srcSet={responsiveSrcSet("/susana headshot.webp")}
                sizes={isMobilePortrait ? "190px" : isLandscapeMobile ? "250px" : "320px"}
                loading="lazy"
                decoding="async"
                alt="Susana Andrea, founder of Vestige Photography"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: FONTS.script,
                fontSize: isLandscapeMobile ? "26px" : isMobilePortrait ? "28px" : "38px",
                color: "var(--color-crimson, #CD2644)",
                textAlign: "center",
                margin: "12px 0 0",
                lineHeight: 1,
              }}
            >
              Susana Andrea, founder
            </p>

            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "10px",
              }}
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    fontFamily: FONTS.display,
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: isMobile ? "11px" : "12px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "var(--color-crimson, #CD2644)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    opacity: 0.9,
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.9";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {s.svg}
                  <span>{s.label}</span>
                </a>
              ))}
            </nav>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                marginBottom: isLandscapeMobile ? "22px" : isMobile ? "26px" : "32px",
              }}
            >
              <p style={sectionLabel}>The Philosophy</p>
              <div
                style={{
                  borderLeft: "3px solid var(--color-crimson, #CD2644)",
                  paddingLeft: isMobile ? "14px" : "20px",
                  margin: "8px 0 14px",
                  textAlign: "left",
                }}
              >
                <blockquote
                  style={{
                    fontFamily: FONTS.cormorant,
                    fontSize: isLandscapeMobile
                      ? "clamp(16px, 3vh, 19px)"
                      : isMobilePortrait
                      ? "clamp(17px, 4.2vw, 21px)"
                      : "clamp(20px, 2vw, 25px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    lineHeight: 1.42,
                    color: "var(--color-obsidian, #1A1A1A)",
                    margin: 0,
                  }}
                >
                  &ldquo;My job is pose coaching, not posing. The camera just records the moment a woman finally believes what the room already sees.&rdquo;
                </blockquote>
              </div>
              <p style={bodyText}>
                Susana Andrea is the photographer and founder behind Vestige. For twenty years
                she has built a practice around one idea: that a great portrait is an act of
                confidence, coaxed out rather than performed.
              </p>
            </div>

            <div
              style={{
                marginBottom: isLandscapeMobile ? "20px" : isMobile ? "24px" : "28px",
              }}
            >
              <p style={sectionLabel}>The Heritage</p>
              <p style={bodyText}>
                Susana came up shooting the San Diego and Phoenix punk and metal scenes &mdash;
                sweating photographers' pits, smoke-filled clubs, and the unvarnished honesty of
                the stage. That edge never left her work. It is what keeps a pin-up image from
                tipping into pastiche: the grit beneath the gloss. Of Mexican and Colombian descent
                and raised in San Diego, Susana grew up between languages, border towns, and the
                overlapping subcultures of Southern California. Her portraits carry that layered
                sense of place &mdash; classic cars, Tiki lounges, and mid-century glamour read
                less as costume and more as inheritance.
              </p>
            </div>

            <div
              style={{
                marginBottom: isLandscapeMobile ? "24px" : isMobile ? "28px" : "32px",
              }}
            >
              <p style={sectionLabel}>The Accomplishments</p>
              <p style={bodyText}>
                Susana is the author of{" "}
                <a
                  href="https://www.wonkpress.com/products/vestige-twenty-years-of-modern-pin-up"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  <em>Vestige: Twenty Years of Modern Pin-Up</em>
                </a>{" "}
                (Wonk Press, 2025), a 200-page monograph documenting two decades of work, and{" "}
                <a
                  href="https://schifferbooks.com/products/kittens-kulture"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  <em>Kittens and Kulture</em>
                </a>{" "}
                (Schiffer Publishing), and editor of{" "}
                <a
                  href="https://www.instagram.com/thevelvetgazette/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  <em>The Velvet Gazette</em>
                </a>
                , a quarterly publication on vintage style, burlesque, and the women who keep
                those traditions alive.
              </p>
            </div>

            <div
              style={{
                paddingTop: "4px",
                display: "flex",
                justifyContent: isMobilePortrait ? "center" : "flex-start",
              }}
            >
              <Button isMobile={isMobile} onClick={() => onBookSession?.()}>
                Book a Session
              </Button>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            borderTop: "1px solid rgba(158, 140, 121, 0.25)",
            marginTop: isLandscapeMobile ? "28px" : isMobile ? "32px" : "44px",
            paddingTop: "6px",
          }}
        >
          <PageFooter visible={true} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}
