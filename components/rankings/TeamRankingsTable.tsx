import React from 'react';
import { TeamRanking } from '../../utils/rankings/rankingTypes';

interface TeamRankingsTableProps {
  title: string;
  rankings: TeamRanking[];
  format: string;
}

export const TeamRankingsTable: React.FC<TeamRankingsTableProps> = ({ title, rankings, format }) => {
  return (
    <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-700/50">
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-3 sm:p-4 md:p-5 rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">{title}</h3>
        </div>
      </div>
      <div className="p-3 sm:p-4 md:p-5">
        {rankings && rankings.length > 0 ? (
          <>
            <div className="sm:hidden mb-3 px-2 py-1.5 bg-green-900/20 border border-green-500/30 rounded-lg">
              <p className="text-xs text-green-300 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Swipe left to see all columns
              </p>
            </div>
            <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-5 px-3 sm:px-4 md:px-5 scrollbar-hide">
              <table className="min-w-full divide-y divide-gray-700/50">
                <thead className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
                  <tr>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider">Pos</th>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider">Team</th>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider">Rating</th>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-left text-xs sm:text-sm font-semibold text-green-400 uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/50 divide-y divide-gray-700/30">
                  {rankings.map((team) => (
                    <tr 
                      key={team.position} 
                      className={`${team.position <= 3 ? 'bg-gradient-to-r from-green-900/40 to-green-800/30 hover:from-green-900/50 hover:to-green-800/40' : 'hover:bg-gray-700/30'} transition-colors duration-150`}
                    >
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-green-900/60 text-xs sm:text-sm md:text-base font-black text-green-300">
                          {team.position}
                        </span>
                      </td>
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 whitespace-nowrap text-xs sm:text-sm md:text-base font-medium text-gray-200">{team.teamName}</td>
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 whitespace-nowrap text-xs sm:text-sm md:text-base font-bold text-green-400">{team.rating}</td>
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-300">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="bg-gray-900/50 rounded-lg sm:rounded-xl shadow p-6 sm:p-8 md:p-10 text-center border border-gray-700/50">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm sm:text-base md:text-lg text-gray-400">{format} rankings data is currently being synced. Please check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};