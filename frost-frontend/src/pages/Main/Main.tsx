import React, {useContext, useEffect, useState} from 'react';
import './Main.sass';
import Select from "../../Components/UI/Select/Select";
import Checkbox from "../../Components/UI/Checkbox/Checkbox";
import Card from "../../Components/Card/Card";
import PageBox from "../../Components/PageBox/PageBox";
import {Fill, IBrands, ICategories, IGeneration, IItems, IModels, IPages, Item} from "../../types/types";
import {fetchCategories} from "../../http/categoryAPI";
import {fetchBrands} from "../../http/brandAPI";
import {fetchModels} from "../../http/modelAPI";
import {fetchGeneration} from "../../http/generationAPI";
import {fetchItem} from "../../http/itemAPI";

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
    const [selectedMark, setSelectedMark] = useState<string | number>('');
    const [selectedModel, setSelectedModel] = useState<string | number>('');
    const [selectedCategory, setSelectedCategory] = useState<string | number>('');
    const [selectedGeneration, setSelectedGeneration] = useState<string | number>('');
    const [selectedAvailable, setSelectedAvailable] = useState<boolean>();
    const [items, setItems] = useState<Item[]>(defaultItems.items);
    const count = 6;
    const [pages, setPages] = useState<IPages>({
        totalPages: 0,
        currentPage: 1,
    });


    useEffect(()=>{
       if(selectedMark !== 'Все марки'){
           fetchModels(selectedMark)
               .then(res => {
                       const obj: IModels = {
                           name : 'Модели',
                           items : res.model,
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
        fetchItem({
            "categoryId" : selectedCategory,
            "modelId" : selectedModel,
            "brandId" : selectedMark,
            "available" : '',
            "generationId" : selectedGeneration,
            "currentPage" : curPage,
            "count" : count})
            .then(res => {

                    setCurPage(res.currentPage);
                    setLastPage(res.totalPages);
                    setItems(res.devices.rows);

                }
            )
            .catch(error => {
                console.error(error);
            });
        fetchCategories()
            .then(res => {

                const obj = {
                name : 'Категории',
                items : res.category,
                standard : 'Все категории'
                };
                setCategory(obj)
                }
            )
            .catch(error => {
                console.error(error);
            });

        fetchBrands()
            .then(res => {
                const obj = {
                name : 'Марки',
                items : res.brand,
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
        fetchItem({
            "categoryId" : selectedCategory,
            "modelId" : selectedModel,
            "brandId" : selectedMark,
            "available" : selectedAvailable,
            "generationId" : selectedGeneration,
            "currentPage" : 1,
            "count" : count})
            .then(res => {
                    setCurPage(res.currentPage);
                    setLastPage(res.totalPages);
                    setItems(res.devices.rows);
                }
            )
            .catch(error => {
                console.error(error);
            });
    }, [selectedCategory, selectedModel, selectedMark, selectedAvailable, selectedGeneration])

    useEffect(()=>{
        fetchItem({
            "categoryId" : selectedCategory,
            "modelId" : selectedModel,
            "brandId" : selectedMark,
            "available" : selectedAvailable,
            "generationId" : selectedGeneration,
            "currentPage" : curPage,
            "count" : count})
            .then(res => {
                    setCurPage(res.currentPage);
                    setLastPage(res.totalPages);
                    setItems(res.devices.rows);
                }
            )
            .catch(error => {
                console.error(error);
            });
    }, [curPage])

    useEffect(()=>{
        fetchGeneration(selectedModel)
            .then(res => {

                let obj;
                if(res.generation){
                    obj = {
                        name : 'Поколение',
                        items : res.generation,
                        standard : 'Все поколения'
                    };
                }


                else{
                    obj = {
                        name : 'Поколение',
                        items : res.arr,
                        standard : 'Все поколения'
                    };

                }
                setGeneration(obj)


                }
            )
            .catch(error => {
                console.error(error);
            });
    }, [selectedModel])

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
    const handleCategoryClick = (val: number | string) =>{
        setSelectedCategory(val);
    }
    const handleModelClick = (val: number | string) =>{
        setSelectedModel(val);
    }
    const handleGenerationClick = (val: number | string) =>{
        setSelectedGeneration(val);
    }
    const handleAvailableClick = (val: boolean) =>{
        setSelectedAvailable(val);
    }

    return (
        <section className="main">
            <div className="container">
                <div className="sort-box">
                        <div className="sort-item" >
                            <span className="sort-item__title">{category.name}</span>
                            <Select def={category.standard} isModel={false} click={handleCategoryClick} arr={category.items}/>
                        </div>
                    <div className="sort-item" >
                        <span className="sort-item__title">{mark.name}</span>
                        <Select
                            isModel={false} def={mark.standard} click={handleBrandClick} arr={mark.items}/>
                    </div>
                    <div className="sort-item" >
                        <span className="sort-item__title">{model.name}</span>
                        <Select isModel={true} def={model.standard} click={handleModelClick} arr={model.items}/>
                    </div>
                    <div className="sort-item" >
                        <span className="sort-item__title">{generation.name}</span>
                        <Select isModel={false} def={generation.standard} click={handleGenerationClick} arr={generation.items}/>
                    </div>
                    <Checkbox name={'в наличии'} onClickHandler={handleAvailableClick}/>
                </div>
                <div className="item-box">
                    {items.map((el, index)=>(
                        <Card image={el.images} name={el.name} link={el.id} price={el.price} key={index}/>
                    ))}
                </div>
              <PageBox handler={handleClick} pages={pages}/>
            </div>
        </section>
    );
};

export default Main;
