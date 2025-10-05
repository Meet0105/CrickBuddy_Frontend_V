// Helper functions for processing match data

export const extractTeamInfo = (currentMatch: any) => {
  // Check if currentMatch exists
  if (!currentMatch) {
    return {
      team1: { teamName: 'Team 1', score: { runs: 0, wickets: 0, overs: 0 } },
      team2: { teamName: 'Team 2', score: { runs: 0, wickets: 0, overs: 0 } },
      team1Name: 'Team 1',
      team2Name: 'Team 2',
      team1Score: { runs: 0, wickets: 0, overs: 0 },
      team2Score: { runs: 0, wickets: 0, overs: 0 }
    };
  }
  
  // Extract team information with proper null checks
  const team1 = currentMatch.teams?.[0] || { teamName: 'Team 1', score: { runs: 0, wickets: 0, overs: 0 } };
  const team2 = currentMatch.teams?.[1] || { teamName: 'Team 2', score: { runs: 0, wickets: 0, overs: 0 } };
  
  // Try to get actual team names from various sources
  const team1Name = team1.teamName || team1.name || currentMatch.raw?.matchInfo?.team1?.teamName || currentMatch.raw?.matchInfo?.team1?.name || 'Team 1';
  const team2Name = team2.teamName || team2.name || currentMatch.raw?.matchInfo?.team2?.teamName || currentMatch.raw?.matchInfo?.team2?.name || 'Team 2';
  
  // Extract scores with better fallback logic
  const team1Score = team1.score || { runs: 0, wickets: 0, overs: 0 };
  const team2Score = team2.score || { runs: 0, wickets: 0, overs: 0 };
  
  return {
    team1,
    team2,
    team1Name,
    team2Name,
    team1Score,
    team2Score
  };
};

export const extractMatchInfo = (currentMatch: any) => {
  // Check if currentMatch exists
  if (!currentMatch) {
    return {
      status: 'UPCOMING',
      format: 'T20',
      venue: 'Venue TBA',
      matchDate: 'TBD',
      matchTime: '',
      isLive: false
    };
  }
  
  // Match status and format
  const status = currentMatch.status || 'UPCOMING';
  const format = currentMatch.format || currentMatch.raw?.matchInfo?.matchFormat || 'T20';
  
  // Extract venue information with multiple fallback options
  const venue = currentMatch.venue?.name || 
                currentMatch.raw?.matchInfo?.venueInfo?.ground || 
                currentMatch.raw?.matchInfo?.venue || 
                currentMatch.raw?.venueinfo?.ground || 
                currentMatch.raw?.venue || 
                'Venue TBA';
  
  // Date information
  const matchDate = currentMatch.startDate ? new Date(currentMatch.startDate).toLocaleDateString() : 'TBD';
  const matchTime = currentMatch.startDate ? new Date(currentMatch.startDate).toLocaleTimeString() : '';
  
  // Determine if match is live
  const isLive = currentMatch.isLive || status === 'LIVE';
  
  return {
    status,
    format,
    venue,
    matchDate,
    matchTime,
    isLive
  };
};

export const getMatchStatusColor = (isLive: boolean, status: string) => {
  if (isLive) return 'bg-red-500';
  if (status === 'COMPLETED') return 'bg-green-500';
  return 'bg-blue-500';
};