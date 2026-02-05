'use client';

import { useEffect, useState } from 'react';

export default function ScrollRotatingElements() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate rotation based on scroll position with smoother multiplier
  const rotation = scrollY * 0.2; // Reduced for smoother rotation

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-10 pointer-events-none">
      {/* Connected Gears Container */}
      <div className="relative w-20 h-12 sm:w-24 sm:h-14">
        {/* Gear 1 - Left Position (Clockwise) */}
        <div 
          className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 opacity-70"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center center',
            willChange: 'transform'
          }}
        >
          <img 
            src="/image-removebg-preview (3).png" 
            alt="Gear 1" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Gear 2 - Right Position, Edge-to-Edge Meshing (Counter-clockwise) */}
        <div 
          className="absolute top-2 left-8 sm:top-2 sm:left-10 w-10 h-10 sm:w-12 sm:h-12 opacity-70"
          style={{
            transform: `rotate(${-rotation}deg)`, // Opposite direction for meshing
            transformOrigin: 'center center',
            willChange: 'transform'
          }}
        >
          <img 
            src="/image-removebg-preview (3).png" 
            alt="Gear 2" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Visual mesh point indicator */}
        <div 
          className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-30"
          style={{
            top: '1.25rem',
            left: '1.25rem',
            // Mesh point between the two gears
          }}
        ></div>
      </div>
    </div>
  );
}