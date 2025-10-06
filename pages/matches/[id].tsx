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

export default function MatchDetails({ match, matchId }: any) {
  console.log('Match data received:', match);
  console.log('Match ID:', matchId);
  
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

  // Extract team and match information with null checks
  const { team1Name, team2Name, team1Score, team2Score } = extractTeamInfo(currentMatch);
  const { status, format, venue, matchDate, matchTime, isLive } = extractMatchInfo(currentMatch);

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
      } catch (err) {
        console.error('Auto-sync failed:', err);
        setError(err.message || 'Failed to auto-sync match data');
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
    } catch (err) {
      console.error('Sync failed:', err);
      alert('Failed to sync match data. Please try again.');
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
    
    console.log('Fetching match data for ID:', id);
    const res = await axios.get(`${apiUrl}/api/matches/${id}`);
    
    return { 
      props: { 
        match: res.data,
        matchId: id
      } 
    };
  } catch (error) {
    console.error('Error fetching match:', error);
    return { 
      props: { 
        match: null,
        matchId: params?.id || null
      } 
    };
  }
}