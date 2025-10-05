import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LiveScoresDropdown = () => {
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/matches/live?limit=5`, { 
          timeout: 8000,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        
        const matches = Array.isArray(response.data) ? response.data : [];
        
        // Transform the data to match the expected format
        const transformedMatches = matches.slice(0, 5).map((match: any) => ({
          id: match.matchId,
          team1: {
            name: match.teams?.[0]?.teamName || 'Team 1',
            shortName: match.teams?.[0]?.teamShortName || 'T1',
            score: match.teams?.[0]?.score?.runs ? 
              `${match.teams[0].score.runs}/${match.teams[0].score.wickets}` : 
              'Yet to bat',
            overs: match.teams?.[0]?.score?.overs ? 
              `${match.teams[0].score.overs}` : 
              '0.0'
          },
          team2: {
            name: match.teams?.[1]?.teamName || 'Team 2',
            shortName: match.teams?.[1]?.teamShortName || 'T2',
            score: match.teams?.[1]?.score?.runs ? 
              `${match.teams[1].score.runs}/${match.teams[1].score.wickets}` : 
              'Yet to bat',
            overs: match.teams?.[1]?.score?.overs ? 
              `${match.teams[1].score.overs}` : 
              '0.0'
          },
          status: match.isLive ? 'LIVE' : match.status,
          format: match.format || 'Unknown',
          venue: `${match.venue?.name || 'TBD'}, ${match.venue?.city || ''}`
        }));
        
        setLiveMatches(transformedMatches);
      } catch (error) {
        console.error('Error fetching live matches for dropdown:', error);
        setLiveMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMatches();
  }, []);

  return (
    <div className="bg-slate-800 text-gray-100 rounded-xl shadow-2xl w-80 py-3">
      <div className="px-4 py-2 border-b border-slate-700">
        <h3 className="font-bold flex items-center">
          <span className="relative flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          Live Cricket Scores
        </h3>
      </div>
      
      {loading ? (
        <div className="px-4 py-6 text-center">
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      ) : liveMatches.length > 0 ? (
        <div className="max-h-96 overflow-y-auto">
          {liveMatches.map((match) => (
            <Link 
              key={match.id} 
              href={`/matches/${match.id}`}
              className="block px-4 py-3 hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-b-0 rounded-md"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded-full">
                  {match.status}
                </span>
                <span className="text-xs text-gray-400">{match.format}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium truncate max-w-[120px]">{match.team1.shortName}</span>
                  <span className="font-bold">{match.team1.score}</span>
                  <span className="text-xs text-gray-400">({match.team1.overs})</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium truncate max-w-[120px]">{match.team2.shortName}</span>
                  <span className="font-bold">{match.team2.score}</span>
                  <span className="text-xs text-gray-400">({match.team2.overs})</span>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-gray-400 truncate">
                {match.venue}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="px-4 py-6 text-center">
          <div className="bg-slate-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm">No live matches at the moment</p>
          <Link 
            href="/formats/upcoming" 
            className="text-emerald-400 hover:text-emerald-500 font-medium text-xs mt-2 inline-block"
          >
            View Upcoming Matches →
          </Link>
        </div>
      )}
      
      <div className="px-4 py-2 border-t border-slate-700">
        <div className="flex justify-between items-center text-sm">
          <Link 
            href="/formats/live" 
            className="text-emerald-400 hover:text-emerald-500 font-medium flex items-center"
          >
            All Live
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link 
            href="/formats/upcoming" 
            className="text-blue-400 hover:text-blue-500 font-medium flex items-center"
          >
            Upcoming
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LiveScoresDropdown;