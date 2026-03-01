"use client";

import { Users } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/translations";

export function HeaderComponent() {
    const { language } = useLanguage();

    return (
        <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
            <div className="mx-auto max-w-2xl px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Users className="h-8 w-8 text-emerald-700" />
                        <div>
                            <h1 className="text-2xl font-bold text-emerald-800">
                                {t("app.title", language)}
                            </h1>
                            <p className="text-sm text-emerald-700/80">
                                {t("app.subtitle", language)}
                            </p>
                        </div>
                    </div>
                    <LanguageSelector />
                </div>
            </div>
        </header>
    );
}
