import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

type Team = {
  teamId: string;
  name: string;
  country?: string;
};

export default function DomesticTeams({ teams }: { teams: Team[] }) {
  return (
    <div className="min-h-screen bg-gray-900 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-100 flex items-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Domestic Teams
          </h1>
          <Link href="/teams" className="group text-green-500 hover:text-green-400 text-sm sm:text-base font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Teams
          </Link>
        </div>
        
        {teams && teams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {teams.map((team) => (
              <div key={team.teamId} className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-green-500 hover:scale-105">
                <h3 className="text-base sm:text-lg font-bold text-gray-100 mb-2 sm:mb-3 truncate">{team.name}</h3>
                {team.country && (
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Country: <span className="font-medium">{team.country}</span></p>
                )}
                <Link 
                  href={`/teams/${team.teamId}`} 
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
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-3 sm:mb-4 px-2">No Domestic Teams Available</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2 max-w-md mx-auto">Domestic team data is currently being synced. Please check back later!</p>
            <Link href="/teams" className="bg-green-500 hover:bg-green-400 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
              Back to Teams
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
    const res = await axios.get(`${apiUrl}/api/teams`);
    const teams = Array.isArray(res.data) ? res.data : [];
    // Filter for domestic teams - this is a placeholder implementation
    // In a real implementation, you would filter based on team properties
    const domesticTeams = teams.filter((team: Team) => 
      team.name.toLowerCase().includes('domestic') || 
      team.name.toLowerCase().includes('state') ||
      team.name.toLowerCase().includes('county') ||
      team.name.toLowerCase().includes('league') ||
      team.name.toLowerCase().includes('district')
    );
    return { props: { teams: domesticTeams } };
  } catch (error) {
    console.error('Error fetching domestic teams:', error);
    return { props: { teams: [] } };
  }
}
