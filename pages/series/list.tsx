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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-green-400">International Series</h1>
            <Link href="/series" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
              ← Back to Series
            </Link>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
            <p className="text-gray-300">Loading series data...</p>
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
            <h1 className="text-2xl font-bold text-green-400">International Series</h1>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">International Series</h1>
          <Link href="/series" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
            ← Back to Series
          </Link>
        </div>
        
        {seriesItems && seriesItems.length > 0 ? (
          <div className="space-y-4">
            {seriesItems.map((series: any) => (
              <div key={series.id} className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-100">{series.name}</h3>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                    series.status === 'started' ? 'bg-red-900/30 text-red-400' :
                    series.status === 'upcoming' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {series.status?.toUpperCase() || 'SCHEDULED'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-400">Format</p>
                    <p className="font-medium text-gray-200">{series.seriesType || 'TBD'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Matches</p>
                    <p className="font-medium text-gray-200">{series.matchCount || 0}</p>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{series.startDt ? new Date(series.startDt).toLocaleDateString() : 'TBD'}</span>
                  <span>{series.endDt ? new Date(series.endDt).toLocaleDateString() : 'TBD'}</span>
                </div>
                
                <Link 
                  href={`/series/${series.id}`} 
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
            <p className="text-gray-400 mb-4">No international series data is currently available.</p>
            <Link href="/series" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Back to Series
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
