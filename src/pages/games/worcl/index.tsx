import { useEffect, useState } from "react";
import GridContainer from "./components/inputs/gridContainer";
import { generate } from "random-words";
import { Guess, SingleCharacter } from "./types/types";
import "./styles/styles.css"
import GameStateProvider from "./context/gameStateProvider";
import { useGameState } from "./context/gameStateContext";
import Wordle from "./components/wordle";
import { SampleCodeContextProvider } from "@/components/sample/context/samplesStateProvider";
import FullScreenCentered from "@/components/container/fullScreenCentered";

const Page = () => {
    return (
        <SampleCodeContextProvider>
            <GameStateProvider>
                <FullScreenCentered>
                    <Wordle />
                </FullScreenCentered>
            </GameStateProvider>
        </SampleCodeContextProvider>
    )
}

export default Page;