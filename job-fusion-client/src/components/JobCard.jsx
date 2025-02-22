/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
    const { _id, title, category, deadline, description, maxPrice, minPrice } = job;

    const navigate = useNavigate();
    const handleDetails = (id) => {
        console.log(id);
        navigate(`/job/${id}`);
    };

    return (
        <div
            onClick={() => handleDetails(_id)}
            className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-gray-100"
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                    Deadline: {new Date(deadline).toLocaleDateString()}
                </span>
                <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full uppercase">
                    {category}
                </span>
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                {title}
            </h1>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {description}
            </p>
            <p className="text-sm font-medium text-gray-700">
                Range: <span className="text-green-600">${minPrice} - ${maxPrice}</span>
            </p>
        </div>
    );
};

export default JobCard;