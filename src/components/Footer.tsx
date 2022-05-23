import React from 'react';

export interface IFooterProps { 
    appName: string;
    creator: string;
}
const Footer: React.FC<IFooterProps> = ({
    appName,
    creator
}) => {

    return (
        <footer className="flex items-center bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base text-gray-400">&copy; 2022 {appName} by {creator}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;