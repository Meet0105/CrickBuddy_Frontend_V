import axios from 'axios';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';
import MatchScorecard from '../../components/MatchScorecard';
import MatchCommentary from '../../components/MatchCommentary';
import MatchOvers from '../../components/MatchOvers';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MatchHeader } from '../../components/matches/MatchHeader';
import { MatchTabs } from '../../components/matches/MatchTabs';
import { extractTeamInfo, extractMatchInfo } from '../../utils/matches/matchHelpers';
import { fetchMatchData, syncMatchDetails } from '../../utils/matches/dataFetching';

export default function MatchDetails({ match, matchId, matchSource }: any) {
  console.log('Match data received:', match);
  console.log('Match ID:', matchId);
  console.log('Match source:', matchSource);
  
  const [activeTab, setActiveTab] = useState('scorecard');
  const [matchInfo, setMatchInfo] = useState(match);
  const [commentary, setCommentary] = useState(null);
  const [historicalCommentary, setHistoricalCommentary] = useState(null);
  const [overs, setOvers] = useState(null);
  const [scorecard, setScorecard] = useState(null);
  const [historicalScorecard, setHistoricalScorecard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [syncing, setSyncing] = useState(false);

  const currentMatch = matchInfo || match;

  // Check if this is an upcoming match without detailed data
  const isUpcomingWithoutDetails = matchSource === 'upcoming' && currentMatch && !currentMatch.scorecard;

  // Extract team and match information with null checks
  const { team1Name, team2Name, team1Score, team2Score } = extractTeamInfo(currentMatch);
  const { status, format, venue, matchDate, matchTime, isLive } = extractMatchInfo(currentMatch);

  // If no match found at all, show not found message
  if (!currentMatch) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🏏</div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Match Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The match with ID "{matchId}" could not be found.
            </p>
            <Link href="/" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // If this is an upcoming match without detailed data, show upcoming match info
  if (isUpcomingWithoutDetails) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">⏰</div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {currentMatch.title || `${team1Name} vs ${team2Name}`}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{format} Match</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200 dark:border-blue-700 rounded-xl p-6 text-center mb-6">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-blue-700 dark:text-blue-300 font-bold text-xl">Match will start on</span>
              </div>
              
              {currentMatch.startDate ? (
                <>
                  <div className="text-blue-800 dark:text-blue-200 font-bold text-2xl mb-2">
                    {new Date(currentMatch.startDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-blue-700 dark:text-blue-300 font-semibold text-xl">
                    at {new Date(currentMatch.startDate).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </div>
                </>
              ) : (
                <div className="text-blue-700 dark:text-blue-300 font-semibold text-lg">
                  Match timing will be announced soon
                </div>
              )}
            </div>

            {/* Match Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Teams</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">{team1Name}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">{team2Name}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Venue</h3>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    {venue || currentMatch.venue?.name || 'Venue TBA'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Detailed match information, scorecard, and commentary will be available once the match begins.
              </p>
              <Link href="/" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-block transition mr-4">
                Back to Home
              </Link>
              <Link href="/formats/upcoming" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
                View All Upcoming
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Check if we have data in the match object
  useEffect(() => {
    if (currentMatch && currentMatch.scorecard) {
      setScorecard(currentMatch.scorecard);
    }
    if (currentMatch && currentMatch.historicalScorecard) {
      setHistoricalScorecard(currentMatch.historicalScorecard);
    }
    if (currentMatch && currentMatch.commentary) {
      setCommentary(currentMatch.commentary);
    }
    if (currentMatch && currentMatch.historicalCommentary) {
      setHistoricalCommentary(currentMatch.historicalCommentary);
    }
    if (currentMatch && currentMatch.overs) {
      setOvers(currentMatch.overs);
    }
  }, [currentMatch]);

  // Automatically sync match data when page loads and periodically for live matches
  useEffect(() => {
    const autoSyncData = async () => {
      try {
        setSyncing(true);
        const data = await syncMatchDetails(matchId);
        
        if (data.match) {
          setMatchInfo(data.match);
          if (data.match.scorecard) {
            setScorecard(data.match.scorecard);
          }
          if (data.match.historicalScorecard) {
            setHistoricalScorecard(data.match.historicalScorecard);
          }
          if (data.match.commentary) {
            setCommentary(data.match.commentary);
          }
          if (data.match.historicalCommentary) {
            setHistoricalCommentary(data.match.historicalCommentary);
          }
          if (data.match.overs) {
            setOvers(data.match.overs);
          }
        }
      } catch (err: any) {
        console.warn('Auto-sync failed (non-critical):', err.message);
        // Don't set error state for sync failures - the page should still work with existing data
        // setError(err.message || 'Failed to auto-sync match data');
      } finally {
        setSyncing(false);
      }
    };

    // Always auto-sync when page loads
    autoSyncData();

    // For live matches, set up periodic refresh
    let intervalId: NodeJS.Timeout | null = null;
    if (isLive && matchId) {
      intervalId = setInterval(() => {
        autoSyncData();
      }, 30000); // Refresh every 30 seconds for live matches
    }

    // Clean up interval on component unmount or when match status changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [matchId, isLive]);

  const handleFetchMatchData = async (endpoint: string, setData: Function) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMatchData(matchId, endpoint);
      setData(data);
    } catch (err) {
      setError(err.message || `Failed to fetch ${endpoint}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncMatchDetails = async () => {
    setSyncing(true);
    try {
      const data = await syncMatchDetails(matchId);
      
      if (data.match) {
        setMatchInfo(data.match);
        if (data.match.scorecard) {
          setScorecard(data.match.scorecard);
        }
        if (data.match.historicalScorecard) {
          setHistoricalScorecard(data.match.historicalScorecard);
        }
        if (data.match.commentary) {
          setCommentary(data.match.commentary);
        }
        if (data.match.historicalCommentary) {
          setHistoricalCommentary(data.match.historicalCommentary);
        }
        if (data.match.overs) {
          setOvers(data.match.overs);
        }
      }
      
      alert('Match data synced successfully!');
    } catch (err: any) {
      console.error('Sync failed:', err);
      const errorMessage = err.message || 'Failed to sync match data';
      alert(`Sync failed: ${errorMessage}`);
    } finally {
      setSyncing(false);
    }
  };

  const fetchScorecard = () => handleFetchMatchData('scorecard', setScorecard);
  const fetchHistoricalScorecard = () => handleFetchMatchData('historical-scorecard', setHistoricalScorecard);
  const fetchCommentary = () => handleFetchMatchData('commentary', setCommentary);
  const fetchOvers = () => handleFetchMatchData('overs', setOvers);

  useEffect(() => {
    if (activeTab === 'scorecard') {
      if (!scorecard && !historicalScorecard) {
        fetchScorecard();
        fetchHistoricalScorecard();
      }
    } else if (activeTab === 'commentary' && !commentary) {
      fetchCommentary();
    } else if (activeTab === 'overs' && !overs) {
      fetchOvers();
    }
  }, [activeTab]);

  if (!match && !matchInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-center border border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Match Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Sorry, we couldn't find the match you're looking for.</p>
            <Link href="/" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition">
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-400 dark:text-gray-500">
          <Link href="/" className="text-green-600 hover:text-green-500">Home</Link>
          <span className="text-gray-500 dark:text-gray-600 mx-2">/</span>
          <span className="text-gray-500 dark:text-gray-400">Match Details</span>
        </nav>
        
        {/* Match Header */}
        <MatchHeader 
          currentMatch={currentMatch}
          isLive={isLive}
          status={status}
          format={format}
          venue={venue}
          matchDate={matchDate}
          matchTime={matchTime}
          syncMatchDetails={handleSyncMatchDetails}
          syncing={syncing}
        />
        
        {/* Match Information Tabs */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <MatchTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="p-6">
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
                <p className="text-red-700 dark:text-red-300">Error: {error}</p>
              </div>
            )}
            
            {activeTab === 'scorecard' && (
              <MatchScorecard 
                scorecard={scorecard}
                historicalScorecard={historicalScorecard}
                match={currentMatch}
              />
            )}
            
            {activeTab === 'commentary' && (
              <MatchCommentary 
                commentary={commentary}
                historicalCommentary={historicalCommentary}
                match={currentMatch}
              />
            )}
            
            {activeTab === 'overs' && (
              <MatchOvers 
                overs={overs}
                match={currentMatch}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  try {
    const { id } = params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    console.log('Fetching match data for ID:', id);
    
    // Try to get match from different endpoints
    let match = null;
    let matchSource = '';
    
    // First try the main matches endpoint
    try {
      const res = await axios.get(`${apiUrl}/api/matches/${id}`, { timeout: 5000 });
      match = res.data;
      matchSource = 'main';
    } catch (mainError) {
      console.log('Main endpoint failed, trying upcoming matches...');
      
      // Try upcoming matches endpoint
      try {
        const upcomingRes = await axios.get(`${apiUrl}/api/matches/upcoming`, { timeout: 5000 });
        const upcomingMatches = Array.isArray(upcomingRes.data) ? upcomingRes.data : [];
        match = upcomingMatches.find((m: any) => m.matchId === id || m._id === id);
        matchSource = 'upcoming';
      } catch (upcomingError) {
        console.log('Upcoming endpoint failed, trying live matches...');
        
        // Try live matches endpoint
        try {
          const liveRes = await axios.get(`${apiUrl}/api/matches/live`, { timeout: 5000 });
          const liveMatches = Array.isArray(liveRes.data) ? liveRes.data : [];
          match = liveMatches.find((m: any) => m.matchId === id || m._id === id);
          matchSource = 'live';
        } catch (liveError) {
          console.log('Live endpoint failed, trying recent matches...');
          
          // Try recent matches endpoint
          try {
            const recentRes = await axios.get(`${apiUrl}/api/matches/recent`, { timeout: 5000 });
            const recentMatches = Array.isArray(recentRes.data) ? recentRes.data : [];
            match = recentMatches.find((m: any) => m.matchId === id || m._id === id);
            matchSource = 'recent';
          } catch (recentError) {
            console.log('All endpoints failed');
          }
        }
      }
    }
    
    if (match) {
      console.log(`Match found from ${matchSource} endpoint`);
      return { 
        props: { 
          match,
          matchId: id,
          matchSource
        } 
      };
    } else {
      console.log('Match not found in any endpoint');
      return { 
        props: { 
          match: null,
          matchId: id,
          matchSource: 'none'
        } 
      };
    }
    
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { 
      props: { 
        match: null,
        matchId: params?.id || null,
        matchSource: 'error'
      } 
    };
  }
}