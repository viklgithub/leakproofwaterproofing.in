import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

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
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
