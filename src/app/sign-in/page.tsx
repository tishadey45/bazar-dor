"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const credentials = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    try {
      const { data, error } = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
        callbackURL: "/",
      });

      if (data) {
        console.log("Logged in successfully:", data);
        router.push("/");
      }

      if (error) {
        
        console.error("Sign in error details:", JSON.stringify(error, null, 2));
        alert(
          error.message ||
            "সাইন ইন করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।",
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">সাইন ইন</h1>
        <p className="text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="max-w-120 w-full bg-white rounded-3xl border border-gray-200/80 p-8 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white focus:border-transparent text-gray-900 placeholder-gray-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:bg-white focus:border-transparent text-gray-900 placeholder-gray-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-white font-medium bg-green-700 hover:bg-green-800 transition duration-200 shadow-sm cursor-pointer"
          >
            সাইন ইন
          </button>
        </form>

        <div className="relative flex py-5 items-center">
          <div className="grow border-t border-gray-300"></div>
          <span className="shrink mx-4 text-gray-500 text-xs font-medium">
            অথবা
          </span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50/30 hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-700 transition duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.17 21.32 7.23 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.18C.43 8.12 0 9.8 0 12s.43 3.88 1.18 5.39l4.09-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.61l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            <span className="truncate">Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 bg-gray-50/30 hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-700 transition duration-200 cursor-pointer"
          >
            <svg
              className="w-4 h-4 fill-current text-gray-900 shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="text-green-600 font-medium hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-800 transition"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
