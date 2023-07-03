import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchBrands = async () => {
        const {data} = await $host.get('api/brand');
        return data;
}

