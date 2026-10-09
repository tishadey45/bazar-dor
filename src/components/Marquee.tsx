import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headlines {
  id: string;
  emoji: string;
  categoryNameBn: string;
  price: number;
  unit: string;
  change: number;
}

export default async function Marquee() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products?category=chal",
  );

  const headlines: Headlines[] = await res.json();

  return (
    <div className="bg-white text-black border border-gray-200">
      <div className="flex max-w-7xl mx-auto">
        <MarqueeText className="py-1" direction="right" duration={10}>
          {headlines.map((h) => (
            <div key={h.id} className="flex items-center gap-2 mx-5">
              <span>{h.categoryIcon}</span>
              <span>{h.nameBn}</span>
              <span>{h.categoryNameBn}</span>
              <span>
                {h.price} টাকা/{h.unit}
              </span>
              <span>
                {h.change.pct >= 0 ? <span className="text-red-600 gap-2 px-1">{"▲"}</span>  : 
                <span className="text-green-600 px-1">{"▼"}</span>}
                {Math.abs(h.change.pct)}%
              </span>
            </div>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
}
