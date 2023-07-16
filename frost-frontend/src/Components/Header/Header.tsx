import React, {useContext, useEffect, useState} from 'react';
import "./Header.sass";
import {Link, useNavigate} from "react-router-dom";
import {ModalContext} from "../../store/ModalContext";
import {modalType} from "../../types/types";
import Search from "../UI/Search/Search";
import {fetchCartItems} from "../../http/userAPI";
import {BASKET_ROUTE, HISTORY_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import jwt_decode from "jwt-decode";


const cart = require('../../images/cart.svg').default;
const logo = require('../../images/Frostlogo.svg').default;


const Header: React.FC = () => {
    const modalContext = useContext(ModalContext);
    const navigate = useNavigate();
    let [count, setCount] = useState(0);

    useEffect(()=>{
            if(modalContext?.isAuth && modalContext?.user && modalContext?.user){
                fetchCartItems({'id': modalContext?.user.id}).then(res => {
                    console.log(res)
                })
            }
            let token = localStorage.getItem('token');
             if(token){
                 modalContext?.setUser(jwt_decode(token));
                 modalContext?.setIsAuth(true);
            }
             else{
                 navigate(SHOP_ROUTE)
             }

    },[])

    useEffect(()=>{

        if(modalContext?.user){
            fetchCartItems({'id': modalContext?.user.id}).then(res => {
                console.log(res)
            })
                .catch(error=>{

                })
        }

    },[modalContext?.user])

    const logOut = () => {
        navigate(SHOP_ROUTE)
        modalContext?.setUser({email: undefined, id: undefined});
        modalContext?.setIsAuth(false);
        localStorage.setItem('token', '');

    }

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
                    {!modalContext?.isAuth ? (<a className="sign-text" onClick={()=>{modalContext?.updateValue(modalType.login);}}>Вход в личный кабинет</a>) : ''}
                    {!modalContext?.isAuth ? (<a className="sign-text" onClick={()=>{modalContext?.updateValue(modalType.reg);}}>Зарегистрироваться</a>) : ''}
                    {modalContext?.isAuth ? (<a className="sign-text" onClick={()=>{navigate(HISTORY_ROUTE)}}>Профиль</a>) : ''}
                    {modalContext?.isAuth ? (<a className="sign-text" onClick={()=>{logOut()}}>Выйти из аккаунта</a>) : ''}
                </div>
                <Link to={BASKET_ROUTE} className="cart">
                    {count > 0 ? (<div className={'cart-div'}>{count}</div>) : ''}
                    <img src={cart} alt="Картинка корзины" className="cart-img"/>
                </Link >
            </div>
        </section>
    );
};


export default Header;