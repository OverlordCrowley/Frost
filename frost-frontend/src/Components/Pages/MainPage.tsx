import React from 'react';
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Main from "../../pages/Main/Main";

const MainPage: React.FC = () => {
    return (
        <div>
            <Hero/>
            <Main/>
        </div>
    );
};

export default MainPage;