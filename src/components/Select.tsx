import React from 'react';

export interface ISelectProps { 
    title: string,
    options: any[],
    onChange: (value: any) => void, 
    value: any,
    className?: string,
}
const Select: React.FC<ISelectProps> = ({ 
    title,
    options,
    onChange, 
    value,
    className
}) => {

    const optionsSorted = [...options].sort();

    return <div className={className}>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            {title}
        </label>
        <select
            id={title}
            name={title}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >{
            optionsSorted.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))
        }
        </select>
    </div>;
};

export default Select;