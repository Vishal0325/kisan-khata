"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabase } from "./supabase";
import {
  searchFarmers,
  updateFarmer,
  deleteFarmer,
  updateTransaction,
  deleteTransaction,
  updateVendor,
  deleteVendor,
  updateVendorTransaction,
  deleteVendorTransaction,
} from "./queries";
import { uploadFarmerPhoto } from "./storage";

// --- HELPERS ---
function formatAadhar(value: string): string {
  return value.replace(/\D/g, "").slice(0, 12);
}

// --- FARMER ACTIONS ---

export async function addFarmer(_prevState: any, formData: FormData) {
  const supabase = getSupabase();
  if (!supabase) return { error: "Database not configured" };

  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const village = formData.get("village")?.toString().trim() ?? "";
  const aadharNo = formatAadhar(formData.get("aadhar_no")?.toString() ?? "");
  const photoFile = formData.get("photo") as File | null;

  if (!name) return { error: "नाम ज़रूरी है" };

  const { data: newFarmer, error } = await supabase
    .from("farmers")
    .insert({ name, phone, village, aadhar_no: aadharNo || "" })
    .select("id")
    .single();

  if (error) return { error: error.message };

  if (photoFile && photoFile.size > 0) {
    try {
      const photoUrl = await uploadFarmerPhoto(newFarmer.id, photoFile);
      await updateFarmer(newFarmer.id, { photo_url: photoUrl });
    } catch (e) { console.error(e); }
  }

  revalidatePath("/farmers");
  revalidatePath("/");
  redirect("/farmers");
}

export async function updateFarmerAction(farmerId: string, _prevState: any, formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const village = formData.get("village")?.toString().trim() ?? "";
  const aadharNo = formatAadhar(formData.get("aadhar_no")?.toString() ?? "");

  if (!name) return { error: "किसान का नाम ज़रूरी है" };

  try {
    await updateFarmer(farmerId, {
      name,
      phone: phone || undefined,
      village: village || undefined,
      aadhar_no: aadharNo || undefined
    });
    revalidatePath(`/farmers/${farmerId}`);
    revalidatePath("/farmers");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function deleteFarmerAction(formData: FormData) {
  const id = formData.get("farmer_id")?.toString();
  if (id) {
    await deleteFarmer(id);
    revalidatePath("/farmers");
    redirect("/farmers");
  }
}

// --- FARMER TRANSACTION ACTIONS ---

export async function addTransaction(_prevState: any, formData: FormData) {
  const supabase = getSupabase();
  if (!supabase) return { error: "Database not configured" };

  const farmerId = formData.get("farmer_id")?.toString();
  const type = formData.get("type")?.toString();
  const amountStr = formData.get("amount")?.toString();
  const note = formData.get("note")?.toString().trim() ?? "";
  const date = formData.get("date")?.toString() ?? new Date().toISOString().slice(0, 10);
  const createdBy = formData.get("created_by_user_id")?.toString() ?? null;

  if (type !== "CREDIT" && type !== "DEBIT") return { error: "Invalid type" };
  const amount = parseFloat(amountStr ?? "0");
  if (isNaN(amount) || amount <= 0) return { error: "सही रकम डालें" };

  const { error } = await supabase.from("transactions").insert({
    farmer_id: farmerId,
    type,
    amount,
    note: note || null,
    date,
    created_by_user_id: createdBy || undefined,
  });

  if (error) return { error: error.message };
  revalidatePath(`/farmers/${farmerId}`);
  revalidatePath("/");
  redirect(`/farmers/${farmerId}`);
}

export async function updateTransactionAction(transactionId: string, farmerId: string, _prevState: any, formData: FormData) {
  const type = formData.get("type")?.toString() as "CREDIT" | "DEBIT";
  const amountStr = formData.get("amount")?.toString();
  const note = formData.get("note")?.toString().trim() ?? "";
  const date = formData.get("date")?.toString() ?? new Date().toISOString().slice(0, 10);

  const amount = parseFloat(amountStr ?? "0");
  if (isNaN(amount) || amount <= 0) return { error: "सही रकम डालें" };

  try {
    await updateTransaction(transactionId, { type, amount, note: note || null, date });
    revalidatePath(`/farmers/${farmerId}`);
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function deleteTransactionAction(formData: FormData) {
  const transactionId = formData.get("transaction_id")?.toString();
  const farmerId = formData.get("farmer_id")?.toString();
  if (!transactionId || !farmerId) return;

  await deleteTransaction(transactionId);
  revalidatePath(`/farmers/${farmerId}`);
  revalidatePath("/");
}

// --- USER ACTIONS ---

export async function addUserAction(_prevState: any, formData: FormData) {
  const supabase = getSupabase();
  if (!supabase) return { error: "Database not configured" };

  const name = formData.get("name")?.toString().trim();
  const mobile = formData.get("mobile_number")?.toString().trim();
  const pin = formData.get("pin")?.toString().trim() ?? "";

  if (!name) return { error: "Name is required" };
  if (!mobile) return { error: "Mobile number is required" };
  if (!/^[0-9]{4}$/.test(pin)) return { error: "PIN must be 4 digits" };

  const { error } = await supabase.from("users").insert({
    name,
    mobile_number: mobile,
    pin,
  });

  if (error) return { error: error.message };
  revalidatePath("/users");
  redirect("/users");
}

// --- VENDOR ACTIONS ---

export async function addVendor(_prevState: any, formData: FormData) {
  const supabase = getSupabase();
  if (!supabase) return { error: "Database not configured" };

  const name = formData.get("name")?.toString().trim();
  const companyName = formData.get("company_name")?.toString().trim() ?? "";
  const phone = formData.get("phone")?.toString().trim() ?? "";
  const address = formData.get("address")?.toString().trim() ?? "";

  if (!name) return { error: "वेंडर का नाम ज़रूरी है" };

  const { error } = await supabase
    .from("vendors")
    .insert({ name, company_name: companyName || null, phone: phone || null, address: address || null });

  if (error) return { error: error.message };
  revalidatePath("/vendors");
  revalidatePath("/");
  redirect("/vendors");
}

export async function updateVendorAction(vendorId: string, _prevState: any, formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() ?? "";

  if (!name) return { error: "वेंडर का नाम ज़रूरी है" };

  try {
    await updateVendor(vendorId, { name, phone });
    revalidatePath(`/vendors/${vendorId}`);
    revalidatePath("/vendors");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function deleteVendorAction(formData: FormData) {
  const id = formData.get("vendor_id")?.toString();
  if (id) {
    await deleteVendor(id);
    revalidatePath("/vendors");
    redirect("/vendors");
  }
}

// --- VENDOR TRANSACTION ACTIONS ---

export async function addVendorTransaction(_prevState: any, formData: FormData) {
  const supabase = getSupabase();
  if (!supabase) return { error: "Database not configured" };

  const vendorId = formData.get("vendor_id")?.toString();
  const type = formData.get("type")?.toString();
  const amountStr = formData.get("amount")?.toString();
  const note = formData.get("note")?.toString().trim() ?? "";
  const date = formData.get("date")?.toString() ?? new Date().toISOString().slice(0, 10);

  if (type !== "PURCHASE" && type !== "PAYMENT") return { error: "Invalid type" };
  const amount = parseFloat(amountStr ?? "0");
  if (isNaN(amount) || amount <= 0) return { error: "सही रकम डालें" };

  const { error } = await supabase.from("vendor_transactions").insert({
    vendor_id: vendorId,
    type,
    amount,
    note: note || null,
    date,
  });

  if (error) return { error: error.message };
  revalidatePath(`/vendors/${vendorId}`);
  revalidatePath("/");
  redirect(`/vendors/${vendorId}`);
}

export async function updateVendorTransactionAction(transactionId: string, vendorId: string, _prevState: any, formData: FormData) {
  const type = formData.get("type")?.toString() as "PURCHASE" | "PAYMENT";
  const amountStr = formData.get("amount")?.toString();
  const note = formData.get("note")?.toString().trim() ?? "";
  const date = formData.get("date")?.toString() ?? new Date().toISOString().slice(0, 10);

  const amount = parseFloat(amountStr ?? "0");
  if (isNaN(amount) || amount <= 0) return { error: "सही रकम डालें" };

  try {
    await updateVendorTransaction(transactionId, { type, amount, note: note || null, date });
    revalidatePath(`/vendors/${vendorId}`);
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function deleteVendorTransactionAction(formData: FormData) {
  const transactionId = formData.get("transaction_id")?.toString();
  const vendorId = formData.get("vendor_id")?.toString();
  if (!transactionId || !vendorId) return;

  await deleteVendorTransaction(transactionId);
  revalidatePath(`/vendors/${vendorId}`);
  revalidatePath("/");
}

export async function searchFarmersAction(query: string) {
  return searchFarmers(query?.trim() ?? "");
}