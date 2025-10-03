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
  const team1Name = team1.teamName || team1.name || currentMatch.raw?.team1?.teamname || currentMatch.raw?.matchInfo?.team1?.teamName || 'Team 1';
  const team2Name = team2.teamName || team2.name || currentMatch.raw?.team2?.teamname || currentMatch.raw?.matchInfo?.team2?.teamName || 'Team 2';

  // Parse score data which might be in string format
  const parseScoreString = (scoreStr: any) => {
    if (typeof scoreStr === 'object' && scoreStr !== null) {
      return scoreStr; // Already an object
    }

    if (typeof scoreStr === 'string' && scoreStr.includes('runs=')) {
      // Parse string format like "@{runs=81; wickets=5; overs=23.2; balls=140; runRate=3.49}"
      const runs = scoreStr.match(/runs=([0-9.]+)/)?.[1] || '0';
      const wickets = scoreStr.match(/wickets=([0-9.]+)/)?.[1] || '0';
      const overs = scoreStr.match(/overs=([0-9.]+)/)?.[1] || '0';

      return {
        runs: parseFloat(runs),
        wickets: parseFloat(wickets),
        overs: parseFloat(overs)
      };
    }

    return { runs: 0, wickets: 0, overs: 0 };
  };

  // Extract scores with comprehensive fallback logic
  let team1Score = parseScoreString(team1.score) || { runs: 0, wickets: 0, overs: 0 };
  let team2Score = parseScoreString(team2.score) || { runs: 0, wickets: 0, overs: 0 };

  // Try to get scores from scorecard data if available
  if (currentMatch?.scorecard?.scorecard && Array.isArray(currentMatch.scorecard.scorecard)) {
    const scorecard = currentMatch.scorecard.scorecard;
    
    // First innings
    if (scorecard[0] && scorecard[0].batTeamDetails) {
      const firstInningsScore = {
        runs: scorecard[0].batTeamDetails.runs || 0,
        wickets: scorecard[0].batTeamDetails.wickets || 0,
        overs: scorecard[0].batTeamDetails.overs || 0,
        runRate: scorecard[0].batTeamDetails.runRate || 0
      };
      
      // Determine which team this belongs to
      const firstInningsTeamName = scorecard[0].batTeamDetails.batTeamName || scorecard[0].batTeamDetails.teamName;
      if (firstInningsTeamName && (firstInningsTeamName.includes(team1Name) || team1Name.includes(firstInningsTeamName))) {
        team1Score = firstInningsScore;
      } else if (firstInningsTeamName && (firstInningsTeamName.includes(team2Name) || team2Name.includes(firstInningsTeamName))) {
        team2Score = firstInningsScore;
      }
    }
    
    // Second innings
    if (scorecard[1] && scorecard[1].batTeamDetails) {
      const secondInningsScore = {
        runs: scorecard[1].batTeamDetails.runs || 0,
        wickets: scorecard[1].batTeamDetails.wickets || 0,
        overs: scorecard[1].batTeamDetails.overs || 0,
        runRate: scorecard[1].batTeamDetails.runRate || 0
      };
      
      // Determine which team this belongs to
      const secondInningsTeamName = scorecard[1].batTeamDetails.batTeamName || scorecard[1].batTeamDetails.teamName;
      if (secondInningsTeamName && (secondInningsTeamName.includes(team1Name) || team1Name.includes(secondInningsTeamName))) {
        team1Score = secondInningsScore;
      } else if (secondInningsTeamName && (secondInningsTeamName.includes(team2Name) || team2Name.includes(secondInningsTeamName))) {
        team2Score = secondInningsScore;
      }
    }
  }

  // Fallback: try to extract from raw match data
  if ((team1Score.runs === 0 && team1Score.wickets === 0) || 
      (team2Score.runs === 0 && team2Score.wickets === 0)) {
    
    // Try to get from raw match score data
    if (currentMatch?.raw?.matchScore) {
      const matchScore = currentMatch.raw.matchScore;
      
      // Try different score field patterns
      const team1ScoreData = matchScore.team1Score || matchScore.t1s || matchScore[`${team1Name}Score`];
      const team2ScoreData = matchScore.team2Score || matchScore.t2s || matchScore[`${team2Name}Score`];
      
      if (team1ScoreData && (team1Score.runs === 0 && team1Score.wickets === 0)) {
        team1Score = {
          runs: team1ScoreData.runs || team1ScoreData.r || 0,
          wickets: team1ScoreData.wickets || team1ScoreData.w || 0,
          overs: team1ScoreData.overs || team1ScoreData.o || 0,
          runRate: team1ScoreData.runRate || team1ScoreData.rr || 0
        };
      }
      
      if (team2ScoreData && (team2Score.runs === 0 && team2Score.wickets === 0)) {
        team2Score = {
          runs: team2ScoreData.runs || team2ScoreData.r || 0,
          wickets: team2ScoreData.wickets || team2ScoreData.w || 0,
          overs: team2ScoreData.overs || team2ScoreData.o || 0,
          runRate: team2ScoreData.runRate || team2ScoreData.rr || 0
        };
      }
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
  const format = currentMatch.format || currentMatch.raw?.matchformat || currentMatch.raw?.matchInfo?.matchFormat || 'T20';

  // Extract venue information with multiple fallback options
  const venue = currentMatch.venue?.name ||
    currentMatch.raw?.venueinfo?.ground ||
    currentMatch.raw?.matchInfo?.venueInfo?.ground ||
    currentMatch.raw?.matchInfo?.venue ||
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