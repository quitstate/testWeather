import IAuthActions, { AuthActionTypes } from './interfaces/AuthActions.interface';
import { IAuthState } from './interfaces/AuthState.interface';
import AuthMap from './mapper/AuthMap';

export const authReducer = (
	state: IAuthState,
	action: IAuthActions
): IAuthState => {
	switch (action.type) {

		case AuthActionTypes.INITIAL_STATE:
			return { ...state, ...AuthMap.getInitialState() };

		case AuthActionTypes.LOGIN:
			return { ...state, ...AuthMap.getLoginState(action.payload.data) };

		case AuthActionTypes.LOGOUT:
			return { ...state, ...AuthMap.getLogoutState() };

		case AuthActionTypes.SET_CITIES:
			return {
				...state,
				cities: AuthMap.setCities(action.payload.data)
			};

		case AuthActionTypes.ADD_FAVORITES:
			return {
				...state,
				favorites: AuthMap.addFavorites(state.favorites, action.payload)
			};

		case AuthActionTypes.REMOVE_FAVORITES:
			return {
				...state,
				favorites: AuthMap.removeFavorites(state.favorites, action.payload)
			};

		default:
			return { ...state };
	}
};