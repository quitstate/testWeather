import { useContext } from 'react';
import AuthContext from '../../contexts/auth/AuthContext';
import { AuthActionTypes } from '../../contexts/auth/interfaces/AuthActions.interface';


export const useGetAuthContext = () => {
	const { authState, authDispatch } = useContext(AuthContext);
	const logout = () => {
		authDispatch({
			type:AuthActionTypes.LOGOUT,
			payload: true
		});
		window.open('/', '_self');
	};

	return { authState, authDispatch , logout };
};

export default useGetAuthContext;