import React, {useContext, useEffect, useState} from 'react';
import './Main.sass';
import Select from "../../Components/UI/Select/Select";
import Checkbox from "../../Components/UI/Checkbox/Checkbox";
import Card from "../../Components/Card/Card";
import PageBox from "../../Components/PageBox/PageBox";
import axios from "axios";
import {IBrands, ICategories, IGeneration, IItems, IModels, IPages, Item} from "../../types/types";
const Main = () => {
    const defaultCategories: ICategories = {
        items: [],
        name: '',
        standard: ''
    };
    const defaultModels: IModels = {
        items: [],
        name: '',
        standard: ''
    };
    const defaultMark: IBrands = {
        items: [],
        name: '',
        standard: ''
    };
    const defaultGeneration: IGeneration = {
        items: [],
        name: '',
        standard: ''
    };
    const defaultItems: IItems = {
        items: []
    };
    const [category, setCategory] = useState<ICategories>(defaultCategories);
    const [model, setModel] = useState<IModels>(defaultModels);
    const [mark, setMark] = useState<IBrands>(defaultMark);
    const [generation, setGeneration] = useState<IGeneration>(defaultGeneration);
    const [curPage ,setCurPage] = useState<number>(1);
    const [lastPage ,setLastPage] = useState<number>(0);
    const [selectedMark, setSelectedMark] = useState<string | number>('Все марки');
    const [items, setItems] = useState<Item[]>(defaultItems.items);
    const [pages, setPages] = useState<IPages>({
        totalPages: 0,
        currentPage: 1,
    });

    useEffect(()=>{
        axios.get(`http://frost.runtime.kz/products?page=` +curPage + `&size=4`)
            .then(res => {
                    setCurPage(res.data['currentPage']);
                    setLastPage(res.data['totalPages']);
                    setItems(res.data['items'])
                }
            )
            .catch(error => {
                console.error(error);
            });
    }, [curPage])

    useEffect(()=>{
       if(selectedMark !== 'Все марки'){
           axios.get(`http://localhost:8080/model?brandid=`+selectedMark)
               .then(res => {
                       const obj: IModels = {
                           name : 'Модели',
                           items : res.data,
                           standard : 'Все модели'
                       };
                       setModel(obj)
                   }
               )
               .catch(error => {
                   console.error(error);
               });
       }

        if(selectedMark === 'Все марки' && mark?.items !== undefined){
            const obj: IModels = {
                name : 'Модели',
                items : [],
                standard : 'Все модели'
            };
                setModel(obj);
            }
    }, [selectedMark])


    useEffect(()=>{
        axios.get(`http://frost.runtime.kz/products?page=1&size=4`)
            .then(res => {
                    setCurPage(res.data['currentPage']);
                    setLastPage(res.data['totalPages']);
                    setItems(res.data['items'])
                }
            )
            .catch(error => {
                console.error(error);
            });

        axios.get(`http://localhost:8080/category`)
            .then(res => {
                const obj = {
                name : 'Категории',
                items : res.data,
                standard : 'Все категории'
                };
                setCategory(obj)
                console.log(obj)
                }
            )
            .catch(error => {
                console.error(error);
            });

        axios.get(`http://localhost:8080/mark`)
            .then(res => {
                const obj = {
                name : 'Марки',
                items : res.data,
                standard : 'Все марки'
                };
                setMark(obj)
                }
            )
            .catch(error => {
                console.error(error);
            });
    }, [])

    useEffect(()=>{
        if(mark.items !== undefined){
            let obj: IModels = {
            name : 'Модели',
            standard : 'Все модели',
            items : []
            };
            setModel(obj);
        }
    },[mark])

    useEffect(()=>{
        let obj: IPages = {
            totalPages: lastPage,
            currentPage: curPage
        }

        setPages(obj);
    }, [curPage, lastPage])

    const handleClick = (val: number) =>{
        setCurPage(val);
    }
    const handleBrandClick = (val: number | string) =>{
        setSelectedMark(val);
    }

    return (
        <section className="main">
            <div className="container">
                <div className="sort-box">
                        <div className="sort-item" >
                            <span className="sort-item__title">{category.name}</span>
                            <Select def={category.standard} isModel={false} arr={category.items}/>
                        </div>
                    <div className="sort-item" >
                        <span className="sort-item__title">{mark.name}</span>
                        <Select
                            isModel={false} def={mark.standard} click={handleBrandClick} arr={mark.items}/>
                    </div>
                    <div className="sort-item" >
                        <span className="sort-item__title">{model.name}</span>
                        <Select isModel={true} def={model.standard} arr={model.items}/>
                    </div>
                    <div className="sort-item" >
                        <span className="sort-item__title">{category.name}</span>
                        <Select isModel={false} def={category.standard} arr={category.items}/>
                    </div>
                    <Checkbox name={'в наличии'}/>
                </div>
                <div className="item-box">
                    {items.map((el, index)=>(
                        <Card image={el.image} name={el.name} link={el.id} price={el.price} key={index}/>
                    ))}
                </div>
              <PageBox handler={handleClick} pages={pages}/>
            </div>
        </section>
    );
};

export default Main;
