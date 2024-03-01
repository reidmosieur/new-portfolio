import { createContext, useContext } from 'react';
import { GameResultsState, Guess, SingleCharacter, WordleHistory } from '../types/types';

interface GameStateContextValue {
  wordLength: number;
  setWordLength: React.Dispatch<React.SetStateAction<number>>;
  answer: SingleCharacter[];
  setAnswer: React.Dispatch<React.SetStateAction<SingleCharacter[]>>;
  guesses: Guess[];
  setGuesses: React.Dispatch<React.SetStateAction<Guess[]>>;
  currentGuess: Guess;
  setCurrentGuess: React.Dispatch<React.SetStateAction<Guess>>;
  gameResultsState: GameResultsState;
  setGameResultsState: React.Dispatch<React.SetStateAction<GameResultsState>>;
  displayResults: boolean;
  setDisplayResults: React.Dispatch<React.SetStateAction<boolean>>;
  history: WordleHistory[] | undefined;
  setHistory: React.Dispatch<React.SetStateAction<WordleHistory[] | undefined>>;
}

export const GameStateContext = createContext<GameStateContextValue | undefined>(undefined);

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};