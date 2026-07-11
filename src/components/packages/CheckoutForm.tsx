'use client';

import { useActionState } from 'react';
import type { BookingFormState } from '@/app/packages/[slug]/checkout/actions';

const inputClass =
  'w-full px-4 py-3 bg-warm-white border border-sand-200 text-charcoal font-light focus:outline-none focus:border-gold transition-colors';
const labelClass = 'block text-sm tracking-wide text-charcoal mb-2';

export default function CheckoutForm({
  action,
  maxPax,
}: {
  action: (state: BookingFormState, formData: FormData) => Promise<BookingFormState>;
  maxPax: number;
}) {
  const [state, formAction, isPending] = useActionState<BookingFormState, FormData>(
    action,
    undefined
  );

  if (state && 'success' in state) {
    return (
      <div className="bg-sand-50 p-8 md:p-12 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-light text-charcoal mb-4">
          Thank You
        </h2>
        <p className="text-slate/70 font-light">
          Your booking request has been sent. Our travel experts will reach out to
          confirm the details shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-sand-50 p-8 md:p-12 space-y-6">
      <div>
        <label htmlFor="customer_name" className={labelClass}>
          Your Name
        </label>
        <input id="customer_name" name="customer_name" required className={inputClass} placeholder="John Smith" />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone Number
        </label>
        <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="+63 9XX XXX XXXX" />
      </div>

      <div>
        <label htmlFor="pax_count" className={labelClass}>
          Number of Travelers
        </label>
        <input
          id="pax_count"
          name="pax_count"
          type="number"
          min={1}
          max={maxPax}
          defaultValue={1}
          required
          className={inputClass}
        />
      </div>

      {state?.error && (
        <p className="text-sm text-terracotta" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-8 py-4 bg-charcoal text-warm-white text-sm tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Submitting…' : 'Request This Booking'}
      </button>
    </form>
  );
}
