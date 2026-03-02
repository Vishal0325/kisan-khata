"use client";

import { useActionState } from "react";
import { addUserAction } from "@/lib/actions";

export function AddUserForm() {
    const [state, formAction] = useActionState(addUserAction, null);

    return (
        <form
            action={formAction}
            className="rounded-xl border-2 border-emerald-200 bg-white p-5 shadow-sm"
        >
            <h3 className="mb-4 text-lg font-semibold text-emerald-900">Add Staff</h3>

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
                        className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>
                <div>
                    <label
                        htmlFor="mobile_number"
                        className="mb-1 block text-sm font-medium text-emerald-800"
                    >
                        Mobile Number *
                    </label>
                    <input
                        id="mobile_number"
                        name="mobile_number"
                        type="tel"
                        required
                        className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>
                <div>
                    <label
                        htmlFor="pin"
                        className="mb-1 block text-sm font-medium text-emerald-800"
                    >
                        4‑digit PIN *
                    </label>
                    <input
                        id="pin"
                        name="pin"
                        type="password"
                        maxLength={4}
                        required
                        className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                    Add Staff
                </button>
            </div>
        </form>
    );
}
