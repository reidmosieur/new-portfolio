import axios from "axios";

const fetchMovieData = async (movieTitle: string) => {
    const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const encodedTitle = encodeURIComponent(movieTitle);
    const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}`;
    const response = await axios.get(apiUrl, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${tmdbApiKey}`
        }
    });
    return response.data;
};

export default fetchMovieData;