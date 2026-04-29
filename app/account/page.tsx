'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // You should have a /api/me endpoint in Flask that returns the current JWT user
    axios.get('http://localhost:8000/api/me', { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => window.location.href = '/login');
  }, []);

  if (!user) return <div className="p-8">Loading Account...</div>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Account</h1>
      <div className="bg-gray-50 rounded-2xl p-6 border flex items-center gap-6">
        <img src={user.avatar_url} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-blue-500" />
        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>
          <span className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
}