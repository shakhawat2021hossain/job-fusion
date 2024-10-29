import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const axiosPublic = useAxiosPublic()
    const { googleLogin } = useContext(AuthContext)

    const navigate = useNavigate()

    const location = useLocation()
    const from = location.state;

    const handleGoogle = async () => {
        try {
            const result = await googleLogin()
            // console.log(result);
            const email = result?.user?.email;
            const { data } = await axiosPublic.post('/jwt', { email }, {withCredentials: true})
            toast.success("Login successfully")
            navigate(from || '/', { replace: true })
            console.log(data);
        }
        catch(err){
            console.log(err);
        }


    }
    return (
        <div>
            {/* Google Sign-In Button */}
            <div className="">
                <button
                    onClick={handleGoogle}
                    className="w-full py-2 px-4 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;