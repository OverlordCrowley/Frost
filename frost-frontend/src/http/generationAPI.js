import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchGeneration = async (modelId) => {
        const {data} = await $host.get('api/generation?modelId=' + modelId);
        return data;
}

