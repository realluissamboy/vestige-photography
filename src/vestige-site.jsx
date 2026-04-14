import React, { useState, useEffect, useRef } from "react";

const COLORS = {
  cream: "#F5F0E8",
  obsidian: "#1A1A1A",
  warmWhite: "#FAF8F4",
  stone: "#C8BFA9",
  muted: "#8A8070",
};

const CATEGORIES = ["Pin-Up", "Burlesque", "Classic Cars", "Tiki-Rockabilly", "Vintage-Glamour"];

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

function GalleryImage({ img, index, visible }) {
  const offset = STAGGER_OFFSETS[index % STAGGER_OFFSETS.length];
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
      </div>
    </div>
  );
}

export default function VestigeSite() {
  const [page, setPage] = useState("home");
  const [heroVisible, setHeroVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [navHover, setNavHover] = useState(null);

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

  const filteredImages = activeCategory
    ? GALLERY_IMAGES.filter((img) => img.cat === activeCategory)
    : GALLERY_IMAGES;

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
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.6s ease",
            }}
          />

          {/* Navigation */}
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

          {/* CTA */}
          <div
            style={{
              position: "absolute",
              bottom: "72px",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.2s ease 0.8s",
            }}
          >
            <button
              onClick={() => setPage("portfolio")}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(250,248,244,0.12)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
              }}
              style={{
                fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                fontSize: "11px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: COLORS.cream,
                background: "transparent",
                border: `1px solid ${COLORS.cream}`,
                padding: "16px 48px",
                cursor: "pointer",
                transition: "background 0.4s ease",
              }}
            >
              View the Archives
            </button>
          </div>
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
      fontSize: "40px",
      fontWeight: 300,
      fontStyle: "italic",
      color: COLORS.obsidian,
      margin: "0 0 32px",
      letterSpacing: "1px",
    };
    const bodyText = {
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      fontSize: "16px",
      lineHeight: 1.75,
      color: COLORS.obsidian,
      margin: "0 0 20px",
    };

    return (
      <div style={{ background: COLORS.cream, minHeight: "100vh", fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />

        <PageHeader
          page="about"
          subtitle="About the Storyteller"
          visible={aboutVisible}
          setPage={setPage}
          navStyleDark={navStyleDark}
          setNavHover={setNavHover}
        />
        <div style={{ height: "80px" }} />

        {/* Opening: headshot + philosophy */}
        <section
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 40px 120px",
            display: "grid",
            gridTemplateColumns: "minmax(240px, 1fr) 1.4fr",
            gap: "80px",
            alignItems: "center",
            opacity: aboutVisible ? 1 : 0,
            transform: aboutVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
          }}
        >
          <div style={{ border: `1px solid ${COLORS.obsidian}`, overflow: "hidden" }}>
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
                fontSize: "30px",
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
            padding: "0 40px 120px",
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
            padding: "0 40px 120px",
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
            padding: "0 40px 120px",
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
          <p style={{ ...sectionLabel, marginBottom: "24px" }}>The Next Step</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setPage("portfolio")}
              style={{
                fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                fontSize: "11px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: COLORS.obsidian,
                background: "transparent",
                border: `1px solid ${COLORS.obsidian}`,
                padding: "16px 48px",
                cursor: "pointer",
              }}
            >
              View the Archives
            </button>
          </div>
        </section>

        <PageFooter visible={aboutVisible} navStyleDark={navStyleDark} />
      </div>
    );
  }

  // PORTFOLIO PAGE
  return (
    <div style={{ background: COLORS.cream, minHeight: "100vh", fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

      <PageHeader
        page="portfolio"
        subtitle="Portfolio Gallery View"
        visible={galleryVisible}
        setPage={setPage}
        navStyleDark={navStyleDark}
        setNavHover={setNavHover}
      />

      {/* Category Filter */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "36px",
          padding: "40px 24px 48px",
          flexWrap: "wrap",
          opacity: galleryVisible ? 1 : 0,
          transition: "opacity 0.8s ease 0.15s",
        }}
      >
        <button
          style={navStyleDark("All", !activeCategory)}
          onMouseEnter={() => setNavHover("All")}
          onMouseLeave={() => setNavHover(null)}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            style={navStyleDark(cat, activeCategory === cat)}
            onMouseEnter={() => setNavHover(cat)}
            onMouseLeave={() => setNavHover(null)}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Asymmetric Gallery Grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {filteredImages.map((img, i) => (
          <GalleryImage key={img.id} img={img} index={i} visible={galleryVisible} />
        ))}
      </div>

      <PageFooter visible={galleryVisible} navStyleDark={navStyleDark} />
    </div>
  );
}

function PageHeader({ page, subtitle, visible, setPage, navStyleDark, setNavHover }) {
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

function PageFooter({ visible, navStyleDark }) {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "48px 24px 40px",
        borderTop: `1px solid ${COLORS.stone}44`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease 0.6s",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "28px",
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
        © Vestige Fine Art Photography 2024
      </p>
    </footer>
  );
}
