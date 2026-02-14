"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { Spotlight } from "./ui/spotlight";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <Spotlight
            className="group relative h-full flex flex-col p-6 hover:bg-secondary/20 transition-colors"
        >
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

            <div className="relative z-10 space-y-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-lg bg-secondary/50 text-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors`}>
                        <project.icon className="w-6 h-6" />
                    </div>
                    {project.metrics && (
                        <div className={`text-xs font-bold px-2 py-1 rounded-full bg-secondary text-primary border border-primary/20`}>
                            {project.metrics}
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        {project.title}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground border border-secondary-foreground/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Spotlight>
    );
}
