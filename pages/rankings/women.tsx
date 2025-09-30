import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { TeamRanking, PlayerRanking } from '../../utils/rankings/rankingTypes';
import { TeamRankingsTable } from '../../components/rankings/TeamRankingsTable';
import { PlayerRankingsTable } from '../../components/rankings/PlayerRankingsTable';
import { fetchAllWomenRankings } from '../../utils/rankings/womenRankingData';

export default function WomenRankings({ 
  testTeamRankings, 
  odiTeamRankings, 
  t20TeamRankings,
  testBatsmenRankings,
  odiBatsmenRankings,
  t20BatsmenRankings,
  testBowlersRankings,
  odiBowlersRankings,
  t20BowlersRankings
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
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400">ICC Women's Rankings</h1>
          <Link href="/rankings" className="text-green-400 hover:text-green-300 text-sm font-medium transition">
            ← Men's Rankings
          </Link>
        </div>
        
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
    const rankingsData = await fetchAllWomenRankings();
    
    return { 
      props: rankingsData
    };
  } catch (error) {
    console.error('Error fetching women rankings:', error);
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
        t20BowlersRankings: []
      } 
    };
  }
}