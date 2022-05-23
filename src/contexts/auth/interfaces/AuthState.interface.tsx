export interface IAuthState {
	email: string;
	cities: City[];
	favorites: City[];
	notifications: AlertNotification[];
}

export interface City {
	name: string;
	contry: string;
	weather: Weather;
}

export interface Weather {
	description: string;
	id: number;
	main: string;
	icon: string;
	temp: number;
	temp_max: number;
	temp_min: number;
}

export interface AlertNotification {
	cityName: string;
	temperature: string;
}