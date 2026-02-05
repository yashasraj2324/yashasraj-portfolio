'use client';

import { BookOpen, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HangingBoard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Mock Medium posts - Replace with actual Medium RSS feed integration
    // You can use a service like https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@yourusername/feed
    const mockPosts = [
      {
        title: "Building AI-Powered Applications with Python",
        link: "https://medium.com/@yashasraj/building-ai-powered-applications",
        pubDate: "2024-01-15"
      },
      {
        title: "Deep Learning Best Practices for Production",
        link: "https://medium.com/@yashasraj/deep-learning-production", 
        pubDate: "2024-01-10"
      },
      {
        title: "Computer Vision in Healthcare: A Case Study",
        link: "https://medium.com/@yashasraj/computer-vision-healthcare",
        pubDate: "2024-01-05"
      },
      {
        title: "The Future of NLP: Trends and Predictions",
        link: "https://medium.com/@yashasraj/future-of-nlp",
        pubDate: "2023-12-28"
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 500);
  }, []);

  // Auto-rotate posts every 4 seconds
  useEffect(() => {
    if (posts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [posts.length]);

  return (
    <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      {/* Ropes/Chains */}
      <div className="flex justify-between w-[240px] sm:w-[280px] px-8">
        <div className="w-[2px] h-10 bg-gradient-to-b from-gray-400 to-gray-600 relative">
          {/* Chain links effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 border-2 border-gray-500 rounded-full bg-white"></div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 border-2 border-gray-500 rounded-full bg-white"></div>
        </div>
        <div className="w-[2px] h-10 bg-gradient-to-b from-gray-400 to-gray-600 relative">
          {/* Chain links effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 border-2 border-gray-500 rounded-full bg-white"></div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 border-2 border-gray-500 rounded-full bg-white"></div>
        </div>
      </div>

      {/* Hanging Board */}
      <div className="relative pointer-events-auto">
        {/* Board Shadow */}
        <div className="absolute inset-0 bg-black opacity-10 blur-md transform translate-y-1"></div>

        {/* Main Board */}
        <div className="relative bg-white border-4 border-black rounded-lg shadow-2xl overflow-hidden animate-swing">
          {/* Wood texture effect with minimalist stripes */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-100"></div>
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)'
              }}
            ></div>
          </div>

          {/* Content */}
          <div className="relative px-4 py-2.5 w-[240px] sm:w-[280px]">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2 pb-2 border-b-2 border-gray-200">
              <BookOpen className="w-4 h-4" />
              <h3 className="text-xs tracking-tight">Latest Posts</h3>
            </div>

            {/* Posts Carousel - One at a time */}
            <div className="relative h-16 overflow-hidden">
              {loading ? (
                <div className="space-y-1.5">
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              ) : (
                <div className="absolute inset-0">
                  {posts[currentIndex] && (
                    <a
                      key={currentIndex}
                      href={posts[currentIndex]?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block group absolute inset-0 transition-all duration-300 ease-in-out ${
                        currentIndex >= 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                      }`}
                    >
                      <div className="flex items-start gap-2 hover:bg-gray-50 p-2 -mx-2 rounded transition-colors">
                        <span className="text-xs text-gray-400 flex-shrink-0">0{currentIndex + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-900 group-hover:text-black line-clamp-3 leading-relaxed">
                            {posts[currentIndex]?.title}
                          </p>
                        </div>
                        <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-black transition-colors flex-shrink-0" />
                      </div>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-1.5 mt-2 pt-2 border-t-2 border-gray-200">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all pointer-events-auto ${
                    index === currentIndex ? 'bg-black w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to post ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Corner screws effect */}
          <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-gray-300 border border-gray-400"></div>
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gray-300 border border-gray-400"></div>
          <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-gray-300 border border-gray-400"></div>
          <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-gray-300 border border-gray-400"></div>
        </div>
      </div>
    </div>
  );
}