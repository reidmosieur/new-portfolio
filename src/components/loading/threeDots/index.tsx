type ThreeDotsProps = {
    dotColor: string,
}

export function ThreeDots({ dotColor }: ThreeDotsProps) {
    let circleCommonClasses = `h-2.5 w-2.5 ${dotColor} rounded-full`;

    return (
        <div className='flex'>
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div
                className={`${circleCommonClasses} mr-1 animate-bounce`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce`}></div>
        </div>
    );
}