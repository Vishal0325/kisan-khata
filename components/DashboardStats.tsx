"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSummaryStats } from "@/lib/queries";
import { SummaryCard } from "@/components/SummaryCard";
import { AlertCircle, TrendingDown, TrendingUp } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/translations";

function formatAmount(amount: number) {
    return `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
}

/**
 * Client component that displays three summary cards:
 * - Total Pending (udhaar - collected if positive) in red
 * - Total Collected in emerald
 * - Net Balance (collected - udhaar) in blue
 */
export default function DashboardStats() {
    const { language } = useLanguage();
    const [stats, setStats] = useState({ totalUdhaar: 0, totalCollected: 0, pending: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        async function loadStats() {
            try {
                const response = await fetch("/api/summary-stats");
                const data = await response.json();
                setStats(data);
            } catch {
                setStats({ totalUdhaar: 0, totalCollected: 0, pending: 0 });
            }
        }
        loadStats();
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="mb-8 h-40 rounded-xl bg-emerald-100/30" />;
    }

    const { totalUdhaar, totalCollected } = stats;
    const pending = Math.max(0, totalUdhaar - totalCollected);
    const net = totalCollected - totalUdhaar;

    return (
        <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-emerald-900">
                {t("dashboard.summary", language)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
                <Link href="/farmers?filter=pending" className="transition-transform hover:scale-105 active:scale-95">
                    <SummaryCard
                        title={t("dashboard.totalPending", language)}
                        value={formatAmount(pending)}
                        variant="pending"
                        icon={<AlertCircle className="h-8 w-8 text-red-700" />}
                    />
                </Link>
                <Link href="/farmers?filter=collection" className="transition-transform hover:scale-105 active:scale-95">
                    <SummaryCard
                        title={t("dashboard.totalCollected", language)}
                        value={formatAmount(totalCollected)}
                        variant="collected"
                        icon={<TrendingDown className="h-8 w-8 text-emerald-700" />}
                    />
                </Link>
                <SummaryCard
                    title={t("dashboard.netBalance", language)}
                    value={formatAmount(net)}
                    variant="net"
                    icon={<TrendingUp className="h-8 w-8 text-blue-700" />}
                />
            </div>
        </section>
    );
}
