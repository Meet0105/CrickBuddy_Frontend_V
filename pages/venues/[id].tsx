import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

type Venue = {
  venueId: string;
  name: string;
  location?: string;
  capacity?: number;
};

type Match = {
  matchId: string;
  title: string;
  date: string;
  teams: string[];
  status: string;
};

type Stat = {
  name: string;
  value: string;
};

export default function VenueDetails({ venue, matches, stats }: { 
  venue: Venue, 
  matches: Match[], 
  stats: Stat[] 
}) {
  if (!venue) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-4 text-green-400">🏟️</div>
            <h3 className="text-xl font-bold text-white mb-2">Venue Not Found</h3>
            <p className="text-gray-300 mb-4">The requested venue could not be found.</p>
            <Link href="/" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400 break-words">{venue.name}</h1>
          <Link href="/" className="group text-green-300 hover:text-green-400 text-sm sm:text-base font-medium flex items-center flex-shrink-0">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 border border-gray-700">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4">Venue Information</h2>
          <div className="space-y-2">
            {venue.location && (
              <p className="text-sm sm:text-base text-gray-300"><span className="font-medium text-green-400">Location:</span> {venue.location}</p>
            )}
            {venue.capacity && (
              <p className="text-sm sm:text-base text-gray-300"><span className="font-medium text-green-400">Capacity:</span> {venue.capacity.toLocaleString()}</p>
            )}
          </div>
        </div>

        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 border border-gray-700">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 sm:mb-6">Venue Statistics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:border-green-400 transition-colors">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">{stat.value}</p>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1">{stat.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matches Section */}
        {matches && matches.length > 0 && (
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 border border-gray-700">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 sm:mb-6">Recent Matches</h2>
            <div className="space-y-3 sm:space-y-4">
              {matches.map((match) => (
                <div key={match.matchId} className="border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-gray-700/50 hover:border-green-400 transition-all cursor-pointer">
                  <p className="text-sm sm:text-base font-bold text-green-400 mb-1">{match.title}</p>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2">{new Date(match.date).toLocaleDateString()}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                    {match.teams.map((team, index) => (
                      <span key={index} className="px-2 py-1 bg-green-700 text-green-200 text-xs sm:text-sm rounded-full">
                        {team}
                      </span>
                    ))}
                  </div>
                  <span className="inline-block mt-2 px-2.5 py-1 text-xs sm:text-sm bg-blue-700 text-blue-200 rounded-full">
                    {match.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
    
    // Fetch venue info
    let venueInfo: any = null;
    try {
      const venueRes = await axios.get(`${apiUrl}/api/venues/${params.id}/info`);
      venueInfo = venueRes.data;
    } catch (error) {
      console.log('Error fetching venue info:', error);
    }
    
    // Extract venue details
    const venue = {
      venueId: params.id,
      name: venueInfo?.name || 'Unknown Venue',
      location: venueInfo?.location || venueInfo?.city || '',
      capacity: venueInfo?.capacity || 0
    };
    
    // Fetch venue matches
    let matches = [];
    try {
      const matchesRes = await axios.get(`${apiUrl}/api/venues/${params.id}/matches`);
      matches = Array.isArray(matchesRes.data) ? matchesRes.data : matchesRes.data.matches || [];
    } catch (error) {
      console.log('Error fetching venue matches:', error);
    }
    
    // Fetch venue stats
    let stats = [];
    try {
      const statsRes = await axios.get(`${apiUrl}/api/venues/${params.id}/stats`);
      stats = Array.isArray(statsRes.data) ? statsRes.data : statsRes.data.stats || [];
    } catch (error) {
      console.log('Error fetching venue stats:', error);
    }
    
    return { 
      props: { 
        venue,
        matches: Array.isArray(matches) ? matches.slice(0, 10) : [], // Limit to 10 items
        stats: Array.isArray(stats) ? stats : [] 
      } 
    };
  } catch (error) {
    console.error('Error fetching venue:', error);
    return { props: { venue: null, matches: [], stats: [] } };
  }
}