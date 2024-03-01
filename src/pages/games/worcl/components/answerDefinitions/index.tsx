import React, { useRef } from 'react';
import { WordResponse } from '../../types/types';
import { PauseIcon, PlayIcon } from '@heroicons/react/24/outline';

interface AnswerDefinitionProps {
    answerDefinitions: WordResponse;
}

const AnswerDefinitions: React.FC<AnswerDefinitionProps> = ({ answerDefinitions }) => {
    const audioRef = React.useRef<(HTMLAudioElement | null)[]>([]);
    const [isPlaying, setIsPlaying] = React.useState(Array(answerDefinitions[0].phonetics.length).fill(false));

    const togglePlay = (index: number) => {
        if (audioRef.current[index]) {
            if (audioRef?.current[index]?.paused) {
                audioRef?.current[index]?.play();
                setIsPlaying(prevState => prevState.map((state, i) => i === index ? true : state));
            } else {
                audioRef?.current[index]?.pause();
                setIsPlaying(prevState => prevState.map((state, i) => i === index ? false : state));
            }
        }
    };

    return (
        <ul className='mt-4 flex flex-col flex-wrap gap-4' >
            {answerDefinitions.map((responseItem, index) => (
                <li key={index} >
                    <ul key={index} className='flex flex-col flex-wrap gap-8' >
                        {responseItem.meanings.map((meaning, meaningIndex) => (
                            <li key={meaningIndex} className='flex flex-col flex-wrap gap-3' >
                                <p><strong>Part of Speech:</strong> {meaning.partOfSpeech}</p>
                                {meaning.synonyms.length > 0 && <p><strong>Synonyms:</strong> {meaning.synonyms.join(', ')}</p>}
                                {meaning.antonyms.length > 0 && <p><strong>Antonyms:</strong> {meaning.antonyms.join(', ')}</p>}
                                <div className='flex flex-col flex-wrap gap-1' >
                                    <p><strong>Definitions:</strong></p>
                                    <ul className='flex flex-col flex-wrap gap-1 list-disc' >
                                        {meaning.definitions.map((definition, defIndex) => (
                                            <li className='ml-4' key={defIndex}>{definition.definition}</li>
                                        ))}
                                    </ul>
                                </div>
                                {meaning.definitions.some(definition => definition.example) &&
                                    <>
                                        <p><strong>Examples:</strong></p>
                                        <ul className='flex flex-col flex-wrap gap-1 list-disc'>
                                            {meaning.definitions.filter(definition => definition.example).map((definition, defIndex) => (
                                                <li className='ml-4' key={defIndex}><p>{definition.example}</p></li>
                                            ))}
                                        </ul>
                                    </>
                                }
                            </li>
                        ))}
                        {responseItem.phonetics.length > 0 &&
                            <div className='flex flex-col flex-wrap gap-1'>
                                <p><strong>Pronunciations:</strong></p>
                                {responseItem.phonetics.map((pronunciation, pronIndex) => (
                                    <li key={pronIndex} className='flex flex-row flex-nowrap gap-2'>
                                        {pronunciation.audio || pronunciation.text ?  
                                            <div className='flex flex-nowrap gap-1'>
                                                {pronunciation.audio && (
                                                    <>
                                                        <audio   
                                                            ref={el => {
                                                                if (audioRef.current) {
                                                                    audioRef.current[pronIndex] = el
                                                                }
                                                            }}   
                                                            src={pronunciation.audio}   
                                                            style={{ display: 'none' }}   
                                                            onPlay={() => setIsPlaying(prevState => prevState.map((state, i) => i === pronIndex ? true : state))}   
                                                            onPause={() => setIsPlaying(prevState => prevState.map((state, i) => i === pronIndex ? false : state))}   
                                                            onEnded={() => setIsPlaying(prevState => prevState.map((state, i) => i === pronIndex ? false : state))}   
                                                        />
                                                        <button onClick={() => togglePlay(pronIndex)}>
                                                            {!isPlaying[pronIndex] ? <PlayIcon className='w-6 h-6' /> : <PauseIcon className='w-6 h-6' />}
                                                        </button>
                                                    </>
                                                )}
                                                {pronunciation.text && <p>{pronunciation.text}</p>}
                                            </div>
                                            : null
                                        }
                                    </li>
                                ))}
                            </div>
                        }
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default AnswerDefinitions;