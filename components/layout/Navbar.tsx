"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import PetrolistanLogo from "./PetrolistanLogo";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Ham Petrol", href: "/ham-petrol" },
  { label: "Akaryakıt", href: "/akaryakit" },
  { label: "Karşılaştır", href: "/akaryakit/karsilastirma" },
  { label: "İstasyonlar", href: "/ara" },
  { label: "Doğalgaz", href: "/dogalgaz" },
  { label: "Haberler", href: "/haberler" },
  { label: "Yazılar", href: "/yazilar" },
];

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    // Exact match for links that have a more-specific sibling in the nav
    const exactLinks = ["/akaryakit"];
    if (exactLinks.includes(href)) return pathname === href;
    return pathname.startsWith(href);
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <nav className="w-full bg-[#0C447C] dark:bg-[#070E1A] shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <PetrolistanLogo size={32} variant="full" />
        </Link>

        {/* Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-white/20 text-white"
                  : "text-white/65 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side: theme toggle + hamburger */}
        <div className="flex items-center gap-1">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="text-white/65 hover:text-white hover:bg-white/10 p-2 rounded transition-colors"
              aria-label={theme === "dark" ? "Açık moda geç" : "Koyu moda geç"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/65 hover:text-white p-2 rounded transition-colors"
            aria-label="Menü"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#0a3d6e] dark:bg-[#080F1C] border-t border-white/10 overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-white/20 text-white"
                  : "text-white/65 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
