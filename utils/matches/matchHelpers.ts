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
  let team1Score = { runs: 0, wickets: 0, overs: 0 };
  let team2Score = { runs: 0, wickets: 0, overs: 0 };
  
  // PRIORITY 1: Try to extract scores from team objects (most reliable)
  if (team1.score && typeof team1.score === 'object') {
    team1Score = {
      runs: Number(team1.score.runs) || 0,
      wickets: Number(team1.score.wickets) || 0,
      overs: Number(team1.score.overs) || 0
    };
  }
  
  if (team2.score && typeof team2.score === 'object') {
    team2Score = {
      runs: Number(team2.score.runs) || 0,
      wickets: Number(team2.score.wickets) || 0,
      overs: Number(team2.score.overs) || 0
    };
  }
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('extractTeamInfo - Team1 Score:', team1Score);
    console.log('extractTeamInfo - Team2 Score:', team2Score);
  }
  
  // PRIORITY 2: Try to extract scores from raw matchScore data (only if team scores are 0)
  if ((team1Score.runs === 0 && team1Score.wickets === 0) && currentMatch.raw?.matchScore) {
    if (currentMatch.raw.matchScore.team1Score) {
      const rawScore = currentMatch.raw.matchScore.team1Score;
      
      // Handle innings-based scoring
      let totalRuns = 0;
      let totalWickets = 0;
      let totalOvers = 0;
      
      Object.keys(rawScore).forEach(key => {
        if (key.startsWith('inngs') || key.startsWith('inning')) {
          const innings = rawScore[key];
          totalRuns += innings.runs || 0;
          // For wickets, we take the latest value (not sum)
          totalWickets = Math.max(totalWickets, innings.wickets || innings.wkts || 0);
          totalOvers += innings.overs || 0;
        }
      });
      
      // If no innings data, try direct fields
      if (totalRuns === 0 && totalOvers === 0) {
        totalRuns = rawScore.runs || rawScore.r || 0;
        totalWickets = rawScore.wickets || rawScore.w || rawScore.wkts || 0;
        totalOvers = rawScore.overs || rawScore.o || 0;
      }
      
      team1Score = {
        runs: totalRuns,
        wickets: totalWickets,
        overs: totalOvers
      };
    }
    
    if (currentMatch.raw.matchScore.team2Score) {
      const rawScore = currentMatch.raw.matchScore.team2Score;
      
      // Handle innings-based scoring
      let totalRuns = 0;
      let totalWickets = 0;
      let totalOvers = 0;
      
      Object.keys(rawScore).forEach(key => {
        if (key.startsWith('inngs') || key.startsWith('inning')) {
          const innings = rawScore[key];
          totalRuns += innings.runs || 0;
          // For wickets, we take the latest value (not sum)
          totalWickets = Math.max(totalWickets, innings.wickets || innings.wkts || 0);
          totalOvers += innings.overs || 0;
        }
      });
      
      // If no innings data, try direct fields
      if (totalRuns === 0 && totalOvers === 0) {
        totalRuns = rawScore.runs || rawScore.r || 0;
        totalWickets = rawScore.wickets || rawScore.w || rawScore.wkts || 0;
        totalOvers = rawScore.overs || rawScore.o || 0;
      }
      
      team2Score = {
        runs: totalRuns,
        wickets: totalWickets,
        overs: totalOvers
      };
    }
  }
  
  // PRIORITY 3: Try to extract scores from scorecard data (only if still 0)
  if ((team1Score.runs === 0 && team1Score.wickets === 0) && currentMatch.scorecard?.scorecard && Array.isArray(currentMatch.scorecard.scorecard)) {
    if (currentMatch.scorecard.scorecard.length > 0) {
      const innings1 = currentMatch.scorecard.scorecard[0];
      team1Score = {
        runs: innings1.totalRuns || innings1.total || innings1.runs || 0,
        wickets: innings1.totalWickets || innings1.totalwickets || innings1.wickets || innings1.wkts || 0,
        overs: innings1.totalOvers || innings1.totalovers || innings1.overs || 0
      };
    }
    
    if (currentMatch.scorecard.scorecard.length > 1) {
      const innings2 = currentMatch.scorecard.scorecard[1];
      team2Score = {
        runs: innings2.totalRuns || innings2.total || innings2.runs || 0,
        wickets: innings2.totalWickets || innings2.totalwickets || innings2.wickets || innings2.wkts || 0,
        overs: innings2.totalOvers || innings2.totalovers || innings2.overs || 0
      };
    }
  }

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