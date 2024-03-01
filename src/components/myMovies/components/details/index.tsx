import formatReleaseDate from "@/pages/games/cinemoji/helpers/formatReleaseDate";
import { useMyMoviesContext } from "../../context/myMoviesStateContext";
import Score from "../score";

const MovieDetails = () => {
    const {
        selectedMovie,
    } = useMyMoviesContext();

    if (selectedMovie) {
        return (
            <div className="max-w-prose p-4 border border-stone-900 bg-stone-900 rounded-md order-2 col-span-1 md:col-span-2 md:order-first lg:order-2 lg:col-span-2 xl:col-span-3 relative" >
                <span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold" >{selectedMovie?.title}</h3>
                    {selectedMovie?.release_date && <span>{formatReleaseDate(selectedMovie?.release_date)}</span>}
                </span>
                <p>{selectedMovie?.overview}</p>
                <Score 
                    type="overall"
                    ratedMovie={selectedMovie}
                />
            </div>
        )
    }

    return null;
};

export default MovieDetails;