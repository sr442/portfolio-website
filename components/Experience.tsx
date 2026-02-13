"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

const experience = [
    {
        id: "internship",
        title: "AI Research Intern",
        company: "Tech Corp (Simulated)",
        period: "May 2025 - Present",
        description: "Developed RAG-powered career chatbot and optimized hybrid ARIMA-LSTM models for time series forecasting. Achieved 15% MAPE improvement over baselines.",
        type: "work",
    },
    {
        id: "placement",
        title: "Placement Committee Member",
        company: "University Name",
        period: "2024 - Present",
        description: "Managed recruiter relations and analyzing placement data. Built internal dashboards to track student performance and hiring trends.",
        type: "leadership",
    },
    {
        id: "student",
        title: "B.Tech in Computer Science",
        company: "University Name",
        period: "2022 - 2026",
        description: "Specializing in AI/ML. Coursework: Deep Learning, Time Series Analysis, Cloud Computing.",
        type: "education",
    },
];

export default function Experience() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl font-bold mb-4">Experience & Education</h2>
                <p className="text-muted-foreground">My professional journey and academic background.</p>
            </motion.div>

            <div className="space-y-12">
                {experience.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex gap-4 sm:gap-8"
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-secondary-foreground/10 shrink-0 z-10">
                                {item.type === "education" ? (
                                    <GraduationCap className="w-5 h-5 text-primary" />
                                ) : (
                                    <Briefcase className="w-5 h-5 text-primary" />
                                )}
                            </div>
                            {index !== experience.length - 1 && (
                                <div className="w-0.5 flex-1 bg-gradient-to-b from-secondary to-transparent my-2" />
                            )}
                        </div>

                        <div className="pb-12">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                <span className="hidden sm:block text-muted-foreground">•</span>
                                <span className="text-primary font-medium">{item.company}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <Calendar className="w-4 h-4" />
                                {item.period}
                            </div>

                            <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
