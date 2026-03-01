"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchFarmersAction } from "@/lib/actions";
import { FarmerAvatar } from "@/components/FarmerAvatar";

type FarmerResult = {
  id: string;
  name: string;
  phone: string;
  village: string;
  aadhar_no?: string;
  photo_url?: string | null;
};

export function FarmerSearch() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [results, setResults] = useState<FarmerResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(async (query: string) => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const data = await searchFarmersAction(q);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      search(input);
    }, 200);
    return () => clearTimeout(timer);
  }, [input, search]);

  function handleResultClick(farmerId: string) {
    router.push(`/farmers/${farmerId}`);
  }

  return (
    <div className="mb-6">
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500">
          🔍
        </span>
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search by name or village..."
          className="w-full rounded-xl border-2 border-emerald-200 bg-white py-3 pl-11 pr-4 text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          aria-label="Search farmers by name or village"
          aria-autocomplete="list"
          aria-expanded={results.length > 0}
        />
      </div>

      {input.trim() && (
        <div className="mt-2 rounded-xl border-2 border-emerald-200 bg-white shadow-lg">
          {isLoading ? (
            <div className="px-4 py-6 text-center text-sm text-emerald-600">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-emerald-600">
              No farmers found for &quot;{input.trim()}&quot;
            </div>
          ) : (
            <ul
              className="max-h-64 overflow-y-auto py-2"
              role="listbox"
            >
              {results.map((farmer) => (
                <li key={farmer.id} role="option">
                  <button
                    type="button"
                    onClick={() => handleResultClick(farmer.id)}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none"
                  >
                    <FarmerAvatar
                      photoUrl={farmer.photo_url}
                      name={farmer.name}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-emerald-900">
                        {farmer.name}
                      </span>
                      {/* गाँव और फोन नंबर एक साथ दिखाने के लिए */}
                      <div className="flex flex-wrap gap-x-2 text-sm text-emerald-700/80">
                        {farmer.village && <span>{farmer.village}</span>}
                        {farmer.phone && (
                          <span className="text-emerald-500 font-medium">
                            • {farmer.phone}
                          </span>
                        )}
                      </div>
                      {farmer.aadhar_no && (
                        <span className="block text-xs text-emerald-600/80">
                          Aadhar: {farmer.aadhar_no}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}