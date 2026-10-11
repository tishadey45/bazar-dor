import SortDropdown from "@/components/SortDropdown";
import Link from "next/link";

const formatBn = (value: number) =>
  new Intl.NumberFormat("bn-BD").format(value);

const units: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

interface Product {
  id: string;
  categoryNameBn: string;
  nameBn: string;
  unit: string;
  image?: string;
  categoryIcon?: string;
  today: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

export default async function CategoriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { categoryId } = await params;
  const { sort } = await searchParams;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`,
  );
  let products: Product[] = await res.json();

  // 🔹 শর্টিং লজিক (Sort Logic)
  if (sort === "lowToHigh") {
    products = [...products].sort((a, b) => a.today - b.today);
  } else if (sort === "highToLow") {
    products = [...products].sort((a, b) => b.today - a.today);
  }

  return (
    <div className="py-6 px-4 sm:px-8 md:px-16 lg:px-28 min-h-screen bg-slate-50">
      {/* ক্যাটাগরি হেডার */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-2xl sm:text-3xl">
            {products[0]?.categoryIcon || "🛒"}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">
              {products[0]?.categoryNameBn || "ক্যাটাগরি"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {formatBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {/* ফিল্টার ও মোট পণ্য সংখ্যা কন্ট্রোল */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <p className="text-xs sm:text-sm font-medium text-gray-600">
          মোট {formatBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <SortDropdown categoryId={categoryId} sort={sort} />
      </div>

      {/* গ্রিড কন্টেইনার */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const dir = product.change?.dir;
          const pct = product.change?.pct ?? 0;

          const color =
            dir === "up"
              ? "text-red-600 bg-red-50"
              : dir === "down"
                ? "text-green-600 bg-green-50"
                : "text-gray-500 bg-gray-50";
          const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm transition hover:shadow-md hover:border-emerald-300"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl sm:text-2xl">
                  {product.image || product.categoryIcon || "🛒"}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-gray-500">
                    প্রতি {units[product.unit] ?? product.unit}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
                <div>
                  <p className="text-[10px] sm:text-[11px] text-gray-400">
                    আজকের দাম
                  </p>
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    {formatBn(product.today)}{" "}
                    <span className="text-xs font-normal">টাকা</span>
                  </p>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${color}`}
                >
                  {arrow} {formatBn(Math.abs(pct))}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
