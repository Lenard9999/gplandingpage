import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { createPublicClient } from '@/lib/supabase/public';
import type { PackageRow } from '@/lib/supabase/types';
import { formatPHP } from '@/lib/format';

export const revalidate = 60;

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: pkg } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single<PackageRow>();

  if (!pkg) {
    notFound();
  }

  return (
    <main>
      <Navigation />
      <section className="pt-40 pb-24 md:pb-40 bg-warm-white min-h-screen">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <Link
            href="/#packages"
            className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-gold transition-colors mb-10 inline-block"
          >
            ← All Packages
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <div className="relative aspect-[4/3] overflow-hidden mb-10 bg-sand-100">
                {pkg.image_url && (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${pkg.image_url}')` }}
                  />
                )}
              </div>

              <span className="text-gold text-sm tracking-[0.2em] uppercase mb-3 block">
                {pkg.destination}
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-charcoal mb-6">
                {pkg.title}
              </h1>
              <p className="text-slate/80 font-light text-lg leading-relaxed mb-10">
                {pkg.description}
              </p>

              <div className="mb-10">
                <h2 className="text-xs tracking-widest uppercase text-charcoal/60 mb-3">
                  Itinerary
                </h2>
                <p className="text-slate/80 font-light leading-relaxed whitespace-pre-line">
                  {pkg.itinerary}
                </p>
              </div>

              <div>
                <h2 className="text-xs tracking-widest uppercase text-charcoal/60 mb-3">
                  Inclusions
                </h2>
                <p className="text-slate/80 font-light leading-relaxed whitespace-pre-line">
                  {pkg.inclusions}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-sand-50 p-8 md:p-10 lg:sticky lg:top-32">
                <div className="text-charcoal/60 text-sm mb-1">From</div>
                <div className="font-[family-name:var(--font-display)] text-4xl font-light text-charcoal mb-8">
                  {formatPHP(pkg.price_php)}
                  <span className="text-base text-charcoal/60"> / pax</span>
                </div>

                <dl className="space-y-4 mb-10 text-sm">
                  <div className="flex justify-between border-b border-sand-200 pb-4">
                    <dt className="text-charcoal/60">Duration</dt>
                    <dd className="text-charcoal">{pkg.duration_days} days</dd>
                  </div>
                  <div className="flex justify-between border-b border-sand-200 pb-4">
                    <dt className="text-charcoal/60">Max Group Size</dt>
                    <dd className="text-charcoal">{pkg.max_pax} pax</dd>
                  </div>
                  {pkg.supplier_name && (
                    <div className="flex justify-between">
                      <dt className="text-charcoal/60">Operated By</dt>
                      <dd className="text-charcoal">{pkg.supplier_name}</dd>
                    </div>
                  )}
                </dl>

                <Link
                  href={`/packages/${pkg.slug}/checkout`}
                  className="block w-full text-center px-8 py-4 bg-charcoal text-warm-white text-sm tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all duration-500"
                >
                  Book This Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
