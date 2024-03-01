type SingleCharacter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

type Guess = {
    word: SingleCharacter[];
    correct: boolean | undefined;
}

type RowType = 'currentGuess' | 'pastGuess' | 'futureGuess'

type GameResultsState = {
    isGameFinished: boolean;
    isGameWon: boolean;
}

type Pronunciation = {
    audio?: string;
    text?: string;
    sourceUrl?: string;
    license?: {
        name: string;
        url: string;
    };
};

type Definition = {
    definition: string;
    synonyms: string[];
    antonyms: string[];
    example?: string;
};

type Meaning = {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
};

type WordResponse = {
    word: string;
    phonetics: Pronunciation[];
    meanings: Meaning[];
    license: {
        name: string;
        url: string;
    };
    sourceUrls: string[];
}[];

type WordleHistory = {
    wordLength: number;
    answer: SingleCharacter[];
    guesses: Guess[];
    currentGuess: Guess;
    gameResultsState: GameResultsState;
}

export type { SingleCharacter, Guess, RowType, GameResultsState, Pronunciation, Definition, Meaning, WordResponse, WordleHistory };