import React from 'react';
import Link from 'next/link';
import { Match } from './utils/seriesTypes';

interface MatchesTabProps {
  matches: Match[];
}

export const MatchesTab: React.FC<MatchesTabProps> = ({ matches }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-100 mb-4">Matches</h3>
      {matches && matches.length > 0 ? (
        <div className="space-y-3">
          {matches.map((match) => (
            <Link key={match.matchId} href={`/matches/${match.matchId}`}>
              <div className="block cursor-pointer p-4 bg-gray-750 border border-gray-700 rounded-lg hover:bg-gray-700 transition">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-100">{match.title}</h4>
                  <span className="text-sm text-gray-400">{new Date(match.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">
                    {match.teams.team1.teamName} vs {match.teams.team2.teamName}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    match.status === 'Complete' ? 'bg-green-900/30 text-green-400' :
                    match.status === 'Live' ? 'bg-red-900/30 text-red-400' :
                    match.status === 'Upcoming' || match.status === 'Preview' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {match.status}
                  </span>
                </div>
                {match.result && (
                  <p className="text-sm text-gray-400 mt-1">{match.result}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No matches available for this series.</p>
      )}
    </div>
  );
};