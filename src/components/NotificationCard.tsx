import React from 'react';
import { DotsVerticalIcon } from '@heroicons/react/solid'
import { AlertNotification } from '../contexts/auth/interfaces/AuthState.interface';

export interface INotificationCardProps {
    alertNotifications: AlertNotification[];
    onClickRemove?: (value: any) => void;
}
const projects = [
    { name: 'Graph API', initials: 'GA', href: '#', members: 16, bgColor: 'bg-pink-600' },
    { name: 'Component Design', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-600' },
    { name: 'Templates', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-500' },
    { name: 'React Components', initials: 'RC', href: '#', members: 8, bgColor: 'bg-green-500' },
];

const NotificationCard: React.FC<INotificationCardProps> = ({
    alertNotifications,
    onClickRemove
}) => {
    return <div className="p-2">
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">All Notifications</h2>
        <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {alertNotifications.map((alertNotification) => (
                <li key={alertNotification.cityName} className="col-span-1 flex shadow-sm rounded-md">
                    <div
                        className={'bg-yellow-500 flex-shrink-0 flex items-center justify-center w-24 text-white text-sm font-medium rounded-l-md'}
                    >
                        {alertNotification.cityName}
                    </div>
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
                                <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>;
};

export default NotificationCard;