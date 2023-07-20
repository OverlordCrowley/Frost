import React from 'react';
import Header from "../Header/Header";
import {Outlet} from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout: React.FC = () => {
    return (
        <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;