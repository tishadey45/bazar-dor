import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

const notoSerifBengali = Noto_Serif_Bengali({

  variable: "--font-noto-serif-bengali",

  subsets: ["latin","bengali"],
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
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        <Marquee/>
        {children}
      <Footer/>
        </body>
    </html>
  );
}
