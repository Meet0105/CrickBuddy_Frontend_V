import React from 'react';
import Link from 'next/link';
import { Match } from '../../utils/series/seriesTypes';

interface MatchesTabProps {
  matches: Match[];
}

export const MatchesTab: React.FC<MatchesTabProps> = ({ matches }) => {
  return (
    <div>
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 mb-3 sm:mb-4">Matches</h3>
      {matches && matches.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          {matches.map((match) => (
            <Link key={match.matchId} href={`/matches/${match.matchId}`}>
              <div className="block cursor-pointer p-3 sm:p-4 md:p-5 bg-gray-750/95 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-xl hover:bg-gray-700 hover:border-green-500/30 transition-all duration-200 transform hover:scale-[1.01]">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2 sm:mb-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-100 line-clamp-2">{match.title}</h4>
                  <span className="text-xs sm:text-sm text-gray-400 flex-shrink-0">{new Date(match.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <span className="text-xs sm:text-sm md:text-base text-gray-300 font-medium">
                    {match.teams.team1.teamName} vs {match.teams.team2.teamName}
                  </span>
                  <span className={`text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full self-start sm:self-auto ${
                    match.status === 'Complete' ? 'bg-green-900/40 text-green-400 border border-green-700/30' :
                    match.status === 'Live' ? 'bg-red-900/40 text-red-400 border border-red-700/30 animate-pulse' :
                    match.status === 'Upcoming' || match.status === 'Preview' ? 'bg-blue-900/40 text-blue-400 border border-blue-700/30' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {match.status}
                  </span>
                </div>
                {match.result && (
                  <p className="text-xs sm:text-sm text-gray-400 mt-2 line-clamp-2">{match.result}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm sm:text-base text-gray-400 italic p-4 text-center">No matches available for this series.</p>
      )}
    </div>
  );
};