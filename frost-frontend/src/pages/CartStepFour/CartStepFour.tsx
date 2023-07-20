import React, {useEffect, useState} from 'react';
import './CartStepFour.sass';
import {Link} from "react-router-dom";
import Select from "../../Components/UI/Select/Select";
import {HISTORY_ROUTE} from "../../utils/consts";
const greenGal = require('../../images/GreenGal.svg')
const CartStepFour = () => {


    return (
        <section className="preparation">
            <div className="container preparation-container">
                <div className="top-container">
                    <h6 className="preparation-title">Оформление заказа</h6>
                    <div className="stage-box">
                        <div className="stage stage-1 stage-1-ml">
                            <div className="sq ">Корзина</div>
                            <div className="rec rec-standart"></div>
                        </div>
                        <div className="stage stage-2">
                            <div className="sq">Контактные данные</div>
                            <div className="rec rec-standart rec-2"></div>
                        </div>
                        <div className="stage stage-3">
                            <div className="sq">Доставка</div>
                            <div className="rec rec-standart rec-3"></div>
                        </div>
                        <div className="stage stage-4">
                            <div className="sq sq-end sq-active" >Завершение</div>
                        </div>
                    </div>
                </div>


                <div className="cart-list cart-list-110">
                    <p className="cart-text cart-text-36">Заказ успешно создан</p>
                    <div className="successfully-box">
                        <p className="successfully">Заказ №100001 был создан. Вы можете просмотреть список всех ваших
                            заказов в личном кабинете.</p>
                        <Link to={HISTORY_ROUTE} className="item-row__del item-row__del-ml">Перейти в личный кабинет</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartStepFour;