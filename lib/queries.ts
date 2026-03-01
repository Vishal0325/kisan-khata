import { getSupabase } from "./supabase";
import type { TransactionType } from "./database.types";
import type { Database } from "./database.types";

type Farmer = Database["public"]["Tables"]["farmers"]["Row"];
type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
type Vendor = Database["public"]["Tables"]["vendors"]["Row"];
type VendorTransaction = Database["public"]["Tables"]["vendor_transactions"]["Row"];

export async function getSummaryStats() {
  const supabase = getSupabase();
  if (!supabase) {
    return { totalUdhaar: 0, totalCollected: 0, pending: 0 };
  }

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("type, amount");

  if (error) {
    throw new Error(`Failed to fetch transactions: ${error.message}`);
  }

  const rows = (transactions ?? []) as { type: TransactionType; amount: number }[];

  let totalUdhaar = 0;
  let totalCollected = 0;

  for (const t of rows) {
    if (t.type === "CREDIT") {
      totalUdhaar += t.amount;
    } else {
      totalCollected += t.amount;
    }
  }

  const pending = Math.max(0, totalUdhaar - totalCollected);

  return {
    totalUdhaar,
    totalCollected,
    pending,
  };
}

export async function getFarmers(): Promise<(Farmer & { total_credit: number; total_debit: number; balance: number })[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("farmers")
    .select("*")
    .order("name");

  if (error) throw new Error(`Failed to fetch farmers: ${error.message}`);

  const farmers = (data ?? []) as Farmer[];

  // Fetch transaction data for all farmers to calculate balances
  const { data: transactions, error: txnError } = await supabase
    .from("transactions")
    .select("farmer_id, type, amount");

  if (txnError) {
    // Return farmers without balance fields on error
    return farmers.map(f => ({ ...f, total_credit: 0, total_debit: 0, balance: 0 }));
  }

  // Calculate balance for each farmer
  const balanceMap: Record<string, { credit: number; debit: number }> = {};

  for (const txn of (transactions ?? []) as { farmer_id: string; type: TransactionType; amount: number }[]) {
    if (!balanceMap[txn.farmer_id]) {
      balanceMap[txn.farmer_id] = { credit: 0, debit: 0 };
    }
    if (txn.type === "CREDIT") {
      balanceMap[txn.farmer_id].credit += txn.amount;
    } else {
      balanceMap[txn.farmer_id].debit += txn.amount;
    }
  }

  return farmers.map(farmer => {
    const balance = balanceMap[farmer.id] || { credit: 0, debit: 0 };
    return {
      ...farmer,
      total_credit: balance.credit,
      total_debit: balance.debit,
      balance: Math.max(0, balance.credit - balance.debit),
    };
  });
}

export async function searchFarmers(query: string): Promise<Farmer[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const q = query.trim();
  if (!q) return [];

  const pattern = `%${q}%`;

  const { data, error } = await supabase
    .from("farmers")
    .select("*")
    .or(`name.ilike.${pattern},village.ilike.${pattern}`)
    .order("name");

  if (error) throw new Error(`Failed to search farmers: ${error.message}`);
  return data ?? [];
}

export async function getFarmerById(id: string): Promise<Farmer | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("farmers")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getFarmerTransactions(
  farmerId: string
): Promise<Transaction[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("farmer_id", farmerId)
    .order("date", { ascending: false });

  if (error) throw new Error(`Failed to fetch transactions: ${error.message}`);
  return data ?? [];
}

export function getFarmerBalance(transactions: Transaction[]) {
  let udhaar = 0;
  let vasuli = 0;
  for (const t of transactions) {
    if (t.type === "CREDIT") udhaar += t.amount;
    else vasuli += t.amount;
  }
  return { udhaar, vasuli, pending: Math.max(0, udhaar - vasuli) };
}

/** Returns a map of farmer_id -> pending amount */
export async function getPendingByFarmerIds(
  farmerIds: string[]
): Promise<Record<string, number>> {
  const supabase = getSupabase();
  if (!supabase || farmerIds.length === 0) return {};

  const { data, error } = await supabase
    .from("transactions")
    .select("farmer_id, type, amount")
    .in("farmer_id", farmerIds);

  if (error) return {};

  const balance: Record<string, { udhaar: number; vasuli: number }> = {};
  for (const t of data ?? []) {
    const row = t as { farmer_id: string; type: TransactionType; amount: number };
    if (!balance[row.farmer_id]) balance[row.farmer_id] = { udhaar: 0, vasuli: 0 };
    if (row.type === "CREDIT") balance[row.farmer_id].udhaar += row.amount;
    else balance[row.farmer_id].vasuli += row.amount;
  }

  const result: Record<string, number> = {};
  for (const [id, b] of Object.entries(balance)) {
    result[id] = Math.max(0, b.udhaar - b.vasuli);
  }
  return result;
}

export async function updateFarmer(
  id: string,
  data: {
    name?: string;
    phone?: string;
    village?: string;
    aadhar_no?: string;
    photo_url?: string | null;
  }
) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database not configured");

  const { error } = await supabase.from("farmers").update(data).eq("id", id);

  if (error) throw new Error(`Failed to update farmer: ${error.message}`);
}

export async function deleteFarmer(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database not configured");

  const { error } = await supabase.from("farmers").delete().eq("id", id);

  if (error) throw new Error(`Failed to delete farmer: ${error.message}`);
}

export async function updateTransaction(
  id: string,
  data: {
    type?: "DEBIT" | "CREDIT";
    amount?: number;
    note?: string | null;
    date?: string;
  }
) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database not configured");

  const { error } = await supabase.from("transactions").update(data).eq("id", id);

  if (error) throw new Error(`Failed to update transaction: ${error.message}`);
}

export async function deleteTransaction(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database not configured");

  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) throw new Error(`Failed to delete transaction: ${error.message}`);
}
export async function getVendors(): Promise<Vendor[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .order("name");

  if (error) throw new Error(`Failed to fetch vendors: ${error.message}`);
  return data ?? [];
}

export async function getVendorById(id: string): Promise<Vendor | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export async function searchVendors(query: string): Promise<Vendor[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const q = query.trim();
  if (!q) return [];

  const pattern = `%${q}%`;

  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .or(`name.ilike.${pattern},company_name.ilike.${pattern}`)
    .order("name");

  if (error) throw new Error(`Failed to search vendors: ${error.message}`);
  return data ?? [];
}

export async function updateVendor(
  id: string,
  data: {
    name?: string;
    company_name?: string;
    phone?: string;
    address?: string;
  }
) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database not configured");

  const { error } = await supabase.from("vendors").update(data).eq("id", id);

  if (error) throw new Error(`Failed to update vendor: ${error.message}`);
}

export async function deleteVendor(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database not configured");

  const { error } = await supabase.from("vendors").delete().eq("id", id);

  if (error) throw new Error(`Failed to delete vendor: ${error.message}`);
}

export async function getVendorTransactions(
  vendorId: string
): Promise<VendorTransaction[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("vendor_transactions")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("date", { ascending: false });

  if (error) throw new Error(`Failed to fetch vendor transactions: ${error.message}`);
  return data ?? [];
}

export function getVendorBalance(transactions: VendorTransaction[]) {
  let purchases = 0;
  let payments = 0;
  for (const t of transactions) {
    if (t.type === "PURCHASE") purchases += t.amount;
    else payments += t.amount;
  }
  return { purchases, payments, pending: Math.max(0, purchases - payments) };
}

export async function updateVendorTransaction(
  id: string,
  data: {
    type?: "PURCHASE" | "PAYMENT";
    amount?: number;
    note?: string | null;
    date?: string;
  }
) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database not configured");

  const { error } = await supabase.from("vendor_transactions").update(data).eq("id", id);

  if (error) throw new Error(`Failed to update vendor transaction: ${error.message}`);
}

export async function deleteVendorTransaction(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database not configured");

  const { error } = await supabase.from("vendor_transactions").delete().eq("id", id);

  if (error) throw new Error(`Failed to delete vendor transaction: ${error.message}`);
}