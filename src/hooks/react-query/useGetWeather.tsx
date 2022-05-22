import { useQuery } from 'react-query';
import { AuthActionTypes } from '../../contexts/auth/interfaces/AuthActions.interface';
// import { toast } from 'react-toastify';
import { getWeather, Params } from '../../middlewares/apiWeather';
import REACT_QUERY from '../../utils/enums/react-query';
import useGetAuthContext from '../context-hooks/useGetAuthContext';

const useGetWeather = () => {

    let params: Params = {
        appid: ''
    };

	const { authState, authDispatch  } = useGetAuthContext();
	const weatherResult = () => {
		return {
			onSuccess,
			onError,
			onSettled,
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
    
	const onSettled = (data: any, error: any): void => { return; };

	return useQuery(
		REACT_QUERY.GET_WEATHER, 
		() => getWeather(params), 
		weatherResult()
	);

};


export default useGetWeather;