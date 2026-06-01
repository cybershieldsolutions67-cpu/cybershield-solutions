'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Process.module.css';

const STEPS = [
  {
    number: '01',
    title: '1. Diagnóstico',
    desc: 'Revisamos la situación actual del cliente, sus equipos, red, página web o necesidades de seguridad.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h.01M15 10h.01M12 12h.01" />
      </svg>
    )
  },
  {
    number: '02',
    title: '2. Propuesta',
    desc: 'Explicamos qué se necesita mejorar, qué herramientas se usarán y cuál será el costo aproximado del servicio.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    number: '03',
    title: '3. Implementación',
    desc: 'Realizamos la instalación, configuración, reparación o desarrollo necesario.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    number: '04',
    title: '4. Seguimiento',
    desc: 'Verificamos que todo funcione correctamente y damos recomendaciones para prevenir futuros problemas.',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  }
];

export default function Process() {
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
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
    <section id="proceso" className={styles.process}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header fade-in-up">
          <h2>
            ¿Cómo <span>trabajamos</span>?
          </h2>
          <p>
            Nuestro proceso está diseñado para entender el problema, proponer una solución y aplicar mejoras de forma ordenada.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className={styles.timeline}>
          <div
            ref={containerRef}
            className={`${styles.stepsGrid} stagger-children`}
          >
            {STEPS.map((step, idx) => (
              <div key={idx} className={styles.step}>
                {/* Step Circle Indicator */}
                <div className={styles.circle}>
                  {step.number}
                </div>

                {/* Step Card */}
                <div className={styles.card}>
                  <div className={styles.icon}>
                    {step.icon}
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
