import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { PackageRow } from '@/lib/supabase/types';
import { formatPHP } from '@/lib/format';

export default async function AdminPackagesPage() {
  const supabase = await createClient();
  const { data: packages, error } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false })
    .returns<PackageRow[]>();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-light text-warm-white">
          Tour Packages
        </h1>
        <Link
          href="/admin/packages/new"
          className="px-5 py-2.5 text-sm font-light tracking-widest uppercase bg-gold text-midnight hover:bg-gold-light transition-colors"
        >
          Add Package
        </Link>
      </div>

      {error && (
        <p className="text-sm text-terracotta" role="alert">
          Failed to load packages: {error.message}
        </p>
      )}

      {!error && packages && packages.length === 0 && (
        <p className="text-sand-400">No packages yet. Add your first one above.</p>
      )}

      {!error && packages && packages.length > 0 && (
        <div className="overflow-x-auto border border-sand-800">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-sand-800 text-xs tracking-widest uppercase text-sand-400">
                <th className="px-5 py-4 font-light">Title</th>
                <th className="px-5 py-4 font-light">Destination</th>
                <th className="px-5 py-4 font-light">Duration</th>
                <th className="px-5 py-4 font-light">Price</th>
                <th className="px-5 py-4 font-light">Status</th>
                <th className="px-5 py-4 font-light" />
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-b border-sand-800 last:border-b-0 text-warm-white">
                  <td className="px-5 py-4">
                    {pkg.title}
                    {pkg.featured && (
                      <span className="ml-2 text-xs tracking-widest uppercase text-gold">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sand-300">{pkg.destination}</td>
                  <td className="px-5 py-4 text-sand-300">{pkg.duration_days}d</td>
                  <td className="px-5 py-4 text-sand-300">{formatPHP(pkg.price_php)}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        pkg.is_active
                          ? 'text-sage text-xs tracking-widest uppercase'
                          : 'text-sand-600 text-xs tracking-widest uppercase'
                      }
                    >
                      {pkg.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/packages/${pkg.id}/edit`}
                      className="text-xs tracking-widest uppercase text-sand-300 hover:text-gold transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
