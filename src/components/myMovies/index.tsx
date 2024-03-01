import Link from "next/link";
import MyMoviesContainer from "./components/container";
import { MyMoviesContextProvider } from "./context/myMoviesStateProvider";
import Sample from "../sample";

const MyMovies = () => {
    return (
        <MyMoviesContextProvider>
            <section className="relative flex flex-col flex-wrap content-center" id="my-movies" >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" >What I've been watching:</h2>
                <MyMoviesContainer />
                <small className="text-stone-300 text-center mt-4" >Data courtesy of <Link className="underline text-[#48b5e3]" href={'https://www.themoviedb.org'} >The Movie Database</Link></small>
                <Sample headerJsonName="myMovies" />
            </section>
        </MyMoviesContextProvider>
    )
}

export default MyMovies;