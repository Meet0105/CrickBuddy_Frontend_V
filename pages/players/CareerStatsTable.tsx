import React from 'react';
import { CareerStat } from './utils/playerTypes';

interface CareerStatsTableProps {
  career: CareerStat[];
}

export const CareerStatsTable: React.FC<CareerStatsTableProps> = ({ career }) => {
  if (!career || career.length === 0) return null;

  return (
    <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-bold text-green-300 mb-4">Career Information</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Format</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Debut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">Last Played</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {career.map((stat, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-300">{stat.format}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {stat.debut && stat.debut !== 'N/A' ? (
                    <div>
                      <div className="font-medium">{stat.debut.split(',')[0]}</div>
                      <div className="text-xs text-gray-500">{stat.debut.split(',').slice(1).join(',').trim()}</div>
                    </div>
                  ) : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {stat.lastPlayed && stat.lastPlayed !== 'N/A' ? (
                    <div>
                      <div className="font-medium">{stat.lastPlayed.split(',')[0]}</div>
                      <div className="text-xs text-gray-500">{stat.lastPlayed.split(',').slice(1).join(',').trim()}</div>
                    </div>
                  ) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};