import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
  <div className="hero w-full bg-gray-100 px-4 py-12 sm:px-8 md:py-16 lg:px-16">
  <div className="hero-content mx-auto flex w-full max-w-7xl flex-col justify-between gap-8 lg:flex-row-reverse lg:gap-12">

    {/* Right Side Image */}
    <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
      <Image
        alt="Bazar Dor hero image"
        src="/bazar-hero.png"
        width={350}
        height={350}
        className="max-w-full object-contain"
        priority
      />
    </div>

    {/* Left Side Content */}
    <div className="w-full text-center lg:w-1/2 lg:text-left">
      <button
        type="button"
        className="rounded-full bg-green-700 px-5 py-2.5 text-xs font-semibold
        text-white shadow-sm transition hover:bg-green-800 sm:text-sm"
      >
        বাজার দর পরিচালনা করুন
      </button>

      <h1 className="pt-4 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
        আজকের বাজারের দাম এক নজরে
      </h1>

      <p className="py-4 text-sm leading-relaxed text-gray-600 sm:py-6 sm:text-base">
        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
        বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
      </p>

      <Link
        href="#সব-পণ্য"
        className="inline-flex items-center justify-center rounded-2xl
        bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-md
        transition hover:bg-green-800 sm:text-base"
      >
        সব পণ্য দেখুন
      </Link>
    </div>

  </div>
</div>
  );
}
