"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";

export default function UserInfo() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return <div className="w-24 h-8 animate-pulse bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="">
      {user ? (
        // এখানে href="/profile" দেওয়া আছে, তাই ক্লিক করলে প্রোফাইল পেজে যাবে
        <Link
          href="/profile"
          className="flex items-center gap-2.5 py-1.5 px-3 rounded-full hover:bg-gray-100 transition border border-gray-200 bg-white shadow-sm"
        >
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={32}
              height={32}
              className="rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-xs">
              {user.name?.[0] || "U"}
            </div>
          )}
          <span className="text-sm font-bold text-gray-900">
            {user.name?.split(" ")[0]}
          </span>
          <span className="text-xs text-gray-500">▼</span>
        </Link>
      ) : (
        <div className="flex justify-end gap-3">
          <Link href="/sign-in">
            <button className="text-sm font-medium text-gray-700 hover:text-black py-2 px-3">
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-800 transition shadow-sm">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}