import React, {useEffect, useState} from 'react';
import './Card.sass';
import BlueButton from "../UI/BlueButton/BlueButton";

interface CardProps{
    image: string[],
    name: string,
    price: number,
    link: number
}

const Card: React.FC <CardProps> = (props) => {
    let [image, setImage] = useState<string[]>(props.image);
    let [mainImage, setMainImage] = useState<any>(props.image[0]);
    let [name, setName] = useState<string>(props.name);
    let [price, setPrice] = useState<number>(props.price);
    let [link, setLink] = useState<number>(props.link);
    useEffect(()=>{
        setImage(props.image);
        setMainImage(props.image[0]);
        setName(props.name);
        setPrice(props.price);
        setLink(props.link);
    }, [props.image, props.name, props.price, props.link])

    return (
        <div className="item-box-item">
            <img className="item-box-item__img" src={mainImage ? (process.env.REACT_APP_API_URL + mainImage.path) : require('../../images/Заглушка.png')} alt="Заглушка"/>
            <p className="item-box-item__text">{name}</p>
            <div className="item-box-item__bot">
                <span className="item-box-item__price">{price} тг </span>
                <BlueButton link={link} name='купить'/>
            </div>
        </div>
    );
};

export default Card;