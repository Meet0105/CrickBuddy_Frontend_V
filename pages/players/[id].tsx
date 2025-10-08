import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { Player, CareerStat, BattingStat, BowlingStat, NewsItem, PlayerRankings } from '../../utils/players/playerTypes';
import { PlayerHeader } from '../../components/players/PlayerHeader';
import { PlayerInfo } from '../../components/players/PlayerInfo';
import { CareerStatsTable } from '../../components/players/CareerStatsTable';
import { BattingStatsTable } from '../../components/players/BattingStatsTable';
import { BowlingStatsTable } from '../../components/players/BowlingStatsTable';
import { PlayerNews } from '../../components/players/PlayerNews';
import { fetchAllPlayerData } from '../../utils/players/playerDataFetching';

export default function PlayerPage({ player, career, battingStats, bowlingStats, news, rankings }: { 
  player: Player, 
  career: CareerStat[], 
  battingStats: BattingStat[],
  bowlingStats: BowlingStat[],
  news: NewsItem[],
  rankings: PlayerRankings
}) {
  if (!player) return (
    <div className="bg-gray-900 min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 text-center border border-gray-700">
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 text-green-300">🏏</div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-300 mb-3 sm:mb-4 px-2">Player Not Found</h3>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2">The requested player could not be found.</p>
          <Link href="/" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
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
