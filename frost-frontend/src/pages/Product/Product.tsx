import React, {useContext, useEffect, useState} from 'react';
import './Product.sass';
import {Link, useParams} from "react-router-dom";
import ReviewList from "../../Components/ReviewList/ReviewList";
import List from "../../Components/UI/List/List";
import axios from "axios";
import {Fill, IComment, IFit, IProduct, modalType} from "../../types/types";
import {ModalContext} from "../../store/ModalContext";
import AddToCarModal from "../../Components/Modal/addToCarModal";
import {fetchItemOne} from "../../http/itemAPI";
import {fetchModelsByItemId} from "../../http/modelAPI";
import {fetchComment} from "../../http/commentAPI";


const Product: React.FC = () => {


    const { id } = useParams();
    const [reviews, setReviews] = useState<IComment[]>([]);
    const [images, setImages] = useState([]);
    const [selectImage, setSelectImage] = useState<any>({});
    const [articul, setArticul] = useState<string>('');
    const [setup, setSetup] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [have, setHave] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [desciption, setDescription] = useState<string>(' ');
    const [fit, setFit] = useState<any[]>([]);
    const modalContext = useContext(ModalContext);


    useEffect(()=>{
        fetchItemOne({'id' : Number(id)})
            .then(res => {
                let item: IProduct = {
                    code: '',
                    description: '',
                    name: '',
                    manufacturer: '',
                    price: '',
                };
                setArticul(res.device.code)
                setSetup(res.device.manufacturer)
                setDescription(res.device.description)
                setName(res.device.name)
                setPrice(res.device.price)
                setImages(res.device.images)
                setHave(res.device.available)
                setSelectImage(res.device.images[0])
                }
            )
            .catch(error => {
                console.error(error);
            });

        fetchModelsByItemId(Number(id))
            .then(res => {
                let arr = res.map((el: any)=>{
                    return el.model;
                })

                setFit(arr)
                }
            )
            .catch(error => {
                console.error(error);
            });

        fetchComment(Number(id))
            .then(res => {
                if (res instanceof Object) {
                    const comments: IComment[] = res.comment;
                    setReviews(comments);
                }
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
                    <img className="main-img" src={process.env.REACT_APP_API_URL + selectImage.path} alt="Copressor image"/>
                        <div className="additional-img-box">
                            {images.map((el: any, index)=>(
                                <div className="additional-img__item" key={index} onClick={(e)=>{
                                    setSelectImage(el);
                                }
                                }>
                                    <img src={process.env.REACT_APP_API_URL + el.path} alt="compressor photo" className="additional-img__img"/>
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
                <AddToCarModal name={name} id={Number(id)}/>
            ): ''}

        </section>
    );
};

export default Product;