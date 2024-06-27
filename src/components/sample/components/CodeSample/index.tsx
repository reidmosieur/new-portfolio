import ContactMe from "@/components/contactMe";
import { RxCaretRight } from "react-icons/rx";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useSampleCodeContext } from "../../context/samplesStateContext";
import FileTree from "../fileTree";
import { CodeSample as CodeSampleType, Folder } from "../../types/types";
import { useEffect } from "react";

export interface CodeSampleProps {
  defaultSamplesStructure?: Folder;
  defaultActiveSample?: CodeSampleType;
}

const CodeSample = ({
  defaultActiveSample,
  defaultSamplesStructure,
}: CodeSampleProps) => {
  const {
    samplesStructure,
    activeSample,
    setSamplesStructure,
    setActiveSample,
  } = useSampleCodeContext();

  useEffect(() => {
    if (defaultSamplesStructure) {
      setSamplesStructure(defaultSamplesStructure);
    }
  }, [defaultSamplesStructure]);

  const components = {
    // Headings
    h1: ({ node, ...props }: any) => <h1 className="h1-style" {...props} />,
    h2: ({ node, ...props }: any) => <h2 className="h2-style" {...props} />,
    h3: ({ node, ...props }: any) => <h3 className="h3-style" {...props} />,
    h4: ({ node, ...props }: any) => <h4 className="h4-style" {...props} />,
    h5: ({ node, ...props }: any) => <h5 className="h5-style" {...props} />,
    h6: ({ node, ...props }: any) => <h6 className="h6-style" {...props} />,

    // Paragraphs
    p: ({ node, ...props }: any) => <p className="p-style" {...props} />,

    // Links
    a: ({ node, ...props }: any) => <a className="a-style" {...props} />,

    // Images
    img: ({ node, ...props }: any) => <img {...props} />,

    // Lists
    ul: ({ node, ...props }: any) => <ul className="ul-style" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="ol-style" {...props} />,
    li: ({ node, ...props }: any) => <li className="li-style" {...props} />,

    // Blockquotes
    blockquote: ({ node, ...props }: any) => (
      <blockquote className="blockquote-style" {...props} />
    ),

    // Horizontal rule
    hr: ({ node, ...props }: any) => <hr className="hr-style" {...props} />,

    // Emphasis
    em: ({ node, ...props }: any) => <em className="em-style" {...props} />,
    strong: ({ node, ...props }: any) => (
      <strong className="strong-style" {...props} />
    ),

    // Inline code
    inlineCode: ({ node, ...props }: any) => (
      <code className="inlineCode-style" {...props} />
    ),
  };

  return (
    <div className="container columns-1 space-y-8 lg:space-y-0 lg:flex lg:flex-row lg:flex-nowrap lg:gap-8">
      {samplesStructure && <FileTree folder={samplesStructure} />}
      {activeSample && (
        <div className="max-w-full lg:max-w-2xl flex flex-col flex-wrap gap-2">
          {activeSample.displayPath && (
            <div className="flex flex-nowrap gap-2">
              {activeSample.displayPath.split("/").map((path, index) => {
                const pathLength = activeSample.displayPath.split("/").length;
                const lastPartOfPath = index + 1 !== pathLength;

                return (
                  <>
                    <p
                      style={{
                        color: `${
                          lastPartOfPath
                            ? "rgb(0, 119, 170)"
                            : "rgb(221, 74, 104)"
                        }`,
                      }}
                    >
                      {path}
                    </p>
                    {lastPartOfPath && <RxCaretRight className="my-auto" />}
                  </>
                );
              })}
            </div>
          )}
          <div className="max-w-full rounded-md">
            <SyntaxHighlighter showLineNumbers language="typescript">
              {activeSample.codeString}
            </SyntaxHighlighter>
          </div>
          <div className="relative mt-10 p-8 w-full mx-auto bg-stone-900 rounded-md text-white flex flex-nowrap justify-center gap-4">
            <span>Like what you see? Let&apos;s get in touch!</span>
            <ContactMe />
          </div>
          {activeSample.explanation && (
            <ReactMarkdown components={components} className={"markdown"}>
              {activeSample.explanation}
            </ReactMarkdown>
          )}
          {activeSample.toDo && activeSample.toDo.length > 0 && (
            <ul>
              {activeSample.toDo.map((toDoItem, index) => (
                <li key={index}>{toDoItem}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeSample;
