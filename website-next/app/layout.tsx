import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LeakProof Waterproofing | Premium Waterproofing in Pune',
  description: 'Professional terrace, bathroom, basement and tank waterproofing services in Pune with free inspection, warranty-backed work, and fast response.',
  keywords: ['waterproofing pune', 'terrace waterproofing', 'bathroom waterproofing', 'basement waterproofing', 'tank waterproofing'],
  alternates: { canonical: 'https://leakproofwaterproofing.in/' },
  openGraph: {
    title: 'LeakProof Waterproofing | Premium Waterproofing in Pune',
    description: 'Professional waterproofing services with trusted craftsmanship and fast site visits.',
    type: 'website',
    url: 'https://leakproofwaterproofing.in/',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeakProof Waterproofing',
    description: 'Premium waterproofing solutions for homes and commercial properties in Pune.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
