'use client';

import { useState } from 'react';

const Certifications = () => {
  const [activeTab, setActiveTab] = useState('certifications');

  const certifications = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialId: "AWS-SAA-2024-001",
      image: "/api/placeholder/100/100",
      skills: ["Cloud Architecture", "AWS Services", "Security"],
      status: "Active"
    },
    {
      title: "Google Cloud Professional ML Engineer",
      issuer: "Google Cloud",
      date: "2023",
      credentialId: "GCP-MLE-2023-002",
      image: "/api/placeholder/100/100",
      skills: ["Machine Learning", "TensorFlow", "MLOps"],
      status: "Active"
    },
    {
      title: "Microsoft Azure AI Engineer Associate",
      issuer: "Microsoft",
      date: "2023",
      credentialId: "AZ-AI-102-2023",
      image: "/api/placeholder/100/100",
      skills: ["Azure AI", "Cognitive Services", "Bot Framework"],
      status: "Active"
    },
    {
      title: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2024",
      credentialId: "CKA-2024-003",
      image: "/api/placeholder/100/100",
      skills: ["Kubernetes", "Container Orchestration", "DevOps"],
      status: "Active"
    }
  ];

  const achievements = [
    {
      title: "Best AI Innovation Award",
      organization: "Tech Innovation Summit 2024",
      date: "March 2024",
      description: "Recognized for developing an innovative AI-powered healthcare diagnostic system",
      category: "Innovation",
      image: "/api/placeholder/100/100"
    },
    {
      title: "Kaggle Competition Winner",
      organization: "Kaggle",
      date: "January 2024",
      description: "1st place in Computer Vision Challenge with 98.7% accuracy",
      category: "Competition",
      image: "/api/placeholder/100/100"
    },
    {
      title: "Open Source Contributor",
      organization: "GitHub",
      date: "2023-2024",
      description: "Top contributor to TensorFlow and PyTorch repositories with 500+ commits",
      category: "Open Source",
      image: "/api/placeholder/100/100"
    },
    {
      title: "Research Publication",
      organization: "IEEE Conference on AI",
      date: "September 2023",
      description: "Published paper on 'Advanced Neural Networks for Medical Image Analysis'",
      category: "Research",
      image: "/api/placeholder/100/100"
    },
    {
      title: "Hackathon Champion",
      organization: "Global AI Hackathon",
      date: "June 2023",
      description: "Led team to victory in 48-hour AI hackathon with innovative NLP solution",
      category: "Competition",
      image: "/api/placeholder/100/100"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Innovation': 'bg-purple-100 text-purple-800',
      'Competition': 'bg-green-100 text-green-800',
      'Open Source': 'bg-blue-100 text-blue-800',
      'Research': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center px-4 lg:px-16 py-8 lg:py-12">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
            Certifications & Achievements
          </h2>
          <div className="w-16 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional certifications and notable achievements in AI, ML, and cloud technologies
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'certifications'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Certifications
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'achievements'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Achievements
            </button>
          </div>
        </div>

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      cert.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {cert.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-2">{cert.issuer}</p>
                  <p className="text-sm text-gray-500 mb-4">{cert.date}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-400">ID: {cert.credentialId}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                          {achievement.title}
                        </h3>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(achievement.category)}`}>
                          {achievement.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 font-medium mb-2">{achievement.organization}</p>
                      <p className="text-sm text-gray-500 mb-4">{achievement.date}</p>
                      <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Professional Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-gray-600">Active Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">5</div>
              <div className="text-gray-600">Major Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Open Source Commits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1</div>
              <div className="text-gray-600">Research Publications</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;