import React from 'react';
import Link from 'next/link';
import { extractTeamInfo, extractMatchInfo, getMatchStatusColor } from '../../utils/matches/matchHelpers';

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

  // Get team data and assign scores based on who is actually batting
  const actualTeam1 = currentMatch?.teams?.[0] || {};
  const actualTeam2 = currentMatch?.teams?.[1] || {};

  // Determine which team is batting based on toss
  const tossStatus = currentMatch?.raw?.tossstatus || '';
  const actualTeam1Name = actualTeam1?.teamName || '';
  const actualTeam2Name = actualTeam2?.teamName || '';

  let battingTeamName = actualTeam1Name; // Default
  if (tossStatus.includes('opt to bat') || tossStatus.includes('choose to bat')) {
    if (tossStatus.includes(actualTeam2Name) && !tossStatus.includes(actualTeam1Name)) {
      battingTeamName = actualTeam2Name;
    } else if (tossStatus.includes(actualTeam1Name) && !tossStatus.includes(actualTeam2Name)) {
      battingTeamName = actualTeam1Name;
    }
  } else if (tossStatus.includes('opt to bowl') || tossStatus.includes('choose to bowl')) {
    if (tossStatus.includes(actualTeam1Name) && !tossStatus.includes(actualTeam2Name)) {
      battingTeamName = actualTeam2Name;
    } else if (tossStatus.includes(actualTeam2Name) && !tossStatus.includes(actualTeam1Name)) {
      battingTeamName = actualTeam1Name;
    }
  }

  // Find which score is the active batting score
  const activeBattingScore = team1Score.runs > 0 || team1Score.wickets > 0 ? team1Score :
    team2Score.runs > 0 || team2Score.wickets > 0 ? team2Score :
      { runs: 0, wickets: 0, overs: 0 };

  // Assign scores based on who is actually batting
  let finalTeam1Score, finalTeam2Score;
  if (battingTeamName === actualTeam1Name) {
    finalTeam1Score = activeBattingScore;
    finalTeam2Score = { runs: 0, wickets: 0, overs: 0 };
  } else {
    finalTeam1Score = { runs: 0, wickets: 0, overs: 0 };
    finalTeam2Score = activeBattingScore;
  }

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
            {(finalTeam1Score.runs > 0 || finalTeam1Score.wickets > 0) && (
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
                {finalTeam1Score.runs}/{finalTeam1Score.wickets}
              </p>
            )}
            {finalTeam1Score.overs > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">({finalTeam1Score.overs} ov)</p>
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
            {(finalTeam2Score.runs > 0 || finalTeam2Score.wickets > 0) && (
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
                {finalTeam2Score.runs}/{finalTeam2Score.wickets}
              </p>
            )}
            {finalTeam2Score.overs > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">({finalTeam2Score.overs} ov)</p>
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
        {(currentMatch?.raw?.shortstatus ||
          currentMatch.result?.resultText ||
          (status && (status.includes('won') || status.includes('Won') || status.includes('by') || status.includes('Complete')))) && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-800 dark:text-green-300 font-bold text-center">
                  {currentMatch?.raw?.shortstatus ||
                    currentMatch.result?.resultText ||
                    currentMatch?.raw?.status ||
                    status}
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};