import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("NEXT_PUBLIC_GEMINI_API_KEY environment variable not set");
}

class GeminiChatService {
    constructor() {
        this.genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
        this.model = null;
        this.chatSessions = new Map();
        this.personalInfo = null;
        this.initializeModel();
    }

    async initializeModel() {
        if (!this.genAI) return;

        try {
            // Load personal information from PDF or static data
            await this.loadPersonalInfo();

            // Use the basic gemini-pro model without system instruction for now
            this.model = this.genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 1024,
                },
            });
            this.currentModel = "gemini-pro";
            console.log("Successfully initialized with model: gemini-pro");
        } catch (error) {
            console.error("Error initializing Gemini model:", error);
        }
    }

    async loadPersonalInfo() {
        // Load static information about Yashas
        // You can replace this with PDF parsing logic if needed
        this.personalInfo = {
            name: "Yashas",
            role: "AI/ML Engineer",
            specialization: "Deep Learning, Computer Vision, Natural Language Processing",
            keySkills: [
                "Python", "TensorFlow", "PyTorch", "OpenCV", "scikit-learn",
                "LangChain", "OpenAI API", "Hugging Face", "Docker", "AWS",
                "FastAPI", "React", "Node.js", "MongoDB", "PostgreSQL"
            ],
            experience: [
                {
                    title: "AI/ML Engineer Intern",
                    company: "Tech Company",
                    period: "2023-Present",
                    description: "Developed machine learning models for computer vision and NLP tasks"
                }
            ],
            projects: [
                {
                    name: "Neural Style Transfer",
                    description: "Deep learning project implementing artistic style transfer using CNNs",
                    technologies: ["Python", "TensorFlow", "OpenCV"]
                },
                {
                    name: "Sentiment Analysis System",
                    description: "NLP system for analyzing sentiment in social media data",
                    technologies: ["Python", "NLTK", "scikit-learn", "Flask"]
                },
                {
                    name: "Computer Vision Object Detection",
                    description: "Real-time object detection system using YOLO",
                    technologies: ["Python", "PyTorch", "OpenCV", "YOLO"]
                }
            ],
            education: "Computer Science with focus on AI/ML",
            interests: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Computer Vision", "NLP"]
        };
    }

    buildSystemInstruction() {
        const info = this.personalInfo;

        return `You are Eleva, a friendly and professional AI assistant for ${info.name}'s portfolio website.

${info.name} is a talented ${info.role} specializing in ${info.specialization}.

Your goal is to answer questions about ${info.name}'s skills, experience, and projects in a conversational and engaging way.

Key Information about ${info.name}:

**Role & Specialization:**
- ${info.role}
- Specializes in: ${info.specialization}

**Technical Skills:**
${info.keySkills.map(skill => `- ${skill}`).join('\n')}

**Experience:**
${info.experience.map(exp => `- ${exp.title} at ${exp.company} (${exp.period}): ${exp.description}`).join('\n')}

**Notable Projects:**
${info.projects.map(project => `- **${project.name}**: ${project.description} (Technologies: ${project.technologies.join(', ')})`).join('\n')}

**Education:** ${info.education}

**Interests:** ${info.interests.join(', ')}

**Guidelines:**
- Be friendly, enthusiastic, and professional
- Keep responses conversational but informative
- Highlight ${info.name}'s strengths in AI/ML and technical skills
- If asked about something not covered, politely redirect to ${info.name}'s known expertise
- Encourage visitors to explore the portfolio or get in touch
- Use emojis occasionally to keep it engaging
- Keep responses concise but comprehensive

**Contact:**
${info.name} is open to new opportunities and collaborations. Encourage visitors to use the contact form or reach out directly.

Remember: You represent ${info.name} professionally, so maintain a positive and knowledgeable tone while being helpful and approachable.`;
    }

    async sendMessage(message, sessionId = null) {
        if (!this.model) {
            return {
                success: false,
                response: "I'm having trouble connecting to my AI brain right now. Please try again in a moment! 🤖",
                sessionId: sessionId || this.generateSessionId(),
                modelUsed: "fallback"
            };
        }

        try {
            // Get or create chat session
            const currentSessionId = sessionId || this.generateSessionId();

            let chat;
            if (this.chatSessions.has(currentSessionId)) {
                chat = this.chatSessions.get(currentSessionId);
            } else {
                chat = this.model.startChat({
                    history: [],
                });
                this.chatSessions.set(currentSessionId, chat);
            }

            // Send message with context
            const contextualMessage = `You are Eleva, Yashas's AI assistant. Yashas is an AI/ML Engineer specializing in deep learning, computer vision, and NLP. He's skilled in Python, TensorFlow, PyTorch, and has worked on projects like Neural Style Transfer and Sentiment Analysis. Be friendly and helpful when answering questions about his background and skills.

User question: ${message}

Response:`;

            // Send message and get response
            const result = await chat.sendMessage(contextualMessage);
            const response = result.response;
            const text = response.text();

            return {
                success: true,
                response: text,
                sessionId: currentSessionId,
                modelUsed: this.currentModel || "gemini-pro"
            };

        } catch (error) {
            console.error("Gemini API error:", error);

            // Enhanced fallback responses based on message content
            const fallbackResponse = this.getContextualFallback(message);

            return {
                success: false,
                response: fallbackResponse,
                sessionId: sessionId || this.generateSessionId(),
                modelUsed: "fallback",
                error: error.message
            };
        }
    }

    getContextualFallback(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
            return "I'm having connection issues, but I can tell you Yashas is skilled in Python, TensorFlow, PyTorch, and specializes in AI/ML! 🐍🤖";
        }

        if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
            return "Sorry for the technical hiccup! Yashas has worked on fascinating projects like Neural Style Transfer, Sentiment Analysis, and Computer Vision systems. 🚀";
        }

        if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
            return "I'm experiencing connectivity issues, but Yashas has great experience in AI/ML engineering with expertise in deep learning and computer vision! 💼";
        }

        if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('opportunity')) {
            return "Technical difficulties aside, Yashas is open to new opportunities! Feel free to reach out through the contact form. 📧";
        }

        // Default fallback
        const fallbacks = [
            "I'm having some technical difficulties, but I'd love to help you learn about Yashas! He's an AI/ML Engineer with expertise in deep learning and computer vision. 🤖",
            "Sorry for the connection issue! Yashas specializes in Python, TensorFlow, PyTorch, and has worked on fascinating AI projects. What would you like to know? 🚀",
            "I'm experiencing connectivity problems, but I can tell you that Yashas has great experience in NLP, machine learning, and building intelligent systems! 🧠",
            "Technical hiccup with my AI brain! Yashas is passionate about transforming data into AI solutions. He's worked on Neural Style Transfer, Sentiment Analysis, and more. ✨"
        ];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    generateSessionId() {
        return `gemini_session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }

    clearSession(sessionId) {
        if (this.chatSessions.has(sessionId)) {
            this.chatSessions.delete(sessionId);
            return true;
        }
        return false;
    }

    getActiveSessions() {
        return Array.from(this.chatSessions.keys());
    }
}

// Export singleton instance
export const geminiChatService = new GeminiChatService();
export default geminiChatService;