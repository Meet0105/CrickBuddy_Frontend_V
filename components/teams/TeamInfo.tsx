import React from 'react';
import Link from 'next/link';
import { Team, Player } from '../../utils/teams/teamTypes';
import { getPlayerImageUrl, getPlayerInitials } from '../../utils/playerImageUtils';

interface TeamInfoProps {
  team: Team;
}

export const TeamInfo: React.FC<TeamInfoProps> = ({ team }) => {
  return (
    <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6 border border-gray-700/50">
      <div className="mb-4">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Team Information
        </h2>
        {team.country && (
          <p className="text-sm sm:text-base text-gray-300">Country: {team.country}</p>
        )}
      </div>

      {team.players && team.players.length > 0 ? (
        <div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Players
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {team.players.map((player: Player, index: number) => (
              <Link
                key={player.playerId || player.id || index}
                href={`/players/${player.playerId || player.id}`}
                className="border border-gray-700/50 rounded-lg sm:rounded-xl p-2 sm:p-3 hover:bg-gray-800/50 hover:border-green-400/30 transition-all duration-200 transform hover:scale-[1.01] cursor-pointer block group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3 flex-shrink-0">
                      <img 
                        src={getPlayerImageUrl(player)}
                        alt={`${player.name || 'Player'} photo`}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-purple-500/30"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.fallback-avatar') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="fallback-avatar absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center hidden border-2 border-purple-500/30">
                        <span className="text-white font-bold text-xs sm:text-sm">
                          {getPlayerInitials(player)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                        {player.name || player.fullName || 'Unknown Player'}
                      </p>
                      {(player.role || player.position) && (
                        <p className="text-xs sm:text-sm text-gray-300">{player.role || player.position}</p>
                      )}
                      <div className="flex flex-wrap gap-2 sm:gap-4 mt-1">
                        {player.battingStyle && (
                          <p className="text-xs text-gray-400">🏏 {player.battingStyle}</p>
                        )}
                        {player.bowlingStyle && (
                          <p className="text-xs text-gray-400">🎯 {player.bowlingStyle}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-green-400 group-hover:text-green-300 flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm sm:text-base text-gray-300 italic text-center p-4">No players data available for this team.</p>
      )}
    </div>
  );
};