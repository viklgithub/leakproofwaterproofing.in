import { WhatsAppIcon } from '@/components/Icons';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/918928299010"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-green-500 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_16px_50px_rgba(34,197,94,0.45)] transition-transform hover:-translate-y-0.5"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-green-500/40" aria-hidden="true" />
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
