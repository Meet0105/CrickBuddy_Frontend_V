import React from 'react';

const PlayerCard: React.FC<{ player: any }> = ({ player }) => {
  // Function to construct image URL for player
  const getPlayerImageUrl = () => {
    if (player && player.imageId) {
      return `/api/photos/image/${player.imageId}`;
    }
    if (player && player.imageURL) {
      return player.imageURL;
    }
    return null;
  };

  const playerImageUrl = getPlayerImageUrl();

  // Get player initials for fallback
  const getPlayerInitials = (name: string) => {
    if (!name) return 'P';
    return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700 p-5">
      <div className="flex items-center mb-4">
        {playerImageUrl ? (
          <img 
            src={playerImageUrl} 
            alt={player.name}
            className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-white shadow-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center mr-4 border-2 border-white shadow-md">
            <span className="text-white font-bold text-xl">{getPlayerInitials(player.name)}</span>
          </div>
        )}
        <div>
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">{player.name || 'Unknown Player'}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{player.role || 'Role Unknown'} • {player.country || 'Country Unknown'}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 grid grid-cols-2 gap-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {player.battingStats?.runs || player.runs || 0}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-300">Runs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {player.bowlingStats?.wickets || player.wickets || 0}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-300">Wickets</div>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard;