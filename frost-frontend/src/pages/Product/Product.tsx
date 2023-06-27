import React, {useContext, useEffect, useState} from 'react';
import './Product.sass';
import {Link, useParams} from "react-router-dom";
import ReviewList from "../../Components/ReviewList/ReviewList";
import List from "../../Components/UI/List/List";
import axios from "axios";
import {Fill, IComment, IFit, IProduct, modalType} from "../../types/types";
import {ModalContext} from "../../store/ModalContext";
import AddToCarModal from "../../Components/Modal/addToCarModal";

const image1 = require('../../images/5003-01.png');
const image2 = require('../../images/5003-02.png');
const image3 = require('../../images/5003-03.png');
const image4 = require('../../images/5003-04.png');
const Product: React.FC = () => {
    const { id } = useParams() as { id: string };
    const defaultReviews: IComment[] = [
        {
            name: 'Константин Константинович Константинопольский',
            text:
                'Несколько лет покупаю запчасти в этом магазине, ребята очень быстро подбирают, что нужно и по адекватным ценам. Спасибо, что выручаете! Смело рекомендую своим знакомым.',
        },
        {
            name: 'Дмитрий О.',
            text:
                'Скорость обработки заказов и отношение к заказчику радует. Заказывал этот компрессор. После двух месяцев работы нареканий нет.',
        },
    ];
    const [reviews, setReviews] = useState<IComment[]>(defaultReviews);
    const [images, setImages] = useState([
        {
        id: 1,
        src: image1
    },
        {
            id: 2,
            src: image2
        },
        {
            id: 3,
            src: image3
        },
        {
            id: 4,
            src:    image4
        },
    ]);
    const [selectImage, setSelectImage] = useState(images[0]);
    const [articul, setArticul] = useState<string>('AC0053');
    const [setup, setSetup] = useState<string>('DOWOON');
    const [price, setPrice] = useState<string>('110 999');
    const [have, setHave] = useState<boolean>(true);
    const [name, setName] = useState<string>('Компрессор кондиционера Hyundai Tucson, Kia Sportage 97701-2E300');
    const [desciption, setDescription] = useState<string>('Оригинальный компрессор 7H15 MG, муфта под 8-ми ручейковый ремень, управляется напряжением 24 Вольта. Подлинность изделия можно проверить на сайте компании производителя.');
    const [fit, setFit] = useState<IFit[]>([
        {
            id: 1,
            text: 'Kia',
            filling: Fill.full,
            active: true,
            items: [
                {
                    secondId: 1,
                    text: 'Sportage(JE) 2004-2019',
                    filling: Fill.empty,
                    active: false
                },
                {
                    secondId: 2,
                    text: 'Sportage(JE) 2005-2019',
                    filling: Fill.empty,
                    active: false
                },  {
                    secondId: 3,
                    text: 'Sportage(JE) 2006-2019',
                    filling: Fill.empty,
                    active: false
                },
                {
                    secondId: 4,
                    text: 'Sportage(JE) 2008-2019',
                    filling: Fill.empty,
                    active: false
                },

            ]
        },
        {
            id: 2,
            text: 'Hyndai',
            filling: Fill.full,
            active: true,
            items: [
                {
                    secondId: 1,
                    text: 'Tucson(JM) 2004-2010',
                    filling: Fill.full,
                    active: false,
                    items: [
                        {
                            thirdId: 1,
                            text: '2 CRDi',
                            filling: Fill.empty
                        },
                        {
                            thirdId: 2,
                            text: '2 CRDi Привод на все колеса',
                            filling: Fill.empty
                        },
                    ]
                },
                {
                    secondId: 2,
                    text: 'Tucson(JM) 2006-2010',
                    filling: Fill.full,
                    active: false,
                    items: [
                        {
                            thirdId: 1,
                            text: '2 CRDi',
                            filling: Fill.empty
                        },
                        {
                            thirdId: 2,
                            text: '2 CRDi Привод на все колеса',
                            filling: Fill.empty
                        },
                    ]
                },
                {
                    secondId: 3,
                    text: 'Tucson(JM) 2009-2010',
                    filling: Fill.empty,
                    active: false,
                },
            ]
        },
    ]);
    const modalContext = useContext(ModalContext);
    useEffect(()=>{
        axios.get(`http://frost.runtime.kz/products?page=1&size=12`)
            .then(res => {
                let items = res.data['items'];
                let item: IProduct = {
                    code: '',
                    description: '',
                    name: '',
                    manufacturer: '',
                    price: '',
                };
                items.forEach((el:any, index:number)=>{
                    if(el.id.toString() === id){
                        item = el;
                    }
                })
                setArticul(item.code)
                setSetup(item.manufacturer)
                setDescription(item.description)
                setName(item.name)
                setPrice(item.price)
                }
            )
            .catch(error => {
                console.error(error);
            });
    }, [])



    return (
        <section className="main">
            <div className="container product-container">
                <div className="main-left">
                    <img className="main-img" src={selectImage.src} alt="Copressor image"/>
                        <div className="additional-img-box">
                            {images.map((el, index)=>(
                                <div className="additional-img__item" key={index} onClick={(e)=>{
                                    setSelectImage(el);
                                }
                                }>
                                    <img src={el.src} alt="copressor photo" className="additional-img__img"/>
                                </div>
                            ))}


                        </div>
                        <span className="applicable">Применим к автомобилям: </span>
                        <div className="applicable-box">
                            <ul className="applicable-list applicable-list-main">
                                <List list={fit}/>

                            </ul>
                        </div>
                </div>
                <div className="main-right">
                    <div className="description-box">
                        <div className="description">
                            <h3 className="description-title h4-title">{name}</h3>
                            <p className="description-item"><span className="type">Артикул: </span>{articul}</p>
                            <p className="description-item"><span className="type">Производитель: </span>{setup}</p>
                            <p className="description-item"><span className="type">Описание: </span>{desciption}</p>
                        </div>
                        <div className="price-box">
                            <p className="price__numb">{price} тг</p>
                            <div className="price-bot">
                                {have ? ( <div className="price-have">
                                    <p className="price-have__text">в наличии</p>
                                    <p className="price-have__city">г. Нур-Султан</p>
                                    <p className="price-have__city">г. Алматы</p>
                                </div>):(<div className="price-havent">нет в наличии
                                </div>)}
                                <button onClick={()=>{modalContext?.updateValue(modalType.addToCart);}} className="button-blue btn-blue-effect">Купить</button>
                            </div>

                        </div>
                    </div>
                    <div className="reviews-box">
                        <p className="h4-title reviews-title">Отзывы</p>
                        <div className="lets-sin-in">
                            Чтобы оставить отзыв &nbsp;
                            <Link to="/" className="underline-sign">войдите на сайт</Link>
                        </div>

                        <ReviewList list={reviews}/>

                    </div>
                </div>
            </div>
            {modalContext?.value === modalType.addToCart ? (
                <AddToCarModal name={name} id={id}/>
            ): ''}

        </section>
    );
};

export default Product;