import SectionHeading from '@/components/SectionHeading';

const features = [
  { title: 'Licensed professionals', body: 'Work is handled by experienced hands with a focus on correct detailing and long-term performance.' },
  { title: 'Premium materials', body: 'We use systems chosen for durability, resistance and clean application in real site conditions.' },
  { title: 'Fast response', body: 'Quick site visits and clear communication help you act before minor leakage becomes major damage.' },
  { title: 'Warranty-backed', body: 'Every treatment is delivered with a dependable scope and the confidence of a proper guarantee.' },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
      <SectionHeading eyebrow="Why choose us" title="Built on trust, precision and long-term protection." description="We combine skilled execution with clear communication so your project feels calm, controlled and expertly managed." />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
            <div className="mb-4 h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20" />
            <h3 className="font-display text-xl font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
