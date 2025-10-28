import React from 'react';
import '../css/Home.css';
import ProductosDestacados from './ProductosDestacados.jsx';
import BrandSlider from '../components/BrandSlider.jsx';

const Home = () => {
    return (
        <div>
            <div   className='img-fondo'>
            </div>
            <BrandSlider/>
            <ProductosDestacados/>
        </div>
    )
}

export default Home;
