import SectionHeading from '@/components/SectionHeading';
import { HomeIcon, BathIcon, BuildingIcon } from '@/components/Icons';

const items = [
  { title: 'Terrace protection', copy: 'A durable, weather-ready system for exposed roof surfaces and leak-prone corners.', Icon: HomeIcon, gradient: 'from-blue-600 to-cyan-500' },
  { title: 'Bathroom detailing', copy: 'Carefully sealed wet areas designed to stop seepage and protect internal finishes.', Icon: BathIcon, gradient: 'from-cyan-500 to-blue-600' },
  { title: 'Basement resilience', copy: 'A robust moisture barrier for walls and floors in below-grade spaces.', Icon: BuildingIcon, gradient: 'from-blue-700 to-indigo-500' },
];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
      <SectionHeading eyebrow="Recent work" title="Premium waterproofing with a refined finish." description="Every project is completed with care for both performance and presentation." />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map(({ title, copy, Icon, gradient }) => (
          <article key={title} className="card-hover group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-soft hover:shadow-glow">
            <div className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${gradient} overflow-hidden`}>
              <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
              <Icon className="relative h-16 w-16 text-white/90 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
