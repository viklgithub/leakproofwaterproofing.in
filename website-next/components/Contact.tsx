'use client';

import { FormEvent, useState } from 'react';

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
      <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.07)] md:grid-cols-[0.95fr_1.05fr] md:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-600">Get in touch</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-slate-900 sm:text-4xl">Let’s solve the leak before it spreads.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">Whether it’s a terrace issue, bathroom seepage or basement dampness, we’ll help you understand the best next step.</p>
          <div className="mt-8 space-y-3 text-base text-slate-700">
            <p><span className="font-semibold text-slate-900">Phone:</span> +91 98765 43210</p>
            <p><span className="font-semibold text-slate-900">Email:</span> hello@leakproofwaterproofing.in</p>
            <p><span className="font-semibold text-slate-900">Service area:</span> Pune and nearby locations</p>
            <p><span className="font-semibold text-slate-900">Hours:</span> Mon–Sat · 9:00 AM to 7:00 PM</p>
          </div>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full bg-cyan-500 px-5 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5">
            WhatsApp us now
          </a>
        </div>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          <label className="text-sm font-semibold text-slate-700">
            <span>Name</span>
            <input name="customerName" value={form.customerName} onChange={onChange} required className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0" placeholder="Rajesh Sharma" />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            <span>Phone</span>
            <input name="phone" value={form.phone} onChange={onChange} required className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0" placeholder="+91 98765 43210" />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={onChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0" placeholder="you@example.com" />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            <span>Property type</span>
            <select name="category" value={form.category} onChange={onChange} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
              <option>Residential</option>
              <option>Commercial</option>
              <option>Terrace / Roof</option>
              <option>Basement / Leakage</option>
              <option>Bathroom / Interior</option>
            </select>
          </label>
          <label className="md:col-span-2 text-sm font-semibold text-slate-700">
            <span>Requirement</span>
            <textarea name="requirement" value={form.requirement} onChange={onChange} required className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none" placeholder="Tell us about the issue and the area that needs attention." />
          </label>
          <button type="submit" disabled={status === 'submitting'} className="md:col-span-2 rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
            {status === 'submitting' ? 'Submitting...' : 'Request a site inspection'}
          </button>
          {message ? (
            <p className={`md:col-span-2 rounded-2xl px-4 py-3 text-sm ${status === 'success' ? 'bg-cyan-50 text-cyan-700' : 'bg-rose-50 text-rose-700'}`}>
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
