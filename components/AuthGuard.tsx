"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // don't run while already on the login page with no user
        if (!user) {
            if (pathname !== "/login") {
                router.push("/login");
            }
            return;
        }
        // user is present
        if (pathname === "/login") {
            router.push("/");
        }
    }, [user, pathname]);

    // when user is null and path is not /login we could render nothing while redirect happens
    if (!user && pathname !== "/login") {
        return null;
    }

    return <>{children}</>;
}
