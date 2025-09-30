import axios from 'axios';
import api from '../../../utils/api';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Fetch series details
export const fetchSeriesDetails = async (seriesId: string) => {
  // Fetch series details from database first
  let series = null;
  try {
    const seriesRes = await axios.get(`${apiUrl}/api/series/${seriesId}`);
    
    if (seriesRes.data) {
      const s = seriesRes.data;
      series = {
        seriesId: s.seriesId,
        name: s.name,
        shortName: s.shortName || s.name,
        description: s.description || '',
        startDate: s.startDate || new Date().toISOString(),
        endDate: s.endDate || new Date().toISOString(),
        seriesType: s.seriesType || 'INTERNATIONAL',
        format: s.format || 'MIXED',
        status: s.status || 'UPCOMING',
        totalMatches: s.totalMatches || 0,
        completedMatches: s.completedMatches || 0,
        venue: s.venue || { country: '', cities: [] },
        teams: s.teams || []
      };
    }
  } catch (dbError) {
    console.log('Database lookup failed, trying API list:', dbError.message);
    
    // Fallback to API list if database lookup fails
    const seriesListRes = await axios.get(`${apiUrl}/api/series/list`);
    
    if (seriesListRes.data && seriesListRes.data.seriesMapProto) {
      const allSeries = seriesListRes.data.seriesMapProto.flatMap((seriesGroup: any) => 
        seriesGroup.series || []
      );
      
      const foundSeries = allSeries.find((s: any) => s.id == seriesId || s.id == parseInt(seriesId));
      if (foundSeries) {
        series = {
          seriesId: foundSeries.id.toString(),
          name: foundSeries.name,
          shortName: foundSeries.shortName || '',
          description: foundSeries.description || foundSeries.about || '',
          startDate: foundSeries.startDt ? new Date(parseInt(foundSeries.startDt)).toISOString() : new Date().toISOString(),
          endDate: foundSeries.endDt ? new Date(parseInt(foundSeries.endDt)).toISOString() : new Date().toISOString(),
          seriesType: foundSeries.seriesType || 'INTERNATIONAL',
          format: foundSeries.format || foundSeries.matchFormat || 'MIXED',
          status: foundSeries.status && foundSeries.status.toLowerCase() === 'started' ? 'ONGOING' : 
                  foundSeries.status && foundSeries.status.toLowerCase() === 'upcoming' ? 'UPCOMING' : 
                  foundSeries.status || 'SCHEDULED',
          totalMatches: foundSeries.matchCount || 0,
          completedMatches: foundSeries.completedCount || 0,
          venue: {
            country: foundSeries.venue?.country || '',
            cities: foundSeries.venue?.cities || []
          },
          teams: Array.isArray(foundSeries.teams) ? foundSeries.teams.map((team: any) => ({
            teamId: team.id || team.teamId || '',
            teamName: team.name || team.teamName || '',
            teamShortName: team.shortName || team.abbreviation || ''
          })) : []
        };
      }
    }
  }
  
  return series;
};

// Fetch matches for this series
export const fetchSeriesMatches = async (seriesId: string) => {
  let matches = [];
  try {
    // Try to get matches from database first (schedule)
    const scheduleRes = await axios.get(`${apiUrl}/api/series/${seriesId}/schedule`);
    
    if (scheduleRes.data && scheduleRes.data.schedule) {
      matches = scheduleRes.data.schedule.map((match: any) => ({
        matchId: match.matchId,
        title: match.matchDesc || 'Match',
        shortTitle: match.matchDesc || 'Match',
        status: match.status || 'SCHEDULED',
        startDate: match.startDate || new Date().toISOString(),
        teams: {
          team1: { teamName: match.team1 || 'Team 1' },
          team2: { teamName: match.team2 || 'Team 2' }
        },
        result: ''
      }));
    } else {
      // Fallback to API matches endpoint
      const matchesRes = await axios.get(`${apiUrl}/api/series/${seriesId}/matches`);
      
      if (matchesRes.data && matchesRes.data.matchDetails) {
        matches = matchesRes.data.matchDetails
          .filter((detail: any) => detail.matchDetailsMap && detail.matchDetailsMap.match)
          .flatMap((detail: any) => detail.matchDetailsMap.match)
          .map((match: any) => ({
            matchId: match.matchInfo?.matchId,
            title: match.matchInfo?.matchDesc || 'Match',
            shortTitle: match.matchInfo?.matchDesc || 'Match',
            status: match.matchInfo?.state || 'SCHEDULED',
            startDate: match.matchInfo?.startDate ? new Date(parseInt(match.matchInfo.startDate)).toISOString() : new Date().toISOString(),
            teams: {
              team1: { teamName: match.matchInfo?.team1?.teamName || 'Team 1' },
              team2: { teamName: match.matchInfo?.team2?.teamName || 'Team 2' }
            },
            result: match.matchInfo?.status || ''
          }));
      }
    }
  } catch (matchError) {
    console.log('Error fetching matches:', matchError.message);
    matches = [];
  }
  
  return matches;
};

// Fetch series data for tabs
export const fetchSeriesTabData = async (seriesId: string, endpoint: string) => {
  try {
    let url = '';
    
    // Handle different endpoints correctly
    if (endpoint.startsWith('stats')) {
      // Extract statsType from endpoint or use default
      const statsType = endpoint.includes('?statsType=') 
        ? endpoint.split('?statsType=')[1] 
        : 'mostRuns';
      url = `/api/series/${seriesId}/stats?statsType=${statsType}`;
    } else if (endpoint === 'squads') {
      // Use the endpoint that fetches squads with full player data
      url = `/api/series/${seriesId}/squads/with-players`;
      console.log('Fetching squads with players from:', url);
    } else {
      url = `/api/series/${seriesId}/${endpoint}`;
    }
    
    const res = await api.get(url);
    console.log('API response for', endpoint, ':', res.data);
    return res.data;
  } catch (err: any) {
    console.error(`Error fetching series ${endpoint}:`, err);
    throw new Error(`Failed to load ${endpoint.split('?')[0]} data: ${err.response?.statusText || err.message}`);
  }
};

// Fetch all series data
export const fetchAllSeriesData = async (seriesId: string) => {
  const [series, matches] = await Promise.all([
    fetchSeriesDetails(seriesId),
    fetchSeriesMatches(seriesId)
  ]);
  
  return { series, matches };
};