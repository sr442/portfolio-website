export interface ForecastDataPoint {
    timestamp: string;
    actual: number | null;
    forecast: number | null;
    confidenceLower?: number | null;
    confidenceUpper?: number | null;
}

export const generateForecastData = (days: number = 30): ForecastDataPoint[] => {
    const data: ForecastDataPoint[] = [];
    const now = new Date();

    // Generate 60 days of history and 30 days of forecast
    for (let i = -60; i < days; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() + i);

        // Create a synthetic "complex" time series pattern
        // Combination of trend, seasonality, and noise
        const trend = i * 0.5;
        const seasonality = Math.sin(i / 7) * 10 + Math.cos(i / 3) * 5;
        const noise = Math.random() * 5;
        const value = 100 + trend + seasonality + noise;

        const isForecast = i >= 0;

        if (isForecast) {
            // Degrade forecast quality slightly over time to be realistic
            const forecastError = Math.random() * (i * 0.2);
            data.push({
                timestamp: date.toISOString().split('T')[0],
                actual: null,
                forecast: value + forecastError,
                confidenceLower: value + forecastError - (5 + i * 0.5),
                confidenceUpper: value + forecastError + (5 + i * 0.5),
            });
        } else {
            data.push({
                timestamp: date.toISOString().split('T')[0],
                actual: value,
                forecast: null,
            });
        }
    }

    return data;
};
