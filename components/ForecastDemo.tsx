"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from "recharts";
import { generateForecastData } from "@/data/forecast";
import { TrendingUp, Sliders } from "lucide-react";

export default function ForecastDemo() {
    const [horizon, setHorizon] = useState(14); // Default 14 days forecast

    // Memoize data generation to avoid flickering
    const fullData = useMemo(() => generateForecastData(30), []);

    // Filter data based on selected horizon
    // We keep all history (index < 60) and limit forecast (index >= 60)
    const chartData = useMemo(() => {
        return fullData.filter((d, i) => i < 60 + horizon);
    }, [fullData, horizon]);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 mb-4"
                    >
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">Interactive Demo</span>
                    </motion.div>

                    <h2 className="text-3xl font-bold mb-4">Hybrid ARIMA-LSTM Forecast</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Interact with the model to see how it performs across different horizons.
                        This demonstrates the capability to handle long-term dependencies.
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6 p-6 rounded-xl bg-secondary/20 border border-secondary">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Sliders className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold">Controls</h3>
                            </div>

                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">
                                    Forecast Horizon ({horizon} days)
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    value={horizon}
                                    onChange={(e) => setHorizon(parseInt(e.target.value))}
                                    className="w-full accent-primary"
                                />
                            </div>

                            <div className="pt-4 border-t border-secondary-foreground/10">
                                <div className="text-sm space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Model</span>
                                        <span className="font-mono">ARIMA-LSTM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Latency</span>
                                        <span className="font-mono text-green-500">45ms</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Accuracy</span>
                                        <span className="font-mono text-blue-500">94.2%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="lg:col-span-3 h-[400px] p-4 rounded-xl bg-secondary/5 border border-secondary">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="timestamp"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickFormatter={(val) => val.slice(5)}
                                    minTickGap={30}
                                />
                                <YAxis stroke="#94a3b8" fontSize={12} domain={['auto', 'auto']} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}
                                    itemStyle={{ color: '#e2e8f0' }}
                                />

                                {/* Historical Data */}
                                <Line
                                    type="monotone"
                                    dataKey="actual"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={false}
                                    name="Historical"
                                />

                                {/* Forecast Data */}
                                <Line
                                    type="monotone"
                                    dataKey="forecast"
                                    stroke="#8b5cf6"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={false}
                                    name="Forecast"
                                    connectNulls
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}
