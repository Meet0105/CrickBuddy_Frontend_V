import React from 'react';

interface MatchCardProps {
  match: any;
  isLive?: boolean;
  isUpcoming?: boolean;
  isCompleted?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, isLive, isUpcoming, isCompleted }) => {
  // Enhanced data extraction with multiple fallback sources
  const extractTeamData = (teamIndex: number) => {
    // Try multiple sources for team data
    const teamFromArray = match?.teams?.[teamIndex];
    const teamFromRaw = match?.raw?.matchInfo?.[`team${teamIndex + 1}`];
    const teamFromDirect = match?.[`team${teamIndex + 1}`];

    const team = teamFromArray || teamFromRaw || teamFromDirect || {};

    // Extract team name with comprehensive fallbacks
    let teamName = team.teamName ||
      team.teamSName ||
      team.name ||
      team.shortName ||
      (match?.raw?.matchInfo?.[`team${teamIndex + 1}`]?.teamName) ||
      (match?.raw?.matchInfo?.[`team${teamIndex + 1}`]?.teamSName);

    // If no team name found, try to extract from match title
    if (!teamName || teamName === `Team ${teamIndex + 1}`) {
      const title = match?.title || match?.shortTitle || '';
      if (title.includes(' vs ')) {
        const teams = title.split(' vs ');
        teamName = teams[teamIndex]?.trim() || `Team ${teamIndex + 1}`;
      } else if (title.includes(' v ')) {
        const teams = title.split(' v ');
        teamName = teams[teamIndex]?.trim() || `Team ${teamIndex + 1}`;
      } else {
        teamName = `Team ${teamIndex + 1}`;
      }
    }

    // Extract score with comprehensive fallbacks
    const score = team.score ||
      match?.raw?.matchScore?.[`team${teamIndex + 1}Score`] ||
      match?.raw?.matchScore?.scoreData?.[teamIndex] ||
      { runs: 0, wickets: 0, overs: 0, balls: 0, runRate: 0 };

    return { ...team, teamName, score };
  };

  let team1 = extractTeamData(0);
  let team2 = extractTeamData(1);

  // Get team names for easier reference
  const team1Name = team1.teamName;
  const team2Name = team2.teamName;

  // Parse score data which might be in string format like "@{runs=81; wickets=5; overs=23.2}"
  const parseScoreString = (scoreStr: any) => {
    if (typeof scoreStr === 'object' && scoreStr !== null) {
      return scoreStr; // Already an object
    }

    if (typeof scoreStr === 'string' && scoreStr.includes('runs=')) {
      // Parse string format like "@{runs=81; wickets=5; overs=23.2; balls=140; runRate=3.49}"
      const runs = scoreStr.match(/runs=([0-9.]+)/)?.[1] || '0';
      const wickets = scoreStr.match(/wickets=([0-9.]+)/)?.[1] || '0';
      const overs = scoreStr.match(/overs=([0-9.]+)/)?.[1] || '0';
      const runRate = scoreStr.match(/runRate=([0-9.]+)/)?.[1] || '0';

      return {
        runs: parseFloat(runs),
        wickets: parseFloat(wickets),
        overs: parseFloat(overs),
        runRate: parseFloat(runRate)
      };
    }

    return { runs: 0, wickets: 0, overs: 0, runRate: 0 };
  };

  // Extract scores for both teams properly - PRIORITIZE teams array data
  let finalTeam1Score = { runs: 0, wickets: 0, overs: 0, runRate: 0 };
  let finalTeam2Score = { runs: 0, wickets: 0, overs: 0, runRate: 0 };

  // First priority: Use teams array data if available (this is the most reliable)
  if (team1?.score && typeof team1.score === 'object') {
    finalTeam1Score = {
      runs: team1.score.runs || 0,
      wickets: team1.score.wickets || 0,
      overs: team1.score.overs || 0,
      runRate: team1.score.runRate || 0
    };
  }

  if (team2?.score && typeof team2.score === 'object') {
    finalTeam2Score = {
      runs: team2.score.runs || 0,
      wickets: team2.score.wickets || 0,
      overs: team2.score.overs || 0,
      runRate: team2.score.runRate || 0
    };
  }

  // Fallback: Parse score string if teams array doesn't have proper scores
  if (finalTeam1Score.runs === 0 && finalTeam1Score.wickets === 0) {
    const parsedScore = parseScoreString(team1?.score);
    if (parsedScore.runs > 0 || parsedScore.wickets > 0) {
      finalTeam1Score = parsedScore;
    }
  }

  if (finalTeam2Score.runs === 0 && finalTeam2Score.wickets === 0) {
    const parsedScore = parseScoreString(team2?.score);
    if (parsedScore.runs > 0 || parsedScore.wickets > 0) {
      finalTeam2Score = parsedScore;
    }
  }

  // Only use scorecard data as fallback if teams array doesn't have scores
  if ((finalTeam1Score.runs === 0 && finalTeam1Score.wickets === 0) ||
    (finalTeam2Score.runs === 0 && finalTeam2Score.wickets === 0)) {

    if (match?.scorecard?.scorecard && Array.isArray(match.scorecard.scorecard)) {
      const scorecard = match.scorecard.scorecard;

      // Only extract from scorecard if teams array is empty
      if (finalTeam1Score.runs === 0 && finalTeam1Score.wickets === 0 && scorecard[0]) {
        finalTeam1Score = {
          runs: scorecard[0].runs || scorecard[0].score || 0,
          wickets: scorecard[0].wickets || 0,
          overs: scorecard[0].overs || 0,
          runRate: scorecard[0].runRate || 0
        };
      }

      if (finalTeam2Score.runs === 0 && finalTeam2Score.wickets === 0 && scorecard[1]) {
        finalTeam2Score = {
          runs: scorecard[1].runs || scorecard[1].score || 0,
          wickets: scorecard[1].wickets || 0,
          overs: scorecard[1].overs || 0,
          runRate: scorecard[1].runRate || 0
        };
      }
    }
  }

  // Additional fallback: try to extract from raw match data only if still no scores
  if ((finalTeam1Score.runs === 0 && finalTeam1Score.wickets === 0) ||
    (finalTeam2Score.runs === 0 && finalTeam2Score.wickets === 0)) {

    if (match?.raw?.matchScore) {
      const matchScore = match.raw.matchScore;

      if (finalTeam1Score.runs === 0 && finalTeam1Score.wickets === 0) {
        const team1ScoreData = matchScore.team1Score || matchScore.t1s;
        if (team1ScoreData) {
          finalTeam1Score = {
            runs: team1ScoreData.runs || team1ScoreData.r || 0,
            wickets: team1ScoreData.wickets || team1ScoreData.w || 0,
            overs: team1ScoreData.overs || team1ScoreData.o || 0,
            runRate: team1ScoreData.runRate || team1ScoreData.rr || 0
          };
        }
      }

      if (finalTeam2Score.runs === 0 && finalTeam2Score.wickets === 0) {
        const team2ScoreData = matchScore.team2Score || matchScore.t2s;
        if (team2ScoreData) {
          finalTeam2Score = {
            runs: team2ScoreData.runs || team2ScoreData.r || 0,
            wickets: team2ScoreData.wickets || team2ScoreData.w || 0,
            overs: team2ScoreData.overs || team2ScoreData.o || 0,
            runRate: team2ScoreData.runRate || team2ScoreData.rr || 0
          };
        }
      }
    }
  }

  // Ensure score values are numbers
  const normalizedTeam1Score = {
    runs: typeof finalTeam1Score.runs === 'number' ? finalTeam1Score.runs : 0,
    wickets: typeof finalTeam1Score.wickets === 'number' ? finalTeam1Score.wickets : 0,
    overs: typeof finalTeam1Score.overs === 'number' ? finalTeam1Score.overs : 0,
    runRate: typeof finalTeam1Score.runRate === 'number' ? finalTeam1Score.runRate : 0
  };

  const normalizedTeam2Score = {
    runs: typeof finalTeam2Score.runs === 'number' ? finalTeam2Score.runs : 0,
    wickets: typeof finalTeam2Score.wickets === 'number' ? finalTeam2Score.wickets : 0,
    overs: typeof finalTeam2Score.overs === 'number' ? finalTeam2Score.overs : 0,
    runRate: typeof finalTeam2Score.runRate === 'number' ? finalTeam2Score.runRate : 0
  };

  // Enhanced title extraction with multiple fallbacks
  const title = match?.title ||
    match?.shortTitle ||
    match?.name ||
    match?.raw?.matchInfo?.matchDesc ||
    match?.raw?.matchInfo?.title ||
    match?.raw?.matchInfo?.name ||
    `${team1Name} vs ${team2Name}`;

  // Enhanced format extraction
  const format = match?.format ||
    match?.matchFormat ||
    match?.raw?.matchInfo?.matchFormat ||
    match?.raw?.matchInfo?.matchType ||
    'T20';

  // Enhanced status extraction with better logic
  const status = match?.status ||
    match?.matchStatus ||
    match?.raw?.matchInfo?.status ||
    match?.raw?.matchInfo?.state ||
    'UPCOMING';

  // Enhanced series extraction with multiple fallbacks
  const series = match?.series?.name ||
    match?.raw?.matchInfo?.seriesName ||
    match?.raw?.matchInfo?.tour ||
    match?.seriesName ||
    match?.tournament ||
    'Cricket Match';

  // Date information with better handling
  let matchDate = 'TBD';
  let matchTime = '';
  if (match && match.startDate) {
    try {
      const date = new Date(match.startDate);
      matchDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      matchTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      matchDate = 'TBD';
    }
  }

  // More accurate determination of match status
  const determineMatchStatus = () => {
    // If explicit props are provided, use them
    if (isLive !== undefined) return { isLive, isUpcoming: false, isCompleted: false };
    if (isUpcoming !== undefined) return { isLive: false, isUpcoming, isCompleted: false };
    if (isCompleted !== undefined) return { isLive: false, isUpcoming: false, isCompleted };

    // Determine status based on match data
    const lowerStatus = (status || '').toLowerCase();

    // Check for completed status patterns
    const isActuallyCompleted =
      lowerStatus.includes('complete') ||
      lowerStatus.includes('finished') ||
      lowerStatus.includes('won') ||
      lowerStatus.includes('abandon') ||
      lowerStatus.includes('cancel') ||
      lowerStatus.includes('no result') ||
      lowerStatus.includes('tied') ||
      match?.status === 'COMPLETED' ||
      match?.status === 'ABANDONED' ||
      match?.status === 'CANCELLED';

    // Check for live status patterns
    const isActuallyLive =
      lowerStatus.includes('live') ||
      lowerStatus.includes('in progress') ||
      lowerStatus.includes('innings break') ||
      lowerStatus.includes('rain delay') ||
      lowerStatus.includes('tea break') ||
      lowerStatus.includes('lunch break') ||
      lowerStatus.includes('drinks break') ||
      match?.isLive === true;

    // Check for upcoming status patterns
    const isActuallyUpcoming =
      lowerStatus.includes('upcoming') ||
      lowerStatus.includes('scheduled') ||
      lowerStatus.includes('starts at') ||
      lowerStatus.includes('match starts') ||
      match?.status === 'UPCOMING';

    // Return the correct status based on priority
    if (isActuallyCompleted) {
      return { isLive: false, isUpcoming: false, isCompleted: true };
    } else if (isActuallyLive) {
      return { isLive: true, isUpcoming: false, isCompleted: false };
    } else if (isActuallyUpcoming) {
      return { isLive: false, isUpcoming: true, isCompleted: false };
    }

    // Default fallback
    return { isLive: false, isUpcoming: false, isCompleted: false };
  };

  const { isLive: actualIsLive, isUpcoming: actualIsUpcoming, isCompleted: actualIsCompleted } = determineMatchStatus();

  // Determine if we should show scores based on multiple conditions
  const shouldShowScores = () => {
    if (actualIsLive) return true;
    if (actualIsCompleted) return true;
    if (status && (status.includes('Complete') || status.includes('complete') ||
      status.includes('Won') || status.includes('won') ||
      status.includes('Finished') || status.includes('finished') ||
      status.includes('COMPLETED'))) {
      return true;
    }
    if ((normalizedTeam1Score.runs > 0) || (normalizedTeam1Score.wickets > 0) ||
      (normalizedTeam2Score.runs > 0) || (normalizedTeam2Score.wickets > 0)) {
      return true;
    }
    return false;
  };

  // Determine status badge styling
  const getStatusStyling = () => {
    if (actualIsLive) return {
      bg: 'bg-gradient-to-r from-red-600 to-red-700',
      text: 'text-white',
      icon: '🔴',
      pulse: 'animate-pulse'
    };
    if (actualIsUpcoming) return {
      bg: 'bg-gradient-to-r from-blue-600 to-blue-700',
      text: 'text-white',
      icon: '📅',
      pulse: ''
    };
    if (actualIsCompleted) return {
      bg: 'bg-gradient-to-r from-green-600 to-green-700',
      text: 'text-white',
      icon: '✅',
      pulse: ''
    };
    return {
      bg: 'bg-gray-500',
      text: 'text-white',
      icon: '⏳',
      pulse: ''
    };
  };

  const statusStyle = getStatusStyling();

  // Determine status text
  const getStatusText = () => {
    if (actualIsLive) return 'LIVE';
    if (actualIsUpcoming) return 'UPCOMING';
    if (actualIsCompleted) return 'COMPLETED';
    if (status && (status.includes('Complete') || status.includes('COMPLETED'))) return 'COMPLETED';
    if (status && (status.includes('Won') || status.includes('won'))) return 'COMPLETED';
    if (status && (status.includes('Abandoned') || status.includes('abandoned'))) return 'ABANDONED';
    if (status && (status.includes('Cancelled') || status.includes('cancelled'))) return 'CANCELLED';
    return status || 'UPCOMING';
  };

  // Function to construct image URL for team flags
  const getTeamFlagUrl = (team: any) => {
    if (team && team.imageId) {
      return `/api/photos/image/${team.imageId}`;
    }
    if (team && team.flagImage && team.flagImage.url) {
      return team.flagImage.url;
    }
    return null;
  };

  const team1FlagUrl = getTeamFlagUrl(team1);
  const team2FlagUrl = getTeamFlagUrl(team2);

  // Get team initials for fallback
  const getTeamInitials = (teamName: string) => {
    return teamName.split(' ').map(word => word.charAt(0)).join('').substring(0, 3).toUpperCase();
  };

  // Reusable components
  const StatusBadge = ({ text, icon, bg }: any) => (
    <span className={`${bg} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center`}>
      <span className="mr-1">{icon}</span>{text}
    </span>
  );

  const ScoreBox = ({ runs, wickets, overs, runRate }: any) => (
    <div className="bg-slate-700 px-4 py-2 rounded-xl border border-slate-600 shadow-sm text-right">
      <span className="font-bold text-white text-xl">{runs}/{wickets}</span>
      <div className="text-gray-300 text-sm">
        ({overs} ov){runRate > 0 && <span className="ml-2">RR: {runRate.toFixed(2)}</span>}
      </div>
    </div>
  );

  return (
    <div className={`bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${actualIsLive ? 'border-red-500' : actualIsUpcoming ? 'border-blue-500' : 'border-green-500'}`}>

      {/* Header with match info */}
      <div className="bg-slate-900 p-5 border-b-2 border-slate-700">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center mb-2 space-x-2">
              <StatusBadge text={getStatusText()} icon={statusStyle.icon} bg={statusStyle.bg} />
              <span className="bg-slate-700 text-gray-300 px-2 py-1 rounded-full text-xs font-medium">{format}</span>
            </div>
            <h3 className="font-bold text-white text-lg mb-1">{title}</h3>
            <p className="text-gray-300 text-sm">{series}</p>
          </div>
        </div>
      </div>

      {/* Match score details */}
      <div className="p-5 space-y-4">
        {/* Team 1 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-1 space-x-4">
            {team1FlagUrl ? (
              <img
                src={team1FlagUrl}
                alt={`${team1Name} flag`}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 shadow-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-white shadow-md bg-gradient-to-br from-blue-500 to-blue-700">
                <span className="text-white font-bold text-sm">{getTeamInitials(team1Name)}</span>
              </div>
            )}
            <div>
              <span className="font-bold text-white text-lg">{team1Name}</span>
              {team1.teamShortName && team1.teamShortName !== team1Name && (
                <span className="text-gray-300 text-sm ml-2">({team1.teamShortName})</span>
              )}
            </div>
          </div>

          {shouldShowScores() ? (
            <ScoreBox
              runs={normalizedTeam1Score.runs}
              wickets={normalizedTeam1Score.wickets}
              overs={normalizedTeam1Score.overs}
              runRate={normalizedTeam1Score.runRate}
            />
          ) : (
            <div className="bg-slate-700 px-4 py-2 rounded-xl border border-slate-600 shadow-sm text-right">
              <div className="text-gray-300 font-medium text-sm">{matchDate}</div>
              {matchTime && <div className="text-gray-400 text-xs">{matchTime}</div>}
            </div>
          )}
        </div>

        {/* Team 2 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-1 space-x-4">
            {team2FlagUrl ? (
              <img
                src={team2FlagUrl}
                alt={`${team2Name} flag`}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 shadow-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-white shadow-md bg-gradient-to-br from-green-500 to-green-700">
                <span className="text-white font-bold text-sm">{getTeamInitials(team2Name)}</span>
              </div>
            )}
            <div>
              <span className="font-bold text-white text-lg">{team2Name}</span>
              {team2.teamShortName && team2.teamShortName !== team2Name && (
                <span className="text-gray-300 text-sm ml-2">({team2.teamShortName})</span>
              )}
            </div>
          </div>

          {shouldShowScores() ? (
            <ScoreBox
              runs={normalizedTeam2Score.runs}
              wickets={normalizedTeam2Score.wickets}
              overs={normalizedTeam2Score.overs}
              runRate={normalizedTeam2Score.runRate}
            />
          ) : (
            <div className="bg-slate-700 px-4 py-2 rounded-xl border border-slate-600 shadow-sm text-right">
              <div className="text-gray-300 font-medium text-sm">{matchDate}</div>
              {matchTime && <div className="text-gray-400 text-xs">{matchTime}</div>}
            </div>
          )}
        </div>

        {/* Match info for upcoming matches */}
        {!shouldShowScores() && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            {/* Start time message for upcoming matches */}
            {actualIsUpcoming && match && match.startDate && (
              <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border border-blue-700/50 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-blue-300 font-bold text-lg">Match will start on</span>
                </div>
                <div className="text-blue-200 font-semibold text-xl mb-2">
                  {new Date(match.startDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="text-blue-300 font-medium text-lg">
                  at {new Date(match.startDate).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
                {/* Venue info */}
                <div className="mt-3 pt-3 border-t border-blue-700/30">
                  <div className="flex items-center justify-center text-blue-300">
                    <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">
                      {(match && match.venue && match.venue.name) ||
                        (match && match.raw && match.raw.matchInfo && match.raw.matchInfo.venueInfo && match.raw.matchInfo.venueInfo.ground) ||
                        'Venue TBA'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Fallback for matches without proper start date */}
            {(!match || !match.startDate) && (
              <div className="bg-slate-700 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center text-gray-300 mb-2">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">
                    {(match && match.venue && match.venue.name) ||
                      (match && match.raw && match.raw.matchInfo && match.raw.matchInfo.venueInfo && match.raw.matchInfo.venueInfo.ground) ||
                      'Venue TBA'}
                  </span>
                </div>
                <div className="text-gray-400 text-sm">Match details will be updated soon</div>
              </div>
            )}
          </div>
        )}

        {/* Live match commentary */}
        {actualIsLive && match && match.commentary && match.commentary.liveText && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-700/50 rounded-xl p-4">
              <div className="flex items-start">
                <span className="text-red-400 mr-2 text-lg">📢</span>
                <p className="text-red-300 font-medium text-sm leading-relaxed">
                  {match.commentary.liveText}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Match result for completed matches */}
        {actualIsCompleted && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-700/50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-300 font-bold text-sm">
                  {/* Show match result from various sources */}
                  {match?.raw?.shortstatus ||
                    match?.result?.resultText ||
                    match?.raw?.status ||
                    match?.status ||
                    'Match Completed'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;