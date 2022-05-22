import { useRouter } from "next/router";
import { useState } from "react";

const useLoginForm = () => {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (emailValue: string, passwordValue: string) => {
        if(emailValue === 'test@gmail.com' && passwordValue === 'testing123'){
            router.push('/dashboard');
        } else {
            alert('Invalid email or password');
        }
    }

    return {
        email,
        password,
        setEmail,
        setPassword,
        onSubmit
    };
}

export default useLoginForm;