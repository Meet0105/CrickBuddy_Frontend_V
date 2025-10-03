import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import MatchCard from '../../components/MatchCard';
import Navbar from '../../components/Navbar';

type Match = any;

// Helper function to determine if a match is actually completed
const isActuallyCompleted = (match: any) => {
  const status = match?.status || '';
  const lowerStatus = status.toLowerCase();
  
  // Check for completed status patterns
  return lowerStatus.includes('complete') ||
         lowerStatus.includes('finished') ||
         lowerStatus.includes('won') ||
         lowerStatus.includes('abandon') ||
         lowerStatus.includes('cancel') ||
         lowerStatus.includes('no result') ||
         lowerStatus.includes('tied') ||
         status === 'COMPLETED' ||
         status === 'ABANDONED' ||
         status === 'CANCELLED';
};

export default function LiveMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/matches/live?t=${Date.now()}`, { 
          timeout: 10000,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        setMatches(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching live matches:', error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMatches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">Loading live matches...</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter out completed matches that are incorrectly marked as live
  const filteredMatches = matches.filter((match: any) => !isActuallyCompleted(match));
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-100 flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Live Cricket Matches
          </h1>
          <Link href="/" className="text-green-400 hover:text-green-300 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
        
        <div className="space-y-6">
          {filteredMatches && filteredMatches.length > 0 ? (
            filteredMatches.map((match: any) => (
              <Link key={match.matchId} href={`/matches/${match.matchId}`}>
                <div className="block cursor-pointer mb-6">
                  <MatchCard match={match} isLive={true} isCompleted={false} isUpcoming={false} />
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <div className="text-5xl mb-4">🏏</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">No Live Matches</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">There are currently no live cricket matches. Check back later!</p>
              <Link href="/" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
                View Upcoming Matches
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await axios.get(`${apiUrl}/api/matches/live?t=${Date.now()}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    const matches = Array.isArray(res.data) ? res.data : [];
    return { props: { matches } };
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return { props: { matches: [] } };
  }
}