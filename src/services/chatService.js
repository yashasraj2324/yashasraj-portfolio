import { geminiChatService } from '../lib/geminiChat.js';

// Chat service for handling LLM interactions
export class ChatService {
  constructor() {
    this.geminiService = geminiChatService;
  }

  async sendMessage(message, sessionId) {
    try {
      const result = await this.geminiService.sendMessage(message.trim(), sessionId);
      
      return {
        success: result.success,
        response: result.response,
        sessionId: result.sessionId,
        isFallback: !result.success,
        modelUsed: result.modelUsed,
        attemptNumber: 1,
      };
    } catch (error) {
      console.error('Chat service error:', error);
      return {
        success: false,
        error: error.message,
        response: this.getFallbackResponse(),
        isFallback: true,
      };
    }
  }

  getFallbackResponse() {
    const fallbacks = [
      "I'm having some technical difficulties with all my AI models, but I'd love to help you learn about Yashas! He's an AI/ML Engineer with expertise in deep learning and computer vision.",
      "Sorry for the connection issue! All my language models are temporarily unavailable, but Yashas specializes in Python, TensorFlow, PyTorch, and has worked on fascinating AI projects. What would you like to know?",
      "I'm experiencing connectivity problems with my AI systems, but I can tell you that Yashas has great experience in NLP, machine learning, and building intelligent systems!",
      "Technical hiccup with my models! Yashas is passionate about transforming data into AI solutions. He's worked on Neural Style Transfer, Sentiment Analysis, and more.",
      "My AI models are having issues, but I can share that Yashas has internship experience and expertise in LangChain, OpenAI, and building smart systems. How can I help?",
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Generate a unique session ID
  generateSessionId() {
    return this.geminiService.generateSessionId();
  }

  // Clear a chat session
  clearSession(sessionId) {
    return this.geminiService.clearSession(sessionId);
  }

  // Get active sessions
  getActiveSessions() {
    return this.geminiService.getActiveSessions();
  }
}

export const chatService = new ChatService();