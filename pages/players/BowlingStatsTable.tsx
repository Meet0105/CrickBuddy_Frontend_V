import React from 'react';
import { BowlingStat } from './utils/playerTypes';

interface BowlingStatsTableProps {
  bowlingStats: BowlingStat[];
}

export const BowlingStatsTable: React.FC<BowlingStatsTableProps> = ({ bowlingStats }) => {
  if (!bowlingStats || bowlingStats.length === 0) return null;

  return (
    <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-bold text-green-300 mb-4">Bowling Statistics</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Format</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Matches</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Wickets</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Average</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Economy</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Best</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {bowlingStats.map((stat, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-300">{stat.format}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.matches}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.wickets}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.average ? stat.average.toFixed(2) : '0.00'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.economy ? stat.economy.toFixed(2) : '0.00'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{stat.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};