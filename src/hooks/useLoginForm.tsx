import { useRouter } from "next/router";
import { useState } from "react";
import { AuthActionTypes } from "../contexts/auth/interfaces/AuthActions.interface";
import useGetAuthContext from "./context-hooks/useGetAuthContext";

const useLoginForm = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState('');
    const [typeToast, setTypeToast] = useState<'success' | 'error' | 'warning'>('success');
    const { authDispatch } = useGetAuthContext();

    const handleOnCloseToast = () => {
        setShowToast(false);
    }

    const onSubmit = (emailValue: string, passwordValue: string) => {
        if(emailValue === 'test@gmail.com' && passwordValue === 'testing123'){
            authDispatch({
                type: AuthActionTypes.LOGIN,
                payload: emailValue,
            });
            router.push('/dashboard');
        } else {
            setMessageToast(`Invalid email or password`);
            setTypeToast('warning');
            setShowToast(true);
        }
    }

    return {
        showToast,
        messageToast,
        typeToast,
        email,
        password,
        setEmail,
        setPassword,
        onSubmit,
        handleOnCloseToast
    };
}

export default useLoginForm;
