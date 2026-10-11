import Image from "next/image";

export default function Banner() {
  return (
    <div className="hero bg-gray-100 py-12 md:py-16 px-4 sm:px-8 lg:px-16 w-full">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl mx-auto w-full justify-between gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            alt="Tailwind CSS hero component"
            src="/bazar-hero.png"
            width={550}
            height={550}
            className="w-full max-w-md lg:max-w-lg rounded-2xl shadow-xl object-cover"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <button className="btn bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 min-h-0 h-auto rounded-full text-xs sm:text-sm font-semibold shadow-sm">
            বাজার দর পরিচালনা করুন
          </button>

          <h1 className="text-2xl sm:text-3xl md:text-4xl  pt-4 font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="py-4 sm:py-6 text-sm sm:text-base text-gray-600 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <button className="btn bg-green-700 hover:bg-green-800 text-white px-6 py-3 min-h-0 h-auto rounded-2xl text-sm sm:text-base font-semibold shadow-md transition">
            সব পণ্য দেখুন
          </button>
        </div>
      </div>
    </div>
  );
}
