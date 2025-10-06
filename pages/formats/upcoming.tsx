import axios from 'axios';
import Link from 'next/link';
import MatchCard from '../../components/MatchCard';
import Navbar from '../../components/Navbar';

type Match = any;

// Helper function to determine if a match is actually live
const isActuallyLive = (match: any) => {
  if (match.isLive) return true;
  
  const status = match?.status || '';
  const lowerStatus = status.toLowerCase();
  
  // Check for live status patterns
  return lowerStatus.includes('live') ||
         lowerStatus.includes('in progress') ||
         lowerStatus.includes('innings break') ||
         lowerStatus.includes('rain delay') ||
         lowerStatus.includes('tea break') ||
         lowerStatus.includes('lunch break') ||
         lowerStatus.includes('drinks break');
};

// Helper function to determine if a match is actually completed
const isActuallyCompleted = (match: any) => {
  const status = match?.status || '';
  const lowerStatus = status.toLowerCase();
  
  // Check for completed status patterns
  return lowerStatus.includes('complete') ||
         lowerStatus.includes('finished') ||
         lowerStatus.includes('won') ||
         lowerStatus.includes('abandon') ||
         lowerStatus.includes('cancel') ||
         lowerStatus.includes('no result') ||
         lowerStatus.includes('tied') ||
         status === 'COMPLETED' ||
         status === 'ABANDONED' ||
         status === 'CANCELLED';
};

export default function UpcomingMatches({ matches }: { matches: Match[] }) {
  // Filter out matches that are actually live or completed
  const filteredMatches = matches.filter((match: any) => {
    return !isActuallyLive(match) && !isActuallyCompleted(match);
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-100">Upcoming Cricket Matches</h1>
          <Link href="/" className="text-green-400 hover:text-green-300 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
        
        <div className="space-y-6">
          {filteredMatches && filteredMatches.length > 0 ? (
            filteredMatches.map((match: any) => (
              <Link key={match.matchId} href={`/matches/${match.matchId}`}>
                <div className="block cursor-pointer mb-6">
                  <MatchCard match={match} isUpcoming={true} isLive={false} isCompleted={false} />
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">No Upcoming Matches</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">There are currently no upcoming cricket matches scheduled.</p>
              <Link href="/" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
                View Live Matches
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
    const res = await axios.get(`${apiUrl}/api/matches/upcoming?limit=20`);
    const matches = Array.isArray(res.data) ? res.data : [];
    return { props: { matches } };
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    return { props: { matches: [] } };
  }
}
