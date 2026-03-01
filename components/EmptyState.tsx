"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/translations";

interface EmptyStateProps {
    filter: string;
}

export function EmptyState({ filter }: EmptyStateProps) {
    const { language } = useLanguage();

    const getMessage = () => {
        if (filter === "pending") return t("farmers.emptyPending", language);
        if (filter === "collection") return t("farmers.emptyCollection", language);
        return t("farmers.empty", language);
    };

    return (
        <p className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-10 text-center text-emerald-700">
            {getMessage()}
        </p>
    );
}
