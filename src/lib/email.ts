import 'server-only';
import { Resend } from 'resend';

export const BOOKING_NOTIFICATION_EMAIL = 'helen@gopacific.ph';

export function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}
