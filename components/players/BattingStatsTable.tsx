import React from 'react';
import { BattingStat } from '../../utils/players/playerTypes';

interface BattingStatsTableProps {
  battingStats: BattingStat[];
}

export const BattingStatsTable: React.FC<BattingStatsTableProps> = ({ battingStats }) => {
  if (!battingStats || battingStats.length === 0) return null;

  return (
    <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-bold text-green-300 mb-4">Batting Statistics</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Format</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Matches</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Runs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Average</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">SR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">100s</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">50s</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">HS</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {battingStats.map((stat, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-300">{stat.format}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.matches}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.runs}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.average ? stat.average.toFixed(2) : '0.00'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.strikeRate ? stat.strikeRate.toFixed(2) : '0.00'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.centuries}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.fifties}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.highest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};