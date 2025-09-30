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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="bg-gradient-to-r from-green-700 to-green-800 p-5">
        <h3 className="text-xl font-bold text-white mb-1">Career Statistics</h3>
        <div className="flex items-center">
          <h4 className="font-bold text-white text-lg">{playerName}</h4>
          <span className="mx-2 text-green-200">•</span>
          <p className="text-green-200">{country}</p>
        </div>
      </div>
      
      <div className="p-5 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Format</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">M</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">R</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">W</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Avg</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">SR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {stats.map((stat, index) => (
              <tr key={index} className="hover:bg-green-50 dark:hover:bg-green-900 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">{stat.format}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">{stat.matches}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">{stat.runs}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">{stat.wickets}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">{stat.average?.toFixed(2) || '-'}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">{stat.strikeRate?.toFixed(2) || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerStatsCard;