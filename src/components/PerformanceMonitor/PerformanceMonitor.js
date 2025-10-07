'use client';

import { useEffect, useState } from 'react';

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0,
  });

  useEffect(() => {
    // Track page load performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime }));
    }

    // FPS monitoring
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = (currentTime) => {
      frameCount++;

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    // Memory monitoring (if available)
    const updateMemory = () => {
      if ('memory' in performance) {
        const memory = Math.round(performance.memory.usedJSHeapSize / 1048576); // MB
        setMetrics(prev => ({ ...prev, memory }));
      }
    };

    const memoryInterval = setInterval(updateMemory, 2000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(memoryInterval);
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div>FPS: {metrics.fps}</div>
      <div>Memory: {metrics.memory}MB</div>
      <div>Load: {metrics.loadTime}ms</div>
    </div>
  );
}