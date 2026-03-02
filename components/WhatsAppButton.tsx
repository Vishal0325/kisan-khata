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

    // normalize phone number: remove all non-digits, prefix 91 if missing
    let phoneParam = "";
    if (phone) {
        let digits = phone.replace(/\D/g, "");
        if (!digits.startsWith("91")) {
            // avoid adding if already international
            digits = "91" + digits;
        }
        phoneParam = digits;
    }

    // build URL using api.whatsapp.com/send
    let href = "https://api.whatsapp.com/send?";
    if (phoneParam) {
        href += `phone=${phoneParam}&`;
    }
    href += `text=${encoded}`;

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
