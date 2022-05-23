import React, { useReducer } from 'react';

//Auth
import { AuthContextProvider, IAuthContexProps } from './auth/AuthContext';
import { authInitialState } from './auth/authInitialState';
import { authReducer } from './auth/authReducer';

interface IProps {
    children: React.ReactNode;
}

const Context: React.FC<IProps> = (props) => {
    const { children } = props;
    const [authState, authDispatch] = useReducer(authReducer, { ...authInitialState });
    const authContextValues: IAuthContexProps = {
        authState,
        authDispatch,
    };

    return (
        <React.Fragment>
            <AuthContextProvider value={authContextValues}>
                {children}
            </AuthContextProvider>
        </React.Fragment>
    );
};

export default Context;
