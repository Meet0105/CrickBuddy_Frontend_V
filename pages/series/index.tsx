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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400 flex items-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Cricket Series
          </h1>
          <Link href="/" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium transition flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <Link href="/series/list" className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 text-center hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-green-600">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🌍</div>
            <h3 className="text-sm sm:text-base font-bold text-gray-100">International Series</h3>
          </Link>
          <Link href="/series/archives" className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 text-center hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-green-600">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📚</div>
            <h3 className="text-sm sm:text-base font-bold text-gray-100">Series Archives</h3>
          </Link>
        </div>
        
        {series && series.length > 0 ? (
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {series.map((s) => (
              <div key={s.seriesId} className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-green-600">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-3">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 break-words flex-1">{s.name}</h3>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                    s.status === 'ONGOING' ? 'bg-red-900/30 text-red-400' :
                    s.status === 'UPCOMING' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {s.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Format</p>
                    <p className="text-sm sm:text-base font-medium text-gray-200">{s.format}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Type</p>
                    <p className="text-sm sm:text-base font-medium text-gray-200">{s.seriesType}</p>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  <span>{new Date(s.startDate).toLocaleDateString()}</span>
                  <span>{new Date(s.endDate).toLocaleDateString()}</span>
                </div>
                
                <Link 
                  href={`/series/${s.seriesId}`} 
                  className="group text-green-400 hover:text-green-300 text-xs sm:text-sm font-medium flex items-center"
                >
                  View Series Details
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 text-center border border-gray-700">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">🏆</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-3 sm:mb-4 px-2">No Series Available</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2 max-w-md mx-auto">Series data is currently being synced. Please check back later!</p>
            <Link href="/" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
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
