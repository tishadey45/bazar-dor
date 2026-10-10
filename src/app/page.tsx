import Banner from "@/components/Banner";
import Products from "@/components/Products";

interface IProduct {
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
}

async function getProducts(): Promise<IProduct[]> {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  const sections = [
    { title: "▲ আজ দাম বেড়েছে", iconClass: "text-red-600", items: risers },
    { title: "▼ আজ দাম কমেছে", iconClass: "text-green-600", items: fallers },
    { title: "সব পণ্য", items: products },
  ];

  return (
    <div>
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Banner />
      </div>

      <main className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8">
        {sections.map((section, index) => (
          <section key={section.title}>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              {section.iconClass ? (
                <>
                  <span className={section.iconClass}>
                    {section.title.charAt(0)}
                  </span>
                  {section.title.slice(1)}
                </>
              ) : (
                section.title
              )}
            </h2>

            {index === 2 && (
              <p className="mb-5 text-gray-500">
                নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর দেখুন।
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((product) => (
                <Products key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
