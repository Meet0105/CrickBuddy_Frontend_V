import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

type Series = {
  seriesId: string;
  name: string;
  shortName: string;
  startDate: string;
  endDate: string;
  seriesType: string;
  format: string;
  status: string;
};

export default function SeriesPage({ series }: { series: Series[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">Cricket Series</h1>
          <Link href="/" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
            ← Back to Home
          </Link>
        </div>
        
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/series/list" className="bg-gray-800 rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition border border-gray-700">
            <div className="text-2xl mb-2">🌍</div>
            <h3 className="font-medium text-gray-100">International Series</h3>
          </Link>
          <Link href="/series/archives" className="bg-gray-800 rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition border border-gray-700">
            <div className="text-2xl mb-2">📚</div>
            <h3 className="font-medium text-gray-100">Series Archives</h3>
          </Link>
        </div>
        
        {series && series.length > 0 ? (
          <div className="space-y-4">
            {series.map((s) => (
              <div key={s.seriesId} className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-100">{s.name}</h3>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                    s.status === 'ONGOING' ? 'bg-red-900/30 text-red-400' :
                    s.status === 'UPCOMING' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {s.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-400">Format</p>
                    <p className="font-medium text-gray-200">{s.format}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Type</p>
                    <p className="font-medium text-gray-200">{s.seriesType}</p>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{new Date(s.startDate).toLocaleDateString()}</span>
                  <span>{new Date(s.endDate).toLocaleDateString()}</span>
                </div>
                
                <Link 
                  href={`/series/${s.seriesId}`} 
                  className="text-green-400 hover:text-green-300 text-sm font-medium transition"
                >
                  View Series Details →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">No Series Available</h3>
            <p className="text-gray-400 mb-4">Series data is currently being synced. Please check back later!</p>
            <Link href="/" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
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
    
    // First try to get from database
    const res = await axios.get(`${apiUrl}/api/series`);
    console.log('Series API Response:', res.data);
    
    // Handle different response formats
    let series = [];
    
    if (Array.isArray(res.data)) {
      // Direct array from database
      series = res.data.map((s: any) => ({
        seriesId: s.seriesId,
        name: s.name,
        shortName: s.shortName || s.name,
        startDate: s.startDate || new Date().toISOString(),
        endDate: s.endDate || new Date().toISOString(),
        seriesType: s.seriesType || 'INTERNATIONAL',
        format: s.format || 'MIXED',
        status: s.status || 'UPCOMING',
        totalMatches: s.totalMatches || 0,
        completedMatches: s.completedMatches || 0
      }));
    } else if (res.data && res.data.seriesMapProto) {
      // API response format
      series = res.data.seriesMapProto.map((s: any) => ({
        seriesId: s.seriesId,
        name: s.name,
        shortName: s.shortName || s.name,
        startDate: s.startDate || new Date().toISOString(),
        endDate: s.endDate || new Date().toISOString(),
        seriesType: s.seriesType || 'INTERNATIONAL',
        format: s.format || 'MIXED',
        status: s.status || 'UPCOMING'
      }));
    }
    
    return { props: { series: Array.isArray(series) ? series : [] } };
  } catch (error) {
    console.error('Error fetching series:', error);
    return { props: { series: [] } };
  }
}
