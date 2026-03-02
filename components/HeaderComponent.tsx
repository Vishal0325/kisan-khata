"use client";

import { Users } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { t } from "@/lib/translations";

export function HeaderComponent() {
    const { language } = useLanguage();

    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

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
                    <div className="flex items-center gap-4">
                        <LanguageSelector />
                        {user && (
                            <>
                                <a href="/users" className="text-sm text-emerald-600 hover:underline">
                                    Staff
                                </a>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-700">{user.name}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
