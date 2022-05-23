import { IAuthState } from './interfaces/AuthState.interface';

export const authInitialState: IAuthState = {
	email: '',
	cities: [],
	favorites: [],
	notifications: []
};
export default authInitialState;
