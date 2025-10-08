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

export default function RecentMatches({ matches }: { matches: Match[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-gray-100 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-100 flex items-center">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recent Matches
          </h1>
          <Link href="/" className="group text-emerald-400 hover:text-emerald-300 text-sm sm:text-base font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="grid gap-4 sm:gap-6">
          {matches && matches.length > 0 ? (
            matches.map((match: any) => {
              // Determine the correct status based on match data
              const actuallyLive = isActuallyLive(match);
              const actuallyCompleted = isActuallyCompleted(match);
              const actuallyUpcoming = !actuallyLive && !actuallyCompleted;
              
              return (
                <Link key={match.matchId} href={`/matches/${match.matchId}`}>
                  <div className="block cursor-pointer">
                    <MatchCard 
                      match={match} 
                      isLive={actuallyLive}
                      isUpcoming={actuallyUpcoming}
                      isCompleted={actuallyCompleted}
                    />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 text-center border border-slate-700">
              <div className="relative mb-6 sm:mb-8">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-green-900 to-green-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-200 mb-3 sm:mb-4 px-2">No Recent Matches</h3>
              <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg max-w-md mx-auto px-4">There are currently no recent cricket matches available. Check back later!</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                <Link href="/formats/live" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg">
                  View Live Matches
                </Link>
                <Link href="/formats/upcoming" className="bg-slate-700 hover:bg-slate-600 text-gray-200 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg border border-slate-600">
                  Upcoming Matches
                </Link>
              </div>
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
    const res = await axios.get(`${apiUrl}/api/matches/recent?limit=20`);
    const matches = Array.isArray(res.data) ? res.data : [];
    return { props: { matches } };
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    return { props: { matches: [] } };
  }
}
