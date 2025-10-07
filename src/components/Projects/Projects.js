'use client';

import { useRef, useState, useEffect, useCallback, memo } from 'react';
import { GitHubIcon } from '@/components/Icons';

// Memoized project card component
const ProjectCard = memo(({ project, index }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
    <h3 className="text-xl font-semibold text-gray-900 mb-3">
      {project.title}
    </h3>
    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.technologies.map((tech, techIndex) => (
        <span
          key={techIndex}
          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
        >
          {tech}
        </span>
      ))}
    </div>
    <div className="flex items-center gap-4 pt-2">
      {project.links.github && (
        <a
          href={project.links.github}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
        >
          <GitHubIcon className="w-4 h-4 mr-2" />
          GitHub
        </a>
      )}
      <a
        href={project.links.demo || '#'}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Demo
      </a>
    </div>
  </div>
));

export default function Projects() {
  const projects = [
    {
      title: "Neural Style Transfer",
      description: "AI-powered artistic style transformation using deep learning",
      technologies: ["Computer Vision", "Deep Learning", "PyTorch"],
      links: {
        github: "#",
        demo: "#"
      }
    },
    {
      title: "Sentiment Analysis API",
      description: "Real-time sentiment analysis for social media monitoring",
      technologies: ["NLP", "FastAPI", "Transformers"],
      links: {
        github: "#",
        demo: "#"
      }
    },
    {
      title: "Predictive Maintenance",
      description: "ML system for equipment failure prediction in manufacturing",
      technologies: ["Machine Learning", "Time Series", "scikit-learn"],
      links: {
        github: "#"
      }
    },
    {
      title: "Document Classification",
      description: "Automated document categorization using transformer models",
      technologies: ["NLP", "BERT", "Classification"],
      links: {
        github: "#",
        demo: "#"
      }
    },
    {
      title: "Recommendation Engine",
      description: "Collaborative filtering system for e-commerce platforms",
      technologies: ["Recommendation Systems", "Matrix Factorization", "Python"],
      links: {
        github: "#"
      }
    },
    {
      title: "AI Chat Assistant",
      description: "Conversational AI powered by large language models",
      technologies: ["Generative AI", "LangChain", "OpenAI"],
      links: {
        github: "#",
        demo: "#"
      }
    },
    {
      title: "AI Chat Assistant",
      description: "Conversational AI powered by large language models",
      technologies: ["Generative AI", "LangChain", "OpenAI"],
      links: {
        github: "#",
        demo: "#"
      }
    }
    
  ];

  const trackRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const [pageOffsets, setPageOffsets] = useState([]);
  const scrollRaf = useRef(null);

  // Use projects as-is without duplication
  const data = projects;
  // Chunk into pages of 6 (3 columns x 2 rows)
  const pages = [];
  for (let i = 0; i < data.length; i += 6) {
    pages.push(data.slice(i, i + 6));
  }

  const computeOffsets = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const children = Array.from(el.children);
    const offsets = children.map((ch) => ch.offsetLeft);
    setPageOffsets(offsets);
  }, []);

  useEffect(() => {
    computeOffsets();
    const el = trackRef.current;
    if (!el) return;
    
    let timeoutId;
    const debouncedComputeOffsets = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(computeOffsets, 100);
    };
    
    const ro = new ResizeObserver(debouncedComputeOffsets);
    ro.observe(el);
    window.addEventListener('resize', debouncedComputeOffsets);
    
    return () => {
      clearTimeout(timeoutId);
      ro.disconnect();
      window.removeEventListener('resize', debouncedComputeOffsets);
    };
  }, [data.length, computeOffsets]);

  const handleScroll = useCallback(() => {
    if (scrollRaf.current) return;
    scrollRaf.current = requestAnimationFrame(() => {
      const el = trackRef.current;
      if (!el) { 
        scrollRaf.current = null; 
        return; 
      }
      
      const left = el.scrollLeft;
      if (pageOffsets.length) {
        let idx = 0;
        let min = Infinity;
        for (let i = 0; i < pageOffsets.length; i++) {
          const d = Math.abs(pageOffsets[i] - left);
          if (d < min) { 
            min = d; 
            idx = i; 
          }
        }
        setActivePage(idx);
      } else {
        const ratio = (el.scrollWidth - el.clientWidth) ? left / (el.scrollWidth - el.clientWidth) : 0;
        setActivePage(Math.round(ratio * (pages.length - 1)));
      }
      scrollRaf.current = null;
    });
  }, [pageOffsets, pages.length]);

  const goToPage = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const target = pageOffsets[i] ?? i * el.clientWidth;
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (!pages.length) return;
    goToPage(Math.max(0, activePage - 1));
  };
  const handleNextPage = () => {
    if (!pages.length) return;
    goToPage(Math.min(pages.length - 1, activePage + 1));
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center px-4 lg:px-16 py-8 lg:py-12">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">Projects</h2>
          <div className="w-16 h-1 bg-gray-900 mx-auto"></div>
        </div>

        <div className="relative">
          {/* Side arrows */}
          {pages.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous page"
                onClick={handlePrevPage}
                disabled={activePage === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full text-black hover:bg-black/10 focus:outline-none ${activePage === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next page"
                onClick={handleNextPage}
                disabled={activePage === pages.length - 1}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full text-black hover:bg-black/10 focus:outline-none ${activePage === pages.length - 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Horizontal slider */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory flex gap-8 pb-2"
          >
            {pages.map((page, pageIndex) => (
              <div key={pageIndex} className="snap-start shrink-0 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-6">
                  {page.map((project, index) => (
                    <ProjectCard 
                      key={`${pageIndex}-${index}`} 
                      project={project} 
                      index={index} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            {pages.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goToPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${activePage === i ? 'bg-gray-900 scale-110' : 'bg-gray-300 hover:bg-gray-500'}`}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}