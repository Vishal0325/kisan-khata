"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Pencil } from "lucide-react";
import { updateFarmerAction } from "@/lib/actions";

interface FarmerEditFormProps {
  farmerId: string;
  initialName: string;
  initialPhone: string;
  initialVillage: string;
  initialAadharNo: string;
}

export function FarmerEditForm({
  farmerId,
  initialName,
  initialPhone,
  initialVillage,
  initialAadharNo,
}: FarmerEditFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction] = useActionState(updateFarmerAction.bind(null, farmerId), null);

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 rounded-lg border-2 border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-100"
      >
        <Pencil className="h-4 w-4" />
        Edit
      </button>
    );
  }

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="rounded-xl border-2 border-emerald-200 bg-white p-5 shadow-sm"
    >
      <h3 className="mb-4 text-lg font-semibold text-emerald-900">Edit Farmer</h3>

      {state?.error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="edit-name"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            Name *
          </label>
          <input
            id="edit-name"
            name="name"
            type="text"
            required
            defaultValue={initialName}
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label
            htmlFor="edit-phone"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            Phone
          </label>
          <input
            id="edit-phone"
            name="phone"
            type="tel"
            defaultValue={initialPhone}
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label
            htmlFor="edit-village"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            Village
          </label>
          <input
            id="edit-village"
            name="village"
            type="text"
            defaultValue={initialVillage}
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label
            htmlFor="edit-aadhar_no"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            Aadhar Number
          </label>
          <input
            id="edit-aadhar_no"
            name="aadhar_no"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={12}
            defaultValue={initialAadharNo}
            placeholder="12 digits"
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label
            htmlFor="edit-photo"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            Change Photo
          </label>
          <input
            id="edit-photo"
            name="photo"
            type="file"
            accept="image/*"
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:px-4 file:py-2 file:text-emerald-800"
          />
          <p className="mt-1 text-xs text-emerald-600/80">Leave empty to keep current photo</p>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded-lg border border-emerald-300 px-4 py-2 font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
