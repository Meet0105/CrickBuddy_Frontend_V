import React from 'react';
import Link from 'next/link';
import { getPlayerImageUrl, getPlayerInitials } from '../../utils/playerImageUtils';

interface Player {
  playerId: string;
  name: string;
  role: string;
  country: string;
  stats?: any;
  raw?: any;
}

interface PlayerHeaderProps {
  player: Player;
}

export const PlayerHeader: React.FC<PlayerHeaderProps> = ({ player }) => {
  const imageUrl = getPlayerImageUrl(player);
  const initials = getPlayerInitials(player);

  return (
    <div className="bg-gradient-to-r from-gray-800/95 to-gray-700/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-5 md:p-6 lg:p-7 mb-4 sm:mb-5 md:mb-6 border border-gray-700/50">
      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-5">
        {/* Player Info Section */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto">
          {/* Player Avatar */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex-shrink-0">
            <img 
              src={imageUrl}
              alt={`${player.name} photo`}
              className="w-full h-full rounded-full object-cover border-3 sm:border-4 border-green-400 shadow-lg ring-2 ring-green-500/30 transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.parentElement?.querySelector('.fallback-avatar') as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="fallback-avatar absolute inset-0 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center hidden shadow-lg">
              <span className="text-green-300 font-bold text-base sm:text-xl md:text-2xl lg:text-3xl">
                {initials}
              </span>
            </div>
          </div>

          {/* Player Name & Details */}
          <div className="flex flex-col gap-1 sm:gap-1.5 flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-green-300 hover:text-green-200 transition-colors truncate">
              {player.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
              {player.role && (
                <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-green-900/60 text-green-300 rounded-full font-medium flex items-center gap-1 sm:gap-1.5">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {player.role}
                </span>
              )}
              {player.country && (
                <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-blue-900/60 text-blue-300 rounded-full font-medium flex items-center gap-1 sm:gap-1.5">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                  {player.country}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <Link 
          href="/" 
          className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-green-600/20 hover:bg-green-600/30 active:bg-green-600/40 border border-green-500/40 hover:border-green-400/60 text-green-300 hover:text-green-200 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="hidden sm:inline">Back to Home</span>
          <span className="sm:hidden">Home</span>
        </Link>
      </div>
    </div>
  );
};