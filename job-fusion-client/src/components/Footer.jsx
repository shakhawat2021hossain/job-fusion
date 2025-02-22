import React from 'react';
import { FaBriefcase, FaReddit, FaFacebookF, FaGithub } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-8 sm:flex-row sm:gap-0">
                {/* Logo */}
                <NavLink
                    to="/"
                    className="flex items-center gap-2 text-2xl font-bold text-indigo-500 hover:text-indigo-400 transition-colors duration-300"
                >
                    <FaBriefcase className="text-indigo-400" />
                    Job Fusion
                </NavLink>

                {/* Copyright */}
                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Job Fusion. All Rights Reserved.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-6">
                    <a
                        href="#"
                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                        aria-label="Reddit"
                    >
                        <FaReddit className="w-6 h-6" />
                    </a>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                        aria-label="Facebook"
                    >
                        <FaFacebookF className="w-6 h-6" />
                    </a>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                        aria-label="Github"
                    >
                        <FaGithub className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;