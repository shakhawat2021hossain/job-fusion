import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = () => {
    return (
        <motion.section
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="py-16 bg-indigo-600 text-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Take the Next Step?
                </h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Whether you're looking for your dream job or the perfect candidate, Job Fusion has you covered.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/jobs"
                        className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md"
                    >
                        Search Jobs
                    </Link>
                    <Link
                        to="/add-job"
                        className="px-6 py-3 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-indigo-900 transition-colors duration-300 shadow-md"
                    >
                        Post a Job
                    </Link>
                </div>
            </div>
        </motion.section>
    );
};

export default CallToAction;