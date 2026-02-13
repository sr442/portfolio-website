"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
    useEffect(() => {
        const trackVisit = async () => {
            try {
                // Basic visitor tracking
                await fetch("https://dgydqwmkm7.execute-api.us-east-1.amazonaws.com/visitor", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        page: window.location.pathname,
                        referrer: document.referrer,
                        // Country/Device usually handled by headers/Lambda logic usage
                    }),
                });
            } catch (err) {
                // Silently fail for analytics
                console.error("Analytics error", err);
            }
        };

        trackVisit();
    }, []);

    return null;
}
