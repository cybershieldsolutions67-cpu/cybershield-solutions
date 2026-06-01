'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Contact.module.css';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg('');
    setIsError(false);

    const { name, email, message } = formData;

    // 1. Client-Side Validations
    if (!name || name.trim().length === 0) {
      setIsError(true);
      setStatusMsg('El nombre es obligatorio.');
      setSubmitting(false);
      return;
    }
    if (name.length > 100) {
      setIsError(true);
      setStatusMsg('El nombre no debe exceder los 100 caracteres.');
      setSubmitting(false);
      return;
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      setIsError(true);
      setStatusMsg('Formato de correo electrónico inválido.');
      setSubmitting(false);
      return;
    }

    if (!message || message.trim().length === 0) {
      setIsError(true);
      setStatusMsg('El mensaje es obligatorio.');
      setSubmitting(false);
      return;
    }
    if (message.length > 1000) {
      setIsError(true);
      setStatusMsg('El mensaje no debe exceder los 1000 caracteres.');
      setSubmitting(false);
      return;
    }

    try {
      // 2. Dispatch real API request
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setIsError(true);
        setStatusMsg(result.error || 'Ocurrió un error inesperado al enviar.');
      } else {
        setIsError(false);
        setStatusMsg('✓ Mensaje enviado de forma segura con éxito.');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      setIsError(true);
      setStatusMsg('Error de red. Por favor compruebe su conexión e intente de nuevo.');
      console.error('[Network Error]', err);
    } finally {
      setSubmitting(false);
    }
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
            Si necesitas soporte técnico, instalación de red, una página web o asesoría básica en seguridad digital, puedes comunicarte con nosotros de forma segura.
          </p>
        </div>

        <div className={styles.splitGrid}>
          {/* ============ Form Side (Left) ============ */}
          <div className={`${styles.formCard} fade-in-left`}>
            <h3 className={styles.formTitle}>
              <span className={styles.formTitleIcon}>✉️</span>
              Envíanos un mensaje
            </h3>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
                  maxLength={100}
                  disabled={submitting}
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
                  disabled={submitting}
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
                  maxLength={1000}
                  disabled={submitting}
                  required
                />
              </div>

              {/* Status Message feedback panel */}
              {statusMsg && (
                <div 
                  className={styles.statusBox} 
                  style={{ color: isError ? 'var(--red)' : 'var(--yellow)', borderColor: isError ? 'var(--border-red)' : 'var(--border)' }}
                >
                  {statusMsg}
                </div>
              )}

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={submitting}
              >
                {submitting ? 'Enviando de forma segura...' : 'Enviar mensaje'}
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
