"use client";

import Link from "next/link";
import { Users, Store } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/translations";

export function HeroSection() {
    const { language } = useLanguage();

    return (
        <section className="mb-8">
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <h1 className="mb-1 text-3xl font-extrabold text-emerald-800">
                    {t("app.hero.title", language)}
                </h1>
                <p className="text-sm text-emerald-700/80">
                    {t("app.hero.subtitle", language)}
                </p>
            </div>
        </section>
    );
}

export function ActionCards() {
    const { language } = useLanguage();

    return (
        <section className="mb-8">
            <div className="grid gap-4 sm:grid-cols-2">
                <Link
                    href="/farmers"
                    className="flex flex-col justify-between rounded-xl border-2 border-emerald-200 bg-emerald-600 px-6 py-8 text-white shadow-lg transition-transform hover:-translate-y-1"
                >
                    <div>
                        <Users className="mb-3 h-10 w-10" />
                        <h3 className="text-lg font-semibold">
                            {t("dashboard.farmers", language)}
                        </h3>
                        <p className="mt-2 opacity-90">
                            {t("dashboard.farmersDesc", language)}
                        </p>
                    </div>
                    <div className="mt-4 text-sm opacity-90">→ Open</div>
                </Link>

                <Link
                    href="/vendors"
                    className="flex flex-col justify-between rounded-xl border-2 border-indigo-200 bg-indigo-600 px-6 py-8 text-white shadow-lg transition-transform hover:-translate-y-1"
                >
                    <div>
                        <Store className="mb-3 h-10 w-10" />
                        <h3 className="text-lg font-semibold">
                            {t("dashboard.vendors", language)}
                        </h3>
                        <p className="mt-2 opacity-90">
                            {t("dashboard.vendorsDesc", language)}
                        </p>
                    </div>
                    <div className="mt-4 text-sm opacity-90">→ Open</div>
                </Link>
            </div>
        </section>
    );
}
