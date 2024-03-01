import { RowType, SingleCharacter, WordleHistory } from "../../../types/types";
import { useGameState } from "../../../context/gameStateContext";

interface LetterInputProps {
    letterIndex: number;
    rowIndex: number;
    rowType: RowType;
}

const LetterInput = ({
    letterIndex,
    rowIndex,
    rowType,
}: LetterInputProps) => {
    const {
      answer,
      setAnswer,
      guesses,
      setGuesses,
      currentGuess,
      setCurrentGuess,
      gameResultsState,
      setGameResultsState,
      setDisplayResults,
      history,
      setHistory,
      wordLength,
    } = useGameState();

    // Define the valid characters for SingleCharacter
    const validCharacters: SingleCharacter[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (currentGuess.word.length !== answer.length) {
            alert('Enter more characters');
            return;
        }

        if (currentGuess.word.join('') === answer.join('')) {
            setGameResultsState({
                isGameFinished: true,
                isGameWon: true,
            });
            setDisplayResults(true);

            guesses.push(currentGuess);

            const newHistoryRecord: WordleHistory = {
                wordLength: wordLength,
                answer: answer,
                guesses: guesses,
                currentGuess: currentGuess,
                gameResultsState: {
                    isGameFinished: true,
                    isGameWon: true,
                },
            };

            // After creating the newHistoryRecord, append it to the existing history array
            const updatedHistory = [newHistoryRecord, ...(history ?? [])];

            // Store the updated history array in sessionStorage
            sessionStorage.setItem('worcl-history', JSON.stringify(updatedHistory));

            // Update the state with the new history array
            setHistory(updatedHistory);
        }

        if (rowIndex === answer.length - 1 && currentGuess.word.join('')!== answer.join('')) {
            setGameResultsState({
                isGameFinished: true,
                isGameWon: false,
            })
            setDisplayResults(true);

            guesses.push(currentGuess);

            const newHistoryRecord: WordleHistory = {
                wordLength: wordLength,
                answer: answer,
                guesses: guesses,
                currentGuess: currentGuess,
                gameResultsState: {
                    isGameFinished: true,
                    isGameWon: false,
                },
            };

            // After creating the newHistoryRecord, append it to the existing history array
            const updatedHistory = [newHistoryRecord, ...(history ?? [])];

            // Store the updated history array in sessionStorage
            sessionStorage.setItem('worcl-history', JSON.stringify(updatedHistory));

            // Update the state with the new history array
            setHistory(updatedHistory);
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

        const newHistoryRecord: WordleHistory = {
            wordLength: wordLength,
            answer: answer,
            guesses: guesses,
            currentGuess: currentGuess,
            gameResultsState: {
                isGameFinished: false,
                isGameWon: false,
            },
        };
    }

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {    
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default behavior of Enter
            handleSubmit(e);
        }
    
        // Check for Backspace key
        if (e.key === 'Backspace') {
            e.preventDefault(); // Prevent the default behavior of Backspace
            setCurrentGuess(prev => {
                const newWord = [...prev.word];
                newWord[letterIndex] = '' as SingleCharacter; // Clear the current cell
                return {
                    word: newWord,
                    correct: prev.correct,
                };
            });
            // Set focus back to the current cell
            (e.target as HTMLElement).focus();
        } else {
            // Check if the key pressed is a valid character
            const upperCaseValue = e.key.toUpperCase();
            if (validCharacters.includes(upperCaseValue as SingleCharacter)) {
                setCurrentGuess(prev => {
                    const newWord = [...prev.word];
                    newWord[letterIndex] = upperCaseValue as SingleCharacter;
                    return {
                        word: newWord,
                        correct: prev.correct,
                    };
                });
            }
        }
    };

    const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {    
        // Check for Shift+Tab combination
        if ((e.shiftKey && e.key === 'Tab') || e.key === 'Tab' || e.key === 'Shift') {
            e.preventDefault(); // Prevent the default behavior of Shift+Tab, Tab, and Shift
            return;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            // Move focus to the previous input field
            const prevInputId = `letter-${rowIndex}-${letterIndex -  1}-input`;
            const prevInputElement = document.getElementById(prevInputId);
            if (prevInputElement instanceof HTMLInputElement) {
                prevInputElement.focus();
            }
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            // Move focus to the next input field
            const nextInputId = `letter-${rowIndex}-${letterIndex +  1}-input`;
            const nextInputElement = document.getElementById(nextInputId);
            if (nextInputElement instanceof HTMLInputElement) {
                nextInputElement.focus();
            }
        }
    
        // Check if the key pressed is a valid character
        if (!validCharacters.includes(e.key.toUpperCase() as SingleCharacter)) {
            return; // Exit early if the key is not a valid character
        }
    
        // Set focus to the next input field
        const nextInputId = `letter-${rowIndex}-${letterIndex +  1}-input`;
        const nextInputElement = document.getElementById(nextInputId);
        if (nextInputElement instanceof HTMLInputElement) {
            nextInputElement.focus();
        }
    };

    if (rowType === 'currentGuess' && !gameResultsState.isGameFinished) {
        return (
            <input
                id={`letter-${rowIndex}-${letterIndex}-input`}
                maxLength={1}
                onKeyDown={handleOnKeyDown}
                onKeyUp={handleOnKeyUp}
                value={currentGuess.word[letterIndex]}
                className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gray-100 rounded text-center text-2xl md:text-4xl lg:text-5xl leading-none flex items-center justify-center focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 focus:underline caret-transparent single-character-selection"
            />
        );
    }

    if (rowType === 'pastGuess') {
        const pastGuess = guesses[rowIndex];
        const letter = pastGuess.word[letterIndex];

        const answerLetter = answer[letterIndex];

        const getPastGuessStyles = () => {
            const baseStyles = 'w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-center text-2xl md:text-4xl lg:text-5xl leading-none flex items-center justify-center rounded';
            const isCorrectPosition = answerLetter === letter;
            const isInAnswer = answer.includes(letter);
            const background = isCorrectPosition ? 'bg-green-500' : isInAnswer ? 'bg-yellow-500' : 'bg-gray-300';
            const styles = `${baseStyles} ${background}`;
            return styles;
        };

        return (
            <span
                id={`letter-${rowIndex}-${letterIndex}`}
                className={getPastGuessStyles()}
            >
                {letter}
            </span>
        )
    }

    if (rowType === 'futureGuess') {
        return (
            <span className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-white rounded" />
        )
    }
};

export default LetterInput;