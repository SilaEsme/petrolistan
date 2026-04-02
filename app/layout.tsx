import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Topbar, Navbar, Ticker, Footer } from "@/components/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Petrolistan — Türkiye Petrol & Enerji Fiyatları",
  description:
    "Türkiye'nin petrol ve enerji fiyatları platformu. Brent, WTI, akaryakıt ve doğalgaz fiyatları, haberler ve analizler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F5F5F0] text-gray-900">
        <Topbar />
        <Navbar />
        <Ticker />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
