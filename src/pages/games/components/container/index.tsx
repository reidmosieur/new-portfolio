import { useState } from "react";
import Thumbnail from "../thumbnail";
import Cinemoji from "../../cinemoji/components/cinemoji";
import Wordle from "../../worcl/components/wordle";
import { FaCode } from "react-icons/fa";

type GameNames = "cinemoji" | "worcl" | undefined;

const GamesContainer = () => {
    const [activeGame, setActiveGame] = useState<GameNames>(undefined);

    return (
        <>
            <div className="max-w-prose w-full mx-auto flex flex-col flex-wrap content-start gap-4" >
                <h2 className="text-lg sm:text-xl lg:text-2xl" >Here are a couple little games I whipped up to give you a break from reading the same "about me" for the hundredth time.</h2>
                <div className="flex flex-wrap gap-4">
                    <Thumbnail 
                        imageSrc={"/worcl-icon.svg"} 
                        imageAlt={"Worcl"} 
                        onClick={() => setActiveGame(activeGame === "worcl" ? undefined : "worcl")} 
                        name="Worcl"
                        activeGame={activeGame}
                    />
                    <Thumbnail 
                        imageSrc={"/cinemoji-icon.svg"} 
                        imageAlt={"Cinemoji"} 
                        onClick={() => setActiveGame(activeGame === 'cinemoji' ? undefined : 'cinemoji')}
                        name="Cinemoji"
                        activeGame={activeGame}
                    />
                </div>
            </div>
            {activeGame &&
                <div className="w-fit mx-auto flex flex-col flex-wrap gap-4" >
                    {activeGame === 'cinemoji' && <Cinemoji />}
                    {activeGame === 'worcl' && <Wordle />}
                </div>
            }
        </>
    )
};

export default GamesContainer;