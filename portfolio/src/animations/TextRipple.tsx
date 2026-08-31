"use client";

import { useRef } from "react";
import { motion, useInView, Variants, useScroll, useTransform, MotionValue } from "framer-motion";

interface TextRippleProps {
  text: string;
  className?: string;
  once?: boolean;
  delayOffset?: number;
  duration?: number;
  blur?: boolean;
  scrub?: boolean;
  reverse?: boolean; // New prop: defaults to false
}

// Sub-component to prevent Hook violations (needed for both modes)
interface RippleCharProps {
  char: string;
  i: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  scrub: boolean;
  blur: boolean;
  charVariants: Variants;
  isInView: boolean;
  startY: number;
}

const RippleChar = ({
  char,
  i,
  centerIndex,
  scrollYProgress,
  scrub,
  blur,
  charVariants,
  isInView,
  startY
}: RippleCharProps) => {
  const charDelay = Math.abs(i - centerIndex) * 0.1;
  const start = 0 + charDelay;
  const end = Math.min(1, 0.6 + charDelay);
  
  const yScrub = useTransform(scrollYProgress, [start, end], [startY, 0]);
  const blurScrub = useTransform(scrollYProgress, [start, end], ["blur(10px)", "blur(0px)"]);

  return (
    <motion.span
      custom={i}
      variants={!scrub ? charVariants : undefined}
      initial={!scrub ? "hidden" : undefined}
      animate={!scrub ? (isInView ? "visible" : "hidden") : undefined}
      style={scrub ? { 
          y: yScrub, 
          filter: blur ? blurScrub : "none" 
      } : {}}
      className="inline-block whitespace-pre px-[0.0025em] will-change-transform"
    >
      {char}
    </motion.span>
  );
};

interface CharInfo {
  char: string;
  index: number;
}

interface Token {
  type: "word" | "space";
  chars: CharInfo[];
}

function tokenizeText(text: string): { tokens: Token[]; totalChars: number } {
  // Normalize &nbsp; entities to non-breaking spaces
  const normalized = text.replace(/&nbsp;/g, "\u00A0");
  const rawChars = normalized.split("");
  const totalChars = rawChars.length;
  const tokens: Token[] = [];
  let currentWord: CharInfo[] = [];

  for (let i = 0; i < rawChars.length; i++) {
    const char = rawChars[i];
    const isSpace = char === " " || char === "\u00A0" || char === "\t" || char === "\n";

    if (isSpace) {
      if (currentWord.length > 0) {
        tokens.push({ type: "word", chars: currentWord });
        currentWord = [];
      }
      tokens.push({ type: "space", chars: [{ char, index: i }] });
    } else {
      currentWord.push({ char, index: i });
    }
  }

  if (currentWord.length > 0) {
    tokens.push({ type: "word", chars: currentWord });
  }

  return { tokens, totalChars };
}

const TextRipple = ({
  text,
  className = "",
  once = true,
  delayOffset = 0.08,
  duration = 0.5,
  blur = false,
  scrub = false,
  reverse = false,
}: TextRippleProps) => {
  const containerRef = useRef(null);
  
  // Logic: Use original settings for normal, modified settings for reverse
  const viewMargin = reverse ? "0px" : "-10% 0px";
  const scrollOffset: NonNullable<Parameters<typeof useScroll>[0]>["offset"] = reverse 
    ? ["start end", "end end"] 
    : ["start end", "end center"];

  const isInView = useInView(containerRef, {
    once,
    margin: viewMargin,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollOffset,
  });

  const { tokens, totalChars } = tokenizeText(text);
  const centerIndex = (totalChars - 1) / 2;
  
  // startY is 200 for bottom-up (reverse), -200 for top-down (original)
  const startY = reverse ? 200 : -200;

  const charVariants: Variants = {
    hidden: {
      y: startY,
      filter: blur ? "blur(10px)" : "blur(0px)",
    },
    visible: (i: number) => ({
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: Math.abs(i - centerIndex) * delayOffset,
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden flex flex-wrap justify-center items-center px-2 ${className}`}
    >
      {tokens.map((token, tIdx) => {
        if (token.type === "word") {
          return (
            <span key={`w-${tIdx}`} className="inline-flex whitespace-nowrap">
              {token.chars.map(({ char, index }) => (
                <RippleChar
                  key={index}
                  char={char}
                  i={index}
                  centerIndex={centerIndex}
                  scrollYProgress={scrollYProgress}
                  scrub={scrub}
                  blur={blur}
                  charVariants={charVariants}
                  isInView={isInView}
                  startY={startY}
                />
              ))}
            </span>
          );
        }
        return (
          <span key={`s-${tIdx}`} className="inline-block whitespace-pre">
            {token.chars.map(({ char, index }) => (
              <RippleChar
                key={index}
                char={char}
                i={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
                scrub={scrub}
                blur={blur}
                charVariants={charVariants}
                isInView={isInView}
                startY={startY}
              />
            ))}
          </span>
        );
      })}
    </div>
  );
};

export default TextRipple;