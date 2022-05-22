import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import WeatherCard from '../components/WeatherCard';
import useGetAuthContext from '../hooks/context-hooks/useGetAuthContext';
import useGetWeather from '../hooks/react-query/useGetWeather';

export interface IDashboardViewProps { }
const dashboard: React.FC<IDashboardViewProps> = () => {

    const { refetch, isLoading } = useGetWeather();
    const {authState} = useGetAuthContext();


    const renderChildren = () => {
        return (
            <WeatherCard cities={authState.cities} />
        );
    }
    return (
        <div className=''>
            <Layout children={renderChildren()} />
        </div>
    );
};

export default dashboard;