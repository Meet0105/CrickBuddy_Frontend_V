import React from 'react';
import Link from 'next/link';
import { Team } from '../../utils/teams/teamTypes';

interface TeamHeaderProps {
  team: Team;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6 p-4 sm:p-5 md:p-6 bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-700/50">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0">
          {team.raw?.imageId ? (
            <img
              src={`https://static.cricbuzz.com/a/img/v1/192x192/i1/c${team.raw.imageId}/i.jpg`}
              alt={team.flagImage?.alt || `${team.name} flag`}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-2 sm:border-4 border-green-500/30 shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.parentElement?.querySelector('.fallback-flag') as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          <div className={`fallback-flag absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center border-2 sm:border-4 border-green-500/30 shadow-lg ${team.raw?.imageId ? 'hidden' : 'flex'}`}>
            <span className="text-white font-bold text-base sm:text-xl md:text-2xl">
              {team.name.split(' ').map((word: string) => word.charAt(0)).join('').substring(0, 2)}
            </span>
          </div>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100 leading-tight">{team.name}</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Team Profile</p>
        </div>
      </div>
      <Link href="/teams" className="inline-flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gray-700/80 hover:bg-gray-700 text-blue-400 hover:text-blue-300 text-xs sm:text-sm md:text-base font-semibold rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-105 border border-gray-600/50 hover:border-blue-500/30">
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Teams
      </Link>
    </div>
  );
};