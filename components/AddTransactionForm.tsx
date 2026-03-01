"use client";

import { useActionState } from "react";
import { addTransaction } from "@/lib/actions";

interface AddTransactionFormProps {
  farmerId: string;
}

export function AddTransactionForm({ farmerId }: AddTransactionFormProps) {
  const [state, formAction] = useActionState(addTransaction, null);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form
      action={formAction}
      className="rounded-xl border-2 border-emerald-200 bg-white p-5 shadow-sm"
    >
      <input type="hidden" name="farmer_id" value={farmerId} />

      <h3 className="mb-4 text-lg font-semibold text-emerald-900">
        Add Transaction
      </h3>

      {state?.error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-emerald-800">
            Type
          </label>
          <div className="flex gap-3">
            <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-amber-200 bg-amber-50 py-3 font-medium text-amber-900 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-100 has-[:checked]:ring-2 has-[:checked]:ring-amber-200">
              <input
                type="radio"
                name="type"
                value="CREDIT"
                defaultChecked
                className="sr-only"
              />
              📤 Udhaar
            </label>
            <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-emerald-200 bg-emerald-50 py-3 font-medium text-emerald-900 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-100 has-[:checked]:ring-2 has-[:checked]:ring-emerald-200">
              <input
                type="radio"
                name="type"
                value="DEBIT"
                className="sr-only"
              />
              📥 Vasuli
            </label>
          </div>
          <p className="mt-1 text-xs text-emerald-700/70">
            Udhaar = paisa diya | Vasuli = paisa liya
          </p>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            Amount (₹) *
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            required
            placeholder="0"
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={today}
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label
            htmlFor="note"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            Note (optional)
          </label>
          <input
            id="note"
            name="note"
            type="text"
            placeholder="e.g. Seeds, Fertilizer"
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 active:bg-emerald-800"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}
