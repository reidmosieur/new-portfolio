import { createContext, useContext, useState, useEffect } from 'react';
import { TMDBMovie } from '../types/types';

interface CinemojiContextValue {
    initialEmojiString: string;
    shuffledMovieKeys: string[];
    movieResponses: TMDBMovie[];
    displayResults: boolean;
    answeredCorrectly: boolean;
    setInitialEmojiString: React.Dispatch<React.SetStateAction<string>>;
    setShuffledMovieKeys: React.Dispatch<React.SetStateAction<string[]>>;
    setMovieResponses: React.Dispatch<React.SetStateAction<TMDBMovie[]>>;
    setDisplayResults: React.Dispatch<React.SetStateAction<boolean>>;
    setAnsweredCorrectly: React.Dispatch<React.SetStateAction<boolean>>;
}

const CinemojiContext = createContext<CinemojiContextValue | undefined>(undefined);

export const useCinemojiContext = () => {
    const context = useContext(CinemojiContext);
    if (!context) {
        throw new Error('useCinemojiContext must be used within a GameProvider');
    }
    return context;
};

export default CinemojiContext;