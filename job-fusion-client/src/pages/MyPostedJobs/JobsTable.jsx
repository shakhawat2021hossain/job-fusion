import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const JobsTable = ({job}) => {
    const axiosPublic = useAxiosPublic()

    const {_id, title, category, deadline, minPrice, maxPrice, description} = job;
    // console.log(job);
    const handleDeletePost = async(id) =>{
        try{
            const {data} = await axiosPublic.delete(`/jobs/${id}`)
            console.log(data);
            if(data.deletedCount > 0){
                toast.success("Deleted post")
            }
        }
        catch(err){
            console.log(err);
        }        
    }

    
    return (
        <tr>
            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                {title}
            </td>

            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                {deadline}
            </td>

            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                ${minPrice}-${maxPrice}
            </td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div className='flex items-center gap-x-2'>
                    <p
                        className={`px-3 py-1 rounded-full text-xs ${
                            category === 'Digital Marketing' && 'text-blue-500 bg-blue-100/60'
                        }
                        ${
                            category === 'Graphics Design' && 'text-emerald-500 bg-blue-100/60'
                        }
                        ${
                            category === 'Web Development' && 'text-pink-500 bg-blue-100/60'
                        }`
                    }
                    >
                        {category}
                    </p>
                </div>
            </td>
            <td
                title=''
                className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'
            >
                {description}
            </td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div className='flex items-center gap-x-6'>
                    <button onClick={() => handleDeletePost(_id)} className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                        </svg>
                    </button>

                    <Link to={`/update-job/${_id}`} className='text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                            />
                        </svg>
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default JobsTable;