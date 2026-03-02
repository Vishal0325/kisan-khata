"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import type { User as DbUser } from "@/lib/queries";

export type User = DbUser; // reuse database-generated type

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("kk_user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem("kk_user");
            }
        }
        setMounted(true);
    }, []);

    const login = (u: User) => {
        setUser(u);
        localStorage.setItem("kk_user", JSON.stringify(u));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("kk_user");
    };

    // don't render children until we've synced with storage
    if (!mounted) return null;

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
