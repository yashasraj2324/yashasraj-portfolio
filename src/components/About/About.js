'use client';

export default function About() {
  const technologies = [
    'Python',
    'TensorFlow',
    'PyTorch',
    'scikit-learn',
    'FastAPI',
    'OpenAI API',
    'SQL',
    'Docker',
    'git',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Keras',
    'Pandas',
    'NumPy',
    'Matplotlib',
    'Seaborn',
    'vector databases',
    'lang chain',
    'lang graph',
    'lamma index',

    'Redis',

  ];

  return (
    <div className="w-full min-h-screen flex items-start justify-center px-4 lg:px-16 py-8 lg:py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">About Me</h2>
          <div className="w-16 h-1 bg-gray-900 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {/* Main Description */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              I specialize in developing AI and machine learning solutions that solve real-world problems. With
              expertise spanning deep learning, natural language processing, and computer vision, I transform
              complex data into actionable insights and intelligent systems.
            </p>
          </div>

          {/* Technologies & Tools Section */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">
              TECHNOLOGIES & TOOLS
            </h3>

            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <span className="text-gray-700 font-medium text-sm lg:text-base">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}