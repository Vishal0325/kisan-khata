"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Users, Store } from "lucide-react";
import { getSummaryStats, getFarmers, getVendors } from "@/lib/queries";
import { SummaryCard } from "@/components/SummaryCard";
import DashboardStats from "@/components/DashboardStats";
import { FarmerSearch } from "@/components/FarmerSearch";
import { HeaderComponent } from "@/components/HeaderComponent";
import { HeroSection, ActionCards } from "@/components/DashboardSections";

// client-only helper to redirect if no session
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function EnsureLogin() {
  const router = useRouter();
  useEffect(() => {
    const stored = localStorage.getItem("kk_user");
    if (!stored) {
      router.push("/login");
    }
  }, [router]);
  return null;
}

function formatAmount(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default async function DashboardPage() {
  let stats;
  try {
    stats = await getSummaryStats();
  } catch {
    stats = { totalUdhaar: 0, totalCollected: 0, pending: 0 };
  }

  let farmers = [];
  let vendors = [];
  try {
    farmers = await getFarmers();
  } catch {
    farmers = [];
  }
  try {
    vendors = await getVendors();
  } catch {
    vendors = [];
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
      <EnsureLogin />
      <HeaderComponent />

      <main className="mx-auto max-w-2xl px-4 py-6 pb-24">
        <HeroSection />

        <ActionCards />

        <section className="mb-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <SummaryCard title="Total Farmers" value={farmers.length} variant="collected" icon={<Users className="h-8 w-8 text-emerald-700" />} />
            <SummaryCard title="Total Vendors" value={vendors.length} variant="udhaar" icon={<Store className="h-8 w-8 text-amber-700" />} />
          </div>
        </section>

        <DashboardStats />

        <Suspense fallback={<div className="mb-6 h-14 rounded-xl bg-emerald-100/50" />}>
          <FarmerSearch />
        </Suspense>
      </main>
    </div>
  );
}
