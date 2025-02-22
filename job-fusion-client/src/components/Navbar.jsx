import React from 'react';
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { FaBriefcase } from "react-icons/fa"; // Importing an icon from react-icons

const Navbar = () => {
    const { user, loading, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logout Successfully");
            })
            .catch(err => console.error("Logout Error:", err)); // Improved error logging
    };

    return (
        <div className='shadow-sm'>
            <div className="navbar bg-base-100 max-w-7xl mx-auto">
                <div className='flex-1'>
                    <div className='flex gap-2 items-center'>
                        <NavLink
                            to={'/'}
                            className='flex items-center gap-2 text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300'
                        >
                            <FaBriefcase className="text-blue-500" /> {/* Adding a briefcase icon */}
                            Job Fusion
                        </NavLink>
                    </div>
                </div>
                <div className='flex-none'>
                    <ul className='menu menu-horizontal px-1 font-medium'>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/jobs'>Jobs</Link>
                        </li>
                        {!user && (
                            <li>
                                <Link to={'/login'}>Login</Link>
                            </li>
                        )}
                    </ul>

                    {user && (
                        <div className='dropdown dropdown-end z-50'>
                            <div
                                tabIndex={0}
                                role='button'
                                className='btn btn-ghost btn-circle avatar'
                            >
                                <div className='w-10 rounded-full' title={user?.displayName}>
                                    <img
                                        referrerPolicy='no-referrer'
                                        alt='User Profile Photo'
                                        src={user?.photoURL || "https://via.placeholder.com/40"} // Fallback image
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                            >
                                <li>
                                    <Link to='/add-job'>Add Job</Link>
                                </li>
                                <li>
                                    <Link to={'/posted-jobs'}>My Posted Jobs</Link>
                                </li>
                                <li>
                                    <Link to={'/my-bids'}>My Bids</Link>
                                </li>
                                <li>
                                    <Link to={'/bid-req'}>Bid Requests</Link>
                                </li>
                                <li className="mt-2">
                                    <button
                                        className="bg-gray-200 text-center block w-full py-2 hover:bg-gray-300 transition-colors"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;