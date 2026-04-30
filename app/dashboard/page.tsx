'use client';
import { api } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get('/api/stats', { withCredentials: true })
      .then(res => setStats(res.data.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <div className="p-8">Loading Metrics...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">System Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <p className="text-black">Total Profiles</p>
          <p className="text-4xl font-bold text-blue-600">{stats.counts.profiles}</p>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <p className="text-black">System Users</p>
          <p className="text-4xl font-bold text-green-600">{stats.counts.users}</p>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mt-12 mb-4">Recent Profiles</h2>
      <ul className="divide-y border rounded-lg bg-white">
        {stats.recent.map((p: any) => (
          <li key={p.id} className="p-4 flex justify-between">
            <span className="text-black">{p.name}</span>
            <span className="text-black text-sm">{new Date(p.created_at).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}