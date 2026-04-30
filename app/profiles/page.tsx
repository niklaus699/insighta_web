'use client';
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';

export default function ProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState('');

  const fetchProfiles = async () => {
    const res = await api.get('/api/profiles', {
      params: { page, gender },
      withCredentials: true
    });
    setProfiles(res.data.data);
  };

  useEffect(() => { fetchProfiles(); }, [page, gender]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Profiles</h1>
      
      {/* Basic Filters */}
      <select 
        onChange={(e) => setGender(e.target.value)}
        className="border p-2 mb-4 rounded text-white"
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <div className="grid gap-4">
        {profiles.map((p: any) => (
          <div key={p.id} className="border p-4 rounded shadow-sm flex justify-between items-center">
            <span className='text-white'>{p.name}</span>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}