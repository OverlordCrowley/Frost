import React, {useEffect, useState} from 'react';
import './Search.sass';
import {fetchItemByCode} from "../../../http/itemAPI";
import {ItemByCode} from "../../../types/types";
import SearchCard from "../../SearchCard/SearchCard";

const zoom = require('../../../images/Group 9.svg').default;

const Search: React.FC = () => {
    let [text, setText] = useState<string>('');
    let [items, setItems] = useState<ItemByCode[]>([]);
    let [isActive, setIsActive] = useState<boolean>(false);


    const sendText = () => {
        fetchItemByCode({'code' : text})
            .then(res => {
                setItems(res)
                }
            )
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(()=>{
        if(items.length > 0){
            setIsActive(true)
        }

    }, [items])

    return (
        <form className="search-block" onMouseLeave={()=>{setIsActive(false)}}>
            <input className="search-field" type="text" placeholder="Поиск по каталогу ..."  value={text} onChange={(e)=>{setText(e.target.value)}}/>
            <button className="search-button" type="button" onClick={sendText}>
                <img className="search-img" src={zoom} alt="Zoom" />
            </button>
            <div className={"miniBlock " + (isActive ? "miniBlock-v": '')} onClick={()=>{
                setIsActive(false);
                setText('');
            }}>
                {items.map(el=>(
                    <SearchCard images={el.images} name={el.name} price={el.price} link={el.id} code={el.code}/>
                ))}
            </div>
        </form>
    );
};

export default Search;