import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchModels = async (brandId) => {
        const {data} = await $host.get('api/model?brandId=' + brandId);
        return data;
}

