import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQsection = () => {
    const faqs = [
        {
            id: 1,
            question: 'How do I create an account?',
            answer: 'Simply click "Sign Up" in the navbar, fill out the form with your details, and you’re ready to start exploring or posting jobs!',
        },
        {
            id: 2,
            question: 'Is Job Fusion free to use?',
            answer: 'Yes, job seekers can browse and apply for free. Employers can post jobs with a free tier, though premium options are available for enhanced visibility.',
        },
        {
            id: 3,
            question: 'How does smart matching work?',
            answer: 'Our AI analyzes your profile or job posting to suggest the best matches based on skills, experience, and preferences.',
        },
        {
            id: 4,
            question: 'Can I edit my job postings?',
            answer: 'Absolutely! Once logged in, go to "My Posted Jobs" to update or remove your listings anytime.',
        },
    ];

    // State to track which FAQ is expanded
    const [expanded, setExpanded] = useState(null);

    const toggleFAQ = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <section className="py-16 bg-white">
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(faq.id)}
                                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                            >
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {faq.question}
                                </h3>
                                <svg
                                    className={`w-5 h-5 text-indigo-600 transition-transform duration-300 ${expanded === faq.id ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {expanded === faq.id && (
                                <div className="px-6 pb-4">
                                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <a
                        href="/faq"
                        className="inline-block text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300"
                    >
                        See More FAQs →
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default FAQsection;