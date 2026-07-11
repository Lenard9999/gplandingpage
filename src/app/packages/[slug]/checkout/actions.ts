'use server';

import { createPublicClient } from '@/lib/supabase/public';
import { createAdminClient } from '@/lib/supabase/admin';
import { getResendClient, BOOKING_NOTIFICATION_EMAIL } from '@/lib/email';
import { formatPHP } from '@/lib/format';
import type { PackageRow } from '@/lib/supabase/types';

export type BookingFormState = { error: string } | { success: true } | undefined;

export async function submitBooking(
  slug: string,
  _prevState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  const customerName = String(formData.get('customer_name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const paxCount = Number(formData.get('pax_count'));

  if (!customerName || !email || !phone || !Number.isFinite(paxCount) || paxCount < 1) {
    return { error: 'Please fill in all fields with a valid number of travelers.' };
  }

  const supabase = createPublicClient();
  const { data: pkg } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single<PackageRow>();

  if (!pkg) {
    return { error: 'This package is no longer available.' };
  }

  if (paxCount > pkg.max_pax) {
    return { error: `This package only allows up to ${pkg.max_pax} travelers.` };
  }

  const totalAmount = pkg.price_php * paxCount;

  const admin = createAdminClient();
  const { error: insertError } = await admin.from('bookings').insert({
    package_id: pkg.id,
    customer_name: customerName,
    email,
    phone,
    pax_count: paxCount,
    total_amount: totalAmount,
    status: 'pending',
  });

  if (insertError) {
    return { error: 'Something went wrong saving your booking. Please try again.' };
  }

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: 'Go Pacific Travel <onboarding@resend.dev>',
      to: BOOKING_NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `New Booking Inquiry: ${pkg.title}`,
      text: [
        `Package: ${pkg.title} (${pkg.destination})`,
        `Travelers: ${paxCount}`,
        `Total: ${formatPHP(totalAmount)}`,
        '',
        `Name: ${customerName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
      ].join('\n'),
    });
  } catch {
    return {
      error:
        'Your booking was saved, but we could not send the confirmation email. Please contact us directly at ' +
        BOOKING_NOTIFICATION_EMAIL,
    };
  }

  return { success: true };
}
