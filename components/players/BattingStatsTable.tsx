import React from 'react';
import { BattingStat } from '../../utils/players/playerTypes';

interface BattingStatsTableProps {
  battingStats: BattingStat[];
}

export const BattingStatsTable: React.FC<BattingStatsTableProps> = ({ battingStats }) => {
  if (!battingStats || battingStats.length === 0) return null;

  return (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-3 sm:p-4 md:p-6 lg:p-7 mb-4 sm:mb-5 md:mb-6 border border-gray-700/50">
      <div className="flex items-center gap-2 mb-3 sm:mb-4 md:mb-5">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-300">
          Batting Statistics
        </h2>
      </div>
      
      {/* Mobile Hint */}
      <div className="sm:hidden mb-3 px-2 py-1.5 bg-green-900/20 border border-green-500/30 rounded-lg">
        <p className="text-xs text-green-300 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 0118 0 9 9 0 0118 0z" />
          </svg>
          Swipe left to see all stats
        </p>
      </div>
      
      <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-7 px-3 sm:px-4 md:px-6 lg:px-7 scrollbar-hide">
        <table className="min-w-full divide-y divide-gray-700/50">
          <thead className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
            <tr>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider border-r border-gray-700/30">
                Format
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider">
                Mat
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider">
                Runs
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider">
                Avg
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider">
                SR
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider">
                100s
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider">
                50s
              </th>
              <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider">
                HS
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-700/30">
            {battingStats.map((stat, index) => (
              <tr 
                key={index}
                className="hover:bg-gray-700/30 transition-colors duration-150"
              >
                <td className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base font-semibold text-green-300 bg-gray-900/50 border-r border-gray-700/30">
                  {stat.format}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-300">
                  {stat.matches}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base font-medium text-green-400">
                  {stat.runs?.toLocaleString() || '0'}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-300">
                  {stat.average ? stat.average.toFixed(2) : '0.00'}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-300">
                  {stat.strikeRate ? stat.strikeRate.toFixed(2) : '0.00'}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base font-medium text-amber-400">
                  {stat.centuries || '0'}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base font-medium text-blue-400">
                  {stat.fifties || '0'}
                </td>
                <td className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm md:text-base font-semibold text-purple-400">
                  {stat.highest || '0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};