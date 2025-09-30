import axios from 'axios';
import { 
  transformPlayerInfo, 
  processCareerStats, 
  processBattingStats, 
  processBowlingStats, 
  processNewsData,
  getDefaultRankings
} from './playerHelpers';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchPlayerInfo = async (playerId: string) => {
  try {
    const playerRes = await axios.get(`${apiUrl}/api/players/${playerId}/info`);
    const transformed = transformPlayerInfo(playerRes.data, playerId);
    return transformed;
  } catch (error) {
    console.error('Error fetching player info:', error);
    return null;
  }
};

export const fetchCareerStats = async (playerId: string) => {
  try {
    const careerRes = await axios.get(`${apiUrl}/api/players/${playerId}/career`);
    return processCareerStats(careerRes.data);
  } catch (error) {
    // Fallback: create sample career stats if API fails
    return [
      { format: 'Test', matches: 0, runs: 0, wickets: 0, average: 0, strikeRate: 0 },
      { format: 'ODI', matches: 0, runs: 0, wickets: 0, average: 0, strikeRate: 0 },
      { format: 'T20I', matches: 0, runs: 0, wickets: 0, average: 0, strikeRate: 0 }
    ];
  }
};

export const fetchBattingStats = async (playerId: string) => {
  try {
    const battingRes = await axios.get(`${apiUrl}/api/players/${playerId}/batting`);
    const processed = processBattingStats(battingRes.data);
    return processed;
  } catch (error) {
    console.error('Error fetching batting stats:', error);
    // Fallback: create sample batting stats if API fails
    return [
      { format: 'Test', matches: 0, runs: 0, average: 0, strikeRate: 0, centuries: 0, fifties: 0, highest: 0 },
      { format: 'ODI', matches: 0, runs: 0, average: 0, strikeRate: 0, centuries: 0, fifties: 0, highest: 0 },
      { format: 'T20I', matches: 0, runs: 0, average: 0, strikeRate: 0, centuries: 0, fifties: 0, highest: 0 }
    ];
  }
};

export const fetchBowlingStats = async (playerId: string) => {
  try {
    const bowlingRes = await axios.get(`${apiUrl}/api/players/${playerId}/bowling`);
    return processBowlingStats(bowlingRes.data);
  } catch (error) {
    // Fallback: create sample bowling stats if API fails
    return [
      { format: 'Test', matches: 0, wickets: 0, average: 0, economy: 0, best: '-' },
      { format: 'ODI', matches: 0, wickets: 0, average: 0, economy: 0, best: '-' },
      { format: 'T20I', matches: 0, wickets: 0, average: 0, economy: 0, best: '-' }
    ];
  }
};

export const fetchPlayerNews = async (playerId: string) => {
  try {
    const newsRes = await axios.get(`${apiUrl}/api/players/${playerId}/news`);
    const news = processNewsData(newsRes.data);
    return Array.isArray(news) ? news.slice(0, 5) : []; // Limit to 5 items
  } catch (error) {
    return [];
  }
};

export const fetchAllPlayerData = async (playerId: string) => {
  const [player, career, battingStats, bowlingStats, news] = await Promise.all([
    fetchPlayerInfo(playerId),
    fetchCareerStats(playerId),
    fetchBattingStats(playerId),
    fetchBowlingStats(playerId),
    fetchPlayerNews(playerId)
  ]);

  const rankings = getDefaultRankings();

  return { 
    player: player || null,
    career: Array.isArray(career) ? career : [], 
    battingStats: Array.isArray(battingStats) ? battingStats : [],
    bowlingStats: Array.isArray(bowlingStats) ? bowlingStats : [],
    news: Array.isArray(news) ? news : [],
    rankings
  };
};