'use client';
import { api } from '@/lib/api';
import { useState } from 'react';
import Link from 'next/link';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // FIX: Point to the /search endpoint and use 'q' param
            const res = await api.get('/api/profiles/search', {
                params: { q: query }
            });
            setResults(res.data.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Search failed');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto text-black">
            <h1 className="text-3xl font-bold mb-6">Search Profiles</h1>
            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Try 'male above 20' or 'young adult in Nigeria'..."
                    className="flex-1 p-3 border rounded-lg bg-white border-gray-300"
                />
                <button className="bg-blue-600 px-6 py-2 rounded-lg text-white font-medium hover:bg-blue-700">
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}

            <div className="grid gap-4">
                {results.map((profile: any) => (
                    <div key={profile.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex justify-between items-center shadow-sm">
                        <div>
                            <p className="font-bold text-lg">{profile.name}</p>
                            <p className="text-sm text-gray-600">
                                {profile.gender} • {profile.age} years old • {profile.country_name}
                            </p>
                        </div>
                        <Link 
                            href={`/profiles/${profile.id}`} 
                            className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
                {!loading && query && results.length === 0 && !error && (
                    <p className="text-gray-500 text-center py-10">No profiles found matching that query.</p>
                )}
            </div>
        </div>
    );
}