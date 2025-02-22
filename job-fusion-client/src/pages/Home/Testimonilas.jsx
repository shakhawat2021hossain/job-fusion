import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Software Developer',
            feedback:
                'Job Fusion helped me land my dream job in just two weeks. The process was seamless!',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg', // Realistic avatar
        },
        {
            id: 2,
            name: 'Mark Thompson',
            role: 'Hiring Manager at TechCorp',
            feedback:
                'Posting jobs here was a breeze, and we found top talent faster than ever.',
            avatar: 'https://randomuser.me/api/portraits/men/75.jpg', // Realistic avatar
        },
        {
            id: 3,
            name: 'Emily Chen',
            role: 'Graphic Designer',
            feedback:
                'The smart matching feature connected me with opportunities I’d never have found otherwise.',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg', // Realistic avatar
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                    What Our Users Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-gray-100 p-6 rounded-lg shadow-md"
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={`${testimonial.name}'s avatar`}
                                    className="w-16 h-16 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;