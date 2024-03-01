import { useState } from "react";
import { useMyMoviesContext } from "../../context/myMoviesStateContext";
import WrappedMoviePosterCard from "../wrappedMoviePosterCard";
import MovieDetails from "../details";
import Pagination from "../pagination";
import { BsArrow90DegDown } from "react-icons/bs";

const MyMoviesContainer = () => {
    const {
        ratedMovies,
        selectedMovie,
    } = useMyMoviesContext();

    const {
        results,
    } = ratedMovies || {};

    if (results && results.length > 0) {
        return (
            <div className="mx-auto mt-4 columns-1" >
                <Pagination />
                <ul
                    className="w-fit h-fit mt-12 mb-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
                >
                    {selectedMovie !== undefined && <MovieDetails />}
                    {results.map((result, index) => (
                        <li
                            key={result.original_title}
                            className={`relative mx-auto ${selectedMovie?.id === result.id ? 'order-first' : 'order-last'}`}
                        >
                            <WrappedMoviePosterCard
                                result={result}
                            />
                            {index === 0 && <small className="absolute left-[calc(50%-75px)] md:left-[calc(50%-45px)] -top-6 flex flex-nowrap gap-2" ><BsArrow90DegDown className="mt-auto" />Click me<BsArrow90DegDown className="scale-x-[-1] mt-auto" /></small>}
                        </li>
                    ))}
                </ul>
                <Pagination />
            </div>
        )
    }

    return null;
};

export default MyMoviesContainer;