import Link from "next/link";
import { notFound } from "next/navigation";
import { getVendorById, getVendorTransactions, getVendorBalance } from "@/lib/queries";
import { AddVendorTransactionForm } from "@/components/AddVendorTransactionForm";
import { VendorEditForm } from "@/components/VendorEditForm";
import { DeleteVendorButton } from "@/components/DeleteVendorButton";
import { VendorTransactionItem } from "@/components/VendorTransactionItem";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { DownloadBillButton } from "@/components/DownloadBillButton";

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

export default async function VendorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const vendor = await getVendorById(id);
    if (!vendor) notFound();

    const transactions = await getVendorTransactions(id);
    const { purchases, payments, pending } = getVendorBalance(transactions);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
            <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
                <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4">
                    <Link href="/vendors" className="flex h-10 w-10 items-center justify-center rounded-lg text-emerald-600 transition-colors hover:bg-emerald-100 hover:text-emerald-800" aria-label="Back to vendors">←</Link>
                    <div className="min-w-0 flex-1">
                        <h1 className="truncate text-xl font-bold text-emerald-800">{vendor.name}</h1>
                        <p className="text-sm text-emerald-700/80">{vendor.company_name}{vendor.phone && ` • ${vendor.phone}`}</p>
                        <div className="mt-1 flex gap-2">
                            <WhatsAppButton name={vendor.name} balance={pending} phone={vendor.phone} />
                            <DownloadBillButton person={{ name: vendor.name, phone: vendor.phone }} transactions={transactions} />
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-2xl space-y-8 px-4 py-6 pb-24">
                <section className="rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-6">
                    <p className="text-sm font-medium text-indigo-700">Total Outstanding Balance</p>
                    <p className="mt-2 text-3xl font-bold text-indigo-900">{formatAmount(pending)}</p>
                    <p className="mt-1 text-xs text-indigo-700/80">कुल उधार (Total Due to Vendor)</p>
                </section>

                <section className="flex flex-wrap items-center gap-3">
                    <VendorEditForm vendorId={vendor.id} initialName={vendor.name} initialPhone={vendor.phone} />
                    <DeleteVendorButton vendorId={vendor.id} vendorName={vendor.name} />
                </section>

                <section className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border-2 border-red-200 bg-red-50/80 p-4 text-red-900">
                        <p className="text-xs font-medium opacity-80">Purchases</p>
                        <p className="mt-1 text-xl font-bold">{formatAmount(purchases)}</p>
                    </div>
                    <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/80 p-4 text-emerald-900">
                        <p className="text-xs font-medium opacity-80">Payments</p>
                        <p className="mt-1 text-xl font-bold">{formatAmount(payments)}</p>
                    </div>
                    <div className="rounded-xl border-2 border-amber-200 bg-amber-50/80 p-4 text-amber-900">
                        <p className="text-xs font-medium opacity-80">Outstanding</p>
                        <p className="mt-1 text-xl font-bold">{formatAmount(pending)}</p>
                    </div>
                </section>

                <section>
                    <h2 className="mb-4 text-lg font-semibold text-emerald-900">Add Transaction</h2>
                    <AddVendorTransactionForm vendorId={vendor.id} />
                </section>

                <section>
                    <h2 className="mb-4 text-lg font-semibold text-emerald-900">Transaction History</h2>

                    {transactions.length === 0 ? (
                        <p className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-10 text-center text-emerald-700">No transactions yet. Add a purchase or payment above.</p>
                    ) : (
                        <div className="space-y-2">
                            {transactions.map((t) => (
                                <VendorTransactionItem key={t.id} transaction={t} vendorId={vendor.id} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
