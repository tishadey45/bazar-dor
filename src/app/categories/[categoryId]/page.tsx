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
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`
  );
  const products: Product[] = await res.json();

  return (
    <div className=" py-8 px-28">
     
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-3xl">
            {products[0]?.categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {products[0]?.categoryNameBn}
            </h1>
            <p className="text-sm text-gray-500">
              {formatBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {/* মোট পণ্য সংখ্যা */}
      <p className="text-sm text-gray-600 mb-4">
        মোট {formatBn(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* গ্রিড কন্টেইনার: এক লাইনে ৩টি করে কার্ড (md:grid-cols-3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
              className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                  {product.image || product.categoryIcon || "🛒"}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-gray-900 truncate">
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-gray-500">
                    প্রতি {units[product.unit] ?? product.unit}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
                <div>
                  <p className="text-[11px] text-gray-400">আজকের দাম</p>
                  <p className="text-lg font-bold text-gray-900">
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