export const dynamic = 'force-dynamic';
'use client';
import { api } from '@/lib/api';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      api.post('/auth/web/callback', { code })
        .then(() => router.push('/dashboard'))
        .catch(() => router.push('/login?error=auth_failed'));
    }
  }, [code, router]);

  return <div className="flex h-screen items-center justify-center">Authenticating...</div>;
}