'use client';

import { GitHubIcon, LinkedInIcon, KaggleIcon, HuggingFaceIcon, GmailIcon } from '@/components/Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Yashas</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI/ML Engineer passionate about transforming data into intelligent systems.
              Specializing in deep learning, NLP, and computer vision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>

            {/* Email */}
            <div className="mb-4">
              <a
                href="mailto:yashasraj245@gmail.com"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center"
              >
                <GmailIcon className="w-4 h-4 mr-2" />
                yashasraj245@gmail.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
                title="GitHub"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
                title="Kaggle"
              >
                <KaggleIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
                title="HuggingFace"
              >
                <HuggingFaceIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Yashas. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}