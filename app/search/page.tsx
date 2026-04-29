'use client';
import { useState } from 'react';
import axios from 'axios';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.get(`http://localhost:8000/api/profiles/search`, {
                params: { q: query },
                withCredentials: true
            });
            setResults(res.data.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Search failed');
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Search Profiles</h1>
            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Try 'male above 20' or 'young adult in Nigeria'..."
                    className="flex-1 p-3 border rounded-lg text-black bg-white"
                />
                <button className="bg-blue-600 px-6 py-2 rounded-lg text-white font-medium">
                    Search
                </button>
            </form>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="grid gap-4">
                {results.map((profile: any) => (
                    <div key={profile.id} className="p-4 border rounded-xl bg-gray-50 flex justify-between">
                        <div>
                            <p className="font-bold">{profile.name}</p>
                            <p className="text-sm text-gray-500">{profile.gender} | {profile.age} | {profile.country_name}</p>
                        </div>
                        <a href={`/profiles/${profile.id}`} className="text-blue-500 underline self-center">View</a>
                    </div>
                ))}
            </div>
        </div>
    );
}