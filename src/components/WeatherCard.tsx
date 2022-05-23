import React from 'react';
import { City } from '../contexts/auth/interfaces/AuthState.interface';

export interface IWeatherCardProps { 
    cities: City[];
    className?: string; 
}
const WeatherCard: React.FC<IWeatherCardProps> = ({
    cities,
    className
}) => {

    return (
        <div className={className}>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cities.map((city) => (
                    <li key={city.name} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-gray-900 text-sm font-medium truncate">{city.name}, {city.weather.main}</h3>
                                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                        {city.weather.temp} °C
                                    </span>
                                </div>
                                <p className="mt-1 text-gray-500 text-sm truncate">Weather: {city.weather.description}</p>
                                <p className="mt-1 text-gray-500 text-sm truncate">Temperature Max: {city.weather.temp_max}°C</p>
                                <p className="mt-1 text-gray-500 text-sm truncate">Temperature Min: {city.weather.temp_min}°C</p>
                                
                            </div>
                            <img className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0" src={`http://openweathermap.org/img/w/${city.weather.icon}.png`} alt="" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeatherCard;