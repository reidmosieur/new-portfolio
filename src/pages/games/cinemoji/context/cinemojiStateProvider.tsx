import { ReactNode, useEffect, useState } from "react";
import CinemojiContext from "./cinemojiStateContext";
import { TMDBMovie } from "../types/types";
import setCinemojiState from "../helpers/setCinemojiState";

export const CinemjoiContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [initialEmojiString, setInitialEmojiString] = useState('');
    const [shuffledMovieKeys, setShuffledMovieKeys] = useState<string[]>([]);
    const [movieResponses, setMovieResponses] = useState<TMDBMovie[]>([]);
    const [displayResults, setDisplayResults] = useState<boolean>(false);
    const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false);

    useEffect(() => {
        setCinemojiState({ setInitialEmojiString, setShuffledMovieKeys, setMovieResponses })
    }, []);

    return (
        <CinemojiContext.Provider value={{ 
            initialEmojiString, 
            shuffledMovieKeys, 
            movieResponses, 
            displayResults,
            answeredCorrectly,
            setInitialEmojiString, 
            setShuffledMovieKeys, 
            setMovieResponses,
            setDisplayResults,
            setAnsweredCorrectly,
        }}>
            {children}
        </CinemojiContext.Provider>
    );
};