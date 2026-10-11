
"use client";

import { useRouter } from "next/navigation";

interface SortDropdownProps {
  categoryId: string;
  sort?: string;
}

export default function SortDropdown({
  categoryId,
  sort,
}: SortDropdownProps) {
  const router = useRouter();

  const handleSortChange = (value: string) => {
    const url = value
      ? `/categories/${categoryId}?sort=${value}`
      : `/categories/${categoryId}`;

    router.push(url);
  };

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort"
        className="whitespace-nowrap text-sm font-medium text-gray-600"
      >
        সাজান:
      </label>

      <div className="relative">
        <select
          id="sort"
          value={sort || ""}
          onChange={(e) => handleSortChange(e.target.value)}
          className="appearance-none cursor-pointer rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-9 text-xs font-medium text-gray-700 shadow-sm outline-none transition hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:text-sm"
        >
          <option value="">ডিফল্ট</option>
          <option value="lowToHigh">
            দাম: কম থেকে বেশি
          </option>
          <option value="highToLow">
            দাম: বেশি থেকে কম
          </option>
        </select>

        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6 9 6 6 6-6"
          />
        </svg>
      </div>
    </div>
  );
}
