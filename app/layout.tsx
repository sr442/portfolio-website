import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ChatInterface from "@/components/ChatInterface";
import VisitorTracker from "@/components/VisitorTracker";

import ScrollProgress from "@/components/ScrollProgress";
import { Toaster } from "@/components/ui/sonner";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shubhankar Rana | AI & Data Science Portfolio",
  description: "Portfolio of Shubhankar Rana, an AI/ML Engineer specializing in Time Series Forecasting and GenAI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={clsx(inter.className, "bg-background text-foreground antialiased")}>
        <ScrollProgress />
        <VisitorTracker />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
