import { createContext, useContext } from "react";
import { TopItems } from "../types/types";

interface MySpotifyContextValue {
    myTopItems: TopItems[];
    setMyTopItems: React.Dispatch<React.SetStateAction<TopItems[]>>;
}

const SpotifyContext = createContext<MySpotifyContextValue | undefined>(undefined);

export const useSpotifyContext = () => {
    const context = useContext(SpotifyContext);
    if (!context) {
        throw new Error('useSpotifyContext must be used within a GameProvider');
    }
    return context;
};

export default SpotifyContext;