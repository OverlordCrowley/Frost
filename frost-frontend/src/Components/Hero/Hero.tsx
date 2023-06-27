import React from 'react';
import './Hero.sass';

const comp = require('../../images/Compressor3.png');
const Hero: React.FC = () => {
    return (
        <section className="hero">
            <button className="hero-btn">
                <svg className="hero-arrow arrow-left" width="35" height="63" viewBox="0 0 35 63" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.9999 61.074L3 32.074L33.074 2" stroke="white" strokeOpacity="0.4" strokeWidth="3"/>
                </svg>
            </button>
            <button className="hero-btn">
                <svg className="hero-arrow arrow-right" width="35" height="63" viewBox="0 0 35 63" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.9999 61.074L3 32.074L33.074 2" stroke="white" strokeOpacity="0.4" strokeWidth="3"/>
                </svg>
            </button>
            <div className="container hero-container">
                <div className="hero-left">
                    <h4 className="hero-left__title">
                        Компрессоры для
                    </h4>
                    <p className="hero-left__text">— легковых автомобилей
                        <br/>— грузовых автомобилей
                            <br/>— спецтехники
                                <br/>— комбайнов</p>
                </div>
                <div className="hero-right">
                    <img src={comp} alt="Compressor" className="hero-right-img" />
                </div>
            </div>
        </section>
    );
};

export default Hero;