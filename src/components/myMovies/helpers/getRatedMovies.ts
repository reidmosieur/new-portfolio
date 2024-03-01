import axios from "axios";
import { RatedMovies } from "../types/types";

interface GetRatedMoviesProps {
    setRatedMovies: React.Dispatch<React.SetStateAction<RatedMovies | undefined>>;
    page?: number;
    sort_by?: 'created_at.asc' | 'created_at.desc';
}

const getRatedMovies = async ({
    setRatedMovies,
    page = 1,
    sort_by = 'created_at.asc',
}: GetRatedMoviesProps) => {
    const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const tmdbAccountId = process.env.NEXT_PUBLIC_TMDB_ACCOUNT_ID
    const url = `https://api.themoviedb.org/3/account/${tmdbAccountId}/rated/movies?page=${page}&sort_by=${sort_by}`

    axios.get(url, {
        headers: {
            Authorization: `Bearer ${tmdbApiKey}`
        }
    })
    .then((response) => setRatedMovies(response.data));
}

export default getRatedMovies;