import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";



export const fetchRegions = async (id) => {
    const {data} = await $host.get(`api/geolocation/region?countryId=${id}` )
    return data;
}

export const fetchCountry = async () => {
    const {data} = await $host.get('api/geolocation/country' )
    return data;
}



