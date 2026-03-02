"use client";

import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useAuth } from "./AuthProvider";
import { Download } from "lucide-react";

interface Transaction {
    date: string;
    note?: string | null;
    amount: number;
    type: string;
}

interface DownloadBillButtonProps {
    person: { name: string; phone?: string | null };
    transactions: Transaction[];
}

export function DownloadBillButton({ person, transactions }: DownloadBillButtonProps) {
    const { user } = useAuth();
    const staffName = user?.name || "";

    const handleDownload = () => {
        const doc = new jsPDF({ unit: "pt" });
        doc.setFontSize(16);
        doc.text("Kisan Khata - Digital Receipt", 40, 40);

        doc.setFontSize(12);
        const now = new Date();
        doc.text(`Date: ${now.toLocaleDateString("en-IN")}`, 40, 60);
        doc.text(`Name: ${person.name}`, 40, 80);
        doc.text(`Phone: ${person.phone || "N/A"}`, 40, 100);

        // prepare table data with running balance
        let balance = 0;
        const body = transactions.map((t) => {
            let credit = 0;
            let debit = 0;
            const type = t.type.toUpperCase();
            if (type === "CREDIT" || type === "PAYMENT") {
                credit = t.amount;
                balance += credit;
            } else {
                debit = t.amount;
                balance -= debit;
            }
            const rowBalance = balance;
            return [
                new Date(t.date).toLocaleDateString("en-IN"),
                t.note || "",
                credit ? credit.toLocaleString("en-IN") : "",
                debit ? debit.toLocaleString("en-IN") : "",
                rowBalance.toLocaleString("en-IN"),
            ];
        });

        autoTable(doc, {
            startY: 120,
            head: [["Date", "Description", "Credit (Jama)", "Debit (Udhaar)", "Balance"]],
            body,
            theme: "grid",
            styles: { fontSize: 10 },
        });

        const finalY = (doc as any).lastAutoTable.finalY || 120;
        doc.setFontSize(10);
        doc.text(`एंट्री करने वाले का नाम: ${staffName}`, 40, finalY + 20);
        doc.text("धन्यवाद!", 40, finalY + 40);

        const fileName = `${person.name.replace(/\s+/g, "_")}_Bill.pdf`;
        doc.save(fileName);
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
            <Download className="h-4 w-4" />
            Download Bill
        </button>
    );
}
