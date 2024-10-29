import React from 'react';
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider"
import toast from "react-hot-toast"

const Navbar = () => {
    const { user, loading, logOut } = useContext(AuthContext)

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success("Logout Successfully")
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='shadow-sm'>
            <div className="navbar bg-base-100 max-w-7xl mx-auto">
                <div className='flex-1'>
                    <div className='flex gap-2 items-center'>
                        <span className='font-bold'>Job Fusion</span>
                    </div>
                </div>
                <div className='flex-none'>
                    <ul className='menu menu-horizontal px-1'>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/jobs'>Jobs</Link>
                        </li>

                        {
                            !user &&
                                
                                <li>
                                    <Link to={'/login'}>Login</Link>
                                </li>
                        }
                    </ul>

                    { user &&
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
                                    src={user?.photoURL}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            <li>
                                <Link to='/add-job' className='justify-between'>Add Job</Link>
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
                                    <button className="bg-gray-200 text-center block" onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar