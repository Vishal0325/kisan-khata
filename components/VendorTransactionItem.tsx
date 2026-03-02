"use client";

import { useState, useActionState } from "react";
import { ShoppingCart, DollarSign, Pencil, Trash2, X, Check } from "lucide-react";
import {
    updateVendorTransactionAction,
    deleteVendorTransactionAction,
} from "@/lib/actions";

interface VendorTransaction {
    id: string;
    vendor_id: string;
    type: "PURCHASE" | "PAYMENT";
    amount: number;
    note: string | null;
    date: string;
    created_by?: { name: string } | null;
}

export function VendorTransactionItem({
    transaction,
    vendorId,
}: {
    transaction: VendorTransaction;
    vendorId: string;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [editState, editFormAction] = useActionState(
        updateVendorTransactionAction.bind(null, transaction.id, vendorId),
        null
    );

    // Edit Modal UI
    if (isEditing) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsEditing(false)} />
                <form
                    action={async (formData) => {
                        await editFormAction(formData);
                        setIsEditing(false);
                    }}
                    className="z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-emerald-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-emerald-900">हिसाब सुधारें</h3>
                        <button type="button" onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {editState?.error && (
                        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">{editState.error}</p>
                    )}

                    <div className="space-y-4">
                        {/* सबसे ज़रूरी: यह टाइप को सर्वर पर भेजेगा */}
                        <input type="hidden" name="type" value={transaction.type} />

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-emerald-800">लेन-देन का प्रकार</label>
                            <div className={`rounded-xl border px-4 py-3 font-bold flex items-center gap-2 ${transaction.type === 'PURCHASE' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                                {transaction.type === "PURCHASE" ? <ShoppingCart className="h-5 w-5" /> : <DollarSign className="h-5 w-5" />}
                                {transaction.type === "PURCHASE" ? "खरीद (Purchase)" : "पेमेंट (Payment)"}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="amount" className="mb-1 block text-sm font-semibold text-emerald-800">रकम (₹)</label>
                            <input id="amount" name="amount" type="number" min="0.01" step="0.01" required defaultValue={transaction.amount} className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-semibold" autoFocus />
                        </div>

                        <div>
                            <label htmlFor="date" className="mb-1 block text-sm font-semibold text-emerald-800">तारीख</label>
                            <input id="date" name="date" type="date" defaultValue={transaction.date.slice(0, 10)} className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-emerald-900" />
                        </div>

                        <div>
                            <label htmlFor="note" className="mb-1 block text-sm font-semibold text-emerald-800">विवरण (Note)</label>
                            <input id="note" name="note" type="text" defaultValue={transaction.note ?? ""} className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-emerald-900" placeholder="विवरण लिखें..." />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button type="button" onClick={() => setIsEditing(false)} className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-all">रद्द करें</button>
                            <button type="submit" className="flex-1 rounded-xl bg-emerald-600 py-3 font-bold text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2">
                                <Check className="h-5 w-5" /> सेव करें
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        );
    }

    // Delete Confirmation UI
    if (showDeleteConfirm) {
        return (
            <div className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-4 shadow-sm animate-in fade-in zoom-in duration-200">
                <p className="text-center font-bold text-red-900">क्या आप वाकई इस हिसाब को हटाना चाहते हैं?</p>
                <div className="mt-4 flex gap-3">
                    <form action={deleteVendorTransactionAction} className="flex-1">
                        <input type="hidden" name="transaction_id" value={transaction.id} />
                        <input type="hidden" name="vendor_id" value={vendorId} />
                        <button type="submit" className="w-full rounded-lg bg-red-600 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors">हाँ, हटा दें</button>
                    </form>
                    <button type="button" onClick={() => setShowDeleteConfirm(false)} className="flex-1 rounded-lg border border-red-300 bg-white py-2.5 text-sm font-bold text-red-700 hover:bg-red-50">नहीं, रुकें</button>
                </div>
            </div>
        );
    }

    // List Item UI
    return (
        <div className={`flex items-center justify-between rounded-xl border px-4 py-4 transition-all hover:shadow-md ${transaction.type === "PURCHASE" ? "border-red-100 bg-red-50/30" : "border-emerald-100 bg-emerald-50/30"}`}>
            <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className={`rounded-full p-2.5 ${transaction.type === "PURCHASE" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}>
                    {transaction.type === "PURCHASE" ? <ShoppingCart className="h-5 w-5" /> : <DollarSign className="h-5 w-5" />}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="font-bold text-emerald-900">{transaction.type === "PURCHASE" ? "खरीद (Purchase)" : "पेमेंट (Payment)"}</p>
                    <p className="text-sm text-emerald-700/70">{new Date(transaction.date).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })} {transaction.note && `• ${transaction.note}`}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <p className={`text-lg font-black ${transaction.type === "PURCHASE" ? "text-red-700" : "text-emerald-700"}`}>
                    {transaction.type === "PURCHASE" ? "+" : "-"} ₹{transaction.amount.toLocaleString("en-IN")}
                </p>
                <div className="flex items-center bg-white rounded-lg border border-gray-100 p-1 shadow-sm">
                    <button type="button" onClick={() => setIsEditing(true)} className="rounded-md p-1.5 text-emerald-600 hover:bg-emerald-50 transition-colors" title="Edit"><Pencil className="h-4 w-4" /></button>
                    <div className="w-px h-4 bg-gray-100 mx-1" />
                    <button type="button" onClick={() => setShowDeleteConfirm(true)} className="rounded-md p-1.5 text-red-500 hover:bg-red-50 transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
                </div>
            </div>
        </div>
    );
}