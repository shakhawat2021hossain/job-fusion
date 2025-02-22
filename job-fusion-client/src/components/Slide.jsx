import React from 'react';
import { motion } from 'framer-motion';

const Slide = ({ image, text }) => {
    return (

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileInView="visible"
            className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] max-h-[600px]"
        >
            <div
                className='w-full bg-center bg-cover h-[45vh] md:h-[38rem]'
                style={{
                    backgroundImage: `url(${image})`,
                }}
            >

            </div>

        </motion.div>
    )
}

export default Slide