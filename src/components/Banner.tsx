import Image from "next/image";

export default function Banner() {
  return (
    <div className="hero bg-gray-100 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <Image
      alt="Tailwind CSS hero component"
      src="/bazar-hero.png"
      width={500}
      height={500}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
        <button className="btn bg-green-700 rounded-4xl">বাজার দর পরিচালনা করুন</button>
      <h1 className="text-3xl pt-4 font-bold">আজকের বাজারের দাম এক নজরে</h1>
      <p className="py-6">
        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
      </p>
      <button className="btn bg-green-700 rounded-2xl text-white">সব পণ্য দেখুন</button>
    </div>
  </div>
</div>
  );
}