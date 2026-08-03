import SectionHeading from '@/components/SectionHeading';
import { CheckBadgeIcon, MedalIcon, BoltIcon, ShieldIcon } from '@/components/Icons';

const features = [
  { title: 'Licensed professionals', body: 'Work is handled by experienced hands with a focus on correct detailing and long-term performance.', Icon: CheckBadgeIcon },
  { title: 'Premium materials', body: 'We use systems chosen for durability, resistance and clean application in real site conditions.', Icon: MedalIcon },
  { title: 'Fast response', body: 'Quick site visits and clear communication help you act before minor leakage becomes major damage.', Icon: BoltIcon },
  { title: 'Warranty-backed', body: 'Every treatment is delivered with a dependable scope and the confidence of a proper guarantee.', Icon: ShieldIcon },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
      <SectionHeading eyebrow="Why choose us" title="Built on trust, precision and long-term protection." description="We combine skilled execution with clear communication so your project feels calm, controlled and expertly managed." />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map(({ title, body, Icon }) => (
          <div
            key={title}
            className="card-hover group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-7 shadow-soft hover:border-blue-200 hover:shadow-glow"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-400/10 transition-transform group-hover:scale-150" aria-hidden="true" />
            <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md transition-transform group-hover:-translate-y-1">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="relative font-display text-xl font-bold text-slate-900">{title}</h3>
            <p className="relative mt-3 text-base leading-7 text-slate-600">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
