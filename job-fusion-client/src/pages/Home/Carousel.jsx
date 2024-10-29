import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from '../../components/Slide';

export default function Carousel() {
    return (
        <div className='max-w-7xl mx-auto py-8'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper rounded-lg"
            >
                <SwiperSlide>
                    <Slide image={'/src/assets/banner/banner1.jpg'} text={"Find Best Possibles Job for you"}></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide image={'/src/assets/banner/banner2.jpg'} text={"Posts Job and Hire a Pro for fillup you vacancy"}></Slide>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide image={'/src/assets/banner/banner3.jpg'} text={"Easy to use and Secured all of your Data"}></Slide>
                </SwiperSlide>
        
            </Swiper>
        </div>
    );
}
