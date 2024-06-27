import React, { useState, useRef, useEffect } from 'react';
import { File, Folder } from '../../types/types';
import { FaFileCode, FaFolder, FaFolderOpen } from 'react-icons/fa';
import { useSampleCodeContext } from '../../context/samplesStateContext';

interface FileTreeProps {
    folder: Folder;
    depth?: number;
}

const FileTree = ({ folder, depth =  1 }: FileTreeProps) => {
    const {
        setSamplesStructure,
    } = useSampleCodeContext();

    const [open, setOpen] = useState(true);

    // Helper function to recursively set the active file
    const setActiveFile = (folder: Folder, targetFile: File): Folder => {
        // Create a new files array with the active property set correctly
        const updatedFiles = folder.files?.map(file => ({
            ...file,
            active: file.id === targetFile.id,
        })) || [];
    
        // Create a new folder array with updated subfolders
        const updatedFolders = folder.folder?.map(subFolder => setActiveFile(subFolder, targetFile)) || [];
    
        // Return a new folder object with the updated files and folders
        return {
            ...folder,
            files: updatedFiles,
            folder: updatedFolders,
        };
    };

    const setNewActiveFile = (file: File) => {
        setSamplesStructure((prev: Folder | undefined) => {
            if (!prev) {
                return prev;
            }; // If there's no previous structure, return as is

            // Use the helper function to set the active file and update the structure
            const updatedStructure = setActiveFile(prev, file);

            return updatedStructure;
        });
    };

    return (
      <div className="h-fit max-w-full lg:max-w-sm grow bg-[#f5f2f0] text-black rounded-md">
        <ul
          className="lg:w-[24rem] sm:text-lg lg:text-xl group"
          style={{
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          }}
        >
          {folder.name && (
            <li className={`columns-1`}>
              <button
                className={`w-full flex flex-nowrap gap-2 hover:underline`}
                style={{
                  paddingLeft: `${depth}rem`,
                  color: `rgb(0, 119, 170)`,
                }}
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <FaFolderOpen className="my-auto" />
                ) : (
                  <FaFolder className="my-auto" />
                )}
                {folder.name}
              </button>
              <div
                className={`${
                  open ? "block" : "hidden"
                } transition-all duration-1000 ease-in-out`}
              >
                {folder.folder?.map((subFolder, index) => (
                  <div
                    className={`lg:w-[24rem] flex flex-nowrap gap-2`}
                    key={subFolder.name}
                  >
                    <div>
                      <FileTree folder={subFolder} depth={depth + 1} />
                    </div>
                  </div>
                ))}
                {folder.files?.map((file: File, index) => (
                  <div
                    className={`lg:w-[24rem] ${
                      file.active && "bg-stone-300 rounded"
                    }`}
                    key={file.id}
                  >
                    <button
                      className={`lg:w-[24rem] flex flex-nowrap gap-2 text-start hover:underline text-wrap`}
                      style={{
                        paddingLeft: `${depth + 1}rem`,
                        color: `${
                          file.active ? "rgb(221, 74, 104)" : "rgb(102, 153, 0)"
                        }`,
                      }}
                      onClick={() => setNewActiveFile(file)}
                    >
                      <FaFileCode className="my-auto" />
                      {file.name}
                    </button>
                  </div>
                ))}
              </div>
            </li>
          )}
        </ul>
      </div>
    );
};

export default FileTree;