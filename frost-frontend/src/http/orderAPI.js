import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";


export const addOrUpdateOrder = async ({userId,paymentMethod,first_name,second_name,last_name,email,tel,country,region,city,street,home,number,position}) => {
    const {data} = await $host.post('api/order/updateOrder', {userId,paymentMethod,first_name,second_name,last_name,email,tel,country,region,city,street,home,number,position} )
    return data
}

export const getOrderById = async ({userId}) => {
    const {data} = await $host.post('api/order/', {userId} )
    return data
}

