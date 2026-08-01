'use client';

import { motion } from 'framer-motion';

const badges = ['Free inspection', '5-year warranty', 'Licensed team', '24hr response'];
const stats = [
  { value: '500+', label: 'Projects completed' },
  { value: '15+', label: 'Years experience' },
  { value: '4.9/5', label: 'Client rating' },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.16),_transparent_40%),linear-gradient(135deg,_#0f172a_0%,_#111827_45%,_#1e3a8a_100%)] px-5 py-24 sm:py-28 md:px-8 lg:py-32">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-10 top-20 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <p className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-cyan-200 backdrop-blur">
            Premium waterproofing for homes, terraces & commercial spaces
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            Protect your property with <span className="text-cyan-300">waterproofing that lasts.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            From terrace seepage to bathroom leaks and basement dampness, we deliver durable, site-tested waterproofing with a clean finish and a warranty you can trust.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5">
              Get Free Inspection
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20">
              Call Now
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-200 backdrop-blur">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-0 -translate-y-4 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Site assessment overview</span>
                <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-cyan-200">Trusted by Pune homeowners</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center">
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-400/20" />
                  <div>
                    <p className="font-semibold text-white">Detailed inspection & layered protection</p>
                    <p className="text-sm text-slate-300">No shortcuts, no guesswork, no patchwork.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
