import axios from 'axios';

// Data fetching functions for match details

export const fetchMatchData = async (matchId: string, endpoint: string) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await axios.get(`${apiUrl}/api/matches/${matchId}/${endpoint}`);
    return res.data;
  } catch (err) {
    throw new Error(err.message || `Failed to fetch ${endpoint}`);
  }
};

export const syncMatchDetails = async (matchId: string) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await axios.post(`${apiUrl}/api/matches/${matchId}/sync-details`);
    return res.data;
  } catch (err: any) {
    console.warn('Sync match details failed:', err.response?.data?.message || err.message);
    
    // If it's a 404 or "No match data found", return a more user-friendly message
    if (err.response?.status === 404 || err.response?.data?.message?.includes('No match data found')) {
      throw new Error('Match data sync is not available for this match');
    }
    
    throw new Error(err.response?.data?.message || err.message || 'Failed to sync match data');
  }
};