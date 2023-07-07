import React, {useEffect, useState} from 'react';
import './SearchCard.sass';
import {Link} from "react-router-dom";

interface SearchCardProps{
    images: string[],
    name: string,
    price: number,
    link: number,
    code: string
}

const SearchCard: React.FC<SearchCardProps> = (props) => {

    let [images, setImages] = useState<string[]>(props.images);
    let [mainImage, setMainImage] = useState<any>(props.images[0]);
    let [name, setName] = useState<string>(props.name);
    let [price, setPrice] = useState<number>(props.price);
    let [link, setLink] = useState<number>(props.link);
    let [code, setCode] = useState<any>(props.code);

    useEffect(()=>{
        setMainImage(props.images[0])
    }, [images])


    return (
        <Link to={'/item/'+link} className='miniBlock-item'>
            <img src={mainImage ? (process.env.REACT_APP_API_URL + mainImage.path) : require('../../images/Заглушка.png')} alt="Картинка"/>
            <div className='miniBlock-item-right'>
                <p className='miniBlock-item-right__text'>{name}</p>
                <p className='miniBlock-item-right__text'><b>{price} тг</b></p>
            </div>
        </Link>
    );
};

export default SearchCard;