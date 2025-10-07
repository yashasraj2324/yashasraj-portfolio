'use client';

import { useEffect, useRef, useMemo, useState } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const smokeRef = useRef([]);
  const cursorParticlesRef = useRef([]);
  const isReducedMotion = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    if (!isClient) return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion.current = mediaQuery.matches;
    
    const handleChange = (e) => {
      isReducedMotion.current = e.matches;
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isClient]);

  // Memoize performance settings based on device capabilities
  const performanceSettings = useMemo(() => {
    if (!isClient) {
      return {
        maxNodes: 50,
        maxSmoke: 15,
        maxConnections: 150,
        animationSpeed: 1,
        skipFrames: 0,
      };
    }
    
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    
    return {
      maxNodes: isMobile ? 30 : isLowEnd ? 50 : 80,
      maxSmoke: isMobile ? 8 : isLowEnd ? 15 : 28,
      maxConnections: isMobile ? 80 : 150,
      animationSpeed: isMobile ? 0.5 : 1,
      skipFrames: isMobile ? 2 : 0,
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: false, 
      desynchronized: true,
      powerPreference: 'low-power'
    });
    let width, height, dpr;
    let frameCount = 0;

    // Resize canvas function
    const resizeCanvas = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      width = Math.floor(window.innerWidth);
      height = Math.floor(window.innerHeight);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Initialize canvas size
    resizeCanvas();

    // Mouse tracking for cursor particles
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      // Create cursor particles
      if (cursorParticlesRef.current.length < 35) {
        cursorParticlesRef.current.push(new CursorParticle(e.clientX, e.clientY));
      }
    };

    // Node class for neural network
    class Node {
      constructor() {
        const sidebarWidth = window.innerWidth >= 1024 ? 288 : 0;
        this.x = Math.random() * (width - sidebarWidth) + sidebarWidth;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += 0.02;

        const sidebarWidth = window.innerWidth >= 1024 ? 288 : 0;

        // Bounce off edges (excluding sidebar area)
        if (this.x < sidebarWidth || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Keep within bounds (excluding sidebar area)
        this.x = Math.max(sidebarWidth, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }

      draw() {
        // Draw visible black neuron with subtle outline
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, 1)`; // Fully opaque black
        ctx.fill();
        
        // Add subtle border for better visibility
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 0, 0, 0.3)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // Cursor particle class
    class CursorParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = 0.02 + Math.random() * 0.02;
        this.radius = 1 + Math.random() * 1.5;
        this.color = `rgba(0, 0, 0, 0.8)`; // Black color
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.life -= this.decay;
        return this.life > 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * this.life, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    // Smokey particle (large blurred circles drifting slowly)
    class SmokeParticle {
      constructor() {
        const sidebarWidth = window.innerWidth >= 1024 ? 288 : 0;
        this.reset(sidebarWidth);
      }

      reset(sidebarWidth = 0) {
        sidebarWidth = window.innerWidth >= 1024 ? 288 : 0;
        this.x = Math.random() * (width - sidebarWidth) + sidebarWidth;
        this.y = Math.random() * height;
        this.baseRadius = 120 + Math.random() * 220;
        this.radiusJitter = 0.85 + Math.random() * 0.3;
        this.speed = 0.1 + Math.random() * 0.25;
        this.dir = Math.random() * Math.PI * 2;
        this.turn = (Math.random() - 0.5) * 0.002;
        this.opacity = 0.04 + Math.random() * 0.06;
        this.tx = Math.random() * 10000;
      }

      update(dt) {
        this.dir += this.turn * dt;
        this.x += Math.cos(this.dir) * this.speed * dt;
        this.y += Math.sin(this.dir) * this.speed * dt;
        this.tx += 0.0006 * dt;

        // Wrap around edges (excluding sidebar area)
        const sidebarWidth = window.innerWidth >= 1024 ? 288 : 0;
        if (this.x < sidebarWidth - this.baseRadius) this.x = width + this.baseRadius;
        if (this.x > width + this.baseRadius) this.x = sidebarWidth - this.baseRadius;
        if (this.y < -this.baseRadius) this.y = height + this.baseRadius;
        if (this.y > height + this.baseRadius) this.y = -this.baseRadius;
      }

      draw() {
        const r = this.baseRadius * (0.9 + Math.sin(this.tx) * 0.1) * this.radiusJitter;
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
        grad.addColorStop(0, `rgba(0, 0, 0, ${this.opacity})`);
        grad.addColorStop(0.4, `rgba(0, 0, 0, ${this.opacity * 0.6})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create nodes with performance-based limits
    function createNodes() {
      const nodeCount = Math.min(performanceSettings.maxNodes, Math.floor((width * height) / 15000));
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push(new Node());
      }
    }

    // Create smokey particles with performance limits
    function createSmoke() {
      const area = width * height;
      const smokeCount = Math.min(performanceSettings.maxSmoke, Math.max(8, Math.floor(area / 80000)));
      smokeRef.current = [];
      for (let i = 0; i < smokeCount; i++) {
        smokeRef.current.push(new SmokeParticle());
      }
    }

    // Build scene initially and on resize
    const handleResize = () => {
      resizeCanvas();
      createNodes();
      createSmoke();
    };

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Build initial scene
    createNodes();
    createSmoke();

    // Optimized connection drawing with early exit and batching
    const drawConnections = () => {
      const maxDistance = performanceSettings.maxConnections;
      const nodes = nodesRef.current;
      let connectionCount = 0;
      const maxConnections = performanceSettings.maxNodes * 2;

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();

      for (let i = 0; i < nodes.length && connectionCount < maxConnections; i++) {
        for (let j = i + 1; j < nodes.length && connectionCount < maxConnections; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];

          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distanceSquared = dx * dx + dy * dy;
          const maxDistanceSquared = maxDistance * maxDistance;

          if (distanceSquared < maxDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = (1 - distance / maxDistance) * 0.15;
            
            if (opacity > 0.05) {
              ctx.globalAlpha = opacity * 2;
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              connectionCount++;
            }
          }
        }
      }
      
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    let lastTs = 0;

    // Optimized animation loop with frame skipping
    const animate = (ts = 0) => {
      frameCount++;
      
      // Skip frames on mobile for better performance
      if (performanceSettings.skipFrames > 0 && frameCount % (performanceSettings.skipFrames + 1) !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Pause animation if reduced motion is preferred
      if (isReducedMotion.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const dt = Math.min(33, ts - lastTs || 16.7) * performanceSettings.animationSpeed;
      lastTs = ts;

      // Clear canvas
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, width, height);

      // Set clipping area to exclude sidebar on desktop
      ctx.save();
      const sidebarWidth = window.innerWidth >= 1024 ? 288 : 0;
      ctx.beginPath();
      ctx.rect(sidebarWidth, 0, width - sidebarWidth, height);
      ctx.clip();

      // Draw smokey layer
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      smokeRef.current.forEach(p => {
        p.update(dt);
        p.draw();
      });
      ctx.restore();

      // Update and draw nodes
      ctx.save();
      nodesRef.current.forEach(node => {
        node.update();
        node.draw();
      });
      ctx.restore();

      // Draw connections
      drawConnections();

      ctx.restore();

      // Update and draw cursor particles (outside clipping area)
      cursorParticlesRef.current = cursorParticlesRef.current.filter(particle => {
        const alive = particle.update();
        if (alive) particle.draw();
        return alive;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient, performanceSettings]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}