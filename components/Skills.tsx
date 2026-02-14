"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Database, BarChart, Server, Brain, Terminal } from "lucide-react";

const skillCategories = [
    {
        title: "Programming Languages",
        icon: Code,
        skills: ["Python", "C++", "C", "SQL", "JavaScript", "HTML/CSS"],
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "AI & Machine Learning",
        icon: Brain,
        skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "Keras", "LLMs (RAG)", "Time Series (ARIMA, LSTM)"],
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        title: "Data Analysis & Viz",
        icon: BarChart,
        skills: ["Pandas", "Matplotlib", "Seaborn", "Power BI", "Tableau", "Excel (Advanced)"],
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        title: "Databases & Cloud",
        icon: Database,
        skills: ["SQL", "PostgreSQL", "PL-SQL", "AWS (Lambda, S3)", "Vector DBs"],
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
];

export default function Skills() {
    const [activeTab, setActiveTab] = React.useState(skillCategories[0].title);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-secondary/5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl font-bold mb-4">Technical Expertise</h2>
                <p className="text-muted-foreground">Tools and technologies I use to build data-driven solutions.</p>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {skillCategories.map((category) => (
                    <button
                        key={category.title}
                        onClick={() => setActiveTab(category.title)}
                        className={`relative px-6 py-3 rounded-full text-sm font-medium transition-colors ${activeTab === category.title
                            ? "text-primary-foreground bg-primary"
                            : "text-muted-foreground hover:bg-secondary"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <category.icon className="w-4 h-4" />
                            {category.title}
                        </div>
                        {activeTab === category.title && (
                            <motion.div
                                layoutId="active-skill-tab"
                                className="absolute inset-0 rounded-full border-2 border-primary"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto min-h-[300px]">
                <AnimatePresence mode="wait">
                    {skillCategories.map((category) => (
                        category.title === activeTab && (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                <div className={`p-8 rounded-3xl ${category.bg} border border-border/50 h-full flex flex-col items-center justify-center text-center`}>
                                    <div className={`p-4 rounded-2xl bg-background ${category.color} mb-6 shadow-lg`}>
                                        <category.icon className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                                    <p className="text-muted-foreground">
                                        Specialized tools and frameworks for {category.title.toLowerCase()}.
                                    </p>
                                </div>

                                <div className="p-8 rounded-3xl bg-background border border-border/50 h-full flex items-center">
                                    <div className="flex flex-wrap gap-3">
                                        {category.skills.map((skill, idx) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium cursor-default transition-colors"
                                            >
                                                {skill}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
