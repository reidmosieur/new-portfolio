import Image from "next/image";

import { useCinemojiContext } from "../../../context/cinemojiStateContext";
import ImageWithScore from "./imageWithScore";

import languages from "@/constants/languages";
import Link from "next/link";
import formatReleaseDate from "../../../helpers/formatReleaseDate";

const dummyMovieResponse = {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
    correctAnswer: false,
}

const MovieFactsCard = () => {
    const {
        initialEmojiString,
        shuffledMovieKeys,
        displayResults,
        answeredCorrectly,
        setDisplayResults,
        movieResponses,
    } = useCinemojiContext();

    const correctAnswerResponse = movieResponses.find(movieResponses => movieResponses.correctAnswer) || dummyMovieResponse;

    const {
        adult,
        backdrop_path,
        genre_ids,
        id,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        title,
        video,
        vote_average,
        vote_count,
        correctAnswer,
    } = correctAnswerResponse;

    const formattedReleaseDate = formatReleaseDate(release_date)

    const fullLanguage = languages.find(language => language.iso_639_1 === original_language) || {
        name: 'Unknown',
        english_name: 'Unknown',
        iso_639_1: 'unknown',
    };
    const englishLanguageName = fullLanguage.english_name;
    const originalLanguageName = fullLanguage.name;
    
    return (
        <div className="my-4 flex flex-row flex-wrap gap-4" >
            <div className="max-w-md flex flex-col gap-4" >
                <h2 className="text-2xl font-bold" ><u>{title}</u> ({formattedReleaseDate})</h2>
                <p><u><b>Description:</b></u> {overview}</p>
                <h3><u><b>Original Title:</b></u> {original_title}</h3>
                <h3><u><b>Original Language:</b></u> {englishLanguageName}{englishLanguageName !== originalLanguageName && <span> {originalLanguageName}</span>}</h3>
                <small className="w-fit mx-auto mt-auto text-stone-400" >Movie details courtesy of <Link href={'https://www.themoviedb.org'} className="underline" >The Movie Database</Link></small>
            </div>
            <ImageWithScore
                correctAnswer={correctAnswerResponse ? correctAnswerResponse : dummyMovieResponse}
            />
        </div>
    )
}

export default MovieFactsCard;