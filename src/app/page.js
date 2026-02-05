'use client';

import { useState, useEffect, useCallback, lazy, Suspense, memo } from 'react';
import { Sidebar, Hero, AnimatedBackground, FloatingButtons } from '@/components';
import { NAVIGATION_ITEMS } from '@/constants';


// Lazy load heavy components
const About = lazy(() => import('@/components/About/About'));
const Experience = lazy(() => import('@/components/Experience/Experience'));
const Projects = lazy(() => import('@/components/Projects/Projects'));
const Skills = lazy(() => import('@/components/Skills/Skills'));
const Certifications = lazy(() => import('@/components/Certifications/Certifications'));
const Contact = lazy(() => import('@/components/Contact/Contact'));
const Footer = lazy(() => import('@/components/Footer/Footer'));
const HangingBoard = lazy(() => import('@/components/HangingBoard/HangingBoard'));
const ScrollRotatingElements = lazy(() => import('@/components/ScrollRotatingElements/ScrollRotatingElements'));

// Loading component
const SectionLoader = memo(() => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
));

export default function Home() {
  const [activeSection, setActiveSection] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smoothly scroll to a section by name (Home, About, ...)
  const scrollToSection = useCallback((name) => {
    const id = name.toLowerCase();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  }, []);

  // Observe section visibility and update activeSection while scrolling
  useEffect(() => {
    const ids = NAVIGATION_ITEMS.map(n => n.toLowerCase());
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(e => e.isIntersecting);
      if (visibleEntries.length === 0) return;

      // Pick the section with the highest visibility
      const top = visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const id = top.target.id;
      const name = NAVIGATION_ITEMS.find(n => n.toLowerCase() === id);
      if (name && name !== activeSection) {
        setActiveSection(name);
      }
    }, { root: null, threshold: [0.25, 0.5, 0.75] });

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [activeSection]);

  // Provide a setter that also scrolls for Sidebar navigation
  const setActiveSectionAndScroll = useCallback((item) => {
    setActiveSection(item);
    scrollToSection(item);
  }, [scrollToSection]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col lg:flex-row relative">
      {/* Animated Neural Network Background */}
      <AnimatedBackground />

      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between order-1">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Yashas</h1>
          <p className="text-xs text-gray-500">AI/ML Engineer</p>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-button p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSectionAndScroll}
        navigationItems={NAVIGATION_ITEMS}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Single-page stacked sections */}
      <div className="flex-1 flex flex-col order-2 lg:order-none relative z-10">
        <section id="home" className="min-h-screen relative">
          <Hero />
          <Suspense fallback={null}>
            <HangingBoard />
          </Suspense>
        </section>

        <Suspense fallback={<SectionLoader />}>
          <section id="about" className="min-h-screen">
            <About />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="experience">
            <Experience />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="projects">
            <Projects />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="skills">
            <Skills />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="certifications" className="min-h-screen">
            <Certifications />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <section id="contact">
            <Contact />
          </section>
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </div>

      <FloatingButtons />

      {/* Scroll-triggered rotating elements */}
      <Suspense fallback={null}>
        <ScrollRotatingElements />
      </Suspense>

      {/* Scroll Indicator */}
      <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-3">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === item
                ? 'bg-gray-900 scale-125'
                : 'bg-gray-300 hover:bg-gray-500'
                }`}
              title={item}
            />
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      {activeSection === 'Home' && (
        <div className="hidden lg:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
          <div className="flex flex-col items-center text-gray-500">
            <span className="text-sm mb-2">Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}