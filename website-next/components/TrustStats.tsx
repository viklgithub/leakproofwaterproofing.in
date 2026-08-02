export default function TrustStats() {
  const stats = [
    { value: '100+', label: 'Properties protected' },
    { value: '5+', label: 'Years of experience' },
    { value: '4.9/5', label: 'Average client rating' },
  ];

  return (
    <section className="mx-auto -mt-10 max-w-7xl px-5 md:px-8">
      <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.07)] backdrop-blur md:grid-cols-3 md:p-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-slate-50 p-5 text-center">
            <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
