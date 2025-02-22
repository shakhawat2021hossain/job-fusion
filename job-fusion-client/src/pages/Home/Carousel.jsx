import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from '../../components/Slide';

const Carousel = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            el: '.swiper-pagination',
                            bulletClass: 'swiper-pagination-bullet bg-gray-300',
                            bulletActiveClass: 'swiper-pagination-bullet-active bg-indigo-600',
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper rounded-xl overflow-hidden shadow-lg"
                    >
                        <SwiperSlide>
                            <Slide
                                image="/assets/banner/banner1.jpg"
                                text="Find the Best Possible Jobs for You"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Slide
                                image="/assets/banner/banner2.jpg"
                                text="Post Jobs and Hire Top Talent"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Slide
                                image="/assets/banner/banner3.jpg"
                                text="Easy to Use and Secure for All Your Data"
                            />
                        </SwiperSlide>

                        {/* Custom Navigation Buttons */}
                        <div className="swiper-button-prev !text-indigo-600 after:!text-2xl hover:!text-indigo-800 transition-colors duration-300"></div>
                        <div className="swiper-button-next !text-indigo-600 after:!text-2xl hover:!text-indigo-800 transition-colors duration-300"></div>

                        {/* Custom Pagination */}
                        <div className="swiper-pagination !bottom-4"></div>
                    </Swiper>
            </div>
        </section>
    );
};

export default Carousel;