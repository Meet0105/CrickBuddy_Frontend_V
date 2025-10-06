import axios from 'axios';
import { fallbackFilters, getFallbackRecords } from './recordsHelpers';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';

// Fetch records filters
export const fetchRecordsFilters = async () => {
  try {
    const filtersRes = await axios.get(`${apiUrl}/api/rankings/records-filters`);
    return filtersRes.data?.statsTypesList?.flatMap((list: any) => list.types) || fallbackFilters;
  } catch (error) {
    console.error('Error fetching filters:', error);
    return fallbackFilters;
  }
};

// Fetch records with fallback
export const fetchRecords = async (statsType: string, matchType: string, teamId: string) => {
  try {
    let recordsUrl = `${apiUrl}/api/rankings/records?statsType=${statsType}&categoryId=0&matchType=${matchType}`;
    if (teamId) {
      recordsUrl += `&teamId=${teamId}`;
    }
    
    const recordsRes = await axios.get(recordsUrl);
    const records = recordsRes.data?.data || [];
    
    // If API returns empty or no data, use fallback
    if (!records || records.length === 0) {
      return getFallbackRecords(statsType, matchType);
    }
    
    return records;
  } catch (error) {
    console.error('Error fetching records:', error);
    // Use fallback records
    return getFallbackRecords(statsType, matchType);
  }
};

// Fetch all records data
export const fetchAllRecordsData = async (statsType: string, matchType: string, teamId: string) => {
  const [filters, records] = await Promise.all([
    fetchRecordsFilters(),
    fetchRecords(statsType, matchType, teamId)
  ]);
  
  return { filters, records };
};