import { ReactNode, useEffect, useState } from "react";
import SampleCodeContext from "./samplesStateContext";
import { CodeSample, File, Folder } from "../types/types";
import findLeastNestedItem from "../helpers/findLeastNestedFile";

export const SampleCodeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [samplesStructure, setSamplesStructure] = useState<Folder | undefined>(undefined);
    const [activeSample, setActiveSample] = useState<CodeSample | undefined>(undefined);

    useEffect(() => {
        console.log('sample structure changed...', samplesStructure)
        if (samplesStructure) {
            let activeSamplePath;
            const findActiveFile = (folder: Folder) => {
                // Check if the folder has files and iterate over them
                if (folder.files) {
                    for (const file of folder.files) {
                        if (file.active) {
                            activeSamplePath = file.jsonPath;
                            return true; // Stop searching once the active file is found 
                        }
                    }
                }
                // Check if the folder has subfolders and iterate over them
                if (folder.folder) {
                    for (const subfolder of folder.folder) {
                        if (findActiveFile(subfolder)) {
                            return true; // Stop searching if the active file is found in a subfolder
                        }
                    }
                }
                return false; // Continue searching if the active file is not found in the current folder
            };
    
            findActiveFile(samplesStructure);
    
            if (activeSamplePath) {
                console.log(activeSamplePath)
                import(`../${activeSamplePath}`)
                    .then(module => {
                        setActiveSample(module.default);
                    })
                    .catch(error => {
                        console.error("Error loading initial file:", error);
                    });
            }
        }
    }, [samplesStructure]);
    
    return (
        <SampleCodeContext.Provider value={{
            samplesStructure,
            activeSample,
            setSamplesStructure,
            setActiveSample,
        }}>
            {children}
        </SampleCodeContext.Provider>
    );
};