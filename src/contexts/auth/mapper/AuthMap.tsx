import WeatherListResponseDto from '../../../middlewares/dtos/response/weatherList.response.dto';
import authInitialState from '../authInitialState';
import { AlertNotification, City, IAuthState } from '../interfaces/AuthState.interface';

export class AuthMap {
	public static getInitialState = () => {
		return { ...authInitialState };
	};

	public static getLoginState = (data: any): IAuthState => {
		try {
			return {
				...authInitialState,
				email: data,
				isAuthenticated: true,
			};
		} catch (error) {
			return { ...authInitialState };
		}
	};

	public static getLogoutState = (): IAuthState => {
		return { ...authInitialState, isAuthenticated: false };
	};

	public static setCities = (
		weatherResponse: WeatherListResponseDto,
	): City[] => {
		let cities: City[] = [ ...authInitialState.cities	];
		cities.push({
			name: weatherResponse.name,
			contry: weatherResponse.sys.country,
			weather: {
				description: weatherResponse.weather[0]?.description,
				id: weatherResponse.weather[0]?.id,
				main: weatherResponse.weather[0]?.main,
				icon: weatherResponse.weather[0]?.icon,
				temp: weatherResponse.main.temp,
				temp_max: weatherResponse.main.temp_max,
				temp_min: weatherResponse.main.temp_min,
			},
		});

		return cities;
	};

	public static addFavorites = (
		favorites: City[],
		city: City,
	): City[] => {

		if(!favorites.includes(city)){
			favorites.push(city);
		}

		return favorites;
	};

	public static removeFavorites = (
		favorites: City[],
		city: City,
	): City[] => {

		let result = [...favorites];	

		return result.filter(data => data.name !== city.name);
	};

	public static addNotifications = (
		notifications: AlertNotification[],
		notification: AlertNotification,
	): AlertNotification[] => {

		if(!notifications.includes(notification)){
			notifications.push(notification);
		}

		return notifications;
	};

	public static removeNotifications = (
		notifications: AlertNotification[],
		notification: AlertNotification,
	): AlertNotification[] => {

		let result = [...notifications];	

		return result.filter(data => data.cityName !== notification.cityName);
	};

}

export default AuthMap;