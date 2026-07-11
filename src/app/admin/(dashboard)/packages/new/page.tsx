import PackageForm from '@/components/admin/PackageForm';
import { createPackage } from '../actions';

export default function NewPackagePage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-light text-warm-white mb-10">
        Add Package
      </h1>
      <PackageForm action={createPackage} submitLabel="Create Package" />
    </div>
  );
}
