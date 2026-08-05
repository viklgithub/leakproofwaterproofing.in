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
  title: 'LeakProof Waterproofing | Waterproofing, Painting & Construction Materials in Pune',
  description: 'Waterproofing, painting, grouting, epoxy flooring, infrared thermography, civil works and waterproofing consultancy in Pune. Authorised distributor of Dr. Fixit, Sika, Fosroc, Astral and more.',
  keywords: ['waterproofing pune', 'terrace waterproofing', 'bathroom waterproofing', 'basement waterproofing', 'tank waterproofing', 'grouting', 'epoxy flooring', 'painting services pune', 'waterproofing chemicals', 'construction materials pune', 'Dr Fixit distributor', 'Sika distributor'],
  alternates: { canonical: 'https://leakproofwaterproofing.in/' },
  openGraph: {
    title: 'LeakProof Waterproofing | Waterproofing, Painting & Construction Materials in Pune',
    description: 'Waterproofing, painting, grouting, epoxy flooring and construction materials in Pune. Authorised distributor of leading brands.',
    type: 'website',
    url: 'https://leakproofwaterproofing.in/',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeakProof Waterproofing',
    description: 'Waterproofing, painting and construction materials in Pune. Authorised distributor of leading brands.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
