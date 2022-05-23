import { useQuery } from 'react-query';
import { AuthActionTypes } from '../../contexts/auth/interfaces/AuthActions.interface';
// import { toast } from 'react-toastify';
import { getWeather, Params } from '../../middlewares/apiWeather';
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
        console.log(data);
		authDispatch ({
			type: AuthActionTypes.SET_CITIES,
			payload: data,
		});
	};
    
	const onError = (error: unknown): void => {
		console.log(error);
		//toast.error(showError(iError, SERVICES.ADMIN_USERS));
	};

	return useQuery(
		REACT_QUERY.GET_WEATHER, 
		() => getWeather(params), 
		weatherResult()
	);

};


export default useGetWeather;