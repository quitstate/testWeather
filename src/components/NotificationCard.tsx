import React from 'react';
import { XIcon } from '@heroicons/react/solid'
import { AlertNotification } from '../contexts/auth/interfaces/AuthState.interface';

export interface INotificationCardProps {
    alertNotifications: AlertNotification[];
    onClickRemove?: (value: any) => void;
    isHotOrCold?: boolean;
    setIsHotOrCold?: (value: boolean) => void;
}

const NotificationCard: React.FC<INotificationCardProps> = ({
    alertNotifications,
    onClickRemove,
    isHotOrCold,
    setIsHotOrCold
}) => {

    return <div className="p-2">
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">All Notifications</h2>
        <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {alertNotifications.map((alertNotification) => (
                <li key={alertNotification.cityName} className="col-span-1 flex shadow-sm rounded-md">
                    <div
                        className={'px-2 bg-yellow-500 flex-shrink-0 flex items-center justify-center w-auto text-white text-sm font-medium rounded-l-md'}
                    >
                        {alertNotification.cityName}
                    </div>
                    <button
                        onClick={() => setIsHotOrCold(!isHotOrCold)}
                        className={`${alertNotification.isHotOrCold ? 'bg-red-500' : 'bg-blue-500'} flex items-center justify-center w-10 text-white text-sm font-medium`}
                    >
                        {alertNotification.isHotOrCold ? 'Hot' : 'Cold'}
                    </button>
                    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                        <div className="flex-1 px-4 py-2 text-sm truncate">
                            <p className="text-gray-500">Temperature: {alertNotification.temperature}</p>
                        </div>

                        <div className="flex-shrink-0 pr-2">
                            <button
                                type="button"
                                onClick={() => onClickRemove(alertNotification)}
                                className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="sr-only">Open options</span>
                                <XIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>

                    </div>
                </li>
            ))}
        </ul>
    </div>;
};

export default NotificationCard;