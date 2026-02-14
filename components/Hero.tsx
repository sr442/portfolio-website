"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, TrendingUp, Cpu, Linkedin, Github } from "lucide-react";
import { TypewriterEffect } from "./ui/typewriter-effect";

import { BackgroundBeams } from "./ui/background-beams";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8">
            <BackgroundBeams />
            {/* Background gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
                <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <div className="max-w-5xl w-full text-center space-y-8 z-10">
                {/* Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-32 h-32 mx-auto mb-8 rounded-full p-1 bg-gradient-to-r from-primary to-accent"
                >
                    <div className="w-full h-full rounded-full overflow-hidden bg-background">
                        {/* User should replace this with their actual photo */}
                        <img
                            src="/profile.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                            onError={(e) => {
                                // Fallback if image not found
                                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Shubhankar+Rana&background=0D8ABC&color=fff&size=128";
                            }}
                        />
                    </div>
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-secondary-foreground/10 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-muted-foreground">Available for new opportunities</span>
                </motion.div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                    Shubhankar Rana
                    <br />
                    <TypewriterEffect
                        words={[
                            { text: "Data Science & Management" },
                            { text: "MS IIT Ropar & IIM Amritsar" },
                            { text: "Forecasting Specialist" },
                            { text: "AI Engineer" },
                        ]}
                        className="text-3xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2"
                        cursorClassName="bg-primary h-8 sm:h-12 lg:h-16"
                    />
                </h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
                >
                    Benchmarking complex forecasting models (Informer, TFT, Mamba) and building AI-driven solutions.
                    Proven track record in financial analytics, operational optimization, and hybrid ARIMA+LSTM architectures.
                </motion.p>

                {/* Tech Stack Signals */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-4 pt-4"
                >
                    {[
                        { icon: TrendingUp, text: "Financial Forecasting" },
                        { icon: Brain, text: "Generative AI & RAG" },
                        { icon: Cpu, text: "Operational Analytics" },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/30 border border-secondary-foreground/10 text-sm font-medium"
                        >
                            <item.icon className="w-4 h-4 text-primary" />
                            {item.text}
                        </div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                >
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={async () => {
                            try {
                                await fetch("https://dgydqwmkm7.execute-api.us-east-1.amazonaws.com/resume", { method: "POST" });
                            } catch (e) {
                                console.error("Tracking failed", e);
                            }
                        }}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                    >
                        Download Resume
                        <ArrowRight className="w-4 h-4" />
                    </a>
                    <button className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition-colors border border-secondary-foreground/10">
                        Contact Me
                    </button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex justify-center gap-6 pt-8"
                >
                    <a
                        href="https://www.linkedin.com/in/shubhankar-rana-a468661b4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-secondary/30 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                        href="https://github.com/sr442"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-secondary/30 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
