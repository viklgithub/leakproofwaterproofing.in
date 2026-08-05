'use client';

import { FormEvent, useState } from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, WhatsAppIcon } from '@/components/Icons';

const initialState = {
  customerName: '',
  phone: '',
  email: '',
  category: 'Residential',
  requirement: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          address: '',
          notes: form.requirement,
          leadDate: new Date().toISOString().slice(0, 10),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'Submission failed');

      setStatus('success');
      setMessage('Thanks! Your inspection request has been received and added to the CRM.');
      setForm(initialState);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Submission failed.');
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
      <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-glow md:grid-cols-[0.95fr_1.05fr]">
        {/* Info panel */}
        <div className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-deep to-blue-950 p-8 text-white md:p-10">
          <div className="animate-blob absolute -right-16 top-10 h-56 w-56 rounded-full bg-blue-500/25 blur-3xl" aria-hidden="true" />
          <div className="animate-blob-slow absolute -bottom-10 left-0 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Get in touch
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Let&rsquo;s solve the leak before it spreads.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">Whether it&rsquo;s a terrace issue, bathroom seepage or basement dampness, we&rsquo;ll help you understand the best next step.</p>

            <div className="mt-8 space-y-4">
              {[
                { Icon: MapPinIcon, label: 'Sales Office', value: 'Navale Bridge, Pune, Maharashtra' },
                { Icon: PhoneIcon, label: 'Mobile', value: '+91 89282 99010' },
                { Icon: PhoneIcon, label: 'Office', value: '95294 46645 · 80805 62780' },
                { Icon: MailIcon, label: 'Email', value: 'leakproofwaterproofing213@gmail.com' },
                { Icon: ClockIcon, label: 'Hours', value: 'Mon–Sat · 9:00 AM to 7:00 PM · Serving Pune & nearby' },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="text-sm leading-6 text-slate-300">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://wa.me/918928299010" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
              </a>
              <a href="https://www.google.com/maps/place/Leakproof+waterproofing/@18.4579569,73.8373567,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc295c50a6d1525:0x820ee9158a06ebfa!8m2!3d18.4579569!4d73.8373567!16s%2Fg%2F11t4hgj0qd?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                <MapPinIcon className="h-4 w-4" /> Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 md:p-10">
          <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
            <label className="text-sm font-semibold text-slate-700">
              <span>Name</span>
              <input name="customerName" value={form.customerName} onChange={onChange} required className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100" placeholder="Rajesh Sharma" />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              <span>Phone</span>
              <input name="phone" value={form.phone} onChange={onChange} required className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100" placeholder="+91 89282 99010" />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              <span>Email</span>
              <input type="email" name="email" value={form.email} onChange={onChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100" placeholder="you@example.com" />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              <span>Property type</span>
              <select name="category" value={form.category} onChange={onChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Terrace / Roof</option>
                <option>Basement / Leakage</option>
                <option>Bathroom / Interior</option>
              </select>
            </label>
            <label className="md:col-span-2 text-sm font-semibold text-slate-700">
              <span>Requirement</span>
              <textarea name="requirement" value={form.requirement} onChange={onChange} required className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100" placeholder="Tell us about the issue and the area that needs attention." />
            </label>
            <button type="submit" disabled={status === 'submitting'} className="md:col-span-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-3.5 font-semibold text-slate-900 shadow-amber transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
              {status === 'submitting' ? 'Submitting...' : 'Request a site inspection'}
            </button>
            {message ? (
              <p className={`md:col-span-2 rounded-2xl px-4 py-3 text-sm ${status === 'success' ? 'bg-green-50 text-green-700' : 'bg-rose-50 text-rose-700'}`}>
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
