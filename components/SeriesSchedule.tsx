import React from 'react';
import Link from 'next/link';

interface ScheduleMatch {
  matchId: string;
  matchDesc: string;
  team1: string;
  team2: string;
  startDate: string;
  venue: string;
  status: string;
  format: string;
}

interface SeriesScheduleProps {
  schedule?: ScheduleMatch[];
  seriesName?: string;
}

const SeriesSchedule: React.FC<SeriesScheduleProps> = ({ schedule, seriesName }) => {
  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Schedule Available</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Schedule data is not available for this series yet.
        </p>
      </div>
    );
  }

  // Group matches by status
  const upcomingMatches = schedule.filter(match => match.status === 'UPCOMING' || match.status === 'Upcoming');
  const liveMatches = schedule.filter(match => match.status === 'LIVE' || match.status === 'Live');
  const completedMatches = schedule.filter(match => match.status === 'COMPLETED' || match.status === 'Complete');

  const renderMatchCard = (match: ScheduleMatch, index: number) => (
    <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">{match.matchDesc}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{match.format}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded ${
          match.status === 'LIVE' || match.status === 'Live' 
            ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' 
            : match.status === 'COMPLETED' || match.status === 'Complete'
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
        }`}>
          {match.status}
        </span>
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-1">
            <span className="text-green-800 dark:text-green-200 font-bold text-sm">{match.team1.substring(0, 3).toUpperCase()}</span>
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{match.team1}</p>
        </div>
        
        <div className="text-center px-4">
          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">VS</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-1">
            <span className="text-green-800 dark:text-green-200 font-bold text-sm">{match.team2.substring(0, 3).toUpperCase()}</span>
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{match.team2}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>📍 {match.venue}</span>
          <span>📅 {new Date(match.startDate).toLocaleDateString()}</span>
        </div>
      </div>
      
      {match.matchId && (
        <div className="mt-3">
          <Link 
            href={`/matches/${match.matchId}`}
            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium"
          >
            View Match Details →
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Schedule Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Schedule Overview</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{upcomingMatches.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{liveMatches.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Live</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completedMatches.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          </div>
        </div>
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Live Matches
          </h4>
          <div className="space-y-4">
            {liveMatches.map((match, index) => renderMatchCard(match, index))}
          </div>
        </div>
      )}

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Upcoming Matches</h4>
          <div className="space-y-4">
            {upcomingMatches.map((match, index) => renderMatchCard(match, index))}
          </div>
        </div>
      )}

      {/* Completed Matches */}
      {completedMatches.length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Completed Matches</h4>
          <div className="space-y-4">
            {completedMatches.slice(0, 5).map((match, index) => renderMatchCard(match, index))}
          </div>
          {completedMatches.length > 5 && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
              And {completedMatches.length - 5} more completed matches...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SeriesSchedule;