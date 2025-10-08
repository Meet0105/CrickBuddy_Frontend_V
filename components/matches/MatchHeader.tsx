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
    <div className="bg-slate-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden mb-4 sm:mb-6 border border-slate-700/50">
      <div className={`p-3 sm:p-4 md:p-5 ${statusColor} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-bold">{format}</span>
            {isLive && (
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                LIVE
              </span>
            )}
            <button
              onClick={syncMatchDetails}
              disabled={syncing}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncing ? 'Syncing...' : 'Sync Data'}
            </button>
          </div>
        </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 md:p-8">
        <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-center text-gray-100 mb-2 px-2">
          {currentMatch.title || `${actualTeam1Name} vs ${actualTeam2Name}`}
        </h1>
        <p className="text-center text-sm sm:text-base text-gray-400 mb-6 px-2">{currentMatch.series?.name || 'Series TBA'}</p>
        
        <div className="flex justify-between items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div className="text-center flex-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-lg border-4 border-slate-700">
              <span className="text-white font-black text-sm sm:text-base md:text-lg">{actualTeam1Name.substring(0, 3).toUpperCase()}</span>
            </div>
            <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-100 truncate px-1 mb-2">{actualTeam1Name}</h3>
            {(team1Score.runs > 0 || team1Score.wickets > 0) && (
              <p className="text-lg sm:text-xl md:text-2xl font-black text-emerald-400 mt-2">
                {team1Score.runs}/{team1Score.wickets}
              </p>
            )}
            {team1Score.overs > 0 && (
              <p className="text-xs sm:text-sm text-gray-400 mt-1">({team1Score.overs} ov)</p>
            )}
          </div>
          
          <div className="text-center flex-shrink-0 px-2 sm:px-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-slate-700/50 backdrop-blur-sm flex items-center justify-center mx-auto mb-2 border-2 border-slate-600">
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-gray-300">VS</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 whitespace-nowrap font-medium">
              {matchDate}
            </p>
            {matchTime && (
              <p className="text-xs text-gray-500 hidden sm:block mt-1">{matchTime}</p>
            )}
          </div>
          
          <div className="text-center flex-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mx-auto mb-3 shadow-lg border-4 border-slate-700">
              <span className="text-white font-black text-sm sm:text-base md:text-lg">{actualTeam2Name.substring(0, 3).toUpperCase()}</span>
            </div>
            <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-100 truncate px-1 mb-2">{actualTeam2Name}</h3>
            {(team2Score.runs > 0 || team2Score.wickets > 0) && (
              <p className="text-lg sm:text-xl md:text-2xl font-black text-cyan-400 mt-2">
                {team2Score.runs}/{team2Score.wickets}
              </p>
            )}
            {team2Score.overs > 0 && (
              <p className="text-xs sm:text-sm text-gray-400 mt-1">({team2Score.overs} ov)</p>
            )}
          </div>
        </div>
        
        <div className="border-t border-slate-700/50 pt-4 sm:pt-5 mt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex-1">
              <p className="text-gray-500 font-semibold mb-1 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Venue
              </p>
              <p className="font-semibold text-gray-100 break-words">{venue}</p>
            </div>
            <div className="flex-1 sm:text-right">
              <p className="text-gray-500 font-semibold mb-1 flex items-center gap-2 sm:justify-end">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Date & Time
              </p>
              <p className="font-semibold text-gray-100">{matchDate} {matchTime}</p>
            </div>
          </div>
        </div>

        {/* Result */}
        {currentMatch.result?.resultText && (
          <div className="mt-4 sm:mt-6 p-4 bg-emerald-900/30 backdrop-blur-sm border border-emerald-500/30 rounded-xl shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-emerald-300 font-bold text-center text-sm sm:text-base">
                {currentMatch.result.resultText}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};