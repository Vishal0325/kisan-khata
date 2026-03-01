"use client";

import { useLanguage } from "./LanguageProvider";
import { Languages } from "lucide-react";
import { t } from "@/lib/translations";
import { useState } from "react";

export function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100 active:scale-95"
                title={t("language.select", language)}
                aria-label="Change language"
            >
                <Languages className="h-4 w-4" />
                {language === "hi" ? "हिन्दी" : "EN"}
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 rounded-lg border border-emerald-200 bg-white shadow-lg">
                    <button
                        onClick={() => {
                            setLanguage("en");
                            setIsOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm font-medium transition-colors ${language === "en"
                                ? "bg-emerald-100 text-emerald-700"
                                : "text-emerald-600 hover:bg-emerald-50"
                            }`}
                    >
                        🇬🇧 English
                    </button>
                    <button
                        onClick={() => {
                            setLanguage("hi");
                            setIsOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm font-medium transition-colors ${language === "hi"
                                ? "bg-emerald-100 text-emerald-700"
                                : "text-emerald-600 hover:bg-emerald-50"
                            }`}
                    >
                        🇮🇳 हिन्दी
                    </button>
                </div>
            )}
        </div>
    );
}
