import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const fetchRestaurant = async () => {
    const {data} = await $host.get('api/restaurant', )
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (restaurant) => {
    const {data} = await $host.get('api/device', {params: {
            restaurant
        }})
    return data
}

export const createRestaurantType = async ({name, restaurantId}) => {
    const {data} = await $authHost.post('api/restaurantType', {name, restaurantId})
    return data
}

export const fetchRestaurantTypes = async () => {
    const {data} = await $host.get('api/restaurantType')
    return data
}

export const fetchRestaurantTypesById = async (id) => {
    const {data} = await $host.get('api/restaurantType/'+id)
    return data
}

export const fetchRestaurantAllTypesById = async (id) => {
    const {data} = await $host.get('api/restaurantType/alltype/'+id)
    return data
}


export const createBasketCard = async ({userId, deviceId}) => {

    try{
        const {data} = await $authHost.post('api/basket', {userId, deviceId})
        alert("Товар был успешно добавлен в корзину")
        return data
    }
    catch (e){
        alert("Товар уже был добавлен в корзину ранее")
    }
}

export const fetchBasketCards = async ({userId}) => {
        try{
            const {data} = await $host.post('api/basket/user', {userId})
            return data
        }
        catch (e){
            console.log(e)
        }
}

export const deleteBasketCard = async ({userId, deviceId}) => {
    const {data} = await $host.delete('api/basket/', { data: { 'userId': userId, 'deviceId': deviceId } })
    return data
}

export const updateBasketCard = async ({userId, deviceId, count}) => {
    const {data} = await $host.put('api/basket/', {userId, deviceId, count})
    return data
}

export const changeOrder = async ({orderId, text}) => {
    const {data} = await $host.post('api/order/update', {orderId, text})
    return data
}

export const fetchOrder = async () => {
    const {data} = await $host.get('api/order/')
    return data
}

export const addEmail = async ({email, message}) => {
   try {
       const {data} = await $host.post('api/email/', {email, message})
       return data
   }
   catch (e){
       alert('Невозможно обратиться')
   }
}


