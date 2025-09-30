import React from 'react';
import Link from 'next/link';
import { Team, Player } from '../../utils/teams/teamTypes';
import { getPlayerImageUrl, getPlayerInitials } from '../../utils/playerImageUtils';

interface TeamInfoProps {
  team: Team;
}

export const TeamInfo: React.FC<TeamInfoProps> = ({ team }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white mb-2">Team Information</h2>
        {team.country && (
          <p className="text-gray-300">Country: {team.country}</p>
        )}
      </div>

      {team.players && team.players.length > 0 ? (
        <div>
          <h3 className="text-md font-bold text-white mb-3">Players</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {team.players.map((player: Player, index: number) => (
              <Link
                key={player.playerId || player.id || index}
                href={`/players/${player.playerId || player.id}`}
                className="border border-gray-700 rounded p-3 hover:bg-gray-800 hover:border-gray-600 transition cursor-pointer block group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 mr-3">
                      <img 
                        src={getPlayerImageUrl(player)}
                        alt={`${player.name || 'Player'} photo`}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.fallback-avatar') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="fallback-avatar absolute inset-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center hidden">
                        <span className="text-white font-bold text-xs">
                          {getPlayerInitials(player)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-green-400">
                        {player.name || player.fullName || 'Unknown Player'}
                      </p>
                      {(player.role || player.position) && (
                        <p className="text-sm text-gray-300">{player.role || player.position}</p>
                      )}
                      <div className="flex space-x-4 mt-1">
                        {player.battingStyle && (
                          <p className="text-xs text-gray-400">Bat: {player.battingStyle}</p>
                        )}
                        {player.bowlingStyle && (
                          <p className="text-xs text-gray-400">Bowl: {player.bowlingStyle}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-green-400 group-hover:text-green-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-300">No players data available for this team.</p>
      )}
    </div>
  );
};