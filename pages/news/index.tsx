import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { NewsItem, Category } from '../../utils/news/newsTypes';
import { NewsCard } from '../../components/news/NewsCard';
import { CategoriesSection } from '../../components/news/CategoriesSection';
import { processNewsData, createFallbackNews, createFallbackCategories } from '../../utils/news/newsHelpers';

export default function News({ news, categories, error }: { news: NewsItem[]; categories: Category[]; error?: string }) {
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-green-400 mb-6">Cricket News</h1>
            <Link href="/" className="text-green-300 hover:text-green-400 text-sm font-medium">
              ← Back to Home
            </Link>
          </div>
          
          <div className="bg-gray-800 text-gray-400 p-8 rounded-lg text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">Rate Limit Exceeded</h3>
            <p className="mb-4">{error}</p>
            <p className="text-gray-500 text-sm mb-4">Please wait a few minutes before trying again.</p>
            <Link href="/" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400 mb-6">Cricket News</h1>
          <Link href="/" className="text-green-300 hover:text-green-400 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
        
        {/* Categories Section */}
        <CategoriesSection categories={categories} />
        
        {news && news.length > 0 ? (
          <div className="space-y-6">
            {news.map((item) => (
              <div key={item.newsId} className="bg-gray-800 hover:bg-gray-700 shadow-lg rounded-lg overflow-hidden transition">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-green-300">{item.headline}</h3>
                    {item.category && (
                      <span className="bg-green-900 text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    )}
                  </div>
                  
                  {item.subHeadline && (
                    <p className="text-gray-400 mb-3">{item.subHeadline}</p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      {new Date(item.publishedDate).toLocaleDateString()}
                    </span>
                    <Link 
                      href={`/news/${item.newsId}`} 
                      className="text-green-300 hover:text-green-400 text-sm font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 text-gray-400 p-8 rounded-lg text-center">
            <div className="text-5xl mb-4">📰</div>
            <h3 className="text-xl font-bold text-gray-100 mb-2">No News Available</h3>
            <p className="mb-4">News data is currently being synced. Please check back later!</p>
            <Link href="/" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
              Back to Home
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Fetch news
    const newsRes = await axios.get(`${apiUrl}/api/news?limit=10`);
    console.log('News API Response:', newsRes.data);
    
    // Process news data based on actual API response structure
    let news: NewsItem[] = processNewsData(newsRes.data);
    
    // If no news processed, create fallback news
    if (news.length === 0) {
      news = createFallbackNews();
    }
    
    // Fetch categories
    let categories: Category[] = [];
    try {
      const categoriesRes = await axios.get(`${apiUrl}/api/news/categories`);
      console.log('Categories API Response:', categoriesRes.data);
      categories = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback categories
      categories = createFallbackCategories();
    }
    
    return { props: { news, categories } };
  } catch (error: any) {
    console.error('Error fetching news:', error);
    
    // Handle rate limiting errors
    if (error.response?.status === 429) {
      return { 
        props: { 
          news: [], 
          categories: [],
          error: 'API rate limit exceeded. Please try again in a few minutes.' 
        } 
      };
    }
    
    // Complete fallback with sample news
    const fallbackNews: NewsItem[] = createFallbackNews();
    const fallbackCategories: Category[] = createFallbackCategories().slice(0, 2);
    
    return { props: { news: fallbackNews, categories: fallbackCategories } };
  }
}