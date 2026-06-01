import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Infrastructure from './components/Infrastructure';
import Benefits from './components/Benefits';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollAnimations from './components/ScrollAnimations';

export default function Home() {
  return (
    <>
      {/* Scroll Animations Trigger */}
      <ScrollAnimations />

      {/* Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Carousel */}
        <Carousel />

        {/* Section 3: About (¿Quiénes somos?) */}
        <About />

        {/* Section 4: Services */}
        <Services />

        {/* Section 5: Process (¿Cómo trabajamos?) */}
        <Process />

        {/* Section 6: Infrastructure */}
        <Infrastructure />

        {/* Section 7: Benefits */}
        <Benefits />

        {/* Section 8: Location */}
        <Location />

        {/* Section 9: Contact */}
        <Contact />
      </main>

      {/* Section 10: Footer */}
      <Footer />
    </>
  );
}
