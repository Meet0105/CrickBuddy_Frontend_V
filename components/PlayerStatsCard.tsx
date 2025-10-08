import React from 'react';

interface PlayerStatsCardProps {
  playerName: string;
  country: string;
  stats: {
    format: string;
    matches: number;
    runs: number;
    wickets: number;
    average?: number;
    strikeRate?: number;
  }[];
}
const PlayerStatsCard: React.FC<PlayerStatsCardProps> = ({ playerName, country, stats }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="bg-gradient-to-r from-green-700 to-green-800 p-4 sm:p-5 md:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">Career Statistics</h3>
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-bold text-white text-sm sm:text-base md:text-lg">{playerName}</h4>
          <span className="text-green-200">•</span>
          <p className="text-xs sm:text-sm text-green-200">{country}</p>
        </div>
      </div>
      
      <div className="p-3 sm:p-4 md:p-5 overflow-x-auto -mx-3 sm:mx-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-700 z-10">Format</th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">M</th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">R</th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">W</th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Avg</th>
              <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-center text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">SR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {stats.map((stat, index) => (
              <tr key={index} className="hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors">
                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 sticky left-0 bg-white dark:bg-gray-800 z-10">{stat.format}</td>
                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{stat.matches}</td>
                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{stat.runs}</td>
                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{stat.wickets}</td>
                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{stat.average?.toFixed(2) || '-'}</td>
                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{stat.strikeRate?.toFixed(2) || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerStatsCard;