import React from 'react';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import NotificationCard from '../components/NotificationCard';
import Select from '../components/Select';
import Toast from '../components/Toast';
import WeatherCard from '../components/WeatherCard';
import { cities } from '../utils/Cities';
import useDashboard from '../hooks/useDashboard';

export interface IDashboardViewProps { }
const dashboard: React.FC<IDashboardViewProps> = () => {

    const {
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
    } = useDashboard();

    const renderChildren = () => {
        return (
            <div>
                {authState.isAuthenticated ? (
                    <>
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
                                    onClick={() => setIsHotOrCold(!isHotOrCold)}
                                    className={` inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white ${isHotOrCold ? 'bg-red-500 focus:ring-red-500' : 'bg-blue-500 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:ring-offset-2`}
                                >
                                    {isHotOrCold ? 'Hot' : 'Cold'}
                                </button>
                                <button
                                    type="button"
                                    className="mx-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleOnClickAddNotification}
                                >
                                    Add Notification
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    onClick={checkNotifications}
                                >
                                    Check Notification
                                </button>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold leading-tight text-gray-900 px-2 pt-4">Notifications</h1>
                            {
                                authState.notifications.length > 0 && <NotificationCard alertNotifications={authState.notifications} onClickRemove={handleOnClickRemoveNotification} isHotOrCold={isHotOrCold} setIsHotOrCold={setIsHotOrCold} />
                            }
                        </div>
                    </>
                    ) : (
                    <>
                        <h1>Authecation required</h1>
                    </>
                    )
                }
            </div>
        );
    }
    return (
        <div className=''>
            <Layout children={renderChildren()} handleOnClickSignOut={handleOnClickSignOut} />
            <Toast message={messageToast} show={showToast} onClose={handleOnCloseToast} type={typeToast} />
        </div>
    );
};

export default dashboard;