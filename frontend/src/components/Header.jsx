import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

// Only keys + routes here; the visible text comes from i18n.js
const NAV_LINKS = [
  { key: "nav.home", to: "/" },
  { key: "nav.about", to: "/about" },
  { key: "nav.location", to: "/location" },
  { key: "nav.review", to: "/reviews" },
  { key: "nav.menu", to: "/menu" },
];

// Devanagari-capable stack so Marathi renders cleanly
const FONT = "'Noto Sans Devanagari', 'Noto Sans', sans-serif";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e1bfb5",
        boxShadow: "0 4px 16px -2px rgba(44,37,35,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          height: 72,
        }}
      >
        {/* Logo */}
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
          }}
        >
          <img
            src="/Gemini_Generated_Image_rxijsrrxijsrrxij.png"
            alt={t("nav.logoAlt")}
            style={{
              height: 44,
              width: 44,
              objectFit: "cover",
              borderRadius: "50%",
              border: "2px solid #ffdbd0",
            }}
          />
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                fontFamily: `Epilogue, ${FONT}`,
                fontWeight: 700,
                fontSize: 17,
                color: "#9b2f00",
                letterSpacing: "-0.3px",
              }}
            >
              {t("brand")}
            </span>
            <span
              style={{
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 10,
                color: "#7d5800",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: 1,
              }}
            >
              {t("nav.tagline")}
            </span>
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.key}
              to={link.to}
              end={link.to === "/"}
              style={({ isActive }) => ({
                padding: "8px 20px",
                borderRadius: 9999,
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                transition: "all 0.2s",
                background: isActive ? "#ffdbd0" : "transparent",
                color: isActive ? "#9b2f00" : "#59413a",
              })}
            >
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        {/* Language switch (desktop) */}
        <div className="lang-desktop">
          <LanguageSwitcher />
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "10px 20px",
            borderRadius: 9999,
            background: "#246131",
            color: "#fff",
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(36,97,49,0.25)",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
          className="wa-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t("nav.whatsapp")}
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((m) => !m)}
          aria-label={t("nav.toggleMenu")}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
          className="hamburger-btn"
        >
          <div
            style={{
              width: 22,
              height: 2,
              background: "#9b2f00",
              marginBottom: 5,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 22,
              height: 2,
              background: "#9b2f00",
              marginBottom: 5,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              width: 22,
              height: 2,
              background: "#9b2f00",
              borderRadius: 2,
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "#fff",
            borderTop: "1px solid #e1bfb5",
            padding: "1rem 1.5rem 1.5rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.key}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: "block",
                padding: "12px 0",
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                color: isActive ? "#9b2f00" : "#59413a",
                borderBottom: "1px solid #f8ddcf",
              })}
            >
              {t(link.key)}
            </NavLink>
          ))}

          {/* Language switch (mobile) */}
          <div style={{ marginTop: "1rem", display: "flex" }}>
            <LanguageSwitcher />
          </div>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              marginTop: "1rem",
              padding: "12px 20px",
              borderRadius: 9999,
              background: "#246131",
              color: "#fff",
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            {t("nav.whatsappEnquiry")}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .lang-desktop { display: none !important; }
          .wa-btn { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
