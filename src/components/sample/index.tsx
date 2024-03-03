import { FaCode } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";
import SimpleModal from "../modal/simpleModal";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import FileTree from "./components/fileTree";
import { useSampleCodeContext } from "./context/samplesStateContext";
import { File, Folder } from "./types/types";
import findLeastNestedItem from "./helpers/findLeastNestedFile";
import ReactMarkdown from "react-markdown";
import ContactMe from "../contactMe";

type SampleTypes = {
    headerJsonName: string, 
}

const Sample = ({
    headerJsonName,
}: SampleTypes) => {
    const {
        samplesStructure,
        activeSample,
        setSamplesStructure,
    } = useSampleCodeContext();

    const [open, setOpen] = useState(false);

      // Define custom components for rendering markdown elements
  const components = {
    // Headings
    h1: ({node, ...props}: any) => <h1 className='h1-style' {...props} />,
    h2: ({node, ...props}: any) => <h2 className='h2-style' {...props} />,
    h3: ({node, ...props}: any) => <h3 className='h3-style' {...props} />,
    h4: ({node, ...props}: any) => <h4 className='h4-style' {...props} />,
    h5: ({node, ...props}: any) => <h5 className='h5-style' {...props} />,
    h6: ({node, ...props}: any) => <h6 className='h6-style' {...props} />,
  
    // Paragraphs
    p: ({node, ...props}: any) => <p className='p-style' {...props} />,
  
    // Links
    a: ({node, ...props}: any) => <a className='a-style' {...props} />,
  
    // Images
    img: ({node, ...props}: any) => <img {...props} />,
  
    // Lists
    ul: ({node, ...props}: any) => <ul className='ul-style' {...props} />,
    ol: ({node, ...props}: any) => <ol className='ol-style' {...props} />,
    li: ({node, ...props}: any) => <li  className='li-style' {...props} />,
  
    // Blockquotes
    blockquote: ({node, ...props}: any) => <blockquote className='blockquote-style' {...props} />,
  
    // Horizontal rule
    hr: ({node, ...props}: any) => <hr className='hr-style' {...props} />,
  
    // Emphasis
    em: ({node, ...props}: any) => <em className='em-style' {...props} />,
    strong: ({node, ...props}: any) => <strong className='strong-style' {...props} />,
  
    // Inline code
    inlineCode: ({node, ...props}: any) => <code className='inlineCode-style' {...props} />,
  };

    useEffect(() => {
        if (open) {
            import(`./data/headers/${headerJsonName}.json`)
                .then(module => {
                    const header: Folder = module.default;
                    const leastNestedFile: File | undefined = findLeastNestedItem(header, 'file');

                    const setActiveOnLeastNestedFile = (folderOrFile: { name?: string; files?: any[]; folder?: any[]; }) => {
                        if (Array.isArray(folderOrFile)) {
                            folderOrFile.forEach(setActiveOnLeastNestedFile);
                        } else if (folderOrFile && folderOrFile.files) {
                            folderOrFile.files.forEach((file: { id: any; active: boolean; }) => {
                                if (leastNestedFile && file.id === leastNestedFile.id) {
                                    file.active = true;
                                }
                            });
                            if (folderOrFile.folder) {
                                folderOrFile.folder.forEach(setActiveOnLeastNestedFile);
                            }
                        }
                    };

                    setActiveOnLeastNestedFile(header);

                    setSamplesStructure(header);
                })
                .catch(error => {
                    console.error("Error loading header JSON:", error);
                });
        }
    }, [open, headerJsonName])

    return (
        <>
            <button 
                className="absolute -top-8 right-0 lg:top-0 lg:-right-8 w-fit group text-orange-500" 
                onClick={() => setOpen(true)}
            >
                <FaCode />
                <span className="hidden md:absolute w-40 bottom-6 z-10 transform -translate-x-1/2 scale-0 rounded bg-white p-2 text-stone-900 text-center font-bold transition duration-200 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-100">
                    View This Code
                </span>
            </button>
            <SimpleModal 
                open={open} 
                setOpen={setOpen} 
                title={activeSample?.title} 
                actions={[]}
            >
                <div
                    className="container columns-1 space-y-8 lg:space-y-0 lg:flex lg:flex-row lg:flex-nowrap lg:gap-8"
                >
                    {samplesStructure &&
                        <FileTree
                            folder={samplesStructure}
                        />
                    }
                    {activeSample &&
                        <div className="max-w-full lg:max-w-2xl flex flex-col flex-wrap gap-2" >
                            {activeSample.displayPath &&
                                <div className="flex flex-nowrap gap-2" >
                                    {activeSample.displayPath.split('/').map((path, index) => {
                                        const pathLength = activeSample.displayPath.split('/').length;
                                        const lastPartOfPath = index + 1 !== pathLength;

                                        return (
                                            <>
                                                <p
                                                    style={{
                                                        color: `${lastPartOfPath ?  'rgb(0, 119, 170)' : 'rgb(221, 74, 104)'}`
                                                    }}
                                                >
                                                    {path}
                                                </p>
                                                {lastPartOfPath && <RxCaretRight className="my-auto" />}
                                            </>
                                        )
                                    })}
                                </div>
                            }
                            <div className="max-w-full rounded-md" >
                                <SyntaxHighlighter
                                    showLineNumbers 
                                    language="typescript"
                                >
                                    {activeSample.codeString}
                                </SyntaxHighlighter>
                            </div>
                            <div className="relative mt-10 p-8 w-full mx-auto bg-stone-900 rounded-md text-white flex flex-nowrap justify-center gap-4" >
                                <span>Like what you see? Let&apos;s get in touch!</span>
                                <ContactMe />
                            </div>
                            {activeSample.explanation &&
                                <ReactMarkdown components={components} className={'markdown'} >
                                    {activeSample.explanation}
                                </ReactMarkdown>
                            }
                            {activeSample.toDo && activeSample.toDo.length > 0 &&
                                <ul>
                                    {activeSample.toDo.map((toDoItem, index) => <li key={index} >{toDoItem}</li>)}
                                </ul>
                            }
                        </div>
                    }
                </div>
            </SimpleModal>
        </>
    )
};

export default Sample;