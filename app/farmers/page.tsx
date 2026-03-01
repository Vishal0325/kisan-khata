import Link from "next/link";
import { getFarmers } from "@/lib/queries";
import type { Database } from "@/lib/database.types";
import { AddFarmerForm } from "@/components/AddFarmerForm";
import { FarmersHeader } from "@/components/FarmersHeader";
import { FarmerCard } from "@/components/FarmerCard";
import { EmptyState } from "@/components/EmptyState";

type Farmer = Database["public"]["Tables"]["farmers"]["Row"];

interface FarmersPageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function FarmersPage({ searchParams }: FarmersPageProps) {
  const params = await searchParams;
  const filter = params.filter || "";

  let allFarmers: (Farmer & { total_credit: number; total_debit: number; balance: number })[] = [];
  try {
    allFarmers = await getFarmers();
  } catch {
    allFarmers = [];
  }

  // Apply filters
  const filteredFarmers =
    filter === "pending"
      ? allFarmers.filter((f) => f.balance > 0)
      : filter === "collection"
        ? allFarmers.filter((f) => f.total_credit > 0)
        : allFarmers;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
      <FarmersHeader filter={filter} />

      <main className="mx-auto max-w-2xl space-y-8 px-4 py-6 pb-24">
        {!filter && <AddFarmerForm />}

        <section>
          <h2 className="mb-4 text-lg font-semibold text-emerald-900">
            Farmer List ({filteredFarmers.length})
          </h2>

          {filteredFarmers.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            <div className="space-y-3">
              {filteredFarmers.map((farmer) => (
                <FarmerCard key={farmer.id} farmer={farmer} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
