import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getFarmerById,
  getFarmerTransactions,
  getFarmerBalance,
} from "@/lib/queries";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { FarmerEditForm } from "@/components/FarmerEditForm";
import { DeleteFarmerButton } from "@/components/DeleteFarmerButton";
import { TransactionItem } from "@/components/TransactionItem";
import { FarmerAvatar } from "@/components/FarmerAvatar";
import { DownloadReportButton } from "@/components/DownloadReportButton";

function formatAmount(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function FarmerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const farmer = await getFarmerById(id);
  if (!farmer) notFound();

  const transactions = await getFarmerTransactions(id);
  const { udhaar, vasuli, pending } = getFarmerBalance(transactions);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4">
          <Link
            href="/farmers"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-emerald-600 transition-colors hover:bg-emerald-100 hover:text-emerald-800"
            aria-label="Back to farmers"
          >
            ←
          </Link>
          <FarmerAvatar
            photoUrl={farmer.photo_url}
            name={farmer.name}
            size="lg"
          />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-bold text-emerald-800">
              {farmer.name}
            </h1>
            <p className="text-sm text-emerald-700/80">
              {farmer.village}
              {farmer.phone && ` • ${farmer.phone}`}
            </p>
            {farmer.aadhar_no && (
              <p className="mt-0.5 text-xs text-emerald-600/80">
                Aadhar: {farmer.aadhar_no}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-8 px-4 py-6 pb-24">
        {/* Edit / Delete Farmer */}
        <section className="flex flex-wrap items-center gap-3">
          <FarmerEditForm
            farmerId={farmer.id}
            initialName={farmer.name}
            initialPhone={farmer.phone}
            initialVillage={farmer.village}
            initialAadharNo={farmer.aadhar_no ?? ""}
          />
          <DeleteFarmerButton farmerId={farmer.id} farmerName={farmer.name} />
        </section>

        {/* Summary Cards + download */}
        <section className="flex items-center justify-between">
          <div className="grid gap-3 sm:grid-cols-3 flex-1">
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50/80 p-4 text-amber-900">
              <p className="text-xs font-medium opacity-80">Udhaar</p>
              <p className="mt-1 text-xl font-bold">{formatAmount(udhaar)}</p>
            </div>
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/80 p-4 text-emerald-900">
              <p className="text-xs font-medium opacity-80">Vasuli</p>
              <p className="mt-1 text-xl font-bold">{formatAmount(vasuli)}</p>
            </div>
            <div className="rounded-xl border-2 border-red-200 bg-red-50/80 p-4 text-red-900">
              <p className="text-xs font-medium opacity-80">Pending</p>
              <p className="mt-1 text-xl font-bold">{formatAmount(pending)}</p>
            </div>
          </div>
          <div className="ml-4">
            <DownloadReportButton farmer={farmer} transactions={transactions} />
          </div>
        </section>

        {/* Add Transaction Form */}
        <AddTransactionForm farmerId={farmer.id} />

        {/* Transaction History */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-emerald-900">
            Transaction History
          </h2>

          {transactions.length === 0 ? (
            <p className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-10 text-center text-emerald-700">
              No transactions yet. Add Udhaar or Vasuli above.
            </p>
          ) : (
            <div className="space-y-2">
              {transactions.map((t) => (
                <TransactionItem key={t.id} transaction={t} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
