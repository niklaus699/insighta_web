'use client'; // This must be the first line

import { api } from '@/lib/api';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      // 1. Post to the specialized web_callback route
      api.post('/auth/web/callback', { code })
        .then(() => {
          // 2. The backend sets cookies automatically. 
          // Just move to the dashboard.
          router.push('/dashboard');
        })
        .catch((err) => {
          console.error("Auth failed:", err);
          router.push('/login?error=auth_failed');
        });
    }
  }, [code, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-white text-black">
      <p className="animate-pulse">Authenticating with Insighta...</p>
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