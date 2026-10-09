
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headlines {
  id: string;
  emoji?: string;
  categoryIcon?: string;
  nameBn?: string;
  categoryNameBn: string;
  price: number;
  unit: string;
  change: {
    pct: number;
  };
}

export default async function Marquee() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const headlines: Headlines[] = await res.json();

  return (
    <div className="border border-gray-200 bg-white text-black">
      <div className="mx-auto flex max-w-7xl">
        <MarqueeText className="py-1" direction="right" duration={10}>
          {headlines.map((h) => (
            <div
              key={h.id}
              className="mx-5 flex items-center gap-2 whitespace-nowrap"
            >
              <span>{h.categoryIcon ?? h.emoji}</span>

              <span>{h.nameBn}</span>

              <span>{h.categoryNameBn}</span>

              <span>
                {h.price} টাকা/{h.unit}
              </span>

              <span>
                {h.change.pct >= 0 ? (
                  <span className="px-1 text-red-600">▲</span>
                ) : (
                  <span className="px-1 text-green-600">▼</span>
                )}

                {Math.abs(h.change.pct)}%
              </span>
            </div>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
}