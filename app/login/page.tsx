"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authenticateUser, createUser } from "@/lib/queries";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [mobile, setMobile] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [signupMode, setSignupMode] = useState(false);
    const [name, setName] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const user = await authenticateUser(mobile.trim(), pin.trim());
        if (user) {
            login(user);
            router.push("/");
        } else {
            setError("Invalid mobile number or PIN.");
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (!name.trim()) {
                setError("Name is required");
                return;
            }
            if (!/^[0-9]{10,15}$/.test(mobile.trim())) {
                setError("Enter a valid mobile number");
                return;
            }
            if (!/^[0-9]{4}$/.test(pin.trim())) {
                setError("PIN must be 4 digits");
                return;
            }
            const newUser = await createUser(name.trim(), mobile.trim(), pin.trim());
            login(newUser);
            router.push("/");
        } catch (e: any) {
            setError(e.message || "Failed to create user");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-emerald-50/30 p-4">
            <div className="w-full max-w-md">
                <h1 className="mb-6 text-center text-2xl font-bold text-emerald-800">
                    {signupMode ? "Create Staff Account" : "Login"}
                </h1>
                {error && (
                    <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                        {error}
                    </p>
                )}
                <form onSubmit={signupMode ? handleSignup : handleLogin} className="space-y-4">
                    {signupMode && (
                        <div>
                            <label className="block text-sm font-medium text-emerald-800">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 w-full rounded-lg border border-emerald-200 px-4 py-2.5 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-emerald-800">
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                            className="mt-1 w-full rounded-lg border border-emerald-200 px-4 py-2.5 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-emerald-800">
                            4‑digit PIN
                        </label>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            required
                            maxLength={4}
                            className="mt-1 w-full rounded-lg border border-emerald-200 px-4 py-2.5 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
                    >
                        {signupMode ? "Create Account" : "Login"}
                    </button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <button
                        onClick={() => {
                            setError(null);
                            setSignupMode(!signupMode);
                        }}
                        className="text-emerald-600 hover:underline"
                    >
                        {signupMode ? "Already have an account? Log in" : "New staff? Create account"}
                    </button>
                </div>
            </div>
        </div>
    );
}
