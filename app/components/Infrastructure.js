'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Infrastructure.module.css';

/* ── Topology SVGs ── */
const CloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const ModemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="14" width="20" height="6" rx="2" />
    <path d="M6 17h.01M10 17h.01M14 17h.01" />
  </svg>
);

const RouterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="14" width="20" height="6" rx="2" />
    <path d="M20 14V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v6" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

const SwitchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="8" width="22" height="8" rx="2" />
    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
    <circle cx="10" cy="12" r="1.5" fill="currentColor" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" />
    <circle cx="20" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const ComputerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const PrinterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const ServerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="2" width="16" height="6" rx="1.5" />
    <rect x="4" y="9" width="16" height="6" rx="1.5" />
    <rect x="4" y="16" width="16" height="6" rx="1.5" />
  </svg>
);

const WifiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.1a6 6 0 0 1 6.94 0" />
    <circle cx="12" cy="20" r="1" fill="currentColor" />
  </svg>
);

export default function Infrastructure() {
  const topologyRef = useRef(null);

  useEffect(() => {
    const node = topologyRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="infraestructura" className={styles.infraSection}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header fade-in-up">
          <h2>
            Nuestra <span>infraestructura</span>
          </h2>
          <p>
            Para operar correctamente, CyberShield Solutions cuenta con una oficina equipada con computadoras de trabajo, conexión a internet, router, switch, cableado de red, rack de comunicaciones y herramientas para soporte técnico.
          </p>
        </div>

        {/* Interactive network diagram */}
        <div
          ref={topologyRef}
          className={`${styles.topologyContainer} stagger-children`}
        >
          <h3 className={styles.diagramTitle}>Topología de Red Interna</h3>

          <div className={styles.diagramWrapper}>
            {/* Row 1: Flow Backbone (Internet -> Modem -> Router -> Switch) */}
            <div className={styles.backboneRow}>
              
              {/* Node 1: Internet */}
              <div className={`${styles.node} ${styles.yellowBorder}`}>
                <div className={styles.nodeIcon}>
                  <CloudIcon />
                </div>
                <span className={styles.nodeLabel}>Internet (Fibra Óptica)</span>
              </div>

              {/* Connecting Line */}
              <div className={styles.connectionLine} />

              {/* Node 2: Módem */}
              <div className={`${styles.node} ${styles.yellowBorder}`}>
                <div className={styles.nodeIcon}>
                  <ModemIcon />
                </div>
                <span className={styles.nodeLabel}>Módem</span>
              </div>

              {/* Connecting Line */}
              <div className={styles.connectionLine} />

              {/* Node 3: Router */}
              <div className={`${styles.node} ${styles.yellowBorder}`}>
                <div className={styles.nodeIcon}>
                  <RouterIcon />
                </div>
                <span className={styles.nodeLabel}>Router Empresarial</span>
              </div>

              {/* Connecting Line */}
              <div className={styles.connectionLine} />

              {/* Node 4: Switch */}
              <div className={`${styles.node} ${styles.yellowBorder} ${styles.activeNode}`}>
                <div className={styles.nodeIcon}>
                  <SwitchIcon />
                </div>
                <span className={styles.nodeLabel}>Switch Gigabit</span>
              </div>

            </div>

            {/* Vertical connector line on Switch */}
            <div className={styles.verticalBridge} />

            {/* Row 2: Sub-endpoints connected to the Switch */}
            <div className={styles.endpointsRow}>
              
              <div className={styles.endpointWrapper}>
                <div className={styles.branchLine} />
                <div className={`${styles.node} ${styles.yellowBorder}`}>
                  <div className={styles.nodeIcon}>
                    <ComputerIcon />
                  </div>
                  <span className={styles.nodeLabel}>Computadoras</span>
                </div>
              </div>

              <div className={styles.endpointWrapper}>
                <div className={styles.branchLine} />
                <div className={`${styles.node} ${styles.yellowBorder}`}>
                  <div className={styles.nodeIcon}>
                    <PrinterIcon />
                  </div>
                  <span className={styles.nodeLabel}>Impresora</span>
                </div>
              </div>

              <div className={styles.endpointWrapper}>
                <div className={styles.branchLine} />
                <div className={`${styles.node} ${styles.yellowBorder}`}>
                  <div className={styles.nodeIcon}>
                    <ServerIcon />
                  </div>
                  <span className={styles.nodeLabel}>Servidor local</span>
                </div>
              </div>

              <div className={styles.endpointWrapper}>
                <div className={styles.branchLine} />
                <div className={`${styles.node} ${styles.yellowBorder}`}>
                  <div className={styles.nodeIcon}>
                    <WifiIcon />
                  </div>
                  <span className={styles.nodeLabel}>WiFi (Access Point)</span>
                </div>
              </div>

            </div>

          </div>

          {/* Infrastructure footnotes */}
          <div className={styles.footnotes}>
            <p>* Toda la red está interconectada mediante cableado UTP categoría 6 en un rack de comunicaciones organizado y seguro.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
