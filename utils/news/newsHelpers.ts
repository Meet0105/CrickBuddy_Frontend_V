import { NewsItem } from './newsTypes';

// Process news data based on API response structure
export const processNewsData = (data: any): NewsItem[] => {
  let news: NewsItem[] = [];
  
  if (data.news && Array.isArray(data.news)) {
    // Process the news array from the API response
    news = data.news.map((item: any) => {
      const newsItem: NewsItem = {
        newsId: item.newsId || item.id || Math.random().toString(),
        headline: item.headline || item.title || item.hline || 'Cricket News',
        subHeadline: item.subHeadline || item.intro || item.summary || '',
        publishedDate: item.publishedDate || item.pubTime || new Date().toISOString(),
        category: item.category || 'News'
      };
      
      // Only add featuredImage if we have a valid URL
      if (item.featuredImage?.url || item.imageId) {
        newsItem.featuredImage = {
          url: item.featuredImage?.url || item.imageId
        };
      }
      
      return newsItem;
    });
  } else if (Array.isArray(data)) {
    // If direct array
    news = data.map((item: any) => {
      const newsItem: NewsItem = {
        newsId: item.newsId || item.id || Math.random().toString(),
        headline: item.headline || item.title || item.hline || 'Cricket News',
        subHeadline: item.subHeadline || item.intro || item.summary || '',
        publishedDate: item.publishedDate || item.pubTime || new Date().toISOString(),
        category: item.category || 'News'
      };
      
      // Only add featuredImage if we have a valid URL
      if (item.featuredImage?.url || item.imageId) {
        newsItem.featuredImage = {
          url: item.featuredImage?.url || item.imageId
        };
      }
      
      return newsItem;
    });
  }
  
  return news;
};

// Create fallback news data
export const createFallbackNews = (): NewsItem[] => {
  return [
    {
      newsId: '1',
      headline: 'Cricket World Cup 2024: Latest Updates',
      subHeadline: 'Stay updated with the latest cricket world cup news and match results.',
      publishedDate: new Date().toISOString(),
      category: 'News',
      featuredImage: { url: '172121' }
    },
    {
      newsId: '2',
      headline: 'IPL 2024: Team Analysis and Player Performances',
      subHeadline: 'Comprehensive analysis of team strategies and standout player performances.',
      publishedDate: new Date(Date.now() - 86400000).toISOString(),
      category: 'Analysis',
      featuredImage: { url: '172119' }
    },
    {
      newsId: '3',
      headline: 'Test Cricket: The Art of Patience and Skill',
      subHeadline: 'Exploring the nuances of Test cricket and what makes it the ultimate format.',
      publishedDate: new Date(Date.now() - 172800000).toISOString(),
      category: 'Features',
      featuredImage: { url: '172117' }
    }
  ];
};

// Create fallback categories
export const createFallbackCategories = (): any[] => {
  return [
    { id: '1', name: 'News', description: 'Latest cricket news' },
    { id: '2', name: 'Analysis', description: 'Match analysis and insights' },
    { id: '3', name: 'Features', description: 'Special cricket features' },
    { id: '4', name: 'Interviews', description: 'Player and expert interviews' }
  ];
};