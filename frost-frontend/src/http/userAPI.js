import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name, first_name) => {
    const {data} = await $host.post('api/user/registration', {email, password, name, first_name})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getUserInfo = async ({id}) => {
    const {data} = await $host.post(`api/user/getInfo`, {'userId' : id} )
    return data
}

export const updateUserInfo = async ({userId,first_name,second_name,last_name,email,tel,country,region,city,street,home,number}) => {
    const {data} = await $host.post('api/user/', {userId,first_name,second_name,last_name,email,tel,country,region,city,street,home,number} )
    return data
}

export const forgotPassword = async ({email}) => {
    const {data} = await $host.post('api/user/forgot', {email} )
    return data
}

export const passwordChange = async ({oldPass, newPass, token}) => {
    const {data} = await $host.post(`api/user/reset/${token}`, {oldPass, newPass} )
    return data
}



