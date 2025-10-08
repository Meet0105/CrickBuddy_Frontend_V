import React from 'react';
import { PlayerRanking } from '../../utils/players/playerTypes';

interface Player {
  playerId: string;
  name: string;
  role: string;
  country: string;
  stats?: any;
  raw?: any;
}

interface PlayerRankings {
  testBatsmen?: PlayerRanking;
  odiBatsmen?: PlayerRanking;
  t20Batsmen?: PlayerRanking;
  testBowlers?: PlayerRanking;
  odiBowlers?: PlayerRanking;
  t20Bowlers?: PlayerRanking;
}

interface PlayerInfoProps {
  player: Player;
  rankings: PlayerRankings;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, rankings }) => {
  const hasRankings = rankings.testBatsmen || rankings.odiBatsmen || rankings.t20Batsmen || 
    rankings.testBowlers || rankings.odiBowlers || rankings.t20Bowlers;

  return (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 sm:p-5 md:p-6 lg:p-7 mb-4 sm:mb-5 md:mb-6 border border-gray-700/50">
      <div className="mb-4 sm:mb-5 md:mb-6">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 0118 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-300">
            Player Information
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-900/50 rounded-lg border border-gray-700/30 hover:border-green-500/30 transition-colors">
            <div className="p-2 sm:p-2.5 bg-green-900/40 rounded-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Role</p>
              <p className="text-sm sm:text-base md:text-lg text-green-200 font-semibold truncate">
                {player.role || 'Not specified'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-900/50 rounded-lg border border-gray-700/30 hover:border-blue-500/30 transition-colors">
            <div className="p-2 sm:p-2.5 bg-blue-900/40 rounded-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Country</p>
              <p className="text-sm sm:text-base md:text-lg text-blue-200 font-semibold truncate">
                {player.country || 'Not specified'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Player Rankings Section */}
      {hasRankings && (
        <div className="pt-4 sm:pt-5 md:pt-6 border-t border-gray-700/50">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-amber-300">
              Current Rankings
            </h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
            {rankings.testBatsmen && (
              <div className="bg-gradient-to-br from-green-900/80 to-green-800/60 hover:from-green-800/90 hover:to-green-700/70 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center transition-all duration-200 transform hover:scale-105 border border-green-700/30 shadow-md">
                <p className="text-xs sm:text-sm text-green-400 font-medium mb-1">Test Bat</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-green-300 mb-1">#{rankings.testBatsmen.position}</p>
                <p className="text-xs sm:text-sm text-green-400 font-semibold">{rankings.testBatsmen.rating}</p>
              </div>
            )}
            {rankings.odiBatsmen && (
              <div className="bg-gradient-to-br from-green-900/80 to-green-800/60 hover:from-green-800/90 hover:to-green-700/70 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center transition-all duration-200 transform hover:scale-105 border border-green-700/30 shadow-md">
                <p className="text-xs sm:text-sm text-green-400 font-medium mb-1">ODI Bat</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-green-300 mb-1">#{rankings.odiBatsmen.position}</p>
                <p className="text-xs sm:text-sm text-green-400 font-semibold">{rankings.odiBatsmen.rating}</p>
              </div>
            )}
            {rankings.t20Batsmen && (
              <div className="bg-gradient-to-br from-green-900/80 to-green-800/60 hover:from-green-800/90 hover:to-green-700/70 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center transition-all duration-200 transform hover:scale-105 border border-green-700/30 shadow-md">
                <p className="text-xs sm:text-sm text-green-400 font-medium mb-1">T20 Bat</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-green-300 mb-1">#{rankings.t20Batsmen.position}</p>
                <p className="text-xs sm:text-sm text-green-400 font-semibold">{rankings.t20Batsmen.rating}</p>
              </div>
            )}
            {rankings.testBowlers && (
              <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/60 hover:from-blue-800/90 hover:to-blue-700/70 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center transition-all duration-200 transform hover:scale-105 border border-blue-700/30 shadow-md">
                <p className="text-xs sm:text-sm text-blue-400 font-medium mb-1">Test Bowl</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-blue-300 mb-1">#{rankings.testBowlers.position}</p>
                <p className="text-xs sm:text-sm text-blue-400 font-semibold">{rankings.testBowlers.rating}</p>
              </div>
            )}
            {rankings.odiBowlers && (
              <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/60 hover:from-blue-800/90 hover:to-blue-700/70 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center transition-all duration-200 transform hover:scale-105 border border-blue-700/30 shadow-md">
                <p className="text-xs sm:text-sm text-blue-400 font-medium mb-1">ODI Bowl</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-blue-300 mb-1">#{rankings.odiBowlers.position}</p>
                <p className="text-xs sm:text-sm text-blue-400 font-semibold">{rankings.odiBowlers.rating}</p>
              </div>
            )}
            {rankings.t20Bowlers && (
              <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/60 hover:from-blue-800/90 hover:to-blue-700/70 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center transition-all duration-200 transform hover:scale-105 border border-blue-700/30 shadow-md">
                <p className="text-xs sm:text-sm text-blue-400 font-medium mb-1">T20 Bowl</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-blue-300 mb-1">#{rankings.t20Bowlers.position}</p>
                <p className="text-xs sm:text-sm text-blue-400 font-semibold">{rankings.t20Bowlers.rating}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};