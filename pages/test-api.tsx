import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestAPI() {
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const testAPI = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
      console.log('🔍 Testing API from:', apiUrl);

      try {
        // Test live matches
        const liveResponse = await axios.get(`${apiUrl}/api/matches/live`, { timeout: 10000 });
        setLiveMatches(Array.isArray(liveResponse.data) ? liveResponse.data : []);
        console.log('✅ Live matches:', liveResponse.data);
      } catch (error: any) {
        console.error('❌ Live matches error:', error);
        setErrors(prev => ({ ...prev, live: error.message }));
      }

      try {
        // Test upcoming matches
        const upcomingResponse = await axios.get(`${apiUrl}/api/matches/upcoming`, { timeout: 10000 });
        setUpcomingMatches(Array.isArray(upcomingResponse.data) ? upcomingResponse.data : []);
        console.log('✅ Upcoming matches:', upcomingResponse.data);
      } catch (error: any) {
        console.error('❌ Upcoming matches error:', error);
        setErrors(prev => ({ ...prev, upcoming: error.message }));
      }

      setLoading(false);
    };

    testAPI();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-2xl font-bold mb-4">Testing API Connection...</h1>
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">API Test Results</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Environment Info</h2>
        <div className="bg-gray-800 p-4 rounded">
          <p>API URL: {process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app'}</p>
          <p>Environment: {process.env.NODE_ENV}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Live Matches ({liveMatches.length})</h2>
        {errors.live ? (
          <div className="bg-red-800 p-4 rounded">
            <p>Error: {errors.live}</p>
          </div>
        ) : (
          <div className="bg-gray-800 p-4 rounded">
            {liveMatches.slice(0, 3).map((match, index) => (
              <div key={index} className="mb-2">
                <p>{match.title} - {match.format} - {match.status}</p>
                <p className="text-sm text-gray-400">
                  {match.teams?.[0]?.teamName} vs {match.teams?.[1]?.teamName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upcoming Matches ({upcomingMatches.length})</h2>
        {errors.upcoming ? (
          <div className="bg-red-800 p-4 rounded">
            <p>Error: {errors.upcoming}</p>
          </div>
        ) : (
          <div className="bg-gray-800 p-4 rounded">
            {upcomingMatches.slice(0, 3).map((match, index) => (
              <div key={index} className="mb-2">
                <p>{match.title} - {match.format} - {match.status}</p>
                <p className="text-sm text-gray-400">
                  {match.teams?.[0]?.teamName} vs {match.teams?.[1]?.teamName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
