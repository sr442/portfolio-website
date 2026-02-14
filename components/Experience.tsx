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

import { TracingBeam } from "./ui/tracing-beam";

export default function Experience() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl font-bold mb-4">Experience & Education</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    My professional journey across research, leadership, and academia.
                </p>
            </motion.div>

            <TracingBeam className="px-6">
                <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                    {experience.map((item, index) => (
                        <div key={item.id} className="mb-10 last:mb-0">
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`p-2 rounded-full bg-secondary text-primary border border-primary/20`}>
                                    <item.icon className="w-4 h-4" />
                                </span>
                                <h3 className="text-xl font-bold">{item.title}</h3>
                            </div>

                            <div className="pl-12 relative border-l border-secondary/30 ml-4">
                                <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary/20" />

                                <div className="mb-2">
                                    <span className="text-primary font-semibold">{item.company}</span>
                                    <span className="mx-2 text-muted-foreground">•</span>
                                    <span className="text-sm text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded-full">{item.period}</span>
                                </div>

                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </TracingBeam>
        </section>
    );
}
