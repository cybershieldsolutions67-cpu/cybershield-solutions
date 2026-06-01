'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'Inicio', href: 'hero' },
  { label: 'Servicios', href: 'servicios' },
  { label: 'Nosotros', href: 'nosotros' },
  { label: 'Infraestructura', href: 'infraestructura' },
  { label: 'Contacto', href: 'contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  /* ---------- Scroll: opaque header + active section tracking ---------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine which section is currently in view
      const offsets = NAV_ITEMS.map(({ href }) => {
        const el = document.getElementById(href);
        if (!el) return { href, top: Infinity };
        return { href, top: el.getBoundingClientRect().top };
      });

      // Find the section closest to, but above, the middle of the viewport
      const threshold = window.innerHeight * 0.35;
      let current = 'hero';
      for (const { href, top } of offsets) {
        if (top <= threshold) current = href;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---------- Lock body scroll when mobile menu is open ---------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ---------- Smooth‑scroll to section ---------- */
  const scrollTo = useCallback(
    (id) => {
      setMobileOpen(false);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [],
  );

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
        role="banner"
      >
        <div className={styles.headerInner}>
          {/* ── Logo ── */}
          <a
            className={styles.logo}
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
            aria-label="CyberShield — Ir al inicio"
          >
            <Image
              className={styles.logoIcon}
              src="/images/logo.png"
              alt="CyberShield logo"
              width={32}
              height={32}
              priority
            />
            <span className={styles.logoText}>CyberShield</span>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className={styles.nav} aria-label="Navegación principal">
            {NAV_ITEMS.map(({ label, href }) => (
              <button
                key={href}
                type="button"
                className={`${styles.navLink} ${activeSection === href ? styles.navLinkActive : ''}`}
                onClick={() => scrollTo(href)}
              >
                {label}
              </button>
            ))}

            <button
              type="button"
              className={styles.ctaButton}
              onClick={() => scrollTo('contacto')}
            >
              Contactar
            </button>
          </nav>

          {/* ── Hamburger ── */}
          <button
            type="button"
            className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </header>

      {/* ── Mobile Nav Overlay ── */}
      <div
        className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <button
            key={href}
            type="button"
            className={styles.mobileNavLink}
            onClick={() => scrollTo(href)}
            tabIndex={mobileOpen ? 0 : -1}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className={styles.mobileCta}
          onClick={() => scrollTo('contacto')}
          tabIndex={mobileOpen ? 0 : -1}
        >
          Contactar
        </button>
      </div>
    </>
  );
}
