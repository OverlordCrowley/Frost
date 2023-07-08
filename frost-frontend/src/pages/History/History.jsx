import React, {useEffect, useState} from 'react';
import './History.sass';
import {Link} from "react-router-dom";
import Select from "../../Components/UI/Select/Select";
const Cart = () => {
    const [activeTab, setActiveTab] = useState('history');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
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

                        <div className="profile-small">
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

                        </div>
                    </div>

                    <Link to="/" className="checkout-btn btn-blue-effect">Оформить заказ</Link>)
            </div>
        </section>
    );
};

export default Cart;