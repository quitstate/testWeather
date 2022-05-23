import React from 'react';

export interface IInputTextProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;

}
const InputText: React.FC<IInputTextProps> = ({
    label,
    placeholder,
    value,
    onChange,
    className
}) => {
    return (
    <div className={className}>
        <label htmlFor={label} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <div className="mt-1">
            <input
                type={'number'}
                name={label}
                id={label}
                className="h-19 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    </div>
    );
};

export default InputText;