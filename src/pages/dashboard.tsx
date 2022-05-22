import React from 'react';
import Layout from '../components/Layout';
import WeatherCard from '../components/WeatherCard';

export interface IDashboardViewProps { }
const dashboard: React.FC<IDashboardViewProps> = () => {

    const renderChildren = () => {
        return (
			<WeatherCard/>
		);
    }
    return (
        <div className=''>
            <Layout children={renderChildren()}/>
        </div>
    );
};

export default dashboard;