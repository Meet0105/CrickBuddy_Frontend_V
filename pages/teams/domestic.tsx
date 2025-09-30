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
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-100">Domestic Teams</h1>
          <Link href="/teams" className="text-green-500 hover:text-green-400 text-sm font-medium">
            ← Back to Teams
          </Link>
        </div>
        
        {teams && teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div key={team.teamId} className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-colors">
                <h3 className="text-lg font-bold text-gray-100 mb-2">{team.name}</h3>
                {team.country && (
                  <p className="text-gray-400 text-sm mb-3">Country: {team.country}</p>
                )}
                <Link 
                  href={`/teams/${team.teamId}`} 
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
            <h3 className="text-xl font-bold text-gray-100 mb-2">No Domestic Teams Available</h3>
            <p className="text-gray-400 mb-4">Domestic team data is currently being synced. Please check back later!</p>
            <Link href="/teams" className="bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 rounded-lg inline-block transition-colors">
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
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