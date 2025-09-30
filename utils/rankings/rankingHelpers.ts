// Helper functions for processing ranking data

export const processTeamStandings = (data: any, fallbackData: any[]) => {
  if (!data || !data.values) return fallbackData;
  
  return data.values.map((team: any) => ({
    position: parseInt(team.value?.[0] || '0') || 0,
    teamName: team.value?.[2] || 'Unknown Team',
    rating: parseFloat(team.value?.[3] || '0') || 0,
    points: Math.round(parseFloat(team.value?.[3] || '0') * 100) || 0 // Convert percentage to points
  }));
};

export const processPlayerRankings = (data: any, fallbackData: any[]) => {
  if (!data || !data.rank) return fallbackData;
  
  return data.rank.map((player: any, index: number) => ({
    position: index + 1,
    playerName: player.name || `Player ${index + 1}`,
    country: player.country || player.team || 'Unknown',
    rating: parseInt(player.rating || '0') || 0,
    points: parseInt(player.points || '0') || 0
  }));
};

// Fallback data for team rankings
export const fallbackTeamRankings = [
  { position: 1, teamName: 'Australia', rating: 118, points: 4248 },
  { position: 2, teamName: 'India', rating: 116, points: 4192 },
  { position: 3, teamName: 'England', rating: 109, points: 3928 },
  { position: 4, teamName: 'South Africa', rating: 108, points: 3897 },
  { position: 5, teamName: 'New Zealand', rating: 106, points: 3825 },
  { position: 6, teamName: 'Pakistan', rating: 95, points: 3420 },
  { position: 7, teamName: 'West Indies', rating: 78, points: 2808 },
  { position: 8, teamName: 'Sri Lanka', rating: 76, points: 2736 },
  { position: 9, teamName: 'Bangladesh', rating: 68, points: 2448 },
  { position: 10, teamName: 'Afghanistan', rating: 52, points: 1872 }
];

// Fallback data for player rankings
export const fallbackPlayerRankings = [
  { position: 1, playerName: 'Joe Root', country: 'England', rating: 899, points: 899 },
  { position: 2, playerName: 'Kane Williamson', country: 'New Zealand', rating: 886, points: 886 },
  { position: 3, playerName: 'Marnus Labuschagne', country: 'Australia', rating: 848, points: 848 },
  { position: 4, playerName: 'Steve Smith', country: 'Australia', rating: 834, points: 834 },
  { position: 5, playerName: 'Babar Azam', country: 'Pakistan', rating: 815, points: 815 },
  { position: 6, playerName: 'Virat Kohli', country: 'India', rating: 742, points: 742 },
  { position: 7, playerName: 'Rishabh Pant', country: 'India', rating: 737, points: 737 },
  { position: 8, playerName: 'Rohit Sharma', country: 'India', rating: 730, points: 730 },
  { position: 9, playerName: 'David Warner', country: 'Australia', rating: 687, points: 687 },
  { position: 10, playerName: 'Jonny Bairstow', country: 'England', rating: 684, points: 684 }
];