import { ReactNode } from "react";

type TagProps = {
    children: ReactNode,
    tagType: 'primary' |'secondary' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

const Tag = ({
    children,
    tagType,
}: TagProps) => {
    const baseClasses = 'px-2 py-1 flex flex-nowrap gap-2 rounded-md text-sm font-bold';

    // Define tag type specific classes
    let tagTypeClasses = {
        primary: "border-teal-600 bg-teal-600 hover:bg-teal-700 text-white",
        secondary: "border-gray-400 bg-gray-400 hover:bg-gray-500 text-white",
        danger: "border-red-500 bg-red-500 hover:bg-red-600 text-white",
        warning: "border-yellow-500 bg-yellow-500 hover:bg-yellow-600 text-black",
        info: "border-cyan-500 bg-cyan-500 hover:bg-cyan-600 text-white",
        light: "border-gray-200 bg-gray-200 hover:bg-gray-300 text-black",
        dark: "border-gray-800 bg-gray-800 hover:bg-gray-900 text-white",
    };

    const styleClasses = `${baseClasses} ${tagTypeClasses[tagType]}`

    return (
        <span className={styleClasses} >
            {children}
        </span>
    )
};

export default Tag;