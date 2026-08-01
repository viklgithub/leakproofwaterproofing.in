import SectionHeading from '@/components/SectionHeading';

const items = [
  { title: 'Terrace protection', copy: 'A durable, weather-ready system for exposed roof surfaces and leak-prone corners.' },
  { title: 'Bathroom detailing', copy: 'Carefully sealed wet areas designed to stop seepage and protect internal finishes.' },
  { title: 'Basement resilience', copy: 'A robust moisture barrier for walls and floors in below-grade spaces.' },
];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
      <SectionHeading eyebrow="Recent work" title="Premium waterproofing with a refined finish." description="Every project is completed with care for both performance and presentation." />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            <div className="h-48 bg-gradient-to-br from-cyan-200/40 via-blue-500/15 to-slate-900/10" />
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
