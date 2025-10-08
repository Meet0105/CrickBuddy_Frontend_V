import axios from 'axios';
import api from '../../utils/api';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import SeriesSchedule from '../../components/SeriesSchedule';
import SeriesSquads from '../../components/SeriesSquads';
import SeriesPointsTable from '../../components/SeriesPointsTable';
import { useState, useEffect } from 'react';
import { Series, Match } from '../../utils/series/seriesTypes';
import { fetchAllSeriesData, fetchSeriesTabData } from '../../utils/series/seriesDataFetching';
import { SeriesInfo } from '../../components/series/SeriesInfo';
import { SeriesTabs } from '../../components/series/SeriesTabs';
import { MatchesTab } from '../../components/series/MatchesTab';
import { VenuesTab } from '../../components/series/VenuesTab';
import { StatsTab } from '../../components/series/StatsTab';
import { SeriesStatus, SeriesNotFound } from '../../components/series/SeriesStatus';

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

  // Early return if no series data
  if (!series) {
    return <SeriesNotFound />;
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400 break-words">{series.name}</h1>
          <Link href="/series" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium transition flex items-center flex-shrink-0">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Series
          </Link>
        </div>
        
        <SeriesInfo series={series} />
        
        {/* Tab Navigation */}
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg mb-6 sm:mb-8 border border-gray-700">
          <SeriesTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            setSeriesData={setSeriesData} 
          />
          <div className="p-4 sm:p-5 md:p-6">
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