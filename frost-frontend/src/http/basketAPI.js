import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";



export const fetchCartItems = async ({id}) => {
    const {data} = await $authHost.post('api/basket/basket', {id} )
    return data;
}

export const addCartItem = async ({userId, deviceId, count}) => {
    const {data} = await $authHost.post('api/basket/', {userId, deviceId, count} )
    return data;
}

export const updateItem = async ({userId, deviceId, count}) => {
    const {data} = await $authHost.put('api/basket/', {userId, deviceId, count} )
    return data;
}

export const deleteItem = async ({deviceId, userId}) => {
    const {data} = await $authHost.delete(`api/basket?deviceId=${deviceId}&userId=${userId}` )
    return data;
}

