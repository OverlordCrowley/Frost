import React, {useEffect, useState} from 'react';
import './Cart.sass';
import {Link, useNavigate} from "react-router-dom";
import Select from "../../Components/UI/Select/Select";
import jwt_decode from "jwt-decode";
import {deleteItem, fetchCartItems, updateItem} from "../../http/basketAPI";
import {BASKET_ROUTE_STEP_TWO} from "../../utils/consts";
import {updateUserInfo} from "../../http/userAPI";
import {addOrUpdateOrder} from "../../http/orderAPI";
const Cart = () => {

    let [selectItem, setSelectItem] = useState(
        {
            items: [{id: 1, name: 'Оплата при получении'}, {id: 2, name: 'Оплата Картой'}],
            name: 'Способ оплаты',
            standard: "Оплата картой"
        }
    );
    let [payment, setPayment] = useState('2');
    let [items, setItems] = useState([]);
    let [total, setTotal] = useState(0);
    let navigate = useNavigate();

    useEffect(()=>{
        let all = 0;
        let arrs = [];

        let storedToken = localStorage.getItem('token');

        if(storedToken){
            let token = jwt_decode(storedToken)
            fetchCartItems({'id':token.id}).then(res=>{
                res.basketDevices.map((el)=>{
                    let obj = el;
                    el = el.count * obj.device.price
                    arrs.push(obj);
                    all+= el.count * obj.device.price;
                })
                setItems(arrs);
                setTotal(all);
            })
                .catch(error=>{
                    console.log(error)
                })

        }

    },[])

    useEffect(()=>{
        let all = 0;
        items.map(el=>{
            all+= el.count * el.device.price;
        })
        setTotal(all);
    },[items])



    function deleteOneItem(index){
        let oldList = [...items];
        let newList = [];
        oldList.map((el)=>{
            if(el.device.id !== index){
                newList.push(el);
            }
            else{
                let token = jwt_decode(localStorage.getItem('token'))
                deleteItem({'deviceId': el.device.id, 'userId': token.id}).then(r => {
                })
            }
        })
        setItems(newList);
    }
    function removeCount(id){
        const updatedItems = items.map((item) => {
            if (item.device.id === id) {
                const updatedCount = item.count - 1;
                let token = jwt_decode(localStorage.getItem('token'))
                updateItem({'deviceId': item.device.id, 'userId': token.id, 'count': item.count}).then(r => {

                })
                if (updatedCount <= 0) {
                    deleteItem({'deviceId': item.device.id, 'userId': token.id}).then(r => {

                    })
                    return null;
                } else {
                    return { ...item, count: updatedCount };
                }
            } else {
                return item;
            }
        }).filter(Boolean);

        setItems(updatedItems);
    }
    function updatePrice(){
        let arrs = [];
        let arr = [...items];
        arr.map((el)=>{
            let obj = el;
            obj.totalPrice = obj.count * obj.device.price
            arrs.push(obj);
        })
        setItems(arrs);
    }
    function addCount(id){
        let oldList = [...items];
        let newList = [];
        oldList.map((el,index)=>{
            let obj = el;
            if(el.device.id === id && obj.count < 10){
                obj.count++;
                let token = jwt_decode(localStorage.getItem('token'))
                updateItem({'deviceId': obj.device.id, 'userId': token.id, 'count': el.count}).then(r => {

                })
                newList.push(obj);
            }else{
                newList.push(el);
            }

        })
        updatePrice();
        setItems(newList);
    }

    const UpdateData = () => {
        let token = null;
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            token = jwt_decode(storedToken);
        }
        if(token){
            addOrUpdateOrder({
                "userId" : token.id,
                "first_name" : undefined,
                "second_name" : undefined,
                "last_name" : undefined,
                "email" : undefined,
                "tel" : undefined,
                "country" : undefined,
                "region" : undefined,
                "city" : undefined,
                "street" : undefined,
                "home" : undefined,
                "number" : undefined,
                "position": false,
                "paymentMethod" : payment,

            }).then(
                res=>{
                    navigate(BASKET_ROUTE_STEP_TWO)
                }
            )
                .catch(e=>{
                    console.log(e)
                })
        }
    }

    const updatePayment = (val) => {
        setPayment(val)
    }

    return (
        <section className="preparation">
            <div className="container preparation-container">
                <div className="top-container">
                    <h6 className="preparation-title">Оформление заказа</h6>
                    <div className="stage-box">
                        <div className="stage stage-1 stage-1-ml">
                            <div className="sq sq-active">Корзина</div>
                            <div className="rec rec-a"></div>
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
                            <div className="sq sq-end">Завершение</div>
                        </div>
                    </div>
                </div>


                {items.length > 0 ? ( <div className="cart-list">
                        <p className="cart-text">Корзина</p>
                        <div className="main-row">
                            <span className="th item-name">Наименование товара</span>
                            <span className="th item-quantity">Количество</span>
                            <span className="th item-price">Цена</span>
                        </div>

                        {items.map((el,index)=>(
                            <div className="item-row" key={index}>
                                <div className="item-col-1">
                                    <p className="item-row__text">{el.device.name}</p>
                                    <span className="item-row__art">Артикул: {el.device.code}</span>
                                    <button className="item-row__del"
                                            onClick={(e)=>{deleteOneItem(el.device.id)}} >
                                        Удалить из корзины</button>
                                </div>
                                <div className="item-col-2">
                                    <button className="btn-minus" onClick={(e)=>{removeCount(el.device.id)}}>-</button>
                                    <span className="item-row__numb">{el.count}</span>
                                    <button className="btn-plus" onClick={(e)=>{addCount(el.device.id)}}>+</button>
                                </div>
                                <div className="item-col-3">
                                    <span className="item-row__price">{el.device.price * el.count} тг</span>
                                </div>
                            </div>
                        ))}

                        <div className="conclusion">
                            <div className="payment-box">

                                    <div className="sort-item" style={{marginLeft: 0}}>
                                        <span className="sort-item__title">{selectItem.name}</span>
                                        <Select click={updatePayment} def={selectItem.standard}  arr={selectItem.items} />
                                    </div>
                            </div>
                            <div className="full-price-box">
                                <span className="full-price__text">Итого к оплате:</span>
                                <span className="full-price__price">{total} тг</span>
                            </div>
                        </div>

                    </div>) : (  <div className="cart-list">
                    <p className="cart-text">Корзина пустая</p>
                </div>)}
                {items.length > 0 ? (
                    <button onClick={UpdateData} className="checkout-btn btn-blue-effect">Оформить заказ</button>) : ""}
            </div>
        </section>
    );
};

export default Cart;