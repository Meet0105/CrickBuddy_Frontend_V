import React from 'react';

interface PointsTableEntry {
  teamId: string;
  teamName: string;
  teamShortName: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  points: number;
  netRunRate: number;
  position: number;
  form?: string[];
}

interface SeriesPointsTableProps {
  pointsTable?: PointsTableEntry[];
  seriesName?: string;
}

const SeriesPointsTable: React.FC<SeriesPointsTableProps> = ({ pointsTable, seriesName }) => {
  console.log('SeriesPointsTable component received:', { pointsTable, seriesName });
  
  if (!pointsTable || pointsTable.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-gray-500 dark:text-gray-400">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Points Table Available</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Points table data is not available for this series yet.
        </p>
      </div>
    );
  }

  // Sort by position, handle missing position values
  const sortedTable = [...pointsTable].sort((a, b) => {
    const posA = a.position || 999;
    const posB = b.position || 999;
    return posA - posB;
  });

  return (
    <div className="space-y-4">
      {/* Points Table Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Points Table</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{seriesName}</p>
      </div>

      {/* Points Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Pos
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  P
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  W
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  L
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  T
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  NR
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Pts
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  NRR
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Form
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedTable.map((team, index) => (
                <tr key={team.teamId} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        team.position <= 2 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                        team.position <= 4 ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}>
                        {team.position}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-800 dark:text-green-200 font-bold text-xs">
                          {team.teamShortName || team.teamName.substring(0, 3).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{team.teamName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                    {team.played || 0}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-green-600 dark:text-green-400">
                    {team.won || 0}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium text-red-600 dark:text-red-400">
                    {team.lost || 0}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                    {team.tied || 0}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300">
                    {team.noResult || 0}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-bold text-gray-900 dark:text-gray-100">
                    {team.points || 0}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-900 dark:text-gray-100">
                    {team.netRunRate ? parseFloat(team.netRunRate.toString()).toFixed(3) : '0.000'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-1">
                      {team.form && team.form.length > 0 ? (
                        team.form.slice(-5).map((result, idx) => (
                          <span
                            key={idx}
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                              result === 'W' ? 'bg-green-500 dark:bg-green-700 text-white' :
                              result === 'L' ? 'bg-red-500 dark:bg-red-700 text-white' :
                              result === 'T' ? 'bg-yellow-500 dark:bg-yellow-700 text-white' :
                              'bg-gray-400 dark:bg-gray-600 text-white'
                            }`}
                          >
                            {result}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-xs">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><strong>P:</strong> Played</div>
          <div><strong>W:</strong> Won</div>
          <div><strong>L:</strong> Lost</div>
          <div><strong>T:</strong> Tied</div>
          <div><strong>NR:</strong> No Result</div>
          <div><strong>Pts:</strong> Points</div>
          <div><strong>NRR:</strong> Net Run Rate</div>
          <div><strong>Form:</strong> Last 5 matches</div>
        </div>
      </div>
    </div>
  );
};

export default SeriesPointsTable;