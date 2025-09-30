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
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <div className="relative w-16 h-16 mr-4">
          <img 
            src={imageUrl}
            alt={`${player.name} photo`}
            className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.parentElement?.querySelector('.fallback-avatar') as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center hidden">
            <span className="text-green-300 font-bold text-xl">
              {initials}
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-green-300">{player.name}</h1>
      </div>
      <Link href="/" className="text-green-400 hover:text-green-200 text-sm font-medium">
        ← Back to Home
      </Link>
    </div>
  );
};