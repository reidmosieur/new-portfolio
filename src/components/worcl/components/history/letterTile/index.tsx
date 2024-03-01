import { Guess, SingleCharacter } from "../../../types/types";

interface LetterTileProps {
    answer: SingleCharacter[];
    index: number;
    guess?: Guess;
}

const LetterTile = ({
    answer,
    index,
    guess
}: LetterTileProps) => {
    const getBackgroundClass = () => {
        const baseClasses = "w-6 h-6 text-black text-center leading-none flex items-center justify-center rounded";
        const answerLetter = answer[index];
        const isCorrectPosition = guess?.word[index] === answerLetter;
        const isInAnswer = guess?.word && answer.includes(guess?.word[index]);
        let backgroundClass = '';

        if (isCorrectPosition) {
            backgroundClass = 'bg-green-500';
        } else if (isInAnswer) {
            backgroundClass = 'bg-yellow-500';
        } else {
            backgroundClass = 'bg-gray-300';
        }

        return `${baseClasses} ${backgroundClass}`;
    };

    const backgroundClass = getBackgroundClass();

    if (guess) {
        return (
            <span className={backgroundClass}>{guess.word[index]}</span>
        )
    }

    return (
        <span className={backgroundClass}>{answer[index]}</span>
    );
};

export default LetterTile;