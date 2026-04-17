import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Book-True palette, drawn from Susana's monograph.
const COLORS = {
  parchment: "#EFE9D9",
  cream: "#F5F0E8",
  ink: "#1A1A1B",
  obsidian: "#1A1A1A",
  warmWhite: "#FAF8F4",
  stone: "#C8BFA9",
  muted: "#8A8070",
  crimson: "#C8142C",
  rose: "#C47F7A",
  plum: "#8B6F7C",
  kulture: "#5D7F9A",
  tiki: "#317B73",
};

const CATEGORY_COLORS = {
  "Pin-Up": COLORS.crimson,
  "Classic Cars": COLORS.kulture,
  "Burlesque": COLORS.plum,
  "Tiki-Rockabilly": COLORS.tiki,
  "Vintage-Glamour": COLORS.rose,
};

const CATEGORY_TITLES = {
  "Pin-Up": "Modern Pin-Up",
  "Classic Cars": "Modern Kulture",
  "Burlesque": "Modern Burlesque",
  "Tiki-Rockabilly": "Modern Tiki",
  "Vintage-Glamour": "Modern Glamour",
};

const FONTS = {
  script: "'Great Vibes', cursive",
  display: "'Playfair Display', 'Times New Roman', serif",
  body: "'Crimson Text', Georgia, serif",
};


const PAGE_LINKS = [
  { label: "Portfolio", page: "portfolio" },
  { label: "About", page: "about" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/susanavestige/",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/vestigephotography/",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.41-.12-2.38 0-4.01 1.45-4.01 4.12V9.9H7.6V13h2.68v8h3.22z" />
      </svg>
    ),
  },
];

const GALLERY_IMAGES = [
  { id: 1,  ratio: "portrait",  cat: "Pin-Up",           src: "/portfolio/pinup-green-wall.webp",       label: "Jade Wall" },
  { id: 2,  ratio: "portrait",  cat: "Pin-Up",           src: "/portfolio/pinup-marie.webp",            label: "Marie Devilreaux" },
  { id: 3,  ratio: "portrait",  cat: "Pin-Up",           src: "/portfolio/pinup-coral.webp",            label: "Coral & Bloom" },
  { id: 4,  ratio: "portrait",  cat: "Pin-Up",           src: "/portfolio/pinup-mosh.webp",             label: "Miss Mosh" },
  { id: 5,  ratio: "landscape", cat: "Classic Cars",     src: "/portfolio/cars-cervena.webp",           label: "Cervena Fox" },
  { id: 6,  ratio: "portrait",  cat: "Classic Cars",     src: "/portfolio/cars-a5.webp",                label: "Midnight Cruiser" },
  { id: 7,  ratio: "portrait",  cat: "Burlesque",        src: "/portfolio/burlesque-winny.webp",        label: "Winny Queen" },
  { id: 8,  ratio: "portrait",  cat: "Burlesque",        src: "/portfolio/burlesque-sabrina.webp",      label: "Sabrina Minx" },
  { id: 9,  ratio: "portrait",  cat: "Tiki-Rockabilly",  src: "/portfolio/tiki-avalon.webp",            label: "Avalon Monet" },
  { id: 10, ratio: "landscape", cat: "Tiki-Rockabilly",  src: "/portfolio/tiki-patio.webp",             label: "Tiki Patio" },
  { id: 11, ratio: "portrait",  cat: "Vintage-Glamour",  src: "/portfolio/glamour-ashlyn.webp",         label: "Ashlyn Coco" },
  { id: 12, ratio: "landscape", cat: "Vintage-Glamour",  src: "/portfolio/glamour-vanity.webp",         label: "The Vanity" },
  { id: 13, ratio: "portrait",  cat: "Vintage-Glamour",  src: "/portfolio/glamour-architectural.webp",  label: "Architectural" },
  { id: 14, ratio: "landscape", cat: "Vintage-Glamour",  src: "/portfolio/glamour-seaside.webp",        label: "Seaside Villa" },
];

const RATIOS = {
  portrait: { paddingBottom: "140%" },
  landscape: { paddingBottom: "66%" },
  square: { paddingBottom: "100%" },
};

// Stagger pattern for asymmetric layout
const STAGGER_OFFSETS = [0, 40, 16, 56, 8, 48, 24, 60];

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);
  return isMobile;
}

function GalleryImage({ img, index, visible, isMobile, showLabel = true, onClick }) {
  const offset = isMobile ? 0 : STAGGER_OFFSETS[index % STAGGER_OFFSETS.length];
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
          cursor: onClick ? "zoom-in" : "pointer",
          overflow: "hidden",
        }}
      >
        <img
          src={img.src}
          alt={img.label}
          loading="lazy"
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

export default function VestigeSite() {
  const [page, setPage] = useState("home");
  const [heroVisible, setHeroVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [navHover, setNavHover] = useState(null);
  const [portfolioCategory, setPortfolioCategory] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKey = (e) => { if (e.key === "Escape") setLightboxImage(null); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxImage]);
  const isMobile = useIsMobile();

  useEffect(() => { setPortfolioCategory(null); }, [page]);

  const PORTFOLIO_CATEGORIES = ["Pin-Up", "Classic Cars", "Burlesque", "Tiki-Rockabilly", "Vintage-Glamour"];
  const categoryCover = (cat) => GALLERY_IMAGES.find((img) => img.cat === cat);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (page !== "portfolio") {
      setGalleryVisible(false);
      return;
    }
    setGalleryVisible(false);
    const srcs = portfolioCategory === null
      ? PORTFOLIO_CATEGORIES.map((c) => categoryCover(c)?.src).filter(Boolean)
      : GALLERY_IMAGES.filter((i) => i.cat === portfolioCategory).map((i) => i.src);
    let cancelled = false;
    const preload = Promise.all(
      srcs.map(
        (s) =>
          new Promise((res) => {
            const img = new Image();
            img.onload = img.onerror = () => res();
            img.src = s;
          })
      )
    );
    const fallback = new Promise((res) => setTimeout(res, 1500));
    Promise.race([preload, fallback]).then(() => {
      if (!cancelled) setGalleryVisible(true);
    });
    return () => {
      cancelled = true;
    };
  }, [page, portfolioCategory]);

  useEffect(() => {
    if (page === "about") {
      const t = setTimeout(() => setAboutVisible(true), 200);
      return () => clearTimeout(t);
    }
    setAboutVisible(false);
  }, [page]);

  const navStyle = (link) => ({
    fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
    fontSize: "11px",
    letterSpacing: "3.5px",
    textTransform: "uppercase",
    color: COLORS.cream,
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "4px 0",
    opacity: navHover === link ? 1 : 0.85,
    transition: "opacity 0.3s ease",
  });

  const navStyleDark = (link, isActive) => ({
    fontFamily: FONTS.display,
    fontStyle: "italic",
    fontWeight: 600,
    fontSize: "13px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: isActive ? COLORS.crimson : COLORS.ink,
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "4px 0",
    opacity: isActive ? 1 : navHover === link ? 1 : 0.7,
    transition: "opacity 0.3s ease, color 0.3s ease",
  });

  // HOME PAGE
  if (page === "home") {
    const navLinkStyle = (link) => ({
      fontFamily: FONTS.display,
      fontStyle: "italic",
      fontWeight: 600,
      fontSize: "13px",
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: COLORS.cream,
      cursor: "pointer",
      border: "none",
      background: "none",
      padding: "8px 0",
      opacity: navHover === link ? 1 : 0.85,
      transition: "opacity 0.3s ease",
      textShadow: "0 2px 12px rgba(0,0,0,0.4)",
    });
    return (
      <div style={{ background: COLORS.parchment, minHeight: "100vh", fontFamily: FONTS.body, color: COLORS.ink }}>
        {/* Full-bleed hero with floating nav + script wordmark */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 1.6s ease",
          }}
        >
          <img
            src="/hero.webp"
            alt="Vestige hero portrait"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: isMobile ? "65% 35%" : "50% 50%",
            }}
          />

          {/* Top scrim for nav legibility */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "200px",
              pointerEvents: "none",
              background:
                "linear-gradient(to bottom, rgba(10,10,11,0.45) 0%, rgba(10,10,11,0.15) 60%, rgba(10,10,11,0) 100%)",
              zIndex: 5,
            }}
          />

          {/* Nav — no wordmark here; the big script below is the identity */}
          {isMobile ? (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                padding: "20px 16px 0",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <MobileMenu variant="overlay" setPage={setPage} />
            </div>
          ) : (
            <nav
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                gap: "40px",
                padding: "32px 48px",
                zIndex: 10,
              }}
            >
              <button
                style={navLinkStyle(PAGE_LINKS[0].label)}
                onMouseEnter={() => setNavHover(PAGE_LINKS[0].label)}
                onMouseLeave={() => setNavHover(null)}
                onClick={() => setPage(PAGE_LINKS[0].page)}
              >
                {PAGE_LINKS[0].label}
              </button>
              <button
                style={navLinkStyle(PAGE_LINKS[1].label)}
                onMouseEnter={() => setNavHover(PAGE_LINKS[1].label)}
                onMouseLeave={() => setNavHover(null)}
                onClick={() => setPage(PAGE_LINKS[1].page)}
              >
                {PAGE_LINKS[1].label}
              </button>
            </nav>
          )}

          {/* Editorial tag top-left */}
          <div
            style={{
              position: "absolute",
              top: isMobile ? "72px" : "110px",
              left: isMobile ? "20px" : "48px",
              color: COLORS.cream,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              zIndex: 6,
            }}
          >
            <span style={{ display: "block", fontFamily: FONTS.script, fontSize: isMobile ? "34px" : "52px", lineHeight: 1 }}>
              twenty years of
            </span>
            <span
              style={{
                display: "block",
                fontFamily: FONTS.display,
                fontStyle: "italic",
                fontWeight: 800,
                fontSize: isMobile ? "18px" : "28px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              Modern Pin-Up
            </span>
          </div>

          {/* Signature wordmark — single Vestige identity moment, overlapping bottom */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: isMobile ? "4%" : "6%",
              right: isMobile ? "-2%" : "-1.5%",
              fontFamily: FONTS.script,
              color: COLORS.crimson,
              fontSize: isMobile ? "180px" : "420px",
              lineHeight: 0.8,
              pointerEvents: "none",
              textShadow: "0 6px 30px rgba(0,0,0,0.35)",
              zIndex: 6,
            }}
          >
            Vestige
          </div>
        </div>
      </div>
    );
  }

  // ABOUT PAGE
  if (page === "about") {
    const sectionLabel = {
      fontFamily: FONTS.script,
      fontSize: isMobile ? "40px" : "52px",
      color: COLORS.crimson,
      marginBottom: "4px",
      lineHeight: 0.9,
    };
    const sectionHeading = {
      fontFamily: FONTS.display,
      fontStyle: "italic",
      fontWeight: 800,
      fontSize: isMobile ? "36px" : "48px",
      color: COLORS.ink,
      margin: "0 0 32px",
      letterSpacing: "-0.5px",
      lineHeight: 1,
    };
    const narrowSectionPadding = isMobile ? "0 24px 80px" : "0 40px 120px";
    const bodyText = {
      fontFamily: FONTS.body,
      fontSize: "19px",
      fontWeight: 400,
      lineHeight: 1.65,
      color: COLORS.ink,
      margin: "0 0 20px",
    };

    return (
      <div style={{ background: COLORS.parchment, minHeight: "100vh", fontFamily: FONTS.body, color: COLORS.ink }}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

        <PageHeader
          page="about"
          visible={aboutVisible}
          setPage={setPage}
          navStyleDark={navStyleDark}
          setNavHover={setNavHover}
          isMobile={isMobile}
        />
        <div style={{ height: isMobile ? "48px" : "80px" }} />

        {/* Opening: headshot + philosophy */}
        <section
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: narrowSectionPadding,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(240px, 1fr) 1.4fr",
            gap: isMobile ? "32px" : "80px",
            alignItems: "center",
            opacity: aboutVisible ? 1 : 0,
            transform: aboutVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              maxWidth: isMobile ? "320px" : "none",
              margin: isMobile ? "0 auto" : 0,
              width: "100%",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src="/susana headshot.webp"
              alt="Susana Andrea, founder of Vestige Photography"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <p style={sectionLabel}>The Philosophy</p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                fontSize: isMobile ? "24px" : "30px",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.4,
                color: COLORS.obsidian,
                margin: "0 0 24px",
              }}
            >
              &ldquo;My job is pose coaching, not posing. The camera just records the moment a woman finally believes what the room already sees.&rdquo;
            </p>
            <p style={bodyText}>
              Susana Andrea is the photographer and founder behind Vestige. For twenty years
              she has built a practice around one idea: that a great portrait is an act of
              confidence, coaxed out rather than performed.
            </p>
          </div>
        </section>

        {/* The Roots */}
        <section
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            padding: narrowSectionPadding,
            opacity: aboutVisible ? 1 : 0,
            transition: "opacity 1s ease 0.4s",
          }}
        >
          <p style={sectionLabel}>The Roots</p>
          <h2 style={sectionHeading}>From the Pit to the Portrait</h2>
          <p style={bodyText}>
            Susana came up shooting the San Diego and Phoenix punk and metal scenes &mdash;
            sweating photographers' pits, smoke-filled clubs, and the unvarnished honesty of
            the stage. That edge never left her work. It is what keeps a pin-up image from
            tipping into pastiche: the grit beneath the gloss.
          </p>
        </section>

        {/* The Heritage */}
        <section
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            padding: narrowSectionPadding,
            opacity: aboutVisible ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        >
          <p style={sectionLabel}>The Heritage</p>
          <h2 style={sectionHeading}>San Diego, by Way of Everywhere</h2>
          <p style={bodyText}>
            Of Mexican and Colombian descent and raised in San Diego, Susana grew up
            between languages, border towns, and the overlapping subcultures of Southern
            California. Her portraits carry that layered sense of place &mdash; classic cars,
            Tiki lounges, and mid-century glamour read less as costume and more as inheritance.
          </p>
        </section>

        {/* The Accomplishments */}
        <section
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            padding: narrowSectionPadding,
            opacity: aboutVisible ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
          }}
        >
          <p style={sectionLabel}>The Accomplishments</p>
          <h2 style={sectionHeading}>In Print</h2>
          <p style={bodyText}>
            Susana is the author of{" "}
            <a
              href="https://www.wonkpress.com/products/vestige-twenty-years-of-modern-pin-up"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: COLORS.obsidian, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              <em>Vestige: Twenty Years of Modern Pin-Up</em>
            </a>{" "}
            and{" "}
            <a
              href="https://schifferbooks.com/products/kittens-kulture"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: COLORS.obsidian, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              <em>Kittens and Kulture</em>
            </a>
            , and editor of{" "}
            <a
              href="https://www.instagram.com/thevelvetgazette/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: COLORS.obsidian, textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              <em>The Velvet Gazette</em>
            </a>
            , a quarterly publication on vintage style, burlesque, and the women who keep
            those traditions alive.
          </p>
        </section>

        {/* CTA */}
        <section
          style={{
            textAlign: "center",
            padding: "0 24px 120px",
            opacity: aboutVisible ? 1 : 0,
            transition: "opacity 1s ease 0.7s",
          }}
        >
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://ig.me/m/susanavestige"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: FONTS.display,
                fontStyle: "italic",
                fontWeight: 800,
                fontSize: "14px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: COLORS.cream,
                background: COLORS.crimson,
                border: "none",
                padding: isMobile ? "16px 40px" : "18px 52px",
                minHeight: "44px",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s ease",
              }}
            >
              Book a Session
            </a>
          </div>
        </section>

        <PageFooter visible={aboutVisible} navStyleDark={navStyleDark} isMobile={isMobile} />
      </div>
    );
  }

  // PORTFOLIO PAGE
  return (
    <div style={{ background: COLORS.parchment, minHeight: "100vh", fontFamily: FONTS.body, color: COLORS.ink }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

      <PageHeader
        page="portfolio"
        visible={galleryVisible}
        setPage={setPage}
        navStyleDark={navStyleDark}
        setNavHover={setNavHover}
        isMobile={isMobile}
      />

      <div style={{ height: isMobile ? "24px" : "40px" }} />

      <div style={{ opacity: galleryVisible ? 1 : 0, transition: "opacity 0.8s ease" }}>

      {portfolioCategory === null ? (
        /* Book-style colored section tiles */
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0 20px 60px" : "0 40px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "56px" }}>
            <div style={{ fontFamily: FONTS.script, color: COLORS.crimson, fontSize: isMobile ? "52px" : "72px", lineHeight: 0.9 }}>the</div>
            <div style={{ fontFamily: FONTS.display, fontStyle: "italic", fontWeight: 800, fontSize: isMobile ? "16px" : "18px", letterSpacing: "6px", textTransform: "uppercase", marginTop: "-4px" }}>Portfolio</div>
          </div>
          {PORTFOLIO_CATEGORIES.map((cat, rowIdx) => {
            const catPhotos = GALLERY_IMAGES.filter((img) => img.cat === cat);
            const color = CATEGORY_COLORS[cat];
            const title = CATEGORY_TITLES[cat];
            const reverse = rowIdx % 2 === 1;
            const tileBlock = (
              <div
                key="tile"
                onClick={() => setPortfolioCategory(cat)}
                style={{
                  background: color,
                  color: COLORS.cream,
                  textAlign: "center",
                  padding: isMobile ? "32px 20px" : "40px 24px",
                  minHeight: isMobile ? "180px" : "220px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div>
                  <div style={{ fontFamily: FONTS.script, fontSize: isMobile ? "42px" : "54px", lineHeight: 0.85, opacity: 0.9 }}>
                    {title.startsWith("Modern ") ? "modern" : "a modern"}
                  </div>
                  <div style={{ fontFamily: FONTS.display, fontStyle: "italic", fontWeight: 800, fontSize: isMobile ? "32px" : "40px", letterSpacing: "-1px", lineHeight: 1 }}>
                    {title.replace(/^Modern\s/, "")}
                  </div>
                </div>
              </div>
            );
            const photos = catPhotos.slice(0, 2).map((img, i) => (
              <div
                key={img.id}
                onClick={() => setPortfolioCategory(cat)}
                style={{ position: "relative", overflow: "hidden", cursor: "pointer", minHeight: isMobile ? "180px" : "220px" }}
              >
                <img src={img.src} alt={img.label} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ));
            const cells = reverse ? [...photos, tileBlock] : [tileBlock, ...photos];
            while (cells.length < 3) cells.push(<div key={`pad-${cells.length}`} style={{ background: "transparent", minHeight: isMobile ? "180px" : "220px" }} />);
            return (
              <div
                key={cat}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                {cells}
              </div>
            );
          })}
        </div>
      ) : (
        /* Drilled-in Category View — crimson band header */
        <>
          <section
            style={{
              background: CATEGORY_COLORS[portfolioCategory],
              color: COLORS.cream,
              padding: isMobile ? "48px 20px" : "72px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: FONTS.script, fontSize: isMobile ? "44px" : "62px", lineHeight: 0.9, opacity: 0.9 }}>
              a study in
            </div>
            <div style={{ fontFamily: FONTS.display, fontStyle: "italic", fontWeight: 800, fontSize: isMobile ? "56px" : "92px", letterSpacing: "-2px", lineHeight: 1, marginTop: "4px" }}>
              {CATEGORY_TITLES[portfolioCategory]}
            </div>
            <button
              onClick={() => setPortfolioCategory(null)}
              style={{
                marginTop: "28px",
                fontFamily: FONTS.display,
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: COLORS.cream,
                background: "transparent",
                border: "none",
                borderBottom: `1px solid rgba(245,240,232,0.4)`,
                paddingBottom: "2px",
                cursor: "pointer",
                minHeight: "44px",
                opacity: 0.9,
              }}
            >
              ← back to portfolio
            </button>
          </section>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: isMobile ? "40px 20px 60px" : "64px 40px 80px",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
              gap: isMobile ? "24px" : "20px",
              alignItems: "start",
            }}
          >
            {GALLERY_IMAGES
              .filter((img) => img.cat === portfolioCategory)
              .map((img, i) => (
                <GalleryImage key={img.id} img={img} index={i} visible={true} isMobile={isMobile} showLabel={false} onClick={() => setLightboxImage(img)} />
              ))}
          </div>
        </>
      )}

      </div>

      <section
        style={{
          textAlign: "center",
          padding: "0 24px 120px",
          opacity: galleryVisible ? 1 : 0,
          transition: "opacity 1s ease 0.7s",
        }}
      >
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://ig.me/m/susanavestige"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: FONTS.display,
              fontStyle: "italic",
              fontWeight: 800,
              fontSize: "14px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: COLORS.cream,
              background: COLORS.crimson,
              border: "none",
              padding: isMobile ? "16px 40px" : "18px 52px",
              minHeight: "44px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease",
            }}
          >
            Book a Session
          </a>
        </div>
      </section>

      <PageFooter visible={galleryVisible} navStyleDark={navStyleDark} isMobile={isMobile} />

      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
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
            src={lightboxImage.src}
            alt={lightboxImage.label}
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
            onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
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
      )}
    </div>
  );
}

function PageHeader({ page, subtitle, visible, setPage, navStyleDark, setNavHover, isMobile }) {
  const navBtn = (label, targetPage, isActive) => (
    <button
      style={navStyleDark(label, isActive)}
      onMouseEnter={() => setNavHover(label)}
      onMouseLeave={() => setNavHover(null)}
      onClick={() => setPage(targetPage)}
    >
      {label}
    </button>
  );

  return (
    <>
      {isMobile ? (
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "44px 1fr 44px",
            alignItems: "center",
            padding: "24px 16px 0",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span aria-hidden="true" />
          <span
            style={{
              fontFamily: FONTS.script,
              fontSize: "36px",
              color: COLORS.crimson,
              cursor: "pointer",
              lineHeight: 1,
              textAlign: "center",
            }}
            onClick={() => setPage("home")}
          >
            Vestige
          </span>
          <MobileMenu variant="solid" setPage={setPage} />
        </div>
      ) : (
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            padding: "36px 24px 0",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {navBtn("Portfolio", "portfolio", page === "portfolio")}
          <span
            style={{
              fontFamily: FONTS.script,
              fontSize: "48px",
              color: COLORS.crimson,
              cursor: "pointer",
              lineHeight: 1,
            }}
            onClick={() => setPage("home")}
          >
            Vestige
          </span>
          {navBtn("About", "about", page === "about")}
        </nav>
      )}
      {subtitle && (
        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: COLORS.muted,
            marginTop: "16px",
            marginBottom: 0,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.1s",
          }}
        >
          {subtitle}
        </p>
      )}
    </>
  );
}

function PageFooter({ visible, navStyleDark, isMobile }) {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: isMobile ? "40px 20px 32px" : "48px 24px 40px",
        borderTop: `1px solid ${COLORS.stone}44`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.6s",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: isMobile ? "20px" : "28px",
          marginBottom: "20px",
          flexWrap: "wrap",
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
              ...navStyleDark(s.label, false),
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {s.svg}
            {s.label}
          </a>
        ))}
      </nav>
      <p
        style={{
          fontFamily: FONTS.display,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: COLORS.plum,
          margin: 0,
        }}
      >
        © Vestige Photography 2026
      </p>
      <p
        style={{
          fontFamily: FONTS.body,
          fontStyle: "italic",
          fontSize: "13px",
          color: COLORS.plum,
          margin: "12px auto 0",
          opacity: 0.8,
          maxWidth: "540px",
          lineHeight: 1.5,
        }}
      >
        Brand voice informed by <em>Vestige: Twenty Years of Modern Pin-Up</em> (Wonk Press, 2025). Book design by Carrie A. Smith.
      </p>
      <p
        style={{
          fontSize: "9px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: COLORS.plum,
          margin: "12px 0 0 0",
          opacity: 0.7,
        }}
      >
        Built by Samboy | www.luissamboy.com
      </p>
    </footer>
  );
}

function MobileMenu({ variant, setPage }) {
  const [open, setOpen] = useState(false);
  const iconColor = variant === "overlay" ? COLORS.cream : COLORS.obsidian;

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const handleNav = (targetPage) => {
    setOpen(false);
    setPage(targetPage);
  };

  const barStyle = { display: "block", width: "22px", height: "1px", background: iconColor };

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        style={{
          width: "44px",
          height: "44px",
          justifySelf: "end",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          zIndex: 11,
        }}
      >
        <span style={barStyle} />
        <span style={barStyle} />
        <span style={barStyle} />
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,26,26,0.98)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "24px",
            animation: "vestige-fade 0.25s ease",
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "16px",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              color: COLORS.cream,
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>

          {[{ label: "Vestige", page: "home" }, ...PAGE_LINKS].map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => handleNav(link.page)}
              style={{
                fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                fontSize: "28px",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "3px",
                color: COLORS.cream,
                background: "transparent",
                border: "none",
                padding: "12px 24px",
                minHeight: "44px",
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}

          <div
            style={{
              marginTop: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
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
                  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                  fontSize: "13px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: COLORS.cream,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 16px",
                  minHeight: "44px",
                }}
              >
                {s.svg}
                {s.label}
              </a>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
