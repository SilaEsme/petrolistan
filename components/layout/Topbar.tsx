export default function Topbar() {
  return (
    <div className="w-full bg-[#042C53] text-white text-xs py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-white/60">
          Türkiye&apos;nin Petrol &amp; Enerji Haber Platformu
        </span>
        <div className="flex items-center gap-4 text-white/60">
          <a href="/hakkimizda" className="hover:text-white transition-colors">
            Hakkımızda
          </a>
          <a href="/iletisim" className="hover:text-white transition-colors">
            İletişim
          </a>
          <a href="/rss" className="hover:text-white transition-colors">
            RSS
          </a>
        </div>
      </div>
    </div>
  );
}
