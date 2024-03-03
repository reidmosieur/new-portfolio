import { SetStateAction, useState } from "react";

type InputProps = {
    inputValue: string;
    setInputValue: any;
    label: string;
    hint: string;
    error?: boolean;
    errorText?: string;
    disabled?: boolean;
}

const Input = ({
    inputValue,
    setInputValue,
    label,
    hint,
    error,
    errorText,
    disabled,
}: InputProps) => {
    const [inputIsFocused, setInputIsFocused] = useState(false);

    const handleInputFocus = () => {
        setInputIsFocused(true);
    };

    const handleEmailBlur = () => {
        if (inputValue === '') {
            setInputIsFocused(false);
        }
    };

    const handleEmailInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
    };

    return (
        <div className={`relative flex flex-col flex-wrap gap-1`}>
            <span 
                className={`absolute left-2 transition-all duration-200 ${inputIsFocused || inputValue ? '-top-7' : 'text-stone-900 top-1'}`}
            >
                {label}
            </span>
            <input
                type="text"
                className={`rounded ${disabled ? 'bg-stone-300' : 'bg-stone-200'} px-4 py-1 text-stone-900`}
                onFocus={handleInputFocus}
                onBlur={handleEmailBlur}
                onChange={handleEmailInputChange}
                value={inputValue}
                disabled={disabled}
            />
            <small className={`ml-2 text-end ${error && 'text-orange-500'}`} >{error ? errorText : hint}</small>
        </div>
    )
};

export default Input;