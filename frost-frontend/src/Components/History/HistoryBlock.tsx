import React, {useEffect, useState} from 'react';
import Select from "../UI/Select/Select";
import {ISelect} from "../../types/types";
import './History.sass'
import {Link} from "react-router-dom";

const HistoryBlock = () => {

    let [selectItem, setSelectItem] = useState([
        {
            name: 'Способ оплаты',
            def: 'Оплата при получении',
            arr: ['Оплата при получении',1]
        }
    ]);
    let [items, setItems] = useState<any[]>([
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
        let arrs: any[] = [];
        items.map((el)=>{
            let obj = el;
            obj.price = obj.count * obj.pricePerOne
            arrs.push(obj);

            all+= el.count * el.pricePerOne;
        })
        setItems(arrs);
        setTotal(all);
    },[])


    return (
        <div>
            <div className="profile-small history-small">
                <p className="orderItem-text">История заказов</p>
                <table>
                    <thead>
                    <tr className="orderItem-rows">
                        <th className="th orderItem-number">Номер заказа</th>
                        <th className="th orderItem-name">Наименование товара</th>
                        <th className="th orderItem-date">Дата заказа</th>
                        <th className="th orderItem-price">Стоимость</th>
                    </tr>
                    </thead>
                     <tbody>
                         {items ? items.map((el,index)=>(
                             <tr className="orderItem-row" key={index}>
                                 <td className="orderItem-row__text orderItem-row__text-code"><b>1</b></td>
                                 <td className="orderItem-row__text orderItem-row__text-pd">{el.name}</td>
                                 <td className="orderItem-row__text orderItem-date">06.07.2019</td>
                                 <td className="orderItem-row__text orderItem-date">206 998 тг</td>
                             </tr>
                         )) : 'Список истории заказов пуст'}
                    </tbody>
                 </table>
            </div>

        </div>
    );
};

export default HistoryBlock;