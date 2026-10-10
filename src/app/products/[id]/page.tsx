import Link from "next/link";
interface IMarketPrice {
  market: string;
  division: string;
  min: string;
  max: string;
  avg?: string;
}

interface IProduct {
  id: number;
  nameBn: string;
  slug: string;
  categoryIcon: string;
  description: string;
  categoryNameBn: string;
  category: string;
  unit: string;
  currentPrice?: string;
  min?: string;
  max?: string;
  avg?: string;
  today: number;
  markets?: IMarketPrice[];
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
  );

  if (!res.ok) {
    throw new Error("Product fetch failed");
  }

  const data: IProduct = await res.json();

  const parseNum = (val: string | number | undefined | null): number => {
    if (typeof val === "number") return val;
    if (val === undefined || val === null || val === "") return NaN;

    const bnDigits = "০১২৩৪৫৬৭৮৯";
    const englishNumStr = String(val)
      .replace(/[০-৯]/g, (d) => String(bnDigits.indexOf(d)))
      .replace(/[^0-9.-]+/g, "");

    return Number(englishNumStr);
  };
  const formatBn = (value: number | string | undefined) => {
    if (value === undefined || value === null || value === "") return "";
    const num = parseNum(value);
    if (isNaN(num)) return value;
    return new Intl.NumberFormat("bn-BD").format(num);
  };

  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  const rawMarkets = data.markets || [];
  const markets = rawMarkets.map((m) => {
    const minNum = parseNum(m.min);
    const maxNum = parseNum(m.max);

    let avgNum = parseNum(m.avg);
    if (isNaN(avgNum) && !isNaN(minNum) && !isNaN(maxNum)) {
      avgNum = (minNum + maxNum) / 2;
    }

    return {
      ...m,
      avg: isNaN(avgNum) ? "প্রযোজ্য নয়" : avgNum.toString(),
    };
  });

  let calculatedMin = data.min;
  let calculatedMax = data.max;
  let calculatedAvg = data.avg;

  if (markets.length > 0) {
    const minValues = markets
      .map((m) => parseNum(m.min))
      .filter((v) => !isNaN(v));
    const maxValues = markets
      .map((m) => parseNum(m.max))
      .filter((v) => !isNaN(v));
    const avgValues = markets
      .map((m) => parseNum(m.avg))
      .filter((v) => !isNaN(v));

    if (minValues.length > 0) calculatedMin = Math.min(...minValues).toString();
    if (maxValues.length > 0) calculatedMax = Math.max(...maxValues).toString();

    if (avgValues.length > 0) {
      const sum = avgValues.reduce((acc, val) => acc + val, 0);
      calculatedAvg = (sum / avgValues.length).toFixed(1);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link
          href="/"
          className="mb-6 inline-flex text-sm font-medium text-emerald-700 hover:underline"
        >
          {" "}
          হোম
        </Link>
        <Link
          href="/categories"
          className="mb-6 inline-flex text-sm font-medium text-emerald-700 hover:underline"
        ></Link>
        <div className="px-2 pt-10">
          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4 sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-4xl">
                  {data.categoryIcon || "🛒"}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                    {data.nameBn}
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    প্রতি {units[data.unit] ?? data.unit}
                  </p>
                  <p className="mt-2 text-xs text-slate-600">
                    {data.description ||
                      "গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-slate-100 md:flex-col md:text-center min-w-[130px]">
                <span className="text-xs font-medium text-slate-500">
                  আজকের দাম
                </span>
                <div className="my-1 text-3xl font-extrabold text-slate-900">
                  {formatBn(data.today)}
                </div>
                <div className="text-right md:text-center">
                  <span className="text-xs text-slate-500 block">
                    টাকা/{units[data.unit] ?? data.unit}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="rounded-3xl border border-slate-200 p-6 shadow-sm bg-white">
          <section className="md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              দামের সারসংক্ষেপ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <p className="text-xs text-slate-500">সর্বনিম্ন দাম</p>
                <p className="text-2xl font-extrabold text-emerald-600 mt-1">
                  {formatBn(calculatedMin)} টাকা
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  সবচেয়ে কম দামের বাজার
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <p className="text-xs text-slate-500">সর্বাধিক দাম</p>
                <p className="text-2xl font-extrabold text-rose-600 mt-1">
                  {formatBn(calculatedMax)} টাকা
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  সবচেয়ে বেশি দামের বাজার
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <p className="text-xs text-slate-500">গড় দাম</p>
                <p className="text-2xl font-extrabold text-emerald-600 mt-1">
                  {formatBn(calculatedAvg)} টাকা
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  প্রতি কেজি এর হিসাব
                </p>
              </div>
            </div>
          </section>

          <section className="md:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-700 text-sm">
                    <th className="pb-3 font-bold">বাজার</th>
                    <th className="pb-3 font-bold">বিভাগ</th>
                    <th className="pb-3 font-bold">সর্বনিম্ন</th>
                    <th className="pb-3 font-bold">সর্বাধিক</th>
                    <th className="pb-3 font-bold text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 text-sm">
                  {markets.map((market, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-100 transition-colors border-b border-slate-300"
                    >
                      <td className="py-4 font-medium">{market.market}</td>
                      <td className="py-4 text-slate-600">{market.division}</td>
                      <td className="py-4">{formatBn(market.min)} টাকা</td>
                      <td className="py-4">{formatBn(market.max)} টাকা</td>
                      <td className="py-4 text-right">
                        {formatBn(market.avg)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
