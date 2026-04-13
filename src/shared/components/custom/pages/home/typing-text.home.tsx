'use client'

import {useEffect, useState} from "react";

const WORDS = ["Backend", "Mobile", "Web"] as const;
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;

const TypingText = () => {
    const [isTyping, setIsTyping] = useState(true);
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [showTyping, setShowTyping] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setShowTyping(true), 50);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!showTyping) return;

        let timeout: NodeJS.Timeout;

        if (isTyping) {
            if (charIndex < WORDS[wordIndex].length) {
                timeout = setTimeout(() => setCharIndex((prev) => prev + 1), TYPING_SPEED);
            } else {
                timeout = setTimeout(() => setIsTyping(false), PAUSE_DURATION);
            }
        } else {
            if (charIndex > 0) {
                timeout = setTimeout(() => setCharIndex((prev) => prev - 1), ERASING_SPEED);
            } else {
                setWordIndex((prev) => (prev + 1) % WORDS.length);
                setIsTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isTyping, wordIndex, showTyping]);

    // Для LCP: текст виден сразу, печатаем эффектом только если showTyping
    const fullWord = WORDS[wordIndex];
    const text = showTyping ? fullWord.slice(0, charIndex) : fullWord;

    return (
        <div className="h-8 flex items-center">
            <span className="text-xl md:text-2xl text-black/90 group-hover:text-black dark:text-white/90  dark:group-hover:text-white bg-clip-text font-light">
                {text}
            </span>
            <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] mr-1 animate-blink"></span>
            <span className="text-xl md:text-2xl"> Developer</span>
        </div>
    );
};

export default TypingText;