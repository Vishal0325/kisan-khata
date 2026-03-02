"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        // Check if service workers are supported
        if (!("serviceWorker" in navigator)) {
            console.log("Service Workers not supported in this browser");
            return;
        }

        // Register service worker with improved error handling
        const registerServiceWorker = async () => {
            try {
                console.log("Attempting to register Service Worker from /sw.js");
                const registration = await navigator.serviceWorker.register("/sw.js", {
                    scope: "/",
                });
                console.log("✅ Service Worker registered successfully:", registration);
                console.log("Service Worker scope:", registration.scope);
                console.log("Active:", registration.active);
                console.log("Installing:", registration.installing);
                console.log("Waiting:", registration.waiting);
            } catch (error) {
                console.error("❌ Service Worker registration failed:", error);
                if (error instanceof Error) {
                    console.error("Error details:", error.message);
                    console.error("Error stack:", error.stack);
                }
            }
        };

        // Wait for the page to be fully loaded before registering
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", registerServiceWorker);
        } else {
            registerServiceWorker();
        }

        // Cleanup listener
        return () => {
            document.removeEventListener("DOMContentLoaded", registerServiceWorker);
        };
    }, []);

    return null;
}
