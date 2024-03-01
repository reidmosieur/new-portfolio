import { useGameState } from "../../../context/gameStateContext";
import { RowType } from "../../../types/types";
import LetterInput from "../letterInput"

const GridContainer = () => {
    const {
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
    } = useGameState();

    const determineRowType = (rowIndex: number): RowType => {
        if (gameResultsState.isGameFinished && rowIndex >= guesses.length) {
            return 'futureGuess';
        } else if (rowIndex < guesses.length) {
            return 'pastGuess';
        } else if (rowIndex === guesses.length) {
            return 'currentGuess';
        } else {
            return 'futureGuess';
        }
    };
    
    return (
        <div className="mx-auto flex flex-col flex-wrap gap-2 lg:gap-3">
            {Array.from({ length: wordLength }, (_, rowIndex) => (
                <div key={rowIndex} className={`flex flex-row flex-nowrap gap-2 lg:gap-3`} >
                    {Array.from({ length: wordLength }, (_, letterIndex) => (
                        <LetterInput
                            key={`${answer.join('')}-${rowIndex}-${letterIndex}-letterInput`}
                            letterIndex={letterIndex}
                            rowIndex={rowIndex}
                            rowType={determineRowType(rowIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GridContainer;