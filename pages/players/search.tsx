import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

type Player = {
  playerId: string;
  name: string;
  role: string;
  country: string;
};

export default function SearchPlayers({ initialPlayers }: { initialPlayers: Player[] }) {
  const router = useRouter();
  const { plrN } = router.query;
  const [searchTerm, setSearchTerm] = useState(plrN?.toString() || '');
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${apiUrl}/api/players/search?plrN=${encodeURIComponent(searchTerm)}`);
      const searchResults = Array.isArray(res.data) ? res.data : res.data.players || [];
      setPlayers(searchResults);
    } catch (error) {
      console.error('Error searching players:', error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">Search Players</h1>
          <Link href="/" className="text-green-300 hover:text-green-400 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter player name..."
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-green-100 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
        
        {players && players.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player) => (
              <div key={player.playerId} className="bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition">
                <h3 className="text-lg font-bold text-green-300 mb-2">{player.name}</h3>
                <p className="text-green-200 text-sm mb-1">Role: {player.role}</p>
                <p className="text-green-200 text-sm mb-3">Country: {player.country}</p>
                <Link 
                  href={`/players/${player.playerId}`} 
                  className="text-green-300 hover:text-green-400 text-sm font-medium"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow p-8 text-center">
            <div className="text-5xl mb-4 text-green-400">🏏</div>
            <h3 className="text-xl font-bold text-green-300 mb-2">
              {searchTerm ? 'No Players Found' : 'Search for Players'}
            </h3>
            <p className="text-green-200 mb-4">
              {searchTerm 
                ? `No players found matching "${searchTerm}". Try a different search term.` 
                : 'Enter a player name in the search box above to find players.'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps({ query }: { query: { plrN?: string } }) {
  try {
    const { plrN } = query;
    if (!plrN) {
      return { props: { initialPlayers: [] } };
    }
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await axios.get(`${apiUrl}/api/players/search?plrN=${encodeURIComponent(plrN)}`);
    const players = Array.isArray(res.data) ? res.data : res.data.players || [];
    
    return { props: { initialPlayers: players } };
  } catch (error) {
    console.error('Error searching players:', error);
    return { props: { initialPlayers: [] } };
  }
}