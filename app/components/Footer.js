import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <Image
                className={styles.logoIcon}
                src="/images/logo.png"
                alt="CyberShield Logo"
                width={24}
                height={24}
              />
              <span>CyberShield</span>
            </div>
            <p className={styles.brandDesc}>
              Tecnología segura, clara y funcional para tu negocio. Ofrecemos soporte técnico, redes, desarrollo web y ciberseguridad básica.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 className={styles.title}>Navegación</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a href="#hero">Inicio</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#servicios">Servicios</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#infraestructura">Infraestructura</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Social / Info Column */}
          <div>
            <h4 className={styles.title}>Redes Sociales</h4>
            <div className={styles.socials}>
              {/* Facebook */}
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; 2026 CyberShield Solutions. Todos los derechos reservados.
          </p>
          <span className={styles.meta}>
            Proyecto escolar de empresa tecnológica.
          </span>
        </div>
      </div>
    </footer>
  );
}
