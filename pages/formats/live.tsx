import axios from 'axios';
import Link from 'next/link';
import MatchCard from '../../components/MatchCard';
import Navbar from '../../components/Navbar';

type Match = any;

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

export default function LiveMatches({ matches }: { matches: Match[] }) {
  // Filter out completed matches that are incorrectly marked as live
  const filteredMatches = matches.filter((match: any) => !isActuallyCompleted(match));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-gray-100 w-full overflow-x-hidden">
      <Navbar />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-100 flex items-center">
            <span className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full mr-2 sm:mr-3 animate-pulse shadow-lg"></span>
            Live Cricket Matches
          </h1>
          <Link href="/" className="group text-emerald-400 hover:text-emerald-300 text-sm sm:text-base font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-6">
          {filteredMatches && filteredMatches.length > 0 ? (
            filteredMatches.map((match: any) => (
              <Link key={match.matchId} href={`/matches/${match.matchId}`}>
                <div className="block cursor-pointer">
                  <MatchCard match={match} isLive={true} isCompleted={false} isUpcoming={false} />
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 text-center border border-slate-700">
              <div className="relative mb-6 sm:mb-8">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-red-900 to-red-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-200 mb-3 sm:mb-4 px-2">No Live Matches Right Now</h3>
              <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg max-w-md mx-auto px-4">There are currently no live cricket matches. Check back soon for live action or explore upcoming matches!</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                <Link href="/formats/upcoming" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg">
                  View Upcoming Matches
                </Link>
                <Link href="/formats/recent" className="bg-slate-700 hover:bg-slate-600 text-gray-200 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg border border-slate-600">
                  Recent Results
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
    const res = await axios.get(`${apiUrl}/api/matches/live`);
    const matches = Array.isArray(res.data) ? res.data : [];
    return { props: { matches } };
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return { props: { matches: [] } };
  }
}
