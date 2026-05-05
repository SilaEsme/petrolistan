import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Topbar, Navbar, Ticker, Footer } from "@/components/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Petrolistan — Türkiye Petrol & Enerji Fiyatları',
  description:
    'Güncel benzin, motorin, LPG fiyatları. Brent, WTI ham petrol fiyatları. OPET, Shell, Petrol Ofisi marka karşılaştırması. Türkiye enerji haberleri.',
  keywords: [
    'benzin fiyatı',
    'motorin fiyatı',
    'akaryakıt fiyatları',
    'petrol fiyatı',
    'LPG fiyatı',
    'brent petrol',
  ],
  openGraph: {
    title: 'Petrolistan — Türkiye Petrol & Enerji Fiyatları',
    description: 'Güncel akaryakıt ve petrol fiyatları',
    url: 'https://petrolistan.com',
    siteName: 'Petrolistan',
    locale: 'tr_TR',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://petrolistan.com' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? 'G-0R88KQWF2W';
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID ?? 'ca-pub-5969246291079798';
  return (
    <html lang="tr" className={`${geistSans.variable} h-full antialiased`}>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body className="min-h-full flex flex-col bg-[#F5F5F0] text-gray-900">
        <Topbar />
        <Navbar />
        <Ticker />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </body>
    </html>
  );
}
