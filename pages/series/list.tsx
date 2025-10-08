import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';

export default function SeriesListPage() {
  const [seriesData, setSeriesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeriesList = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/series/list');
        setSeriesData(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching series list:', err);
        setError('Failed to load series data');
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesList();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-full overflow-x-hidden">
        <Navbar />
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400">International Series</h1>
            <Link href="/series" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium transition flex items-center">
              <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Series
            </Link>
          </div>
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 text-center border border-gray-700">
            <p className="text-sm sm:text-base text-gray-300">Loading series data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-full overflow-x-hidden">
        <Navbar />
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400">International Series</h1>
            <Link href="/series" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium transition flex items-center">
              <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Series
            </Link>
          </div>
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 text-center border border-gray-700">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">Error Loading Data</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <Link href="/series" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Back to Series
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Process series data - handle the new data structure
  let seriesItems = [];
  if (seriesData && seriesData.seriesMapProto) {
    // Handle the new data structure where seriesMapProto is an array of series objects
    seriesItems = seriesData.seriesMapProto.map((s: any) => ({
      id: s.seriesId,
      name: s.name,
      seriesType: s.seriesType || 'INTERNATIONAL',
      startDt: s.startDate ? new Date(s.startDate).getTime() : Date.now(),
      endDt: s.endDate ? new Date(s.endDate).getTime() : Date.now(),
      status: s.status && s.status.toLowerCase() === 'ongoing' ? 'started' : 
              s.status && s.status.toLowerCase() === 'upcoming' ? 'upcoming' : 
              s.status || 'scheduled',
      matchCount: s.totalMatches || 0
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400">International Series</h1>
          <Link href="/series" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium transition flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Series
          </Link>
        </div>
        
        {seriesItems && seriesItems.length > 0 ? (
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {seriesItems.map((series: any) => (
              <div key={series.id} className="bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-green-600">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-3">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 break-words flex-1">{series.name}</h3>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                    series.status === 'started' ? 'bg-red-900/30 text-red-400' :
                    series.status === 'upcoming' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {series.status?.toUpperCase() || 'SCHEDULED'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Format</p>
                    <p className="text-sm sm:text-base font-medium text-gray-200">{series.seriesType || 'TBD'}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">Matches</p>
                    <p className="text-sm sm:text-base font-medium text-gray-200">{series.matchCount || 0}</p>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  <span>{series.startDt ? new Date(series.startDt).toLocaleDateString() : 'TBD'}</span>
                  <span>{series.endDt ? new Date(series.endDt).toLocaleDateString() : 'TBD'}</span>
                </div>
                
                <Link 
                  href={`/series/${series.id}`} 
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
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2 max-w-md mx-auto">No international series data is currently available.</p>
            <Link href="/series" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
              Back to Series
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
