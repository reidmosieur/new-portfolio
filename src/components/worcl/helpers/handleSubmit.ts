import { Guess, SingleCharacter } from "../types/types";

interface handleSubmitProps {
    e: React.KeyboardEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>;
    letterIndex: number;
    rowIndex: number;
    answer: SingleCharacter[],
    setGuesses: React.Dispatch<React.SetStateAction<Guess[]>>,
    currentGuess: Guess,
    setCurrentGuess: React.Dispatch<React.SetStateAction<Guess>>,
    setIsGameFinished: React.Dispatch<React.SetStateAction<boolean>>,
}
  
const handleSubmit = ({
    e,
    letterIndex,
    rowIndex,
    answer,
    setGuesses,
    currentGuess,
    setCurrentGuess,
    setIsGameFinished,
}: handleSubmitProps) => {
    if (currentGuess.word.join('') === answer.join('')) {
        setIsGameFinished(true);
    }
    const newWord = [...currentGuess.word];
    newWord[letterIndex] = (e.target as HTMLInputElement).value.toUpperCase() as SingleCharacter; // Update the current cell
    setCurrentGuess({
        word: [],
        correct: undefined,
    });
    setGuesses(prev => {
        const newGuesses = [...prev];
        newGuesses[rowIndex] = {
            word: newWord,
            correct: undefined,
        };
        return newGuesses;
    });
}

export default handleSubmit;