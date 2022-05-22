import axios from "axios";

interface Params {
    appid: string;
    lat?: string;
    lon?: string;
    q?: string;
}

export const getAllRoles = async (params : Params): Promise<any> =>  (
    axios.get(
        `${process.env.OPEN_WEATHER_MAP_API_BASE}`,
        {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            params: params
        }
    )
);