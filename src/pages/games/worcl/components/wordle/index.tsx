import { useState } from "react";
import { generate } from "random-words";
import { useEffect } from "react";
import { useGameState } from "../../context/gameStateContext";
import { SingleCharacter, WordResponse } from "../../types/types";
import GridContainer from "../inputs/gridContainer";
import LetterCount from "../inputs/letterCount";
import SimpleModal from "@/components/modal/simpleModal";
import axios from "axios";
import AnswerDefinitions from "../answerDefinitions";
import Button from "@/components/button";
import History from "../history";
import { QueueListIcon } from "@heroicons/react/24/outline";
import ModalContainer from "@/components/modal/modalContainer";
import Sample from "@/components/sample";
import Link from "next/link";

const Wordle = () => {
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

    const [answerDefinitions, setAnswerDefinitions] = useState<WordResponse | undefined>();
    const [requestingDefinition, setRequestingDefinition] = useState<boolean>(true);
    const [showHistory, setShowHistory] = useState<boolean>(false);

    const answerString = answer.join('');

    const generateNewWord = () => {
        setGuesses([]);
        setCurrentGuess({
            word: [],
            correct: undefined,
        });
        const wordString = generate({ minLength: wordLength, maxLength: wordLength, exactly: 1 })[0].toUpperCase();
        const wordArray = wordString.split('') as SingleCharacter[];

        setAnswer(wordArray);
    }

    useEffect(() => {
        generateNewWord();
    }, [wordLength])

    useEffect(() => {
        if (displayResults) {
            axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${answerString}`)
            .then(response => {
                setAnswerDefinitions(response.data);
                setRequestingDefinition(false);
             })
        }
    }, [displayResults])

    useEffect(() => {
        const localHistory = sessionStorage.getItem('worcl-history');
        
        if (localHistory) {
            const parsedLocalHistory = JSON.parse(localHistory);
            if (parsedLocalHistory) {
                setHistory(parsedLocalHistory);
            }
        }
    }, [])
    
    if (gameContext) {
        return (
            <div className="relative max-w-xs sm:container mx-auto px-4 py-2 md:px-6 md:py-4 lg:px-8 lg:py-4 flex flex-col flex-wrap gap-8 bg-stone-800 rounded-md" >
                <div className="columns-1 space-y-1" >
                    <span className="flex flex-row flex-nowrap gap-8 justify-between" >
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl" >Worcl</h1>
                        <div className="group relative flex justify-center">
                            <button
                                onClick={() => setShowHistory(!showHistory)}
                                id="history-button"
                                className="relative z-10 my-auto" // Ensure the button is above the tooltip
                            >
                                <QueueListIcon className="w-8 h-8 my-auto" />
                            </button>
                            <span className="absolute w-32 bottom-12 left-1/2 transform -translate-x-1/2 scale-0 rounded bg-white p-2 text-stone-900 text-center font-bold transition duration-200 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-100">
                                View History
                            </span>
                        </div>
                    </span>
                    <small className="text-wrap" >This is just like <Link href="https://www.nytimes.com/games/wordle/index.html" >Wordle</Link>, only you get to choose how long the word is.</small>
                </div>
                <div className="mx-auto flex flex-col flex-wrap gap-4" >
                    <div className="w-full flex flex-col flex-wrap gap-2" >
                        <span className="text-white font-bold text-xl" >Worcl length:</span>
                        <LetterCount />
                        <small className="text-white" >Your guesses are equal to the worcl length as well</small>
                    </div>
                </div>
                <form 
                    className="max-w-full overflow-x-scroll mx-auto text-black flex flex-col flex-wrap gap-4" 
                >
                    <GridContainer />
                </form>
                <Button
                    content="New Word"
                    onClick={generateNewWord}
                    buttonType="primary"
                />
                <ModalContainer 
                    open={showHistory} 
                    setOpen={setShowHistory}
                >
                    {history && history?.length > 0 && <History />}
                </ModalContainer>
                <SimpleModal 
                    open={displayResults} 
                    setOpen={setDisplayResults} 
                    title={'Results'} 
                    actions={[
                        {
                            content: 'New Word',
                            onClick: () => {
                                setDisplayResults(false);
                                setGameResultsState({
                                    isGameFinished: false,
                                    isGameWon: false,
                                });
                                setGuesses([]);
                                setCurrentGuess({
                                    word: [],
                                    correct: undefined,
                                });
                                generateNewWord();
                            },
                            buttonType: 'primary'
                        },
                        {
                            content: 'Close',
                            onClick: () => setDisplayResults(false),
                            buttonType: 'secondary'
                        },
                    ]} 
                >
                <div className={`max-h-96 ${!requestingDefinition && 'overflow-y-scroll'}`} >
                    {requestingDefinition ?
                        <p>Loading...</p>
                        :
                        <>
                            {gameResultsState.isGameWon ?
                                <p>Wowzers, great job! The word <u>was</u> "{answerString.toLowerCase()}".</p>
                                :
                                <p>Great try! The word was "{answerString.toLowerCase()}".</p>
                            }
                            {answerDefinitions && <AnswerDefinitions answerDefinitions={answerDefinitions} />}
                        </>
                    }
                </div>
                </SimpleModal>
                <small className="mx-auto" >Inspired by <Link className="text-teal-600 underline" href={'https://www.nytimes.com/games/wordle/index.html'} >Wordle</Link></small>
                <Sample headerJsonName="worcl" />
            </div>
        )
    }

    return (
        <p>Loading...</p>
    )
}

export default Wordle;