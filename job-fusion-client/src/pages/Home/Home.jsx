import React from 'react';
import Carousel from './Carousel';
import Categories from './Categories';
import WhyChoose from '../../components/WhyChoose';
import Testimonials from './Testimonilas';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <Categories></Categories>
            <WhyChoose/>
            <Testimonials/>
        </div>
    );
};

export default Home;