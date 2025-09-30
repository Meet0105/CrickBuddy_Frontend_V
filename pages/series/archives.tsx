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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-green-400">Series Archives</h1>
            <Link href="/series" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
              ← Back to Series
            </Link>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
            <p className="text-gray-300">Loading archives...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
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
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
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
          <div className="space-y-6">
            {archiveYears.map((archive: any, index: number) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                <div className="bg-gradient-to-r from-green-700 to-green-800 text-white py-3 px-6 rounded-t-lg">
                  <h2 className="text-xl font-bold">{archive.year}</h2>
                </div>
                <div className="p-6">
                  {archive.series && archive.series.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {archive.series.map((series: any) => (
                        <div key={series.id} className="bg-gray-750 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-gray-100">{series.name}</h3>
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                              (series.status && series.status.toLowerCase() === 'ongoing') ? 'bg-red-900/30 text-red-400' :
                              (series.status && series.status.toLowerCase() === 'upcoming') ? 'bg-blue-900/30 text-blue-400' :
                              'bg-gray-700 text-gray-300'
                            }`}>
                              {(series.status && series.status.toUpperCase()) || 'COMPLETED'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-400 mb-3">
                            <span>{series.seriesType || 'Series'}</span>
                            <span>{series.matchCount || 0} matches</span>
                          </div>
                          <Link 
                            href={`/series/${series.id}`} 
                            className="text-green-400 hover:text-green-300 text-sm font-medium transition"
                          >
                            View Details →
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
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">No Archives Available</h3>
            <p className="text-gray-400 mb-4">No series archives data is currently available.</p>
            <Link href="/series" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Back to Series
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}