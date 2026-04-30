'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function ProfileDetail() {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.get(`/api/profiles/${id}`, { withCredentials: true })
      .then(res => setProfile(res.data.data));
  }, [id]);

  if (!profile) return <div className="p-8">Loading Profile...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
        <p className="text-blue-600 font-medium mb-6">{profile.country_name} ({profile.country_id})</p>
        
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Age Group</span>
            <span className="font-semibold capitalize">{profile.age_group}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Gender</span>
            <span className="font-semibold capitalize">{profile.gender}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Confidence Score</span>
            <span className="font-semibold">{(profile.gender_probability * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}