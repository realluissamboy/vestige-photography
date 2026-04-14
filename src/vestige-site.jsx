import React, { useState, useEffect, useRef } from "react";

const COLORS = {
  cream: "#F5F0E8",
  obsidian: "#1A1A1A",
  warmWhite: "#FAF8F4",
  stone: "#C8BFA9",
  muted: "#8A8070",
};

const CATEGORIES = ["Pin-Up", "Burlesque", "Classic Cars", "Tiki-Rockabilly", "Vintage-Glamour"];

const NAV_LINKS_HOME = ["Home", "Portfolio", "About", "Books", "Gazette", "Contact"];
const NAV_LINKS_FOOTER = ["Home", "About", "Books", "Gazette", "Contact", "Instagram"];

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
            {NAV_LINKS_HOME.map((link, i) => {
              // Place logo in center
              const isCenter = i === 3;
              return (
                <div key={link} style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                  {isCenter && (
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
                  )}
                  <button
                    style={navStyle(link)}
                    onMouseEnter={() => setNavHover(link)}
                    onMouseLeave={() => setNavHover(null)}
                    onClick={() => {
                      if (link === "Portfolio") setPage("portfolio");
                    }}
                  >
                    {link}
                  </button>
                </div>
              );
            })}
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

  // PORTFOLIO PAGE
  return (
    <div style={{ background: COLORS.cream, minHeight: "100vh", fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet" />

      {/* Header */}
      <header
        style={{
          textAlign: "center",
          padding: "56px 24px 0",
          opacity: galleryVisible ? 1 : 0,
          transform: galleryVisible ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 300,
            fontStyle: "italic",
            color: COLORS.obsidian,
            margin: 0,
            letterSpacing: "2px",
            cursor: "pointer",
          }}
          onClick={() => setPage("home")}
        >
          Vestige
        </h1>
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: COLORS.muted,
            marginTop: "12px",
          }}
        >
          Portfolio Gallery View
        </p>
      </header>

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

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "48px 24px 40px",
          borderTop: `1px solid ${COLORS.stone}44`,
          opacity: galleryVisible ? 1 : 0,
          transition: "opacity 0.8s ease 0.6s",
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "28px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          {NAV_LINKS_FOOTER.map((link) => (
            <button
              key={link}
              style={{
                ...navStyleDark(link, false),
                opacity: navHover === `f-${link}` ? 0.9 : 0.5,
              }}
              onMouseEnter={() => setNavHover(`f-${link}`)}
              onMouseLeave={() => setNavHover(null)}
              onClick={() => {
                if (link === "Home") setPage("home");
              }}
            >
              {link}
            </button>
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
    </div>
  );
}
