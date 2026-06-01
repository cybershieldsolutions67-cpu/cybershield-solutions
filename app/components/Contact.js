'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
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

    const animatedElements = sectionRef.current?.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-children'
    );
    animatedElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Frontend only — no backend
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section id="contacto" className={`${styles.contactSection} circuits-bg`} ref={sectionRef}>
      <div className={styles.container}>
        {/* Section Label */}
        <div className={`${styles.sectionLabel} fade-in-up`}>
          <span className={styles.labelDot}></span>
          Contacto
        </div>

        {/* Section Header */}
        <div className={`${styles.sectionHeader} fade-in-up`}>
          <h2 className={styles.title}>
            <span className={styles.titleAccent}>Contáctanos</span>
          </h2>
          <p className={styles.subtitle}>
            Si necesitas soporte técnico, instalación de red, una página web o
            asesoría básica en seguridad digital, puedes comunicarte con
            nosotros.
          </p>
        </div>

        <div className={styles.splitGrid}>
          {/* ============ Form Side (Left) ============ */}
          <div className={`${styles.formCard} fade-in-left`}>
            <h3 className={styles.formTitle}>
              <span className={styles.formTitleIcon}>✉️</span>
              Envíanos un mensaje
            </h3>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="contact-name">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="contact-email">
                  Correo electrónico
                </label>
                <input
                  id="contact-email"
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel} htmlFor="contact-message">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  className={styles.textarea}
                  name="message"
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                {submitted ? '✓ Mensaje enviado' : 'Enviar mensaje'}
              </button>
            </form>
          </div>

          {/* ============ Info Side (Right) ============ */}
          <div className={`${styles.infoContent} stagger-children fade-in-right`}>
            {/* Email Card */}
            <div className={styles.contactCard}>
              <div className={styles.cardIcon} aria-hidden="true">
                📧
              </div>
              <div>
                <p className={styles.cardLabel}>Correo electrónico</p>
                <a
                  href="mailto:contacto@cybershieldsolutions.com"
                  className={styles.cardLink}
                >
                  contacto@cybershieldsolutions.com
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className={styles.contactCard}>
              <div className={styles.cardIcon} aria-hidden="true">
                💬
              </div>
              <div>
                <p className={styles.cardLabel}>WhatsApp</p>
                <p className={styles.cardValue}>55 1234 5678</p>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/5512345678"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <span className={styles.whatsappIcon}>💬</span>
              Enviar mensaje por WhatsApp
            </a>

            {/* Closing */}
            <div className={styles.closingCard}>
              <p className={styles.closingText}>
                <span className={styles.closingBrand}>
                  CyberShield Solutions
                </span>
                : tecnología segura, clara y funcional para tu negocio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
