'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError('Incorrect email or password.');
      setIsSubmitting(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-midnight px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <a
            href="/"
            style={{ fontFamily: 'var(--font-logo)' }}
            className="text-2xl tracking-wide text-warm-white"
          >
            Go Pacific Travel
          </a>
          <p className="mt-3 text-xs font-light tracking-widest uppercase text-sand-400">
            Admin Sign In
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-light tracking-widest uppercase text-sand-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-sand-700 px-4 py-3 text-warm-white placeholder:text-sand-600 focus:outline-none focus:border-gold transition-colors"
              placeholder="you@gopacific.ph"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-light tracking-widest uppercase text-sand-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-sand-700 px-4 py-3 text-warm-white placeholder:text-sand-600 focus:outline-none focus:border-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-terracotta" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 text-sm font-light tracking-widest uppercase bg-gold text-midnight hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}
