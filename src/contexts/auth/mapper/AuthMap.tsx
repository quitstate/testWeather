import WeatherListResponseDto from '../../../middlewares/dtos/response/weatherList.response.dto';
import authInitialState from '../authInitialState';
import { City, IAuthState } from '../interfaces/AuthState.interface';

export class AuthMap {
	public static getInitialState = () => {
		return { ...authInitialState };
	};

	public static getLoginState = (data: any): IAuthState => {
		try {
			const { email } = data;
			return {
				...authInitialState,
				email,
			};
		} catch (error) {
			return { ...authInitialState };
		}
	};

	public static getLogoutState = (): IAuthState => {
		return { ...authInitialState };
	};

	public static setCities = (
		weatherResponse: WeatherListResponseDto,
	): City[] => {
		console.log(weatherResponse);
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

}

export default AuthMap;