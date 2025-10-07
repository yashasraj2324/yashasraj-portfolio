'use client';

import { useEffect } from 'react';
import { GitHubIcon, LinkedInIcon, HuggingFaceIcon, KaggleIcon, GmailIcon } from '@/components/Icons';

export default function Sidebar({
  activeSection,
  setActiveSection,
  navigationItems,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) {
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-sidebar') && !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (item) => {
    setActiveSection(item);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:sticky lg:top-0 lg:self-start w-72 bg-white shadow-sm px-8 py-10 flex-col h-screen overflow-y-auto">
        {/* Header */}
        <div className="mb-12 flex items-center">
          {/* Small Profile Picture */}
          <img
            src="/profile-placeholder.svg"
            alt="Yashas Profile"
            className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover mr-3"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Yashas raj</h1>
            <p className="text-sm text-gray-500">AI/ML Engineer</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => setActiveSection(item)}
                  className={`w-full text-left px-6 py-3 rounded-xl transition-colors font-medium text-base ${activeSection === item
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Connect Section */}
        <div className="mt-auto pt-4">
          <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-6">
            CONNECT
          </h3>
          <div className="space-y-4">
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-base"
            >
              <GitHubIcon className="w-5 h-5 mr-3" />
              GitHub
            </a>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-base"
            >
              <LinkedInIcon className="w-5 h-5 mr-3" />
              LinkedIn
            </a>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-base"
            >
              <KaggleIcon className="w-5 h-5 mr-3" />
              Kaggle
            </a>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-base"
            >
              <HuggingFaceIcon className="w-5 h-5 mr-3" />
              HuggingFace
            </a>
            <a
              href="mailto:yashasraj245@gmail.com"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-base"
            >
              <GmailIcon className="w-5 h-5 mr-3" />
              Gmail
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          {/* Mobile Sidebar */}
          <div className="mobile-sidebar fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-lg px-6 py-6 flex flex-col transform transition-transform duration-300 ease-in-out">
            {/* Mobile Header with Close Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                {/* Small Profile Picture */}
                <img
                  src="/profile-placeholder.svg"
                  alt="Yashas Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover mr-3"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900 mb-1">Yashas</h1>
                  <p className="text-sm text-gray-500">AI/ML Engineer</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium text-base ${activeSection === item
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Connect Section */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-4">
                CONNECT
              </h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm p-2 rounded-lg hover:bg-gray-50"
                >
                  <GitHubIcon className="w-4 h-4 mr-2" />
                  GitHub
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm p-2 rounded-lg hover:bg-gray-50"
                >
                  <LinkedInIcon className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm p-2 rounded-lg hover:bg-gray-50"
                >
                  <KaggleIcon className="w-4 h-4 mr-2" />
                  Kaggle
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm p-2 rounded-lg hover:bg-gray-50"
                >
                  <HuggingFaceIcon className="w-4 h-4 mr-2" />
                  HuggingFace
                </a>
                <a
                  href="mailto:yashasraj245@gmail.com"
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm p-2 rounded-lg hover:bg-gray-50"
                >
                  <GmailIcon className="w-4 h-4 mr-2" />
                  Gmail
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}