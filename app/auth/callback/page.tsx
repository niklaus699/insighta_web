'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      axios.post('http://localhost:8000/auth/web/callback', 
        { code }, 
        { withCredentials: true } // Crucial for receiving cookies
      )
      .then(() => router.push('/dashboard'))
      .catch(() => router.push('/login?error=auth_failed'));
    }
  }, [code, router]);

  return <div className="flex h-screen items-center justify-center">Authenticating...</div>;
}