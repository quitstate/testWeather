import { useQuery } from 'react-query';
import { AuthActionTypes } from '../../contexts/auth/interfaces/AuthActions.interface';
import { getWeather } from '../../middlewares/apiWeather';
import REACT_QUERY from '../../utils/enums/react-query';
import useGetAuthContext from '../context-hooks/useGetAuthContext';

const useGetWeather = (cityName: string, zipcode?: string) => {

    let params = {
        q: `${cityName},${zipcode},us`,
        units: 'metric',
        appid: process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY,
    }

	const { authDispatch  } = useGetAuthContext();
	const weatherResult = () => {
		return {
			onSuccess,
			onError,
			keepPreviousData: false,
			refetchOnMount: true,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: true,
		};
	};
    
	const onSuccess = (data: any): void => { 
		authDispatch ({
			type: AuthActionTypes.SET_CITIES,
			payload: data,
		});
	};
    
	const onError = (error: unknown): void => {
		console.log(error);
	};

	return useQuery(
		REACT_QUERY.GET_WEATHER, 
		() => getWeather(params), 
		weatherResult()
	);

};


export default useGetWeather;