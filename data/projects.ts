import { Brain, Database, BarChart3, TrendingUp, Lock } from "lucide-react";

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    metrics?: string;
    icon: any;
    link?: string;
    color: string;
}

export const projects: Project[] = [
    {
        id: "forecasting",
        title: "Hybrid ARIMA-LSTM Forecasting",
        description: "Advanced time series forecasting system combining statistical methods (ARIMA) with deep learning (LSTM) to capture both linear and non-linear patterns. Outperformed classical baselines by 15% in MAPE.",
        tags: ["Python", "PyTorch", "ARIMA", "LSTM", "Time Series"],
        metrics: "15% MAPE Improvement",
        icon: TrendingUp,
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: "rag-chatbot",
        title: "AI Career Coach Chatbot",
        description: "RAG-powered conversational agent assisting students with career advice. Built using Groq for fast inference and vector database for context retrieval. Currently powering this website's assistant.",
        tags: ["LLM", "RAG", "Groq", "Vector DB", "Next.js"],
        metrics: "Sub-100ms Latency",
        icon: Brain,
        color: "from-violet-500 to-purple-500",
    },
    {
        id: "itsm-dashboard",
        title: "ITSM Analytics Dashboard",
        description: "Comprehensive analytics platform for IT Service Management. Visualized ticket trends, SLA compliance, and agent performance using Power BI and SQL, driving operation efficiency.",
        tags: ["Power BI", "SQL", "Data Modeling", "Business Intelligence"],
        metrics: "20% OpEx Reduction",
        icon: BarChart3,
        color: "from-emerald-500 to-green-500",
    },
    {
        id: "kms-optimization",
        title: "KMS Performance Optimization",
        description: "Optimized Key Management System (KMS) for high-throughput cryptographic operations. Reduced latency and improved security posture through architectural refinements.",
        tags: ["Security", "Cryptography", "System Design", "Performance"],
        metrics: "40% Latency Drop",
        icon: Lock,
        color: "from-orange-500 to-red-500",
    },
];
