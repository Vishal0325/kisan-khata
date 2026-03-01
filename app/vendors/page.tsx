import Link from "next/link";
import { getVendors } from "@/lib/queries";
import type { Database } from "@/lib/database.types";
import { AddVendorForm } from "@/components/AddVendorForm";

type Vendor = Database["public"]["Tables"]["vendors"]["Row"];

export default async function VendorsPage() {
    let vendors: Vendor[];
    try {
        vendors = await getVendors();
    } catch {
        vendors = [];
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
            <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
                <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4">
                    <Link
                        href="/"
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-emerald-600 transition-colors hover:bg-emerald-100 hover:text-emerald-800"
                        aria-label="Back to dashboard"
                    >
                        ←
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-emerald-800">Vendors</h1>
                        <p className="text-sm text-emerald-700/80">
                            Add and manage vendors
                        </p>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-2xl space-y-8 px-4 py-6 pb-24">
                <AddVendorForm />

                <section>
                    <h2 className="mb-4 text-lg font-semibold text-emerald-900">
                        Vendor List ({vendors.length})
                    </h2>

                    {vendors.length === 0 ? (
                        <p className="rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-10 text-center text-emerald-700">
                            No vendors yet. Add your first vendor above.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {vendors.map((vendor) => (
                                <VendorCard key={vendor.id} vendor={vendor} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

function VendorCard({ vendor }: { vendor: Vendor }) {
    return (
        <Link
            href={`/vendors/${vendor.id}`}
            className="flex flex-col gap-2 rounded-xl border-2 border-emerald-200 bg-white p-4 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md active:scale-[0.99]"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-emerald-900">{vendor.name}</p>
                    {vendor.company_name && (
                        <p className="text-sm text-emerald-700/80">{vendor.company_name}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-emerald-700/80">
                {vendor.phone && <span>{vendor.phone}</span>}
            </div>

            {vendor.address && (
                <p className="text-sm text-emerald-700/80">{vendor.address}</p>
            )}
        </Link>
    );
}
