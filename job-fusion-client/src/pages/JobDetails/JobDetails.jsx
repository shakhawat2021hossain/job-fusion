import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from '../../hooks/useAuth';

const JobDetails = () => {
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [startDate, setStartDate] = useState(new Date());


    const { id } = useParams()
    const [job, setJob] = useState({})
    // console.log(id);
    useEffect(() => {
        const loadData = async () => {
            const { data } = await axiosPublic.get(`/job/${id}`)
            setJob(data)
        }
        loadData()
    }, [])

    const { _id, title, deadline, category, description, maxPrice, minPrice, recruiter } = job;

    const handleJobBid = async (e) => {
        e.preventDefault()
        const form = e.target;
        const price = parseFloat(form.price.value)
        const bidderEmail = form.email.value;
        const comment = form.comment.value;
        const jobid = _id
        const deadline = startDate;
        const status = "Pending";
        const recruiterEmail = recruiter?.email


        const jobData = {
            jobid,
            title,
            category,
            bidderEmail,
            price,
            status,
            comment,
            deadline,
            recruiterEmail
        }
        if (price < parseFloat(minPrice)) return toast.error("Bid atleast minimum price")
        if (bidderEmail === recruiterEmail) return toast.error("you are the job poster")
        try {
            const { data } = await axiosPublic.post('/bids', jobData)
            console.log(data);
            toast.success("successfully bided for the post")
            navigate('/')
        }
        catch (err) {
            console.log(err);
            if (err.status === 400) {
                toast.success("you are already bided for the job post")
            }
        }

    }

    return (
        <div className='flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto '>
            {/* Job Details */}
            <div className='flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-light text-gray-800 '>
                        Deadline: {deadline}
                    </span>
                    <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
                        {category}
                    </span>
                </div>

                <div>
                    <h1 className='mt-2 text-3xl font-semibold text-gray-800 '>
                        {title}
                    </h1>

                    <p className='mt-2 text-lg text-gray-600 '>
                        {description}
                    </p>
                    <p className='mt-6 text-sm font-bold text-gray-600 '>
                        Buyer Details:
                    </p>
                    <div className='flex items-center gap-5'>
                        <div>
                            <p className='mt-2 text-sm  text-gray-600 '>Name: {recruiter?.name}</p>
                            <p className='mt-2 text-sm  text-gray-600 '>
                                Email: {recruiter?.email}
                            </p>
                        </div>
                        <div className='rounded-full object-cover overflow-hidden w-14 h-14'>
                            <img src={recruiter?.photo} alt='' />
                        </div>
                    </div>
                    <p className='mt-6 text-lg font-bold text-gray-600 '>
                        Range: ${minPrice} - ${maxPrice}
                    </p>
                </div>
            </div>
            {/* Place A Bid Form */}
            <section className='p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]'>
                <h2 className='text-lg font-semibold text-gray-700 capitalize '>
                    Place A Bid
                </h2>

                <form onSubmit={handleJobBid}>
                    <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
                        <div>
                            <label className='text-gray-700 ' htmlFor='price'>
                                Price
                            </label>
                            <input
                                id='price'
                                type='text'
                                name='price'
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-gray-700 ' htmlFor='emailAddress'>
                                Email Address
                            </label>
                            <input
                                id='emailAddress'
                                type='email'
                                name='email'
                                defaultValue={user?.email}
                                disabled
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>

                        <div>
                            <label className='text-gray-700 ' htmlFor='comment'>
                                Comment
                            </label>
                            <input
                                id='comment'
                                name='comment'
                                type='text'
                                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                            />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <label className='text-gray-700'>Deadline</label>
                            <DatePicker className="bordeblock w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} />

                        </div>
                    </div>

                    <div className='flex justify-end mt-6'>
                        <button
                            type='submit'
                            className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
                        >
                            Place Bid
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default JobDetails