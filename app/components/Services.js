'use client';

import { useEffect, useRef } from 'react';
import styles from './Services.module.css';

/* ── Inline SVG Icons ─────────────────────────────── */

const IconSoporte = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    {/* Wrench detail */}
    <path d="M14 8l-2 2a2.83 2.83 0 11-4-4l2-2" />
    <line x1="12" y1="10" x2="16" y2="6" />
  </svg>
);

const IconRedes = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2.5" />
    <circle cx="5" cy="19" r="2.5" />
    <circle cx="19" cy="19" r="2.5" />
    <line x1="12" y1="7.5" x2="12" y2="12" />
    <line x1="12" y1="12" x2="5" y2="16.5" />
    <line x1="12" y1="12" x2="19" y2="16.5" />
    <circle cx="12" cy="12" r="1.5" />
  </svg>
);

const IconWeb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <line x1="2" y1="8" x2="22" y2="8" />
    <polyline points="8,13 6,15 8,17" />
    <polyline points="14,13 16,15 14,17" />
    <line x1="11" y1="12" x2="11" y2="18" />
  </svg>
);

const IconSeguridad = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Padlock icon */}
    <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
    <path d="M12 17v-3" />
    <path d="M8 11V7a4 4 0 1 1 8 0v4" />
  </svg>
);

const IconMantenimiento = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Gear icon */}
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

/* ── Service Data ─────────────────────────────────── */

const services = [
  {
    icon: <IconSoporte />,
    title: 'Soporte técnico',
    description:
      'Realizamos diagnóstico, mantenimiento preventivo y correctivo de computadoras, instalación de programas, limpieza de equipos y optimización del sistema.',
  },
  {
    icon: <IconRedes />,
    title: 'Instalación de redes',
    description:
      'Configuramos módems, routers, switches, cableado de red y puntos de conexión para mejorar la comunicación entre los equipos de trabajo.',
  },
  {
    icon: <IconWeb />,
    title: 'Desarrollo de páginas web',
    description:
      'Diseñamos páginas web informativas para negocios, con secciones de servicios, contacto, imágenes, ubicación y botones de comunicación directa.',
  },
  {
    icon: <IconSeguridad />,
    title: 'Ciberseguridad básica',
    description:
      'Ayudamos a proteger equipos e información mediante buenas prácticas, antivirus, contraseñas seguras, respaldos y revisión de configuraciones básicas.',
  },
  {
    icon: <IconMantenimiento />,
    title: 'Mantenimiento preventivo',
    description:
      'Revisamos el estado físico y lógico de los equipos para evitar fallas, pérdida de información o bajo rendimiento.',
  },
];

/* ── Component ────────────────────────────────────── */

export default function Services() {
  const gridRef = useRef(null);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" className={`section bg-glow ${styles.servicesSection}`}>
      <div className="container">
        {/* Header */}
        <div className="section-header fade-in-up">
          <h2>
            Nuestros <span className="gradient-text">servicios</span>
          </h2>
          <p>
            Ofrecemos servicios tecnológicos pensados para resolver problemas
            comunes en empresas pequeñas, negocios locales y usuarios que
            necesitan apoyo técnico confiable.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={gridRef}
          className={`${styles.servicesGrid} stagger-children`}
        >
          {services.map((service, index) => (
            <article
              key={index}
              className={`glass-card ${styles.serviceCard}`}
            >
              <div className={styles.iconWrap}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
