import React from 'react';
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

const AddJob = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const [error, setError] = useState("");

    const handleAddJob = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.job_title.value;
        const description = form.description.value;
        const category = form.category.value;
        const maxPrice = parseFloat(form.max_price.value);
        const minPrice = parseFloat(form.min_price.value);
        const recruiterEmail = form.email.value;
        const deadline = startDate.toLocaleDateString();

        if (maxPrice < minPrice) {
            setError("Maximum price cannot be less than minimum price.");
            return;
        }

        const jobData = {
            title,
            description,
            category,
            maxPrice,
            minPrice,
            deadline,
            recruiter: {
                email: recruiterEmail,
                name: user.displayName,
                photo: user.photoURL,
            },
        };

        try {
            const { data } = await axiosPublic.post('/jobs', jobData);
            toast.success("Job posted successfully!");
            navigate('/');
        } catch (err) {
            console.error(err);
            toast.error("Failed to post job. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
            <section className="p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a Job</h2>

                <form onSubmit={handleAddJob}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Job Title</label>
                            <input
                                id="job_title"
                                name="job_title"
                                type="text"
                                placeholder="Enter job title"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                defaultValue={user?.email}
                                disabled
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                            />
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deadline</label>
                            <div className="mt-1 relative">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                id="category"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Graphics Design">Graphics Design</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                            </select>
                        </div>

                        {/* Minimum Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Minimum Price</label>
                            <input
                                id="min_price"
                                name="min_price"
                                type="number"
                                placeholder="Enter minimum price"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        {/* Maximum Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Maximum Price</label>
                            <input
                                id="max_price"
                                name="max_price"
                                type="number"
                                placeholder="Enter maximum price"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter job description"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Post Job
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddJob;