// Utility functions for handling player images consistently across the app

export const getPlayerImageUrl = (player: any): string => {
  // Priority order for image URL sources:
  
  // 1. Direct image URL from API (most reliable)
  if (player?.image) {
    return player.image;
  }
  
  // 2. Raw data image URL (from player info API)
  if (player?.raw?.image) {
    return player.raw.image;
  }
  
  // 3. Face image ID (from player info API)
  if (player?.faceImageId) {
    return `https://static.cricbuzz.com/a/img/v1/192x192/i1/c${player.faceImageId}/i.jpg`;
  }
  
  // 4. Raw face image ID
  if (player?.raw?.faceImageId) {
    return `https://static.cricbuzz.com/a/img/v1/192x192/i1/c${player.raw.faceImageId}/i.jpg`;
  }
  
  // 5. Image ID (from team/squad data)
  if (player?.imageId) {
    return `https://static.cricbuzz.com/a/img/v1/192x192/i1/c${player.imageId}/i.jpg`;
  }
  
  // 6. Player ID fallback
  if (player?.playerId || player?.id) {
    const playerId = player.playerId || player.id;
    return `https://static.cricbuzz.com/a/img/v1/192x192/i1/c${playerId}/i.jpg`;
  }
  
  // 7. Default fallback (should not happen)
  return `https://static.cricbuzz.com/a/img/v1/192x192/i1/c0/i.jpg`;
};

export const getPlayerInitials = (player: any): string => {
  const name = player?.name || player?.playerName || player?.fullName || 'Player';
  return name.split(' ')
    .map((word: string) => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

export const createPlayerImageComponent = (
  player: any, 
  size: 'small' | 'medium' | 'large' = 'medium',
  className?: string
) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10', 
    large: 'w-16 h-16'
  };
  
  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-xs',
    large: 'text-xl'
  };
  
  const imageUrl = getPlayerImageUrl(player);
  const initials = getPlayerInitials(player);
  const sizeClass = sizeClasses[size];
  const textSizeClass = textSizeClasses[size];
  
  return {
    imageUrl,
    initials,
    sizeClass,
    textSizeClass,
    className: className || `${sizeClass} rounded-full object-cover`
  };
};