import React from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';
import { FaBriefcase } from 'react-icons/fa';

const Navbar = () => {
    const { user, loading, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Logout Successfully');
            })
            .catch((err) => console.error('Logout Error:', err));
    };

    return (
        <nav className="shadow-md bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <NavLink
                            to="/"
                            className="flex items-center gap-2 text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                        >
                            <FaBriefcase className="text-indigo-500" />
                            Job Fusion
                        </NavLink>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-gray-700 hover:text-indigo-600 transition-colors duration-200 ${isActive ? 'text-indigo-600 font-semibold' : ''
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/jobs"
                            className={({ isActive }) =>
                                `text-gray-700 hover:text-indigo-600 transition-colors duration-200 ${isActive ? 'text-indigo-600 font-semibold' : ''
                                }`
                            }
                        >
                            Jobs
                        </NavLink>
                        {!user && !loading && (
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `text-gray-700 hover:text-indigo-600 transition-colors duration-200 ${isActive ? 'text-indigo-600 font-semibold' : ''
                                    }`
                                }
                            >
                                Login
                            </NavLink>
                        )}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center">
                        {user && !loading ? (
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar p-1 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div className="w-9 h-9 rounded-full overflow-hidden" title={user?.displayName}>
                                        <img
                                            referrerPolicy="no-referrer"
                                            alt="User Profile Photo"
                                            src={user?.photoURL || 'https://via.placeholder.com/40'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu dropdown-content mt-2 p-2 shadow-lg bg-white rounded-lg w-52 border border-gray-100"
                                >
                                    <li>
                                        <Link
                                            to="/add-job"
                                            className="py-2 px-4 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                                        >
                                            Add Job
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/posted-jobs"
                                            className="py-2 px-4 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                                        >
                                            My Posted Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/my-bids"
                                            className="py-2 px-4 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                                        >
                                            My Bids
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/bid-req"
                                            className="py-2 px-4 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                                        >
                                            Bid Requests
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left py-2 px-4 mt-1 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition-colors duration-200"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="md:hidden">
                                {/* Mobile Menu Button (optional, see below) */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;