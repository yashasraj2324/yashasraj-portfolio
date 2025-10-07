'use client';

import { useState } from 'react';
import { GitHubIcon, LinkedInIcon, KaggleIcon, HuggingFaceIcon, GmailIcon } from '@/components/Icons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add email service integration here
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center px-4 lg:px-16 py-8 lg:py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">Contact</h2>
          <div className="w-16 h-1 bg-gray-900 mx-auto"></div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell me about your project or just say hello..."
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-gray-900 placeholder-gray-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Message
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Or connect with me on:</p>
          
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors"
              title="GitHub"
            >
              <GitHubIcon className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors"
              title="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors"
              title="Kaggle"
            >
              <KaggleIcon className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors"
              title="HuggingFace"
            >
              <HuggingFaceIcon className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href="mailto:yashasraj245@gmail.com"
              className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors"
              title="Gmail"
            >
              <GmailIcon className="w-5 h-5 text-gray-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}