import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
      dir: "up" | "down" | "flat";
      pct: number;
    };
  };
}

const formatBn = (value: number) =>
  new Intl.NumberFormat("bn-BD").format(value);

const units: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default function Products({ product }: ProductCardProps) {
  const { dir, pct } = product.change;

  const color =
    dir === "up"
      ? "text-red-600"
      : dir === "down"
        ? "text-green-600"
        : "text-gray-500";

  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between">
       
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl">
            {product.image || product.categoryIcon}
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {product.nameBn}
            </h3>
            <p className="text-sm text-gray-500">
              প্রতি {units[product.unit] ?? product.unit}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-3">
        <div>
          <p className="text-xs text-gray-400">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-900">
            {formatBn(product.today)} টাকা
          </p>
        </div>

        <span className={`text-sm font-semibold ${color}`}>
          {arrow} {formatBn(Math.abs(pct))}%
        </span>
      </div>
    </Link>
  );
}