import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

type Player = {
  playerId: string;
  name: string;
  role: string;
  country: string;
  rating: number;
};

export default function TrendingPlayers({ players }: { players: Player[] }) {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">Trending Players</h1>
          <Link href="/" className="text-green-300 hover:text-green-400 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
        
        {players && players.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {players.map((player) => (
              <div key={player.playerId} className="bg-gray-800 rounded-lg shadow p-6 hover:shadow-md transition">
                <h3 className="text-lg font-bold text-green-300 mb-2">{player.name}</h3>
                <p className="text-green-200 text-sm mb-1">Role: {player.role}</p>
                <p className="text-green-200 text-sm mb-3">Country: {player.country}</p>
                {player.rating && (
                  <p className="text-sm font-medium text-green-400 mb-3">Rating: {player.rating}</p>
                )}
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
            <h3 className="text-xl font-bold text-green-300 mb-2">No Trending Players Available</h3>
            <p className="text-green-200 mb-4">Player data is currently being synced. Please check back later!</p>
            <Link href="/" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Back to Home
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Fetch trending players
    const res = await axios.get(`${apiUrl}/api/players/trending`);
    const players = Array.isArray(res.data) ? res.data : res.data.players || [];
    
    return { props: { players } };
  } catch (error) {
    console.error('Error fetching trending players:', error);
    return { props: { players: [] } };
  }
}