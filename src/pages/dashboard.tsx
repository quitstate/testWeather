import { CheckCircleIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import NotificationCard from '../components/NotificationCard';
import Select from '../components/Select';
import Toast from '../components/Toast';
import WeatherCard from '../components/WeatherCard';
import { AuthActionTypes } from '../contexts/auth/interfaces/AuthActions.interface';
import { AlertNotification, City } from '../contexts/auth/interfaces/AuthState.interface';
import useGetAuthContext from '../hooks/context-hooks/useGetAuthContext';
import useGetWeather from '../hooks/react-query/useGetWeather';
import { cities } from '../utils/Cities';

export interface IDashboardViewProps { }
const dashboard: React.FC<IDashboardViewProps> = () => {

    const [cityName, setCityName] = useState('Miami');
    const [cityNotification, setCityNotification] = useState('Miami');
    const [stateName, setStateName] = useState('Florida');
    const [zipCode, setZipCode] = useState('');
    const [temperature, setTemperature] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState('');
    const [typeToast, setTypeToast] = useState<'success' | 'error' | 'warning'>('success');

    const { refetch } = useGetWeather(cityName, zipCode);
    const { authState, authDispatch } = useGetAuthContext();


    useEffect(() => {
        refetch();

        if(authState.notifications.length > 0){
            authState.notifications.forEach((notification) => {
                authState.favorites.forEach((favorite) => {
                    if(favorite.weather.temp >= parseInt(notification.temperature)){
                        setMessageToast(`City ${notification.cityName} is hotter than ${notification.temperature} degrees`);
                        setTypeToast('warning');
                        setShowToast(true);
                    }
                })
            })
        }


    }, [cityName, zipCode, authState.notifications]);

    const handleOnChangeCity = (value: any) => {
        setCityName(value);
    }

    const handleOnChangeCityNotification = (value: any) => {
        setCityNotification(value);
    }

    const handleOnChangeState = (value: any) => {
        setStateName(value);
    }

    const handleOnChangeZipCode = (value: any) => {
        setZipCode(value);
    }

    const handleOnCloseToast = () => {
        setShowToast(false);
    }

    const handleOnChangeTemperature = (value: any) => {
        setTemperature(value);
    }

    const handleOnClickAddNotification = () => {
        authDispatch({
            type: AuthActionTypes.ADD_NOTIFICATIONS,
            payload: {
                cityName: cityNotification,
                temperature: temperature
            },
        });
    }

    const handleOnClickAdd = (city: City) => {
        authDispatch({
            type: AuthActionTypes.ADD_FAVORITES,
            payload: city,
        });
        setMessageToast(`City ${city.name} added to favorites`);
        setTypeToast('success');
        setShowToast(true);
    }

    const handleOnClickRemove = (city: City) => {
        authDispatch({
            type: AuthActionTypes.REMOVE_FAVORITES,
            payload: city,
        });
        setMessageToast(`City ${city.name} removed to favorites`);
        setTypeToast('success');
        setShowToast(true);
    }

    const handleOnClickRemoveNotification = (alertNotification: AlertNotification) => {
        authDispatch({
            type: AuthActionTypes.REMOVE_NOTIFICATIONS,
            payload: alertNotification,
        });
        setMessageToast(`City ${alertNotification.cityName} notification removed to notifications`);
        setTypeToast('success');
        setShowToast(true);
    }

    const renderChildren = () => {
        return (
            <div>
                <div className='flex'>
                    <Select
                        className='px-2 w-1/3'
                        title={'States'}
                        options={['Florida']}
                        onChange={handleOnChangeState}
                        value={stateName}
                    />
                    <Select
                        className='px-2 w-1/3'
                        title={'City'}
                        options={cities}
                        onChange={handleOnChangeCity}
                        value={cityName}
                    />
                    <InputText
                        className='px-2 w-1/3'
                        label={'Zip Code'}
                        placeholder={'Please enter your zip code'}
                        value={zipCode}
                        onChange={handleOnChangeZipCode}
                    />
                </div>
                <WeatherCard className='px-2 pt-4 w-full' cities={authState.cities} onClickAdd={handleOnClickAdd} />
                <div>
                    <h1 className="text-2xl font-bold leading-tight text-gray-900 px-2 pt-4">Favorites</h1>
                    {
                        authState.favorites && <WeatherCard className='px-2 pt-4 w-full' cities={authState.favorites} onClickRemove={handleOnClickRemove} />
                    }
                </div>
                <div>
                    <h1 className="text-2xl font-bold leading-tight text-gray-900 px-2 pt-4">Set Notification</h1>
                    <div className='flex items-end'>
                        <Select
                            className='px-2 w-1/3'
                            title={'City'}
                            options={cities}
                            onChange={handleOnChangeCityNotification}
                            value={cityNotification}
                        />
                        <InputText
                            className='px-2 w-1/3 pt-4'
                            label={'Temperature'}
                            placeholder={'Please enter the temperature to be set'}
                            value={temperature}
                            onChange={handleOnChangeTemperature}
                        />
                        <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleOnClickAddNotification}
                        >
                            Add Notification
                        </button>
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold leading-tight text-gray-900 px-2 pt-4">Notifications</h1>
                    {
                        authState.notifications.length > 0 && <NotificationCard alertNotifications={authState.notifications} onClickRemove={handleOnClickRemoveNotification}/>
                    }
                </div>
            </div>
        );
    }
    return (
        <div className=''>
            <Layout children={renderChildren()} />
            <Toast message={messageToast} show={showToast} onClose={handleOnCloseToast} type={typeToast} />
        </div>
    );
};

export default dashboard;