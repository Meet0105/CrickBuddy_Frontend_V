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
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-400 mb-6">Latest News</h1>
          <Link href="/news" className="text-green-300 hover:text-green-400 text-sm font-medium">
            ← Back to News
          </Link>
        </div>
        
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
            <h3 className="text-xl font-bold text-gray-100 mb-2">No Latest News Available</h3>
            <p className="mb-4">News data is currently being synced. Please check back later!</p>
            <Link href="/news" className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg inline-block transition">
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
