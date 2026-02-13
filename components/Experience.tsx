"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

const experience = [
    {
        id: "bharatgen",
        title: "BharatGen Research Intern",
        company: "BharatGen",
        period: "May '25 - Jul '25",
        description: "Benchmarked complex multi-horizon forecasting models (Informer, TFT, LSTM, Mamba) on financial data. Built hybrid ARIMA+LSTM models achieving RMSE 0.65 and R² 0.96. Developed end-to-end data ingestion pipelines.",
        icon: Briefcase,
        type: "work",
    },
    {
        id: "placement-committee",
        title: "Placement Committee Member",
        company: "IIM Amritsar & IIT Ropar",
        period: "2024 - Present",
        description: "Spearheaded recruiter discussions for internship roles. Coordinated logistics and communication, leading to a 20% rise in engagement. Researched industry trends to align placement strategies.",
        icon: Briefcase,
        type: "leadership",
    },
    {
        id: "ms-dsm",
        title: "MS in Data Science & Management",
        company: "IIT Ropar & IIM Amritsar",
        period: "Present",
        description: "CGPA: 8.80. coursework in Financial Markets (Yale), Data Processing, and Statistical Learning.",
        icon: GraduationCap,
        type: "education",
    },
    {
        id: "bsc",
        title: "B.Sc (Post Graduate Govt College)",
        company: "Panjab University",
        period: "2023",
        description: "Grade: 72.10%. Foundation in Mathematics and Computing.",
        icon: GraduationCap,
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
