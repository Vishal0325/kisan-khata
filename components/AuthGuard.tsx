"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // if not logged in and not already on /login, redirect
        if (!user && pathname !== "/login") {
            router.push("/login");
        }
        // if logged in and on login page, go home
        if (user && pathname === "/login") {
            router.push("/");
        }
    }, [user, pathname, router]);

    // when user is null and path is not /login we could render nothing while redirect happens
    if (!user && pathname !== "/login") {
        return null;
    }

    return <>{children}</>;
}
