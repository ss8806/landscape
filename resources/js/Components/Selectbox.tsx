import React, { useEffect, useRef } from "react";

interface Props {
    type?: string;
    id?: string;
    name: string;
    value?: any;
    className?: string;
    placeholder?: string;
    autoComplete?: string | undefined;
    required?: boolean;
    isFocused?: boolean;
    children?: React.ReactNode;
    handleChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Selectbox: React.FC<Props> = ({
    id,
    placeholder,
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    children,
    handleChange,
}) => {
    const select = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        if (isFocused) {
            select.current?.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <select
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            >
                {children}
            </select>
        </div>
    );
};

export default Selectbox;
