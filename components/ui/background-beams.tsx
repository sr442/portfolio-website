"use client";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={`absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none ${className}`}
        >
            <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="absolute inset-0 opacity-0 sm:opacity-100">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            x: Math.random() * 1000 - 500,
                            y: Math.random() * 1000 - 500,
                            scale: 0.5,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            x: Math.random() * 1000 - 500,
                            y: Math.random() * 1000 - 500,
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10,
                        }}
                        className="absolute h-1 w-1 bg-primary rounded-full blur-sm"
                    />
                ))}
            </div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>
    );
};
