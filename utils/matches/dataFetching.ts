import axios from 'axios';

// Data fetching functions for match details

export const fetchMatchData = async (matchId: string, endpoint: string) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
    const res = await axios.get(`${apiUrl}/api/matches/${matchId}/${endpoint}`);
    return res.data;
  } catch (err) {
    throw new Error(err.message || `Failed to fetch ${endpoint}`);
  }
};

export const syncMatchDetails = async (matchId: string) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
    const res = await axios.post(`${apiUrl}/api/matches/${matchId}/sync-details`);
    return res.data;
  } catch (err) {
    throw new Error(err.message || 'Failed to sync match data');
  }
};