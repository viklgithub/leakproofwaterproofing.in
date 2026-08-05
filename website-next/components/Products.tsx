import SectionHeading from '@/components/SectionHeading';
import { CheckBadgeIcon, DropletIcon } from '@/components/Icons';

const products = [
  'Waterproofing Chemicals',
  'Tile and Block Adhesives',
  'Integral Chemicals & Concrete Admix',
  'Polymers and Reinforcements',
  'Glass Fibre Mesh and Textile',
  'Polypropylene and Steel Fibre Reinforcement',
  'Sealants and Specialised Coatings',
  'Grouts and Floor Hardeners',
  'ACC Block and Bricks',
  'OPC and PPC Cement',
  'Paints and Putty',
  'APP, HDPE, SBS and All Types of Membranes',
];

const distributors = [
  'Dr. Fixit',
  'Roff',
  'Astral',
  'MYK Arment',
  'MYK Laticrete',
  'Fosroc',
  'Sika',
  'Penetron',
  'JSW Cement',
  'Ultratech Cement',
  'Shree Cement',
  'Bangar Cement',
  'Birla Super Cement',
  'STP & SPC',
  'Jubilant',
  'ALPHA',
  'Indigo',
  'Birger',
  'Birla Opus',
  'Asian Paints',
];

export default function Products() {
  return (
    <section id="products" className="relative overflow-hidden py-20 md:py-28">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Products" title="Quality materials, supplied and supported." description="We supply a complete range of waterproofing and construction materials, and we are authorised distributors of India&rsquo;s most trusted brands." />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Products we sell */}
          <div className="card-hover rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md">
              <DropletIcon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900">Products We Sell</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">A wide range of genuine materials for waterproofing, tiling, repair and construction.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {products.map((product) => (
                <li key={product} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
                  <CheckBadgeIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                  {product}
                </li>
              ))}
            </ul>
          </div>

          {/* Authorised distributors */}
          <div className="card-hover rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-soft">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 shadow-md">
              <CheckBadgeIcon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900">Authorised Distributor Of</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">Trusted brands we supply directly — same quality, right price.</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {distributors.map((brand) => (
                <span key={brand} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}