"use client";

import { useActionState } from "react";
import { addVendor } from "@/lib/actions";

export function AddVendorForm() {
    const [state, formAction] = useActionState(addVendor, null);

    return (
        <form
            action={formAction}
            className="rounded-xl border-2 border-emerald-200 bg-white p-5 shadow-sm"
        >
            <h3 className="mb-4 text-lg font-semibold text-emerald-900">
                Add New Vendor
            </h3>

            {state?.error && (
                <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {state.error}
                </p>
            )}

            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-1 block text-sm font-medium text-emerald-800"
                    >
                        Name *
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Vendor name"
                        className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <div>
                    <label
                        htmlFor="company_name"
                        className="mb-1 block text-sm font-medium text-emerald-800"
                    >
                        Company
                    </label>
                    <input
                        id="company_name"
                        name="company_name"
                        type="text"
                        placeholder="Company name"
                        className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <div>
                    <label
                        htmlFor="phone"
                        className="mb-1 block text-sm font-medium text-emerald-800"
                    >
                        Phone
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="10+ digits"
                        className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    <p className="mt-1 text-xs text-emerald-600/80">At least 10 digits</p>
                </div>

                <div>
                    <label
                        htmlFor="address"
                        className="mb-1 block text-sm font-medium text-emerald-800"
                    >
                        Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        rows={3}
                        placeholder="Street address, city, state"
                        className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 active:bg-emerald-800"
                >
                    Add Vendor
                </button>
            </div>
        </form>
    );
}
