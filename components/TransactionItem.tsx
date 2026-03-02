"use client";

import { useState, useActionState } from "react";
import { TrendingUp, TrendingDown, Pencil, Trash2, Check, X } from "lucide-react";
import { updateTransactionAction, deleteTransactionAction } from "@/lib/actions";

export interface Transaction {
  id: string;
  farmer_id: string;
  type: "DEBIT" | "CREDIT";
  amount: number;
  note: string | null;
  date: string;
  created_by?: { name: string } | null;
}

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // useActionState - Server Action के साथ तालमेल के लिए
  const [editState, editFormAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await updateTransactionAction(
        transaction.id,
        transaction.farmer_id,
        prevState,
        formData
      );
      if (!result?.error) {
        setIsEditing(false); // अगर एरर नहीं है तो फॉर्म बंद करें
      }
      return result;
    },
    null
  );

  // --- EDIT MODAL (जब पेंसिल बटन दबेगा) ---
  if (isEditing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditing(false)} />
        <form
          action={editFormAction}
          className="z-10 w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
              <Pencil className="h-5 w-5 text-emerald-600" /> हिसाब सुधारें
            </h3>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          {editState?.error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">{editState.error}</p>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-emerald-800">लेन-देन का प्रकार</label>
              <div className="flex gap-3">
                <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-bold transition-all has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50 border-gray-100 bg-gray-50 text-amber-700">
                  <input type="radio" name="type" value="CREDIT" defaultChecked={transaction.type === "CREDIT"} className="sr-only" />
                  <TrendingUp className="h-4 w-4" /> उधार (Credit)
                </label>
                <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-bold transition-all has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50 border-gray-100 bg-gray-50 text-emerald-700">
                  <input type="radio" name="type" value="DEBIT" defaultChecked={transaction.type === "DEBIT"} className="sr-only" />
                  <TrendingDown className="h-4 w-4" /> वसूली (Debit)
                </label>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-emerald-800">रकम (₹)</label>
              <input name="amount" type="number" step="0.01" required defaultValue={transaction.amount} className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30 text-lg font-bold" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-emerald-800">तारीख</label>
              <input name="date" type="date" defaultValue={transaction.date.slice(0, 10)} className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-emerald-900 bg-emerald-50/30" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-emerald-800">विवरण (Note)</label>
              <input name="note" type="text" defaultValue={transaction.note ?? ""} className="w-full rounded-xl border border-emerald-200 px-4 py-3 text-emerald-900 bg-emerald-50/30" placeholder="विवरण लिखें..." />
            </div>

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-all">रद्द करें</button>
              <button type="submit" disabled={isPending} className="flex-1 rounded-xl bg-emerald-600 py-3 font-bold text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2">
                {isPending ? "सेव हो रहा..." : <><Check className="h-5 w-5" /> सेव करें</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // --- DELETE CONFIRMATION ---
  if (showDeleteConfirm) {
    return (
      <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 animate-in fade-in zoom-in duration-200">
        <p className="text-center font-bold text-red-900">क्या आप वाकई इस हिसाब को हटाना चाहते हैं?</p>
        <div className="mt-4 flex gap-3">
          <form action={deleteTransactionAction} className="flex-1">
            <input type="hidden" name="transaction_id" value={transaction.id} />
            <input type="hidden" name="farmer_id" value={transaction.farmer_id} />
            <button type="submit" className="w-full rounded-lg bg-red-600 py-2.5 text-sm font-bold text-white hover:bg-red-700">हाँ, हटा दें</button>
          </form>
          <button type="button" onClick={() => setShowDeleteConfirm(false)} className="flex-1 rounded-lg border border-red-300 bg-white py-2.5 text-sm font-bold text-red-700 hover:bg-red-50">नहीं</button>
        </div>
      </div>
    );
  }

  // --- LIST ITEM UI (साधारण दृश्य) ---
  return (
    <div className={`flex items-center justify-between rounded-xl border px-4 py-4 transition-all hover:shadow-md ${transaction.type === "CREDIT" ? "border-amber-100 bg-amber-50/30" : "border-emerald-100 bg-emerald-50/30"}`}>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className={`rounded-full p-2.5 ${transaction.type === "CREDIT" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}>
          {transaction.type === "CREDIT" ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-emerald-900">{transaction.type === "CREDIT" ? "उधार (Credit)" : "वसूली (Debit)"}</p>
          <p className="text-xs text-emerald-700/70">
            {new Date(transaction.date).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
            {transaction.note && ` • ${transaction.note}`}
          </p>
          {transaction.created_by?.name && (
            <p className="mt-1 text-xs text-gray-600">Added by: {transaction.created_by.name}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className={`text-lg font-black ${transaction.type === "CREDIT" ? "text-amber-700" : "text-emerald-700"}`}>
          {transaction.type === "CREDIT" ? "+" : "-"} ₹{transaction.amount.toLocaleString("en-IN")}
        </p>
        <div className="flex items-center bg-white rounded-lg border border-gray-100 p-1 shadow-sm">
          <button onClick={() => setIsEditing(true)} className="rounded-md p-1.5 text-emerald-600 hover:bg-emerald-50 transition-colors">
            <Pencil className="h-4 w-4" />
          </button>
          <div className="w-px h-4 bg-gray-100 mx-1" />
          <button onClick={() => setShowDeleteConfirm(true)} className="rounded-md p-1.5 text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}