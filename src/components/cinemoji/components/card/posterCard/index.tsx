import Image from "next/image";
import { TMDBMovie } from "../../../types/types";
import { useEffect, useState } from "react";
import { useSpring, animated } from '@react-spring/web';
import { useCinemojiContext } from "../../../context/cinemojiStateContext";
import setCinemojiState from "../../../helpers/setCinemojiState";
import { useTimeout } from "react-use";

interface MoviePosterCardProps {
    title: string;
}

interface ChoiceContainerProps {
    children: React.ReactNode,
    onClick?: () => void,
    answerAnimation?: any,
}

const ChoiceContainer = ({
    children,
    onClick,
    answerAnimation,
}: ChoiceContainerProps) => {
    const [hover, setHover] = useState(false);
    const props = useSpring({
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        config: { tension:   200, friction:   20 },
    });

    const handleMouseEnter = () => setHover(true);
    const handleMouseLeave = () => setHover(false);

    return (
        <animated.div style={answerAnimation} >
            <animated.div style={props}>
                <button
                    onClick={onClick}
                    className="w-[200px] h-[300px] p-2 rounded bg-stone-300"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {children}
                </button>
            </animated.div>
        </animated.div>
    );
};

const findMovieByTitle = (title: string, movieResponses: TMDBMovie[]) => {
    return movieResponses.find(movie => movie.title === title);
};

const MoviePosterCard = ({
    title,
}: MoviePosterCardProps) => {
    const {
        movieResponses,
        setDisplayResults,
        setAnsweredCorrectly,
    } = useCinemojiContext();
    const [movieResponse, setMovieResponse] = useState<TMDBMovie>();

    const [flip, setFlip] = useState(false);
    const [shake, setShake] = useState(false);

    const flipAnimation = useSpring({
        transform: flip ? 'rotateY(360deg)' : 'rotateY(0deg)',
        config: { tension:  200, friction:  20 },
        onResolve: () => setFlip(false),
    });
    
    const shakeAnimation = useSpring({
        from: { transform: 'translateX(0px) translateY(0px) rotate(0deg)' },
        to: shake ? async next => {
            await next({ transform: 'translateX(10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(-10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(-10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(-10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(-10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(-10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(-10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(-10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(-10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(-10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(-10px) translateY(0px) rotate(0deg)' });
            await next({ transform: 'translateX(0px) translateY(0px) rotate(0deg)' });
        } : { transform: 'translateX(0px) translateY(0px) rotate(0deg)' },
        config: { tension: 0, friction: 200 },
        onResolve: () => setShake(false),
    });

    const handleClick = () => {
        if (movieResponse?.correctAnswer) {
            setFlip(true);
        } else {
            setShake(true);
        }

        setDisplayResults(true);
        setAnsweredCorrectly(movieResponse?.correctAnswer || false);
    };

    useEffect(() => {
        if (movieResponses.length >  0) {
            const thisMovieResponse = findMovieByTitle(title, movieResponses);
            setMovieResponse(thisMovieResponse);
        }
    }, [movieResponses]);

    if (movieResponse?.poster_path) {
        const basePosterURL = 'https://image.tmdb.org/t/p/w200';
        const moviePosterURL = basePosterURL + movieResponse?.poster_path;

        return (
            <ChoiceContainer
                onClick={handleClick}
                answerAnimation={movieResponse?.correctAnswer ? flipAnimation : shakeAnimation}
            >
                <Image src={moviePosterURL} alt={title} width={200} height={300} className="rounded shadow shadow-lg shadow-stone-400" />
            </ChoiceContainer>
        );
    }

    return (
        <ChoiceContainer
            onClick={handleClick}
            answerAnimation={movieResponse?.correctAnswer ? flipAnimation : shakeAnimation}
        >
            <span className="font-bold text-stone-900" >{title}</span>
        </ChoiceContainer>
    )
};

export default MoviePosterCard;