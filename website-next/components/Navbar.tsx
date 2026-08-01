'use client';

import { useEffect, useState } from 'react';

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
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-white/80 py-4 shadow-sm backdrop-blur-xl' : 'bg-transparent py-6'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="font-display text-lg font-semibold tracking-[0.08em] text-slate-900">
          LeakProof<span className="ml-1 text-cyan-600">Waterproofing</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-cyan-600">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="rounded-full bg-slate-900 px-4 py-2 text-white transition-transform hover:-translate-y-0.5">
            Get Free Inspection
          </a>
        </nav>
        <button
          type="button"
          aria-label="Open menu"
          className="rounded-full border border-slate-200 p-2 text-slate-700 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {menuOpen && (
        <div className="mx-5 mt-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="rounded-full bg-slate-900 px-4 py-2 text-center text-white" onClick={() => setMenuOpen(false)}>
              Get Free Inspection
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
