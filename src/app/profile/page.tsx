"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.updateUser({
        name: name ?? user?.name ?? "",
      });
      refetch();
      alert("সফলভাবে আপডেট করা হয়েছে!");
    } catch (error) {
      console.error(error);
      alert("আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <div className="text-center py-20 text-gray-500">লোড হচ্ছে...</div>;
  }

  return (
    <div className="px-100 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm mb-6 flex  justify-between">
        <div className="flex  gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-green-700 text-white text-xl font-bold">
                {user?.name?.[0] || "U"}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {user?.name || "নাম পাওয়া যায়নি"}
            </h2>
            <p className="text-sm text-gray-500">
              {user?.email || "ইমেইল পাওয়া যায়নি"}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-1 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium transition cursor-pointer"
        >
          <span>←</span> সাইন আউট
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-6">তথ্য</h3>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              নাম
            </label>
            <input
              type="text"
              value={name ?? user?.name ?? ""}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white transition text-gray-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-white font-medium bg-green-700 hover:bg-green-800 transition duration-200 shadow-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}
