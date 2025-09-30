import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { RecordItem, FilterOption } from './utils/recordsTypes';
import { QuickCategories } from './QuickCategories';
import { RecordsFilter } from './RecordsFilter';
import { RecordsTable } from './RecordsTable';
import { fetchAllRecordsData } from './utils/recordsDataFetching';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">Cricket Records</h1>
          <Link href="/" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
            ← Back to Home
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