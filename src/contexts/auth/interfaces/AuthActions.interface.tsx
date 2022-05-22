export interface IAuthActions {
    type: AuthActionTypes;
    payload: any;
}

export enum AuthActionTypes {
	INITIAL_STATE = 'INITIAL_STATE',
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	SET_CITIES = 'SET_CITIES',
}
export default IAuthActions;