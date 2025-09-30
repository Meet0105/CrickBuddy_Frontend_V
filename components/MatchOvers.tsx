import React from 'react';

interface Ball {
  ballNumber?: number;
  batsman?: string;
  bowler?: string;
  runs?: number;
  extras?: number;
  totalRuns?: number;
  wicket?: boolean;
  wicketDesc?: string;
  commentary?: string;
}

interface Over {
  overNumber?: number;
  balls?: Ball[];
  totalRuns?: number;
  wickets?: number;
  batsman?: string;
  bowler?: string;
}

interface MatchOversProps {
  overs?: {
    overs?: Over[];
    matchHeader?: any;
  };
  match?: any;
}

const MatchOvers: React.FC<MatchOversProps> = ({ overs, match }) => {
  // Get overs data
  const getOversData = (): Over[] => {
    if (overs?.overs && overs.overs.length > 0) {
      return overs.overs;
    }
    return [];
  };

  const oversData = getOversData();

  // Function to render a single ball
  const renderBall = (ball: Ball, ballIndex: number) => {
    const runs = ball.runs || 0;
    const extras = ball.extras || 0;
    const totalRuns = ball.totalRuns || runs + extras;
    
    let ballClass = "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ";
    
    if (ball.wicket) {
      ballClass += "bg-gradient-to-br from-red-500 to-red-600 text-white border-2 border-red-700";
    } else if (totalRuns >= 6) {
      ballClass += "bg-gradient-to-br from-purple-500 to-purple-600 text-white border-2 border-purple-700";
    } else if (totalRuns === 4) {
      ballClass += "bg-gradient-to-br from-green-500 to-green-600 text-white border-2 border-green-700";
    } else if (extras > 0) {
      ballClass += "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-2 border-yellow-700";
    } else if (totalRuns > 0) {
      ballClass += "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-2 border-blue-700";
    } else {
      ballClass += "bg-gray-700 text-gray-200 border-2 border-gray-600";
    }

    return (
      <div key={ballIndex} className="flex flex-col items-center space-y-1">
        <div className={ballClass} title={ball.commentary || `${totalRuns} runs`}>
          {ball.wicket ? 'W' : totalRuns}
        </div>
        <span className="text-xs text-gray-400 font-medium">{ballIndex + 1}</span>
      </div>
    );
  };

  // Function to render a single over
  const renderOver = (over: Over, overIndex: number) => {
    const balls = over.balls || [];
    const overRuns = over.totalRuns || balls.reduce((sum, ball) => sum + (ball.totalRuns || 0), 0);
    const overWickets = over.wickets || balls.filter(ball => ball.wicket).length;

    return (
      <div key={overIndex} className="bg-slate-800 rounded-2xl shadow-lg p-5 mb-5 border border-slate-700 hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-700">
          <h4 className="font-bold text-white text-lg">
            Over {over.overNumber || overIndex + 1}
          </h4>
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-700 to-green-600 px-3 py-1 rounded-full">
              <span className="font-bold text-white">{overRuns} runs</span>
            </div>
            {overWickets > 0 && (
              <div className="bg-gradient-to-r from-red-700 to-red-600 px-3 py-1 rounded-full">
                <span className="font-bold text-white">{overWickets} wicket(s)</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4 text-sm text-gray-300 bg-slate-900 p-3 rounded-xl">
          <div className="flex items-center">
            <span className="font-medium text-gray-300 mr-2">Bowler:</span>
            <span className="font-bold text-blue-400">{over.bowler || 'Unknown'}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-300 mr-2">Batsman:</span>
            <span className="font-bold text-green-400">{over.batsman || 'Unknown'}</span>
          </div>
        </div>
        
        <div className="flex space-x-3 justify-center py-4">
          {balls.map((ball, ballIndex) => renderBall(ball, ballIndex))}
          {/* Fill empty balls if less than 6 */}
          {Array.from({ length: Math.max(0, 6 - balls.length) }).map((_, emptyIndex) => (
            <div key={`empty-${emptyIndex}`} className="flex flex-col items-center space-y-1">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center">
                <span className="text-gray-500">-</span>
              </div>
              <span className="text-xs text-gray-500 font-medium">{balls.length + emptyIndex + 1}</span>
            </div>
          ))}
        </div>
        
        {/* Ball-by-ball details */}
        {balls.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <h5 className="font-bold text-white mb-3">Ball-by-Ball Details:</h5>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {balls.map((ball, ballIndex) => (
                <div key={ballIndex} className="text-sm text-gray-200 flex justify-between items-center p-2 hover:bg-slate-700 rounded-lg">
                  <span className="font-medium">Ball {ballIndex + 1}:</span>
                  <span>
                    {ball.wicket ? (
                      <span className="text-red-500 font-bold">
                        WICKET - {ball.wicketDesc || 'Fallen'}
                      </span>
                    ) : (
                      <span className="font-medium">
                        {ball.runs || 0} run{ball.runs !== 1 ? 's' : ''}
                        {ball.extras && ball.extras > 0 && ` + ${ball.extras} extra${ball.extras !== 1 ? 's' : ''}`}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (oversData.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl shadow-xl p-8 text-center border border-slate-700">
        <div className="text-gray-400 mb-6">
          <svg className="mx-auto h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No Overs Data Available</h3>
        <p className="text-gray-300 mb-6">
          Over-by-over data is not available for this match yet.
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
            Fetch Overs Data
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overs Summary */}
      <div className="bg-slate-900 rounded-2xl shadow-lg p-5 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Overs Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gradient-to-br from-green-800 to-green-700 p-4 rounded-xl border border-green-600">
            <p className="text-3xl font-bold text-white">{oversData.length}</p>
            <p className="text-sm text-green-200 font-medium">Total Overs</p>
          </div>
          <div className="bg-gradient-to-br from-blue-800 to-blue-700 p-4 rounded-xl border border-blue-600">
            <p className="text-3xl font-bold text-white">
              {oversData.reduce((sum, over) => sum + (over.totalRuns || 0), 0)}
            </p>
            <p className="text-sm text-blue-200 font-medium">Total Runs</p>
          </div>
          <div className="bg-gradient-to-br from-red-800 to-red-700 p-4 rounded-xl border border-red-600">
            <p className="text-3xl font-bold text-white">
              {oversData.reduce((sum, over) => sum + (over.wickets || 0), 0)}
            </p>
            <p className="text-sm text-red-200 font-medium">Total Wickets</p>
          </div>
          <div className="bg-gradient-to-br from-purple-800 to-purple-700 p-4 rounded-xl border border-purple-600">
            <p className="text-3xl font-bold text-white">
              {oversData.length > 0 ? (oversData.reduce((sum, over) => sum + (over.totalRuns || 0), 0) / oversData.length).toFixed(1) : '0.0'}
            </p>
            <p className="text-sm text-purple-200 font-medium">Runs/Over</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-slate-800 rounded-2xl shadow-lg p-5 border border-slate-700">
        <h4 className="font-bold text-white text-lg mb-4">Legend</h4>
        <div className="flex flex-wrap gap-4">
          {[
            { color: 'red', label: 'Wicket' },
            { color: 'purple', label: 'Six (6+ runs)' },
            { color: 'green', label: 'Four (4 runs)' },
            { color: 'yellow', label: 'Extras' },
            { color: 'blue', label: 'Regular runs' },
            { color: 'gray', label: 'No runs' },
          ].map((item) => (
            <div key={item.label} className={`flex items-center space-x-2 bg-${item.color}-900/20 px-3 py-2 rounded-lg`}>
              <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 border-2 border-${item.color}-700`}></div>
              <span className="font-medium text-white">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Overs List */}
      <div className="space-y-5">
        {oversData.map((over, index) => renderOver(over, index))}
      </div>
    </div>
  );
};

export default MatchOvers;