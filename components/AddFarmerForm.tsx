"use client";

import { useActionState } from "react";
import { addFarmer } from "@/lib/actions";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/translations";

export function AddFarmerForm() {
  const [state, formAction] = useActionState(addFarmer, null);
  const { language } = useLanguage();

  return (
    <form
      action={formAction}
      className="rounded-xl border-2 border-emerald-200 bg-white p-5 shadow-sm"
    >
      <h3 className="mb-4 text-lg font-semibold text-emerald-900">
        {t("form.addFarmer", language)}
      </h3>

      {state?.error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            {t("form.name", language)} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t("form.name", language)}
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            {t("form.phone", language)}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={t("form.phone", language)}
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label
            htmlFor="village"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            {t("form.village", language)}
          </label>
          <input
            id="village"
            name="village"
            type="text"
            placeholder={t("form.village", language)}
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label
            htmlFor="aadhar_no"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            {t("form.aadhar", language)}
          </label>
          <input
            id="aadhar_no"
            name="aadhar_no"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={12}
            placeholder="12 digits"
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
          <p className="mt-1 text-xs text-emerald-600/80">Max 12 digits</p>
        </div>

        <div>
          <label
            htmlFor="photo"
            className="mb-1 block text-sm font-medium text-emerald-800"
          >
            {t("form.photo", language)}
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            className="w-full rounded-lg border border-emerald-200 px-4 py-2.5 text-emerald-900 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-100 file:px-4 file:py-2 file:text-emerald-800"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 active:bg-emerald-800"
        >
          {t("form.addButton", language)}
        </button>
      </div>
    </form>
  );
}
