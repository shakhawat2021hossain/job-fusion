import React from 'react';

const Slide = ({ image, text }) => {
    return (
        <div
            className='w-full bg-center bg-cover h-[45vh] md:h-[38rem]'
            style={{
                backgroundImage: `url(${image})`,
            }}
        >

        </div>
    )
}

export default Slide