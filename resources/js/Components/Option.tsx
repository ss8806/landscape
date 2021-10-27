import React, { useEffect, useRef } from "react";

interface Props {
    type?: string;
    id?: string;
    name: string;
    value?: string;
    className?: string;
    placeholder?: string;
    autoComplete?: string | undefined;
    required?: boolean;
    isFocused?: boolean;
    handleChange?: React.ChangeEventHandler<HTMLOptionElement>;
}

const Option: React.FC<Props> = ({
    id,
    placeholder,
    value,
    className,
    isFocused,
    //handleChange,
}) => {
    const option = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        if (isFocused) {
            option.current?.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <option
                id={id}
                placeholder={placeholder}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className
                }
                //onChange={(e) => handleChange(e)}
            />
        </div>
    );
};

export default Option;
