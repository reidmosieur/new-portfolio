import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TMDBMovie } from '../../../types/types';

interface ImageWithScoreProps {
    correctAnswer: TMDBMovie;
}

const ImageWithScore = ({ correctAnswer }: ImageWithScoreProps) => {
    const basePosterURL = 'https://image.tmdb.org/t/p/w200';
    const moviePosterURL = basePosterURL + correctAnswer?.poster_path;
    const voteAveragePercentage = Math.ceil(correctAnswer.vote_average *  10);
    const formattedVoteAveragePercentage = `${voteAveragePercentage}%`;
    const [percent, setPercent] = useState(0);
    const circumference =  2 * Math.PI *  30;

    useEffect(() => {
        setPercent(voteAveragePercentage);
    }, [correctAnswer]);

    return (
        <div className="w-fit relative">
            <Image src={moviePosterURL} alt={correctAnswer?.title || 'An image of the poster for this movie'} width={400} height={600} className="rounded shadow shadow-lg shadow-stone-400" />
            <div className="absolute -top-6 -right-6 flex items-center justify-center">
                <svg className="w-20 h-20">
                    <circle
                        className="text-stone-200"
                        strokeWidth="5"
                        stroke="currentColor"
                        fill='rgb(4  47  46)'
                        r="30"
                        cx="40"
                        cy="40"
                    />
                    <circle
                        className="text-teal-500"
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
                <span className="absolute text-xl text-teal-500 font-bold">{formattedVoteAveragePercentage}</span>
            </div>
        </div>
    );
};

export default ImageWithScore;