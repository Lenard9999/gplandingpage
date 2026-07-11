import { notFound } from 'next/navigation';
import PackageForm from '@/components/admin/PackageForm';
import { createClient } from '@/lib/supabase/server';
import type { PackageRow } from '@/lib/supabase/types';
import { updatePackage } from '../../actions';

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: pkg } = await supabase
    .from('packages')
    .select('*')
    .eq('id', id)
    .single<PackageRow>();

  if (!pkg) {
    notFound();
  }

  const updatePackageWithId = updatePackage.bind(null, id);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-light text-warm-white mb-10">
        Edit Package
      </h1>
      <PackageForm action={updatePackageWithId} initialData={pkg} submitLabel="Save Changes" />
    </div>
  );
}
