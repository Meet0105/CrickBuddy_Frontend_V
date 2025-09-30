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
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">{venue.name}</h1>
          <Link href="/" className="text-green-300 hover:text-green-400 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white mb-2">Venue Information</h2>
            {venue.location && (
              <p className="text-gray-300">Location: {venue.location}</p>
            )}
            {venue.capacity && (
              <p className="text-gray-300">Capacity: {venue.capacity.toLocaleString()}</p>
            )}
          </div>
        </div>

        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Venue Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="border border-gray-700 rounded p-3 text-center">
                  <p className="font-medium text-green-400">{stat.value}</p>
                  <p className="text-gray-300 text-sm">{stat.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matches Section */}
        {matches && matches.length > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-white mb-4">Recent Matches</h2>
            <div className="space-y-3">
              {matches.map((match) => (
                <div key={match.matchId} className="border border-gray-700 rounded p-3 hover:bg-gray-700 transition cursor-pointer">
                  <p className="font-medium text-green-400">{match.title}</p>
                  <p className="text-gray-300 text-sm">{new Date(match.date).toLocaleDateString()}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {match.teams.map((team, index) => (
                      <span key={index} className="px-2 py-1 bg-green-700 text-green-200 text-xs rounded">
                        {team}
                      </span>
                    ))}
                  </div>
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-700 text-blue-200 rounded">
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
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