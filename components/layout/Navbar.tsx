"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Ham Petrol", href: "/ham-petrol" },
  { label: "Akaryakıt", href: "/akaryakit" },
  { label: "Doğalgaz", href: "/dogalgaz" },
  { label: "Haberler", href: "/haberler" },
  { label: "Analizler", href: "/analizler" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0C447C] shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-[#BA7517] flex items-center justify-center">
            <span className="text-white font-bold text-sm leading-none">P</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            petrolistan
          </span>
        </Link>

        {/* Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-2">
          <Link
            href="/bulten"
            className="hidden sm:inline-flex items-center px-4 py-1.5 bg-[#BA7517] hover:bg-[#a5671a] text-white text-sm font-semibold rounded transition-colors"
          >
            Bülten
          </Link>
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/80 hover:text-white p-1"
            aria-label="Menü"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a3d6e] border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/bulten"
            onClick={() => setIsOpen(false)}
            className="mt-2 inline-flex items-center justify-center px-4 py-2 bg-[#BA7517] hover:bg-[#a5671a] text-white text-sm font-semibold rounded transition-colors"
          >
            Bülten
          </Link>
        </div>
      )}
    </nav>
  );
}
