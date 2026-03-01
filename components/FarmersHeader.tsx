"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/translations";

interface FarmersHeaderProps {
    filter: string;
}

export function FarmersHeader({ filter }: FarmersHeaderProps) {
    const { language } = useLanguage();

    const getHeading = () => {
        if (filter === "pending") return t("farmers.titlePending", language);
        if (filter === "collection") return t("farmers.titleCollection", language);
        return t("farmers.title", language);
    };

    const getSubtitle = () => {
        if (filter === "pending") return t("farmers.subtitlePending", language);
        if (filter === "collection") return t("farmers.subtitleCollection", language);
        return t("farmers.subtitle", language);
    };

    return (
        <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
            <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4">
                <Link
                    href="/"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-emerald-600 transition-colors hover:bg-emerald-100 hover:text-emerald-800"
                    aria-label={t("header.backToHome", language)}
                >
                    ←
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-emerald-800">{getHeading()}</h1>
                    <p className="text-sm text-emerald-700/80">{getSubtitle()}</p>
                </div>
                {filter && (
                    <Link
                        href="/farmers"
                        className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
                    >
                        <X className="h-4 w-4" />
                        {t("farmers.clearFilter", language)}
                    </Link>
                )}
            </div>
        </header>
    );
}
