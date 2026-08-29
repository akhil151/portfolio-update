'use client';

import React, { useMemo } from 'react';

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  fontSize?: string;
  lineHeight?: number; 
  className?: string;
  reset?: boolean;
}

const FallingText: React.FC<FallingTextProps> = ({
  text = '',
  highlightWords = [],
  fontSize = '1rem',
  lineHeight = 0.8,
  className = '',
}) => {
  const lines = useMemo(() => text.split(/<br\s*\/?>/i), [text]);

  return (
    <div
      className={`relative z-1 w-full h-full cursor-default overflow-hidden ${className}`}
    >
      <div
        className="inline-block relative z-10"
        style={{
          fontSize,
          lineHeight,
          wordBreak: 'break-word',
        }}
      >
        {lines.map((line, lineIndex) => {
          const words = line.trim().split(/\s+/).filter(Boolean);
          return (
            <div
              key={lineIndex}
              className="line-wrapper block"
              style={{ marginBottom: '-0.2em' }}
            >
              {words.map((word, wordIndex) => {
                const isHighlighted = highlightWords.some((phrase) =>
                  phrase.includes(word)
                );
                return (
                  <span key={wordIndex} className="inline-block">
                    {word.split('').map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className={`inline-flex select-none char-span leading-none will-change-transform ${
                          isHighlighted ? 'text-[#aaa]' : 'text-current'
                        }`}
                      >
                        {char}
                      </span>
                    ))}
                    <span className="inline-flex select-none char-span leading-none">
                      &nbsp;
                    </span>
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FallingText;