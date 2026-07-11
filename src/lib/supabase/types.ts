export type BookingStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export interface PackageRow {
  id: string;
  slug: string;
  title: string;
  destination: string;
  description: string;
  itinerary: string;
  inclusions: string;
  duration_days: number;
  max_pax: number;
  price_php: number; // centavos
  image_url: string | null;
  supplier_name: string | null;
  is_active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookingRow {
  id: string;
  package_id: string;
  customer_name: string;
  email: string;
  phone: string;
  pax_count: number;
  total_amount: number; // centavos
  status: BookingStatus;
  paymongo_checkout_session_id: string | null;
  created_at: string;
  updated_at: string;
}
