'use client';

import { useState, useEffect, useRef } from 'react';
import { DownloadIcon, ChevronDownIcon } from '@/components/Icons';

export default function Hero() {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastUpdateRef = useRef(0);
  const pauseStartRef = useRef(0);

  const texts = [
    'AI/ML Engineer',
    'Data Scientist',
    'Deep Learning Expert',
    'NLP Specialist',
    'Computer Vision Developer',
    'Python Developer'
  ];

  // Ultra-smooth typing animation using requestAnimationFrame
  useEffect(() => {
    const animate = (timestamp) => {
      const current = texts[currentIndex];
      const typingSpeed = isDeleting ? 40 : 100; // ms per character
      const pauseDuration = 2000; // pause at end of word

      if (timestamp - lastUpdateRef.current >= typingSpeed) {
        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1));
        } else {
          setCurrentText(current.substring(0, currentText.length + 1));
        }
        lastUpdateRef.current = timestamp;
      }

      // Handle state transitions
      if (!isDeleting && currentText === current) {
        if (!pauseStartRef.current) {
          pauseStartRef.current = timestamp;
        } else if (timestamp - pauseStartRef.current >= pauseDuration) {
          setIsDeleting(true);
          pauseStartRef.current = 0;
        }
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        pauseStartRef.current = 0;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentText, currentIndex, isDeleting, texts]);

  // Particle cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create multiple particles for richer effect
      for (let i = 0; i < 3; i++) {
        const newParticle = {
          id: Date.now() + Math.random() + i,
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 1,
          decay: 0.015 + Math.random() * 0.01,
          size: Math.random() * 4 + 2
        };

        setParticles(prev => [...prev.slice(-30), newParticle]);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - particle.decay,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98
          }))
          .filter(particle => particle.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen flex items-center justify-center px-4 lg:px-16 py-8 lg:py-12 relative overflow-hidden cursor-none"
    >
      {/* Particle Animation */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none bg-black rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            transform: 'translate(-50%, -50%)',
            opacity: particle.life,
            boxShadow: `0 0 ${particle.size * 2}px rgba(0,0,0,${particle.life * 0.3})`
          }}
        />
      ))}
      <div className="max-w-6xl w-full flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full">
          {/* Content - Desktop Left */}
          <div className="flex-1 max-w-xl text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center">
            <div className="mb-8 lg:mb-10">
              <p className="text-gray-600 text-base lg:text-lg mb-2 lg:mb-3">Hi, I'm</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 lg:mb-6">Yashas Raj</h2>

              {/* Typing Animation */}
              <div className="mb-6 lg:mb-8 h-8 lg:h-10 flex items-center justify-center lg:justify-start">
                <span className="text-xl lg:text-2xl font-medium text-blue-600 inline-block min-w-0">
                  <span className="transition-all duration-75 ease-linear">{currentText}</span>
                  <span className="animate-pulse text-blue-600 ml-1 inline-block w-0.5 h-6 lg:h-7 bg-blue-600 align-middle"></span>
                </span>
              </div>

              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mx-auto lg:mx-0 max-w-lg">
                Passionate about transforming data into intelligent systems and building AI solutions that solve real-world problems.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 justify-center lg:justify-start items-center lg:items-start">
              <button className="bg-black text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 font-medium w-full sm:w-auto">
                View Projects
                <ChevronDownIcon />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-6 lg:px-8 py-3 lg:py-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 font-medium w-full sm:w-auto">
                <DownloadIcon />
                Download Resume
              </button>
            </div>
          </div>

          {/* Profile Image - Desktop Right */}
          <div className="flex-shrink-0 order-1 lg:order-2 flex items-center justify-center">
            <div className="w-64 h-64 lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
              <img
                src="/profile-placeholder.svg"
                alt="Yashas Profile"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}