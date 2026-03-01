"use client";

import { useState, useActionState } from "react";
import { Pencil, X, Check, Phone, User } from "lucide-react";
import { updateVendorAction } from "@/lib/actions";

interface VendorEditFormProps {
    vendorId: string;
    initialName: string;
    initialPhone?: string | null;
}

export function VendorEditForm({ vendorId, initialName, initialPhone }: VendorEditFormProps) {
    const [isEditing, setIsEditing] = useState(false);

    // updateVendorAction.bind का इस्तेमाल करें
    const [state, formAction, isPending] = useActionState(
        updateVendorAction.bind(null, vendorId),
        null
    );

    // अगर सेव सफल रहा, तो फॉर्म बंद करने के लिए useEffect का इस्तेमाल करें
    if (state?.success && isEditing) {
        setIsEditing(false);
        state.success = false; // रिसेट करें
    }

    if (!isEditing) {
        return (
            <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-xl border-2 border-emerald-200 bg-white px-5 py-2.5 text-sm font-bold text-emerald-700 shadow-sm transition-all hover:bg-emerald-50 hover:border-emerald-400"
            >
                <Pencil className="h-4 w-4" /> वेंडर प्रोफाइल बदलें
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditing(false)} />

            <form
                action={formAction}
                className="z-10 w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
                        <Pencil className="h-5 w-5 text-emerald-600" /> वेंडर जानकारी सुधारें
                    </h3>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {state?.error && (
                    <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200 flex items-center gap-2">
                        {state.error}
                    </div>
                )}

                <div className="space-y-5">
                    <div>
                        <label htmlFor="edit-name" className="mb-1.5 block text-sm font-bold text-emerald-800 flex items-center gap-2">
                            <User className="h-4 w-4" /> वेंडर का नाम *
                        </label>
                        <input
                            id="edit-name"
                            name="name"
                            type="text"
                            required
                            defaultValue={initialName}
                            className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 font-medium"
                        />
                    </div>

                    <div>
                        <label htmlFor="edit-phone" className="mb-1.5 block text-sm font-bold text-emerald-800 flex items-center gap-2">
                            <Phone className="h-4 w-4" /> मोबाइल नंबर
                        </label>
                        <input
                            id="edit-phone"
                            name="phone"
                            type="tel"
                            defaultValue={initialPhone ?? ""}
                            className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 font-medium"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            रद्द करें
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 rounded-xl bg-emerald-600 py-3 font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
                        >
                            {isPending ? "सेव हो रहा..." : <><Check className="h-5 w-5" /> सेव करें</>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}