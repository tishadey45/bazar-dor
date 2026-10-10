import Link from "next/link";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
   scrapable: boolean;
}

export default async function NavLink() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    { cache: "no-store" }
  );
  const navs: Navs[] = await res.json();
  const filterNavs = navs.filter((n)=>n.scrapable)

  return (
    <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-none">
      {navs.map((nav) => (
        <Link
          key={nav.id}
          href={`/categories/${nav.slug}`}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition shrink-0"
        >
          <span className="text-base leading-none">{nav.icon}</span> 
          <span>{nav.nameBn}</span>
        </Link>
      ))}
       {filterNavs.map((n) => (
        <Link key={n.id} href={`/categories/${n.slug}`}>
          {n.nameBn}
        </Link>
      ))}
    </div>
  );
}