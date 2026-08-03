'use client';

import { motion } from 'framer-motion';
import { ShieldIcon, DropletIcon, MedalIcon, CheckBadgeIcon, StarIcon, ArrowRightIcon, PhoneIcon } from '@/components/Icons';

const features = [
  { icon: ShieldIcon, label: '100% Leakproof' },
  { icon: DropletIcon, label: 'Waterproofing Experts' },
  { icon: MedalIcon, label: 'Premium Materials' },
  { icon: CheckBadgeIcon, label: 'Skilled Professionals' },
];

const strip = ['Long-lasting protection', 'Cost-effective solutions', 'Residential & commercial', 'Advanced technology', 'After-service support'];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-14 pt-24 sm:pt-28 md:px-8 lg:pt-32">
      {/* Full-width background image */}
      <div
        className="absolute inset-0 z-0 bg-[url('/hero-image1.png')] bg-cover bg-[center_right] bg-no-repeat"
        aria-hidden="true"
      />
      {/* Dark blue gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(115deg, rgba(5,15,36,0.92) 0%, rgba(11,28,61,0.82) 38%, rgba(11,28,61,0.42) 72%, rgba(11,28,61,0.18) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Animated accent blobs */}
      <div className="animate-blob absolute -left-24 top-24 z-[1] h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" aria-hidden="true" />
      <div className="animate-blob-slow absolute bottom-10 left-1/3 z-[1] h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-cyan-200 backdrop-blur">
            <DropletIcon className="h-4 w-4" />
            Leaks today, damage tomorrow — act early
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl lg:text-[3.75rem]">
            Complete Leakproofing &{' '}
            <span className="text-gradient-amber">Waterproofing Solutions</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
            Protect your home and business from leaks, dampness and water damage with durable, site-tested waterproofing, a clean finish and a warranty you can trust.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-amber transition-transform hover:-translate-y-0.5"
            >
              Book Free Inspection
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+918928299010"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <PhoneIcon className="h-4 w-4" /> Call Now
            </a>
          </div>

          <div className="mt-9 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center backdrop-blur"
              >
                <feature.icon className="h-6 w-6 text-cyan-300" />
                <span className="text-xs font-medium leading-tight text-slate-100">{feature.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-3 text-sm text-slate-200">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </div>
            <span className="font-semibold text-white">4.9/5</span>
            <span className="text-slate-300">from 100+ protected properties</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom feature strip */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="relative z-10 mx-auto mt-12 max-w-7xl"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-white/10 bg-navy-deep/40 px-6 py-4 backdrop-blur">
          {strip.map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm font-medium text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
