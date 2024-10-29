import React, { useEffect } from 'react';
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import SocialLogin from "../../components/SocialLogin";
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
    const axiosPublic = useAxiosPublic()
    const { login, user, loading } = useContext(AuthContext);
    const navigate = useNavigate()

    const location = useLocation()
    const from = location.state;

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])



    const handleLogin = async (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        // console.log(email, password);
        try {
            const result = login(email, password)
            const { data } = await axiosPublic.post('/jwt', { email }, { withCredentials: true })
            console.log(data);
            toast.success("Login Successfully")
            navigate(from || '/', { replace: true })
        }
        catch (err) {
            console.log(err);
        }

    }

    if (user || loading) return
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            {/* Container for the form */}
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">

                {/* Left Side (Form) */}
                <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
                    <div className="w-full max-w-md space-y-3">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back!</h2>

                        <form onSubmit={handleLogin} className="space-y-4">

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Email Address</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="you@example.com"
                                    id="email"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="********"
                                    id="password"
                                    required
                                />
                            </div>

                            {/* Sign In Button */}
                            <div>
                                <input
                                    type="submit"
                                    value="Login"
                                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                                />
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative mt-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Google Sign-In Button */}
                        <SocialLogin></SocialLogin>



                        {/* Sign Up Option */}
                        <div className="text-center text-gray-600 mt-4">
                            Don't have an account?
                            <Link to={'/register'} className="text-blue-600 hover:underline"> Register</Link>
                        </div>
                    </div>

                </div>

                {/* Right Side (Image) */}
                <div className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')" }}>
                </div>
            </div>
        </div>
    );
};

export default Login;
