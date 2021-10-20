import React, { useEffect, useRef } from "react";

interface Props {
    type?: string;
    id?: string;
    name: string;
    value: string;
    className?: string;
    placeholder?: string;
    autoComplete?: string | undefined;
    required?: boolean;
    isFocused?: boolean;
    accept?: string;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<Props> = ({
    type,
    id,
    placeholder,
    name,
    value,
    className,
    autoComplete,
    required,
    accept,
    isFocused,
    handleChange,
}) => {
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                accept={accept}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
};

export default Input;
