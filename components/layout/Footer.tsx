import Link from "next/link";

const footerLinks = {
  "Fiyatlar": [
    { label: "Ham Petrol", href: "/ham-petrol" },
    { label: "Akaryakıt", href: "/akaryakıt" },
    { label: "Doğalgaz", href: "/dogalgaz" },
    { label: "LPG", href: "/lpg" },
  ],
  "İçerik": [
    { label: "Haberler", href: "/haberler" },
    { label: "Analizler", href: "/analizler" },
    { label: "Piyasa Verileri", href: "/piyasa" },
    { label: "Bülten", href: "/bulten" },
  ],
  "Kurumsal": [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
    { label: "Reklam", href: "/reklam" },
    { label: "Gizlilik", href: "/gizlilik" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#042C53] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded bg-[#BA7517] flex items-center justify-center">
                <span className="text-white font-bold text-xs">P</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                petrolistan
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Türkiye&apos;nin petrol ve enerji fiyatları için güvenilir kaynak.
              Anlık veriler, haberler ve analizler.
            </p>
            <p className="text-white/30 text-xs mt-4">
              Veri kaynakları: EIA, TCMB, EPDK
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white/80 font-semibold text-sm mb-3 uppercase tracking-wide">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/30 text-xs">
          <span>© 2026 Petrolistan. Tüm hakları saklıdır.</span>
          <span>
            Fiyatlar bilgi amaçlıdır — yatırım tavsiyesi değildir.
          </span>
        </div>
      </div>
    </footer>
  );
}
