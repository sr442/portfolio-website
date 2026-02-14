"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Code, Terminal, Send, User } from "lucide-react";

const navItems = [
    { name: "Home", icon: Home, href: "#hero" },
    { name: "Skills", icon: Code, href: "#skills" },
    { name: "Projects", icon: Briefcase, href: "#projects" },
    { name: "Experience", icon: User, href: "#experience" },
    { name: "Contact", icon: Send, href: "#contact" },
];

export default function Navbar() {
    const [activeTab, setActiveTab] = useState("Home");
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide navbar on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const scrollToSection = (href: string, name: string) => {
        setActiveTab(name);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-0 max-w-sm w-full"
                >
                    <div className="flex items-center justify-between bg-black/50 backdrop-blur-lg border border-white/10 rounded-full p-2 shadow-2xl">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.href, item.name)}
                                className={`relative p-3 rounded-full transition-colors ${activeTab === item.name
                                        ? "text-white"
                                        : "text-white/50 hover:text-white"
                                    }`}
                            >
                                {activeTab === item.name && (
                                    <motion.div
                                        layoutId="active-tab"
                                        className="absolute inset-0 bg-primary/20 rounded-full border border-primary/50"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon className="w-5 h-5 relative z-10" />
                                <span className="sr-only">{item.name}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
