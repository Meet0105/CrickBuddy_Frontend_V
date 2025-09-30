// Helper functions for processing player data

export const transformPlayerInfo = (data: any, playerId: string) => {
  if (data) {
    return {
      playerId: data.id?.toString() || playerId,
      name: data.name || 'Unknown Player',
      role: data.role || data.bat || '',
      country: data.intlTeam || data.birthPlace || '',
      raw: data
    };
  }
  return null;
};

export const processCareerStats = (data: any) => {
  if (data && data.values) {
    const processedCareer = data.values.map((item: any) => {
      // Extract format from the name field and capitalize it
      const format = item.name ? item.name.toUpperCase() : 'Unknown';
      
      // The career API returns debut and last played info, not stats
      return {
        format,
        debut: item.debut || 'N/A',
        lastPlayed: item.lastPlayed || 'N/A'
      };
    });
    
    return processedCareer;
  } else if (Array.isArray(data)) {
    return data;
  }
  
  // Fallback: create sample career stats if API fails
  return [
    { format: 'TEST', debut: 'N/A', lastPlayed: 'N/A' },
    { format: 'ODI', debut: 'N/A', lastPlayed: 'N/A' },
    { format: 'T20I', debut: 'N/A', lastPlayed: 'N/A' }
  ];
};

export const processBattingStats = (data: any) => {
  if (data && data.headers && data.values) {
    // Create a mapping of headers to values
    const headers = data.headers;
    const values = data.values;
    
    // Transform the data into a more usable format
    const processedStats = headers.slice(1).map((format: string, index: number) => {
      const stat: any = { format };
      
      // Map each row to the corresponding stat
      values.forEach((row: any) => {
        if (row.values) {
          const statName = row.values[0];
          const statValue = row.values[index + 1];
          
          // Map the stat names to our property names
          switch (statName) {
            case 'Matches':
              stat.matches = parseInt(statValue) || 0;
              break;
            case 'Runs':
              stat.runs = parseInt(statValue) || 0;
              break;
            case 'Average':
              stat.average = parseFloat(statValue) || 0;
              break;
            case 'SR':
            case 'Strike Rate':
              stat.strikeRate = parseFloat(statValue) || 0;
              break;
            case '100s':
            case 'Hundreds':
              stat.centuries = parseInt(statValue) || 0;
              break;
            case '50s':
            case 'Fifties':
              stat.fifties = parseInt(statValue) || 0;
              break;
            case 'HS':
            case 'Highest':
              stat.highest = parseInt(statValue) || 0;
              break;
          }
        }
      });
      
      return stat;
    });
    
    return processedStats;
  } else {
    return Array.isArray(data) ? data : data?.batting || [];
  }
};

export const processBowlingStats = (data: any) => {
  if (data && data.headers && data.values) {
    // Create a mapping of headers to values
    const headers = data.headers;
    const values = data.values;
    
    // Transform the data into a more usable format
    return headers.slice(1).map((format: string, index: number) => {
      const stat: any = { format };
      
      // Map each row to the corresponding stat
      values.forEach((row: any) => {
        if (row.values) {
          const statName = row.values[0];
          const statValue = row.values[index + 1];
          
          // Map the stat names to our property names
          switch (statName) {
            case 'Matches':
              stat.matches = parseInt(statValue) || 0;
              break;
            case 'Wickets':
              stat.wickets = parseInt(statValue) || 0;
              break;
            case 'Average':
              stat.average = parseFloat(statValue) || 0;
              break;
            case 'Econ':
            case 'Economy':
              stat.economy = parseFloat(statValue) || 0;
              break;
            case 'Best':
              stat.best = statValue || '-';
              break;
          }
        }
      });
      
      return stat;
    });
  } else {
    return Array.isArray(data) ? data : data?.bowling || [];
  }
};

export const processNewsData = (data: any) => {
  if (data.storyList) {
    return data.storyList
      .filter((story: any) => story && story.id) // Filter out invalid stories
      .map((story: any) => ({
        id: story.id?.toString() || '0', // Ensure id is never undefined
        title: story.hline || story.title || story.headline || 'News Title',
        summary: story.intro || story.summary || story.description || 'News summary',
        date: story.pubTime ? new Date(parseInt(story.pubTime)).toLocaleDateString() : new Date().toLocaleDateString()
      }));
  } else if (Array.isArray(data)) {
    return data
      .filter((item: any) => item) // Filter out invalid items
      .map((item: any) => ({
        id: item.id?.toString() || '0', // Ensure id is never undefined
        title: item.title || item.headline || item.name || 'News Title',
        summary: item.summary || item.description || item.content || 'News summary',
        date: item.date || item.pubTime ? new Date(item.pubTime).toLocaleDateString() : new Date().toLocaleDateString()
      }));
  }
  return [];
};

export const getDefaultRankings = () => {
  return {
    testBatsmen: { position: "12", rating: "789" },
    odiBatsmen: { position: "18", rating: "654" },
    t20Batsmen: { position: "25", rating: "543" },
    testBowlers: { position: "34", rating: "432" },
    odiBowlers: { position: "29", rating: "567" },
    t20Bowlers: { position: "42", rating: "321" }
  };
};