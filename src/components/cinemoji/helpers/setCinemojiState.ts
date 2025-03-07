import emojiMovies from '../data/emojiMovies'
import shuffleArray from './shuffleArray';
import fetchMovieData from './fetchMovieData';
import { TMDBMovie } from '../types/types';

type setCinemojiStateArgs = {
    setInitialEmojiString: React.Dispatch<React.SetStateAction<string>>;
    setShuffledMovieKeys: React.Dispatch<React.SetStateAction<string[]>>;
    setMovieResponses: React.Dispatch<React.SetStateAction<TMDBMovie[]>>;
}

const setCinemojiState = ({
  setMovieResponses,
  setInitialEmojiString,
  setShuffledMovieKeys,
}: setCinemojiStateArgs) => {
  const getRandomIndices = (num: number, max: number) => {
    const indices = new Set<number>();
    while (indices.size < num) {
      indices.add(Math.floor(Math.random() * max));
    }
    return Array.from(indices);
  };

  const movieKeys = Object.keys(emojiMovies);
  const initialIndex = Math.floor(Math.random() * movieKeys.length);
  const otherIndices = getRandomIndices(3, movieKeys.length);
  const filteredOtherIndices = otherIndices.filter(
    (index) => index !== initialIndex
  );
  const initialMovieKey = movieKeys[initialIndex];
  const otherMovieKeys = filteredOtherIndices.map((index) => movieKeys[index]);
  const combinedMovieKeys = [initialMovieKey, ...otherMovieKeys];
  const shuffled = shuffleArray([...combinedMovieKeys]);

  const fetchAndSetMovieData = async () => {
    const movieResponses = [];
    for (const movieKey of shuffled) {
      const movieData = await fetchMovieData(movieKey);
      if (movieData.results && movieData.results.length > 0) {
        const movieResponse = movieData.results[0];
        movieResponse.correctAnswer = movieKey === initialMovieKey;
        movieResponses.push(movieResponse);
      }
    }
    setMovieResponses(movieResponses);
  };

  fetchAndSetMovieData();

  setInitialEmojiString(emojiMovies[initialMovieKey]);
  setShuffledMovieKeys(shuffled);
};

export default setCinemojiState;