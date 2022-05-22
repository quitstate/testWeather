import React from 'react';
import LogoIcon from '../assets/LogoIcon';
import useLoginForm from '../hooks/useLoginForm';
import { validEmail, validPassword } from '../utils/RegexValidate';

export interface ILoginFormProps {
    title: string;
    subTitle: string;
}
const LoginForm: React.FC<ILoginFormProps> = ({
    title,
    subTitle
}) => {

    const {
        email,
        password,
        setEmail,
        setPassword,
        onSubmit
    } = useLoginForm();

    const isDisabled = !validEmail.test(email) || !validPassword.test(password);

    return <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <LogoIcon
                    className="mx-auto h-12 w-12"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
                <p className="text-center font-medium text-indigo-600 hover:text-indigo-500">
                    {subTitle}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            { 
                                    (email && !validEmail.test(email)) &&
                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                            Your email address must contain a single @
                                        </p>
                                }
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                { 
                                    (password && !validPassword.test(password)) &&
                                        <p className="mt-2 text-sm text-red-600" id="email-error">
                                            Your password must be less than 8 characters.
                                        </p>
                                }

                            </div>
                        </div>

                        <div>
                            <button
                                disabled={isDisabled}
                                onClick={() => onSubmit(email, password)}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 ${(validEmail.test(email) && validPassword.test(password)) && 'hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default LoginForm;