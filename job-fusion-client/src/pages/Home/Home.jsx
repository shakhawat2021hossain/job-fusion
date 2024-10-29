import React from 'react';
import Carousel from './Carousel';
import Categories from './Categories';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <Categories></Categories>
        </div>
    );
};

export default Home;