import React from 'react';
import Link from 'next/link';
import { RecordItem } from '../../utils/records/recordsTypes';
import { getCountryFlag, getPlayerInitials } from '../../utils/records/recordsHelpers';

interface RecordsTableProps {
  records: RecordItem[];
  filters: any[];
  selectedStatsType: string;
  selectedMatchType: string;
}

export const RecordsTable: React.FC<RecordsTableProps> = ({ 
  records, 
  filters, 
  selectedStatsType, 
  selectedMatchType 
}) => {
  // Get the header for the current stats type
  const getStatsHeader = () => {
    if (selectedStatsType.includes('Runs') || selectedStatsType.includes('runs')) return 'Runs';
    if (selectedStatsType.includes('Wickets') || selectedStatsType.includes('wickets')) return 'Wickets';
    if (selectedStatsType.includes('Score') || selectedStatsType.includes('score')) return 'Score';
    if (selectedStatsType.includes('Average') || selectedStatsType.includes('average')) return 'Average';
    return 'Value';
  };

  // Get match type label
  const getMatchTypeLabel = () => {
    return selectedMatchType === '1' ? '🏏 Test Cricket' : 
           selectedMatchType === '2' ? '🏆 ODI Cricket' : 
           '⚡ T20 Cricket';
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {filters.find(f => f.value === selectedStatsType)?.header || 'Cricket Records'}
          </h2>
          <div className="text-sm opacity-90">
            {getMatchTypeLabel()}
          </div>
        </div>
        {records && records.length > 0 && (
          <p className="text-sm opacity-90 mt-1">
            Showing {records.length} records • Top performers in cricket history
          </p>
        )}
      </div>
      <div className="p-4">
        {records && records.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Player</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {getStatsHeader()}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Against</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ground</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Period</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {records.map((record, index) => (
                  <tr key={index} className={`${index < 3 ? 'bg-gradient-to-r from-green-900/20 to-green-800/10' : ''} hover:bg-gray-750 transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                          index === 0 ? 'bg-yellow-900/30 text-yellow-400' :
                          index === 1 ? 'bg-gray-700 text-gray-300' :
                          index === 2 ? 'bg-orange-900/30 text-orange-400' :
                          'bg-green-900/30 text-green-400'
                        }`}>
                          {record.rank}
                        </span>
                        {index < 3 && (
                          <span className="ml-2 text-lg">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center mr-3">
                          <span className="text-white font-bold text-xs">
                            {getPlayerInitials(record.playerName)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-200">{record.playerName}</div>
                          <div className="text-xs text-gray-400">Cricket Legend</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getCountryFlag(record.country)}</span>
                        <div className="text-sm text-gray-300">{record.country}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-400">{record.value}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{record.against || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{record.ground || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{record.date || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow p-8 text-center border border-gray-700">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">No Records Found</h3>
            <p className="text-gray-400 mb-4">No records available for the selected filters. Try different options!</p>
            <Link href="/records" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Reset Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};