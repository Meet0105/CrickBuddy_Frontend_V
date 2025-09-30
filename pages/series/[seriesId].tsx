import axios from 'axios';
import api from '../../utils/api';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import SeriesSchedule from '../../components/SeriesSchedule';
import SeriesSquads from '../../components/SeriesSquads';
import SeriesPointsTable from '../../components/SeriesPointsTable';
import { useState, useEffect } from 'react';
import { Series, Match } from './utils/seriesTypes';
import { fetchAllSeriesData, fetchSeriesTabData } from './utils/seriesDataFetching';
import { SeriesInfo } from './SeriesInfo';
import { SeriesTabs } from './SeriesTabs';
import { MatchesTab } from './MatchesTab';
import { VenuesTab } from './VenuesTab';
import { StatsTab } from './StatsTab';
import { SeriesStatus, SeriesNotFound } from './SeriesStatus';

export default function SeriesDetails({ series, matches }: { series: Series; matches: Match[] }) {
  const [activeTab, setActiveTab] = useState('matches');
  const [seriesData, setSeriesData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSeriesData = async (endpoint: string) => {
    // Add debugging to check if series is available
    if (!series || !series.seriesId) {
      console.error('Series data is not available:', series);
      setError('Series data is not available');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSeriesTabData(series.seriesId, endpoint);
      setSeriesData(data);
    } catch (err: any) {
      console.error(`Error fetching series ${endpoint}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect triggered:', { activeTab, seriesData, seriesId: series?.seriesId });
    if (activeTab !== 'matches' && !seriesData) {
      switch (activeTab) {
        case 'schedule':
          fetchSeriesData('schedule');
          break;
        case 'squads':
          fetchSeriesData('squads');
          break;
        case 'venues':
          fetchSeriesData('venues');
          break;
        case 'points':
          fetchSeriesData('points-table');
          break;
        case 'stats':
          fetchSeriesData('stats?statsType=mostRuns');
          break;
      }
    }
    // Add a condition to refetch data when activeTab changes even if seriesData exists
    // This allows switching between different stats types
    if (activeTab === 'stats' && seriesData) {
      // We'll handle stats switching separately with dedicated buttons
    }
  }, [activeTab, seriesData, series?.seriesId]);

  if (!series) {
    return <SeriesNotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">{series.name}</h1>
          <Link href="/series" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
            ← Back to Series
          </Link>
        </div>
        
        <SeriesInfo series={series} />
        
        {/* Tab Navigation */}
        <div className="bg-gray-800 rounded-lg shadow-lg mb-6 border border-gray-700">
          <SeriesTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            setSeriesData={setSeriesData} 
          />
          
          <div className="p-6">
            <SeriesStatus loading={loading} error={error} />
            
            {activeTab === 'matches' && (
              <MatchesTab matches={matches} />
            )}
            
            {activeTab === 'schedule' && (
              <SeriesSchedule 
                schedule={seriesData?.schedule}
                seriesName={series.name}
              />
            )}
            
            {activeTab === 'squads' && (
              <SeriesSquads 
                squads={seriesData?.squads}
                seriesName={series.name}
              />
            )}
            
            {activeTab === 'points' && (
              <SeriesPointsTable 
                pointsTable={seriesData?.pointsTable}
                seriesName={series.name}
              />
            )}
            
            {activeTab === 'venues' && seriesData && (
              <VenuesTab venues={seriesData.venues} />
            )}
            
            {activeTab === 'stats' && (
              <StatsTab 
                seriesData={seriesData} 
                fetchSeriesData={fetchSeriesData} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps({ params }: { params: { seriesId: string } }) {
  try {
    console.log('Fetching series details for ID:', params.seriesId);
    
    const { series, matches } = await fetchAllSeriesData(params.seriesId);
    
    return { props: { series, matches } };
  } catch (error) {
    console.error('Error fetching series:', error);
    return { props: { series: null, matches: [] } };
  }
}