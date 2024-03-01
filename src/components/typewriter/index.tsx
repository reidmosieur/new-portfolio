import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TypewriterProps } from './types';

const Typewriter: React.FC<TypewriterProps> = ({ 
    textArray, 
    displayDuration, 
    typingSpeed,
    deletingSpeed,
    loops,
}) => {
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [writingStage, setWritingStage] = useState<'typing' | 'displaying' | 'deleting'>('typing');
    const [loopCount, setLoopCount] = useState(1); // New state variable for loop count
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (writingStage !== 'typing') {
            setCurrentText(textArray[textIndex]);
        }
    }, [textIndex, writingStage]);

    const checkForLoops = (execute: () => void) => {
        if (!loops) {
            execute();
        } else if (loops && loopCount <= loops) {
            execute();
        } else if (loopCount >= loops && textIndex === 0) {
            execute();
        }
    }

    const typingString = useCallback(() => {
        setCurrentText(textArray[textIndex].slice(0, charIndex +   1));
        setCharIndex(charIndex +   1);
        if (charIndex === textArray[textIndex].length) {
            setWritingStage('displaying');
        }
    }, [textArray, textIndex, charIndex]);

    const deletingString = useCallback(() => {
        setCurrentText(textArray[textIndex].slice(0, charIndex -   1));
        setCharIndex(charIndex -   1);
        if (charIndex ===  0) {
            if (textIndex +  1 !== textArray.length) {
                setCurrentText('');
                setWritingStage('typing');
                setTextIndex(textIndex +   1);
            } else {
                if (loops !== undefined && loopCount <= loops) {
                    // If loops prop is defined and loop count has reached the limit, stop typing
                    setCurrentText(''); // Clear the current text
                    setWritingStage('typing');
                    setTextIndex(0);
                    setLoopCount(prev => prev + 1); // Increment the loop count
                    if (timerRef.current) {
                        clearTimeout(timerRef.current); // Clear the timeout
                    }
                } else {
                    // Otherwise, reset the loop count and continue typing
                    setCurrentText('');
                    setWritingStage('typing');
                    setTextIndex(0);
                }
            }
        }
    }, [textArray, textIndex, charIndex, loops, loopCount]);

    const startTyping = useCallback(() => {
        timerRef.current = setTimeout(typingString, typingSpeed);
    }, [typingString, typingSpeed]);

    const startDeleting = useCallback(() => {
        timerRef.current = setTimeout(deletingString, deletingSpeed);
    }, [deletingString, deletingSpeed]);

    useEffect(() => {
        if (writingStage === 'typing') {
            checkForLoops(startTyping);
        }
        if (writingStage === 'displaying') {
            if (!loops) {
                timerRef.current = setTimeout(() => {
                    setWritingStage('deleting')
                }, displayDuration);
            } else if (loops && loopCount <= loops) {
                timerRef.current = setTimeout(() => {
                    setWritingStage('deleting')
                }, displayDuration);
            } else if (loopCount <= loops && textIndex === 0) {
                timerRef.current = setTimeout(() => {
                    setWritingStage('deleting')
                }, displayDuration);
            }
        }
        if (writingStage === 'deleting') {
            checkForLoops(startDeleting);
        }
        return () => {
            if (timerRef.current) {
            clearTimeout(timerRef.current);
            }
        };
    }, [writingStage, displayDuration, startTyping, startDeleting]);

    return (
        <div className="relative min-h-[67px]">
            <span className="overflow-hidden">{currentText}</span>
        </div>
    );
};

export default Typewriter;