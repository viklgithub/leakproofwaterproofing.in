import SectionHeading from '@/components/SectionHeading';

const steps = [
  { title: 'Inspection', body: 'We inspect the source of leakage and identify whether the issue is surface, structural or moisture-related.' },
  { title: 'Free Quote', body: 'You receive a clear scope, material plan and estimated timeline before work starts.' },
  { title: 'Waterproofing', body: 'We prepare the substrate and apply the right system layer by layer for durability.' },
  { title: 'Final Quality Check', body: 'The finished area is tested, cleaned and handed over with visible workmanship and warranty details.' },
];

export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
      <SectionHeading eyebrow="Process" title="A clear path from inspection to lasting protection." description="Our process is structured, transparent and built around quality rather than quick fixes." />
      <div className="mt-12 grid gap-6 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.title} className="relative rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-sm font-semibold text-cyan-700">
              0{index + 1}
            </div>
            <h3 className="font-display text-xl font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
