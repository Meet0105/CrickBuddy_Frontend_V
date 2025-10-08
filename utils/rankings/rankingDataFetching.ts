import axios from 'axios';
import { 
  processTeamStandings, 
  processPlayerRankings, 
  fallbackTeamRankings, 
  fallbackPlayerRankings 
} from './rankingHelpers';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';

// Fetch team rankings with individual error handling
export const fetchTeamRankings = async () => {
  let testTeamRes, odiTeamRes, t20TeamRes;
  let t20DataError = '';
  
  try {
    testTeamRes = await axios.get(`${apiUrl}/api/rankings/icc-standings/1`, { timeout: 8000 });
  } catch (error) {
    console.error('Error fetching test team standings:', error);
    testTeamRes = { data: null };
  }
  
  try {
    odiTeamRes = await axios.get(`${apiUrl}/api/rankings/icc-standings/2`, { timeout: 8000 });
  } catch (error) {
    console.error('Error fetching ODI team standings:', error);
    odiTeamRes = { data: null };
  }
  
  try {
    t20TeamRes = await axios.get(`${apiUrl}/api/rankings/icc-standings/3`, { timeout: 8000 });
  } catch (error: any) {
    console.error('Error fetching T20 team standings:', error);
    t20TeamRes = { data: null };
    // Check if this is a specific API error for T20 data
    if (error?.response?.data?.message?.includes('T20')) {
      t20DataError = error.response.data.message;
    } else if (error?.response?.status === 500) {
      t20DataError = 'T20 rankings data is temporarily unavailable due to an issue with the external API. Please try Test (1) or ODI (2) match types instead.';
    }
  }
  
  // Process team rankings data
  const testTeamRankings = processTeamStandings(testTeamRes?.data, fallbackTeamRankings);
  const odiTeamRankings = processTeamStandings(odiTeamRes?.data, fallbackTeamRankings);
  const t20TeamRankings = processTeamStandings(t20TeamRes?.data, fallbackTeamRankings);
  
  return { testTeamRankings, odiTeamRankings, t20TeamRankings, t20DataError };
};

// Fetch player rankings with individual error handling
export const fetchPlayerRankings = async () => {
  // Fetch batsmen rankings with individual error handling
  let testBatsmenRes, odiBatsmenRes, t20BatsmenRes;
  
  try {
    testBatsmenRes = await axios.get(`${apiUrl}/api/rankings/icc-rankings?formatType=test&category=batsmen`);
  } catch (error: any) {
    console.error('Error fetching test batsmen rankings:', error);
    // Handle subscription errors
    if (error?.response?.status === 403 || error?.response?.data?.message?.includes('subscribe')) {
      testBatsmenRes = { data: { error: 'subscription_required', message: 'API subscription required for rankings' } };
    } else {
      testBatsmenRes = { data: null };
    }
  }
  
  try {
    odiBatsmenRes = await axios.get(`${apiUrl}/api/rankings/icc-rankings?formatType=odi&category=batsmen`);
  } catch (error: any) {
    console.error('Error fetching ODI batsmen rankings:', error);
    // Handle subscription errors
    if (error?.response?.status === 403 || error?.response?.data?.message?.includes('subscribe')) {
      odiBatsmenRes = { data: { error: 'subscription_required', message: 'API subscription required for rankings' } };
    } else {
      odiBatsmenRes = { data: null };
    }
  }
  
  try {
    t20BatsmenRes = await axios.get(`${apiUrl}/api/rankings/icc-rankings?formatType=t20&category=batsmen`);
  } catch (error: any) {
    console.error('Error fetching T20 batsmen rankings:', error);
    // Handle subscription errors
    if (error?.response?.status === 403 || error?.response?.data?.message?.includes('subscribe')) {
      t20BatsmenRes = { data: { error: 'subscription_required', message: 'API subscription required for rankings' } };
    } else {
      t20BatsmenRes = { data: null };
    }
  }
  
  // Fetch bowlers rankings with individual error handling
  let testBowlersRes, odiBowlersRes, t20BowlersRes;
  
  try {
    testBowlersRes = await axios.get(`${apiUrl}/api/rankings/icc-rankings?formatType=test&category=bowlers`);
  } catch (error: any) {
    console.error('Error fetching test bowlers rankings:', error);
    // Handle subscription errors
    if (error?.response?.status === 403 || error?.response?.data?.message?.includes('subscribe')) {
      testBowlersRes = { data: { error: 'subscription_required', message: 'API subscription required for rankings' } };
    } else {
      testBowlersRes = { data: null };
    }
  }
  
  try {
    odiBowlersRes = await axios.get(`${apiUrl}/api/rankings/icc-rankings?formatType=odi&category=bowlers`);
  } catch (error: any) {
    console.error('Error fetching ODI bowlers rankings:', error);
    // Handle subscription errors
    if (error?.response?.status === 403 || error?.response?.data?.message?.includes('subscribe')) {
      odiBowlersRes = { data: { error: 'subscription_required', message: 'API subscription required for rankings' } };
    } else {
      odiBowlersRes = { data: null };
    }
  }
  
  try {
    t20BowlersRes = await axios.get(`${apiUrl}/api/rankings/icc-rankings?formatType=t20&category=bowlers`);
  } catch (error: any) {
    console.error('Error fetching T20 bowlers rankings:', error);
    // Handle subscription errors
    if (error?.response?.status === 403 || error?.response?.data?.message?.includes('subscribe')) {
      t20BowlersRes = { data: { error: 'subscription_required', message: 'API subscription required for rankings' } };
    } else {
      t20BowlersRes = { data: null };
    }
  }
  
  // Process batsmen rankings data
  const testBatsmenRankings = processPlayerRankings(testBatsmenRes?.data, fallbackPlayerRankings);
  const odiBatsmenRankings = processPlayerRankings(odiBatsmenRes?.data, fallbackPlayerRankings);
  const t20BatsmenRankings = processPlayerRankings(t20BatsmenRes?.data, fallbackPlayerRankings);
  
  // Process bowlers rankings data
  const testBowlersRankings = processPlayerRankings(testBowlersRes?.data, fallbackPlayerRankings);
  const odiBowlersRankings = processPlayerRankings(odiBowlersRes?.data, fallbackPlayerRankings);
  const t20BowlersRankings = processPlayerRankings(t20BowlersRes?.data, fallbackPlayerRankings);
  
  return { 
    testBatsmenRankings,
    odiBatsmenRankings,
    t20BatsmenRankings,
    testBowlersRankings,
    odiBowlersRankings,
    t20BowlersRankings
  };
};

export const fetchAllRankings = async () => {
  const [teamRankings, playerRankings] = await Promise.all([
    fetchTeamRankings(),
    fetchPlayerRankings()
  ]);
  
  return {
    ...teamRankings,
    ...playerRankings
  };
};