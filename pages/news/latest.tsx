import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../components/Navbar';

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

export default function LatestNews({ news }: { news: NewsItem[] }) {
  return (
    <div className="bg-gray-900 min-h-screen w-full overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 lg:mb-10 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-green-400">Latest News</h1>
          <Link href="/news" className="group text-green-300 hover:text-green-400 text-sm sm:text-base font-medium flex items-center">
            <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to News
          </Link>
        </div>
        
        {news && news.length > 0 ? (
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {news.map((item) => (
              <div key={item.newsId} className="bg-gray-800/95 backdrop-blur-sm hover:bg-gray-700/95 shadow-lg hover:shadow-xl rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 border border-gray-700">
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-3">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-green-300 break-words flex-1">{item.headline}</h3>
                    {item.category && (
                      <span className="bg-green-900 text-green-300 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0">
                        {item.category}
                      </span>
                    )}
                  </div>
                  
                  {item.subHeadline && (
                    <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 line-clamp-2">{item.subHeadline}</p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                    <span className="text-gray-500 text-xs sm:text-sm">
                      {new Date(item.publishedDate).toLocaleDateString()}
                    </span>
                    <Link 
                      href={`/news/${item.newsId}`} 
                      className="group text-green-300 hover:text-green-400 text-sm sm:text-base font-medium flex items-center"
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
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100 mb-3 sm:mb-4 px-2">No Latest News Available</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2">News data is currently being synced. Please check back later!</p>
            <Link href="/news" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl sm:rounded-2xl inline-block transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
              Back to News
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
    const res = await axios.get(`${apiUrl}/api/news?limit=20`);
    
    // Handle different response formats
    let news = [];
    if (Array.isArray(res.data)) {
      news = res.data;
    } else if (res.data.news && Array.isArray(res.data.news)) {
      news = res.data.news;
    }
    
    // Sort by published date to get latest news
    const sortedNews = [...news].sort((a, b) => 
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
    return { props: { news: sortedNews.slice(0, 10) } };
  } catch (error) {
    console.error('Error fetching latest news:', error);
    return { props: { news: [] } };
  }
}
