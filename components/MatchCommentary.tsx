import React from 'react';

interface CommentaryItem {
  commText?: string;
  timestamp?: string;
  ballNbr?: number;
  overNumber?: number;
  batTeamName?: string;
  bowlTeamName?: string;
  commentaryFormats?: {
    bold?: { formatId?: string; formatValue?: string[] }[];
  };
}

interface MatchCommentaryProps {
  commentary?: {
    commentaryList?: CommentaryItem[];
    matchHeader?: any;
  };
  historicalCommentary?: {
    commentaryList?: CommentaryItem[];
    matchHeader?: any;
  };
  match?: any;
}

const MatchCommentary: React.FC<MatchCommentaryProps> = ({ 
  commentary, 
  historicalCommentary, 
  match 
}) => {
  // Get commentary data from either source
  const getCommentaryData = (): CommentaryItem[] => {
    if (commentary?.commentaryList && commentary.commentaryList.length > 0) {
      return commentary.commentaryList;
    }
    if (historicalCommentary?.commentaryList && historicalCommentary.commentaryList.length > 0) {
      return historicalCommentary.commentaryList;
    }
    return [];
  };

  const commentaryData = getCommentaryData();

  // Function to format commentary text with bold formatting
  const formatCommentaryText = (item: CommentaryItem) => {
    let text = item.commText || '';
    
    // Apply bold formatting if available
    if (item.commentaryFormats?.bold) {
      item.commentaryFormats.bold.forEach(format => {
        if (format.formatValue) {
          format.formatValue.forEach(value => {
            text = text.replace(value, `<strong>${value}</strong>`);
          });
        }
      });
    }
    
    return text;
  };

  // Function to get over and ball info
  const getOverBallInfo = (item: CommentaryItem) => {
    if (item.overNumber !== undefined && item.ballNbr !== undefined) {
      return `${item.overNumber}.${item.ballNbr}`;
    }
    return null;
  };

  if (commentaryData.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl shadow-xl p-8 text-center border border-slate-700">
        <div className="text-gray-400 mb-6">
          <svg className="mx-auto h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.172-.268l-5.909 2.909a.5.5 0 01-.707-.707l2.909-5.909A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No Commentary Available</h3>
        <p className="text-gray-300 mb-6">
          Commentary data is not available for this match yet.
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
            Fetch Commentary Data
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-700">
        <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-5 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Live Commentary</h3>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              {commentaryData.length} entries
            </span>
          </div>
          <p className="text-green-200 text-sm mt-1">
            Real-time updates from the match
          </p>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {commentaryData.map((item, index) => {
            const overBall = getOverBallInfo(item);
            const formattedText = formatCommentaryText(item);
            
            return (
              <div 
                key={index} 
                className={`p-5 border-b border-slate-700 ${index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-700'} hover:bg-green-900 transition-colors`}
              >
                <div className="flex items-start space-x-4">
                  {overBall && (
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm">
                        {overBall}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div 
                      className="text-gray-200 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formattedText }}
                    />
                    
                    {item.timestamp && (
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Commentary Stats */}
      <div className="bg-slate-800 rounded-2xl shadow-lg p-5 border border-slate-700">
        <h4 className="font-bold text-white text-lg mb-4">Match Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gradient-to-br from-green-900 to-green-700 p-4 rounded-xl border border-green-600">
            <p className="text-3xl font-bold text-green-200">{commentaryData.length}</p>
            <p className="text-sm text-green-300 font-medium">Total Entries</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-4 rounded-xl border border-blue-600">
            <p className="text-3xl font-bold text-blue-200">
              {Math.max(...commentaryData.map(item => item.overNumber || 0))}
            </p>
            <p className="text-sm text-blue-300 font-medium">Last Over</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-4 rounded-xl border border-purple-600">
            <p className="text-lg font-bold text-purple-200 truncate px-2">
              {commentary?.matchHeader?.batTeamName || historicalCommentary?.matchHeader?.batTeamName || 'N/A'}
            </p>
            <p className="text-sm text-purple-300 font-medium">Batting Team</p>
          </div>
          <div className="bg-gradient-to-br from-orange-900 to-orange-700 p-4 rounded-xl border border-orange-600">
            <p className="text-lg font-bold text-orange-200 truncate px-2">
              {commentary?.matchHeader?.bowlTeamName || historicalCommentary?.matchHeader?.bowlTeamName || 'N/A'}
            </p>
            <p className="text-sm text-orange-300 font-medium">Bowling Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCommentary;