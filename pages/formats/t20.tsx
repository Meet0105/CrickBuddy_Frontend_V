import axios from 'axios';
import Navbar from '../../components/Navbar';
import MatchCard from '../../components/MatchCard';
import Link from 'next/link';

export default function T20({ matches }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-gray-100 w-full overflow-x-hidden">
      <Navbar />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-100 flex items-center">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            T20 Matches
          </h1>
          <Link href="/" className="group text-emerald-400 hover:text-emerald-300 text-sm sm:text-base font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {matches && matches.length ? matches.map(m => (
            <Link key={m.matchId} href={`/matches/${m.matchId}`}>
              <div className="block cursor-pointer">
                <MatchCard match={m} />
              </div>
            </Link>
          )) : (
            <div className="col-span-full bg-slate-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 text-center border border-slate-700">
              <div className="relative mb-6 sm:mb-8">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-orange-900 to-orange-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-200 mb-3 sm:mb-4 px-2">No T20 Matches Found</h3>
              <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg max-w-md mx-auto px-4">There are currently no T20 matches available. Check back later or explore other formats!</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                <Link href="/formats/live" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg">
                  View Live Matches
                </Link>
                <Link href="/" className="bg-slate-700 hover:bg-slate-600 text-gray-200 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg border border-slate-600">
                  Back to Home
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
    const res = await axios.get(`${apiUrl}/api/matches?format=T20`);
    return { props: { matches: res.data || [] } };
  } catch (error) {
    return { props: { matches: [] } };
  }
}
