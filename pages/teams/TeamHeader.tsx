import React from 'react';
import Link from 'next/link';
import { Team } from './utils/teamTypes';

interface TeamHeaderProps {
  team: Team;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <div className="relative w-12 h-12 mr-4">
          {team.raw?.imageId ? (
            <img
              src={`https://static.cricbuzz.com/a/img/v1/192x192/i1/c${team.raw.imageId}/i.jpg`}
              alt={team.flagImage?.alt || `${team.name} flag`}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.parentElement?.querySelector('.fallback-flag') as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          <div className={`fallback-flag absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center ${team.raw?.imageId ? 'hidden' : 'flex'}`}>
            <span className="text-white font-bold text-lg">
              {team.name.split(' ').map((word: string) => word.charAt(0)).join('').substring(0, 2)}
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-100">{team.name}</h1>
      </div>
      <Link href="/teams" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
        ← Back to Teams
      </Link>
    </div>
  );
};