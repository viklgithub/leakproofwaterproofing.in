import { ShieldIcon, ClockIcon, StarIcon } from '@/components/Icons';

export default function TrustStats() {
  const stats = [
    { value: '100+', label: 'Properties protected', Icon: ShieldIcon },
    { value: '5+', label: 'Years of experience', Icon: ClockIcon },
    { value: '4.9/5', label: 'Average client rating', Icon: StarIcon },
  ];

  return (
    <section className="relative z-20 mx-auto -mt-12 max-w-6xl px-5 md:px-8">
      <div className="grid gap-4 rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-glow backdrop-blur-xl md:grid-cols-3 md:p-8">
        {stats.map(({ value, label, Icon }) => (
          <div
            key={label}
            className="group flex items-center gap-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 p-5 transition-colors hover:from-blue-50 hover:to-cyan-50"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md transition-transform group-hover:scale-110">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-3xl font-extrabold text-slate-900">{value}</p>
              <p className="mt-0.5 text-sm text-slate-600">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
