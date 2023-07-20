import React, {useEffect, useState} from 'react';
import Select from "../UI/Select/Select";
import {ISelect} from "../../types/types";
import './History.sass'
import {Link} from "react-router-dom";
import {getOrderById} from "../../http/orderAPI";
import jwt_decode from "jwt-decode";
import {getUserInfo} from "../../http/userAPI";

const HistoryBlock = () => {

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
        let token: any = null;
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            token = jwt_decode(storedToken);
        }

        if(token){
            getOrderById({"userId": token.id}).then((res: any)=>{
                setItems(res.orders)
            })
                .catch(error=>{
                    console.log(error)
                })

        }

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
                                 <td className="orderItem-row__text orderItem-row__text-code">
                                     <b>{el.orderId}</b>
                                 </td>
                                 <td className="orderItem-row__text orderItem-row__text-pd">
                                     {el.devices && el.devices.map((el2: any, index2: number) => (
                                       <>
                                           <p key={index2}>{el2.device.name}</p>
                                           <p style={{marginTop: 10}}>{el2.count} X {el2.device.price}</p>
                                       </>
                                     ))}
                                 </td>
                                 <td className="orderItem-row__text orderItem-date">{el.updatedAt}</td>
                                 <td className="orderItem-row__text orderItem-date">{el.totalCost} тг</td>
                             </tr>


                         )) : 'Список истории заказов пуст'}
                    </tbody>
                 </table>
            </div>

        </div>
    );
};

export default HistoryBlock;