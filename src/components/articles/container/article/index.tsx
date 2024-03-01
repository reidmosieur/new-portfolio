import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ArticleHero from '../../hero';
import { useArticlesContext } from '../../context/articlesStateContext';
import ModalContainer from '@/components/modal/modalContainer';

const ArticleContainer = () => {
  const {
    article,
  } = useArticlesContext();

  const [imageOpen, setImageOpen] = useState(false);
  const expandableImage = useRef({
    src: '',
    alt: '',
    title: '',
  });

  const handleOpenImage = (src: string, alt: string, title: string) => {
    setImageOpen(true);
    expandableImage.current = {
      src: src,
      alt: alt,
      title: title,
    };
  }

  const imageTemplate = ({node, props}: any) => {   
    return (
       <button
         className='hover:cursor-zoom-in'
         onClick={() => {
           handleOpenImage(
             props.src,
             props.alt,
             props.title,
           )
         }}
       >
         <img className='img-style' {...props} />
       </button>
    );
  }

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
    img: ({node, ...props}: any) => imageTemplate({node, props}),
  
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

  return (
    <div className='max-w-prose w-full columns-1 space-y-12' >
        <ArticleHero />
        <ReactMarkdown components={components} className={'markdown'} >
            {article?.markdown}
        </ReactMarkdown>
        <ModalContainer 
          open={imageOpen} 
          setOpen={setImageOpen} 
        >
          <img
            className='max-w-5xl bg-black'
            src={expandableImage.current.src}
            alt={expandableImage.current.alt}
            title={expandableImage.current.title}
          />
        </ModalContainer>
    </div>
  );
};

export default ArticleContainer;