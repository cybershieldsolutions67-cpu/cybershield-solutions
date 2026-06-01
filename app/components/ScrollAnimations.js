'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    // Select elements to animate
    const animators = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-children'
    );

    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -80px 0px', // slightly offset trigger point
      threshold: 0.1, // trigger when 10% is visible
    };

    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // If we only want to animate once, we unobserve
          self.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animators.forEach((el) => observer.observe(el));

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything visually
}
