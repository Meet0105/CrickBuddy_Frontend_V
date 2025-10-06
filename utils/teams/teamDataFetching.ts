import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';

// Fetch team details
export const fetchTeamDetails = async (id: string) => {
  const teamRes = await axios.get(`${apiUrl}/api/teams/${id}`);
  return teamRes.data;
};

// Fetch team schedules
export const fetchTeamSchedules = async (id: string) => {
  let schedules = [];
  try {
    const schedulesRes = await axios.get(`${apiUrl}/api/teams/${id}/schedules`);
    
    // Handle different response structures from the actual API
    if (schedulesRes.data.teamMatchesData) {
      // Handle teamMatchesData structure (actual API response)
      schedules = schedulesRes.data.teamMatchesData
        .filter((detail: any) => detail.matchDetailsMap && detail.matchDetailsMap.match)
        .flatMap((detail: any) => detail.matchDetailsMap.match)
        .map((match: any, index: number) => ({
          matchId: match.matchInfo?.matchId?.toString() || index.toString(),
          title: match.matchInfo?.matchDesc || match.matchInfo?.seriesName || 'Match',
          date: match.matchInfo?.startDate ? new Date(parseInt(match.matchInfo.startDate)).toLocaleDateString() : 'TBD',
          venue: match.matchInfo?.venueInfo?.ground || match.matchInfo?.venueInfo?.city || 'Venue TBD',
          status: match.matchInfo?.state || match.matchInfo?.status || 'SCHEDULED'
        }));
    } else if (schedulesRes.data.matchDetails) {
      // Handle matchDetails structure (previous attempt)
      schedules = schedulesRes.data.matchDetails
        .filter((detail: any) => detail.matchDetailsMap && detail.matchDetailsMap.match)
        .flatMap((detail: any) => detail.matchDetailsMap.match)
        .map((match: any, index: number) => ({
          matchId: match.matchInfo?.matchId?.toString() || index.toString(),
          title: match.matchInfo?.matchDesc || match.matchInfo?.seriesName || 'Match',
          date: match.matchInfo?.startDate ? new Date(parseInt(match.matchInfo.startDate)).toLocaleDateString() : 'TBD',
          venue: match.matchInfo?.venueInfo?.ground || match.matchInfo?.venueInfo?.city || 'Venue TBD',
          status: match.matchInfo?.state || match.matchInfo?.status || 'SCHEDULED'
        }));
    } else if (Array.isArray(schedulesRes.data)) {
      schedules = schedulesRes.data.map((match: any, index: number) => ({
        matchId: match.matchId?.toString() || match.id?.toString() || index.toString(),
        title: match.title || match.name || match.description || 'Match',
        date: match.date || match.startDate || 'TBD',
        venue: match.venue || 'Venue TBD',
        status: match.status || match.state || 'SCHEDULED'
      }));
    }
  } catch (error) {
    console.error('Error fetching schedules:', error);
  }
  
  return schedules;
};

// Fetch team results
export const fetchTeamResults = async (id: string) => {
  let results = [];
  try {
    const resultsRes = await axios.get(`${apiUrl}/api/teams/${id}/results`);
    
    // Handle different response structures from the actual API
    if (resultsRes.data.teamMatchesData) {
      // Handle teamMatchesData structure (actual API response)
      results = resultsRes.data.teamMatchesData
        .filter((detail: any) => detail.matchDetailsMap && detail.matchDetailsMap.match)
        .flatMap((detail: any) => detail.matchDetailsMap.match)
        .map((match: any, index: number) => ({
          matchId: match.matchInfo?.matchId?.toString() || index.toString(),
          title: match.matchInfo?.matchDesc || match.matchInfo?.seriesName || 'Match',
          date: match.matchInfo?.startDate ? new Date(parseInt(match.matchInfo.startDate)).toLocaleDateString() : 'TBD',
          venue: match.matchInfo?.venueInfo?.ground || match.matchInfo?.venueInfo?.city || 'Venue TBD',
          result: match.matchInfo?.status || match.matchInfo?.result || 'Result TBD'
        }));
    } else if (resultsRes.data.matchDetails) {
      // Handle matchDetails structure (previous attempt)
      results = resultsRes.data.matchDetails
        .filter((detail: any) => detail.matchDetailsMap && detail.matchDetailsMap.match)
        .flatMap((detail: any) => detail.matchDetailsMap.match)
        .map((match: any, index: number) => ({
          matchId: match.matchInfo?.matchId?.toString() || index.toString(),
          title: match.matchInfo?.matchDesc || match.matchInfo?.seriesName || 'Match',
          date: match.matchInfo?.startDate ? new Date(parseInt(match.matchInfo.startDate)).toLocaleDateString() : 'TBD',
          venue: match.matchInfo?.venueInfo?.ground || match.matchInfo?.venueInfo?.city || 'Venue TBD',
          result: match.matchInfo?.status || match.matchInfo?.result || 'Result TBD'
        }));
    } else if (Array.isArray(resultsRes.data)) {
      results = resultsRes.data.map((match: any, index: number) => ({
        matchId: match.matchId?.toString() || match.id?.toString() || index.toString(),
        title: match.title || match.name || match.description || 'Match',
        date: match.date || match.startDate || 'TBD',
        venue: match.venue || 'Venue TBD',
        result: match.result || match.status || 'Result TBD'
      }));
    }
  } catch (error) {
    console.error('Error fetching results:', error);
  }
  
  return results;
};

// Fetch team news
export const fetchTeamNews = async (id: string) => {
  let news = [];
  try {
    const newsRes = await axios.get(`${apiUrl}/api/teams/${id}/news`);
    
    // Handle different response structures from the actual API
    if (newsRes.data.storyList) {
      news = newsRes.data.storyList.map((story: any, index: number) => ({
        id: story.id?.toString() || index.toString(),
        title: story.hline || story.title || story.headline || 'News Title',
        summary: story.intro || story.summary || story.description || 'News summary',
        date: story.pubTime ? new Date(story.pubTime).toLocaleDateString() : new Date().toLocaleDateString()
      }));
    } else if (newsRes.data.data && Array.isArray(newsRes.data.data)) {
      // Handle data array structure (actual API response)
      news = newsRes.data.data.map((item: any, index: number) => ({
        id: item.id?.toString() || index.toString(),
        title: item.title || item.headline || item.name || 'News Title',
        summary: item.summary || item.description || item.content || item.intro || 'News summary',
        date: item.date || item.pubTime ? new Date(item.pubTime).toLocaleDateString() : new Date().toLocaleDateString()
      }));
    } else if (Array.isArray(newsRes.data)) {
      news = newsRes.data.map((item: any, index: number) => ({
        id: item.id?.toString() || index.toString(),
        title: item.title || item.headline || item.name || 'News Title',
        summary: item.summary || item.description || item.content || 'News summary',
        date: item.date || item.pubTime ? new Date(item.pubTime).toLocaleDateString() : new Date().toLocaleDateString()
      }));
    }
  } catch (error) {
    console.error('Error fetching news:', error);
  }
  
  return news;
};

// Fetch team players
export const fetchTeamPlayers = async (id: string) => {
  let players = [];
  try {
    const playersRes = await axios.get(`${apiUrl}/api/teams/${id}/players`);
    
    // Handle different response structures from the actual API
    if (playersRes.data.player && Array.isArray(playersRes.data.player)) {
      // Handle player array structure (actual API response)
      players = playersRes.data.player
        .filter((player: any) => player.id && player.name && !['BATSMEN', 'BOWLERS', 'ALL-ROUNDERS', 'WICKET-KEEPERS'].includes(player.name.toUpperCase())) // Filter out category headers
        .map((player: any, index: number) => ({
          playerId: player.id?.toString() || index.toString(),
          id: player.id?.toString() || index.toString(),
          name: player.name || 'Unknown Player',
          role: player.role || 'Player',
          battingStyle: player.battingStyle || '',
          bowlingStyle: player.bowlingStyle || '',
          imageId: player.imageId || null
        }));
    } else if (playersRes.data.playerSummary) {
      players = playersRes.data.playerSummary;
    } else if (playersRes.data.squad) {
      // Handle squad structure
      players = playersRes.data.squad.flatMap((squad: any) =>
        squad.players ? squad.players : []
      );
    } else if (playersRes.data.teamPlayersData) {
      // Handle teamPlayersData structure (actual API response)
      players = playersRes.data.teamPlayersData.flatMap((squad: any) =>
        squad.players ? squad.players : []
      );
    } else if (Array.isArray(playersRes.data)) {
      players = playersRes.data;
    }
  } catch (error) {
    console.error('Error fetching players:', error);
  }
  
  return players;
};

// Fetch all team data
export const fetchAllTeamData = async (id: string) => {
  try {
    const [team, schedules, results, news, players] = await Promise.all([
      fetchTeamDetails(id),
      fetchTeamSchedules(id),
      fetchTeamResults(id),
      fetchTeamNews(id),
      fetchTeamPlayers(id)
    ]);
    
    // Add players to team object
    const teamWithPlayers = {
      ...team,
      players: Array.isArray(players) ? players : []
    };
    
    return {
      team: teamWithPlayers,
      schedules: Array.isArray(schedules) ? schedules.slice(0, 5) : [], // Limit to 5 items
      results: Array.isArray(results) ? results.slice(0, 5) : [], // Limit to 5 items
      news: Array.isArray(news) ? news.slice(0, 5) : [] // Limit to 5 items
    };
  } catch (error) {
    console.error('Error fetching team data:', error);
    return { team: null, schedules: [], results: [], news: [], players: [] };
  }
};