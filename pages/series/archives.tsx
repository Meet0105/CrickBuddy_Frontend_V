import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';

export default function SeriesArchivesPage() {
  const [archivesData, setArchivesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/series/archives');
        setArchivesData(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching series archives:', err);
        setError('Failed to load series archives');
      } finally {
        setLoading(false);
      }
    };

    fetchArchives();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-full overflow-x-hidden">
        <Navbar />
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400">Series Archives</h1>
            <Link href="/series" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium transition flex items-center">
              <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Series
            </Link>
          </div>
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 text-center border border-gray-700">
            <p className="text-sm sm:text-base text-gray-300">Loading archives...</p>
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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400">Series Archives</h1>
            <Link href="/series" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium transition flex items-center">
              <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Series
            </Link>
          </div>
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 text-center border border-gray-700">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">⚠️</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-3 sm:mb-4 px-2">Error Loading Data</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2">{error}</p>
            <Link href="/series" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
              Back to Series
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Process archives data - handle the new data structure
  let archiveYears = [];
  if (archivesData && archivesData.seriesMapProto) {
    // Group series by year - for simplicity, we'll just show all series
    archiveYears = [{
      year: 'Archived Series',
      series: archivesData.seriesMapProto.map((s: any) => ({
        id: s.seriesId,
        name: s.name,
        seriesType: s.seriesType || 'INTERNATIONAL',
        status: s.status || 'COMPLETED',
        matchCount: s.totalMatches || 0
      }))
    }];
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">Series Archives</h1>
          <Link href="/series" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
            ← Back to Series
          </Link>
        </div>
        
        {archiveYears && archiveYears.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {archiveYears.map((archive: any, index: number) => (
              <div key={index} className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-gray-700">
                <div className="bg-gradient-to-r from-green-700 to-green-800 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-t-xl sm:rounded-t-2xl">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{archive.year}</h2>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  {archive.series && archive.series.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {archive.series.map((series: any) => (
                        <div key={series.id} className="bg-gray-750 border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2 sm:mb-3">
                            <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-100 break-words flex-1">{series.name}</h3>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                              (series.status && series.status.toLowerCase() === 'ongoing') ? 'bg-red-900/30 text-red-400' :
                              (series.status && series.status.toLowerCase() === 'upcoming') ? 'bg-blue-900/30 text-blue-400' :
                              'bg-gray-700 text-gray-300'
                            }`}>
                              {(series.status && series.status.toUpperCase()) || 'COMPLETED'}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                            <span>{series.seriesType || 'Series'}</span>
                            <span>{series.matchCount || 0} matches</span>
                          </div>
                          <Link 
                            href={`/series/${series.id}`} 
                            className="group text-green-400 hover:text-green-300 text-xs sm:text-sm font-medium flex items-center"
                          >
                            View Details
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No series found for this year</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 text-center border border-gray-700">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">📚</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-3 sm:mb-4 px-2">No Archives Available</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2 max-w-md mx-auto">No series archives data is currently available.</p>
            <Link href="/series" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
              Back to Series
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
