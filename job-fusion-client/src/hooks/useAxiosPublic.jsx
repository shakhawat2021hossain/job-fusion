import axios from 'axios';

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 'https://job-fusion.vercel.app'
    })
    return axiosPublic
};

export default useAxiosPublic;