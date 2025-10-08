import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { TeamRanking, PlayerRanking } from '../../utils/rankings/rankingTypes';
import { TeamRankingsTable } from '../../components/rankings/TeamRankingsTable';
import { PlayerRankingsTable } from '../../components/rankings/PlayerRankingsTable';
import { fetchAllRankings } from '../../utils/rankings/rankingDataFetching';

export default function Rankings({ 
  testTeamRankings, 
  odiTeamRankings, 
  t20TeamRankings,
  testBatsmenRankings,
  odiBatsmenRankings,
  t20BatsmenRankings,
  testBowlersRankings,
  odiBowlersRankings,
  t20BowlersRankings,
  t20DataError
}: { 
  testTeamRankings: TeamRanking[]; 
  odiTeamRankings: TeamRanking[]; 
  t20TeamRankings: TeamRanking[]; 
  testBatsmenRankings: PlayerRanking[];
  odiBatsmenRankings: PlayerRanking[];
  t20BatsmenRankings: PlayerRanking[];
  testBowlersRankings: PlayerRanking[];
  odiBowlersRankings: PlayerRanking[];
  t20BowlersRankings: PlayerRanking[];
  t20DataError?: string;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400 flex items-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            ICC Rankings
          </h1>
          <Link href="/" className="group text-green-300 hover:text-green-400 text-sm sm:text-base font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        {/* T20 Data Error Message */}
        {t20DataError && (
          <div className="bg-yellow-900/30 border-l-4 border-yellow-600 p-3 sm:p-4 mb-6 sm:mb-8 rounded-lg sm:rounded-xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm text-yellow-300">
                  <span className="font-medium">Note:</span> {t20DataError}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Team Rankings Section */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 mb-4 sm:mb-6 flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Team Rankings
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <TeamRankingsTable 
                title="Test Rankings" 
                rankings={testTeamRankings} 
                format="Test" 
              />
              
              <TeamRankingsTable 
                title="ODI Rankings" 
                rankings={odiTeamRankings} 
                format="ODI" 
              />
              
              <TeamRankingsTable 
                title="T20 Rankings" 
                rankings={t20TeamRankings} 
                format="T20" 
              />
            </div>
          </div>
          
          {/* Batsmen Rankings Section */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 mb-4 sm:mb-6 flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Batsmen Rankings
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <PlayerRankingsTable 
                title="Test Batsmen" 
                rankings={testBatsmenRankings} 
                format="Test" 
                category="batsmen" 
              />
              
              <PlayerRankingsTable 
                title="ODI Batsmen" 
                rankings={odiBatsmenRankings} 
                format="ODI" 
                category="batsmen" 
              />
              
              <PlayerRankingsTable 
                title="T20 Batsmen" 
                rankings={t20BatsmenRankings} 
                format="T20" 
                category="batsmen" 
              />
            </div>
          </div>
          
          {/* Bowlers Rankings Section */}
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 mb-4 sm:mb-6 flex items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              Bowlers Rankings
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <PlayerRankingsTable 
                title="Test Bowlers" 
                rankings={testBowlersRankings} 
                format="Test" 
                category="bowlers" 
              />
              
              <PlayerRankingsTable 
                title="ODI Bowlers" 
                rankings={odiBowlersRankings} 
                format="ODI" 
                category="bowlers" 
              />
              
              <PlayerRankingsTable 
                title="T20 Bowlers" 
                rankings={t20BowlersRankings} 
                format="T20" 
                category="bowlers" 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const rankingsData = await fetchAllRankings();
    
    return { 
      props: rankingsData
    };
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return { 
      props: { 
        testTeamRankings: [], 
        odiTeamRankings: [], 
        t20TeamRankings: [],
        testBatsmenRankings: [],
        odiBatsmenRankings: [],
        t20BatsmenRankings: [],
        testBowlersRankings: [],
        odiBowlersRankings: [],
        t20BowlersRankings: [],
        t20DataError: 'An error occurred while fetching rankings data. Please try again later.'
      } 
    };
  }
}
