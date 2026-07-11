'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { PackageRow } from '@/lib/supabase/types';

export type PackageFormState = { error: string } | undefined;

type PackageInput = Omit<PackageRow, 'id' | 'created_at' | 'updated_at'>;

function parsePackageForm(formData: FormData): PackageInput {
  const priceInPesos = Number(formData.get('price_pesos'));

  return {
    slug: String(formData.get('slug') ?? '').trim(),
    title: String(formData.get('title') ?? '').trim(),
    destination: String(formData.get('destination') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    itinerary: String(formData.get('itinerary') ?? '').trim(),
    inclusions: String(formData.get('inclusions') ?? '').trim(),
    duration_days: Number(formData.get('duration_days')),
    max_pax: Number(formData.get('max_pax')),
    price_php: Math.round(priceInPesos * 100),
    image_url: String(formData.get('image_url') ?? '').trim() || null,
    supplier_name: String(formData.get('supplier_name') ?? '').trim() || null,
    is_active: formData.get('is_active') === 'on',
    featured: formData.get('featured') === 'on',
  };
}

export async function createPackage(
  _prevState: PackageFormState,
  formData: FormData
): Promise<PackageFormState> {
  const supabase = await createClient();
  const payload = parsePackageForm(formData);

  const { error } = await supabase.from('packages').insert(payload);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin');
  redirect('/admin');
}

export async function updatePackage(
  id: string,
  _prevState: PackageFormState,
  formData: FormData
): Promise<PackageFormState> {
  const supabase = await createClient();
  const payload = parsePackageForm(formData);

  const { error } = await supabase.from('packages').update(payload).eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin');
  redirect('/admin');
}
