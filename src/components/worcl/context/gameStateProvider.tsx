import React, { ReactNode, useState } from 'react';
import { GameStateContext } from './gameStateContext';
import { GameResultsState, Guess, SingleCharacter, WordleHistory } from '../types/types';

interface GameStateProviderProps {
  children: ReactNode;
}

const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
  // Initialize state variables
  const [wordLength, setWordLength] = useState<number>(5);
  const [answer, setAnswer] = useState<SingleCharacter[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState<Guess>({
    word: [],
    correct: undefined,
  } as Guess);
  const [gameResultsState, setGameResultsState] = useState<GameResultsState>({
    isGameFinished: false,
    isGameWon: false,
  });
  const [displayResults, setDisplayResults] = useState<boolean>(false);
  const [history, setHistory] = useState<WordleHistory[] | undefined>([]);

  // Define the value that will be passed to the context consumers
  const value = {
    wordLength,
    setWordLength,
    answer,
    setAnswer,
    guesses,
    setGuesses,
    currentGuess,
    setCurrentGuess,
    gameResultsState,
    setGameResultsState,
    displayResults,
    setDisplayResults,
    history,
    setHistory,
  };

  // Provide the context value to the children
  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;