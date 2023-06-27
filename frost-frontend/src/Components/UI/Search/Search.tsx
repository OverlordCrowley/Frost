import React from 'react';
import './Search.sass';

const zoom = require('../../../images/Group 9.svg').default;

const Search = () => {
    return (
        <form className="search-block">
            <input className="search-field" type="text" placeholder="Поиск по каталогу ..." />
            <button className="search-button" type="button">
                <img className="search-img" src={zoom} alt="Zoom" />
            </button>
        </form>
    );
};

export default Search;