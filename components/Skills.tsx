"use client";

import { motion } from "framer-motion";
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
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-secondary/5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl font-bold mb-4">Technical Expertise</h2>
                <p className="text-muted-foreground">Tools and technologies I use to build data-driven solutions.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors group"
                    >
                        <div className={`w-12 h-12 rounded-xl ${category.bg} ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <category.icon className="w-6 h-6" />
                        </div>

                        <h3 className="text-lg font-bold mb-4 group-hover:text-primary transition-colors">{category.title}</h3>

                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
