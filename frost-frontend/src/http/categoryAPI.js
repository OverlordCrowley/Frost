import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchCategories = async () => {
        const {data} = await $host.get('api/category');
        return data;
}

