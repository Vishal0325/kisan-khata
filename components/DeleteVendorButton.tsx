"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteVendorAction } from "@/lib/actions";

interface DeleteVendorButtonProps {
    vendorId: string;
    vendorName: string;
}

export function DeleteVendorButton({ vendorId, vendorName }: DeleteVendorButtonProps) {
    const [showConfirm, setShowConfirm] = useState(false);

    if (!showConfirm) {
        return (
            <button type="button" onClick={() => setShowConfirm(true)} className="flex items-center gap-2 rounded-lg border-2 border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"><Trash2 className="h-4 w-4" />Delete Vendor</button>
        );
    }

    return (
        <div className="rounded-xl border-2 border-red-200 bg-red-50/80 p-4">
            <p className="mb-3 font-medium text-red-900">Are you sure? This will delete <strong>{vendorName}</strong> and all their transactions.</p>
            <div className="flex gap-2">
                <form action={deleteVendorAction}>
                    <input type="hidden" name="vendor_id" value={vendorId} />
                    <button type="submit" className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700">Yes, Delete</button>
                </form>
                <button type="button" onClick={() => setShowConfirm(false)} className="rounded-lg border border-red-300 px-4 py-2 font-medium text-red-700">Cancel</button>
            </div>
        </div>
    );
}
