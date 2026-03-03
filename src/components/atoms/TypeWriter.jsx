import { useState, useEffect } from 'react';

/**
 * Typewriter effect component that types out text character by character
 * with a blinking cursor at the end.
 */
const TypeWriter = ({ text, speed = 100, delay = 500, className = '', cursorClassName = '' }) => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        let i = 0;
        const startTimeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(text.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(interval);
                    setIsDone(true);
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, speed, delay]);

    // Blink cursor after typing is done
    useEffect(() => {
        if (!isDone) return;
        const blink = setInterval(() => setShowCursor(v => !v), 530);
        return () => clearInterval(blink);
    }, [isDone]);

    return (
        <span className={className}>
            {displayText}
            <span
                className={cursorClassName}
                style={{
                    opacity: showCursor ? 1 : 0,
                    transition: 'opacity 0.1s',
                    marginLeft: '2px',
                }}
            >
                |
            </span>
        </span>
    );
};

export default TypeWriter;
