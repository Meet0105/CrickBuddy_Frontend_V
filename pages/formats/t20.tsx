import axios from 'axios';
import Navbar from '../../components/Navbar';
import MatchCard from '../../components/MatchCard';
import Link from 'next/link';

export default function T20({ matches }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center md:text-left">
          T20 Matches
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {matches && matches.length ? matches.map(m => (
            <Link key={m.matchId} href={`/matches/${m.matchId}`}>
              <div className="bg-slate-800 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 cursor-pointer border-2 border-slate-700">
                <MatchCard match={m} />
              </div>
            </Link>
          )) : (
            <p className="text-gray-400 col-span-full text-center text-lg">
              No T20 matches found.
            </p>
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
