import { ReactNode, useEffect, useState } from "react";
import SpotifyContext from "./spotifyStateContext";
import { TopItems } from "../types/types";
import axios from "axios";
import { myTopArtists, myTopTracks } from "../data/myTopData";

export const SpotifyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [myTopItems, setMyTopItems] = useState<TopItems[]>([]);

    useEffect(() => {
        setMyTopItems([
            myTopArtists,
            myTopTracks,
        ]);
    }, [])
    
    return (
        <SpotifyContext.Provider value={{
            myTopItems,
            setMyTopItems,
        }}>
            {children}
        </SpotifyContext.Provider>
    );
};