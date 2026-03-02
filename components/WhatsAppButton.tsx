"use client";

import React from "react";
import { useAuth } from "./AuthProvider";

interface WhatsAppButtonProps {
    name: string;
    balance: number;
    phone?: string | null;
}

export function WhatsAppButton({ name, balance, phone }: WhatsAppButtonProps) {
    const { user } = useAuth();
    const sender = user?.name || "";

    // prepare message
    const rupee = `₹${balance.toLocaleString("en-IN")}`;
    const message = `नमस्ते ${name}, किसान खाता (Kisan Khata) में आपका कुल बैलेंस ${rupee} है। - ${sender}`;
    const encoded = encodeURIComponent(message);

    let href = "https://wa.me/";
    if (phone) {
        // strip non-digits; whatsapp requires international format without +
        const digits = phone.replace(/\D/g, "");
        href += digits;
    }
    href += `?text=${encoded}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-green-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-600 transition-colors"
        >
            {/* use plain text or icon */}
            WhatsApp
        </a>
    );
}
