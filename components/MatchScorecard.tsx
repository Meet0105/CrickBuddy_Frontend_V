import React from 'react';

interface BatsmanData {
  batId?: string;
  batName?: string;
  name?: string;
  runs?: number;
  balls?: number;
  fours?: number;
  sixes?: number;
  strikeRate?: number;
  strkrate?: number;
  outDesc?: string;
  outdesc?: string;
  isCaptain?: string | boolean;
  iscaptain?: boolean;
  isKeeper?: string | boolean;
  iskeeper?: boolean;
}

interface BowlerData {
  bowlerId?: string;
  bowlerName?: string;
  name?: string;
  overs?: number;
  maidens?: number;
  runs?: number;
  wickets?: number;
  economy?: number;
  isCaptain?: string | boolean;
  iscaptain?: boolean;
}

interface ExtrasData {
  total?: number;
  byes?: number;
  legbyes?: number;
  wides?: number;
  noballs?: number;
  penalty?: number;
}

interface InningsData {
  inningsId?: string;
  inningsNumber?: number;
  inningsid?: string;
  batTeam?: string;
  batteam?: string;
  bowlTeam?: string;
  bowlteam?: string;
  totalRuns?: number;
  total?: number;
  totalWickets?: number;
  wickets?: number;
  totalOvers?: number;
  overs?: number;
  batsmen?: BatsmanData[];
  batsman?: BatsmanData[];
  bowlers?: BowlerData[];
  bowler?: BowlerData[];
  extras?: ExtrasData;
  fallOfWickets?: string;
  batTeamDetails?: {
    batTeamId?: string;
    batTeamName?: string;
    batsmenData?: { [key: string]: BatsmanData };
  };
  bowlTeamDetails?: {
    bowlTeamId?: string;
    bowlTeamName?: string;
    bowlersData?: { [key: string]: BowlerData };
  };
}

interface MatchScorecardProps {
  scorecard?: { scorecard?: InningsData[] };
  historicalScorecard?: { scoreCard?: InningsData[] };
  match?: any;
}

const MatchScorecard: React.FC<MatchScorecardProps> = ({ 
  scorecard, 
  historicalScorecard, 
  match 
}) => {
  // Function to render batting scorecard
  const renderBattingScorecard = (innings: InningsData, inningsIndex: number) => {
    let batsmen: BatsmanData[] = [];
    let teamName = '';
    let totalRuns = 0;
    let totalWickets = 0;
    let totalOvers = 0;
    let extras: ExtrasData = {};

    // Handle different data structures
    if (innings.batTeamDetails?.batsmenData) {
      // Historical scorecard format
      batsmen = Object.values(innings.batTeamDetails.batsmenData);
      teamName = innings.batTeamDetails.batTeamName || '';
      totalRuns = innings.totalRuns || 0;
      totalWickets = innings.totalWickets || 0;
      totalOvers = innings.totalOvers || 0;
      extras = innings.extras || {};
    } else if (innings.batsman || innings.batsmen) {
      // Regular scorecard format
      batsmen = innings.batsman || innings.batsmen || [];
      teamName = innings.batTeam || innings.batteam || '';
      totalRuns = innings.total || innings.totalRuns || 0;
      totalWickets = innings.wickets || innings.totalWickets || 0;
      totalOvers = innings.overs || innings.totalOvers || 0;
      extras = innings.extras || {};
    }

    // If team name is still empty, try to get it from match data
    if (!teamName && match?.teams) {
      // For first innings, use first team; for second innings, use second team
      const teamIndex = inningsIndex % 2;
      teamName = match.teams[teamIndex]?.teamName || match.teams[teamIndex]?.name || `Team ${teamIndex + 1}`;
    }

    if (!batsmen || batsmen.length === 0) {
      return (
        <div className="text-gray-400 italic p-4">
          No batting data available for {teamName}
        </div>
      );
    }

    return (
      <div className="mb-6">
        <div className="bg-gradient-to-r from-green-700 to-green-800 text-white font-bold text-xl p-4 rounded-t-2xl">
          <h4>
            {teamName} Innings - {totalRuns}/{totalWickets} ({totalOvers} Ov)
          </h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 bg-slate-900 rounded-b-2xl text-white">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Batsman
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                  R
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                  B
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                  4s
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                  6s
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                  SR
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {batsmen.map((batsman, index) => {
                const name = batsman.batName || batsman.name || 'Unknown';
                const runs = batsman.runs || 0;
                const balls = batsman.balls || 0;
                const fours = batsman.fours || 0;
                const sixes = batsman.sixes || 0;
                const strikeRate = batsman.strikeRate || batsman.strkrate || 0;
                const outDesc = batsman.outDesc || batsman.outdesc || '';
                const isCaptain = batsman.isCaptain === 'true' || batsman.isCaptain === true || batsman.iscaptain;
                const isKeeper = batsman.isKeeper === 'true' || batsman.isKeeper === true || batsman.iskeeper;

                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-900 hover:bg-green-900 transition-colors duration-300'}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-bold">
                        <span className="text-green-400 hover:text-green-200 cursor-pointer">
                          {name}
                        </span>
                        {isCaptain && <span className="text-xs text-gray-300 ml-1">(C)</span>}
                        {isKeeper && <span className="text-xs text-gray-300 ml-1">(WK)</span>}
                      </div>
                      {outDesc && (
                        <div className="text-xs text-gray-400 mt-1">{outDesc}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-bold">
                      {runs}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                      {balls}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                      {fours}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                      {sixes}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                      {strikeRate ? parseFloat(strikeRate.toString()).toFixed(2) : '0.00'}
                    </td>
                  </tr>
                );
              })}
              
              {/* Extras row */}
              {extras && extras.total && extras.total > 0 && (
                <tr className="bg-amber-700/30">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-bold">
                    Extras
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-bold">
                    {extras.total}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm" colSpan={4}>
                    (b {extras.byes || 0}, lb {extras.legbyes || 0}, w {extras.wides || 0}, nb {extras.noballs || 0})
                  </td>
                </tr>
              )}
              
              {/* Total row */}
              <tr className="bg-gradient-to-r from-green-900 to-green-800 font-bold">
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  Total
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center text-sm" colSpan={5}>
                  {totalRuns}/{totalWickets} ({totalOvers} Ov)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Fall of Wickets */}
        {innings.fallOfWickets && (
          <div className="mt-4 p-4 bg-slate-700 rounded-2xl border border-slate-600">
            <h5 className="font-bold text-gray-300 mb-2">Fall of Wickets</h5>
            <p className="text-gray-300 text-sm">{innings.fallOfWickets}</p>
          </div>
        )}
      </div>
    );
  };

  // Function to render bowling scorecard
  const renderBowlingScorecard = (innings: InningsData, inningsIndex: number) => {
    let bowlers: BowlerData[] = [];
    let teamName = '';

    // Handle different data structures
    if (innings.bowlTeamDetails?.bowlersData) {
      // Historical scorecard format
      bowlers = Object.values(innings.bowlTeamDetails.bowlersData);
      teamName = innings.bowlTeamDetails.bowlTeamName || '';
    } else if (innings.bowler || innings.bowlers) {
      // Regular scorecard format
      bowlers = innings.bowler || innings.bowlers || [];
      teamName = innings.bowlTeam || innings.bowlteam || '';
    }

    // If team name is still empty, try to get it from match data
    if (!teamName && match?.teams) {
      // For first innings, use second team (bowling); for second innings, use first team
      const teamIndex = inningsIndex % 2 === 0 ? 1 : 0;
      teamName = match.teams[teamIndex]?.teamName || match.teams[teamIndex]?.name || `Team ${teamIndex + 1}`;
    }

    if (!bowlers || bowlers.length === 0) {
      return (
        <div className="text-gray-400 italic p-4">
          No bowling data available for {teamName}
        </div>
      );
    }

    return (
      <div className="mb-6">
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold text-xl p-4 rounded-t-2xl">
          <h4>{teamName} Bowling</h4>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 bg-slate-900 rounded-b-2xl text-white">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Bowler
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                  O
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                  M
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                  R
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                  W
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">
                  Econ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {bowlers.map((bowler, index) => {
                const name = bowler.bowlerName || bowler.name || 'Unknown';
                const overs = bowler.overs || 0;
                const maidens = bowler.maidens || 0;
                const runs = bowler.runs || 0;
                const wickets = bowler.wickets || 0;
                const economy = bowler.economy || 0;
                const isCaptain = bowler.isCaptain === 'true' || bowler.isCaptain === true || bowler.iscaptain;

                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-900 hover:bg-blue-900 transition-colors duration-300'}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-bold">
                        <span className="text-blue-400 hover:text-blue-200 cursor-pointer">
                          {name}
                        </span>
                        {isCaptain && <span className="text-xs text-gray-300 ml-1">(C)</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                      {overs}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                      {maidens}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                      {runs}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-bold">
                      {wickets}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                      {economy ? parseFloat(economy.toString()).toFixed(2) : '0.00'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Get innings data from either scorecard source
  const getInningsData = (): InningsData[] => {
    if (scorecard?.scorecard && scorecard.scorecard.length > 0) {
      return scorecard.scorecard;
    }
    if (historicalScorecard?.scoreCard && historicalScorecard.scoreCard.length > 0) {
      return historicalScorecard.scoreCard;
    }
    return [];
  };

  const inningsData = getInningsData();

  if (inningsData.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-700 p-8 text-center">
        <div className="text-gray-400 mb-6">
          <svg className="mx-auto h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No Scorecard Available</h3>
        <p className="text-gray-300 mb-6">
          Detailed scorecard data is not available for this match yet.
        </p>
        {match && (
          <button 
            onClick={() => {
              // Trigger sync for this match
              fetch(`/api/matches/${match.matchId}/sync-details`, { method: 'POST' })
                .then(() => window.location.reload())
                .catch(console.error);
            }}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Fetch Scorecard Data
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {inningsData.map((innings, index) => (
        <div key={index} className="bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-700">
          {/* Batting Scorecard */}
          {renderBattingScorecard(innings, index)}
          
          {/* Bowling Scorecard */}
          {renderBowlingScorecard(innings, index)}
        </div>
      ))}
    </div>
  );
};

export default MatchScorecard;