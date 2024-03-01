import { ReactNode, useEffect, useState } from "react";
import MyMoviesContext from "./myMoviesStateContext";
import { CurrentPagination, RatedMovies, Result } from "../types/types";
import getRatedMovies from "../helpers/getRatedMovies";

export const MyMoviesContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ratedMovies, setRatedMovies] = useState<RatedMovies | undefined>(undefined);
    const [selectedMovie, setSelectedMovie] = useState<Result | undefined>(undefined);
    const [currentPagination, setCurrentPagination] = useState<CurrentPagination>({
        currentPage: 1,
        currentSort: 'created_at.asc',
    });
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        setFetching(true);
        getRatedMovies({
            setRatedMovies,
            page: currentPagination.currentPage,
            sort_by: currentPagination.currentSort,
        })
        .then(() => setFetching(false))
    }, [currentPagination, getRatedMovies]);

    return (
        <MyMoviesContext.Provider value={{
            ratedMovies,
            selectedMovie,
            currentPagination,
            fetching,
            setRatedMovies,
            setSelectedMovie,
            setCurrentPagination,
            setFetching,
        }}>
            {children}
        </MyMoviesContext.Provider>
    );
};