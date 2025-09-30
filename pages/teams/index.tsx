import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

type Team = {
  teamId: string;
  name: string;
  country?: string;
  flagImage?: {
    url: string;
    alt: string;
  };
  raw?: {
    imageId?: string;
  };
};

export default function Teams({ teams }: { teams: Team[] }) {
  // Debug log to see what teams data we're receiving
  console.log('Teams data received count:', teams?.length || 0);
  
  // Additional debugging to check data structure
  if (teams && teams.length > 0) {
    console.log('First team structure:', JSON.stringify(teams[0], null, 2));
  }
  
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-100">Cricket Teams</h1>
          <Link href="/" className="text-green-400 hover:text-green-300 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
        
        {teams && teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div key={team.teamId || team.name} className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-colors">
                <div className="flex items-center mb-3">
                  <div className="relative w-10 h-10 mr-3">
                    {team.raw?.imageId ? (
                      <img 
                        src={`https://static.cricbuzz.com/a/img/v1/192x192/i1/c${team.raw.imageId}/i.jpg`}
                        alt={team.flagImage?.alt || `${team.name} flag`}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.fallback-flag') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`fallback-flag absolute inset-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center ${team.raw?.imageId ? 'hidden' : 'flex'}`}>
                      <span className="text-white font-bold text-xs">
                        {team.name?.split(' ').map((word: string) => word.charAt(0)).join('').substring(0, 2) || 'T'}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-100">{team.name || 'Unknown Team'}</h3>
                </div>
                {team.country && (
                  <p className="text-gray-400 text-sm mb-3">Country: {team.country}</p>
                )}
                <Link 
                  href={`/teams/${team.teamId || 'unknown'}`} 
                  className="text-green-400 hover:text-green-300 text-sm font-medium"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-4 text-green-400">🏏</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">No Teams Available</h3>
            <p className="text-gray-400 mb-4">Team data is currently being synced. Please check back later!</p>
            <Link href="/" className="bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 rounded-lg inline-block transition-colors">
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
    console.log('Fetching teams from:', `${apiUrl}/api/teams`);
    const res = await axios.get(`${apiUrl}/api/teams`);
    console.log('Teams API response count:', res.data?.length || 0);
    const teams = Array.isArray(res.data) ? res.data : [];
    console.log('Processed teams array count:', teams.length);
    return { props: { teams } };
  } catch (error) {
    console.error('Error fetching teams:', error);
    return { props: { teams: [] } };
  }
}