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
    <div className="min-h-screen bg-gray-900 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-100 flex items-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Cricket Teams
          </h1>
          <Link href="/" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        {teams && teams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {teams.map((team) => (
              <div key={team.teamId || team.name} className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-green-400 hover:scale-105">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3 flex-shrink-0">
                    {team.raw?.imageId ? (
                      <img 
                        src={`https://static.cricbuzz.com/a/img/v1/192x192/i1/c${team.raw.imageId}/i.jpg`}
                        alt={team.flagImage?.alt || `${team.name} flag`}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.fallback-flag') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`fallback-flag absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center ${team.raw?.imageId ? 'hidden' : 'flex'}`}>
                      <span className="text-white font-bold text-xs sm:text-sm">
                        {team.name?.split(' ').map((word: string) => word.charAt(0)).join('').substring(0, 2) || 'T'}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-100 break-words flex-1">{team.name || 'Unknown Team'}</h3>
                </div>
                {team.country && (
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Country: <span className="font-medium">{team.country}</span></p>
                )}
                <Link 
                  href={`/teams/${team.teamId || 'unknown'}`} 
                  className="group text-green-400 hover:text-green-300 text-xs sm:text-sm font-medium flex items-center"
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
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-3 sm:mb-4 px-2">No Teams Available</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2 max-w-md mx-auto">Team data is currently being synced. Please check back later!</p>
            <Link href="/" className="bg-green-500 hover:bg-green-400 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
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
