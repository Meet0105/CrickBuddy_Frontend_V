import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

type NewsItem = {
  newsId: string;
  headline: string;
  subHeadline?: string;
  publishedDate: string;
  category: string;
  featuredImage?: {
    url: string;
  };
};

type Category = {
  id: string;
  name: string;
  description?: string;
};

export default function NewsCategory({ news, category, error }: { news: NewsItem[]; category: Category; error?: string }) {
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-full overflow-x-hidden">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400">News Category</h1>
            <Link href="/news" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium transition flex items-center">
              <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to News
            </Link>
          </div>
          
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 text-center border border-gray-700">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">⚠️</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-3 sm:mb-4 px-2">Rate Limit Exceeded</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 px-2">{error}</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 px-2">Please wait a few minutes before trying again.</p>
            <Link href="/news" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
              Back to News
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400 break-words">News Category: {category?.name || 'Category'}</h1>
          <Link href="/news" className="group text-green-400 hover:text-green-300 text-sm sm:text-base font-medium transition flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to News
          </Link>
        </div>
        
        {category?.description && (
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 border border-gray-700">
            <p className="text-sm sm:text-base text-gray-300">{category.description}</p>
          </div>
        )}
        
        {news && news.length > 0 ? (
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {news.map((item) => (
              <div key={item.newsId} className="bg-gray-800/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600">
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-3">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 break-words flex-1">{item.headline}</h3>
                    {item.category && (
                      <span className="bg-green-900 text-green-300 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0">
                        {item.category}
                      </span>
                    )}
                  </div>
                  
                  {item.subHeadline && (
                    <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">{item.subHeadline}</p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                    <span className="text-gray-500 text-xs sm:text-sm">
                      {new Date(item.publishedDate).toLocaleDateString()}
                    </span>
                    <Link 
                      href={`/news/${item.newsId}`} 
                      className="text-green-400 hover:text-green-300 text-sm sm:text-base font-medium flex items-center group"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 text-center border border-gray-700">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">📰</div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-3 sm:mb-4 px-2">No News in this Category</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto px-4">There are currently no news articles in this category. Please check back later!</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/news" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
                Back to News
              </Link>
              <Link href="/" className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg border border-gray-600 text-sm sm:text-base">
                Go Home
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://crick-buddy-backend-v.vercel.app';
    
    // Fetch news by category
    const newsRes = await axios.get(`${apiUrl}/api/news/category-id/${params.id}`);
    const news = Array.isArray(newsRes.data.news) ? newsRes.data.news : [];
    
    // For now, we'll use a placeholder category since we don't have a specific endpoint for category details
    const category = {
      id: params.id,
      name: `Category ${params.id}`,
      description: `News articles in category ${params.id}`
    };
    
    return { props: { news, category } };
  } catch (error: any) {
    console.error('Error fetching news by category:', error);
    
    // Handle rate limiting errors
    if (error.response?.status === 429) {
      return { 
        props: { 
          news: [], 
          category: { id: params.id, name: 'Category', description: '' },
          error: 'API rate limit exceeded. Please try again in a few minutes.' 
        } 
      };
    }
    
    // Handle other errors
    return { props: { news: [], category: { id: params.id, name: 'Category', description: '' }, error: 'Failed to load news. Please try again later.' } };
  }
}