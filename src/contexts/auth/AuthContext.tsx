import { createContext } from 'react';
import { authInitialState } from './authInitialState';
import IAuthActions from './interfaces/AuthActions.interface';
import { IAuthState } from './interfaces/AuthState.interface';

export interface IAuthContexProps {
	authState: IAuthState;
	authDispatch: React.Dispatch<IAuthActions>
}

const AuthContext = createContext<IAuthContexProps>({
	authState: { ...authInitialState },
	authDispatch: () => { return; },
});

export const AuthContextConsumer = AuthContext.Consumer;
export const AuthContextProvider = AuthContext.Provider;
export default AuthContext;
