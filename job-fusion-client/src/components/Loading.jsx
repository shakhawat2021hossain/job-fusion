import React from 'react';
import { ImSpinner } from "react-icons/im";


const Loading = () => {
    return (
        <div className='flex items-center justify-center h-full'>
            <ImSpinner className='animate-spin text-blue-500 text-4xl' />
        </div>


    );
};

export default Loading;