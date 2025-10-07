'use client';

import { useState, useEffect } from 'react';
import ChatPopup from '../ChatPopup/ChatPopup';

export default function FloatingButtons() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show tooltip after a delay when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Hide tooltip after some time
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000); // Hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
    setShowTooltip(false); // Hide tooltip when clicked
  };

  return (
    <div className="fixed bottom-10 right-10 flex flex-col items-end gap-4 z-50">
      <ChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Tooltip */}
      {showTooltip && !isChatOpen && (
        <div className="bg-black text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap animate-in fade-in-0 slide-in-from-right-2 duration-300 relative">
          Click here to chat with Eleva
          {/* Arrow pointing to button */}
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-black rotate-45"></div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={handleChatToggle}
          className="w-16 h-16 bg-transparent rounded-full shadow-xl hover:scale-105 transition-all flex items-center justify-center overflow-hidden border-2 border-black relative group"
        >
          {/* Custom Chatbot Logo */}
          <img
            src="/image.png"
            alt="AI Chatbot"
            className="w-full h-full object-cover rounded-full"
          />

          {/* Hover tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Chat with Eleva
          </div>
        </button>
        <div className="w-4 h-4 bg-black rounded-full"></div>
      </div>
    </div>
  );
}