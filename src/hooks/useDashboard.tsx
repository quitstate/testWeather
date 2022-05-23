import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthActionTypes } from "../contexts/auth/interfaces/AuthActions.interface";
import { AlertNotification, City } from "../contexts/auth/interfaces/AuthState.interface";
import useGetAuthContext from "./context-hooks/useGetAuthContext";
import useGetWeather from "./react-query/useGetWeather";

const useDashboard = () => {

    const router = useRouter();
    const [cityName, setCityName] = useState('Miami');
    const [cityNotification, setCityNotification] = useState('Miami');
    const [stateName, setStateName] = useState('Florida');
    const [zipCode, setZipCode] = useState('');
    const [temperature, setTemperature] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [messageToast, setMessageToast] = useState('');
    const [typeToast, setTypeToast] = useState<'success' | 'error' | 'warning'>('success');
    const [isHotOrCold, setIsHotOrCold] = useState(false);
    const { refetch } = useGetWeather(cityName, zipCode);
    const { authState, authDispatch } = useGetAuthContext();

    const checkNotifications = () => {
        if (authState.notifications.length > 0) {
            authState.notifications.forEach((notification) => {
                authState.favorites.forEach((favorite) => {
                    if (notification.isHotOrCold && favorite.weather.temp >= parseInt(notification.temperature) && favorite.name === notification.cityName) {
                        setMessageToast(`City ${notification.cityName} is hotter than ${notification.temperature} degrees`);
                        setTypeToast('warning');
                        setShowToast(true);
                        authDispatch({
                            type: AuthActionTypes.REMOVE_NOTIFICATIONS,
                            payload: notification,
                        });
                        return ;
                    } else if (!notification.isHotOrCold && favorite.weather.temp <= parseInt(notification.temperature) && favorite.name === notification.cityName) {
                        setMessageToast(`City ${notification.cityName} is colder than ${notification.temperature} degrees`);
                        setTypeToast('warning');
                        setShowToast(true);
                        authDispatch({
                            type: AuthActionTypes.REMOVE_NOTIFICATIONS,
                            payload: notification,
                        });
                        return ;
                    } 
                })
            })
        } 
    }

    useEffect(() => {
        refetch();
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
                temperature: temperature,
                isHotOrCold: isHotOrCold
            },
        });
        setMessageToast(`City ${cityNotification} added to notifications`);
        setTypeToast('success');
        setShowToast(true);
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

    const handleOnClickSignOut = () => {
        console.log('sign out');
        authDispatch({
            type: AuthActionTypes.LOGOUT,
            payload: null,
        });
        router.push('/');
    }

    return {
        cityName,
        zipCode,
        authState,
        cityNotification,
        stateName,
        showToast,
        messageToast,
        typeToast,
        temperature,
        isHotOrCold,
        checkNotifications,
        setIsHotOrCold,
        handleOnChangeCity,
        handleOnChangeCityNotification,
        handleOnChangeState,
        handleOnChangeZipCode,
        handleOnCloseToast,
        handleOnChangeTemperature,
        handleOnClickAddNotification,
        handleOnClickAdd,
        handleOnClickRemove,
        handleOnClickRemoveNotification,
        handleOnClickSignOut
    };
}

export default useDashboard;