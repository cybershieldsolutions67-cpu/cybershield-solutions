'use client';

import { useEffect, useRef } from 'react';
import styles from './Location.module.css';

export default function Location() {
  const sectionRef = useRef(null);

  useEffect(() => {
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

    const animatedElements = sectionRef.current?.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-children'
    );
    animatedElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="ubicacion" className={styles.locationSection} ref={sectionRef}>
      <div className={styles.container}>
        {/* Section Label */}
        <div className={`${styles.sectionLabel} fade-in-up`}>
          <span className={styles.labelDot}></span>
          Ubicación
        </div>

        <div className={styles.splitGrid}>
          {/* --- Info Side --- */}
          <div className={`${styles.infoContent} fade-in-left`}>
            <h2 className={styles.title}>
              Ubicación de la{' '}
              <span className={styles.titleAccent}>empresa</span>
            </h2>

            <p className={styles.paragraph}>
              CyberShield Solutions se ubica en la Ciudad de México, cerca de
              una zona con acceso a transporte, negocios, escuelas y oficinas.
            </p>

            {/* Address Card */}
            <div className={styles.addressCard}>
              <div className={styles.pinIcon} aria-hidden="true">
                📍
              </div>
              <div>
                <p className={styles.addressLabel}>Dirección</p>
                <p className={styles.addressText}>
                  Av. Instituto Politécnico Nacional, Ciudad de México, México.
                </p>
              </div>
            </div>

            <p className={styles.paragraph}>
              Consulta nuestra ubicación de referencia en el mapa.
            </p>
          </div>

          {/* --- Map Side --- */}
          <div className={`${styles.mapWrapper} fade-in-right`}>
            <div className={styles.mapGlassCard}>
              <iframe
                className={styles.mapFrame}
                title="Ubicación de CyberShield Solutions"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15042.123456!2d-99.15!3d19.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92b1a13!2sAv.+Instituto+Polit%C3%A9cnico+Nacional%2C+Ciudad+de+M%C3%A9xico!5e0!3m2!1ses!2smx!4v1700000000000"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className={styles.mapBadge}>
              <span className={styles.badgeIcon}>🗺️</span>
              CDMX, México
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
