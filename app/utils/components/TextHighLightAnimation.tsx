import React, { useState, useEffect } from 'react';

export const TextHighLightAnimation = ({ lyrics }: { lyrics: string }) => {
    // 1. Split the lyrics into individual words
    const splitLyrics = lyrics.split(" ");

    // 2. State to track the index of the currently highlighted word
    const [highlightIndex, setHighlightIndex] = useState(0);

    // 3. useEffect to cycle through the words
    useEffect(() => {
        if (splitLyrics.length === 0) return;

        // Set the duration for each word's highlight (e.g., 500ms or 0.5 seconds)
        const duration = 1200;

        // Set up the interval to advance the index
        const intervalId = setInterval(() => {
            setHighlightIndex(prevIndex =>
                // Cycle back to the first word (0) when the end is reached
                (prevIndex + 1) % splitLyrics.length
            );
        }, duration);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [splitLyrics.length]); // Re-run effect if the number of words changes

    return (
        <div className="relative bg-transparent p-2 text-white text-base overflow-hidden w-full">
            <div className="flex space-x-2 items-center justify-center">
                {splitLyrics.map((word, index) => (
                    // Assign a key for React rendering efficiency
                    <span
                        key={index}
                        // Use the highlightIndex state to conditionally apply the active class
                        className={`
                            transition-colors 
                            duration-500 
                            ease-in-out
                            ${index === highlightIndex ? 'text-yellow-400' : 'text-white'}
                        `}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TextHighLightAnimation;