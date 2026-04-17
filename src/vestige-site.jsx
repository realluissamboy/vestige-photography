import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const COLORS = {
  cream: "#F5F0E8",
  obsidian: "#1A1A1A",
  warmWhite: "#FAF8F4",
  stone: "#C8BFA9",
  muted: "#8A8070",
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

// Placeholder images using gradient blocks to simulate the gallery
const GALLERY_IMAGES = [
  { id: 1, ratio: "portrait", cat: "Pin-Up", src: "/modern-pinup.webp", label: "Modern Pin-Up" },
  { id: 2, ratio: "portrait", cat: "Classic Cars", src: "/classic-cars.webp", label: "Chrome & Leather" },
  { id: 3, ratio: "portrait", cat: "Burlesque", src: "/burlesque.webp", label: "The Caravan Club" },
  { id: 4, ratio: "portrait", cat: "Tiki-Rockabilly", src: "/tiki-rockabilly.webp", label: "Bamboo Bar" },
  { id: 5, ratio: "portrait", cat: "Vintage-Glamour", src: "/vintage-glamour.webp", label: "Silver Screen" },
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

function GalleryImage({ img, index, visible, isMobile }) {
  const offset = isMobile ? 0 : STAGGER_OFFSETS[index % STAGGER_OFFSETS.length];
  const [hovered, setHovered] = useState(false);
  const revealed = isMobile || hovered;
  return (
    <div
      style={{
        marginTop: `${offset}px`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          width: "100%",
          ...RATIOS[img.ratio],
          border: `1px solid ${COLORS.obsidian}`,
          cursor: "pointer",
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
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (page === "portfolio") {
      const t = setTimeout(() => setGalleryVisible(true), 200);
      return () => clearTimeout(t);
    }
    setGalleryVisible(false);
  }, [page]);

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
    fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
    fontSize: "11px",
    letterSpacing: "3.5px",
    textTransform: "uppercase",
    color: COLORS.obsidian,
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: "4px 0",
    opacity: isActive ? 1 : navHover === link ? 0.9 : 0.5,
    transition: "opacity 0.3s ease",
  });

  // HOME PAGE
  if (page === "home") {
    return (
      <div style={{ background: COLORS.cream, minHeight: "100vh", fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

        {/* Hero Section - full viewport */}
        <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
          <img
            src="/hero.png"
            alt="Vestige hero portrait"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: isMobile ? "65% 35%" : "50% 50%",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.6s ease",
            }}
          />

          {/* Navigation */}
          {isMobile ? (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                padding: "24px 16px 0",
                zIndex: 10,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(-12px)",
                transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
                display: "grid",
                gridTemplateColumns: "44px 1fr 44px",
                alignItems: "center",
              }}
            >
              <span aria-hidden="true" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                  fontSize: "28px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: COLORS.cream,
                  letterSpacing: "2px",
                  lineHeight: 1,
                  textAlign: "center",
                }}
              >
                Vestige
              </span>
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
                justifyContent: "center",
                gap: "32px",
                padding: "36px 48px",
                zIndex: 10,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(-12px)",
                transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
                flexWrap: "wrap",
              }}
            >
              <button
                style={navStyle(PAGE_LINKS[0].label)}
                onMouseEnter={() => setNavHover(PAGE_LINKS[0].label)}
                onMouseLeave={() => setNavHover(null)}
                onClick={() => setPage(PAGE_LINKS[0].page)}
              >
                {PAGE_LINKS[0].label}
              </button>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                  fontSize: "32px",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: COLORS.cream,
                  letterSpacing: "2px",
                  cursor: "pointer",
                }}
                onClick={() => setPage("home")}
              >
                Vestige
              </span>
              <button
                style={navStyle(PAGE_LINKS[1].label)}
                onMouseEnter={() => setNavHover(PAGE_LINKS[1].label)}
                onMouseLeave={() => setNavHover(null)}
                onClick={() => setPage(PAGE_LINKS[1].page)}
              >
                {PAGE_LINKS[1].label}
              </button>
            </nav>
          )}

        </div>
      </div>
    );
  }

  // ABOUT PAGE
  if (page === "about") {
    const sectionLabel = {
      fontSize: "11px",
      letterSpacing: "5px",
      textTransform: "uppercase",
      color: COLORS.muted,
      marginBottom: "16px",
    };
    const sectionHeading = {
      fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
      fontSize: isMobile ? "32px" : "40px",
      fontWeight: 300,
      fontStyle: "italic",
      color: COLORS.obsidian,
      margin: "0 0 32px",
      letterSpacing: "1px",
    };
    const narrowSectionPadding = isMobile ? "0 24px 80px" : "0 40px 120px";
    const bodyText = {
      fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: 1.7,
      color: COLORS.obsidian,
      margin: "0 0 20px",
    };

    return (
      <div style={{ background: COLORS.cream, minHeight: "100vh", fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}>
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
              border: `1px solid ${COLORS.obsidian}`,
              overflow: "hidden",
              maxWidth: isMobile ? "320px" : "none",
              margin: isMobile ? "0 auto" : 0,
              width: "100%",
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

        <PageFooter visible={aboutVisible} navStyleDark={navStyleDark} isMobile={isMobile} />
      </div>
    );
  }

  // PORTFOLIO PAGE
  return (
    <div style={{ background: COLORS.cream, minHeight: "100vh", fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}>
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

      {/* Asymmetric Gallery Grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "0 20px 60px" : "0 40px 80px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
          gap: isMobile ? "24px" : "20px",
          alignItems: "start",
        }}
      >
        {GALLERY_IMAGES.map((img, i) => (
          <GalleryImage key={img.id} img={img} index={i} visible={galleryVisible} isMobile={isMobile} />
        ))}
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
              fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: COLORS.obsidian,
              background: "transparent",
              border: `1px solid ${COLORS.obsidian}`,
              padding: isMobile ? "14px 32px" : "16px 48px",
              minHeight: "44px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Book a Session
          </a>
        </div>
      </section>

      <PageFooter visible={galleryVisible} navStyleDark={navStyleDark} isMobile={isMobile} />
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
              fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
              fontSize: "32px",
              fontWeight: 300,
              fontStyle: "italic",
              color: COLORS.obsidian,
              letterSpacing: "2px",
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
              fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
              fontSize: "40px",
              fontWeight: 300,
              fontStyle: "italic",
              color: COLORS.obsidian,
              letterSpacing: "2px",
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
          fontSize: "10px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: COLORS.muted,
          margin: 0,
        }}
      >
        © Vestige Photography 2026
      </p>
      <p
        style={{
          fontSize: "8px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: COLORS.muted,
          margin: "8px 0 0 0",
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
