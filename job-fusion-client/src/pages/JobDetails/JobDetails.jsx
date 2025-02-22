import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from '../../hooks/useAuth';

const JobDetails = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    const { id } = useParams();
    const [job, setJob] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const { data } = await axiosPublic.get(`/job/${id}`);
            setJob(data);
        };
        loadData();
    }, [id, axiosPublic]);

    const { _id, title, deadline, category, description, maxPrice, minPrice, recruiter } = job;

    const handleJobBid = async (e) => {
        e.preventDefault();
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
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Details Card */}
                <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                    <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-start">
                            <span className="text-sm text-gray-500">
                                Deadline: {deadline}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                {category}
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 line-clamp-2">
                            {title}
                        </h1>

                        <p className="text-gray-600 leading-relaxed">
                            {description}
                        </p>

                        <div className="border-t pt-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                Buyer Details
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={recruiter?.photo}
                                        alt={recruiter?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Name:</span> {recruiter?.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Email:</span> {recruiter?.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-lg font-semibold text-gray-700">
                                Budget Range: ${minPrice} - ${maxPrice}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bid Form Card */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Place Your Bid
                    </h2>

                    <form onSubmit={handleJobBid} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Your Bid ($)
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    name="price"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter your bid amount"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="emailAddress"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="emailAddress"
                                    type="email"
                                    name="email"
                                    defaultValue={user?.email}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="comment"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Comment
                                </label>
                                <input
                                    id="comment"
                                    name="comment"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Add a comment..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Deadline
                                </label>
                                <DatePicker
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    minDate={new Date()}
                                    dateFormat="MMMM d, yyyy"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                        >
                            Submit Bid
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;