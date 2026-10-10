import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import UserInfo from "./UserInfo";

export default function Navbar() {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="mx-auto">
      <nav className="max-w-7xl py-10 px-10">
        {/* Top Navbar with Grid Layout */}
        <div className="grid gap-x-80 grid-cols-3 items-center">
          {/* Left */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/logo-icon.png"
                className="rounded-2xl bg-green-700 p-2"
                height={40}
                width={40}
                alt="logo"
              />

              <div>
                <h1 className="text-xl font-bold text-red-700">বাজার দর</h1>

                <p className="text-[10px] text-gray-600">{date}</p>
              </div>
            </div>
          </Link>

          {/* Center - Empty */}
          <div></div>

          {/* Right */}
         <UserInfo/>
        </div>

        {/* NavLink - Navbar er niche */}
        <div className="mt-6 align-bottom">
          <NavLink />
        </div>
      </nav>
    </div>
  );
}
