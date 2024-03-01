import { ReactNode } from "react";

type FullScreenCenteredProps = {
    children: ReactNode;
}

const FullScreenCentered = ({
    children,
}: FullScreenCenteredProps) => {
    return (
        <div className="min-h-screen flex flex-col flex-wrap justify-center content-center" >
            {children}
        </div>
    )
};

export default FullScreenCentered;