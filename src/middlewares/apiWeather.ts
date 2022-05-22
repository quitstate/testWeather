import axios from "axios";

export interface Params {
    appid?: string;
    lat?: string;
    lon?: string;
    q?: string;
    units?: string;
}

export const getWeather = async (params: Params): Promise<any> =>  {

    let newParams = {
        ...params,
        q: 'Medellin',
        units: 'metric',
        appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY,
    }

    console.log(process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY);


    return axios.get(
        `${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_BASE}`,
        {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            params: newParams
        }
    )
};