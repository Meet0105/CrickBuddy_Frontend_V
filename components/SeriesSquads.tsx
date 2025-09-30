import React from 'react';

interface Player {
  playerId: string;
  playerName?: string;
  name?: string;
  fullName?: string;
  shortName?: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  isPlaying11?: boolean;
  isCaptain?: boolean;
  isWicketKeeper?: boolean;
}

interface Squad {
  teamId: string;
  teamName?: string;
  squadType?: string;
  players: Player[];
  lastUpdated: string;
}

interface SeriesSquadsProps {
  squads?: Squad[];
  seriesName?: string;
}

const SeriesSquads: React.FC<SeriesSquadsProps> = ({ squads, seriesName }) => {
  console.log('SeriesSquads component received:', { squads, seriesName });
  
  if (!squads || squads.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Squads Available</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Squad data is not available for this series yet.
        </p>
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'batsman':
      case 'batter':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'bowler':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'all-rounder':
      case 'allrounder':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'wicket-keeper':
      case 'wicketkeeper':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const getPlayerName = (player: Player): string => {
    return player.playerName || player.name || player.fullName || player.shortName || 'Unknown Player';
  };

  const renderPlayerCard = (player: Player, index: number) => (
    <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
          {getPlayerName(player)}
          {player.isCaptain && (
            <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full font-bold">
              (C)
            </span>
          )}
          {player.isWicketKeeper && (
            <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full font-bold">
              (WK)
            </span>
          )}
        </h4>
        {player.isPlaying11 && (
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full font-medium">
            Playing XI
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        <div>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(player.role)}`}>
            {player.role}
          </span>
        </div>
        
        {(player.battingStyle || player.bowlingStyle) && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {player.battingStyle && (
              <div>🏏 {player.battingStyle}</div>
            )}
            {player.bowlingStyle && (
              <div>⚾ {player.bowlingStyle}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Squads Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Team Squads</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{seriesName}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{squads.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Teams</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {squads.reduce((total, squad) => total + squad.players.length, 0)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Players</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {squads.reduce((total, squad) => total + squad.players.filter(p => p.isCaptain).length, 0)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Captains</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {squads.reduce((total, squad) => total + squad.players.filter(p => p.isWicketKeeper).length, 0)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Wicket Keepers</p>
          </div>
        </div>
      </div>

      {/* Team Squads */}
      {squads?.map((squad, squadIndex) => (
        <div key={squadIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="bg-gray-800 dark:bg-gray-900 text-white p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-bold">
                  {squad.teamName || squad?.squadType || `Team ${squadIndex + 1}`}
                </h4>
                <p className="text-sm text-gray-300 dark:text-gray-400">{squad.players?.length || 0} players</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {(squad.teamName || squad.squadType|| 'T').substring(0, 3).toUpperCase() }
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            {/* Playing XI */}
            {squad.players.some(p => p.isPlaying11) && (
              <div className="mb-6">
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Playing XI
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {squad.players
                    .filter(player => player.isPlaying11)
                    .map((player, index) => renderPlayerCard(player, index))}
                </div>
              </div>
            )}
            
            {/* Full Squad */}
            <div>
              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Full Squad</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {squad.players.map((player, index) => renderPlayerCard(player, index))}
              </div>
            </div>
            
            {/* Squad Stats */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {squad.players.filter(p => p.role.toLowerCase().includes('bat')).length}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Batsmen</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {squad.players.filter(p => p.role.toLowerCase().includes('bowl')).length}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Bowlers</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {squad.players.filter(p => p.role.toLowerCase().includes('all')).length}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">All-rounders</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {squad.players.filter(p => p.isWicketKeeper).length}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Keepers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeriesSquads;