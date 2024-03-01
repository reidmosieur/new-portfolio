import React, { useState } from 'react';
import Image from 'next/image';
import { useMyMoviesContext } from '../../context/myMoviesStateContext';
import { Result } from '../../types/types';
import Score from '../score';
import { useRouter } from 'next/router';

type WrappedMoviePosterCardProps = {
    result: Result,
}

const WrappedMoviePosterCard = ({
    result,
}: WrappedMoviePosterCardProps) => {
    const {
        selectedMovie,
        setSelectedMovie,
    } = useMyMoviesContext();

    const {
        title,
        poster_path,
    } = result;

    const router = useRouter();

    return (
        <button
            className={`p-2 rounded ${selectedMovie?.id === result.id ? 'bg-teal-600' : 'bg-stone-300'} relative group'}`}
            onClick={() => {
                if (selectedMovie?.id !== result.id) {
                    setSelectedMovie(result);
                    router.push('/#my-movies')
                } else {
                    setSelectedMovie(undefined);
                }
            }}
        >
            <Image src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={title} width={200} height={300} className="rounded shadow shadow-lg shadow-stone-400" />
            <Score 
                type='mine' 
                ratedMovie={result}
            />
        </button>
    );
};

export default WrappedMoviePosterCard;