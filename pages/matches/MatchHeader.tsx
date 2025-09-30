import React from 'react';
import Link from 'next/link';
import { extractTeamInfo, extractMatchInfo, getMatchStatusColor } from './utils/matchHelpers';

interface MatchHeaderProps {
  currentMatch: any;
  isLive: boolean;
  status: string;
  format: string;
  venue: string;
  matchDate: string;
  matchTime: string;
  syncMatchDetails: () => void;
  syncing: boolean;
}

export const MatchHeader: React.FC<MatchHeaderProps> = ({
  currentMatch,
  isLive,
  status,
  format,
  venue,
  matchDate,
  matchTime,
  syncMatchDetails,
  syncing
}) => {
  const { team1Name, team2Name, team1Score, team2Score } = extractTeamInfo(currentMatch);
  const statusColor = getMatchStatusColor(isLive, status);

  // Get team names from raw data if available
  const actualTeam1Name = currentMatch?.teams?.[0]?.teamName || 
                          currentMatch?.raw?.matchInfo?.team1?.teamName || 
                          currentMatch?.raw?.matchInfo?.team1?.name || 
                          team1Name;
                          
  const actualTeam2Name = currentMatch?.teams?.[1]?.teamName || 
                          currentMatch?.raw?.matchInfo?.team2?.teamName || 
                          currentMatch?.raw?.matchInfo?.team2?.name || 
                          team2Name;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
      <div className={`p-4 ${statusColor} text-white`}>
        <div className="flex justify-between items-center">
          <span className="font-bold">{format}</span>
          <div className="flex items-center space-x-4">
            <span className="font-bold">{isLive ? 'LIVE' : status}</span>
            <button
              onClick={syncMatchDetails}
              disabled={syncing}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm transition disabled:opacity-50"
            >
              {syncing ? 'Syncing...' : 'Sync Data'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
          {currentMatch.title || `${actualTeam1Name} vs ${actualTeam2Name}`}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{currentMatch.series?.name || 'Series TBA'}</p>
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-2">
              <span className="text-green-800 dark:text-green-200 font-bold text-lg">{actualTeam1Name.substring(0, 3).toUpperCase()}</span>
            </div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100">{actualTeam1Name}</h3>
            {(team1Score.runs > 0 || team1Score.wickets > 0) && (
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
                {team1Score.runs}/{team1Score.wickets}
              </p>
            )}
            {team1Score.overs > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">({team1Score.overs} ov)</p>
            )}
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {isLive || status === 'COMPLETED' || status.includes('Complete') || status.includes('won') ? (
                <span>VS</span>
              ) : (
                <span>VS</span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {matchDate}
            </p>
            {matchTime && (
              <p className="text-xs text-gray-400 dark:text-gray-500">{matchTime}</p>
            )}
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-2">
              <span className="text-green-800 dark:text-green-200 font-bold text-lg">{actualTeam2Name.substring(0, 3).toUpperCase()}</span>
            </div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100">{actualTeam2Name}</h3>
            {(team2Score.runs > 0 || team2Score.wickets > 0) && (
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
                {team2Score.runs}/{team2Score.wickets}
              </p>
            )}
            {team2Score.overs > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">({team2Score.overs} ov)</p>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Venue</p>
              <p className="font-medium text-gray-800 dark:text-gray-100">{venue}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Date & Time</p>
              <p className="font-medium text-gray-800 dark:text-gray-100">{matchDate} {matchTime}</p>
            </div>
          </div>
        </div>

        {/* Result */}
        {currentMatch.result?.resultText && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
            <p className="text-green-800 dark:text-green-300 font-medium text-center">
              {currentMatch.result.resultText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};