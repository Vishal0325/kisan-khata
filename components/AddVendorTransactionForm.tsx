"use client";

import { useActionState } from "react";
import { addVendorTransaction } from "@/lib/actions";

interface AddVendorTransactionFormProps {
    vendorId: string;
}

export function AddVendorTransactionForm({ vendorId }: AddVendorTransactionFormProps) {
    const [state, formAction] = useActionState(addVendorTransaction, null);
    const today = new Date().toISOString().slice(0, 10);

    return (
        <form
            action={formAction}
            className="rounded-xl border-2 border-emerald-200 bg-white p-5 shadow-sm"
        >
            <input type="hidden" name="vendor_id" value={vendorId} />

            <h3 className="mb-4 text-lg font-semibold text-emerald-900">Add Transaction</h3>

            {state?.error && (
                <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
            )}

            <div className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-emerald-800">Type</label>
                    <div className="flex gap-3">
                        <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-red-200 bg-red-50 py-3 font-medium text-red-900 has-[:checked]:border-red-500 has-[:checked]:bg-red-100 has-[:checked]:ring-2 has-[:checked]:ring-red-200">
                            <input type="radio" name="type" value="PURCHASE" defaultChecked className="sr-only" />
                            🔴 माल खरीदा (PURCHASE)
                        </label>
                        <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-emerald-200 bg-emerald-50 py-3 font-medium text-emerald-900 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-100 has-[:checked]:ring-2 has-[:checked]:ring-emerald-200">
                            <input type="radio" name="type" value="PAYMENT" className="sr-only" />
                            🟢 पैसा दिया (PAYMENT)
                        </label>
                    </div>
                </div>

                <div>
                    <label htmlFor="amount" className="mb-1 block text-sm font-medium text-emerald-800">Amount (₹) *</label>
                    <input id="amount" name="amount" type="number" min="0.01" step="0.01" required placeholder="0" className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900" />
                </div>

                <div>
                    <label htmlFor="date" className="mb-1 block text-sm font-medium text-emerald-800">Date</label>
                    <input id="date" name="date" type="date" defaultValue={today} className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900" />
                </div>

                <div>
                    <label htmlFor="note" className="mb-1 block text-sm font-medium text-emerald-800">Note (items / description)</label>
                    <input id="note" name="note" type="text" placeholder="e.g. 50 bags Urea" className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900" />
                </div>

                <button type="submit" className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700">Add</button>
            </div>
        </form>
    );
}
