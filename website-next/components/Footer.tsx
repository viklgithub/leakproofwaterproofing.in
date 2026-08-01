export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-10 text-sm text-slate-600 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-xl font-semibold text-slate-900">LeakProof Waterproofing</p>
          <p className="mt-3 leading-7">Trusted waterproofing for terraces, bathrooms, basements and tanks across Pune.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-slate-900">Services</p>
            <ul className="mt-3 space-y-2">
              <li><a href="#services" className="hover:text-cyan-600">Terrace waterproofing</a></li>
              <li><a href="#services" className="hover:text-cyan-600">Bathroom sealing</a></li>
              <li><a href="#services" className="hover:text-cyan-600">Basement protection</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Quick links</p>
            <ul className="mt-3 space-y-2">
              <li><a href="#why-us" className="hover:text-cyan-600">Why choose us</a></li>
              <li><a href="#process" className="hover:text-cyan-600">Our process</a></li>
              <li><a href="#contact" className="hover:text-cyan-600">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Contact</p>
            <ul className="mt-3 space-y-2">
              <li>+91 98765 43210</li>
              <li>hello@leakproofwaterproofing.in</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-slate-200 pt-6 text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© 2026 LeakProof Waterproofing. All rights reserved.</p>
        <p>Licensed • Insured • Warranty-backed</p>
      </div>
    </footer>
  );
}
