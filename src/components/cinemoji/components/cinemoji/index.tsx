import MoviePosterCard from "../card/posterCard";
import { useCinemojiContext } from "../../context/cinemojiStateContext";
import SimpleModal from "@/components/modal/simpleModal";
import Link from "next/link";
import MovieFactsCard from "../card/movieFactsCard";
import setCinemojiState from "../../helpers/setCinemojiState";
import Sample from "@/components/sample";

const Cinemoji = () => {
    const {
        initialEmojiString,
        shuffledMovieKeys,
        displayResults,
        answeredCorrectly,
        setDisplayResults,
        setInitialEmojiString,
        setShuffledMovieKeys,
        setMovieResponses,
    } = useCinemojiContext();

    return (
        <div className="relative max-w-xs sm:container mx-auto space-y-4 p-4 lg:p-8 flex flex-col flex-wrap gap-8 bg-stone-900 rounded-lg" >
            <div className="w-fit mx-auto space-y-4" >
                <p className="text-2xl sm:text-3xl md:text-6xl" >What movie is this:</p>
                <p className="text-3xl md:text-7xl" >{initialEmojiString}</p>
            </div>
            <ul className="overflow-x-scroll max-w-full flex flex-row flex-nowrap gap-4" >
                {shuffledMovieKeys.map((movieKey, index) => (
                    <li key={index} className="mx-auto" >
                        <MoviePosterCard  
                            title={movieKey}                    
                        />
                    </li>
                ))}
            </ul>
            <small className="w-fit mx-auto text-stone-400" >Images courtesy of <Link href={'https://www.themoviedb.org'} className="underline" >The Movie Database</Link></small>
            <SimpleModal 
                open={displayResults} 
                setOpen={setDisplayResults} 
                title={<span className="text-3xl" >{answeredCorrectly ? `Great job!` : `Oh no! Here's the correct answer:`}</span> }
                actions={[
                    {
                        content: 'Play Again',
                        onClick: () => {
                            setDisplayResults(false);
                            setCinemojiState({ setInitialEmojiString, setShuffledMovieKeys, setMovieResponses });
                        },
                        buttonType: 'primary'
                    },
                    {
                        content: 'Close',
                        onClick: () => {
                            setDisplayResults(false);
                        },
                        buttonType: 'light'
                    },
                ]} 
            >
                <MovieFactsCard />
            </SimpleModal>
            <Sample headerJsonName="cinemoji" />
        </div>
    );
}

export default Cinemoji;