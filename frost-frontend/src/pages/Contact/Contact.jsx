import React, {useEffect, useState} from 'react';
import './Contact.sass';
import {Link} from "react-router-dom";
import Select from "../../Components/UI/Select/Select";
const Contact = () => {
    let [selectItem, setSelectItem] = useState([
        {
            name: 'Способ оплаты',
            def: 'Оплата при получении',
            arr: ['Оплата при получении',1]
        }
    ]);
    let [items, setItems] = useState([
        {
          id: 1,
          name: 'Компрессор кондиционера Hyundai Tucson, Kia Sportage 97701-2E300FD; 0935-03se; Kia Sportage 97701-2E300FD; 0935-02',
          count: 1,
          pricePerOne: 110999,
          price: 0,
          articul: 'AC97701',
        },
        {
            id: 2,
            name: 'Компрессор кондиционера Hyundai Tucson, Kia Sportage 97701-2E300FD; 0935-03se',
            count: 1,
            pricePerOne: 95999,
            price: 0,
            articul: 'AC97701',
        },
    ]);
    let [total, setTotal] = useState(0);
    useEffect(()=>{
        let all = 0;
        let arrs = [];
        items.map((el)=>{
            let obj = el;
            obj.price = obj.count * obj.pricePerOne
            arrs.push(obj);

            all+= el.count * el.pricePerOne;
        })
        setItems(arrs);
        setTotal(all);
    },[])

    useEffect(()=>{
        let all = 0;
        items.map(el=>{
            all+= el.count * el.pricePerOne;
        })
        setTotal(all);
    },[items])



    function deleteItem(index){
        let oldList = [...items];
        let newList = [];
        oldList.map((el)=>{
            if(el.id !== index){
                newList.push(el);
            }
        })
        setItems(newList);
    }
    function removeCount(id){
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                const updatedCount = item.count - 1;
                if (updatedCount <= 0) {
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
            obj.price = obj.count * obj.pricePerOne
            arrs.push(obj);
        })
        setItems(arrs);
    }
    function addCount(id){
        let oldList = [...items];
        let newList = [];
        oldList.map((el,index)=>{
            let obj = el;
            if(el.id === id){
                obj.count++;
                newList.push(obj);
            }else{
                newList.push(el);
            }

        })
        updatePrice();
        setItems(newList);
    }


    return (
        <section className="preparation">
            <div className="container preparation-container">
                <div className="top-container">
                    <h6 className="preparation-title">Оформление заказа</h6>
                    <div className="stage-box">
                        <div className="stage stage-1">
                            <div className="sq sq-active">Корзина</div>
                            <div className="rec"></div>
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
                                    <p className="item-row__text">{el.name}</p>
                                    <span className="item-row__art">Артикул: {el.articul}</span>
                                    <button className="item-row__del"
                                            onClick={(e)=>{deleteItem(el.id)}} >
                                        Удалить из корзины</button>
                                </div>
                                <div className="item-col-2">
                                    <button className="btn-minus" onClick={(e)=>{removeCount(el.id)}}>-</button>
                                    <span className="item-row__numb">{el.count}</span>
                                    <button className="btn-plus" onClick={(e)=>{addCount(el.id)}}>+</button>
                                </div>
                                <div className="item-col-3">
                                    <span className="item-row__price">{Math.floor(el.price/1000)} {el.price%1000} тг</span>
                                </div>
                            </div>
                        ))}

                        <div className="conclusion">
                            <div className="payment-box">
                                {selectItem.map((el,index)=>(
                                    <div className="sort-item" style={{marginLeft: 0}} key={index}>
                                        <span className="sort-item__title">{el.name}</span>
                                        <Select  arr={el}/>
                                    </div>
                                ))}
                            </div>
                            <div className="full-price-box">
                                <span className="full-price__text">Итого к оплате:</span>
                                <span className="full-price__price">{Math.floor(total/1000)}  {total%1000}</span>
                            </div>
                        </div>

                    </div>) : (  <div className="cart-list">
                    <p className="cart-text">Корзина пустая</p>
                </div>)}
                {items.length > 0 ? (
                    <Link to="/" className="checkout-btn btn-blue-effect">Оформить заказ</Link>) : ""}
            </div>
        </section>
    );
};

export default Contact;