import { useEffect, useState } from "react";import { useMyMoviesContext } from "../../context/myMoviesStateContext";
import { Result } from "../../types/types";

type ScoreProps = {
    ratedMovie: Result,
    type: 'mine' | 'overall',
}

const Score = ({
    ratedMovie,
    type,
}: ScoreProps) => {
    const voteAverage = type === 'mine' ? ratedMovie?.rating : type === 'overall' ? ratedMovie?.vote_average : undefined;
    const voteAveragePercentage = Math.ceil(voteAverage ? voteAverage *  10 : 0);
    const formattedVoteAveragePercentage = `${voteAveragePercentage}%`;
    const [percent, setPercent] = useState(0);
    const circumference =  2 * Math.PI *  30;

    useEffect(() => {
        setPercent(voteAveragePercentage);
    }, [ratedMovie]);

    return (
        <div className="absolute -top-10 right-0 md:-right-10 z-10 flex items-center justify-center group">
            <svg className="w-20 h-20">
                <circle
                    className="text-stone-200"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill={type === 'mine' ? 'rgb(124 45 18)' : type === 'overall' ? 'rgb(4  47  46)' : undefined}
                    r="30"
                    cx="40"
                    cy="40"
                />
                <circle
                    className={type === 'mine' ? "text-orange-500" : type === 'overall' ? "text-teal-500" : undefined}
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - percent /  100 * circumference}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                />
            </svg>
            <span 
                className={`absolute text-sm ${type === 'mine' ? "text-orange-500" : type === 'overall' ? "text-teal-500" : undefined} font-bold`}
            >{formattedVoteAveragePercentage}</span>
            <span className="absolute w-32 bottom-16 left-1/2 transform -translate-x-1/2 scale-0 rounded bg-white p-2 text-stone-900 text-center font-bold transition duration-200 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-100">
                {type === 'mine' ? 'My rating' : type === 'overall' ? 'Overall rating' : undefined}
            </span>
        </div>
    )
};

export default Score;