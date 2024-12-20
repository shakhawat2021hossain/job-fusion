import React from 'react';
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider"; // Import Firebase and Google provider
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import SocialLogin from "../../components/SocialLogin";

const Register = () => {
    const { register, updateUserProfile, setUser, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation()
    const from = location.state;

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        register(email, password)
            .then((res) => {
                const user = res.user
                updateUserProfile(name, photo, user)
                .then(() => {
                    console.log("name photo updated")
                    setUser({...user, photoURL: photo, dispalyName: name})
                })
                .catch(err => console.log(err))
                toast.success("Registered Successfully");
                navigate(from || '/');

            })
            .catch((err) => console.log(err));
    };

    if(user || loading) return


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            {/* Container for the form */}
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">

                {/* Left Side (Form) */}
                <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
                    <div className="w-full max-w-md space-y-3">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome</h2>

                        <form onSubmit={handleRegister} className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="John Cena"
                                    id="name"
                                    required
                                />
                            </div>

                            {/* Photo Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Photo URL</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://iamge.jpg"
                                    id="photo"
                                    required
                                />
                            </div>

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

                            {/* Register Button */}
                            <div>
                                <input
                                    type="submit"
                                    value="Register"
                                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                                />
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <SocialLogin></SocialLogin>

                        {/* Sign Up Option */}
                        <div className="text-center text-gray-600 mt-4">
                            Already have an account?
                            <Link to={'/login'} className="text-blue-600 hover:underline"> Login</Link>
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

export default Register;
