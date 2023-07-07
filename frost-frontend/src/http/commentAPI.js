import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchComment = async (id) => {
        const {data} = await $host.get('api/comment?id=' + id);
        return data;
}

