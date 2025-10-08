import Link from 'next/link';
import { useState, useEffect } from 'react';

const LiveScoresDropdown = () => {
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // In a real app, this would fetch from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLiveMatches([
        {
          id: 1,
          team1: { name: 'India', shortName: 'IND', score: '287/4', overs: '45.2' },
          team2: { name: 'Australia', shortName: 'AUS', score: '145/7', overs: '28.4' },
          status: 'LIVE',
          format: 'T20',
          venue: 'MCG, Melbourne'
        },
        {
          id: 2,
          team1: { name: 'England', shortName: 'ENG', score: '312/8', overs: '50.0' },
          team2: { name: 'South Africa', shortName: 'SA', score: '156/3', overs: '22.3' },
          status: 'LIVE',
          format: 'ODI',
          venue: 'Lord\'s, London'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="bg-slate-800 text-gray-100 rounded-xl shadow-2xl w-full sm:w-80 py-3">
      <div className="px-3 sm:px-4 py-2 border-b border-slate-700">
        <h3 className="font-bold flex items-center text-sm sm:text-base">
          <span className="relative flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          Live Cricket Scores
        </h3>
      </div>
      
      {loading ? (
        <div className="px-3 sm:px-4 py-4 sm:py-6 text-center">
          <div className="animate-pulse flex flex-col space-y-3 sm:space-y-4">
            <div className="h-3 sm:h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
            <div className="h-3 sm:h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
            <div className="h-3 sm:h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      ) : liveMatches.length > 0 ? (
        <div className="max-h-80 sm:max-h-96 overflow-y-auto">
          {liveMatches.map((match) => (
            <Link 
              key={match.id} 
              href={`/matches/${match.id}`}
              className="block px-3 sm:px-4 py-2 sm:py-3 hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-b-0 rounded-md"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded-full">
                  {match.status}
                </span>
                <span className="text-xs text-gray-400">{match.format}</span>
              </div>
              
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="font-medium truncate max-w-[100px] sm:max-w-[120px]">{match.team1.shortName}</span>
                  <span className="font-bold">{match.team1.score}</span>
                  <span className="text-xs text-gray-400">({match.team1.overs})</span>
                </div>
                
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="font-medium truncate max-w-[100px] sm:max-w-[120px]">{match.team2.shortName}</span>
                  <span className="font-bold">{match.team2.score}</span>
                  <span className="text-xs text-gray-400">({match.team2.overs})</span>
                </div>
              </div>
              
              <div className="mt-1.5 sm:mt-2 text-xs text-gray-400 truncate">
                {match.venue}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="px-3 sm:px-4 py-4 sm:py-6 text-center">
          <div className="bg-slate-700 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-2 sm:mb-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm">No live matches at the moment</p>
        </div>
      )}
      
      <div className="px-3 sm:px-4 py-2 border-t border-slate-700">
        <Link 
          href="/formats/live" 
          className="text-emerald-400 hover:text-emerald-500 font-medium text-xs sm:text-sm flex items-center justify-center"
        >
          View All Live Matches
          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default LiveScoresDropdown;