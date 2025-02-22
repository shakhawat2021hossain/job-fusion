import React from 'react';
import Carousel from './Carousel';
import Categories from './Categories';
import WhyChoose from './WhyChoose';
import Testimonials from './Testimonilas';
import CallToAction from './CallToAction';
import FAQsection from './FAQsection';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <Categories></Categories>
            <WhyChoose/>
            <Testimonials/>
            <CallToAction/>
            <FAQsection/>
        </div>
    );
};

export default Home;