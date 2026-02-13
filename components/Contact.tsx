"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, Loader2 } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("https://dgydqwmkm7.execute-api.us-east-1.amazonaws.com/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
        }
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5 border-t border-secondary-foreground/5">
            <div className="max-w-xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
                <p className="text-muted-foreground">
                    Interested in discussing time series research, AI agents, or potential collaborations?
                    Drop me a message.
                </p>
            </div>

            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-secondary-foreground/10 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-secondary-foreground/10 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                        <textarea
                            id="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-secondary-foreground/10 focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                            placeholder="How can we work together?"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading" || status === "success"}
                        className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {status === "loading" ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : status === "success" ? (
                            "Message Sent!"
                        ) : (
                            <>
                                Send Message
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-12 flex justify-center gap-6">
                    <a href="#" className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
