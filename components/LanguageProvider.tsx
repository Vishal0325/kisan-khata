"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Language } from "@/lib/translations";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Read from localStorage on mount
        const savedLanguage = localStorage.getItem("language") as Language | null;
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
            setLanguageState(savedLanguage);
        }
        setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    // Always provide context, but render nothing until mounted to prevent hydration mismatch
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {mounted ? children : null}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
