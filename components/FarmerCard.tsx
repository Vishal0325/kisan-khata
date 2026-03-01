"use client";

import Link from "next/link";
import { FarmerAvatar } from "@/components/FarmerAvatar";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/translations";
import type { Database } from "@/lib/database.types";

type Farmer = Database["public"]["Tables"]["farmers"]["Row"];

interface FarmerCardProps {
    farmer: Farmer & { total_credit: number; total_debit: number; balance: number };
}

function formatAmount(amount: number) {
    return `₹${amount.toLocaleString("en-IN")}`;
}

export function FarmerCard({ farmer }: FarmerCardProps) {
    const { language } = useLanguage();

    return (
        <Link
            href={`/farmers/${farmer.id}`}
            className="flex items-center gap-4 rounded-xl border-2 border-emerald-200 bg-white p-4 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md active:scale-[0.99]"
        >
            <FarmerAvatar
                photoUrl={farmer.photo_url}
                name={farmer.name}
                size="md"
            />
            <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-emerald-900">{farmer.name}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0 text-sm text-emerald-700/80">
                    {farmer.village && <span>{farmer.village}</span>}
                    {farmer.phone && <span>{farmer.phone}</span>}
                </div>
                {farmer.aadhar_no && (
                    <p className="mt-0.5 text-xs text-emerald-600/80">
                        Aadhar: {farmer.aadhar_no}
                    </p>
                )}
            </div>
            <div className="ml-4 text-right">
                <p
                    className={`text-lg font-bold ${farmer.balance > 0 ? "text-amber-700" : "text-emerald-700"
                        }`}
                >
                    {formatAmount(farmer.balance)}
                </p>
                <p className="text-xs text-emerald-600">
                    {t("farmers.pending", language)}
                </p>
            </div>
            <span className="ml-2 text-emerald-400">→</span>
        </Link>
    );
}
