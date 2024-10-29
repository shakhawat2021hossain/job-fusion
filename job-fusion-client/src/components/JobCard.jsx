/* eslint-disable react/prop-types */
import React from 'react';

import { useNavigate } from "react-router-dom";

const JobCard = ({job}) => {
    const {_id, title, category, deadline, description, maxPrice, minPrice} = job

    const navigate = useNavigate()
    const handleDetails = (id) =>{
        console.log(id);
        navigate(`/job/${id}`)

    }
    return (
        <div onClick={() => handleDetails(_id)} className='w-full min-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all'>
            <div className='flex items-center justify-between'>
                <span className='text-xs font-light text-gray-800 '>
                    Deadline: {deadline}
                </span>
                <span className='px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full '>
                    {category}
                </span>
            </div>

            <div>
                <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
                    {title}
                </h1>

                <p className='mt-2 text-sm text-gray-600 '>
                    {description}
                </p>
                <p className='mt-2 text-sm font-bold text-gray-600 '>
                    Range: ${minPrice} - ${maxPrice}
                </p>
            </div>
        </div>
    )
}

export default JobCard