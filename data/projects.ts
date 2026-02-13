import { Brain, Database, BarChart3, TrendingUp, Lock } from "lucide-react";

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    metrics?: string;
    icon: any;
    link?: string;
    gradient: string;
}

export const projects: Project[] = [
    {
        id: "forecasting",
        title: "Hybrid ARIMA-LSTM Forecasting",
        description: "Developed hybrid ARIMA+LSTM models for financial time-series, achieving lowest RMSE (0.65) and highest R² (0.96). Benchmarked against Informer, TFT, and Mamba models.",
        tags: ["Python", "PyTorch", "ARIMA", "LSTM", "Financial Analytics"],
        metrics: "RMSE: 0.65 | R²: 0.96",
        icon: TrendingUp,
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        id: "rag-chatbot",
        title: "AI Career Coach Chatbot",
        description: "RAG-powered conversational agent using Groq API to guide students on AI learning paths. Analyzes user profiles to recommend certifications and roles.",
        tags: ["LLM", "RAG", "Groq API", "Streamlit", "Vector DB"],
        metrics: "Fast Inference (Groq)",
        icon: Brain,
        gradient: "from-violet-500 to-purple-500",
    },
    {
        id: "itsm-dashboard",
        title: "ITSM Analytics Dashboard",
        description: "Analyzed incident datasets to identify SLA issues and bottlenecks. Deployed Power BI dashboards with SQL models for real-time tracking of MTTR and service health.",
        tags: ["Power BI", "SQL", "Excel", "Data Modeling", "Business Intelligence"],
        metrics: "Incident Trend Analysis",
        icon: BarChart3,
        gradient: "from-emerald-500 to-green-500",
    },
    {
        id: "kms-optimization",
        title: "KMS Performance Optimization",
        description: "Assessed Knowledge Management System (KMS) cases at IIT Ropar to identify duplication search gaps. Designed upgrade plan using SharePoint and Confluence.",
        tags: ["SharePoint", "Confluence", "Workflow Mapping", "Governance"],
        metrics: "Enhanced Search Accuracy",
        icon: Lock,
        gradient: "from-orange-500 to-red-500",
    },
];
