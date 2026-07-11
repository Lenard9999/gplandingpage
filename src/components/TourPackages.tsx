import Link from 'next/link';
import { createPublicClient } from '@/lib/supabase/public';
import type { PackageRow } from '@/lib/supabase/types';
import { formatPHP } from '@/lib/format';

export default async function TourPackages() {
  const supabase = createPublicClient();
  const { data: packages } = await supabase
    .from('packages')
    .select('*')
    .eq('is_active', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .returns<PackageRow[]>();

  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <section id="packages" className="py-24 md:py-40 bg-warm-white">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-16 md:mb-24">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Book With Us
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-light text-charcoal">
            Tour <span className="italic">Packages</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {packages.map((pkg) => (
            <Link
              key={pkg.id}
              href={`/packages/${pkg.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-sand-100">
                {pkg.image_url && (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url('${pkg.image_url}')` }}
                  />
                )}
                {pkg.featured && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 text-xs tracking-widest uppercase bg-gold text-midnight">
                    Featured
                  </span>
                )}
              </div>
              <span className="text-gold text-xs tracking-[0.2em] uppercase mb-2">
                {pkg.destination}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light text-charcoal mb-2 line-decoration self-start">
                {pkg.title}
              </h3>
              <p className="text-slate/70 font-light text-sm mb-4 line-clamp-2">
                {pkg.description}
              </p>
              <div className="mt-auto flex items-center justify-between text-sm">
                <span className="text-charcoal/70 font-light">
                  {pkg.duration_days} days
                </span>
                <span className="text-charcoal font-medium">
                  From {formatPHP(pkg.price_php)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
