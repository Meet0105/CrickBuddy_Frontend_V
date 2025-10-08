// Helper functions for processing ranking data

export const processTeamStandings = (data: any, fallbackData: any[]) => {
  // Don't use fallback data - return empty array if no valid data
  if (!data || !data.values || !Array.isArray(data.values) || data.values.length === 0) {
    console.warn('No valid team standings data received from API');
    return [];
  }
  
  return data.values.map((team: any) => ({
    position: parseInt(team.value?.[0] || '0') || 0,
    teamName: team.value?.[2] || 'Unknown Team',
    rating: parseFloat(team.value?.[3] || '0') || 0,
    points: Math.round(parseFloat(team.value?.[3] || '0') * 100) || 0 // Convert percentage to points
  }));
};

export const processPlayerRankings = (data: any, fallbackData: any[]) => {
  // Don't use fallback data - return empty array if no valid data
  // This prevents showing wrong data (batsmen in bowlers, etc.)
  if (!data || !data.rank || !Array.isArray(data.rank) || data.rank.length === 0) {
    console.warn('No valid ranking data received from API');
    return [];
  }
  
  return data.rank.map((player: any, index: number) => ({
    position: parseInt(player.rank || (index + 1).toString()) || (index + 1),
    playerName: player.name || `Player ${index + 1}`,
    country: player.country || player.team || 'Unknown',
    rating: parseInt(player.rating || '0') || 0,
    points: parseInt(player.points || '0') || 0
  }));
};

// Fallback data removed - we now return empty arrays instead of misleading fallback data
// This prevents showing batsmen data in bowlers rankings, etc.
// If API fails, the UI will show "No data available" message instead of wrong data

export const fallbackTeamRankings: any[] = [];
export const fallbackPlayerRankings: any[] = [];