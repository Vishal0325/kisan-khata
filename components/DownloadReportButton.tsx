"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Download } from "lucide-react";

interface Transaction {
    id: string;
    farmer_id: string;
    type: "DEBIT" | "CREDIT";
    amount: number;
    note: string | null;
    date: string;
}

interface DownloadReportButtonProps {
    farmer: {
        id: string;
        name: string;
        village: string;
    };
    transactions: Transaction[];
}

export function DownloadReportButton({ farmer, transactions }: DownloadReportButtonProps) {
    const handleDownload = () => {
        const doc = new jsPDF({ unit: "pt" });
        const title = `${farmer.name} - Transaction Report`;
        doc.setFontSize(18);
        doc.text(title, 40, 40);
        doc.setFontSize(12);
        doc.text(`Village: ${farmer.village}`, 40, 60);

        if (transactions.length === 0) {
            doc.text("No transactions available.", 40, 80);
            doc.save(`${farmer.name}-report.pdf`);
            return;
        }

        const tableBody = transactions.map((t) => [
            new Date(t.date).toLocaleDateString("en-IN"),
            t.note || "",
            t.type === "CREDIT" ? "Udhaar" : "Vasuli",
            new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(t.amount),
        ]);

        const totalBalance = transactions.reduce((acc, t) => {
            return acc + (t.type === "CREDIT" ? t.amount : -t.amount);
        }, 0);

        autoTable(doc, {
            startY: 80,
            head: [["Date", "Note", "Type", "Amount"]],
            body: tableBody,
            foot: [["", "", "Total", new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(totalBalance)]],
            theme: "grid",
            styles: { fontSize: 10 },
        });

        doc.save(`${farmer.name}-report.pdf`);
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
            <Download className="h-4 w-4" />
            Download Report
        </button>
    );
}
