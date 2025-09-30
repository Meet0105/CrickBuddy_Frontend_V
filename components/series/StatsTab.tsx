import React from 'react';

interface StatsTabProps {
  seriesData: any;
  fetchSeriesData: (endpoint: string) => void;
}

export const StatsTab: React.FC<StatsTabProps> = ({ seriesData, fetchSeriesData }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-100 mb-4">Statistics</h3>
      {/* Stats type selection buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => fetchSeriesData('stats?statsType=mostRuns')}
          className={`px-3 py-1 text-sm rounded ${
            seriesData && seriesData.t20StatsList?.headers?.includes('Runs') 
              ? 'bg-green-500 text-gray-900 shadow-md' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors'
          }`}
        >
          Most Runs
        </button>
        <button
          onClick={() => fetchSeriesData('stats?statsType=mostWickets')}
          className={`px-3 py-1 text-sm rounded ${
            seriesData && seriesData.t20StatsList?.headers?.includes('Wickets') 
              ? 'bg-green-500 text-gray-900 shadow-md' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors'
          }`}
        >
          Most Wickets
        </button>
      </div>
      
      {seriesData && (seriesData.t20StatsList || seriesData.odiStatsList || seriesData.testStatsList) ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                {(seriesData.t20StatsList || seriesData.odiStatsList || seriesData.testStatsList)?.headers?.map((header: string, index: number) => (
                  <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {(seriesData.t20StatsList || seriesData.odiStatsList || seriesData.testStatsList)?.values?.map((player: any, index: number) => (
                <tr key={index} className="hover:bg-gray-800 transition-colors">
                  {player.values?.map((value: string, valueIndex: number) => (
                    <td key={valueIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400 italic">No statistics data available.</p>
      )}
    </div>
  );
};