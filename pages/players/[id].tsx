import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { Player, CareerStat, BattingStat, BowlingStat, NewsItem, PlayerRankings } from './utils/playerTypes';
import { PlayerHeader } from './PlayerHeader';
import { PlayerInfo } from './PlayerInfo';
import { CareerStatsTable } from './CareerStatsTable';
import { BattingStatsTable } from './BattingStatsTable';
import { BowlingStatsTable } from './BowlingStatsTable';
import { PlayerNews } from './PlayerNews';
import { fetchAllPlayerData } from './utils/playerDataFetching';

export default function PlayerPage({ player, career, battingStats, bowlingStats, news, rankings }: { 
  player: Player, 
  career: CareerStat[], 
  battingStats: BattingStat[],
  bowlingStats: BowlingStat[],
  news: NewsItem[],
  rankings: PlayerRankings
}) {
  if (!player) return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gray-800 text-gray-400 p-8 rounded-lg shadow text-center">
          <div className="text-5xl mb-4 text-green-300">🏏</div>
          <h3 className="text-xl font-bold text-green-300 mb-2">Player Not Found</h3>
          <p className="text-gray-400 mb-4">The requested player could not be found.</p>
          <Link href="/" className="bg-green-900 hover:bg-green-800 text-green-300 font-medium py-2 px-4 rounded-lg inline-block transition">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <PlayerHeader player={player} />
        
        <PlayerInfo player={player} rankings={rankings} />

        <CareerStatsTable career={career} />

        <BattingStatsTable battingStats={battingStats} />

        <BowlingStatsTable bowlingStats={bowlingStats} />

        <PlayerNews news={news} />
      </main>
    </div>
  )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  try {
    const { player, career, battingStats, bowlingStats, news, rankings } = await fetchAllPlayerData(params.id);
    
    return { 
      props: { 
        player,
        career, 
        battingStats,
        bowlingStats,
        news,
        rankings
      } 
    };
  } catch (error) {
    return { props: { player: null, career: [], battingStats: [], bowlingStats: [], news: [], rankings: {} } };
  }
}
