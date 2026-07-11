'use client';

import { useActionState } from 'react';
import type { PackageRow } from '@/lib/supabase/types';
import type { PackageFormState } from '@/app/admin/(dashboard)/packages/actions';

const inputClass =
  'w-full bg-transparent border border-sand-700 px-4 py-3 text-warm-white placeholder:text-sand-600 focus:outline-none focus:border-gold transition-colors';
const labelClass = 'block text-xs font-light tracking-widest uppercase text-sand-300 mb-2';

export default function PackageForm({
  action,
  initialData,
  submitLabel,
}: {
  action: (state: PackageFormState, formData: FormData) => Promise<PackageFormState>;
  initialData?: PackageRow;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState<PackageFormState, FormData>(
    action,
    undefined
  );

  return (
    <form action={formAction} className="space-y-8 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={initialData?.title}
            className={inputClass}
            placeholder="7-Day Palawan Explorer"
          />
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            required
            defaultValue={initialData?.slug}
            className={inputClass}
            placeholder="7-day-palawan-explorer"
          />
        </div>
      </div>

      <div>
        <label htmlFor="destination" className={labelClass}>
          Destination
        </label>
        <input
          id="destination"
          name="destination"
          required
          defaultValue={initialData?.destination}
          className={inputClass}
          placeholder="Palawan, Philippines"
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={initialData?.description}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="itinerary" className={labelClass}>
          Itinerary
        </label>
        <textarea
          id="itinerary"
          name="itinerary"
          required
          rows={5}
          defaultValue={initialData?.itinerary}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="inclusions" className={labelClass}>
          Inclusions
        </label>
        <textarea
          id="inclusions"
          name="inclusions"
          required
          rows={3}
          defaultValue={initialData?.inclusions}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="duration_days" className={labelClass}>
            Duration (days)
          </label>
          <input
            id="duration_days"
            name="duration_days"
            type="number"
            min={1}
            required
            defaultValue={initialData?.duration_days}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="max_pax" className={labelClass}>
            Max Pax
          </label>
          <input
            id="max_pax"
            name="max_pax"
            type="number"
            min={1}
            required
            defaultValue={initialData?.max_pax}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="price_pesos" className={labelClass}>
            Price (₱)
          </label>
          <input
            id="price_pesos"
            name="price_pesos"
            type="number"
            min={0}
            step="0.01"
            required
            defaultValue={initialData ? initialData.price_php / 100 : undefined}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="image_url" className={labelClass}>
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            defaultValue={initialData?.image_url ?? undefined}
            className={inputClass}
            placeholder="https://…"
          />
        </div>
        <div>
          <label htmlFor="supplier_name" className={labelClass}>
            Supplier Name
          </label>
          <input
            id="supplier_name"
            name="supplier_name"
            defaultValue={initialData?.supplier_name ?? undefined}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <label className="flex items-center gap-3 text-sm text-sand-300">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={initialData?.is_active ?? true}
            className="w-4 h-4 accent-gold"
          />
          Active
        </label>
        <label className="flex items-center gap-3 text-sm text-sand-300">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initialData?.featured ?? false}
            className="w-4 h-4 accent-gold"
          />
          Featured
        </label>
      </div>

      {state?.error && (
        <p className="text-sm text-terracotta" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-3 text-sm font-light tracking-widest uppercase bg-gold text-midnight hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
