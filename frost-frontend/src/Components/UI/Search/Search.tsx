import React, {useEffect, useState} from 'react';
import './Search.sass';
import {fetchItem, fetchItemByCode} from "../../../http/itemAPI";
import {ItemByCode} from "../../../types/types";

const zoom = require('../../../images/Group 9.svg').default;

const Search: React.FC = () => {
    let [text, setText] = useState<string>('');
    let [items, setItems] = useState<ItemByCode[]>([]);
    let [isActive, setIsActive] = useState<boolean>(false);

    const sendText = () => {
        fetchItemByCode({'code' : text})
            .then(res => {
                setItems(res)
                setIsActive(true)
                console.log(res)
                }
            )
            .catch(error => {
                console.error(error);
            });
    }


    return (
        <form className="search-block" onMouseLeave={()=>{setIsActive(false)}}>
            <input className="search-field" type="text" placeholder="Поиск по каталогу ..."  value={text} onChange={(e)=>{setText(e.target.value)}}/>
            <button className="search-button" type="button" onClick={sendText}>
                <img className="search-img" src={zoom} alt="Zoom" />
            </button>
            <div className={"miniBlock " + (isActive ? "miniBlock-v": '')}>
                {items.map(el=>(
                    <div className='miniBlock-item'>
                        <img src="" alt="Картинка"/>
                        <div className='miniBlock-item-right'>
                            <p className='miniBlock-item-right__text'>Кондиционер</p>
                            <p className='miniBlock-item-right__text'>ЫВАПП;"№ЕН;Е</p>
                        </div>
                    </div>
                ))}
            </div>
        </form>
    );
};

export default Search;