'use client';

import { useState, useRef, useEffect, memo } from 'react';
import { chatService } from '@/services/chatService';

// Memoized typing indicator
const TypingIndicator = memo(() => (
  <div className="flex justify-start">
    <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-2xl rounded-bl-sm text-sm">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  </div>
));

export default function ChatPopup({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Eleva, Yashas's AI assistant powered by LangChain and OpenAI. How can I help you learn more about his work and experience?",
      sender: 'eleva',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => chatService.generateSessionId());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage.trim();
    setInputMessage('');
    setIsTyping(true);

    try {
      // Use the chat service to send message
      const result = await chatService.sendMessage(currentMessage, sessionId);
      
      const elevaMessage = {
        id: Date.now() + 1,
        text: result.response,
        sender: 'eleva',
        timestamp: new Date(),
        isFallback: result.isFallback,
        modelUsed: result.modelUsed,
        attemptNumber: result.attemptNumber
      };

      setMessages(prev => [...prev, elevaMessage]);
      
    } catch (error) {
      console.error('Chat error:', error);
      
      // Final fallback if service also fails
      const fallbackMessage = {
        id: Date.now() + 1,
        text: "I'm experiencing technical difficulties, but I'm here to help you learn about Yashas's AI/ML expertise! What would you like to know about his projects or experience?",
        sender: 'eleva',
        timestamp: new Date(),
        isFallback: true
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 h-96 flex flex-col animate-in slide-in-from-bottom-5 duration-300">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <img
            src="/image.png"
            alt="Eleva"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
          <div>
            <h3 className="font-semibold text-gray-900">Eleva</h3>
            <p className="text-xs text-gray-500">AI Assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                message.sender === 'user'
                  ? 'bg-black text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-900 rounded-bl-sm'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-2xl rounded-bl-sm text-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Yashas..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}