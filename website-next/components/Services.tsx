import SectionHeading from '@/components/SectionHeading';
import { HomeIcon, BathIcon, BuildingIcon, TankIcon, RollerIcon, InjectIcon, LayersIcon, FlaskIcon, ArrowRightIcon } from '@/components/Icons';

const services = [
  { title: 'Waterproofing', description: 'Complete waterproofing for terraces, roofs, bathrooms, basements and tanks with durable, site-tested systems.', Icon: HomeIcon },
  { title: 'Painting', description: 'Protective and decorative painting with premium paints and putty for a clean, long-lasting finish.', Icon: RollerIcon },
  { title: 'Infrared Thermography', description: 'Advanced thermal imaging to detect hidden moisture, seepage and structural issues without damage.', Icon: FlaskIcon },
  { title: 'Grouting', description: 'Precision grouting to seal cracks, joints and voids and restore structural integrity.', Icon: InjectIcon },
  { title: 'Epoxy Flooring Services', description: 'High-performance epoxy flooring for industrial, commercial and residential spaces that resists wear and chemicals.', Icon: LayersIcon },
  { title: 'Civil Works', description: 'Reliable civil repair and restoration work that supports long-term structural health.', Icon: BuildingIcon },
  { title: 'Waterproofing Consultant', description: 'Expert guidance on the right waterproofing system, materials and detailing for your project.', Icon: TankIcon },
  { title: 'Chemical Sales', description: 'Genuine waterproofing chemicals and construction materials supplied at competitive prices.', Icon: FlaskIcon },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-20 md:py-28">
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Services" title="Protection engineered for real-world conditions." description="Every project is handled with a precise, site-specific approach so the waterproofing performs long after installation." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="card-hover group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-soft hover:border-blue-200 hover:shadow-glow"
            >
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-amber-400 transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md transition-transform group-hover:scale-110">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition-colors group-hover:text-cyan-600">
                Request assessment
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}