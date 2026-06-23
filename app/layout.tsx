import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SiteShell } from "@/components/layout/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://petrolistan.com'),
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
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Petrolistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benzin ve Motorin Fiyatları | Petrolistan',
    description: 'OPET, Shell, Petrol Ofisi fiyatlarını 81 ilde karşılaştırın. Güncel benzin, motorin, LPG ve ham petrol fiyatları.',
    images: ['/opengraph-image'],
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
    <html lang="tr" className={`${geistSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Plain script tag — avoids data-nscript attribute that AdSense doesn't support */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F5F5F0] dark:bg-[#09121E] text-gray-900 dark:text-[#E2E8F0]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
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
