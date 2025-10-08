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
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700 p-3 sm:p-4 md:p-5">
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        {playerImageUrl ? (
          <img 
            src={playerImageUrl} 
            alt={player.name}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center border-2 border-white shadow-md flex-shrink-0">
            <span className="text-white font-bold text-base sm:text-lg md:text-xl">{getPlayerInitials(player.name)}</span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base md:text-lg truncate">{player.name || 'Unknown Player'}</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">{player.role || 'Role Unknown'} • {player.country || 'Country Unknown'}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 grid grid-cols-2 gap-2 sm:gap-3">
        <div className="text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
            {player.battingStats?.runs || player.runs || 0}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 font-medium mt-1">Runs</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
            {player.bowlingStats?.wickets || player.wickets || 0}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 font-medium mt-1">Wickets</div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;