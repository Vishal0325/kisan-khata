"use client";

import { useEffect } from "react";

export function PWAMetaTags() {
    useEffect(() => {
        // Ensure manifest link exists
        let manifestLink = document.querySelector(
            'link[rel="manifest"]'
        ) as HTMLLinkElement | null;
        if (!manifestLink) {
            manifestLink = document.createElement("link") as HTMLLinkElement;
            manifestLink.rel = "manifest";
            manifestLink.href = "/manifest.json";
            document.head.appendChild(manifestLink);
        }

        // Ensure theme-color meta tag exists
        let themeColorMeta = document.querySelector(
            'meta[name="theme-color"]'
        ) as HTMLMetaElement | null;
        if (!themeColorMeta) {
            themeColorMeta = document.createElement("meta") as HTMLMetaElement;
            themeColorMeta.name = "theme-color";
            themeColorMeta.content = "#059669";
            document.head.appendChild(themeColorMeta);
        }

        // Ensure apple-mobile-web-app-capable exists
        let appleMobileCapable = document.querySelector(
            'meta[name="apple-mobile-web-app-capable"]'
        ) as HTMLMetaElement | null;
        if (!appleMobileCapable) {
            appleMobileCapable = document.createElement("meta") as HTMLMetaElement;
            appleMobileCapable.name = "apple-mobile-web-app-capable";
            appleMobileCapable.content = "yes";
            document.head.appendChild(appleMobileCapable);
        }

        // Ensure apple-mobile-web-app-status-bar-style exists
        let appleStatusBar = document.querySelector(
            'meta[name="apple-mobile-web-app-status-bar-style"]'
        ) as HTMLMetaElement | null;
        if (!appleStatusBar) {
            appleStatusBar = document.createElement("meta") as HTMLMetaElement;
            appleStatusBar.name = "apple-mobile-web-app-status-bar-style";
            appleStatusBar.content = "black-translucent";
            document.head.appendChild(appleStatusBar);
        }

        // Ensure apple-mobile-web-app-title exists
        let appleTitle = document.querySelector(
            'meta[name="apple-mobile-web-app-title"]'
        ) as HTMLMetaElement | null;
        if (!appleTitle) {
            appleTitle = document.createElement("meta") as HTMLMetaElement;
            appleTitle.name = "apple-mobile-web-app-title";
            appleTitle.content = "KisanKhata";
            document.head.appendChild(appleTitle);
        }
    }, []);

    return null;
}
