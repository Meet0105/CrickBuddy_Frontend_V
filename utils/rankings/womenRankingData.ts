import axios from 'axios';
import { 
  processTeamStandings, 
  processPlayerRankings 
} from './rankingHelpers';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Fallback data for women's team rankings
export const fallbackWomenTeamRankings = [
  { position: 1, teamName: 'Australia', rating: 156, points: 5616 },
  { position: 2, teamName: 'England', rating: 137, points: 4932 },
  { position: 3, teamName: 'India', rating: 130, points: 4680 },
  { position: 4, teamName: 'South Africa', rating: 115, points: 4140 },
  { position: 5, teamName: 'New Zealand', rating: 108, points: 3888 },
  { position: 6, teamName: 'West Indies', rating: 85, points: 3060 },
  { position: 7, teamName: 'Pakistan', rating: 78, points: 2808 },
  { position: 8, teamName: 'Sri Lanka', rating: 65, points: 2340 },
  { position: 9, teamName: 'Bangladesh', rating: 52, points: 1872 },
  { position: 10, teamName: 'Ireland', rating: 45, points: 1620 }
];

// Fallback data for women's player rankings
export const fallbackWomenPlayerRankings = [
  { position: 1, playerName: 'Meg Lanning', country: 'Australia', rating: 762, points: 762 },
  { position: 2, playerName: 'Beth Mooney', country: 'Australia', rating: 743, points: 743 },
  { position: 3, playerName: 'Nat Sciver', country: 'England', rating: 728, points: 728 },
  { position: 4, playerName: 'Alyssa Healy', country: 'Australia', rating: 715, points: 715 },
  { position: 5, playerName: 'Smriti Mandhana', country: 'India', rating: 708, points: 708 },
  { position: 6, playerName: 'Ellyse Perry', country: 'Australia', rating: 695, points: 695 },
  { position: 7, playerName: 'Tammy Beaumont', country: 'England', rating: 682, points: 682 },
  { position: 8, playerName: 'Laura Wolvaardt', country: 'South Africa', rating: 675, points: 675 },
  { position: 9, playerName: 'Rachael Haynes', country: 'Australia', rating: 668, points: 668 },
  { position: 10, playerName: 'Mithali Raj', country: 'India', rating: 661, points: 661 }
];

// Fetch women's team rankings with individual error handling
export const fetchWomenTeamRankings = async () => {
  let testTeamRes, odiTeamRes, t20TeamRes;
  
  try {
    testTeamRes = await axios.get(`${apiUrl}/api/rankings/icc-standings/1`);
  } catch (error: any) {
    console.error('Error fetching test team standings:', error);
    // Handle subscription errors
    if (error?.response?.status === 403 || error?.response?.data?.message?.includes('subscribe')) {
      testTeamRes = { data: { error: 'subscription_required', message: 'API subscription required for standings' } };
    } else {
      testTeamRes = { data: null };
    }
  }
  
  try {
    odiTeamRes = await axios.get(`${apiUrl}/api/rankings/icc-standings/2`);
  } catch (error: any) {
    console.error('Error fetching ODI team standings:', error);
    // Handle subscription errors
    if (error?.response?.status === 403 || error?.response?.data?.message?.includes('subscribe')) {
      odiTeamRes = { data: { error: 'subscription_required', message: 'API subscription required for standings' } };
    } else {
      odiTeamRes = { data: null };
    }
  }
  
  try {
    t20TeamRes = await axios.get(`${apiUrl}/api/rankings/icc-standings/3`);
  } catch (error: any) {
    console.error('Error fetching T20 team standings:', error);
    // Handle subscription errors
    if (error?.response?.status === 403 || error?.response?.data?.message?.includes('subscribe')) {
      t20TeamRes = { data: { error: 'subscription_required', message: 'API subscription required for standings' } };
    } else {
      t20TeamRes = { data: null };
    }
  }
  
  // Process team rankings data (using actual data where available, fallback for women's specific data)
  const testTeamRankings = processTeamStandings(testTeamRes?.data, fallbackWomenTeamRankings);
  const odiTeamRankings = processTeamStandings(odiTeamRes?.data, fallbackWomenTeamRankings);
  const t20TeamRankings = processTeamStandings(t20TeamRes?.data, fallbackWomenTeamRankings);
  
  return { testTeamRankings, odiTeamRankings, t20TeamRankings };
};

// Fetch women's player rankings
export const fetchWomenPlayerRankings = async () => {
  // For women's player rankings, using fallback data since specific endpoints aren't available
  const testBatsmenRankings = fallbackWomenPlayerRankings;
  const odiBatsmenRankings = fallbackWomenPlayerRankings;
  const t20BatsmenRankings = fallbackWomenPlayerRankings;
  const testBowlersRankings = fallbackWomenPlayerRankings;
  const odiBowlersRankings = fallbackWomenPlayerRankings;
  const t20BowlersRankings = fallbackWomenPlayerRankings;
  
  return { 
    testBatsmenRankings,
    odiBatsmenRankings,
    t20BatsmenRankings,
    testBowlersRankings,
    odiBowlersRankings,
    t20BowlersRankings
  };
};

export const fetchAllWomenRankings = async () => {
  const [teamRankings, playerRankings] = await Promise.all([
    fetchWomenTeamRankings(),
    fetchWomenPlayerRankings()
  ]);
  
  return {
    ...teamRankings,
    ...playerRankings
  };
};