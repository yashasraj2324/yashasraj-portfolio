'use client';

export default function Skills() {
  const skillCategories = {
    "AI/ML": [
      "TensorFlow",
      "PyTorch", 
      "Scikit-learn",
      "Keras",
      "XGBoost"
    ],
    "Languages": [
      "Python",
      "SQL",
      "C++",
      "JavaScript",
      "R"
    ],
    "Frameworks": [
      "FastAPI",
      "LangChain",
      "Hugging Face",
      "Flask",
      "Streamlit"
    ],
    "Tools & Cloud": [
      "Docker",
      "Git",
      "AWS",
      "Google Cloud",
      "MLflow"
    ],
    "Specializations": [
      "NLP",
      "Computer Vision",
      "Deep Learning",
      "MLOps",
      "Data Science"
    ]
  };

  const coreSkills = [
    "Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "NLP",
    "Computer Vision", "FastAPI", "Docker", "AWS", "SQL", "Git"
  ];

  return (
    <div className="w-full flex justify-center px-4 lg:px-16 py-8 lg:py-12">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="w-16 h-1 bg-gray-900 mx-auto"></div>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
              <ul className="space-y-2">
                {skills.map((skill, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Core Technologies Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-500 uppercase tracking-widest mb-8">
            CORE TECHNOLOGIES
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-16">
            {coreSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <span className="text-gray-700 font-medium text-sm lg:text-base">
                  {skill}
                </span>
              </div>
            ))}
          </div>

          {/* Additional Skills Info */}
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Continuous Learning</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              I'm constantly expanding my skill set and staying up-to-date with the latest developments 
              in AI/ML. My approach combines theoretical understanding with practical implementation, 
              ensuring I can tackle complex real-world problems effectively.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Current Focus Areas</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Large Language Models (LLMs)</li>
                  <li>• Generative AI Applications</li>
                  <li>• MLOps and Model Deployment</li>
                  <li>• Advanced Computer Vision</li>
                  <li>• Neural Architecture Search</li>
                  <li>• Federated Learning</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Learning Goals</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Reinforcement Learning</li>
                  <li>• Edge AI Deployment</li>
                  <li>• Advanced NLP Techniques</li>
                  <li>• AI Ethics and Fairness</li>
                  <li>• Quantum Machine Learning</li>
                  <li>• Multimodal AI Systems</li>
                </ul>
              </div>
            </div>

            {/* Additional Learning Resources */}
            <div className="text-left mb-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Learning Journey</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Research Papers</h4>
                  <p className="text-gray-600 text-sm">
                    Regularly reading and implementing cutting-edge research from top AI conferences 
                    like NeurIPS, ICML, and ICLR to stay current with latest developments.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Open Source</h4>
                  <p className="text-gray-600 text-sm">
                    Contributing to open-source AI projects and maintaining personal repositories 
                    with implementations of various ML algorithms and architectures.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Competitions</h4>
                  <p className="text-gray-600 text-sm">
                    Participating in Kaggle competitions and AI challenges to apply theoretical 
                    knowledge to real-world problems and learn from the community.
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}