'use client';

export default function Experience() {
    const experiences = [
        {
            title: "1M1B Green Intern",
            company: "1M1B",
            period: "Dec 2024 - Feb 2025"
        },
        {
            title: "Software Developer Intern",
            company: "Surviva Software Pvt Ltd",
            period: "Jul 2025 - Sep 2025"
        }
    ];

    return (
        <div className="w-full flex justify-center px-4 lg:px-16 py-8 lg:py-12">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">Experience</h2>
                    <div className="w-16 h-1 bg-gray-900 mx-auto"></div>
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300 hidden lg:block"></div>

                    <div className="space-y-12 lg:space-y-16">
                        {experiences.map((exp, index) => (
                            <div key={index} className="relative">
                                {/* Timeline dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-full hidden lg:block z-10"></div>

                                <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                    }`}>
                                    {/* Left/Right content */}
                                    <div className="flex-1 text-center lg:text-left">
                                        <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                                            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                                                {exp.title}
                                            </h3>
                                            <p className="text-lg text-gray-600 mb-3">
                                                {exp.company}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {exp.period}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Spacer for opposite side */}
                                    <div className="flex-1 hidden lg:block"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}