import React, { useEffect, useState } from 'react';
import InputText from '../components/InputText';
import Layout from '../components/Layout';
import Select from '../components/Select';
import WeatherCard from '../components/WeatherCard';
import useGetAuthContext from '../hooks/context-hooks/useGetAuthContext';
import useGetWeather from '../hooks/react-query/useGetWeather';
import { cities } from '../utils/Cities';

export interface IDashboardViewProps { }
const dashboard: React.FC<IDashboardViewProps> = () => {

    const [cityName, setCityName] = useState('Miami')
    const [stateName, setStateName] = useState('Florida')
    const [zipCode, setZipCode] = useState('')
    const { refetch, isLoading } = useGetWeather(cityName, zipCode);
    const { authState } = useGetAuthContext();

    useEffect(() => {
        refetch();
    }, [cityName,zipCode]);

    const handleOnChangeCity = (value: any) => {
        setCityName(value);
    }
    const handleOnChangeState = (value: any) => {
        setStateName(value);
    }

    const handleOnChangeZipCode = (value: any) => {
        setZipCode(value);
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
                <WeatherCard className='px-2 pt-4 w-full' cities={authState.cities} />
            </div>

        );
    }
    return (
        <div className=''>
            <Layout children={renderChildren()} />
        </div>
    );
};

export default dashboard;