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
    <div className="bg-gray-900 min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400 flex items-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Trending Players
          </h1>
          <Link href="/" className="group text-green-300 hover:text-green-400 text-sm sm:text-base font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        {players && players.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {players.map((player, index) => (
              <div key={player.playerId} className="relative bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-green-600 hover:scale-105">
                {index < 3 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                    {index + 1}
                  </div>
                )}
                <h3 className="text-base sm:text-lg font-bold text-green-300 mb-2 sm:mb-3 truncate">{player.name}</h3>
                <div className="space-y-1 mb-3 sm:mb-4">
                  <p className="text-green-200 text-xs sm:text-sm">Role: <span className="font-medium">{player.role}</span></p>
                  <p className="text-green-200 text-xs sm:text-sm">Country: <span className="font-medium">{player.country}</span></p>
                  {player.rating && (
                    <p className="text-xs sm:text-sm font-bold text-yellow-400 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Rating: {player.rating}
                    </p>
                  )}
                </div>
                <Link 
                  href={`/players/${player.playerId}`} 
                  className="group text-green-300 hover:text-green-400 text-xs sm:text-sm font-medium flex items-center"
                >
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
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-300 mb-3 sm:mb-4 px-2">No Trending Players Available</h3>
            <p className="text-sm sm:text-base text-green-200 mb-6 sm:mb-8 px-2 max-w-md mx-auto">Player data is currently being synced. Please check back later!</p>
            <Link href="/" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
    
    // Fetch trending players
    const res = await axios.get(`${apiUrl}/api/players/trending`);
    const players = Array.isArray(res.data) ? res.data : res.data.players || [];
    
    return { props: { players } };
  } catch (error) {
    console.error('Error fetching trending players:', error);
    return { props: { players: [] } };
  }
}
