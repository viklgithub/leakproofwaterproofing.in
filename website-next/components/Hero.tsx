'use client';

import { motion } from 'framer-motion';

const badges = ['Free inspection', '5-year warranty', 'Professional team', '24hr response'];
const stats = [
  { value: '100+', label: 'Properties protected' },
  { value: '5+', label: 'Years experience' },
  { value: '4.9/5', label: 'Client rating' },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 py-24 sm:py-28 md:px-8 lg:py-32">
      {/* Full-width background image */}
      <div
        className="absolute inset-0 z-0 bg-[url('/hero-image1.png')] bg-cover bg-[center_right] bg-no-repeat"
        aria-hidden="true"
      />
      {/* Dark blue gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.55) 40%, rgba(30,58,138,0.45) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-2xl"
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-cyan-200 backdrop-blur">
            Premium waterproofing for homes, terraces & commercial spaces
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            Protect your property with{' '}
            <span className="text-cyan-300">waterproofing that lasts.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-200">
            From terrace seepage to bathroom leaks and basement dampness, we deliver durable, site-tested waterproofing with a clean finish and a warranty you can trust.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5"
            >
              Get Free Inspection
            </a>
            <a
              href="https://wa.me/918928299010"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              Call Now
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-200 backdrop-blur"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
