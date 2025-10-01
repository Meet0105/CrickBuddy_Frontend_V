import axios from 'axios';
import Navbar from '../../components/Navbar';
import MatchCard from '../../components/MatchCard';
import Link from 'next/link';

export default function ODI({ matches, error }: any) {
  // Debugging: Log the data to see what we're receiving
  console.log('ODI Page - Matches data:', matches);
  console.log('ODI Page - Error:', error);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center md:text-left">
          ODI Matches
        </h1>
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-bold text-red-200 mb-2">Error Loading Data</h2>
            <p className="text-red-100">{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {matches && matches.length > 0 ? (
            matches.map((m: any) => (
              <Link key={m.matchId || m.id || Math.random()} href={`/matches/${m.matchId || m.id}`}>
                <div className="bg-slate-800 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 cursor-pointer border-2 border-slate-700">
                  <MatchCard match={m} />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-5xl mb-4">🏏</div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">No ODI Matches Found</h3>
              <p className="text-gray-500 mb-4">There are currently no ODI matches available.</p>
              <div className="bg-gray-800 rounded-lg p-4 text-left max-w-2xl mx-auto">
                <h4 className="font-bold text-gray-200 mb-2">Debug Information:</h4>
                <pre className="text-xs text-gray-400 overflow-x-auto">
                  {JSON.stringify(matches, null, 2)}
                </pre>
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    console.log(`Fetching ODI matches from: ${apiUrl}/api/matches?format=ODI`);
    
    const res = await axios.get(`${apiUrl}/api/matches?format=ODI`);
    console.log('API Response:', res.data);
    
    // Ensure we're returning an array
    const matches = Array.isArray(res.data) ? res.data : 
                   (res.data && res.data.matches) ? res.data.matches : 
                   [];
    
    return { props: { matches } };
  } catch (error: any) {
    console.error('Error fetching ODI matches:', error.message);
    return { props: { matches: [], error: error.message } };
  }
}