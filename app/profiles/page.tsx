'use client';
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState('');

  const fetchProfiles = async () => {
    try {
        const res = await api.get('/api/profiles', {
            params: { page, gender }
        });
        setProfiles(res.data.data);
    } catch (err) {
        console.error("Failed to fetch profiles", err);
    }
  };

  useEffect(() => { fetchProfiles(); }, [page, gender]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Profiles</h1>
      
      <div className="flex gap-4 mb-6">
        <select 
            onChange={(e) => { setGender(e.target.value); setPage(1); }}
            className="border border-gray-300 p-2 rounded bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
        >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
      </div>

      <div className="grid gap-4">
        {profiles.map((p: any) => (
          <div key={p.id} className="border border-gray-200 p-4 rounded-xl shadow-sm flex justify-between items-center bg-white">
            <div className="flex flex-col">
                <span className='font-semibold text-gray-900'>{p.name}</span>
                <span className='text-sm text-gray-500'>{p.country_name}</span>
            </div>
            <Link 
                href={`/profiles/${p.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}