import { useGameState } from "../../../context/gameStateContext";
  
interface AdjusterButtonProps {
    content: React.ReactNode | string;
    onClick: () => void;
}

const AdjusterButton = ({
    content,
    onClick,
}: AdjusterButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="px-4 py-2"
        >
            {content}
        </button>
    )
}

const LetterCount = () => {
    const {
        answer,
        setAnswer,
        guesses,
        setGuesses,
        currentGuess,
        setCurrentGuess,
        gameResultsState,
        setGameResultsState,
        wordLength,
        setWordLength,
    } = useGameState();

    return (
        <div className="w-fit flex flex-row flex-wrap rounded border bg-gray-200 text-black font-bold divide-x divide-black" >
            <AdjusterButton
                content="-"
                onClick={() => {
                    if (wordLength > 3) {
                        setWordLength(wordLength - 1);
                    }
                }}
            />
            <p className="px-6 py-2" >{wordLength}</p>
            <AdjusterButton
                content="+"
                onClick={() => {
                    if (wordLength < 10) {
                        setWordLength(wordLength + 1);
                    }
                }}
            />
        </div>
    )
}

export default LetterCount;