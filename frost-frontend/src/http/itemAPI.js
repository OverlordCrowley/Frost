import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchItem = async ({categoryId, modelId, brandId, available, generationId, currentPage, count}) => {
        const {data} = await $host.get(`api/device?categoryId=${categoryId}&modelId=${modelId}&brandId=${brandId}&available=${available}&generationId=${generationId}&currentPage=${currentPage}&count=${count}`);
        return data;
}

export const fetchItemByCode = async ({code}) => {
        const {data} = await $host.get(`api/device/code?code=${code}` );
        return data;
}

export const fetchItemOne = async ({id}) => {
        const {data} = await $host.get(`api/device/one?id=${id}` );
        return data;
}


