import { SetStateAction, createContext, useContext } from "react";
import { CodeSample, Folder } from "../types/types";

interface SampleCodeContextValue {
    samplesStructure: Folder | undefined,
    activeSample: CodeSample | undefined,
    setSamplesStructure: React.Dispatch<SetStateAction<Folder | undefined>>,
    setActiveSample: React.Dispatch<SetStateAction<CodeSample | undefined>>
}

const SampleCodeContext = createContext<SampleCodeContextValue | undefined>(undefined);

export const useSampleCodeContext = () => {
    const context = useContext(SampleCodeContext);
    if (!context) {
        throw new Error('useSampleCodeContext must be used within a GameProvider');
    }
    return context;
};

export default SampleCodeContext;