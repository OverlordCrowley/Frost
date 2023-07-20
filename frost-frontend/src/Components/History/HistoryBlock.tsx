import React, {useEffect, useState} from 'react';
import './History.sass'
import {getOrderById} from "../../http/orderAPI";
import jwt_decode from "jwt-decode";
const HistoryBlock = () => {

    let [items, setItems] = useState<any[]>([]);
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
                <thead>
                <tr className="orderItem-rows">
                    <th className="th orderItem-number">Номер заказа</th>
                    <th className="th orderItem-name">Наименование товара</th>
                    <th className="th orderItem-date">Дата заказа</th>
                    <th className="th orderItem-price">Стоимость</th>
                </tr>
                </thead>
                <tbody>
                {items && items.length > 0 ? items.map((el,index)=>(
                    <tr className="orderItem-row" key={index}>
                        <td className="orderItem-row__text orderItem-row__text-code">
                            <b>{el.orderId}</b>
                        </td>
                        <td className="orderItem-row__text orderItem-row__text-pd">
                            {el.devices && el.devices.map((el2: any, index2: number) => (
                                <div key={index2}>
                                    <p key={index2}>{el2.device.name}</p>
                                    <p style={{marginTop: 10}}>{el2.count} X {el2.device.price}</p>
                                </div>
                            ))}
                        </td>
                        <td className="orderItem-row__text orderItem-date">{el.updatedAt}</td>
                        <td className="orderItem-row__text orderItem-date">{el.totalCost} тг</td>
                    </tr>


                )) : 'Список истории заказов пуст'}
                </tbody>
            </div>

        </div>
    );
};

export default HistoryBlock;