import { useEffect, useState } from "react";
import { useGameState } from "../../context/gameStateContext";
import LetterTile from "./letterTile";
import { WordleHistory } from "../../types/types";

const History = () => {
    const gameContext = useGameState();
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
        displayResults,
        setDisplayResults,
        history,
        setHistory,
    } = gameContext;

    const [slicedHistory, setSlicedHistory] = useState<WordleHistory[]>([]);

    useEffect(() => {
        if (history && history[0].gameResultsState.isGameFinished === false && history[0].answer === answer) {
            const sliceAfterCurrentAnswer = history.slice(1, 6);

            setSlicedHistory(sliceAfterCurrentAnswer);
        } else if (history) {
            const normalSlice = history.slice(0, 5);

            setSlicedHistory(normalSlice);
        }
    }, [history])

    if (!history || history.length ===  0) {
        return <p>Loading...</p>;
    } else {
        return (
            <div className="px-8 py-4 flex flex-col flex-wrap gap-4 rounded-md bg-stone-800 text-white">
                <h2 className="text-xl font-bold" >Worcl History</h2>
                <table className="w-full" >
                    <tr className="text-center" >
                        <th>Word</th>
                        <th>Your Last Guess</th>
                        <th>Guesses</th>
                    </tr>
                    <tbody>
                        {history?.slice(0, 5).map((pastWord, index) => (
                            <tr
                                key={`${pastWord.answer.join('')}-${index}`}
                            >
                                <td>
                                    <div className="w-fit mx-auto px-2 my-1 flex flex-row flex-nowrap gap-2" >
                                        {pastWord.answer.map((_, letterIndex: number) => (
                                            <LetterTile
                                                key={index}
                                                answer={pastWord.answer}
                                                index={letterIndex}
                                            />
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <div className="w-fit mx-auto px-2 flex flex-row flex-nowrap gap-2" >
                                        {pastWord.guesses.length >  0 ?
                                            pastWord.answer.map((_, letterIndex: number) => (
                                                <LetterTile
                                                    key={letterIndex}
                                                    answer={pastWord.answer}
                                                    index={letterIndex}
                                                    guess={pastWord.guesses[pastWord.guesses.length - 1]}
                                                />
                                            ))
                                            :
                                            <span>No guesses</span>
                                        }
                                    </div>
                                </td>
                                <td className="flex flex-row justify-center" >
                                    <span className="my-auto" >{pastWord.guesses.length}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default History;