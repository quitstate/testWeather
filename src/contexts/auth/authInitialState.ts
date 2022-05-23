import { IAuthState } from './interfaces/AuthState.interface';

export const authInitialState: IAuthState = {
	isAuthenticated: false,
	email: '',
	cities: [],
	favorites: [],
	notifications: []
};
export default authInitialState;
