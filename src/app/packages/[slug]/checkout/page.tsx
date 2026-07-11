import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/packages/CheckoutForm';
import { createPublicClient } from '@/lib/supabase/public';
import type { PackageRow } from '@/lib/supabase/types';
import { formatPHP } from '@/lib/format';
import { submitBooking } from './actions';

export const revalidate = 60;

export default async function CheckoutPage({
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

  const submitBookingForPackage = submitBooking.bind(null, slug);

  return (
    <main>
      <Navigation />
      <section className="pt-40 pb-24 md:pb-40 bg-warm-white min-h-screen">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <Link
            href={`/packages/${pkg.slug}`}
            className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-gold transition-colors mb-10 inline-block"
          >
            ← Back to Package
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
                Book Your Trip
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-charcoal mb-6">
                {pkg.title}
              </h1>
              <p className="text-slate/70 font-light leading-relaxed mb-8 max-w-lg">
                Submit your details below and our team will follow up by email to
                confirm availability and finalize your booking.
              </p>

              <dl className="space-y-4 max-w-sm text-sm">
                <div className="flex justify-between border-b border-sand-200 pb-4">
                  <dt className="text-charcoal/60">Destination</dt>
                  <dd className="text-charcoal">{pkg.destination}</dd>
                </div>
                <div className="flex justify-between border-b border-sand-200 pb-4">
                  <dt className="text-charcoal/60">Duration</dt>
                  <dd className="text-charcoal">{pkg.duration_days} days</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-charcoal/60">Price per pax</dt>
                  <dd className="text-charcoal">{formatPHP(pkg.price_php)}</dd>
                </div>
              </dl>
            </div>

            <CheckoutForm action={submitBookingForPackage} maxPax={pkg.max_pax} />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
