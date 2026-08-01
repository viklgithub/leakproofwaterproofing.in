import SectionHeading from '@/components/SectionHeading';

const services = [
  { title: 'Terrace Waterproofing', description: 'Seal exposed roof areas against monsoon seepage, ponding and surface cracking with a layered system designed to last.' },
  { title: 'Bathroom & Wet Area', description: 'Stop recurring leaks in bathrooms, kitchens and utility spaces with moisture-proof membranes and precise detailing.' },
  { title: 'Basement & Foundation', description: 'Protect below-grade walls and floors from moisture ingress with robust damp-proofing systems and drainage care.' },
  { title: 'Tank & Water Retaining', description: 'Create a clean, durable barrier for overhead and underground water storage structures with leak-proof treatment.' },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
      <SectionHeading eyebrow="Services" title="Protection engineered for real-world conditions." description="Every project is handled with a precise, site-specific approach so the waterproofing performs long after installation." />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.title} className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-xl">
              ⌂
            </div>
            <h3 className="font-display text-2xl font-semibold text-slate-900">{service.title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">{service.description}</p>
            <a href="#contact" className="mt-6 inline-flex items-center text-sm font-semibold text-cyan-700 transition-colors group-hover:text-cyan-600">
              Request assessment →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
