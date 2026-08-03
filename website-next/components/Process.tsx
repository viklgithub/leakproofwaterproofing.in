import SectionHeading from '@/components/SectionHeading';
import { SearchIcon, ClipboardIcon, RollerIcon, CheckBadgeIcon } from '@/components/Icons';

const steps = [
  { title: 'Inspection', body: 'We inspect the source of leakage and identify whether the issue is surface, structural or moisture-related.', Icon: SearchIcon },
  { title: 'Free Quote', body: 'You receive a clear scope, material plan and estimated timeline before work starts.', Icon: ClipboardIcon },
  { title: 'Waterproofing', body: 'We prepare the substrate and apply the right system layer by layer for durability.', Icon: RollerIcon },
  { title: 'Final Quality Check', body: 'The finished area is tested, cleaned and handed over with visible workmanship and warranty details.', Icon: CheckBadgeIcon },
];

export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
      <SectionHeading eyebrow="Process" title="A clear path from inspection to lasting protection." description="Our process is structured, transparent and built around quality rather than quick fixes." />
      <div className="relative mt-14 grid gap-8 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-blue-200 via-cyan-200 to-amber-200 lg:block" aria-hidden="true" />
        {steps.map(({ title, body, Icon }, index) => (
          <div key={title} className="relative">
            <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-glow">
              <Icon className="h-7 w-7" />
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-900 shadow">
                {index + 1}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900">{title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
