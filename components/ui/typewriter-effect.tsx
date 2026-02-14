"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TypewriterEffect = ({
    words,
    className,
    cursorClassName,
}: {
    words: {
        text: string;
        className?: string;
    }[];
    className?: string;
    cursorClassName?: string;
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[currentWordIndex].text;
        const typeSpeed = isDeleting ? 50 : 100;
        const deleteSpeed = 30;
        const pauseTime = 1500;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (currentText.length < word.length) {
                    setCurrentText(word.slice(0, currentText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                if (currentText.length > 0) {
                    setCurrentText(word.slice(0, currentText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? deleteSpeed : typeSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words]);

    return (
        <div className={`inline-block ${className}`}>
            {words.map((word, idx) => (
                <span
                    key={idx}
                    className={`${word.className} ${idx === currentWordIndex ? "inline" : "hidden"
                        }`}
                >
                    {currentText}
                </span>
            ))}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className={`inline-block h-8 w-[2px] bg-primary ml-1 align-middle ${cursorClassName}`}
            />
        </div>
    );
};
