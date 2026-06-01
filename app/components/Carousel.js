'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css';

const slides = [
  {
    src: '/images/soporte-tecnico.png',
    alt: 'Soporte técnico para computadoras y usuarios',
    text: 'Soporte técnico para computadoras y usuarios.',
  },
  {
    src: '/images/redes.png',
    alt: 'Instalación y organización de redes',
    text: 'Instalación y organización de redes.',
  },
  {
    src: '/images/pagina-web.png',
    alt: 'Páginas web para negocios y servicios',
    text: 'Páginas web para negocios y servicios.',
  },
  {
    src: '/images/ciberseguridad.png',
    alt: 'Ciberseguridad básica para proteger información',
    text: 'Ciberseguridad básica para proteger información.',
  },
];

const AUTOPLAY_INTERVAL = 5000;

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  const total = slides.length;

  /* ---- Navigation helpers ---- */
  const goTo = useCallback((index) => {
    setCurrent((index + total) % total);
    setProgress(0);
    startTimeRef.current = null;
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  /* ---- Auto-play with progress bar ---- */
  useEffect(() => {
    if (isPaused) {
      cancelAnimationFrame(progressRef.current);
      clearTimeout(timerRef.current);
      return;
    }

    startTimeRef.current = Date.now();

    const animateProgress = () => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(animateProgress);
      }
    };

    progressRef.current = requestAnimationFrame(animateProgress);

    timerRef.current = setTimeout(() => {
      next();
    }, AUTOPLAY_INTERVAL);

    return () => {
      cancelAnimationFrame(progressRef.current);
      clearTimeout(timerRef.current);
    };
  }, [current, isPaused, next]);

  /* ---- Keyboard navigation ---- */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    },
    [prev, next],
  );

  return (
    <section
      className={styles.carouselSection}
      aria-label="Soluciones tecnológicas"
      id="soluciones-carousel"
    >
      {/* ---- Section header ---- */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          Soluciones tecnológicas para el mundo real
        </h2>
        <p className={styles.intro}>
          La tecnología forma parte de casi todas las actividades diarias. Por
          eso, una empresa necesita equipos funcionales, una red estable, una
          página web clara y medidas básicas de seguridad digital.
        </p>
      </div>

      {/* ---- Carousel body ---- */}
      <div
        className={styles.carouselContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          startTimeRef.current = Date.now() - (progress / 100) * AUTOPLAY_INTERVAL;
        }}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={handleKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Soluciones de CyberShield"
        tabIndex={0}
      >
        <div className={styles.viewport}>
          {/* Track */}
          <div
            className={styles.track}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={slide.src}
                className={styles.slide}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} de ${total}`}
                aria-hidden={i !== current}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    className={styles.slideImage}
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    priority={i === 0}
                  />

                  {/* Glassmorphism overlay */}
                  <div className={styles.overlay}>
                    <p className={styles.overlayText}>{slide.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Counter badge */}
          <span className={styles.counter} aria-live="polite">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          {/* Progress bar */}
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          />

          {/* Arrows */}
          <button
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={prev}
            aria-label="Slide anterior"
          >
            ‹
          </button>
          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={next}
            aria-label="Siguiente slide"
          >
            ›
          </button>
        </div>
      </div>

      {/* ---- Dots ---- */}
      <div className={styles.dots} role="tablist" aria-label="Slides de soluciones">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
