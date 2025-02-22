import React from 'react';
import { motion } from 'framer-motion';

const WhyChoose = () => {
    const benefits = [
        {
            id: 1,
            title: 'Wide Job Selection',
            description: 'Access thousands of job listings across industries and locations.',
            icon: 'M5 13l4 4L19 7',
        },
        {
            id: 2,
            title: 'Easy Job Posting',
            description: 'Post your openings in minutes and reach top talent instantly.',
            icon: 'M12 4v16m8-8H4',
        },
        {
            id: 3,
            title: 'Smart Matching',
            description: 'Our AI connects you with the best opportunities or candidates.',
            icon: 'M9 12l2 2 4-4',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                    Why Choose Job Fusion?
                </h2>
                <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }} 
                >
                    {benefits.map((benefit) => (
                        <motion.div
                            key={benefit.id}
                            className="text-center p-6 bg-gray-50 rounded-lg shadow-lg hover:scale-110 transition duration-300"
                            variants={cardVariants}
                            whileHover={{ scale: 1.05 }}
                            viewport={{ once: false }}
                        >
                            <div className="flex justify-center mb-4">
                                <svg
                                    className="w-12 h-12 text-indigo-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={benefit.icon}
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChoose;