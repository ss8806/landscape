import React, { useEffect, useRef } from "react";

type Props = {
    id?: string;
    name: string;
    value?: string;
    className?: string;
    placeholder?: string;
    autoComplete?: string | undefined;
    required?: boolean;
    isFocused?: boolean;
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const Textarea: React.FC<Props> = ({
    id,
    placeholder,
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
}) => {
    const textarea = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isFocused) {
            textarea.current?.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <textarea
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                ref={textarea}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
};

export default Textarea;
