import React, {useContext} from 'react';
import "./Header.sass";
import { Link } from "react-router-dom";
import {ModalContext} from "../../store/ModalContext";
import {modalType} from "../../types/types";
import Search from "../UI/Search/Search";
import logo1 from './Frostlogo.svg';


const cart = require('../../images/cart.svg').default;
const logo = require('../../images/Frostlogo.svg').default;


const Header: React.FC = () => {

    const modalContext = useContext(ModalContext);

    console.log(logo1)

    return (
        <section className="header">
            <div className="container">
                <Link to="/" className="logo">
                    <img className="logo__img" src={logo} alt="Логотип Frost"/>
                </Link>
                <div className="city">
                    <p className="header__text">г. Нур-Султан</p>
                    <p className="header__text">г. Алматы</p>
                </div>
                <div className="phone">
                    <a href="tel:+7 777 777 77 77" className="header__text">+7 777 777 77 77</a>
                    <a href="tel:+7 777 777 77 77" className="header__text">+7 777 777 77 77</a>
                </div>
                <Search/>
                <div className="sign">
                    <a className="sign-text" onClick={()=>{
                        modalContext?.updateValue(modalType.login);
                    }}>Вход в личный кабинет</a>
                    <a className="sign-text" onClick={()=>{
                        modalContext?.updateValue(modalType.reg);
                        console.log(modalContext?.value)
                    }}>Зарегистрироваться</a>
                </div>
                <Link to="/cart" className="cart">
                    <img src={cart} alt="Картинка корзины" className="cart-img"/>
                </Link >
            </div>
        </section>
    );
};


export default Header;