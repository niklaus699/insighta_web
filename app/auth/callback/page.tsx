'use client'; // This must be the first line

import { api } from '@/lib/api';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// 1. Move logic into a sub-component
function AuthCallbackHandler() {
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

  return (
    <div className="flex h-screen items-center justify-center">
      Authenticating...
    </div>
  );
}

// 2. Wrap the handler in Suspense in the main export
export default function AuthCallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallbackHandler />
    </Suspense>
  );
}