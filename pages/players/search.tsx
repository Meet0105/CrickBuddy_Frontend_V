import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../../components/Navbar';

type Player = {
  playerId: string;
  name: string;
  role: string;
  country: string;
};

export default function SearchPlayers({ initialPlayers, query }: { initialPlayers: Player[], query: any }) {
  const { plrN } = query;
  const [searchTerm, setSearchTerm] = useState(plrN?.toString() || '');
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
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
    <div className="bg-gray-900 min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400">Search Players</h1>
          <Link href="/" className="group text-green-300 hover:text-green-400 text-sm sm:text-base font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 border border-gray-700">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter player name..."
              className="flex-1 px-4 py-2.5 sm:py-2 bg-gray-700 border border-gray-600 rounded-xl sm:rounded-lg text-green-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg text-sm sm:text-base font-medium"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
        
        {players && players.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {players.map((player) => (
              <div key={player.playerId} className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-green-600 hover:scale-105">
                <h3 className="text-base sm:text-lg font-bold text-green-300 mb-2 sm:mb-3 truncate">{player.name}</h3>
                <p className="text-green-200 text-xs sm:text-sm mb-1">Role: <span className="font-medium">{player.role}</span></p>
                <p className="text-green-200 text-xs sm:text-sm mb-3 sm:mb-4">Country: <span className="font-medium">{player.country}</span></p>
                <Link href={`/players/${player.playerId}`} className="group text-green-300 hover:text-green-400 text-xs sm:text-sm font-medium flex items-center">
                  View Details
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 text-center border border-gray-700">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 text-green-400">🏏</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-300 mb-3 sm:mb-4 px-2">
              {searchTerm ? 'No Players Found' : 'Search for Players'}
            </h3>
            <p className="text-sm sm:text-base text-green-200 mb-6 sm:mb-8 px-2 max-w-md mx-auto">
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
      return { props: { initialPlayers: [], query } };
    }
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
    const res = await axios.get(`${apiUrl}/api/players/search?plrN=${encodeURIComponent(plrN)}`);
    const players = Array.isArray(res.data) ? res.data : res.data.players || [];
    
    return { props: { initialPlayers: players, query } };
  } catch (error) {
    console.error('Error searching players:', error);
    return { props: { initialPlayers: [], query } };
  }
}
