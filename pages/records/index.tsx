import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { RecordItem, FilterOption } from '../../utils/records/recordsTypes';
import { QuickCategories } from '../../components/records/QuickCategories';
import { RecordsFilter } from '../../components/records/RecordsFilter';
import { RecordsTable } from '../../components/records/RecordsTable';
import { fetchAllRecordsData } from '../../utils/records/recordsDataFetching';

export default function Records({ 
  records, 
  filters,
  selectedStatsType,
  selectedMatchType,
  selectedTeam
}: { 
  records: RecordItem[]; 
  filters: FilterOption[];
  selectedStatsType: string;
  selectedMatchType: string;
  selectedTeam: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400 flex items-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Cricket Records
          </h1>
          <Link href="/" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium transition flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        <QuickCategories />
        
        <RecordsFilter 
          filters={filters}
          selectedStatsType={selectedStatsType}
          selectedMatchType={selectedMatchType}
          selectedTeam={selectedTeam}
        />
        
        <RecordsTable 
          records={records}
          filters={filters}
          selectedStatsType={selectedStatsType}
          selectedMatchType={selectedMatchType}
        />
      </main>
    </div>
  )
}

export async function getServerSideProps({ query }: { query: any }) {
  try {
    // Get query parameters
    const { statsType = 'mostRuns', matchType = '1', teamId = '' } = query;
    
    const { filters, records } = await fetchAllRecordsData(statsType, matchType, teamId);
    
    return { 
      props: { 
        records,
        filters,
        selectedStatsType: statsType,
        selectedMatchType: matchType,
        selectedTeam: teamId || ''
      } 
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    // Complete fallback
    const fallbackFilters = [
      { value: 'mostRuns', header: 'Most Runs', category: 'Batting' },
      { value: 'highestScore', header: 'Highest Scores', category: 'Batting' },
      { value: 'mostWickets', header: 'Most Wickets', category: 'Bowling' }
    ];
    
    const fallbackRecords = [
      { rank: '1', playerName: 'Sachin Tendulkar', country: 'India', value: '15921', against: 'vs All', ground: 'Various', date: '1989-2013' },
      { rank: '2', playerName: 'Ricky Ponting', country: 'Australia', value: '13378', against: 'vs All', ground: 'Various', date: '1995-2012' },
      { rank: '3', playerName: 'Jacques Kallis', country: 'South Africa', value: '13289', against: 'vs All', ground: 'Various', date: '1995-2013' }
    ];
    
    return { 
      props: { 
        records: fallbackRecords, 
        filters: fallbackFilters,
        selectedStatsType: 'mostRuns',
        selectedMatchType: '1',
        selectedTeam: ''
      } 
    };
  }
}
