'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './About.module.css';

/* -----------------------------------------------
   Animated Counter Hook
   Counts from 0 → target when the element scrolls
   into view, using requestAnimationFrame.
   ----------------------------------------------- */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, hasStarted]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [start]);

  return { ref, count };
}

/* Stats Data */
const STATS = [
  { value: 50, suffix: '+', label: 'Clientes' },
  { value: 100, suffix: '+', label: 'Proyectos' },
  { value: 99, suffix: '%', label: 'Satisfacción' },
];

function StatCard({ value, suffix, label }) {
  const { ref, count } = useCountUp(value, 2000);

  return (
    <div ref={ref} className={styles.statItem}>
      <span className={styles.statNumber}>
        {count}
        <span className={styles.statSuffix}>{suffix}</span>
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll(
      '.fade-in-up, .fade-in-right, .scale-in'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className={styles.aboutSection}
      aria-labelledby="about-title"
    >
      <div className={styles.container}>
        
        {/* Split Grid */}
        <div className={styles.splitGrid}>
          
          {/* Left: Text Content (animates with fade-in-up) */}
          <div className={`${styles.textContent} fade-in-up`}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelDot} />
              ¿Quiénes somos?
            </span>

            <h2 id="about-title" className={styles.title}>
              CyberShield <span className={styles.titleAccent}>Solutions</span>
            </h2>

            <p className={styles.paragraph}>
              CyberShield Solutions es una empresa tecnológica creada como proyecto escolar, enfocada en ofrecer soluciones de soporte técnico, redes, desarrollo web y ciberseguridad básica.
            </p>

            <p className={styles.paragraph}>
              La empresa está pensada para apoyar a pequeños negocios que necesitan mejorar su forma de trabajar con la tecnología, proteger sus datos y tener presencia en internet.
            </p>

            {/* School Team/Workplace illustration below the text */}
            <div className={styles.imageInner}>
              <Image
                src="/images/about-team.jpg"
                alt="Equipo de CyberShield Solutions trabajando en laptops"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className={styles.aboutImage}
                priority={false}
              />
              <div className={styles.imageOverlay} />
            </div>
          </div>

          {/* Right: Visual Card with Shield Icon + Frase Destacada (animates with fade-in-right) */}
          <div className={`${styles.visualCol} fade-in-right`}>
            <div className={`${styles.phraseCard} glass-card`}>
              <div className={styles.shieldIconWrapper}>
                <svg
                  className={styles.shieldIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="url(#aboutShieldGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11l2 2 4-4"
                    stroke="var(--yellow)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="aboutShieldGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--yellow)" />
                      <stop offset="1" stopColor="var(--red)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className={styles.phraseTitle}>Nuestra Visión</h3>
              <p className={styles.phraseText}>
                &ldquo;Tecnología, seguridad y soporte en un solo lugar.&rdquo;
              </p>
              
              <div className={styles.cardLines} aria-hidden="true" />
            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div className={`${styles.statsRow} fade-in-up`}>
          {STATS.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
