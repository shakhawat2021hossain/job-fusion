import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import toast from 'react-hot-toast';
import SocialLogin from '../../components/SocialLogin';
import { ImSpinner9 } from 'react-icons/im';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register: authRegister, updateUserProfile, setUser, user, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await authRegister(data.email, data.password);
            const authUser = res.user;

            await updateUserProfile(data.name, data.photo, authUser);
            setUser({ ...authUser, photoURL: data.photo, displayName: data.name });
            toast.success('Registered Successfully');
            navigate(from || '/');
        } catch (err) {
            toast.error(`Failed: ${err?.code || err?.message}`);
            setLoading(false);
        }
    };

    if (user) return null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                {/* Left Side (Form) */}
                <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
                    <div className="w-full max-w-md space-y-3">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                                <input
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="John Cena"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Photo Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Photo URL</label>
                                <input
                                    type="url"
                                    {...register('photo', {
                                        required: 'Photo URL is required',
                                        pattern: {
                                            value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/i,
                                            message: 'Please enter a valid image URL',
                                        },
                                    })}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://image.jpg"
                                />
                                {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Email Address</label>
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Please enter a valid email',
                                        },
                                    })}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="you@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Password</label>
                                <input
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        validate: {
                                            hasUpperCase: (value) =>
                                                /[A-Z]/.test(value) ||
                                                "Must include an uppercase letter",
                                            hasLowerCase: (value) =>
                                                /[a-z]/.test(value) ||
                                                "Must include a lowercase letter",
                                            minLength: (value) =>
                                                value.length >= 6 ||
                                                "Must be at least 6 characters",
                                        },

                                    })}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="********"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>

                            {/* Register Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 disabled:bg-blue-400 flex justify-center items-center"
                                >
                                    {loading ? <ImSpinner9 className="animate-spin m-auto" /> : 'Register'}
                                </button>
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

                        <SocialLogin />

                        {/* Sign Up Option */}
                        <div className="text-center text-gray-600 mt-4">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Side (Image) */}
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Register;