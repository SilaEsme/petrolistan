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
  title: {
    default: 'Benzin ve Motorin Fiyatları — Güncel Karşılaştırma | Petrolistan',
    template: '%s | Petrolistan',
  },
  description:
    'Türkiye\'de güncel benzin, motorin ve LPG fiyatları. OPET, Shell, Petrol Ofisi, Aytemiz fiyatlarını 81 ilde karşılaştırın. Brent ham petrol ve döviz kurunu anlık takip edin.',
  keywords: [
    'benzin fiyatı',
    'motorin fiyatı',
    'akaryakıt fiyatları',
    'petrol fiyatı',
    'LPG fiyatı',
    'brent petrol',
    'OPET fiyatları',
    'Shell fiyatları',
    'Petrol Ofisi fiyatları',
  ],
  openGraph: {
    title: 'Benzin ve Motorin Fiyatları — Güncel Karşılaştırma | Petrolistan',
    description: 'OPET, Shell, Petrol Ofisi fiyatlarını 81 ilde karşılaştırın. Güncel benzin, motorin, LPG ve ham petrol fiyatları.',
    url: 'https://petrolistan.com',
    siteName: 'Petrolistan',
    locale: 'tr_TR',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://petrolistan.com' },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Petrolistan',
  url: 'https://petrolistan.com',
  description: 'Türkiye\'de güncel benzin, motorin ve LPG fiyatları. OPET, Shell, Petrol Ofisi karşılaştırması.',
  publisher: {
    '@type': 'Organization',
    name: 'Petrolistan',
    url: 'https://petrolistan.com',
    logo: { '@type': 'ImageObject', url: 'https://petrolistan.com/favicon.ico' },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://petrolistan.com/akaryakit/karsilastirma?province={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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
