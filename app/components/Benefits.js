'use client';

import { useEffect, useRef } from 'react';
import styles from './Benefits.module.css';

/* ── Inline SVG Icons ── */

function ChatSupportIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

/* ── Benefit data ── */

const benefits = [
  {
    id: 'atencion-clara',
    icon: ChatSupportIcon,
    title: 'Atención clara',
    description:
      'Explicamos los problemas técnicos de forma sencilla para que el cliente entienda qué sucede y cómo se solucionará.',
  },
  {
    id: 'prevencion-fallas',
    icon: ShieldCheckIcon,
    title: 'Prevención de fallas',
    description:
      'No solo reparamos; también ayudamos a prevenir problemas futuros en equipos, redes y sistemas.',
  },
  {
    id: 'seguridad-digital',
    icon: LockIcon,
    title: 'Seguridad digital',
    description:
      'Promovemos buenas prácticas para proteger información, contraseñas y dispositivos.',
  },
  {
    id: 'presencia-internet',
    icon: GlobeIcon,
    title: 'Presencia en internet',
    description:
      'Ayudamos a los negocios a tener una página web clara, visual y funcional.',
  },
];

/* ── Component ── */

export default function Benefits() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    /* Observe the stagger container */
    const stagger = section.querySelector('.stagger-children');
    if (stagger) observer.observe(stagger);

    /* Observe fade-in elements */
    section.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="beneficios" className="section bg-glow" ref={sectionRef}>
      <div className="container">
        {/* Section header */}
        <div className="section-header fade-in-up">
          <h2>
            ¿Por qué elegir{' '}
            <span className="gradient-text">CyberShield Solutions</span>?
          </h2>
          <p>
            Nos diferenciamos por un enfoque humano, preventivo y orientado a
            resultados reales para tu negocio.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className={`${styles.benefitsGrid} stagger-children`}>
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <article
                key={benefit.id}
                id={`benefit-${benefit.id}`}
                className={`glass-card ${styles.benefitCard}`}
              >
                <div className={styles.iconCircle}>
                  <IconComponent />
                </div>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
                <p className={styles.cardDescription}>{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
