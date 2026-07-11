import Link from 'next/link';
import SignOutButton from '@/components/admin/SignOutButton';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-midnight">
      <header className="border-b border-sand-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link
              href="/admin"
              style={{ fontFamily: 'var(--font-logo)' }}
              className="text-xl tracking-wide text-warm-white"
            >
              Go Pacific Travel
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/admin"
                className="text-xs tracking-widest uppercase text-sand-300 hover:text-gold transition-colors"
              >
                Packages
              </Link>
            </nav>
          </div>
          <SignOutButton />
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-12">{children}</main>
    </div>
  );
}
