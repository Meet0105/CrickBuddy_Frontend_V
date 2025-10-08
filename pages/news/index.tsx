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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-gray-100 w-full overflow-x-hidden">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-400">Cricket News</h1>
            <Link href="/" className="group text-emerald-400 hover:text-emerald-300 text-sm sm:text-base font-medium flex items-center">
              <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
          
          <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 text-center border border-slate-700">
            <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">⚠️</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-3 sm:mb-4">Rate Limit Exceeded</h3>
            <p className="mb-4 text-sm sm:text-base text-gray-300">{error}</p>
            <p className="text-gray-500 text-sm mb-6 sm:mb-8">Please wait a few minutes before trying again.</p>
            <Link href="/" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl inline-block transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-gray-100 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-400">Cricket News</h1>
          <Link href="/" className="group text-emerald-400 hover:text-emerald-300 text-sm sm:text-base font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        {/* Categories Section */}
        <CategoriesSection categories={categories} />
        
        {news && news.length > 0 ? (
          <div className="grid gap-4 sm:gap-6">
            {news.map((item) => (
              <div key={item.newsId} className="bg-slate-800/95 backdrop-blur-sm hover:bg-slate-700/95 shadow-lg hover:shadow-xl rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 border border-slate-700/50">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-2 gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-emerald-300 flex-1">{item.headline}</h3>
                    {item.category && (
                      <span className="bg-emerald-900/50 text-emerald-300 text-xs font-medium px-2.5 py-1 rounded-full w-fit">
                        {item.category}
                      </span>
                    )}
                  </div>
                  
                  {item.subHeadline && (
                    <p className="text-gray-400 mb-4 text-sm sm:text-base line-clamp-2">{item.subHeadline}</p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                    <span className="text-gray-500 text-xs sm:text-sm">
                      {new Date(item.publishedDate).toLocaleDateString()}
                    </span>
                    <Link 
                      href={`/news/${item.newsId}`} 
                      className="group text-emerald-300 hover:text-emerald-400 text-sm font-medium flex items-center w-fit"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 text-center border border-slate-700">
            <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">📰</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-3 sm:mb-4">No News Available</h3>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-400">News data is currently being synced. Please check back later!</p>
            <Link href="/" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl inline-block transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
    
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
