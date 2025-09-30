import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { TeamRanking, PlayerRanking } from './utils/rankingTypes';
import { TeamRankingsTable } from './TeamRankingsTable';
import { PlayerRankingsTable } from './PlayerRankingsTable';
import { fetchAllRankings } from './utils/rankingDataFetching';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">ICC Rankings</h1>
          <Link href="/" className="text-green-300 hover:text-green-400 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
        
        {/* T20 Data Error Message */}
        {t20DataError && (
          <div className="bg-yellow-900/30 border-l-4 border-yellow-600 p-4 mb-6 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-300">
                  <span className="font-medium">Note:</span> {t20DataError}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-8">
          {/* Team Rankings Section */}
          <div>
            <h2 className="text-xl font-bold text-green-400 mb-4">Team Rankings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <h2 className="text-xl font-bold text-green-400 mb-4">Batsmen Rankings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <h2 className="text-xl font-bold text-green-400 mb-4">Bowlers Rankings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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