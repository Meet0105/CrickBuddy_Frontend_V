import React from 'react';
import { PlayerRanking } from '../../utils/rankings/rankingTypes';

interface PlayerRankingsTableProps {
  title: string;
  rankings: PlayerRanking[];
  format: string;
  category: string;
}

export const PlayerRankingsTable: React.FC<PlayerRankingsTableProps> = ({ title, rankings, format, category }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-4 rounded-t-lg">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="p-4">
        {rankings && rankings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pos</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Player</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Team</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {rankings.map((player) => (
                  <tr 
                    key={player.position} 
                    className={Number(player.position) <= 3 ? 'bg-gradient-to-r from-green-900/30 to-green-800/20' : 'hover:bg-gray-750 transition'}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-green-400">{player.position}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">{player.playerName}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      <span className="bg-gray-700 px-2 py-1 rounded-full text-xs">{player.country}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-green-400">{player.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow p-8 text-center border border-gray-700">
            <p className="text-gray-400">{format} {category} rankings data is currently being synced. Please check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};