import React, {useEffect, useState} from 'react';
import './Profile.sass';
import {Link, Outlet, Route, Routes} from "react-router-dom";
import History from "../../Components/History/HistoryBlock";
import Contact from "../../Components/Contact/Contact";
import Delivery from "../../Components/Delivery/Delivery";
import {CONTACT_ROUTE, DELIVERY_ROUTE, HISTORY_ROUTE} from "../../utils/consts";
const Profile = () => {
    const [activeTab, setActiveTab] = useState('history');

    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    };



    return (
        <section className="preparation">
            <div className="container preparation-container">
                <div className="top-container">
                    <h6 className="preparation-title">Личный кабинет</h6>
                </div>


                    <div className={'profile-container'}>

                        <div className="profile-list">
                            <Link
                                to="/profile/history"
                                className={`profile-text-edited ${activeTab === 'history' ? 'active' : ''}`}
                                onClick={() => handleTabClick('history')}
                            >
                                <svg className="svg" width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25 8.64286L13 2L1 8.64286M25 8.64286L13 15.2857M25 8.64286V22.5714L13 29M13 15.2857L1 8.64286M13 15.2857V29M1 8.64286V22.5714L13 29" stroke="#1A2749" strokeWidth="2" />
                                </svg>
                                Мои заказы
                            </Link>
                            <Link
                                to="/profile/contact"
                                className={`profile-text-edited ${activeTab === 'contact' ? 'active' : ''}`}
                                onClick={() => handleTabClick('contact')}
                            >
                                <svg className="svg" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.87598 23C6.4415 19.3386 9.93772 16.7894 13.9995 16.7894C18.1591 16.7894 21.7255 19.4627 23.2327 23.2662" stroke="#1A2749" strokeWidth="2" />
                                    <circle cx="13.9994" cy="11.2526" r="4.78947" stroke="#1A2749" strokeWidth="2" />
                                    <circle cx="14" cy="14" r="13" stroke="#1A2749" strokeWidth="2" />
                                </svg>
                                Контактные данные
                            </Link>
                            <Link
                                to="/profile/delivery"
                                className={`profile-text-edited ${activeTab === 'delivery' ? 'active' : ''}`}
                                onClick={() => handleTabClick('delivery')}
                            >
                                <svg className="svg" width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.5484 20L14.5484 19L13.5484 19L1 19L1 6L13.5484 6L14.5484 6L14.5484 5L14.5484 2.13016L26.4711 12.0303L14.5484 22.7554L14.5484 20Z" stroke="#1A2749" strokeWidth="2" />
                                </svg>
                                Доставка
                            </Link>
                        </div>

                        <Outlet />

                    </div>


            </div>
        </section>
    );
};

export default Profile;