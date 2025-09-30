import React from 'react';
import { PlayerRanking } from './utils/playerTypes';

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
    <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-green-300 mb-2">Player Information</h2>
        <p className="text-green-200">Role: {player.role || 'Not specified'}</p>
        <p className="text-green-200">Country: {player.country || 'Not specified'}</p>
      </div>
      
      {/* Player Rankings Section */}
      {hasRankings && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="text-md font-bold text-green-300 mb-2">Current Rankings</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {rankings.testBatsmen && (
              <div className="bg-green-900 p-2 rounded text-center">
                <p className="text-xs text-green-400">Test Bat</p>
                <p className="font-bold text-green-300">#{rankings.testBatsmen.position}</p>
                <p className="text-xs text-green-400">{rankings.testBatsmen.rating}</p>
              </div>
            )}
            {rankings.odiBatsmen && (
              <div className="bg-green-900 p-2 rounded text-center">
                <p className="text-xs text-green-400">ODI Bat</p>
                <p className="font-bold text-green-300">#{rankings.odiBatsmen.position}</p>
                <p className="text-xs text-green-400">{rankings.odiBatsmen.rating}</p>
              </div>
            )}
            {rankings.t20Batsmen && (
              <div className="bg-green-900 p-2 rounded text-center">
                <p className="text-xs text-green-400">T20 Bat</p>
                <p className="font-bold text-green-300">#{rankings.t20Batsmen.position}</p>
                <p className="text-xs text-green-400">{rankings.t20Batsmen.rating}</p>
              </div>
            )}
            {rankings.testBowlers && (
              <div className="bg-blue-900 p-2 rounded text-center">
                <p className="text-xs text-blue-400">Test Bowl</p>
                <p className="font-bold text-blue-300">#{rankings.testBowlers.position}</p>
                <p className="text-xs text-blue-400">{rankings.testBowlers.rating}</p>
              </div>
            )}
            {rankings.odiBowlers && (
              <div className="bg-blue-900 p-2 rounded text-center">
                <p className="text-xs text-blue-400">ODI Bowl</p>
                <p className="font-bold text-blue-300">#{rankings.odiBowlers.position}</p>
                <p className="text-xs text-blue-400">{rankings.odiBowlers.rating}</p>
              </div>
            )}
            {rankings.t20Bowlers && (
              <div className="bg-blue-900 p-2 rounded text-center">
                <p className="text-xs text-blue-400">T20 Bowl</p>
                <p className="font-bold text-blue-300">#{rankings.t20Bowlers.position}</p>
                <p className="text-xs text-blue-400">{rankings.t20Bowlers.rating}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};