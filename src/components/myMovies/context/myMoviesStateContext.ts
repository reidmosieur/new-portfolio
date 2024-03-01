import { SetStateAction, createContext, useContext } from "react";
import { CurrentPagination, RatedMovies, Result } from "../types/types";

interface MyMoviesContextValue {
    ratedMovies: RatedMovies | undefined;
    selectedMovie: Result | undefined;
    currentPagination: CurrentPagination;
    fetching: boolean;
    setRatedMovies: React.Dispatch<SetStateAction<RatedMovies | undefined>>;
    setSelectedMovie: React.Dispatch<SetStateAction<Result | undefined>>;
    setCurrentPagination: React.Dispatch<SetStateAction<CurrentPagination>>;
    setFetching: React.Dispatch<SetStateAction<boolean>>;
}

const MyMoviesContext = createContext<MyMoviesContextValue | undefined>(undefined);

export const useMyMoviesContext = () => {
    const context = useContext(MyMoviesContext);
    if (!context) {
        throw new Error('useMyMoviesContext must be used within a GameProvider');
    }
    return context;
};

export default MyMoviesContext;