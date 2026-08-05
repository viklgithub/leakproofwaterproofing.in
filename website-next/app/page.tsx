import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStats from '@/components/TrustStats';
import WhyUs from '@/components/WhyUs';
import Services from '@/components/Services';
import Products from '@/components/Products';
import Process from '@/components/Process';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsappFloat';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustStats />
      <WhyUs />
      <Services />
      <Products />
      <Process />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
