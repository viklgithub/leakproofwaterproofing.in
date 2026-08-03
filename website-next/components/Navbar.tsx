'use client';

import { useEffect, useState } from 'react';
import { DropletIcon, PhoneIcon } from '@/components/Icons';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-soft' : 'bg-transparent py-5'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-glow transition-transform group-hover:-rotate-6">
            <DropletIcon className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-slate-900">
            LeakProof<span className="text-gradient"> Waterproofing</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="relative py-1 transition-colors hover:text-blue-600 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-blue-600 after:to-cyan-500 after:transition-all hover:after:w-full">
              {link.label}
            </a>
          ))}
          <a href="tel:+918928299010" className="flex items-center gap-1.5 text-slate-700 transition-colors hover:text-blue-600">
            <PhoneIcon className="h-4 w-4" /> +91 89282 99010
          </a>
          <a href="#contact" className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 font-semibold text-slate-900 shadow-amber transition-transform hover:-translate-y-0.5">
            Free Inspection
          </a>
        </nav>
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-700 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>
      {menuOpen && (
        <div className="mx-5 mt-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50 hover:text-blue-600">
                {link.label}
              </a>
            ))}
            <a href="#contact" className="mt-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2.5 text-center font-semibold text-slate-900" onClick={() => setMenuOpen(false)}>
              Get Free Inspection
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
