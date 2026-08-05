import { DropletIcon, PhoneIcon, MailIcon, MapPinIcon } from '@/components/Icons';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-deep to-slate-950 px-5 py-14 text-sm text-slate-400 md:px-8">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
              <DropletIcon className="h-5 w-5" />
            </span>
            <p className="font-display text-xl font-bold text-white">LeakProof Waterproofing</p>
          </div>
          <p className="mt-4 leading-7">Trusted waterproofing for terraces, bathrooms, basements and tanks across Pune. Warranty-backed craftsmanship and fast site visits.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-white">Services</p>
            <ul className="mt-4 space-y-2.5">
              <li><a href="#services" className="transition-colors hover:text-cyan-300">Waterproofing</a></li>
              <li><a href="#services" className="transition-colors hover:text-cyan-300">Painting</a></li>
              <li><a href="#services" className="transition-colors hover:text-cyan-300">Grouting</a></li>
              <li><a href="#services" className="transition-colors hover:text-cyan-300">Epoxy flooring</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Quick links</p>
            <ul className="mt-4 space-y-2.5">
              <li><a href="#why-us" className="transition-colors hover:text-cyan-300">Why choose us</a></li>
              <li><a href="#products" className="transition-colors hover:text-cyan-300">Products</a></li>
              <li><a href="#process" className="transition-colors hover:text-cyan-300">Our process</a></li>
              <li><a href="#contact" className="transition-colors hover:text-cyan-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Contact</p>
            <ul className="mt-4 space-y-2.5">
              <li className="flex items-center gap-2"><PhoneIcon className="h-4 w-4 text-cyan-300" /> +91 89282 99010</li>
              <li className="flex items-center gap-2"><PhoneIcon className="h-4 w-4 text-cyan-300" /> 95294 46645 · 80805 62780</li>
              <li className="flex items-start gap-2"><MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" /> <span className="break-all">leakproofwaterproofing213@gmail.com</span></li>
              <li className="flex items-start gap-2"><MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" /> Navale Bridge, Pune</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© 2026 LeakProof Waterproofing. All rights reserved.</p>
        <div className="space-y-1 text-sm md:text-right">
          <p>Licensed • Insured • Warranty-backed</p>
          <p>Designed and Managed by: Vikram Lokhande</p>
        </div>
      </div>
    </footer>
  );
}
