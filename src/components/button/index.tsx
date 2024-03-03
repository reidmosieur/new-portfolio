import { ThreeDots } from "../loading/threeDots";
import { Actions } from "./types/types";

const Button = (props: Actions) => {
    // Define base classes that apply to all buttons
    let baseClasses = "inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-bold shadow-sm sm:mt-0 sm:w-auto";

    // Define button type specific classes
    let buttonTypeClasses = {
        primary: "border-teal-600 bg-teal-600 hover:bg-teal-700 text-white",
        secondary: "border-gray-400 bg-gray-400 hover:bg-gray-500 text-white",
        danger: "border-red-500 bg-red-500 hover:bg-red-600 text-white",
        warning: "border-yellow-500 bg-yellow-500 hover:bg-yellow-600 text-black",
        info: "border-cyan-500 bg-cyan-500 hover:bg-cyan-600 text-white",
        light: "border-gray-200 bg-gray-200 hover:bg-gray-300 text-black",
        dark: "border-gray-800 bg-gray-800 hover:bg-gray-900 text-white",
    };

    // Apply the button type class if specified
    let buttonClass = props.buttonType ? `${baseClasses} ${buttonTypeClasses[props.buttonType]}` : baseClasses;

    let buttonLoadingColors = {
        primary: "bg-white",
        secondary: "bg-white",
        danger: "bg-white",
        warning: "bg-white",
        info: "bg-white",
        light: "bg-black",
        dark: "bg-white",
    };

    let buttonLoadingColor = props.buttonType ? buttonLoadingColors[props.buttonType] : "bg-black";

    return (
        <button
            type={props.type ? props.type : 'button'}
            className={buttonClass}
            onClick={props.onClick}
        >
            {props.submitting ? <ThreeDots dotColor={buttonLoadingColor} /> : props.content}
        </button>
    );
};

export default Button;