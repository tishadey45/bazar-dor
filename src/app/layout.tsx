import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bengali",

  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "নিত্য প্রয়োজনীয় পণ্যের বাজার দর",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <Marquee />
        {children}
        <Toaster position="top-center" reverseOrder={false} />
        <Footer />
      </body>
    </html>
  );
}
